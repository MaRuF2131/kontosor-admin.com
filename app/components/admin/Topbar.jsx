"use client";
import { HiMenu } from "react-icons/hi";
import { useSession, signOut } from "next-auth/react";


export default function Topbar({setSidebarOpen}) {
  const { data: session } = useSession();
  console.log(session);
  
  return (
    <div className="bg-white p-4 z-[999] shadow flex justify-between items-center">
      {/* টাইটেল + মেনু */}
      <div className="flex gap-x-2 items-center">
        <h1 className="text-lg font-bold">এডমিন প্যানেল</h1>
        <button
          className="lg:hidden block"
          onClick={() => setSidebarOpen(true)}
        >
          <HiMenu size={24} />
        </button>
      </div>

      {/* ডান পাশে profile + logout */}
      <div className="flex items-center space-x-4">
        {/* Profile name */}
        <span className="bg-gray-200 px-3 py-1 rounded">
          {session?.user?.name || "প্রোফাইল"}
        </span>

        {/* Logout button */}
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          লগআউট
        </button>
      </div>
    </div>
  );
}