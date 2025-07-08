'use client';

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { getCompanyById } from "@/services/apiService";
import CreateReviewForm from "@/components/CreateReviewForm";
import { Company } from "@/types/api";

export default function CreateReviewPage() {
    const params = useParams();
    const { user } = useAuth();
    const companyId = params.id as string;

    const [company, setCompany] = useState<Company | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCompany = async () => {
            if (companyId) {
                const companyData = await getCompanyById(companyId);
                setCompany(companyData);
            }
            setIsLoading(false);
        };

        fetchCompany();
    }, [companyId]);

    if (isLoading) {
        return <div className="text-center">Loading...</div>;
    }

    if (!company) {
        return <div className="text-center">Company not found.</div>;
    }

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-center mb-2">
                Your Review for <span className="text-sky-400">{company.name}</span>
            </h1>
            <CreateReviewForm companyId={companyId} />
        </div>
    )
}