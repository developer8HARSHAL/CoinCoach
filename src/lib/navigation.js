import { Home, BookOpen, Gamepad2, User, Settings, Bell, Award, BarChart } from 'lucide-react';

export const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    description: 'Overview of your learning progress'
  },
  {
    id: 'modules',
    label: 'Modules',
    href: '/dashboard/modules',
    icon: BookOpen,
    description: 'Browse and track your learning modules'
  },
  {
    id: 'games',
    label: 'Games',
    href: '/dashboard/games',
    icon: Gamepad2,
    description: 'Play educational games and track achievements'
  },
  {
    id: 'profile',
    label: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    description: 'Manage your profile and preferences'
  }
];

export const secondaryNavigationItems = [
  {
    id: 'notifications',
    label: 'Notifications',
    href: '/dashboard/notifications',
    icon: Bell,
    description: 'View your notifications and updates'
  },
  {
    id: 'achievements',
    label: 'Achievements',
    href: '/dashboard/achievements',
    icon: Award,
    description: 'View all your badges and achievements'
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart,
    description: 'Detailed learning analytics and insights'
  },
  {
    id: 'settings',
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
    description: 'Configure your account settings'
  }
];

export const getNavigationItemById = (id) => {
  return [...navigationItems, ...secondaryNavigationItems].find(item => item.id === id);
};

export const getActiveNavigation = (pathname) => {
  // Remove trailing slash and normalize path
  const normalizedPath = pathname.replace(/\/$/, '') || '/dashboard';
  
  // Find exact match first
  const exactMatch = [...navigationItems, ...secondaryNavigationItems]
    .find(item => item.href === normalizedPath);
    
  if (exactMatch) return exactMatch;
  
  // Find partial match for nested routes
  const partialMatch = [...navigationItems, ...secondaryNavigationItems]
    .find(item => normalizedPath.startsWith(item.href) && item.href !== '/dashboard');
    
  return partialMatch || navigationItems[0]; // Default to dashboard
};