// components/Navbar.tsx
"use client"
import { useState } from "react";
import Link from "next/link";
import { useAuth } from "../../context/AuthContext";
import { deleteCookie } from "../../utils/session-management";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isLoggedIn } = useAuth();

  const handleLogout = () => {
    deleteCookie("jwttoken");
    window.location.href = "/auth/login";
  };

  return (
    <nav className="bg-navbar-background shadow-lg">
      {/* Container mit max-width und Zentrierung */}
      <div className="max-w-6xl mx-auto px-4">
        {/* Responsive Grid Layout */}
        <div className="grid grid-cols-2 md:grid-cols-12 items-center h-16">
          {/* Logo: Auf Mobile 1 von 2 Spalten, auf Desktop 3 von 12 Spalten */}
          <div className="col-span-1 md:col-span-3">
            <span className="text-xl font-bold text-navbar-text">Logo</span>
          </div>

          {/* Navigation: Auf Mobile versteckt, auf Desktop 6 von 12 Spalten */}
          <div className="hidden md:block md:col-span-6">
            <div className="grid grid-cols-5 gap-4 justify-items-center">
              <a
                href="/home"
                className="hover:text-navbar-hover text-navbar-text"
              >
                Home
              </a>
              <a href="#" className="hover:text-navbar-hover text-navbar-text">
                About
              </a>
              <a href="#" className="hover:text-navbar-hover text-navbar-text">
                Services
              </a>
              <a href="#" className="hover:text-navbar-hover text-navbar-text">
                Contact
              </a>
              {isLoggedIn && (
                <a
                  href="/home/user"
                  className="hover:text-navbar-hover text-navbar-text"
                >
                  User
                </a>
              )}
            </div>
          </div>

          {/* Buttons: Auf Mobile 1 von 2 Spalten, auf Desktop 3 von 12 Spalten */}
          <div className="col-span-1 md:col-span-3 justify-self-end">
            {/* Hamburger Menu nur auf Mobile sichtbar */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-primaryButton-text"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Buttons nur auf Desktop sichtbar */}
            <div className="hidden md:flex gap-2">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/auth/login">
                    <button className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded">
                      Login
                    </button>
                  </Link>
                  <Link href="/auth/register">
                    <button className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Menü */}
        {isOpen && (
          <div className="md:hidden py-4">
            <a
              href="#"
              className="block py-2 hover:text-navbar-hover text-navbar-text"
            >
              Home
            </a>
            <a
              href="#"
              className="block py-2 hover:text-navbar-hover text-navbar-text"
            >
              About
            </a>
            <a
              href="#"
              className="block py-2 hover:text-navbar-hover text-navbar-text"
            >
              Services
            </a>
            <a
              href="#"
              className="block py-2 hover:text-navbar-hover text-navbar-text"
            >
              Contact
            </a>
            {isLoggedIn && (
              <a
                href="/home/user"
                className="block py-2 hover:text-navbar-hover text-navbar-text"
              >
                User
              </a>
            )}
            <div className="flex gap-2 pt-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link href="/auth/login">
                    <button className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded">
                      Login
                    </button>
                  </Link>
                  <Link href="/auth/register">
                    <button className="bg-primaryButton hover:bg-primaryButton-hover text-primaryButton-text font-bold py-2 px-4 rounded">
                      Register
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
