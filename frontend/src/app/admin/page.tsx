"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { Company } from "@/types/api";
import { getPendingCompanies, approveCompany, deleteCompany } from "@/services/adminService";

export default function AdminPage() {
  const { token } = useAuth();
  const [pendingCompanies, setPendingCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const fetchPendingCompanies = async () => {
    if (!token) return;
    try {
      setIsLoading(true);
      const data = await getPendingCompanies(token);
      setPendingCompanies(data);
    } catch (error) {
      setError("Failed to fetch pending companies");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingCompanies()
  }, [token]);

  const handleApprove = async (companyId: string) => {
    if (!token) return;
    try {
      await approveCompany(companyId, token);
      fetchPendingCompanies();
    } catch (error) {
      setError("Failed to approve company");
    }
  };

  const handleDelete = async (companyId: string) => {
    if (!token) return;
    try {
      await deleteCompany(companyId, token);
      fetchPendingCompanies();
    } catch (error) {
      setError("Failed to delete company");
    }
  };

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>
      <div className="bg-neutral-950/50 border border-neutral-800 rounded-lg p-6">
        <h2 className="text-2xl font-bold">Pending Companies ({pendingCompanies.length})</h2>
        {error && (
          <div className="p-3 bg-red-900/50 border border-red-500/50 rounded-md">
            <p className="text-red-300 text-sm text-center">{error}</p>
          </div>
        )}
        <div className="mt-6 space-y-4">
          {pendingCompanies.length > 0 ? (
            pendingCompanies.map(company => (
              <div key={company.id} className="flex justify-between items-center p-4 border border-neutral-700 rounded-md">
                <div>
                  <p className="font-semibold text-white">{company.name}</p>
                  <p className="text-xs text-gray-500 font-mono">{company.id}</p>
                </div>
                <div className="flex gap-4">
                  <button onClick={() => handleApprove(company.id)} className="px-3 py-1 text-sm bg-green-600 hover:bg-green-700 rounded-md text-white">Approve</button>
                  <button onClick={() => handleDelete(company.id)} className="px-3 py-1 text-sm bg-red-600 hover:bg-red-700 rounded-md text-white">Delete</button>
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