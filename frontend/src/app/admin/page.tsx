"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Company } from "@/types/api";
import { getPendingCompanies } from "@/services/adminService";

export default function AdminPage() {
  const { token } = useAuth();
  const [pendingCompanies, setPendingCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (token) {
      const fetchPending = async () => {
        try {
          const companies = await getPendingCompanies(token);
          setPendingCompanies(companies);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPending();
    } else { }
  }, [token]);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold">Pending Companies ({pendingCompanies.length})</h2>
        <div className="mt-6 space-y-4">
          {isLoading ? (
            <p className="text-center text-gray-500 py-4">Loading submissions...</p>
          ) : pendingCompanies.length > 0 ? (
            pendingCompanies.map(company => (
              <div key={company.id} className="flex justify-between items-center p-4 border border-neutral-700 rounded-md">
                <div>
                  <p className="font-semibold text-white">{company.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{company.id}</p>
                </div>
                <div className="flex gap-4">
                  <button className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 rounded-md text-white">Approve</button>
                  <button className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md text-white">Delete</button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 py-4">No companies are currently pending approval.</p>
          )}
        </div>
      </div>
    </div>
  );
}