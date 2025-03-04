'use client';
import React, { useState, useEffect } from 'react';
import { Calendar, User, BarChart2, PieChart, Award, Gamepad2, BookOpen, Target, Activity, ArrowRight, ArrowLeft, Bookmark, CheckCircle2, Clock } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import UserProfile from './UserProfile';
import ModuleCard from './ModuleCard';
import { useUserData } from './UserDataProvider';

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
    <Card className="overflow-hidden border shadow-md transition-all duration-300 hover:shadow-xl h-full flex flex-col">
      <div className="relative">
        <img src={imageSrc} alt={module.title} className="w-full h-48 object-cover" />
        <div className="absolute top-0 right-0 p-2">
          <Badge className={`${position === 0 ? 'bg-yellow-500' : 'bg-blue-600'}`}>
            {position === 0 ? 'Recommended' : `Module ${position}`}
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

const Dashboard = () => {
  const { userData } = useUserData() || {};
  const [selectedDate, setSelectedDate] = useState("");
  const [activeTab, setActiveTab] = useState("progress");
  const [moduleProgress, setModuleProgress] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Set selected date once userData is loaded
  useEffect(() => {
    if (userData?.activityLog?.length > 0) {
      setSelectedDate(userData.activityLog[0].date);
    }
  }, [userData]);

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/progress?uid=user123`);
        const data = await response.json();
        
        console.log("📊 Received Progress Data:", data);
  
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
          // Set empty object to prevent null
          setModuleProgress({});
        }
      } catch (error) {
        console.error("❌ Failed to fetch progress:", error);
        // Set empty object on error
        setModuleProgress({});
      }
    };
  
    fetchProgress();
  }, []);
  
  // Loading state
  if (!userData && !moduleProgress) {
    return (
      <div className="p-6 bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Loading dashboard...</h2>
          <p className="text-gray-500">Please wait while we fetch your data</p>
        </div>
      </div>
    );
  }

  // Create a safe userData object with defaults
  const safeUserData = {
    name: userData?.name || "User",
    message: userData?.message || "Welcome to your financial education dashboard!",
    modules: userData?.modules || [],
    activityLog: userData?.activityLog || [],
    streaks: userData?.streaks || { currentWeekly: 0, longestWeekly: 0 },
    games: userData?.games || { completed: 0, total: 0, highestScore: 0, favoriteGame: "None", lastPlayed: new Date() },
    analytics: userData?.analytics || { 
      timeSpent: [], 
      moduleEngagement: [],
      quizScores: []
    }
  };

  const getActivitiesForDate = (date) => {
    const dayLog = safeUserData.activityLog.find(log => log.date === date);
    return dayLog?.activities || ["No activities recorded for this date"];
  };

  // Calculate overall progress with fallbacks
  const totalLessons = safeUserData.modules.reduce((sum, module) => sum + (module.totalLessons || 0), 0);
  const completedLessons = safeUserData.modules.reduce((sum, module) => sum + (module.completedLessons || 0), 0);
  const overallProgress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  const gamesProgress = Math.round((safeUserData.games.completed / safeUserData.games.total) * 100) || 0;

  const timeSpentData = safeUserData.analytics.timeSpent.map(item => ({
    name: item.week,
    hours: item.hours
  }));

  const currentHour = new Date().getHours();
  let greeting = "Good morning";
  if (currentHour >= 12 && currentHour < 17) {
    greeting = "Good afternoon";
  } else if (currentHour >= 17) {
    greeting = "Good evening";
  }

  // Safe recommended module
  const recommendedModule = safeUserData.modules.length > 0 
    ? safeUserData.modules.sort((a, b) => 
        ((b.lastAccessed || 0) > (a.lastAccessed || 0)) ? 1 : -1
      )[0]
    : { title: "No modules yet", description: "Get started with your financial education", progress: 0 };

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
    
    if (selectedCategory === 'all') return modules;
    return modules.filter(module => module.category === selectedCategory);
  };

  const filteredModules = getFilteredModules();

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="border-none shadow-lg bg-gradient-to-r from-yellow-500 to-blue-800 text-black">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold mb-2">{greeting}, {safeUserData.name}!</h1>
                <p className="text-white mb-6">{safeUserData.message}</p>

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
                <Button className="mt-6 bg-white text-black hover:bg-blue-100 w-full">
                  Continue Learning
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

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
                    <h3 className="text-sm font-medium text-gray-700 mb-4">Time Spent Learning (Last 5 Weeks)</h3>
                    <div className="h-52">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={timeSpentData}
                          margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" vertical={false} />
                          <XAxis dataKey="name" />
                          <YAxis unit="h" />
                          <Tooltip formatter={(value) => [`${value} hours`, 'Time Spent']} />
                          <Bar
                            dataKey="hours"
                            fill="#4F46E5"
                            radius={[4, 4, 0, 0]}
                            barSize={40}
                          />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>

                    <h3 className="text-sm font-medium text-gray-700 mt-8 mb-4">Module Engagement</h3>
                    <div className="space-y-4">
                      {safeUserData.analytics.moduleEngagement.map((item, index) => (
                        <div key={index}>
                          <div className="flex justify-between text-sm mb-1">
                            <span>{item.module}</span>
                            <span className="font-medium">{item.percentage}%</span>
                          </div>
                          <Progress value={item.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="games" className="mt-0">
                    <div className="space-y-6">
                      <div>
                        <div className="flex justify-between mb-2">
                          <span className="text-sm text-gray-600">Games Completed</span>
                          <span className="text-sm font-medium text-gray-800">{safeUserData.games.completed}/{safeUserData.games.total}</span>
                        </div>
                        <Progress value={gamesProgress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-orange-50 border-none">
                          <CardContent className="p-4">
                            <h3 className="text-sm text-gray-600">Highest Score</h3>
                            <div className="text-2xl font-bold text-orange-600">{safeUserData.games.highestScore}</div>
                            <div className="text-xs text-gray-500 mt-1">{safeUserData.games.favoriteGame}</div>
                          </CardContent>
                        </Card>

                        <Card className="bg-green-50 border-none">
                          <CardContent className="p-4">
                            <h3 className="text-sm text-gray-600">Favorite Game</h3>
                            <div className="text-lg font-medium text-green-600 line-clamp-1">{safeUserData.games.favoriteGame}</div>
                            <div className="text-xs text-gray-500 mt-1">Last played: {new Date(safeUserData.games.lastPlayed).toLocaleDateString()}</div>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Recent Achievements</h3>
                        <div className="space-y-3">
                          <div className="flex items-center p-3 bg-yellow-50 rounded-lg">
                            <div className="bg-yellow-100 p-2 rounded-full">
                              <Award className="h-4 w-4 text-yellow-600" />
                            </div>
                            <div className="ml-3">
                              <span className="text-sm font-medium block">Budget Master</span>
                              <span className="text-xs text-gray-500">Completed all budget games</span>
                            </div>
                          </div>
                          <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                            <div className="bg-blue-100 p-2 rounded-full">
                              <Award className="h-4 w-4 text-blue-600" />
                            </div>
                            <div className="ml-3">
                              <span className="text-sm font-medium block">Stock Trader</span>
                              <span className="text-xs text-gray-500">Reached 10% profit in simulator</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        Play Financial Games
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="quiz" className="mt-0">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <Card className="bg-blue-50 border-none">
                          <CardContent className="p-4">
                            <h3 className="text-sm text-gray-600">Average Score</h3>
                            <div className="text-2xl font-bold text-blue-600">
                              {safeUserData.analytics.quizScores.length > 0 ? 
                                Math.round(safeUserData.analytics.quizScores.reduce((sum, quiz) => sum + quiz.score, 0) / safeUserData.analytics.quizScores.length) :
                                0}%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Across {safeUserData.analytics.quizScores.length} quizzes</div>
                          </CardContent>
                        </Card>

                        <Card className="bg-green-50 border-none">
                          <CardContent className="p-4">
                            <h3 className="text-sm text-gray-600">Highest Score</h3>
                            <div className="text-2xl font-bold text-green-600">
                              {safeUserData.analytics.quizScores.length > 0 ?
                                Math.max(...safeUserData.analytics.quizScores.map(quiz => quiz.score)) :
                                0}%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {safeUserData.analytics.quizScores.length > 0 ?
                                safeUserData.analytics.quizScores.sort((a, b) => b.score - a.score)[0].quiz :
                                "No quizzes taken"}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Quiz Performance</h3>
                        <div className="space-y-4">
                          {safeUserData.analytics.quizScores.map((item, index) => (
                            <div key={index}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{item.quiz}</span>
                                <span className="font-medium">{item.score}%</span>
                              </div>
                              <Progress
                                value={item.score}
                                className={`h-2 ${item.score >= 90 ? 'bg-green-100' :
                                  item.score >= 80 ? 'bg-blue-100' :
                                    item.score >= 70 ? 'bg-yellow-100' :
                                      'bg-red-100'
                                  }`}
                              />
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button className="w-full">
                        Take Practice Quiz
                      </Button>
                    </div>
                  </TabsContent>
                </CardContent>
              </Card>
            </Tabs>

            <Card>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Activity</CardTitle>
                  <Activity className="h-5 w-5 text-gray-500" />
                </div>
              </CardHeader>
              <CardContent>
                {safeUserData.activityLog.length > 0 ? (
                  <>
                    <select
                      className="w-full p-2 border border-gray-300 rounded-md mb-4 text-gray-700 text-sm"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                    >
                      {safeUserData.activityLog.map((log) => (
                        <option key={log.date} value={log.date}>
                          {new Date(log.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                        </option>
                      ))}
                    </select>
                    <ul className="text-sm text-gray-600 space-y-3">
                      {getActivitiesForDate(selectedDate).map((activity, index) => (
                        <li key={index} className="flex items-start pb-3 border-b border-gray-100 last:border-0">
                          <span className="inline-block h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-2"></span>
                          {activity}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <p>No activity recorded yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className='bg-white p-10 rounded-lg border border-gray-300 shadow-xl'>
          <div className="mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Learning Modules</h2>
              <div className="flex space-x-2">
                {moduleCategories.map(category => (
                  <Button 
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    variant={selectedCategory === category ? "default" : "outline"}
                    className={`px-4 py-2 text-sm ${selectedCategory === category ? 'bg-blue-600' : 'bg-white'}`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </Button>
                ))}
              </div>
            </div>
            
            {moduleProgress && Object.keys(moduleProgress).length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {filteredModules.map((module, index) => (
                  <ModuleProgressCard
                    key={module.id}
                    module={{
                      id: module.id,
                      title: module.moduleName || `Module ${index + 1}`,
                      description: module.description || "Learn important financial concepts and skills through interactive lessons.",
                      progress: module.progress || 0,
                      imageUrl: module.imageUrl,
                      totalLessons: module.totalLessons || Math.floor(Math.random() * 10) + 5,
                      estimatedTime: module.estimatedTime,
                      lastAccessed: module.lastAccessed
                    }}
                    position={index}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-lg mb-8">
                <BookOpen className="h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-gray-900">No modules available</h3>
                <p className="mt-1 text-sm text-gray-500">We couldn't find any learning modules to display.</p>
                <Button className="mt-6 bg-blue-600 hover:bg-blue-700">
                  Browse Course Catalog
                </Button>
              </div>
            )}
          </div>

          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Course Modules</h2>
              <div className="flex gap-2">
                <Button
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                  variant="outline"
                  onClick={() => {
                    const container = document.getElementById('modules-container');
                    if (container) {
                      container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
                    }
                  }}
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <Button
                  className="bg-gray-200 text-gray-700 hover:bg-gray-300"
                  variant="outline"
                  onClick={() => {
                    const container = document.getElementById('modules-container');
                    if (container) {
                      container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
                    }
                  }}
                >
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div
              id="modules-container"
              className="flex overflow-x-auto pb-4 gap-6 snap-x snap-mandatory scroll-smooth"
              style={{ scrollbarWidth: 'thin', scrollbarColor: '#CBD5E0 #F7FAFC' }}
            >
              {safeUserData.modules && safeUserData.modules.length > 0 ? (
                safeUserData.modules.map((module, index) => (
                  <div
                    key={module.id}
                    className="min-w-[320px] w-[320px] flex-shrink-0 transition-transform duration-300 hover:scale-105 snap-start"
                  >
                    <ModuleCard
                      module={module}
                      position={index + 1}
                      totalModules={safeUserData.modules.length}
                    />
                  </div>
                ))
              ) : (
                <div className="min-w-full flex items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
                  <div className="text-center">
                    <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-lg font-medium text-gray-900">No modules yet</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating your first learning module.</p>
                    <div className="mt-6">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Create First Module
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-none shadow-lg text-white">
          <CardContent className="p-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="space-y-2">
                <h2 className="text-xl font-bold">Ready to improve your financial skills?</h2>
                <p className="text-blue-100">Set up your learning goals and track your progress.</p>
              </div>
              <Button className="bg-white text-blue-600 hover:bg-blue-50">
                Set Learning Goals
                <Target className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;