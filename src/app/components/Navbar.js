'use client';
import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png";
import { FaBell } from "react-icons/fa6";
import { useAuth } from './auth/AuthContext';

export default function Navbar() {
    const { openLogin, openSignup } = useAuth();

    return (
        <div className="text-xl flex justify-between mt-[40px]">
            <div id="logo" className="ml-[50px] mt-[-15px]">
                <Image src={logo} className="w-[50px] h-[50px] lg:w-[70px] lg:h-[70px]" alt="logo" />
            </div>
            <div className="navbar text-right md:ml-8 mr-10 flex">
                <div className="mr-[30px] font-bold">
                    <Link href="/">Home</Link>
                </div>
                <div className="mr-[30px] font-bold">
                    <a href="#crs">Courses</a>
                </div>
                <div className="mr-[30px] font-bold">
                    <Link href="/resources">Resources</Link>
                </div>

                <div className="mr-[30px] font-bold">
                    <button
                        onClick={openLogin}
                        className="hover:text-gray-600 transition-colors"
                    >
                        Log In
                    </button>
                </div>

                <div className="bg-yellow-400 hover:text-black text-white mt-[-3px] mr-[20px] mb-[40px] lg:rounded-lg">
                    <button
                        className="px-6 py-1 mb-1"
                        onClick={openSignup}
                    >
                        Sign Up
                    </button>
                </div>
                <div className="">
                    <FaBell />
                </div>
            </div>
        </div>
    );
}
