import React, { useState, useEffect } from "react";

type UserProfileProps = {
  initialData?: {
    username: string;
    name: string;
    phone: string;
  };
};

export default function UserProfile({ initialData }: UserProfileProps) {
  const [userData, setUserData] = useState(initialData || { username: "", name: "", phone: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user details from the API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("krishnaprasathk-backend.hf.space/api/auth/getdata", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Assumes token is stored in localStorage
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUserData({
          username: data.user.email, // Assuming the email is used as the username
          name: data.user.name,
          phone: data.user.phone,
        });
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <main className="container mx-auto mt-8 p-4 bg-[#e6f3ff] min-h-screen">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">User Profile</h2>
      <div className="w-full max-w-2xl mx-auto bg-white shadow-md rounded-lg">
        <div className="border-b border-gray-200 bg-gray-50 p-4 rounded-t-lg">
          <h3 className="text-xl text-gray-800">Profile Information</h3>
        </div>
        <div className="p-4 space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Username</label>
            <p className="text-base text-gray-900">{userData.username}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <p className="text-base text-gray-900">{userData.name}</p>
          </div>
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Phone</label>
            <p className="text-base text-gray-900">{userData.phone}</p>
          </div>
        </div>
      </div>
    </main>
  );
}
