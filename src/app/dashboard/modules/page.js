'use client';

import { useState } from 'react';
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
  TrendingUp
} from 'lucide-react';

function ModuleCard({ module, onStartModule, onContinueModule }) {
  const { id, title, description, duration, difficulty, progress, status, category, rating, enrolledUsers } = module;
  
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
              <Button onClick={() => onStartModule(id)} size="sm">
                Start Module
              </Button>
            )}
            {status === 'in-progress' && (
              <Button onClick={() => onContinueModule(id)} size="sm" variant="outline">
                Continue
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

function ModuleStats() {
  const stats = [
    { label: 'Total Modules', value: '25', icon: BookOpen },
    { label: 'Completed', value: '12', icon: CheckCircle },
    { label: 'In Progress', value: '3', icon: PlayCircle },
    { label: 'Achievements', value: '8', icon: Award }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
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

function CompletionOverview() {
  const categories = [
    { name: 'Budgeting', completed: 4, total: 6, color: 'bg-blue-500' },
    { name: 'Investing', completed: 2, total: 5, color: 'bg-green-500' },
    { name: 'Savings', completed: 3, total: 4, color: 'bg-yellow-500' },
    { name: 'Debt Management', completed: 1, total: 3, color: 'bg-red-500' },
    { name: 'Tax Planning', completed: 2, total: 7, color: 'bg-purple-500' }
  ];

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
          {categories.map((category, index) => {
            const percentage = Math.round((category.completed / category.total) * 100);
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

export default function ModulesPage() {
  const [activeTab, setActiveTab] = useState('all');

  // Sample module data
  const modules = [
    {
      id: 1,
      title: 'Budgeting Fundamentals',
      description: 'Learn the basics of creating and managing a personal budget',
      duration: '45 min',
      difficulty: 'Beginner',
      progress: 100,
      status: 'completed',
      category: 'Budgeting',
      rating: 4.8,
      enrolledUsers: '1.2k'
    },
    {
      id: 2,
      title: 'Investment Strategies',
      description: 'Explore different investment options and strategies for beginners',
      duration: '60 min',
      difficulty: 'Intermediate',
      progress: 65,
      status: 'in-progress',
      category: 'Investing',
      rating: 4.9,
      enrolledUsers: '950'
    },
    {
      id: 3,
      title: 'Emergency Fund Planning',
      description: 'Build and maintain an emergency fund for financial security',
      duration: '30 min',
      difficulty: 'Beginner',
      progress: 0,
      status: 'available',
      category: 'Savings',
      rating: 4.7,
      enrolledUsers: '800'
    },
    {
      id: 4,
      title: 'Advanced Portfolio Management',
      description: 'Advanced techniques for managing investment portfolios',
      duration: '90 min',
      difficulty: 'Advanced',
      progress: 0,
      status: 'locked',
      category: 'Investing',
      rating: 4.6,
      enrolledUsers: '320'
    }
  ];

  const handleStartModule = (moduleId) => {
    console.log('Starting module:', moduleId);
    // Implementation would go here
  };

  const handleContinueModule = (moduleId) => {
    console.log('Continuing module:', moduleId);
    // Implementation would go here
  };

  const filterModules = (filter) => {
    switch (filter) {
      case 'completed':
        return modules.filter(m => m.status === 'completed');
      case 'in-progress':
        return modules.filter(m => m.status === 'in-progress');
      case 'available':
        return modules.filter(m => m.status === 'available');
      default:
        return modules;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Learning Modules</h1>
          <p className="text-gray-600">Track your progress and continue learning</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button variant="outline" size="sm">
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <ModuleStats />

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
              <div className="grid gap-4">
                {filterModules(activeTab).map((module) => (
                  <ModuleCard
                    key={module.id}
                    module={module}
                    onStartModule={handleStartModule}
                    onContinueModule={handleContinueModule}
                  />
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div>
          <CompletionOverview />
        </div>
      </div>
    </div>
  );
}