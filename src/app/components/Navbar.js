import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../public/images/logo.png"

export default function Navbar(){
    return(
        <div className="text-3xl flex justify-between mt-[40px]">
            <div id="logo" className="ml-[50px] mt-[-15px]"><Image src={logo} className=" w-[50px] h-[50px] lg:w-[70px] lg:h-[70px]" alt="logo"></Image></div>
            <div className="navbar text-right md:ml-8 mr-10 flex">
                <div className="mr-[30px] font-bold"><Link href="/">Home</Link></div>
                <div className="mr-[30px] font-bold"><a href="#crs">Courses</a></div>
                <div className="mr-[30px] font-bold"><Link href="/resources">Resources</Link></div>
                <div className="mr-[30px] font-bold"><Link href="/login">Log In</Link></div>
                <div className="bg-gradient-to-r from-teal-400 via-cyan-500 to-indigo-400 hover:text-black text-white mt-[-3px] mr-[20px] mb-[40px] lg:rounded-2xl"><button className="px-6 py-1 mb-1"><Link href="/signup" >Sign Up</Link></button></div>
                

                
            </div>

        </div>
    )
}