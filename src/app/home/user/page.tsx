"use client";
import { useState, useEffect } from "react";
import { getCookie } from "../../../utils/session-management";

// Helper function to fetch with JWT token
const fetchWithToken = async (url: string, options: RequestInit = {}) => {
  const token = getCookie("jwttoken");
  const headers = {
    ...options.headers,
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };

  return fetch(url, { ...options, headers });
};

export default function UserPage() {
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    mail: "",
  });

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const fetchUserData = async () => {
      try {
        const response = await fetchWithToken(`${apiUrl}/appuser/me`);
        if (response.ok) {
          const data = await response.json();
          setUserData(data);
          console.log(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetchWithToken("/updateme", {
        method: "POST",
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        console.log("User data updated successfully");
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">
          Benutzerübersicht
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Vorname:
            </label>
            <input
              type="text"
              name="firstName"
              value={userData.firstName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              Nachname:
            </label>
            <input
              type="text"
              name="lastName"
              value={userData.lastName}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-textPrimary mb-1">
              E-Mail:
            </label>
            <input
              type="email"
              name="mail"
              value={userData.mail}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-primaryButton text-primaryButton-text py-2 px-4 rounded-md hover:bg-primaryButton-hover focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus focus:ring-offset-2 transition-colors duration-300"
          >
            Speichern
          </button>
        </form>
      </div>
    </div>
  );
}
