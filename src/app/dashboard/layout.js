'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { 
  Home, 
  BookOpen, 
  Gamepad2, 
  User, 
  Menu, 
  X,
  ChevronRight,
  Bell,
  Settings
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Badge } from '@/components/ui/badge';
import { UserDataProvider } from '@/components/dashboard/UserDataProvider';

const navigationItems = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: Home,
    description: 'Overview and analytics'
  },
  {
    name: 'Modules',
    href: '/dashboard/modules',
    icon: BookOpen,
    description: 'Learning modules and courses'
  },
  {
    name: 'Games',
    href: '/dashboard/games',
    icon: Gamepad2,
    description: 'Interactive games and challenges'
  },
  {
    name: 'Profile',
    href: '/dashboard/profile',
    icon: User,
    description: 'Account settings and preferences'
  }
];

function SidebarContent({ onItemClick = () => {} }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">CC</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">CoinCoach</h2>
            <p className="text-xs text-gray-500">Financial Learning</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onItemClick}
              className={`
                flex items-center space-x-3 px-3 py-3 rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
              <div className="flex-1">
                <div className="font-medium">{item.name}</div>
                <div className="text-xs text-gray-500">{item.description}</div>
              </div>
              {isActive && <ChevronRight className="w-4 h-4 text-blue-600" />}
            </Link>
          );
        })}
      </nav>

      {/* User Section */}
      <div className="p-4 border-t border-gray-200">
        <Card className="p-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-600" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">User Name</p>
              <p className="text-xs text-gray-500">Active Learner</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

function TopHeader({ onMenuClick }) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>
            <p className="text-sm text-gray-500">Welcome back to your financial journey</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm" className="relative">
            <Bell className="w-5 h-5" />
            <Badge className="absolute -top-1 -right-1 w-2 h-2 p-0 bg-red-500" />
          </Button>
          <Button variant="ghost" size="sm">
            <Settings className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}

export default function DashboardLayout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <UserDataProvider>
      <div className="flex h-screen bg-gray-50">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:flex w-64 flex-col">
          <SidebarContent />
        </aside>

        {/* Mobile Sidebar */}
        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetContent side="left" className="p-0 w-64">
            <SidebarContent onItemClick={() => setMobileMenuOpen(false)} />
          </SheetContent>
        </Sheet>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <TopHeader onMenuClick={() => setMobileMenuOpen(true)} />
          
          <main className="flex-1 overflow-y-auto p-4">
            <div className="max-w-7xl mx-auto">
              {children}
            </div>
          </main>
        </div>
      </div>
    </UserDataProvider>
  );
}
