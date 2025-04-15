'use client';
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

// Component for module cards with progress information
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
    
  return (
    <Card className="overflow-hidden border shadow-md hover:shadow-xl h-full flex flex-col">
      <div className="relative">
        <img src={imageSrc} alt={module.title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 p-2">
          <Badge className={`${position === 0 ? 'bg-yellow-500' : 'bg-blue-600'}`}>
            {position === 0 ? 'Recommended' : `Module ${position + 1}`}
          </Badge>
        </div>
        {module.progress >= 100 && (
          <div className="absolute bottom-0 right-0 p-2">
            <Badge className="bg-green-600">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Completed
            </Badge>
          </div>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold line-clamp-1">{module.title}</CardTitle>
        <CardDescription className="line-clamp-2">{module.description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3 flex-grow">
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Progress</span>
              <span className="font-medium text-gray-800">{module.progress}%</span>
            </div>
            <Progress value={module.progress} className="h-2" />
          </div>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div className="flex items-center text-gray-600">
              <Bookmark className="w-4 h-4 mr-1 text-blue-600" />
              <span>{module.totalLessons || 0} lessons</span>
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
          {module.progress > 0 ? 'Continue Learning' : 'Start Learning'}
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

  // Fetch user progress data
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const uid = localStorage.getItem('uid') || sessionStorage.getItem('uid');
        if (!uid) return;
        
        const response = await fetch(`/api/progress?uid=${uid}`);
        const data = await response.json();
        
        if (response.ok) {
          // Process module data to include more details
          const enhancedModules = {};
          
          if (data.modules) {
            Object.keys(data.modules).forEach(moduleId => {
              enhancedModules[moduleId] = {
                ...data.modules[moduleId],
                imageUrl: `/api/placeholder/400/200?text=${encodeURIComponent(data.modules[moduleId]?.moduleName || 'Module')}`,
                estimatedTime: ['30m', '45m', '1h 15m', '2h', '1h 30m'][Math.floor(Math.random() * 5)],
                lastAccessed: new Date(Date.now() - Math.floor(Math.random() * 15) * 24 * 60 * 60 * 1000)
              };
            });
          }
          
          setModuleProgress(enhancedModules || {});
        } else {
          console.warn("⚠️ Request failed or returned error");
          setModuleProgress({});
        }
      } catch (error) {
        console.error("❌ Failed to fetch progress:", error);
        setModuleProgress({});
      }
    };
  
    fetchProgress();
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
  if (!userData && !moduleProgress) {
    return (
     <>
     </>
    );
  }

  // Create a safe userData object with defaults
  const safeUserData = {
    name: userData?.name || "User",
    message: userData?.message || "Welcome to your learning dashboard!",
    modules: userData?.modules || [],
    activityLog: userData?.activityLog || [],
    streaks: userData?.streaks || { currentWeekly: 0, longestWeekly: 0 },
    games: userData?.games || { completed: 0, total: 5, highestScore: 0, favoriteGame: "None", lastPlayed: new Date() },
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
  const gamesProgress = Math.round((safeUserData.games.completed / safeUserData.games.total) * 100) || 0;

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

  // Filter modules by category
  const getFilteredModules = () => {
    if (!moduleProgress) return [];
    
    const modules = Object.keys(moduleProgress).map(key => ({
      id: key,
      ...moduleProgress[key]
    }));
    
    const ageFiltered = getAgeAppropriateContent ? getAgeAppropriateContent(modules) : modules;
    if (selectedCategory === 'all') return ageFiltered;
    return ageFiltered.filter(module => module.category === selectedCategory);
  };

  const categoryFilteredModules = getFilteredModules();

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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                            <div className="text-xl font-bold">{safeUserData.games.completed}/{safeUserData.games.total}</div>
                            <div className="text-sm text-gray-500 mt-1">Highest Score</div>
                            <div className="text-xl font-bold">{safeUserData.games.highestScore}</div>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-4">Game Activity</h3>
                        <div className="space-y-3">
                          <div className="bg-blue-50 p-3 rounded-md">
                            <div className="text-sm text-gray-600">Favorite Game</div>
                            <div className="text-lg font-medium">{safeUserData.games.favoriteGame}</div>
                          </div>
                          <div className="bg-blue-50 p-3 rounded-md">
                            <div className="text-sm text-gray-600">Last Played</div>
                            <div className="text-lg font-medium">
                              {new Date(safeUserData.games.lastPlayed).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
                          <YAxis domain={[0, 100]} />
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

        {/* Module Categories */}
        <div>
          <div className="flex justify-between items-center mb-4">
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryFilteredModules.length > 0 ? (
              categoryFilteredModules.map((module, index) => (
                <ModuleProgressCard key={module.id} module={module} position={index} />
              ))
            ) : (
              <div className="col-span-full bg-white p-8 rounded-lg text-center">
                <h3 className="text-lg font-medium mb-2">No modules found</h3>
                <p className="text-gray-500">
                  {contentFilters?.ageVerified && !contentFilters?.isAdult
                    ? "There are no modules available for your age group in this category."
                    : "No modules found in this category."}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;