'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BookOpen, 
  Clock, 
  CheckCircle, 
  PlayCircle, 
  Lock,
  Star,
  Users,
  Calendar,
  Award,
  Filter,
  Search,
  TrendingUp,
  Loader2,
  AlertCircle,
  RefreshCw
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function ModuleCard({ module, onStartModule, onContinueModule, loading }) {
  const { id, title, description, duration, difficulty, progress, status, category, rating, enrolledUsers, imageUrl } = module;
  
  const getStatusIcon = () => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="w-5 h-5 text-blue-600" />;
      case 'locked':
        return <Lock className="w-5 h-5 text-gray-400" />;
      default:
        return <BookOpen className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'completed':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'in-progress':
        return 'bg-blue-50 border-blue-200 text-blue-800';
      case 'locked':
        return 'bg-gray-50 border-gray-200 text-gray-500';
      default:
        return 'bg-white border-gray-200 text-gray-800';
    }
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800';
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'Advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${getStatusColor()}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            {getStatusIcon()}
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge className={getDifficultyColor()}>{difficulty}</Badge>
        </div>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Module Image */}
          {imageUrl && (
            <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
              <img 
                src={imageUrl} 
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            </div>
          )}

          {/* Module Stats */}
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              {duration}
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {enrolledUsers}
            </div>
            <div className="flex items-center">
              <Star className="w-4 h-4 mr-1 text-yellow-500" />
              {rating}
            </div>
          </div>

          {/* Progress Bar */}
          {status === 'in-progress' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-between items-center">
            <span className="text-xs text-gray-500">Category: {category}</span>
            {status === 'available' && (
              <Button 
                onClick={() => onStartModule(module)} 
                size="sm"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Start Module'}
              </Button>
            )}
            {status === 'in-progress' && (
              <Button 
                onClick={() => onContinueModule(module)} 
                size="sm" 
                variant="outline"
                disabled={loading}
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Continue'}
              </Button>
            )}
            {status === 'completed' && (
              <Button size="sm" variant="ghost" className="text-green-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                Completed
              </Button>
            )}
            {status === 'locked' && (
              <Button size="sm" variant="ghost" disabled>
                <Lock className="w-4 h-4 mr-1" />
                Locked
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ModuleStats({ stats, loading }) {
  const statItems = [
    { label: 'Total Modules', value: stats?.total || 0, icon: BookOpen },
    { label: 'Completed', value: stats?.completed || 0, icon: CheckCircle },
    { label: 'In Progress', value: stats?.inProgress || 0, icon: PlayCircle },
    { label: 'Available', value: stats?.available || 0, icon: Award }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-100 rounded-lg animate-pulse">
                  <div className="w-5 h-5 bg-gray-300 rounded" />
                </div>
                <div>
                  <div className="h-6 bg-gray-300 rounded animate-pulse w-8 mb-1" />
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {statItems.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

function CompletionOverview({ categoryStats, loading }) {
  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Completion by Category
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="h-4 bg-gray-300 rounded animate-pulse w-20" />
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-12" />
                </div>
                <div className="h-2 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Completion by Category
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {categoryStats?.map((category, index) => {
            const percentage = category.total > 0 ? Math.round((category.completed / category.total) * 100) : 0;
            return (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium">{category.name}</span>
                  <span className="text-xs text-gray-500">
                    {category.completed}/{category.total} ({percentage}%)
                  </span>
                </div>
                <Progress value={percentage} className="h-2" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

function LoadingSkeleton() {
  return (
    <div className="grid gap-4">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="animate-pulse">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gray-300 rounded" />
                <div className="h-5 bg-gray-300 rounded w-40" />
              </div>
              <div className="h-5 bg-gray-200 rounded w-16" />
            </div>
            <div className="h-4 bg-gray-200 rounded w-full mt-2" />
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-4 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-12" />
                <div className="h-4 bg-gray-200 rounded w-8" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-3 bg-gray-200 rounded w-20" />
                <div className="h-8 bg-gray-300 rounded w-24" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default function ModulesPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [modules, setModules] = useState([]);
  const [stats, setStats] = useState({});
  const [categoryStats, setCategoryStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);
  const { user } = useAuth();
  const router = useRouter();

  // Fetch modules data
  const fetchModules = async (category = 'all', status = 'all') => {
    try {
      setLoading(true);
      setError(null);
      
      const params = new URLSearchParams();
      if (category !== 'all') params.append('category', category);
      if (status !== 'all') params.append('status', status);
      
      const response = await fetch(`/api/modules?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch modules: ${response.statusText}`);
      }
      
      const data = await response.json();
      
      setModules(data.modules || []);
      setStats(data.stats || {});
      setCategoryStats(data.categoryStats || []);
      
    } catch (err) {
      console.error('Error fetching modules:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    fetchModules();
  }, []);

  // Refetch when tab changes
  useEffect(() => {
    if (activeTab !== 'all') {
      fetchModules('all', activeTab);
    } else {
      fetchModules();
    }
  }, [activeTab]);

  const handleStartModule = async (module) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    setActionLoading(true);
    try {
      // Update progress to indicate module started
      const response = await fetch('/api/modules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          moduleId: module.id,
          courseId: module.courseId,
          progress: 1,
          status: 'in-progress',
          completedSections: 0,
          totalSections: 1
        }),
      });

      if (response.ok) {
        // Navigate to the course page
        router.push(`/courses/${module.courseId}`);
      } else {
        throw new Error('Failed to start module');
      }
    } catch (err) {
      console.error('Error starting module:', err);
      setError('Failed to start module. Please try again.');
    } finally {
      setActionLoading(false);
    }
  };

  const handleContinueModule = async (module) => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    // Navigate to the course page
    router.push(`/courses/${module.courseId}`);
  };

  const handleRefresh = () => {
    fetchModules();
  };

  if (error && !loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Learning Modules</h1>
            <p className="text-gray-600">Track your progress and continue learning</p>
          </div>
        </div>
        
        <Card className="p-6">
          <div className="flex flex-col items-center space-y-4">
            <AlertCircle className="w-12 h-12 text-red-500" />
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900">Error Loading Modules</h3>
              <p className="text-gray-600 mt-1">{error}</p>
            </div>
            <Button onClick={handleRefresh} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Modules</h1>
          <p className="text-gray-600">Track your progress and continue learning</p>
          {!user && (
            <p className="text-sm text-amber-600 mt-1">
              <Link href="/auth/login" className="underline">Sign in</Link> to track your progress
            </p>
          )}
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefresh} disabled={loading}>
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <ModuleStats stats={stats} loading={loading} />

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Modules List */}
        <div className="lg:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="all">All Modules</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="available">Available</TabsTrigger>
            </TabsList>
            <TabsContent value={activeTab} className="mt-6">
              {loading ? (
                <LoadingSkeleton />
              ) : modules.length === 0 ? (
                <Card className="p-6">
                  <div className="text-center">
                    <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900">No modules found</h3>
                    <p className="text-gray-600 mt-1">
                      {activeTab === 'all' 
                        ? 'No modules available at the moment.'
                        : `No ${activeTab.replace('-', ' ')} modules found.`
                      }
                    </p>
                  </div>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {modules.map((module) => (
                    <ModuleCard
                      key={module.id}
                      module={module}
                      onStartModule={handleStartModule}
                      onContinueModule={handleContinueModule}
                      loading={actionLoading}
                    />
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div>
          <CompletionOverview categoryStats={categoryStats} loading={loading} />
        </div>
      </div>
    </div>
  );
}