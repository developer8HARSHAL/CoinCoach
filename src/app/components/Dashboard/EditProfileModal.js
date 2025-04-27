'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUserData } from './UserDataProvider';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/app/components/auth/AuthContext';

const EditProfileModal = ({ isOpen, onClose }) => {
  const { userData, updateUserData, loading } = useUserData() || {};
  const { toast } = useToast();
  const { fetchNotifications } = useAuth();
  
  // Initialize form data from userData with default values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    location: '',
    bio: '',
    jobTitle: '',
    profileImage: '',
    age: ''
  });

  // Update form data when userData changes or modal opens
  useEffect(() => {
    if (isOpen && userData) {
      setFormData({
        name: userData.name || '',
        email: userData.email || '',
        location: userData.location || '',
        bio: userData.bio || '',
        jobTitle: userData.jobTitle || '',
        profileImage: userData.profileImage || '',
        age: userData.demographics?.age || ''
      });
    }
  }, [isOpen, userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, profileImage: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const updateProfileNotification = async () => {
    try {
      const response = await fetch('/api/user/notifications/profile-updated', {
        method: 'PUT'
      });
      
      if (!response.ok) {
        console.error('Failed to update profile notification:', response.status);
      } else {
        // Refresh notifications after updating
        fetchNotifications();
      }
    } catch (error) {
      console.error('Error updating profile notification:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Check if age was added or updated
    const ageChanged = userData?.demographics?.age !== parseInt(formData.age);
    const ageAdded = !userData?.demographics?.age && formData.age;
    
    // Create updated userData with age in demographics
    const updatedData = {
      ...userData,
      name: formData.name,
      email: formData.email,
      location: formData.location,
      bio: formData.bio,
      jobTitle: formData.jobTitle,
      profileImage: formData.profileImage,
      demographics: {
        ...userData?.demographics,
        age: parseInt(formData.age) || null,
        ageGroup: parseInt(formData.age) < 18 ? "Under 18" : "Adult",
        ageVerified: formData.age ? true : false,
        updatedAt: new Date().toISOString()
      },
      lastUpdated: new Date().toISOString(),
      profileCompleted: true
    };
    
    // Update user data in MongoDB through the API
    await updateUserData(updatedData);
    
    // Update the profile notification
    await updateProfileNotification();
    
    // Show additional notification if age was added or changed
    if (ageAdded || ageChanged) {
      toast({
        title: ageAdded ? "Age Information Added" : "Age Information Updated",
        description: "Your learning content will be personalized based on your age.",
        variant: "default",
        duration: 5000
      });
    }
    
    // Show toast notification for profile update
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
      variant: "success",
      duration: 3000
    });
    
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-lg w-full max-w-md p-5 shadow-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Edit Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-500 transition-colors">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex flex-col items-center">
            {formData.profileImage && <img src={formData.profileImage} alt="Profile" className="w-20 h-20 rounded-full object-cover mb-2" />}
            <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm text-gray-500" />
          </div>
          
          <Input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Full Name" required />
          <Input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
          
          {/* Age input field with a note about personalization */}
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-gray-500 mb-1">
              Age <span className="text-blue-500 text-xs">(Used for content personalization)</span>
            </label>
            <Input 
              id="age"
              type="number" 
              name="age"
              min="1"
              max="120"
              value={formData.age} 
              onChange={handleChange}
              placeholder="Enter your age" 
            />
          </div>
          
          <Input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" />
          <Input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
          <Textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Short bio" rows={3} />
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;