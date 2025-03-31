"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function VerifyPage() {
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    const verifyMail = async () => {
      const token = searchParams.get("token");
      if (!token) {
        setErrorMessage("Token fehlt");
        return;
      }

      const response = await fetch(`${apiUrl}/auth/verifyMail`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      });

      if (response.ok) {
        setMessage("Mail ist verifiziert");
      } else {
        setErrorMessage("Verifizierung fehlgeschlagen");
      }
    };

    verifyMail();
  }, [searchParams, apiUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 pt-16 pb-16">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">
          Mail-Verifizierung
        </h1>
        {message && (
          <div className="text-center">
            <p className="text-green-500 mb-4">{message}</p>
            <button
              onClick={() => router.push("/auth/login")}
              className="bg-primaryButton text-primaryButton-text py-2 px-4 rounded-md hover:bg-primaryButton-hover focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus focus:ring-offset-2 transition-colors duration-300"
            >
              Zum Login
            </button>
          </div>
        )}
        {errorMessage && (
          <p className="text-red-500 text-center">{errorMessage}</p>
        )}
      </div>
    </div>
  );
}
