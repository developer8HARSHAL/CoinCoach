'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { useAuth } from '../components/auth/AuthContext';
import AuthModal from "../components/auth/AuthModal";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  PiggyBank,
  Wallet,
  CreditCard
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, Home, BookOpen, FileText, Menu, X, ChevronRight, Coins, TrendingUp, Blocks, DollarSign, Image as ImageIcon, BarChart2, FileSpreadsheet, Database, Cpu, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const ListItem = React.forwardRef(({ className, title, children, icon, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-yellow-50 hover:text-yellow-600",
            className
          )}
          {...props}
        >
          <div className="flex items-center gap-2 text-sm font-medium leading-none">
            {icon && <span className="text-yellow-500">{icon}</span>}
            {title}
          </div>
          {children && <p className="line-clamp-2 text-xs text-gray-500">{children}</p>}
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default function Navbar() {
  const { user, logout, notifications, notificationCount, markAllNotificationsAsRead } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalView, setAuthModalView] = useState('login');
  
  const openLogin = () => {
    setAuthModalView('login');
    setIsAuthModalOpen(true);
  };

  const openSignup = () => {
    setAuthModalView('signup');
    setIsAuthModalOpen(true);
  };

  const getUserInitials = () => {
    if (!user || !user.displayName) {
      return user?.email?.charAt(0)?.toUpperCase() || '?';
    }
    const names = user.displayName.split(' ');
    return (names[0].charAt(0) + (names.length > 1 ? names[names.length - 1].charAt(0) : '')).toUpperCase();
  };

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead();
  };

  // Format time to relative format (e.g. "10 minutes ago")
  const formatRelativeTime = (isoString) => {
    try {
      const date = new Date(isoString);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);

      if (diffMins < 1) return 'Just now';
      if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
      if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
      if (diffDays < 7) return `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
      
      return date.toLocaleDateString();
    } catch (e) {
      return 'Recently';
    }
  };

  // Course submenu items with icons and descriptions
  const courseItems = [
    {  
      title: "Budgeting Basics", 
      href: "/courses/budgeting-basics",
      icon: <Wallet size={16} />,
      description: "Learn how to create and maintain a budget that works for your financial goals and lifestyle"
    },
    { 
      title: "Saving Strategies", 
      href: "/courses/saving-strategies",
      icon: <PiggyBank size={16} />,
      description: "Discover proven techniques to build your savings and create financial security"
    },
    { 
      title: "Investment Fundamentals", 
      href: "/courses/investment-fundamentals",
      icon: <BarChart2 size={16} />,
      description: "Start your investment journey with clear explanations of investment basics and options"
    },
    { 
      title: "Debt Management", 
      href: "/courses/debt-management",
      icon: <CreditCard size={16} />,
      description: "Take control of your debt with strategic approaches to reduce and eliminate what you owe"
    }
  ];

  // Resource submenu items with icons and descriptions
  const resourceItems = [
    { 
      title: "Ebooks & Guides", 
      href: "/resources/guides",
      icon: <FileText size={16} />,
      description: "Comprehensive guides on crypto investment"
    },
    { 
      title: "Bugdget Planner", 
      href: "/budgetplanner",
      icon: <BarChart2 size={16} />,
      description: "In-depth analysis and market insights for smart investing"
    },
    { 
      title: "Financial Tools", 
      href: "/resources/tools",
      icon: <FileSpreadsheet size={16} />,
      description: "Calculators and tools for crypto investors"
    },
    { 
      title: "Games", 
      href: "/gamehome",
      icon: <FileSpreadsheet size={16} />,
      description: "Fun and educational games for financial literacy"
    }
  ];

  return (
    <>
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center">
                <Image src={logo} className="w-10 h-10" alt="CoinCoach Logo" />
                <span className="ml-2 text-xl font-bold text-gray-800 hidden md:block">CoinCoach</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <Link href="/" legacyBehavior passHref>
                      <NavigationMenuLink className="group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-gray-700 font-medium transition-colors hover:text-yellow-500 hover:bg-yellow-50/50">
                        <Home className="mr-2 h-4 w-4" />
                        <span>Home</span>
                      </NavigationMenuLink>
                    </Link>
                  </NavigationMenuItem>
                  
                  {/* Enhanced Courses Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="group text-gray-700 font-medium hover:text-yellow-500 hover:bg-yellow-50/50">
                      <BookOpen className="mr-1 h-4 w-4" />
                      <span>Courses</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[500px] lg:w-[450px] p-4">
                        <div className="grid gap-4">
                          <div className="col-span-4 grid grid-cols-2 gap-x-4">
                            {/* Popular Courses */}
                            <div>
                              <h4 className="text-sm font-semibold text-yellow-600 mb-2 px-3">Popular Courses</h4>
                              <ul className="grid gap-2">
                                {courseItems.slice(0, 3).map((item) => (
                                  <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                    icon={item.icon}
                                  >
                                    {item.description}
                                  </ListItem>
                                ))}
                              </ul>
                            </div>
                            {/* Specialized Topics */}
                            <div>
                              <h4 className="text-sm font-semibold text-yellow-600 mb-2 px-3">Specialized Topics</h4>
                              <ul className="grid gap-2">
                                {courseItems.slice(3).map((item) => (
                                  <ListItem
                                    key={item.title}
                                    title={item.title}
                                    href={item.href}
                                    icon={item.icon}
                                  >
                                    {item.description}
                                  </ListItem>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-4 pt-3 border-t border-gray-100">
                            {/* <Link href="/course" className="text-xs font-medium text-yellow-600 flex items-center hover:text-yellow-700"> */}
                            <Link href="/courses" className="text-xs font-medium text-yellow-600 flex items-center hover:text-yellow-700">
                              View all courses
                              <ChevronRight className="ml-1 h-3 w-3" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
              {/* Enhanced Courses Dropdown */}
<NavigationMenuItem>
  <NavigationMenuTrigger className="group text-gray-700 font-medium hover:text-yellow-500 hover:bg-yellow-50/50">
    <BookOpen className="mr-1 h-4 w-4" />
    <span>Courses</span>
  </NavigationMenuTrigger>
  <NavigationMenuContent>
    <div className="w-[500px] lg:w-[450px] p-4">
      <div className="grid gap-4">
        <div className="col-span-4 grid grid-cols-2 gap-x-4">
          {/* Popular Courses */}
          <div>
            <h4 className="text-sm font-semibold text-yellow-600 mb-2 px-3">Popular Courses</h4>
            <ul className="grid gap-2">
              {courseItems.slice(0, 3).map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </div>
          {/* Specialized Topics */}
          <div>
            <h4 className="text-sm font-semibold text-yellow-600 mb-2 px-3">Specialized Topics</h4>
            <ul className="grid gap-2">
              {courseItems.slice(3).map((item) => (
                <ListItem
                  key={item.title}
                  title={item.title}
                  href={item.href}
                  icon={item.icon}
                >
                  {item.description}
                </ListItem>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4 pt-3 border-t border-gray-100">
          <Link href="/allcourses" className="text-xs font-medium text-yellow-600 flex items-center hover:text-yellow-700">
            View all courses
            <ChevronRight className="ml-1 h-3 w-3" />
          </Link>
        </div>
      </div>
    </div>
  </NavigationMenuContent>
</NavigationMenuItem>

                  {/* Enhanced Resources Dropdown */}
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="group text-gray-700 font-medium hover:text-yellow-500 hover:bg-yellow-50/50">
                      <Database className="mr-1 h-4 w-4" />
                      <span>Resources</span>
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[320px] p-4">
                        <div className="grid gap-2">
                          {/* Resource categories */}
                          <div>
                            <h4 className="text-sm font-semibold text-yellow-600 mb-2 px-3">Research & Analysis</h4>
                            <ul className="grid gap-2">
                              {resourceItems.map((item) => (
                                <ListItem
                                  key={item.title}
                                  title={item.title}
                                  href={item.href}
                                  icon={item.icon}
                                >
                                  {item.description}
                                </ListItem>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-100">
                          <Link href="/budgetplanner" className="text-sm font-medium text-yellow-600 flex items-center hover:text-yellow-700">
                            Explore our complete resource library
                            <ChevronRight className="ml-1 h-4 w-4" />
                          </Link>
                        </div>
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </div>

            {/* User Authentication Section */}
            <div className="flex items-center">
              {user ? (
                <div className="flex items-center space-x-3">
                  {/* Notifications */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="relative">
                        <Bell className="h-5 w-5 text-gray-600 hover:text-yellow-500" />
                        {notificationCount > 0 && (
                          <span className="absolute top-0 right-0 h-4 w-4 text-xs flex items-center justify-center rounded-full bg-red-500 text-white">
                            {notificationCount}
                          </span>
                        )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex justify-between items-center">
                          <h4 className="text-sm font-semibold">Notifications</h4>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-auto p-0 text-xs text-blue-600 hover:text-blue-800"
                            onClick={handleMarkAllAsRead}
                          >
                            Mark all as read
                          </Button>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <div className="max-h-80 overflow-y-auto">
                        {notifications && notifications.length > 0 ? (
                          notifications.map((notification, i) => (
                            <DropdownMenuItem key={i} className="p-0">
                              <Link href="/notifications" className="block w-full px-4 py-3 hover:bg-gray-50">
                                <div className={`flex gap-3 ${notification.unread ? 'font-medium' : ''}`}>
                                  <div className={`w-2 self-stretch ${notification.unread ? 'bg-yellow-400' : 'bg-transparent'} rounded-full`} />
                                  <div className="flex-1">
                                    <p className="text-sm">{notification.title}</p>
                                    <p className="text-xs text-gray-500">{notification.description}</p>
                                    <p className="text-xs text-gray-400 mt-1">{formatRelativeTime(notification.time)}</p>
                                  </div>
                                </div>
                              </Link>
                            </DropdownMenuItem>
                          ))
                        ) : (
                          <div className="py-4 text-center text-gray-500 text-sm">
                            No notifications
                          </div>
                        )}
                      </div>
                      <DropdownMenuItem asChild className="p-0">
                        <Link href="/notifications" className="block w-full p-2 text-center text-sm font-medium text-yellow-600 hover:bg-yellow-50">
                          View all notifications
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  {/* User Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0" aria-label="User menu">
                        <div className="w-9 h-9 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg transition-all duration-200">
                          {user.photoURL ? (
                            <Image 
                              src={user.photoURL} 
                              alt="Profile" 
                              width={36} 
                              height={36} 
                              className="rounded-full" 
                            />
                          ) : (
                            <span className="text-sm font-semibold">{getUserInitials()}</span>
                          )}
                        </div>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                      <div className="flex items-center gap-2 p-2">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                          {user.photoURL ? (
                            <Image 
                              src={user.photoURL} 
                              alt="Profile" 
                              width={40} 
                              height={40} 
                              className="rounded-full" 
                            />
                          ) : (
                            <span className="text-sm font-semibold text-white">{getUserInitials()}</span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900 truncate">{user.displayName || 'User'}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center gap-2">
                          <BarChart2 className="w-4 h-4" />
                          <span>Dashboard</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center gap-2">
                          <span className="w-4 h-4">👤</span>
                          <span>Profile Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/my-courses" className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4" />
                          <span>My Courses</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={logout} className="text-red-600 flex items-center gap-2">
                        <span className="w-4 h-4">🚪</span>
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="hidden md:flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    onClick={openLogin}
                    className="text-gray-700 hover:text-yellow-500 hover:bg-yellow-50/50"
                  >
                    Log In
                  </Button>
                  <Button
                    onClick={openSignup}
                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white shadow-sm hover:shadow"
                  >
                    Sign Up
                  </Button>
                </div>
              )}

              {/* Mobile menu button */}
              <div className="md:hidden ml-4">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full max-w-sm">
                    <SheetHeader className="border-b pb-4 mb-4">
                      <SheetTitle className="flex items-center">
                        <Image src={logo} className="w-8 h-8 mr-2" alt="CoinCoach Logo" />
                        <span className="text-xl font-semibold">CoinCoach</span>
                      </SheetTitle>
                    </SheetHeader>
                    
                    {user && (
                      <div className="flex items-center p-2 mb-4 bg-yellow-50 rounded-lg">
                        <div className="w-10 h-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center text-white">
                          {user.photoURL ? (
                            <Image 
                              src={user.photoURL} 
                              alt="Profile" 
                              width={40} 
                              height={40} 
                              className="rounded-full" 
                            />
                          ) : (
                            <span className="text-sm font-semibold">{getUserInitials()}</span>
                          )}
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium">{user.displayName || user.email}</div>
                          <div className="text-xs text-gray-500 truncate">{user.email}</div>
                        </div>
                      </div>
                    )}
                    
                    <div className="py-4">
                      <SheetClose asChild>
                        <Link href="/" className="flex items-center py-2 text-base font-medium text-gray-700">
                          <Home className="mr-3 h-5 w-5 text-yellow-500" />
                          Home
                        </Link>
                      </SheetClose>
                      
                      {/* Mobile Courses Accordion */}
                      <Accordion type="single" collapsible className="w-full">
                        <AccordionItem value="courses" className="border-none">
                          <AccordionTrigger className="py-2 text-base font-medium text-gray-700 hover:no-underline">
                            <div className="flex items-center">
                              <BookOpen className="mr-3 h-5 w-5 text-yellow-500" />
                              Courses
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
  <div className="pl-8 py-2 space-y-2">
    {courseItems.map((item, index) => (
      <SheetClose key={index} asChild>
        <Link 
          href={item.href} 
          className="flex items-center py-2 text-sm text-gray-600 hover:text-yellow-600"
        >
          {item.icon}
          <span className="ml-2">{item.title}</span>
        </Link>
      </SheetClose>
    ))}
    <SheetClose asChild>
      <Link href="/courses" className="flex items-center py-2 text-sm font-medium text-yellow-600">
        View all courses
        <ChevronRight className="ml-1 h-4 w-4" />
      </Link>
    </SheetClose>
  </div>
</AccordionContent>
</AccordionItem>

{/* Mobile Resources Accordion */}
<AccordionItem value="resources" className="border-none">
  <AccordionTrigger className="py-2 text-base font-medium text-gray-700 hover:no-underline">
    <div className="flex items-center">
      <Database className="mr-3 h-5 w-5 text-yellow-500" />
      Resources
    </div>
  </AccordionTrigger>
  <AccordionContent>
    <div className="pl-8 py-2 space-y-2">
      {resourceItems.map((item, index) => (
        <SheetClose key={index} asChild>
          <Link 
            href={item.href} 
            className="flex items-center py-2 text-sm text-gray-600 hover:text-yellow-600"
          >
            {item.icon}
            <span className="ml-2">{item.title}</span>
          </Link>
        </SheetClose>
      ))}
      <SheetClose asChild>
        <Link href="/resources" className="flex items-center py-2 text-sm font-medium text-yellow-600">
          Explore all resources
          <ChevronRight className="ml-1 h-4 w-4" />
        </Link>
      </SheetClose>
    </div>
  </AccordionContent>
</AccordionItem>
</Accordion>

{/* Mobile notifications */}
{user && (
  <SheetClose asChild>
    <Link href="/notifications" className="flex items-center py-2 text-base font-medium text-gray-700 mt-2">
      <Bell className="mr-3 h-5 w-5 text-yellow-500" />
      Notifications
      {notificationCount > 0 && (
        <Badge variant="destructive" className="ml-2 bg-red-500">
          {notificationCount}
        </Badge>
      )}
    </Link>
  </SheetClose>
)}

{/* User specific links (mobile) */}
{user ? (
  <>
    <SheetClose asChild>
      <Link href="/dashboard" className="flex items-center py-2 text-base font-medium text-gray-700 mt-2">
        <BarChart2 className="mr-3 h-5 w-5 text-yellow-500" />
        Dashboard
      </Link>
    </SheetClose>
    <SheetClose asChild>
      <Link href="/profile" className="flex items-center py-2 text-base font-medium text-gray-700">
        <span className="mr-3 h-5 w-5 flex items-center justify-center text-yellow-500">👤</span>
        Profile Settings
      </Link>
    </SheetClose>
    <SheetClose asChild>
      <Link href="/my-courses" className="flex items-center py-2 text-base font-medium text-gray-700">
        <BookOpen className="mr-3 h-5 w-5 text-yellow-500" />
        My Courses
      </Link>
    </SheetClose>
    <div 
      className="flex items-center py-2 text-base font-medium text-red-600 cursor-pointer mt-4"
      onClick={() => {
        logout();
      }}
    >
      <span className="mr-3 h-5 w-5 flex items-center justify-center">🚪</span>
      Sign Out
    </div>
  </>
) : (
  <div className="mt-4 pt-4 space-y-4 border-t border-gray-100">
    <SheetClose asChild>
      <Button 
        variant="outline" 
        className="w-full justify-center"
        onClick={openLogin}
      >
        Log In
      </Button>
    </SheetClose>
    <SheetClose asChild>
      <Button 
        className="w-full justify-center bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white"
        onClick={openSignup}
      >
        Sign Up
      </Button>
    </SheetClose>
  </div>
)}
</div>
</SheetContent>
</Sheet>
</div>
</div>
</div>
</div>
</nav>

{/* Auth Modal */}
<AuthModal 
  isOpen={isAuthModalOpen} 
  onClose={() => setIsAuthModalOpen(false)} 
  view={authModalView}
  setView={setAuthModalView}
/>
</>
);
}