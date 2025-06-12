'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../components/auth/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Trophy, 
  Target, 
  Star, 
  Zap, 
  Clock, 
  Medal,
  Play,
  Lock,
  CheckCircle2,
  TrendingUp,
  Gamepad2,
  Loader2
} from 'lucide-react';

export default function GamesPage() {
  const { user, loading: authLoading } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Available games configuration
  const availableGames = [
    {
      id: 'drag-drop-budget',
      title: 'Drag and Drop Budget',
      category: 'budgeting',
      difficulty: 'beginner',
      estimatedTime: '10-15 min',
      description: 'Learn to create and manage personal budgets through interactive drag and drop',
      gameLink: '/games/draganddrop'
    },
    {
      id: 'grocery-game',
      title: 'Grocery Shopping Game',
      category: 'budgeting',
      difficulty: 'beginner',
      estimatedTime: '8-12 min',
      description: 'Practice smart shopping and budgeting skills',
      gameLink: '/components/youngCourses/groceryGame'
    },
    {
      id: 'investment-basics',
      title: 'Investment Strategy Quest',
      category: 'investing',
      difficulty: 'intermediate',
      estimatedTime: '20-25 min',
      description: 'Explore different investment strategies and portfolios',
      gameLink: '/investments'
    },
    {
      id: 'upi-payment',
      title: 'UPI Payment Simulator',
      category: 'financial-literacy',
      difficulty: 'beginner',
      estimatedTime: '5-10 min',
      description: 'Learn digital payment methods and security',
      gameLink: '/components/youngCourses/upiPayment'
    },
    {
      id: 'bank-statement',
      title: 'Bank Statement Analysis',
      category: 'financial-literacy',
      difficulty: 'intermediate',
      estimatedTime: '15-20 min',
      description: 'Understand and analyze bank statements',
      gameLink: '/components/youngCourses/bankStatementt'
    },
    {
      id: 'opportunity-cost',
      title: 'Opportunity Cost Challenge',
      category: 'financial-literacy',
      difficulty: 'beginner',
      estimatedTime: '10-15 min',
      description: 'Learn about opportunity cost through real-world scenarios',
      gameLink: '/components/youngCourses/opportunityCost'
    }
  ];

  const gameCategories = [
    { id: 'financial-literacy', name: 'Financial Literacy', icon: TrendingUp, color: 'bg-green-500' },
    { id: 'budgeting', name: 'Budgeting', icon: Target, color: 'bg-blue-500' },
    { id: 'investing', name: 'Investing', icon: Trophy, color: 'bg-purple-500' },
    { id: 'savings', name: 'Savings', icon: Star, color: 'bg-yellow-500' }
  ];

  // Fetch game data from API
  useEffect(() => {
    const fetchGameData = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await fetch(`/api/user/games?email=${encodeURIComponent(user.email)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch game data');
        }

        const data = await response.json();
        setGameData(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching game data:', err);
        setError(err.message);
        // Set default empty data on error
        setGameData({
          totalGamesPlayed: 0,
          totalUniqueGamesPlayed: 0,
          bestGameScore: 0,
          lastGamePlayed: null,
          gamesPlayed: [],
          gameHistory: []
        });
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      fetchGameData();
    }
  }, [user?.email, authLoading]);

  // Calculate game statistics
  const getGameStats = () => {
    if (!gameData) return {
      totalGamesPlayed: 0,
      averageScore: 0,
      totalAchievements: 0,
      currentStreak: 0,
      bestStreak: 0,
      totalPlayTime: 0
    };

    const averageScore = gameData.gameHistory.length > 0 
      ? Math.round(gameData.gameHistory.reduce((sum, game) => sum + (game.score || 0), 0) / gameData.gameHistory.length)
      : 0;

    // Calculate current streak (simplified - consecutive days)
    const currentStreak = calculateCurrentStreak(gameData.gameHistory);
    
    // Calculate total play time from game history
    const totalPlayTime = gameData.gameHistory.reduce((sum, game) => sum + (game.duration || 0), 0);

    return {
      totalGamesPlayed: gameData.totalGamesPlayed,
      averageScore,
      totalAchievements: calculateAchievements(gameData).filter(a => a.unlocked).length,
      currentStreak,
      bestStreak: currentStreak, // Simplified
      totalPlayTime: Math.round(totalPlayTime / 60) // Convert to minutes
    };
  };

  // Calculate current playing streak
  const calculateCurrentStreak = (gameHistory) => {
    if (!gameHistory || gameHistory.length === 0) return 0;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let streak = 0;
    let currentDate = new Date(today);
    
    // Get unique dates when games were played
    const playedDates = [...new Set(gameHistory.map(game => {
      const date = new Date(game.timestamp);
      date.setHours(0, 0, 0, 0);
      return date.getTime();
    }))].sort((a, b) => b - a);
    
    // Check consecutive days
    for (let i = 0; i < playedDates.length; i++) {
      if (playedDates[i] === currentDate.getTime()) {
        streak++;
        currentDate.setDate(currentDate.getDate() - 1);
      } else {
        break;
      }
    }
    
    return streak;
  };

  // Calculate achievements based on game data
  const calculateAchievements = (gameData) => {
    if (!gameData) return [];
    
    const achievements = [
      {
        id: 1,
        title: 'First Steps',
        description: 'Complete your first game',
        icon: Star,
        unlocked: gameData.totalGamesPlayed > 0,
        category: 'milestone'
      },
      {
        id: 2,
        title: 'Budget Master',
        description: 'Score 80% or higher in a budgeting game',
        icon: Target,
        unlocked: gameData.gameHistory.some(game => 
          game.gameId?.includes('budget') && game.score >= 80
        ),
        category: 'score'
      },
      {
        id: 3,
        title: 'High Scorer',
        description: 'Achieve a score of 90% or higher',
        icon: Trophy,
        unlocked: gameData.bestGameScore >= 90,
        category: 'score'
      },
      {
        id: 4,
        title: 'Consistent Player',
        description: 'Play games for 3 consecutive days',
        icon: Zap,
        unlocked: calculateCurrentStreak(gameData.gameHistory) >= 3,
        category: 'streak'
      },
      {
        id: 5,
        title: 'Game Explorer',
        description: 'Try 3 different games',
        icon: Gamepad2,
        unlocked: gameData.totalUniqueGamesPlayed >= 3,
        category: 'exploration'
      },
      {
        id: 6,
        title: 'Dedicated Learner',
        description: 'Complete 10 game sessions',
        icon: Medal,
        unlocked: gameData.totalGamesPlayed >= 10,
        category: 'milestone'
      }
    ];
    
    return achievements;
  };

  // Merge available games with user's game data
  const getGamesWithUserData = () => {
    return availableGames.map(game => {
      const userGameData = gameData?.gamesPlayed?.find(played => played.gameId === game.id);
      const gameHistoryForGame = gameData?.gameHistory?.filter(history => history.gameId === game.id) || [];
      
      const bestScore = gameHistoryForGame.length > 0 
        ? Math.max(...gameHistoryForGame.map(h => h.score || 0))
        : 0;
      
      const timesPlayed = userGameData?.timesPlayed || 0;
      const lastPlayed = userGameData?.lastPlayedAt || userGameData?.firstPlayedAt;
      
      // Determine status
      let status = 'available';
      if (timesPlayed > 0) {
        const lastSession = gameHistoryForGame[0]; // Most recent
        status = lastSession?.completed ? 'completed' : 'in-progress';
      }
      
      return {
        ...game,
        status,
        progress: bestScore,
        bestScore,
        timesPlayed,
        lastPlayed,
        achievements: []
      };
    });
  };

  const filteredGames = selectedCategory === 'all' 
    ? getGamesWithUserData()
    : getGamesWithUserData().filter(game => game.category === selectedCategory);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'in-progress': return <Play className="h-5 w-5 text-blue-500" />;
      case 'locked': return <Lock className="h-5 w-5 text-gray-400" />;
      default: return <Play className="h-5 w-5 text-gray-600" />;
    }
  };

  const handlePlayGame = (game) => {
    // Navigate to the game
    window.location.href = game.gameLink;
  };

  const formatLastPlayed = (date) => {
    if (!date) return 'Never played';
    const now = new Date();
    const playedDate = new Date(date);
    const diffTime = Math.abs(now - playedDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return 'Today';
    if (diffDays === 2) return 'Yesterday';
    if (diffDays <= 7) return `${diffDays - 1} days ago`;
    return playedDate.toLocaleDateString();
  };

  // Show loading state
  if (authLoading || loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-center min-h-96">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading your games...</p>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Games</h1>
            <p className="text-gray-600 mt-1">Learn through interactive games and challenges</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <div className="text-red-500 mb-2">⚠️</div>
              <p className="text-gray-600">Unable to load game data. Please try again later.</p>
              <Button 
                variant="outline" 
                onClick={() => window.location.reload()} 
                className="mt-4"
              >
                Retry
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show login prompt for non-authenticated users
  if (!user) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Games</h1>
            <p className="text-gray-600 mt-1">Learn through interactive games and challenges</p>
          </div>
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="text-center">
              <Gamepad2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Sign in to track your progress</h3>
              <p className="text-gray-600 mb-4">Log in to save your game progress and unlock achievements</p>
              <Button onClick={() => window.location.href = '/login'}>
                Sign In
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const gameStats = getGameStats();
  const achievements = calculateAchievements(gameData);

  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Games</h1>
          <p className="text-gray-600 mt-1">Learn through interactive games and challenges</p>
        </div>
      </div>

      {/* Game Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Gamepad2 className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Games Played</p>
                <p className="text-2xl font-bold">{gameStats.totalGamesPlayed}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-green-100 rounded-lg">
                <Target className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Average Score</p>
                <p className="text-2xl font-bold">{gameStats.averageScore}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Trophy className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Achievements</p>
                <p className="text-2xl font-bold">{gameStats.totalAchievements}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Zap className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Current Streak</p>
                <p className="text-2xl font-bold">{gameStats.currentStreak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Games Section */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gamepad2 className="h-5 w-5" />
                <span>Available Games</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="space-y-4">
                <TabsList className="grid w-full grid-cols-5">
                  <TabsTrigger value="all">All</TabsTrigger>
                  {gameCategories.map((category) => (
                    <TabsTrigger key={category.id} value={category.id}>
                      {category.name}
                    </TabsTrigger>
                  ))}
                </TabsList>

                <TabsContent value={selectedCategory} className="space-y-4">
                  {filteredGames.length === 0 ? (
                    <div className="text-center py-8">
                      <Gamepad2 className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-500">No games available in this category</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {filteredGames.map((game) => (
                        <div key={game.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <div className="flex items-center space-x-2 mb-2">
                                {getStatusIcon(game.status)}
                                <h3 className="font-semibold text-lg">{game.title}</h3>
                                <Badge className={getDifficultyColor(game.difficulty)}>
                                  {game.difficulty}
                                </Badge>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{game.description}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span className="flex items-center space-x-1">
                                  <Clock className="h-4 w-4" />
                                  <span>{game.estimatedTime}</span>
                                </span>
                                <span>Best Score: {game.bestScore}%</span>
                                <span>Played: {game.timesPlayed} times</span>
                                {game.lastPlayed && (
                                  <span>Last: {formatLastPlayed(game.lastPlayed)}</span>
                                )}
                              </div>
                            </div>
                            <Button 
                              variant={game.status === 'locked' ? 'secondary' : 'default'}
                              disabled={game.status === 'locked'}
                              className="ml-4"
                              onClick={() => handlePlayGame(game)}
                            >
                              {game.status === 'locked' ? 'Locked' : 'Play'}
                            </Button>
                          </div>
                          
                          {game.progress > 0 && (
                            <div className="space-y-1">
                              <div className="flex justify-between text-sm">
                                <span>Best Progress</span>
                                <span>{game.progress}%</span>
                              </div>
                              <Progress value={game.progress} className="h-2" />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Achievements Section */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5" />
                <span>Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {achievements.length === 0 ? (
                  <div className="text-center py-4">
                    <Medal className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">No achievements yet</p>
                  </div>
                ) : (
                  achievements.map((achievement) => {
                    const IconComponent = achievement.icon;
                    return (
                      <div 
                        key={achievement.id} 
                        className={`p-3 rounded-lg border ${
                          achievement.unlocked 
                            ? 'bg-yellow-50 border-yellow-200' 
                            : 'bg-gray-50 border-gray-200'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className={`p-2 rounded-full ${
                            achievement.unlocked 
                              ? 'bg-yellow-100 text-yellow-600' 
                              : 'bg-gray-100 text-gray-400'
                          }`}>
                            <IconComponent className="h-4 w-4" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className={`font-medium text-sm ${
                              achievement.unlocked ? 'text-gray-900' : 'text-gray-500'
                            }`}>
                              {achievement.title}
                            </h4>
                            <p className={`text-xs ${
                              achievement.unlocked ? 'text-gray-600' : 'text-gray-400'
                            }`}>
                              {achievement.description}
                            </p>
                          </div>
                          {achievement.unlocked && (
                            <CheckCircle2 className="h-4 w-4 text-yellow-600" />
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </CardContent>
          </Card>

          {/* Game Categories */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-sm">Game Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {gameCategories.map((category) => {
                  const IconComponent = category.icon;
                  const categoryGames = getGamesWithUserData().filter(game => game.category === category.id);
                  const completedGames = categoryGames.filter(game => game.status === 'completed').length;
                  
                  return (
                    <div key={category.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${category.color}`}>
                          <IconComponent className="h-4 w-4 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">{category.name}</p>
                          <p className="text-xs text-gray-500">
                            {completedGames}/{categoryGames.length} completed
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Recent Game History */}
          {gameData?.gameHistory && gameData.gameHistory.length > 0 && (
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-sm">Recent Games</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {gameData.gameHistory.slice(0, 5).map((game, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-gray-50">
                      <div>
                        <p className="font-medium text-sm">{game.gameName || game.gameId}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(game.timestamp).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-sm">{game.score}%</p>
                        {game.completed && (
                          <CheckCircle2 className="h-3 w-3 text-green-500 ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}