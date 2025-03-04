import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight } from 'lucide-react';
import Savings from '../Savings';
// import Savings from '../../lotties/saving.json';


const ModuleCard = ({ module }) => {
  const getBgColor = (progress) => {
    if (progress >= 75) return "bg-gradient-to-br from-green-50 to-emerald-50 border-green-100";
    if (progress >= 50) return "bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-100";
    if (progress >= 25) return "bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-100";
    return "bg-gradient-to-br from-gray-50 to-slate-50 border-gray-100";
  };

  return (
    <Card className={`overflow-hidden shadow-md hover:shadow-lg transition-all ${getBgColor(module.progress)}`}>
      <div className="relative">
        <img 
          src={Savings}
          alt={module.title} 
          className="w-full h-40 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-lg font-bold text-white">{module.title}</h3>
        </div>
        <div className="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded-md text-xs font-medium text-gray-800">
          {module.completedLessons}/{module.totalLessons} Lessons
        </div>
      </div>
      <CardContent className="p-5">
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{module.description}</p>
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-gray-500">Progress</span>
          <span className="font-medium text-gray-700">{module.progress}%</span>
        </div>
        <Progress value={module.progress} className="h-2 mb-4" />
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>
            Last studied: {new Date(module.lastAccessed).toLocaleDateString('en-US', {month: 'short', day: 'numeric'})}
          </span>
        </div>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0">
        <Button className="w-full" variant={module.progress > 0 ? "default" : "secondary"}>
          {module.progress > 0 ? "Continue Learning" : "Start Learning"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ModuleCard;