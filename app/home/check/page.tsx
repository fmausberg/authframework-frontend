"use client";
import { useEffect, useState } from "react";
import api from "../../api/auth/axiosInstance";
import { useAuth } from "../../api/auth/authContext";

export default function HomePage() {
    const { appUser, logout } = useAuth();
    const [appUserCount, setAppUserCount] = useState(0);

    useEffect(() => {
        api.get("/appuser/count")
        .then((response) => setAppUserCount(response.data))
        .catch((error) => console.error("Error fetching /appuser/count:", error));
    }, []);

    return (
        <div className="p-6">
        {appUser ? (
            <>
                <h1 className="text-2xl font-bold">Welcome, {appUser.publicname}!</h1>
                <button onClick={logout} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">
                    Logout
                </button>
                <p className="mt-4">Total app users: {appUserCount}</p>
            </>
        ) : (
            <p>Please log in.</p>
        )}
        </div>
    );
}
