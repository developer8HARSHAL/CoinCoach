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
  Activity,
  Loader2
} from 'lucide-react';
import { useUserData, UserDataProvider } from '@/app/components/dashboard/UserDataProvider';


function StatCard({ title, value, change, icon: Icon, trend = 'up', loading = false }) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            {loading ? (
              <div className="flex items-center">
                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                <span className="text-lg text-gray-400">Loading...</span>
              </div>
            ) : (
              <>
                <p className="text-2xl font-bold text-gray-900">{value}</p>
                {change && (
                  <p className={`text-sm flex items-center mt-1 ${
                    trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {change}
                  </p>
                )}
              </>
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

function ProgressCard({ title, completed, total, percentage, icon: Icon, loading = false }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center text-sm font-medium text-gray-600">
          <Icon className="w-4 h-4 mr-2" />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-4">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Completed: {completed}/{total}</span>
              <span className="font-medium">{percentage}%</span>
            </div>
            <Progress value={percentage} className="h-2" />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function RecentActivity({ userData, loading }) {
  // Generate recent activities based on user data
  const getRecentActivities = () => {
    if (!userData) return [];
    
    const activities = [];
    
    // Add recent module completion
    if (userData.completedModules > 0) {
      activities.push({
        type: 'module',
        title: `Completed ${userData.completedModules} learning modules`,
        time: userData.lastLearningDate ? formatTimeAgo(userData.lastLearningDate) : 'Recently',
        icon: BookOpen,
        status: 'completed'
      });
    }
    
    // Add game activity
    if (userData.gamesPlayed > 0) {
      activities.push({
        type: 'game',
        title: `Played ${userData.gamesPlayed} games`,
        time: 'Recently',
        icon: Gamepad2,
        status: 'played'
      });
    }
    
    // Add recent badges
    const recentBadges = userData.badges?.filter(badge => badge.earned) || [];
    if (recentBadges.length > 0) {
      const latestBadge = recentBadges[recentBadges.length - 1];
      activities.push({
        type: 'achievement',
        title: `Earned "${latestBadge.name}" badge`,
        time: latestBadge.earnedDate ? formatTimeAgo(latestBadge.earnedDate) : 'Recently',
        icon: Award,
        status: 'earned'
      });
    }
    
    // Fill with default if no activities
    if (activities.length === 0) {
      activities.push({
        type: 'welcome',
        title: 'Welcome to your dashboard!',
        time: 'Start learning',
        icon: Target,
        status: 'new'
      });
    }
    
    return activities.slice(0, 3); // Show only last 3 activities
  };

  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    return 'Recently';
  };

  const activities = getRecentActivities();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Activity className="w-5 h-5 mr-2" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}

function QuickStats({ userData, loading }) {
  const getStats = () => {
    if (!userData) return [];
    
    return [
      { 
        label: 'Learning Streak', 
        value: userData.learningStreak ? `${userData.learningStreak} days` : '0 days', 
        icon: Calendar 
      },
      { 
        label: 'Average Score', 
        value: userData.averageScore ? `${Math.round(userData.averageScore)}%` : '0%', 
        icon: Target 
      },
      { 
        label: 'Games Won', 
        value: userData.gamesWon || '0', 
        icon: Users 
      },
      { 
        label: 'Win Rate', 
        value: userData.gamesPlayed > 0 ? `${Math.round((userData.gamesWon / userData.gamesPlayed) * 100)}%` : '0%', 
        icon: Clock 
      }
    ];
  };

  const stats = getStats();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <BarChart3 className="w-5 h-5 mr-2" />
          Quick Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}

function LearningPath({ userData, loading }) {
  const getLearningPaths = () => {
    if (!userData) return [];
    
    const totalModules = userData.totalModules || 20;
    const completedModules = userData.completedModules || 0;
    const inProgressModules = userData.inProgressModules || 0;
    
    // Calculate progress for different learning paths based on user data
    const beginnerProgress = Math.min((completedModules / Math.ceil(totalModules * 0.4)) * 100, 100);
    const intermediateProgress = Math.max(0, Math.min(((completedModules - Math.ceil(totalModules * 0.4)) / Math.ceil(totalModules * 0.35)) * 100, 100));
    const advancedProgress = Math.max(0, Math.min(((completedModules - Math.ceil(totalModules * 0.75)) / Math.ceil(totalModules * 0.25)) * 100, 100));
    
    return [
      { 
        name: 'Beginner Path', 
        progress: Math.round(beginnerProgress), 
        modules: Math.ceil(totalModules * 0.4), 
        completed: Math.min(completedModules, Math.ceil(totalModules * 0.4))
      },
      { 
        name: 'Intermediate Path', 
        progress: Math.round(intermediateProgress), 
        modules: Math.ceil(totalModules * 0.35), 
        completed: Math.max(0, Math.min(completedModules - Math.ceil(totalModules * 0.4), Math.ceil(totalModules * 0.35)))
      },
      { 
        name: 'Advanced Path', 
        progress: Math.round(advancedProgress), 
        modules: Math.ceil(totalModules * 0.25), 
        completed: Math.max(0, completedModules - Math.ceil(totalModules * 0.75))
      }
    ];
  };

  const paths = getLearningPaths();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <PieChart className="w-5 h-5 mr-2" />
          Learning Paths
        </CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
          </div>
        ) : (
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
        )}
      </CardContent>
    </Card>
  );
}

function DashboardContent() {
  const { userData, loading, error, dashboardStats } = useUserData();

  // Show error state
  if (error && !userData) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <p className="text-red-600 mb-2">Error loading dashboard data</p>
              <p className="text-sm text-gray-600">{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Calculate dynamic values
  const completionRate = userData ? (userData.totalModules > 0 ? 
    Math.round((userData.completedModules / userData.totalModules) * 100) : 0) : 0;
  
  const gameCompletionRate = userData ? (userData.gamesPlayed > 0 ? 
    Math.round((userData.gamesWon / userData.gamesPlayed) * 100) : 0) : 0;

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back{userData?.name ? `, ${userData.name.split(' ')[0]}` : ''}!
        </h1>
        <p className="text-blue-100">
          {loading 
            ? "Loading your progress..." 
            : userData?.completedModules > 0 
              ? `You've completed ${userData.completedModules} modules. Keep going!`
              : "Continue your financial learning journey. You're doing great!"
          }
        </p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Modules Completed"
          value={loading ? "..." : (userData?.completedModules || 0)}
          change={userData?.completedModules > 0 ? `${userData.inProgressModules || 0} in progress` : null}
          icon={BookOpen}
          trend="up"
          loading={loading}
        />
        <StatCard
          title="Games Played"
          value={loading ? "..." : (userData?.gamesPlayed || 0)}
          change={userData?.gamesWon > 0 ? `${userData.gamesWon} won` : null}
          icon={Gamepad2}
          trend="up"
          loading={loading}
        />
        <StatCard
          title="Achievements"
          value={loading ? "..." : (userData?.badges?.filter(badge => badge.earned).length || 0)}
          change={userData?.badges?.length > 1 ? "New badges available" : null}
          icon={Award}
          trend="up"
          loading={loading}
        />
        <StatCard
          title="Learning Score"
          value={loading ? "..." : Math.round(userData?.averageScore || 0)}
          change={userData?.averageScore > 0 ? `${completionRate}% complete` : null}
          icon={TrendingUp}
          trend="up"
          loading={loading}
        />
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ProgressCard
          title="Module Progress"
          completed={userData?.completedModules || 0}
          total={userData?.totalModules || 20}
          percentage={completionRate}
          icon={BookOpen}
          loading={loading}
        />
        <ProgressCard
          title="Game Challenges"
          completed={userData?.gamesWon || 0}
          total={userData?.gamesPlayed || 0}
          percentage={gameCompletionRate}
          icon={Gamepad2}
          loading={loading}
        />
        <ProgressCard
          title="Overall Completion"
          completed={userData?.completedModules || 0}
          total={(userData?.completedModules || 0) + (userData?.inProgressModules || 0)}
          percentage={dashboardStats?.completionRate || 0}
          icon={Target}
          loading={loading}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentActivity userData={userData} loading={loading} />
        </div>
        <div className="space-y-6">
          <QuickStats userData={userData} loading={loading} />
          <LearningPath userData={userData} loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <UserDataProvider>
      <DashboardContent />
    </UserDataProvider>
  );
}
