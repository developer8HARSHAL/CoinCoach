// src/app/components/Navbar.js
'use client';

import React, { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { FaBell } from "react-icons/fa6";
import { useAuth } from '../components/auth/AuthContext';
import Dashboard from "./Dashboard/Dashboard";

export default function Navbar() {
    const { user, openLogin, openSignup, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);
    const timeoutRef = useRef(null);

    // Function to get user initials
    const getUserInitials = () => {
        if (!user || !user.displayName) {
            return user?.email?.charAt(0)?.toUpperCase() || '?';
        }
        
        const names = user.displayName.split(' ');
        if (names.length === 1) {
            return names[0].charAt(0).toUpperCase();
        }
        return (names[0].charAt(0) + names[names.length - 1].charAt(0)).toUpperCase();
    };

    const handleMouseEnter = () => {
        setShowDropdown(true);
        // Clear any existing timeout
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }
    };

    const handleMouseLeave = () => {
        // Set a timeout to hide the dropdown after 2 seconds
        timeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 2000); // 2000 milliseconds = 2 seconds
    };

    return (
        <div className="text-xl flex justify-between items-center mt-[40px]">
            <div id="logo" className="ml-[50px] mt-[-15px]">
                <Image src={logo} className="w-[50px] h-[50px] lg:w-[70px] lg:h-[70px]" alt="logo" />
            </div>
            <div className="navbar flex items-center md:ml-8 mr-10">
                <div className="mr-[30px] font-bold">
                    <Link href="/">Home</Link>
                </div>
                <div className="mr-[30px] font-bold">
                    <a href="#crs">Courses</a>
                </div>
                <div className="mr-[30px] font-bold">
                    <Link href="/resources">Resources</Link>
                </div>

                {user ? (
                    <div className="mr-[30px]">
                        <div className="relative"
                             onMouseEnter={handleMouseEnter}
                             onMouseLeave={handleMouseLeave}>
                            <div className="w-10 h-10 bg-orange-400 rounded-full flex items-center justify-center text-white cursor-pointer">
                                {user.photoURL ? (
                                    <Image 
                                        src={user.photoURL} 
                                        alt="Profile" 
                                        width={40} 
                                        height={40} 
                                        className="rounded-full" 
                                    />
                                ) : (
                                    <span className="text-xl font-semibold">{getUserInitials()}</span>
                                )}
                            </div>
                            
                            {/* Dropdown menu */}
                            {showDropdown && (
                                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
                                     onMouseEnter={handleMouseEnter}
                                     onMouseLeave={handleMouseLeave}>
                                    <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                        Dashboard
                                    </Link>
                                    <hr className="my-1 border-gray-200" />
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                ) : (
                    <>
                        <div className="mr-[30px] font-bold">
                            <button
                                onClick={openLogin}
                                className="hover:text-gray-600 transition-colors"
                            >
                                Log In
                            </button>
                        </div>

                        <div className="font-bold mr-[30px]">
                            <button
                                className="bg-yellow-400 hover:text-black text-white px-6 py-1 rounded-lg"
                                onClick={openSignup}
                            >
                                Sign Up
                            </button>
                        </div>
                    </>
                )}
                <div className="flex items-center">
                    <FaBell className="cursor-pointer" />
                </div>
            </div>
        </div>
    );
}