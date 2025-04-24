'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../components/auth/AuthContext';
import { coursesData } from '../data/courses';
import Course from '../components/Course';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";

export default function CoursesPage() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('/api/user/info');
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
        } else {
          console.error('Failed to fetch user data');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user]);

  const getCoursesToShow = () => {
    if (!user || !userData || !userData.age) {
      return {
        youth: coursesData.youth,
        adult: coursesData.adult
      };
    }

    const age = parseInt(userData.age);
    return age < 18
      ? { youth: coursesData.youth, adult: [] }
      : { youth: [], adult: coursesData.adult };
  };

  const coursesToShow = getCoursesToShow();

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-center mb-8">Financial Courses</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="rounded-xl overflow-hidden shadow-lg">
              <Skeleton className="h-48 w-full" />
              <div className="p-6 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-10 w-32 mx-auto" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  const renderTabs = (youthCourses, adultCourses) => (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="grid w-full grid-cols-3 mb-8">
        <TabsTrigger value="all">All</TabsTrigger>
        <TabsTrigger value="youth" disabled={youthCourses.length === 0}>Youth</TabsTrigger>
        <TabsTrigger value="adult" disabled={adultCourses.length === 0}>Adult</TabsTrigger>
      </TabsList>

      <TabsContent value="all">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...youthCourses, ...adultCourses].map(course => (
            <Course key={course.id} {...course} />
          ))}
          {[...youthCourses, ...adultCourses].length === 0 && (
            <div className="col-span-3 text-center py-10 text-gray-500">
              No courses available. Please update your age in your profile.
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="youth">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {youthCourses.map(course => (
            <Course key={course.id} {...course} />
          ))}
          {youthCourses.length === 0 && (
            <div className="col-span-3 text-center py-10 text-gray-500">
              No youth courses available for your age group.
            </div>
          )}
        </div>
      </TabsContent>

      <TabsContent value="adult">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adultCourses.map(course => (
            <Course key={course.id} {...course} />
          ))}
          {adultCourses.length === 0 && (
            <div className="col-span-3 text-center py-10 text-gray-500">
              No adult courses available for your age group.
            </div>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center mb-8">Financial Courses</h1>

      {!user && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-8 text-center">
          Please log in to see personalized courses based on your age.
        </div>
      )}

      {user && !userData?.age && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-8 text-center">
          Please update your profile with your age to see personalized courses.
        </div>
      )}

      {user && userData?.age && (
        <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded mb-8 text-center">
          {parseInt(userData.age) < 18
            ? "Showing courses tailored for youth under 18."
            : "Showing courses for adults 18 and older."}
        </div>
      )}

      {renderTabs(coursesToShow.youth, coursesToShow.adult)}
    </div>
  );
}
