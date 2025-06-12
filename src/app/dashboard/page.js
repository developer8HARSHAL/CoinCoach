
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  TrendingUp, 
  BookOpen, 
  Gamepad2, 
  Target, 
  Award, 
  Clock,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Activity
} from 'lucide-react';

function StatCard({ title, value, change, icon: Icon, trend = 'up' }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
            {change && (
              <p className={`text-sm flex items-center mt-1 ${
                trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                <TrendingUp className="w-3 h-3 mr-1" />
                {change}
              </p>
            )}
          </div>
          <div className={`p-3 rounded-lg ${
            trend === 'up' ? 'bg-green-100' : 'bg-blue-100'
          }`}>
            <Icon className={`w-6 h-6 ${
              trend === 'up' ? 'text-green-600' : 'text-blue-600'
            }`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ProgressCard({ title, completed, total, percentage, icon: Icon }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm font-medium text-gray-600">
          <Icon className="w-4 h-4 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span>Completed: {completed}/{total}</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <Progress value={percentage} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
}

function RecentActivity() {
  const activities = [
    {
      type: 'module',
      title: 'Completed Budgeting Basics',
      time: '2 hours ago',
      icon: BookOpen,
      status: 'completed'
    },
    {
      type: 'game',
      title: 'Played Investment Challenge',
      time: '1 day ago',
      icon: Gamepad2,
      status: 'played'
    },
    {
      type: 'achievement',
      title: 'Earned "Savings Master" badge',
      time: '3 days ago',
      icon: Award,
      status: 'earned'
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50">
                <div className="p-2 rounded-lg bg-white">
                  <Icon className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
                <Badge variant={activity.status === 'completed' ? 'default' : 'secondary'}>
                  {activity.status}
                </Badge>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function QuickStats() {
  const stats = [
    { label: 'Learning Streak', value: '7 days', icon: Calendar },
    { label: 'Total Points', value: '1,250', icon: Target },
    { label: 'Rank', value: '#42', icon: Users },
    { label: 'Time Spent', value: '24h', icon: Clock }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center p-3 rounded-lg bg-gray-50">
                <Icon className="w-6 h-6 mx-auto mb-2 text-blue-600" />
                <p className="text-lg font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function LearningPath() {
  const paths = [
    { name: 'Beginner Path', progress: 75, modules: 8, completed: 6 },
    { name: 'Investment Basics', progress: 40, modules: 5, completed: 2 },
    { name: 'Advanced Planning', progress: 10, modules: 10, completed: 1 }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PieChart className="w-5 h-5 mr-2" />
          Learning Paths
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {paths.map((path, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-900">{path.name}</span>
                <span className="text-xs text-gray-500">
                  {path.completed}/{path.modules} modules
                </span>
              </div>
              <Progress value={path.progress} className="h-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">Welcome back!</h1>
        <p className="text-blue-100">
          Continue your financial learning journey. You're doing great!
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Modules Completed"
          value="12"
          change="+2 this week"
          icon={BookOpen}
          trend="up"
        />
        <StatCard
          title="Games Played"
          value="8"
          change="+1 today"
          icon={Gamepad2}
          trend="up"
        />
        <StatCard
          title="Achievements"
          value="5"
          change="New badge earned"
          icon={Award}
          trend="up"
        />
        <StatCard
          title="Learning Score"
          value="850"
          change="+50 points"
          icon={TrendingUp}
          trend="up"
        />
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProgressCard
          title="Module Progress"
          completed={12}
          total={20}
          percentage={60}
          icon={BookOpen}
        />
        <ProgressCard
          title="Game Challenges"
          completed={8}
          total={15}
          percentage={53}
          icon={Gamepad2}
        />
        <ProgressCard
          title="Overall Completion"
          completed={7}
          total={10}
          percentage={70}
          icon={Target}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity />
        </div>
        <div className="space-y-6">
          <QuickStats />
          <LearningPath />
        </div>
      </div>
    </div>
  );
}





























// import React from 'react';
// import Dashboard from '../components/dashboard/Dashboard';
// import { UserDataProvider } from '../components/dashboard/UserDataProvider';

// export default function DashboardPage() {
//   return (
//     <UserDataProvider> 
//       <Dashboard />
//     </UserDataProvider>
//   );
// }