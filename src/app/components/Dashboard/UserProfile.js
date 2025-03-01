import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Target } from 'lucide-react';
import EditProfileModal from './EditProfileModal';

const UserProfile = ({ userData }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <Card className="overflow-hidden border-none shadow-md">
        <div className="bg-gradient-to-r from-yellow-500 to-indigo-600 h-24"></div>
        <div className="px-6 pb-6 pt-0 relative">
          <div className="flex flex-col items-center">
            <div className="relative -mt-12">
              <img 
                src={userData.profileImage} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <span className="absolute bottom-1 right-1 bg-green-500 p-1.5 rounded-full border-2 border-white"></span>
            </div>
            <div className="text-center mt-3">
              <h2 className="text-xl font-bold text-gray-800">{userData.name}</h2>
              <p className="text-sm text-gray-600">{userData.email}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Bio:</h3>
            <p className="text-sm text-gray-600">{userData.bio}</p>
          </div>
          
          <div className="mt-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-2">Financial Goals:</h3>
            <div className="flex flex-wrap gap-2">
              {userData.demographics.financialGoals.map((goal, index) => (
                <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-800 hover:bg-blue-200">
                  {goal}
                </Badge>
              ))}
            </div>
          </div>
          
          <div className="mt-6">
            <Button className="w-full" onClick={() => setIsEditModalOpen(true)}>
              Edit Profile
            </Button>
          </div>
        </div>
      </Card>
      
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle className="text-lg">Profile Details</CardTitle>
            <User className="h-5 w-5 text-gray-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-xs text-gray-500 block">Age Group</span>
                <span className="text-sm font-medium">{userData.demographics.ageGroup}</span>
              </div>
              <div className="bg-gray-50 p-3 rounded-lg">
                <span className="text-xs text-gray-500 block">Location</span>
                <span className="text-sm font-medium">{userData.demographics.location}</span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <span className="text-xs text-gray-500 block">Occupation</span>
              <span className="text-sm font-medium">{userData.demographics.occupation}</span>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <EditProfileModal 
        isOpen={isEditModalOpen} 
        onClose={() => setIsEditModalOpen(false)} 
      />
    </div>
  );
};

export default UserProfile;