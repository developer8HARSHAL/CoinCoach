'use client';

import React, { useState } from 'react';
import { Calendar, User, BarChart2, PieChart, Award, Gamepad2, BookOpen, Target, Activity, ArrowRight,ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import UserProfile from './UserProfile';
import ModuleCard from './ModuleCard';
import { useUserData } from './UserDataProvider';

const Dashboard = () => {
  const { userData } = useUserData() || {};
  const [selectedDate, setSelectedDate] = useState(userData?.activityLog?.[0]?.date || "");
  const [activeTab, setActiveTab] = useState("progress");

  const getActivitiesForDate = (date) => {
    const dayLog = userData.activityLog.find(log => log.date === date);
    return dayLog?.activities || ["No activities recorded for this date"];
  };

  // Calculate overall progress
  const totalLessons = userData.modules.reduce((sum, module) => sum + module.totalLessons, 0);
  const completedLessons = userData.modules.reduce((sum, module) => sum + module.completedLessons, 0);
  const overallProgress = Math.round((completedLessons / totalLessons) * 100);

  const gamesProgress = Math.round((userData.games.completed / userData.games.total) * 100);

  const timeSpentData = userData.analytics.timeSpent.map(item => ({
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

  const recommendedModule = userData.modules.sort((a, b) =>
    (b.lastAccessed > a.lastAccessed) ? 1 :
      ((a.lastAccessed > b.lastAccessed) ? -1 : 0)
  )[0];

  return (
    <div className="p-6 bg-gradient-to-b from-gray-50 to-blue-50 min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <Card className="border-none shadow-lg bg-gradient-to-r from-yellow-500 to-blue-800 text-black">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <h1 className="text-3xl font-bold mb-2">{greeting}, {userData.name}!</h1>
                <p className="text-white mb-6">{userData.message}</p>

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
                        <div className="text-3xl font-bold">{userData.streaks.currentWeekly}</div>
                        <div className="text-sm">
                          <div>day streak</div>
                          <div className="text-white">Best: {userData.streaks.longestWeekly} days</div>
                        </div>
                      </div>
                      <div className="flex space-x-1 mt-2">
                        {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                          <div
                            key={day}
                            className={`h-2 flex-1 rounded-sm ${day <= userData.streaks.currentWeekly ? 'bg-green-400' : 'bg-white/20'}`}
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
            <UserProfile userData={userData} />
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
                      {userData.analytics.moduleEngagement.map((item, index) => (
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
                          <span className="text-sm font-medium text-gray-800">{userData.games.completed}/{userData.games.total}</span>
                        </div>
                        <Progress value={gamesProgress} className="h-2" />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <Card className="bg-orange-50 border-none">
                          <CardContent className="p-4">
                            <h3 className="text-sm text-gray-600">Highest Score</h3>
                            <div className="text-2xl font-bold text-orange-600">{userData.games.highestScore}</div>
                            <div className="text-xs text-gray-500 mt-1">{userData.games.favoriteGame}</div>
                          </CardContent>
                        </Card>

                        <Card className="bg-green-50 border-none">
                          <CardContent className="p-4">
                            <h3 className="text-sm text-gray-600">Favorite Game</h3>
                            <div className="text-lg font-medium text-green-600 line-clamp-1">{userData.games.favoriteGame}</div>
                            <div className="text-xs text-gray-500 mt-1">Last played: {new Date(userData.games.lastPlayed).toLocaleDateString()}</div>
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
                              {Math.round(userData.analytics.quizScores.reduce((sum, quiz) => sum + quiz.score, 0) / userData.analytics.quizScores.length)}%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">Across {userData.analytics.quizScores.length} quizzes</div>
                          </CardContent>
                        </Card>

                        <Card className="bg-green-50 border-none">
                          <CardContent className="p-4">
                            <h3 className="text-sm text-gray-600">Highest Score</h3>
                            <div className="text-2xl font-bold text-green-600">
                              {Math.max(...userData.analytics.quizScores.map(quiz => quiz.score))}%
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                              {userData.analytics.quizScores.sort((a, b) => b.score - a.score)[0].quiz}
                            </div>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="text-sm font-medium text-gray-700 mb-3">Quiz Performance</h3>
                        <div className="space-y-4">
                          {userData.analytics.quizScores.map((item, index) => (
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
                <select
                  className="w-full p-2 border border-gray-300 rounded-md mb-4 text-gray-700 text-sm"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                >
                  {userData.activityLog.map((log) => (
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
              </CardContent>
            </Card>
          </div>
        </div>

       <div className='bg-white p-10 rounded-lg border border-gray-300 shadow-xl'>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Learning Modules</h2>
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
        {userData.modules.map((module, index) => (
          <div
            key={module.id}
            className="min-w-[320px] w-[320px] flex-shrink-0 transition-transform duration-300 hover:scale-105 snap-start"
          >
            <ModuleCard
              module={module}
              position={index + 1}
              totalModules={userData.modules.length}
            />
          </div>
        ))}

        {userData.modules.length === 0 && (
          <div className="min-w-full flex items-center justify-center p-10 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="text-center">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-lg font-medium text-gray-900">No modules yet</h3>
              <p className="mt-1 text-sm text-gray-500">Get started by creating your first learning module.</p>
              <div className="mt-6">
                <Button className="bg-black text-white hover:bg-gray-800">
                  Create Module
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center mt-4 gap-1">
        {userData.modules.length > 0 && Array.from({ length: Math.ceil(userData.modules.length / 3) }).map((_, i) => (
          <button
            key={i}
            className="h-2 w-2 rounded-full bg-gray-300 hover:bg-gray-500 focus:outline-none transition-colors"
            onClick={() => {
              const container = document.getElementById('modules-container');
              if (container) {
                container.scrollTo({ left: i * container.clientWidth, behavior: 'smooth' });
              }
            }}
          />
        ))}
      </div>
    </div>

      </div>
    </div>
  );
};

export default Dashboard;