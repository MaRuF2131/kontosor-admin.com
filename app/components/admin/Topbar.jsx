"use client";
import { HiMenu } from "react-icons/hi";
export default function Topbar({setSidebarOpen}) {
  return (
    <div className="bg-white p-4 z-[999] shadow flex justify-between items-center">
      {/* টাইটেল */}
      <div className=" flex gap-x-2">
          <h1 className="text-lg font-bold">এডমিন প্যানেল</h1>
            <button className="lg:hidden block" onClick={() => setSidebarOpen(true)}>
            <HiMenu size={24} />
            </button>
        </div>
      {/* ডান পাশে অপশনাল কন্ট্রোল */}
      <div className="flex items-center space-x-4">
        <button className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300">
          প্রোফাইল
        </button>
        <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
          লগআউট
        </button>
      </div>
    </div>
  );
}
