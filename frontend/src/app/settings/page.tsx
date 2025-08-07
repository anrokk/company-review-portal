'use client';

import ChangePasswordForm from "@/components/ChangePasswordForm";
import { useAuth } from "@/context/AuthContext";

export default function SettingsPage() {
    const { user, isLoading: isAuthLoading } = useAuth();

    if (isAuthLoading) {
        return <div></div>;
    }

    return (
        <div className="container mx-auto px-6 py-8">
            <div className="mb-12">
                <h1 className="text-4xl font-bold">Account Settings</h1>
                <p className="text-lg text-gray-400 mt-2">
                    Manage your account details
                </p>
            </div>

            <ChangePasswordForm />

        </div>
    );
}