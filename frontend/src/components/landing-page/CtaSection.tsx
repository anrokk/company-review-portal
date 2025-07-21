'use client';

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

const CtaSection = () => {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <section className="py-24"></section>
    }

    return (
        <section className="py-24">
            <div className="container mx-auto px-6 text-center">
                {isAuthenticated ? (
                    <>
                        <h2 className="text-4xl font-bold text-white">Ready to Dive In?</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                            You're all set.
                        </p>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                            Start by browsing companies or checking out your profile to see your contributions.
                        </p>
                        <div className="mt-8 flex justify-center gap-4">
                            <Link href="/companies" className="px-8 py-4 rounded-md font-medium text-black bg-white hover:bg-gray-200 transition-all duration-300">
                                Browse Companies
                            </Link>
                            <Link href="/profile" className="px-8 py-4 rounded-md font-medium text-white bg-neutral-800 hover:bg-neutral-700 transition-all duration-300">
                                View My Profile
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <h2 className="text-4xl font-bold text-white">Ready to Share Your Own Story?</h2>
                        <p className="mt-4 text-lg text-gray-400 max-w-2xl mx-auto">
                            Join a growing community of tech professionals dedicated to making the hiring process more transparent for everyone.
                        </p>
                        <div className="mt-8">
                            <Link href="/register" className="px-8 py-4 rounded-md font-medium text-black bg-white hover:bg-gray-200 transition-all duration-300">
                                Create Your Account
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </section>
    );
};

export default CtaSection;