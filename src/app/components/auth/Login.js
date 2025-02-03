// Login.js
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Signup from './Signup';

export default function Login({ isOpen, onClose, onSwitchToSignup }) {
    const router = useRouter();
    const [formData, setFormData] = useState({
        emailOrPhone: '',
        passcode: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                onClose();
                router.push('/dashboard');
            } else {
                setError('Invalid credentials. Please try again.');
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            router.push(`/api/auth/${provider}`);
        } catch (err) {
            setError(`${provider} login failed. Please try again.`);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
                onClick={onClose}
            />

            <div className="relative min-h-screen flex items-center justify-center">
                <div className="relative max-w-md w-full bg-white p-8 rounded-2xl shadow-lg m-4">
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                    >
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-gray-900">Login</h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Hey, Enter your details to sign in to your account
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        {error && (
                            <div className="text-red-500 text-sm text-center">
                                {error}
                            </div>
                        )}

                        <div className="space-y-4">
                            <div>
                                <input
                                    type="text"
                                    required
                                    className="appearance-none rounded-lg block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Enter Email / Phone No"
                                    value={formData.emailOrPhone}
                                    onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
                                />
                            </div>

                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    required
                                    className="appearance-none rounded-lg block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="Passcode"
                                    value={formData.passcode}
                                    onChange={(e) => setFormData({ ...formData, passcode: e.target.value })}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-sm"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                        </div>

                        <div className="text-sm text-center">
                            <Link href="/forgot-password" className="text-gray-600 hover:text-gray-900">
                                Having trouble signing in?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 rounded-lg text-sm font-medium text-white bg-orange-400 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                        >
                            Sign in
                        </button>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or Sign in with</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <button
                                type="button"
                                onClick={() => handleSocialLogin('google')}
                                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Image src="/google-icon.jpg" alt="Google" width={40} height={24} className="mr-2" />
                                Google
                            </button>

                            <button
                                type="button"
                                onClick={() => handleSocialLogin('apple')}
                                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Image src="/apple-icon.jpg" alt="Apple" width={40} height={24} className="mr-2 mb-2" />
                                Apple
                            </button>

                            <button
                                type="button"
                                onClick={() => handleSocialLogin('facebook')}
                                className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                            >
                                <Image src="/facebook-icon.jpg" alt="Facebook" width={40} height={24} className="mr-2" />
                                Facebook
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-600 mt-6">
                        Don't have an account?{' '}
                        <button
                            onClick={onSwitchToSignup}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Request Now
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
