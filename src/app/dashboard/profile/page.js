'use client';
import React, { useState } from 'react';
import { Mail, MapPin, Briefcase, Info, Edit, Award, BookOpen, CheckCircle as CheckCircleIcon, Clock as ClockIcon, BarChart as ChartIcon } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
// Fix the import path - EditProfileModal is in the components/dashboard directory
import EditProfileModal from '@/app/components/dashboard/EditProfileModal';
import { useUserData } from '@/app/components/dashboard/UserDataProvider';

const UserProfile = () => {
  const { userData, contentFilters, loading } = useUserData() || {};
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Set defaults and handle missing data
  const user = userData || { 
    name: "User Name", 
    email: "user@example.com", 
    location: "Location", 
    bio: "No bio available", 
    jobTitle: "Job Title", 
    profileImage: "", 
    demographics: {} 
  };

  // Badges data from MongoDB or defaults
  const badges = userData?.badges || [
    { id: 1, name: "Quick Starter", icon: "🚀", description: "Completed first module" },
    { id: 2, name: "Consistent Learner", icon: "📚", description: "Maintained a 3-day streak" },
    { id: 3, name: "Quiz Master", icon: "🏆", description: "Scored 100% on a quiz" }
  ];

  // Statistics data from MongoDB or defaults
  const statistics = [
    { 
      label: "Completed", 
      value: userData?.completedModules || 0, 
      icon: <CheckCircleIcon className="w-4 h-4 text-green-500" /> 
    },
    { 
      label: "In Progress", 
      value: userData?.inProgressModules || 0, 
      icon: <ClockIcon className="w-4 h-4 text-blue-500" /> 
    },
    { 
      label: "Avg. Score", 
      value: `${userData?.averageScore || 0}%`, 
      icon: <ChartIcon className="w-4 h-4 text-purple-500" /> 
    }
  ];

  // Format the last updated date if available
  const lastUpdated = userData?.lastUpdated ? new Date(userData.lastUpdated).toLocaleDateString() : null;

  if (loading) {
    return (
      <Card className="overflow-hidden shadow-md h-full">
        <div className="p-6 flex justify-center items-center h-64">
          <div className="animate-pulse text-center">
            <div className="h-12 w-12 mx-auto mb-4 rounded-full bg-gray-200"></div>
            <div className="h-4 w-48 mx-auto bg-gray-200 rounded mb-2"></div>
            <div className="h-3 w-32 mx-auto bg-gray-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <>
      <Card className="overflow-hidden shadow-md h-full flex flex-col">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-20 w-20 rounded-full bg-white/30 flex items-center justify-center text-3xl overflow-hidden">
                {user.profileImage ? (
                  <img src={user.profileImage} alt={user.name} className="h-full w-full object-cover" />
                ) : (
                  <span>{user.name?.charAt(0) || "U"}</span>

                )}
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="opacity-90">{user.jobTitle}</p>
                {user.demographics?.age && (
                  <p className="text-sm opacity-80">Age: {user.demographics.age}</p>
                )}
              </div>
            </div>
            <Button 
              variant="outline" 
              className="bg-white/10 border-white/20 hover:bg-white/20 text-white"
              onClick={() => setIsEditModalOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </div>
        </div>

        <CardContent className="flex-grow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Profile Information</h3>
              
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <Mail className="mr-2 h-4 w-4 text-gray-500" />
                  <span>{user.email}</span>
                </div>
                
                {user.location && (
                  <div className="flex items-center text-sm">
                    <MapPin className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{user.location}</span>
                  </div>
                )}
                
                {user.jobTitle && (
                  <div className="flex items-center text-sm">
                    <Briefcase className="mr-2 h-4 w-4 text-gray-500" />
                    <span>{user.jobTitle}</span>
                  </div>
                )}
                
                {user.demographics?.ageGroup && (
                  <div className="flex items-center text-sm">
                    <Info className="mr-2 h-4 w-4 text-gray-500" />
                    <span>Age Group: {user.demographics.ageGroup}</span>
                  </div>
                )}
                
                {lastUpdated && (
                  <div className="flex items-center text-sm text-gray-500">
                    <span>Last updated: {lastUpdated}</span>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="text-sm font-medium mb-2">Bio</h4>
                <p className="text-sm text-gray-600">{user.bio}</p>
              </div>
              
              {contentFilters && contentFilters.ageRestricted && (
                <div className="mt-4">
                  <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                    Age-Restricted Content Active
                  </Badge>
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Learning Statistics</h3>
              
              <div className="grid grid-cols-3 gap-2">
                {statistics.map((stat, index) => (
                  <Card key={index} className="bg-gray-50">
                    <CardContent className="p-3 text-center">
                      <div className="flex justify-center mb-1">{stat.icon}</div>
                      <p className="text-xl font-bold">{stat.value}</p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <h3 className="text-lg font-semibold pt-2">Achievements</h3>
              <div className="flex flex-wrap gap-2">
                {badges.map((badge) => (
                  <Badge key={badge.id} className="px-2 py-1 bg-blue-100 text-blue-800 hover:bg-blue-200 cursor-pointer" title={badge.description}>
                    <span className="mr-1">{badge.icon}</span> {badge.name}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />
    </>
  );
};

export default UserProfile;
