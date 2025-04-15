'use client';
import React from 'react';
import { CheckCircle2, ChevronRight, Clock, BookOpen, Star } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useUserData } from './UserDataProvider';

const ModuleCard = ({ module, onClick }) => {
  const { contentFilters } = useUserData() || {};
  
  // If age restriction is applied and user is under 18, show restricted badge
  const isRestricted = module.ageRestriction && contentFilters?.ageVerified && !contentFilters?.isAdult;
  
  const completedLessons = module.completedLessons || 0;
  const totalLessons = module.totalLessons || 0;
  const progress = module.progress || 0;
  
  // Calculate days since last access
  const daysSinceLastAccess = module.lastAccessed ? 
    Math.floor((new Date() - new Date(module.lastAccessed)) / (1000 * 60 * 60 * 24)) : 
    null;

  return (
    <Card className={`overflow-hidden shadow-md transition-all duration-300 h-full flex flex-col ${isRestricted ? 'opacity-60' : 'hover:shadow-lg'}`}>
      <div className="relative">
        <img
          src={module.imageUrl || "/api/placeholder/400/200"}
          alt={module.title}
          className="w-full h-40 object-cover"
        />
        
        {/* Age restriction badge */}
        {module.ageRestriction && (
          <Badge className="absolute top-2 right-2 bg-amber-500">
            18+
          </Badge>
        )}
        
        {progress === 100 && (
          <div className="absolute top-2 left-2">
            <Badge className="bg-green-600">
              <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
            </Badge>
          </div>
        )}
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-bold">{module.title}</CardTitle>
          {module.difficulty && (
            <Badge variant="outline" className="text-xs font-normal">
              {module.difficulty}
            </Badge>
          )}
        </div>
        <CardDescription className="text-sm line-clamp-2">{module.description}</CardDescription>
      </CardHeader>

      <CardContent className="pb-2 flex-grow">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-xs mb-1">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} className="h-1.5" />
          </div>

          <div className="flex justify-between text-xs text-gray-500">
            <div className="flex items-center">
              <BookOpen className="w-3.5 h-3.5 mr-1 text-blue-500" />
              <span>{completedLessons}/{totalLessons} lessons</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-blue-500" />
              <span>{module.estimatedTime || "1h 30m"}</span>
            </div>
          </div>
          
          {daysSinceLastAccess !== null && (
            <div className="text-xs text-gray-500">
              {daysSinceLastAccess === 0 ? 'Last accessed today' : 
                daysSinceLastAccess === 1 ? 'Last accessed yesterday' :
                  `Last accessed ${daysSinceLastAccess} days ago`}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button 
          variant="ghost" 
          className="w-full justify-between border-t pt-2 text-blue-600" 
          onClick={() => onClick && onClick(module)}
          disabled={isRestricted}
        >
          {isRestricted ? 'Age Restricted' : (progress > 0 ? 'Continue' : 'Start Learning')}
          <ChevronRight className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;