import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';
import { MdEmail, MdPhone } from 'react-icons/md';

function Footer() {
    const currentYear = new Date().getFullYear();
    
    return (
        <footer className="bg-gradient-to-b from-[#301934] to-[#1F0B22] pt-16 text-white">
            {/* Top section with curved top */}
            <div className="rounded-t-3xl bg-gradient-to-b from-[#301934] to-[#1F0B22] px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Main content */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
                        {/* Brand column */}
                        <div className="space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent">
                                CoinCoach
                            </h2>
                            <p className="text-gray-300 max-w-xs">
                                Your trusted companion on the journey to financial freedom through education and guidance.
                            </p>
                            <div className="flex space-x-4 pt-2">
                                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200">
                                    <FaFacebookF className="text-lg" />
                                </a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200">
                                    <FaTwitter className="text-lg" />
                                </a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200">
                                    <FaInstagram className="text-lg" />
                                </a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200">
                                    <FaLinkedinIn className="text-lg" />
                                </a>
                                <a href="#" className="bg-white/10 hover:bg-white/20 p-2 rounded-full transition-colors duration-200">
                                    <FaYoutube className="text-lg" />
                                </a>
                            </div>
                        </div>

                        {/* Courses column */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-yellow-300">Courses</h3>
                            <ul className="space-y-3">
                                <li className="transition-all duration-200 hover:translate-x-1">
                                    <Link href="/courses/savings" className="text-gray-300 hover:text-yellow-300">Savings Fundamentals</Link>
                                </li>
                                <li className="transition-all duration-200 hover:translate-x-1">
                                    <Link href="/courses/investment" className="text-gray-300 hover:text-yellow-300">Smart Investment Strategies</Link>
                                </li>
                                <li className="transition-all duration-200 hover:translate-x-1">
                                    <Link href="/courses/retirement" className="text-gray-300 hover:text-yellow-300">Retirement Planning</Link>
                                </li>
                                <li className="transition-all duration-200 hover:translate-x-1">
                                    <Link href="/courses/tax" className="text-gray-300 hover:text-yellow-300">Tax Management</Link>
                                </li>
                                <li className="transition-all duration-200 hover:translate-x-1">
                                    <Link href="/courses/all" className="text-gray-300 hover:text-yellow-300">View All Courses →</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Quick Links column */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-yellow-300">Quick Links</h3>
                            <ul className="space-y-3">
                                <li className="transition-all duration-200 hover:translate-x-1">
                                    <Link href="/about" className="text-gray-300 hover:text-yellow-300">About Us</Link>
                                </li>
                                <li className="transition-all duration-200 hover:translate-x-1">
                                    <Link href="/blog" className="text-gray-300 hover:text-yellow-300">Financial Blog</Link>
                                </li>
                                <li className="transition-all duration-200 hover:translate-x-1">
                                    <Link href="/resources" className="text-gray-300 hover:text-yellow-300">Learning Resources</Link>
                                </li>
                                <li className="transition-all duration-200 hover:translate-x-1">
                                    <Link href="/faq" className="text-gray-300 hover:text-yellow-300">FAQ</Link>
                                </li>
                                <li className="transition-all duration-200 hover:translate-x-1">
                                    <Link href="/contact" className="text-gray-300 hover:text-yellow-300">Contact Us</Link>
                                </li>
                            </ul>
                        </div>

                        {/* Contact column */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-semibold text-yellow-300">Contact Us</h3>
                            <div className="space-y-3">
                                <p className="flex items-center text-gray-300">
                                    <MdEmail className="mr-2 text-yellow-300" />
                                    support@coincoach.com
                                </p>
                                <p className="flex items-center text-gray-300">
                                    <MdPhone className="mr-2 text-yellow-300" />
                                    (800) 123-4567
                                </p>
                                <div className="pt-4">
                                    <h4 className="text-lg font-medium text-yellow-300 mb-3">Subscribe to Newsletter</h4>
                                    <form className="flex">
                                        <input 
                                            type="email" 
                                            placeholder="Your email" 
                                            className="py-2 px-4 bg-white/10 text-white placeholder-gray-400 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-yellow-300 w-full"
                                        />
                                        <button 
                                            type="submit" 
                                            className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium py-2 px-4 rounded-r-lg transition-colors duration-200"
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom section with copyright */}
            <div className="border-t border-white/10 py-6">
                <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
                    <div className="text-gray-400 text-sm mb-4 md:mb-0">
                        © {currentYear} CoinCoach. All rights reserved.
                    </div>
                    <div className="flex space-x-6 text-sm">
                        <Link href="/terms" className="text-gray-400 hover:text-yellow-300">Terms of Service</Link>
                        <Link href="/privacy" className="text-gray-400 hover:text-yellow-300">Privacy Policy</Link>
                        <Link href="/cookies" className="text-gray-400 hover:text-yellow-300">Cookie Policy</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;