'use client';

import { useRouter } from 'next/navigation';


import React, { useState, useEffect } from 'react';
import { Calendar, User, BarChart2, PieChart, Award, Gamepad2, BookOpen, Target, Activity, ArrowRight, ArrowLeft, Bookmark, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useToast } from '@/hooks/use-toast';
import UserProfile from './UserProfile';
import ModuleCard from './ModuleCard';
import { useUserData } from './UserDataProvider';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Add this near the top of your Dashboard component
useEffect(() => {
  const uid = localStorage.getItem('uid') || sessionStorage.getItem('uid');
  console.log("📌 Dashboard mounted, UID from storage:", uid);
  
  fetchProgress();
  
  // Set up event listener for custom progress update event
  const handleProgressUpdate = () => {
    console.log("🔄 Progress update event received!");
    fetchProgress();
  };
  
  window.addEventListener('progressUpdated', handleProgressUpdate);
  
  // Clean up event listener when component unmounts
  return () => {
    window.removeEventListener('progressUpdated', handleProgressUpdate);
  };
}, []);

// Update the ModuleProgressCard component to ensure it works with your progress data
const ModuleProgressCard = ({ module, position }) => {
  const bgColors = [
    "bg-gradient-to-br from-blue-500 to-purple-600",
    "bg-gradient-to-br from-green-500 to-teal-600",
    "bg-gradient-to-br from-orange-500 to-red-600",
    "bg-gradient-to-br from-indigo-500 to-violet-600",
    "bg-gradient-to-br from-pink-500 to-rose-600",
  ];
  
  const imagePlaceholders = [
    "/api/placeholder/400/200",
    "/api/placeholder/400/200",
    "/api/placeholder/400/200",
    "/api/placeholder/400/200",
    "/api/placeholder/400/200",
  ];
  
  const bgColor = bgColors[position % bgColors.length];
  const imageSrc = module.imageUrl || imagePlaceholders[position % imagePlaceholders.length];
  
  // Calculate days since last access
  const daysSinceLastAccess = module.lastAccessed ? 
    Math.floor((new Date() - new Date(module.lastAccessed)) / (1000 * 60 * 60 * 24)) : 
    null;
    
  // Ensure we have a title to display
  const title = module.title || module.moduleName || `Module ${position + 1}`;
  // Ensure we have a description to display
  const description = module.description || `Progress: ${module.progress?.toFixed(1) || 0}% complete`;
  // Ensure we have a progress value
  const progress = typeof module.progress === 'number' ? module.progress : 0;
  
  console.log(`🎨 Rendering card for module: ${title}, progress: ${progress}%`);
  
  return (
    <Card className="overflow-hidden border shadow-md hover:shadow-xl h-full flex flex-col">
      <div className="relative">
        <img src={imageSrc} alt={title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 p-2">
          <Badge className={`${position === 0 ? 'bg-yellow-500' : 'bg-blue-600'}`}>
            {position === 0 ? 'Recommended' : `Module ${position + 1}`}
          </Badge>
        </div>
        {progress >= 100 && (
          <div className="absolute bottom-0 right-0 p-2">
            <Badge className="bg-green-600">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Completed
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-800">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-gray-600">
              <Bookmark className="w-4 h-4 mr-1 text-blue-600" />
              <span>{module.totalLessons || module.totalSections || 0} lessons</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-4 h-4 mr-1 text-blue-600" />
              <span>{module.estimatedTime || '1h 30m'}</span>
            </div>
          </div>
          
          {daysSinceLastAccess !== null && (
            <div className="text-sm text-gray-500">
              {daysSinceLastAccess === 0 ? 'Last accessed today' : 
                daysSinceLastAccess === 1 ? 'Last accessed yesterday' :
                  `Last accessed ${daysSinceLastAccess} days ago`}
            </div>
          )}
        </div>
      </CardContent>
      
      <CardFooter>
        <Button className="w-full bg-blue-600 hover:bg-blue-700">
          {progress > 0 ? 'Continue Learning' : 'Start Learning'}
        </Button>
      </CardFooter>
    </Card>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const { userData, contentFilters, getAgeAppropriateContent } = useUserData() || {};
  const { toast } = useToast();
  const [selectedDate, setSelectedDate] = useState("");
  const [activeTab, setActiveTab] = useState("progress");
  const [moduleProgress, setModuleProgress] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [gameData, setGameData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [gameDataError, setGameDataError] = useState(null);
  const router = useRouter();

  const fetchProgress = async () => {
    try {
      const uid = localStorage.getItem('uid') || sessionStorage.getItem('uid');
      if (!uid) {
        console.log("⚠️ No UID found in storage");
        return;
      }
      
      console.log("📊 Fetching progress data for user:", uid);
      const response = await fetch(`/api/progress?uid=${uid}`);
      console.log("📊 Progress API response status:", response.status);
      
      if (!response.ok) {
        console.error("❌ Error fetching progress data:", response.statusText);
        return;
      }
      
      const data = await response.json();
      console.log("📊 Progress data received:", JSON.stringify(data));
      
      if (data && data.modules) {
        console.log("✅ Setting module progress with data");
        setModuleProgress(data.modules);
      } else {
        console.warn("⚠️ No modules in progress data");
        setModuleProgress({});
      }
    } catch (error) {
      console.error("❌ Failed to fetch progress:", error);
      setModuleProgress({});
    }
  };

// Make sure your useEffect includes the current user's UID
// Replace your existing useEffect with this corrected version
useEffect(() => {
  const uid = localStorage.getItem('uid') || sessionStorage.getItem('uid');
  console.log("📌 Dashboard mounted, UID from storage:", uid);
  
  fetchProgress();
  
  // Set up event listener for custom progress update event
  const handleProgressUpdate = () => {
    console.log("🔄 Progress update event received!");
    fetchProgress();
  };
  
  window.addEventListener('progressUpdated', handleProgressUpdate);
  
  // Clean up event listener when component unmounts
  return () => {
    window.removeEventListener('progressUpdated', handleProgressUpdate);
  };
}, []);

  // Fetch game history data from MongoDB
  useEffect(() => {
    const fetchGameData = async () => {
      setIsLoading(true);
      setGameDataError(null);
      
      try {
        // Try to get email from localStorage or sessionStorage
        const email = localStorage.getItem('email') || sessionStorage.getItem('email');
        if (!email) {
          setIsLoading(false);
          console.warn("⚠️ No email found in storage");
          setGameDataError("No user email found. Please log in again.");
          return;
        }
        
        console.log("Fetching game data for:", email);
        
        // Fetch game data for the current user
        const response = await fetch(`/api/user/games?email=${encodeURIComponent(email)}`);
        
        if (!response.ok) {
          throw new Error(`Server responded with status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log("Game data received:", data);
        
        // Check if we got valid game data back
        if (!data || (data.error && !data.gameHistory)) {
          throw new Error(data.error || "Invalid data received from server");
        }
        
        // Set the game data state
        setGameData(data);
      } catch (error) {
        console.error("❌ Failed to fetch game data:", error);
        setGameDataError(error.message || "Failed to load game data");
        
        // Set default data as fallback
        setGameData({
          totalGamesPlayed: 0,
          bestGameScore: 0,
          lastGamePlayed: null,
          gameHistory: []
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchGameData();
  }, []);

  // Set selected date once userData is loaded
  useEffect(() => {
    if (userData?.activityLog?.length > 0) {
      setSelectedDate(userData.activityLog[0].date);
    }
    
    // Show age-based content notification if age is verified
    if (contentFilters?.ageVerified) {
      toast({
        title: contentFilters.isAdult ? "Adult Content Enabled" : "Child-Friendly Content Enabled",
        description: contentFilters.isAdult 
          ? "You have access to all learning modules based on your age." 
          : "Your content is filtered for age-appropriate learning materials.",
        duration: 5000
      });
    }
  }, [userData, contentFilters, toast]);
  
  // Loading state
  if (!userData && !moduleProgress && isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Create a safe userData object with defaults
  const safeUserData = {
    name: userData?.name || "User",
    message: userData?.message || "Welcome to your learning dashboard!",
    modules: userData?.modules || [],
    activityLog: userData?.activityLog || [],
    streaks: userData?.streaks || { currentWeekly: 0, longestWeekly: 0 },
    analytics: userData?.analytics || { 
      timeSpent: [
        { week: "Week 1", hours: 2 },
        { week: "Week 2", hours: 3.5 },
        { week: "Week 3", hours: 1.5 },
        { week: "Week 4", hours: 4 }
      ], 
      moduleEngagement: [],
      quizScores: [
        { quiz: "Basic Concepts", score: 85 },
        { quiz: "Advanced Topics", score: 72 },
        { quiz: "Practical Applications", score: 90 }
      ]
    }
  };

  // Safely access game history, handling undefined values
  const gameHistory = gameData?.gameHistory || [];
  
  // Process game data for display
  const gameStats = {
    completed: gameData?.totalGamesPlayed || 0,
    total: gameData?.totalGamesPlayed > 0 ? gameData.totalGamesPlayed + 3 : 5,
    highestScore: gameData?.bestGameScore || 0,
    lastPlayed: gameData?.lastGamePlayed ? new Date(gameData.lastGamePlayed) : null,
    favoriteGame: gameData?.gameHistory?.length > 0 
      ? getMostPlayedGameType(gameData.gameHistory)
      : "None"
  };

  // Helper function to find the most played game type
  function getMostPlayedGameType(gameHistory) {
    if (!gameHistory || gameHistory.length === 0) return "None";
    
    const gameCounts = {};
    gameHistory.forEach(game => {
      const gameType = game.gameType || "Unknown";
      gameCounts[gameType] = (gameCounts[gameType] || 0) + 1;
    });
    
    // Find the game type with the most plays
    return Object.keys(gameCounts).reduce(
      (a, b) => gameCounts[a] > gameCounts[b] ? a : b, 
      Object.keys(gameCounts)[0]
    );
  }

  // Format game data for charts - using actual MongoDB data
  const gameScoreData = gameHistory
    .slice(0, 5) // Get the most recent 5 games
    .reverse() // Reverse to show chronological order
    .map((game, index) => ({
      game: `Game ${index + 1}`,
      score: game.score || 0,
      type: game.gameType || "Unknown"
    }));

  // Filter modules based on user age
  const filteredModules = getAgeAppropriateContent ? 
    getAgeAppropriateContent(safeUserData.modules) : 
    safeUserData.modules;

  const getActivitiesForDate = (date) => {
    const dayLog = safeUserData.activityLog.find(log => log.date === date);
    return dayLog?.activities || ["No activities recorded for this date"];
  };

  // Calculate overall progress with fallbacks
  const totalLessons = filteredModules.reduce((sum, module) => sum + (module.totalLessons || 0), 0);
  const completedLessons = filteredModules.reduce((sum, module) => sum + (module.completedLessons || 0), 0);
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const gamesProgress = Math.round((gameStats.completed / gameStats.total) * 100) || 0;

  const timeSpentData = safeUserData.analytics.timeSpent;

  // Greeting based on time of day
  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  // Safe recommended module
  const recommendedModule = filteredModules.length > 0 
    ? filteredModules.sort((a, b) => 
        ((b.lastAccessed || 0) > (a.lastAccessed || 0)) ? 1 : -1
      )[0]
    : { title: "No modules yet", description: "Get started with your learning journey", progress: 0 };

  // Get module categories
  const moduleCategories = ['all'];
  if (moduleProgress) {
    Object.values(moduleProgress).forEach(module => {
      if (module.category && !moduleCategories.includes(module.category)) {
        moduleCategories.push(module.category);
      }
    });
  }
  const categoryFilteredModules = getFilteredModules();
 // Add this console log right before rendering the filtered modules
console.log("🎨 Selected category:", selectedCategory);
console.log("🎨 Category filtered modules:", categoryFilteredModules);

// Replace the existing module filtering code in Dashboard.js
const getFilteredModules = () => {
  console.log("🔍 Getting filtered modules from:", moduleProgress);
  
  if (!moduleProgress) {
    console.log("⚠️ No module progress data available");
    return [];
  }
  
  const modules = Object.keys(moduleProgress).map(key => {
    return {
      id: key,
      title: moduleProgress[key].moduleName || key,
      description: `Complete ${moduleProgress[key].completedSections} of ${moduleProgress[key].totalSections} sections`,
      progress: moduleProgress[key].progress || 0,
      totalLessons: moduleProgress[key].totalSections || 0,
      completedLessons: moduleProgress[key].completedSections || 0,
      ...moduleProgress[key]
    };
  });
  
  console.log("📊 Processed modules:", modules);
  
  // Apply category filtering if selected
  if (selectedCategory === 'all') return modules;
  return modules.filter(module => module.category === selectedCategory);
};


  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Never";
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Format time for display
  const formatTime = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };
  
  // Get game type color for visual differentiation
  const getGameTypeColor = (gameType) => {
    const colorMap = {
      "Quiz": "bg-blue-600",
      "Memory": "bg-green-600",
      "Puzzle": "bg-purple-600",
      "Finance": "bg-orange-600",
      "Budget": "bg-teal-600",
      "Investment": "bg-indigo-600"
    };
    
    return colorMap[gameType] || "bg-gray-600";
  };

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Hero Section */}
        <Card className="border-none shadow-lg bg-gradient-to-r from-blue-500 to-blue-800 text-white">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold mb-2">{greeting}, {safeUserData.name}!</h1>
                <p className="text-blue-100 mb-6">{safeUserData.message}</p>
                
                {/* Age filter indicator */}
                {contentFilters?.ageVerified && (
                  <div className="mb-4">
                    <Badge className={contentFilters.isAdult ? "bg-blue-700" : "bg-green-600"}>
                      {contentFilters.isAdult ? "Adult Content" : "Child-Friendly Content"}
                    </Badge>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  {getFilteredModules().length > 0 ? (
    getFilteredModules().map((module, index) => (
      <ModuleProgressCard key={module.id} module={module} position={index} />
    ))
  ) : (
    <div className="col-span-full bg-white p-8 rounded-lg text-center">
      <h3 className="text-lg font-medium mb-2">No modules found</h3>
      <p className="text-gray-500">
        You haven't started any learning modules yet.
      </p>
    </div>
  )}
</div>
                  <Card className="bg-white/10 border-none shadow-none">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-2">Learning Progress</h3>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-white">Overall Completion</span>
                        <span className="text-sm font-bold">{overallProgress}%</span>
                      </div>
                      <Progress value={overallProgress} className="h-2 bg-white/30" />
                      <div className="flex justify-between mt-3 text-sm">
                        <span>{completedLessons} of {totalLessons} lessons complete</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 border-none shadow-none">
                    <CardContent className="p-4">
                      <h3 className="text-lg font-medium mb-2">Learning Streak</h3>
                      <div className="flex items-center space-x-2 mb-3">
                        <div className="text-3xl font-bold">{safeUserData.streaks.currentWeekly}</div>
                        <div className="text-sm">
                          <div>day streak</div>
                          <div className="text-white">Best: {safeUserData.streaks.longestWeekly} days</div>
                        </div>
                      </div>
                      <div className="flex space-x-1 mt-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                          <div
                            key={day}
                            className={`h-2 flex-1 rounded-sm ${day <= safeUserData.streaks.currentWeekly ? 'bg-green-400' : 'bg-white/20'}`}
                          ></div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              <div className="flex flex-col justify-between bg-white/10 rounded-xl p-6">
                <div>
                  <h3 className="text-lg font-medium mb-2">Continue Learning</h3>
                  <h4 className="text-xl font-bold mb-3">{recommendedModule.title}</h4>
                  <p className="text-sm text-blue-100 mb-4 line-clamp-3">{recommendedModule.description}</p>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{recommendedModule.progress}%</span>
                  </div>
                  <Progress value={recommendedModule.progress} className="h-2 bg-white/30" />
                </div>
                <Button className="mt-6 bg-white text-blue-800 hover:bg-blue-100 w-full">
                  Continue Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile and Performance Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div>
            <UserProfile userData={safeUserData} />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <Tabs defaultValue="learning" className="w-full">
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-center">
                    <CardTitle>Performance Dashboard</CardTitle>
                    <TabsList>
                      <TabsTrigger value="learning">Learning</TabsTrigger>
                      <TabsTrigger value="games">Games</TabsTrigger>
                      <TabsTrigger value="quiz">Quiz Scores</TabsTrigger>
                    </TabsList>
                  </div>
                </CardHeader>
                <CardContent>
                  <TabsContent value="learning" className="mt-0">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Time Spent Learning (Last 4 Weeks)</h3>
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={timeSpentData}
                          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="week" />
                          <YAxis unit="h" />
                          <Tooltip formatter={(value) => [`${value} hours`, 'Time Spent']} />
                          <Bar dataKey="hours" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="games" className="mt-0">
                    {isLoading ? (
                      <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <span className="ml-2 text-gray-600">Loading game data...</span>
                      </div>
                    ) : gameDataError ? (
                      <div className="bg-red-50 border border-red-200 rounded-md p-4 text-center">
                        <div className="text-red-600 mb-2">Error loading game data</div>
                        <div className="text-sm text-gray-600">{gameDataError}</div>
                        <Button 
                          className="mt-4 bg-blue-600 hover:bg-blue-700" 
                          size="sm"
                          onClick={() => window.location.reload()}
                        >
                          Retry
                        </Button>
                      </div>
                    ) : (
                      <>
                        {/* Game Stats Summary */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-4">Games Completion</h3>
                            <div className="flex items-center space-x-4">
                              <div className="w-24 h-24 rounded-full bg-blue-50 p-1 border border-blue-100 flex items-center justify-center">
                                <div className="w-full h-full rounded-full bg-white flex items-center justify-center">
                                  <div className="text-xl font-bold">{gamesProgress}%</div>
                                </div>
                              </div>
                              <div>
                                <div className="text-sm text-gray-500">Completed</div>
                                <div className="text-xl font-bold">{gameStats.completed}/{gameStats.total}</div>
                                <div className="text-sm text-gray-500 mt-1">Highest Score</div>
                                <div className="text-xl font-bold">{gameStats.highestScore}</div>
                              </div>
                            </div>
                          </div>
                          
                          <div>
                            <h3 className="text-sm font-medium text-gray-700 mb-4">Game Activity</h3>
                            <div className="space-y-3">
                              <div className="bg-blue-50 p-3 rounded-md">
                                <div className="text-sm text-gray-600">Favorite Game</div>
                                <div className="text-lg font-medium">{gameStats.favoriteGame}</div>
                              </div>
                              <div className="bg-blue-50 p-3 rounded-md">
                                <div className="text-sm text-gray-600">Last Played</div>
                                <div className="text-lg font-medium">
                                  {gameStats.lastPlayed ? formatDate(gameStats.lastPlayed) : "Never played"}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Game History Table */}
                        <div className="mt-6 bg-white rounded-lg p-4 shadow-sm">
                          <h3 className="text-lg font-medium mb-4">Game History</h3>
                          
                          {gameHistory.length > 0 ? (
                            <Table>
                              <TableCaption>Your recent game activity</TableCaption>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Game Type</TableHead>
                                  <TableHead>Score</TableHead>
                                  <TableHead className="hidden md:table-cell">Date Played</TableHead>
                                  <TableHead className="hidden md:table-cell">Time</TableHead>
                                  <TableHead>Status</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {gameHistory.slice(0, 6).map((game, index) => (
                                  <TableRow key={index}>
                                    <TableCell className="font-medium flex items-center">
                                      <div className={`w-3 h-3 rounded-full mr-2 ${getGameTypeColor(game.gameType)}`}></div>
                                      {game.gameType || "Unknown Game"}
                                    </TableCell>
                                    <TableCell className="font-bold">{game.score || 0}</TableCell>
                                    <TableCell className="hidden md:table-cell">{formatDate(game.timestamp)}</TableCell>
                                    <TableCell className="hidden md:table-cell">
                                      {formatTime(game.timestamp)}
                                    </TableCell>
                                    <TableCell>
                                      <Badge className={game.completed ? "bg-green-600" : "bg-yellow-500"}>
                                        {game.completed ? "Completed" : "In Progress"}
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          ) : (
                            <div className="text-center p-8 bg-gray-50 rounded-md">
                              <Gamepad2 className="h-10 w-10 mx-auto text-gray-400 mb-2" />
                              <p className="text-gray-500">No game history found.</p>
                              <p className="text-gray-400 text-sm">Play some games to see your history here.</p>
                              <Button className="mt-4 bg-blue-600 hover:bg-blue-700" size="sm" onClick={() => window.location.href = '/game'}>
                                Start Playing
                              </Button>
                            </div>
                          )}
                        </div>
                        
                        {/* Game Performance Chart - only render if we have data */}
                        {gameScoreData.length > 0 && (
                          <div className="mt-6">
                            <h3 className="text-sm font-medium text-gray-700 mb-4">Recent Game Performance</h3>
                            <div className="h-52">
                              <ResponsiveContainer width="100%" height="100%">
                                <BarChart
                                  data={gameScoreData}
                                  margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                                >
                                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                                  <XAxis dataKey="game" />
                                  <YAxis />
                                  <Tooltip formatter={(value, name, props) => {
                                    return [`Score: ${value}`, `${props.payload.type}`];
                                  }} />
                                  <Bar dataKey="score" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                                  // Continuing from the BarChart in the game performance section
                                </BarChart>
                              </ResponsiveContainer>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="quiz" className="mt-0">
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Quiz Performance</h3>
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={safeUserData.analytics.quizScores}
                          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="quiz" />
                          <YAxis domain={[0, 100]} unit="%" />
                          <Tooltip formatter={(value) => [`${value}%`, 'Score']} />
                          <Bar dataKey="score" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>
          </div>
        </div>

        {/* Learning Modules Section */}
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Learning Modules</h2>
            <div className="flex space-x-2">
              {moduleCategories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {categoryFilteredModules.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryFilteredModules.map((module, i) => (
                <ModuleProgressCard
                  key={module.id}
                  module={{
                    title: module.moduleName || `Module ${i + 1}`,
                    description: module.description || "Learn essential skills and concepts in this comprehensive module.",
                    progress: module.progress || 0,
                    totalLessons: module.totalLessons || 5,
                    completedLessons: module.completedLessons || 0,
                    lastAccessed: module.lastAccessed,
                    estimatedTime: module.estimatedTime || "1h 30m",
                    imageUrl: module.imageUrl
                  }}
                  position={i}
                />
              ))}
            </div>
          ) : (
            <Card className="p-8 text-center">
              <BookOpen className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <CardTitle className="mb-2">No modules found</CardTitle>
              <CardDescription>
                {selectedCategory !== 'all' 
                  ? `No modules found in the ${selectedCategory} category. Try selecting a different category.`
                  : `No learning modules available yet. Check back soon for new content!`}
              </CardDescription>
              {selectedCategory !== 'all' && (
                <Button className="mt-4" variant="outline" onClick={() => setSelectedCategory('all')}>
                  View All Modules
                </Button>
              )}
            </Card>
          )}
        </div>

        
              
      </div>
    </div>
  );
};

export default Dashboard;