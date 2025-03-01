'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useUserData } from './UserDataProvider';

const EditProfileModal = ({ isOpen, onClose }) => {
  const { userData, updateUserData } = useUserData() || {};
  
  const [formData, setFormData] = useState({
    name: userData?.name || '',
    email: userData?.email || '',
    location: userData?.location || '',
    bio: userData?.bio || '',
    jobTitle: userData?.jobTitle || '',
    profileImage: userData?.profileImage || ''
  });

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

  const handleSubmit = (e) => {
    e.preventDefault();
    updateUserData({
      ...userData,
      ...formData
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
          <Input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleChange} placeholder="Job Title" />
          <Input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" />
          <Textarea name="bio" value={formData.bio} onChange={handleChange} placeholder="Short bio" rows={3} />
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">Save</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
