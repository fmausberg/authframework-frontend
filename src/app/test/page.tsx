"use client";
import { useState, useEffect } from "react";
import { getCookie } from "../../utils/session-management";

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

export default function TestPage() {

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const fetchUserData = async () => {
      try {
        const response = await fetchWithToken(`${apiUrl}/test/check`);
        if (response.ok) {
          const data = await response.json();
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <p>x</p>
  );
}
