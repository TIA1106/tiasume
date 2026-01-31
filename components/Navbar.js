"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#5e548e] text-white flex justify-between items-center px-6 py-5 shadow">
      <Link href="/">
        <span className="text-xl font-bold text-[#f4f1fb] cursor-pointer">
          💼 TiaSumé
        </span>
      </Link>

      <ul className="flex gap-6 items-center text-sm font-medium">
        {!isLoggedIn && (
          <>
            <li>
              <Link href="/login">
                <button className="hover:text-[#be95c4] cursor-pointer">🔐 Login</button>
              </Link>
            </li>
            <li>
              <Link href="/signup">
                <button className="hover:text-[#be95c4] cursor-pointer">✍️ Signup</button>
              </Link>
            </li>
          </>
        )}

        <li>
          <Link href="/resume">
            <button className="hover:text-[#be95c4] cursor-pointer">🧾 Build</button>
          </Link>
        </li>
        <li>
          <Link href="/dashboard">
            <button className="hover:text-[#be95c4] cursor-pointer">📊 Dashboard</button>
          </Link>
        </li>
        <li>
          <Link href="/about">
            <button className="hover:text-[#be95c4] cursor-pointer">👩‍💻 About</button>
          </Link>
        </li>

        <li>
          <button
            onClick={handleLogout}
            className="text-white text-center hover:text-[#f4f1fb] bg-red-600 px-2 py-2 rounded cursor-pointer font-semibold"
          >
            🚪 Logout
          </button>
        </li>
      </ul>
    </nav>
  );
}
