import React from "react";
import Link from "next/link";
import Image from "next/image";
import logo from "../images/logo.png"

export default function Navbar(){
    return(
        <div className="text-3xl flex justify-between mt-[40px]">
            <div id="logo" className="ml-[50px] mt-[-15px]"><Image src={logo} className="lg:w-[100px] w-[50px] lg:h-[100px] h-[50px]" alt="logo"></Image></div>
            <div className="navbar text-right md:ml-8 mr-10 flex">
                <div className="mr-[30px] font-bold"><Link href="/savings">Home</Link></div>
                <div className="mr-[30px] font-bold"><a href="#crs">Courses</a></div>
                <div className="mr-[30px] font-bold"><Link href="/resources">Resources</Link></div>
                <div className="mr-[30px] font-bold"><Link href="/login">Log In</Link></div>
                <div className="bg-[#006af9] hover:bg-[#f1c40f] hover:text-black text-white mt-[-10px] mr-[20px] mb-[100px] lg:rounded-lg"><button className="px-6 py-2"><Link href="/signup">Sign Up</Link></button></div>
                

                
            </div>

        </div>
    )
}