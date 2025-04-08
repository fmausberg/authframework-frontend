"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/AuthContext";

export default function LoginPage() {
  const [mail, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { login } = useAuth();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const response = await fetch(`${apiUrl}/auth/directlogin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mail, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.jwttoken;

        // Store the token in localStorage
        localStorage.setItem("jwttoken", token);

        // Call the login function from AuthContext
        login();

        // Redirect to the user home page
        router.push("/home/user");
      } else {
        setErrorMessage("Login failed");
      }
    } catch (error) {
      console.error("Error during fetch:", error);
      setErrorMessage("An error occurred");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-8 text-textPrimary">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-textPrimary mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={mail}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
              placeholder="ihre@email.com"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-textPrimary mb-2"
            >
              Passwort
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus border-slate-300"
              placeholder="••••••••"
              required
            />
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center">{errorMessage}</p>
          )}

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center">
              <input
                type="checkbox"
                className="rounded border-slate-300 text-formsDesigns-checkbox shadow-sm focus:formsDesigns-focus focus:ring focus:ring-formsDesigns-focus focus:ring-opacity-50"
              />
              <span className="ml-2 text-textPrimary">Angemeldet bleiben</span>
            </label>
            <a
              href="/home/auth/forgot-password"
              className="text-links hover:text-links-hover"
            >
              Passwort vergessen?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-primaryButton text-primaryButton-text py-2 px-4 rounded-md hover:bg-primaryButton-hover focus:outline-none focus:ring-2 focus:ring-formsDesigns-focus focus:ring-offset-2 transition-colors duration-300"
          >
            Einloggen
          </button>

          <p className="text-center text-sm text-textPrimary-light">
            Noch kein Konto?{" "}
            <a
              href="/home/auth/register"
              className="text-links hover:text-links-hover"
            >
              Jetzt registrieren
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
