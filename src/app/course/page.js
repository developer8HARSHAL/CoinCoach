// This would be the component that lists all available courses
// /src/app/courses/page.js
'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '../components/auth/AuthContext';

export default function CoursesPage() {
  const router = useRouter();
  const { user } = useAuth();

  const courses = [
    {
      id: 'money-basics',
      title: 'Money Basics',
      description: 'Learn about the time value of money and inflation impact.',
      image: '/images/ymoney.jpg'
    },
    {
      id: 'financial-concepts',
      title: 'Financial Concepts',
      description: 'Understand opportunity cost and interest calculations.',
      image: '/path/to/image.jpg'
    },
    {
      id: 'banking-essentials',
      title: 'Banking Essentials',
      description: 'Learn about bank statements and digital payments.',
      image: '/path/to/image.jpg'
    },
    {
      id: 'financial-planning',
      title: 'Financial Planning',
      description: 'Discover taxation basics and mutual funds.',
      image: '/path/to/image.jpg'
    }
  ];

  // Handle course click
  const handleCourseClick = (courseId) => {
    router.push(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-pink-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-12">
          Financial Literacy Courses
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <div 
              key={course.id}
              onClick={() => handleCourseClick(course.id)}
              className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer transform transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="h-40 bg-gray-200">
                {/* Course image would go here */}
              </div>
              <div className="p-6">
                <h2 className="text-xl font-bold text-purple-700 mb-2">{course.title}</h2>
                <p className="text-gray-600">{course.description}</p>
                <div className="mt-4 flex justify-end">
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                    Start Learning
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}