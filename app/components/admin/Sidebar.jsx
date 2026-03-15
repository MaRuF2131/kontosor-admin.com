"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {HiX} from 'react-icons/hi'

export default function Sidebar({SidebarOpen,setSidebarOpen}) {
  const path = usePathname();
  const [openMenu, setOpenMenu] = useState(null);
  
  const {data: session,status}=useSession()

  const toggleMenu = (menu) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  const menu = [
    {
      name: "ড্যাশবোর্ড",
      path: "/admin",
    },
    {
      name: "সংবাদ ব্যবস্থাপনা",
      children: [
        { name: "সকল সংবাদ", path: "/admin/news" },
        { name: "নতুন সংবাদ যোগ করুন", path: "/admin/news/add" },
      ],
    },
    {
      name: "ভিডিও ব্যবস্থাপনা",
      children: [
        { name: "সকল ভিডিও", path: "/admin/video" },
        { name: "নতুন ভিডিও যোগ করুন", path: "/admin/video/add" },
      ],
    },
    {
      name: "ভিডিও স্টোরি",
      children: [
        { name: "সকল ভিডিও স্টোরি", path: "/admin/video-story" },
        { name: "নতুন ভিডিও স্টোরি যোগ করুন", path: "/admin/video-story/add" },
      ],
    },
    {
      name: "ফটো স্টোরি",
      children: [
        { name: "সকল ফটো স্টোরি", path: "/admin/photo-story" },
        { name: "নতুন ফটো স্টোরি যোগ করুন", path: "/admin/photo-story/add" },
      ],
    },
    {
      name: "ফটোগ্যালারি",
      children: [
        { name: "সকল ফটোগ্যালারি", path: "/admin/photo-gallery" },
        { name: "নতুন ফটোগ্যালারি যোগ করুন", path: "/admin/photo-gallery/add" },
      ],
    },
    {
      name: "অডিও ব্যবস্থাপনা",
      children: [
        {
          name: "সকল অডিও",
          path: "/admin/audio",
        },
        {
          name: "যোগ অডিও",
          path: "/admin/audio/add",
        },
      ],
    },

    //  নতুন ম্যাগাজিন সেকশন
    {
      name: "ম্যাগাজিন ব্যবস্থাপনা",
      children: [
        { name: "সকল ম্যাগাজিন", path: "/admin/magazine" },
        { name: "নতুন ম্যাগাজিন যোগ করুন", path: "/admin/magazine/add" },
      ],
    },

    {
      name: "সাংবাদিক ব্যবস্থাপনা",
      children: [
        { name: "সকল সাংবাদিক", path: "/admin/reporter" },
        { name: "নতুন সাংবাদিক যোগ করুন", path: "/admin/reporter/add" },
      ],
    },

    {
        name: "মতামত ব্যবস্থাপনা",
        children: [
          { name: "সকল মতামত", path: "/admin/opinion" },
          { name: "নতুন মতামত যোগ করুন", path: "/admin/opinion/add" },
        ],
    },
    
    {
      name: "অনলাইন জরিপ",
      children: [
        { name: "সকল জরিপ", path: "/admin/poll" },
        { name: "নতুন জরিপ তৈরি করুন", path: "/admin/poll/add" },
      ],
    },
  ];

  return (
    <div  className={`${SidebarOpen?"fixed inset-0":"w-64 hidden lg:block relative"}  bg-black text-white px-5 pb-5 h-screen overflow-auto`}>
      <h2 className="text-2xl sticky top-0 z-[999] bg-black font-bold mb-6 pt-5">এডমিন প্যানেল</h2>
      <HiX onClick={(e)=>{e.preventDefault(); e.stopPropagation(); setSidebarOpen(false)}} className=" lg:hidden block absolute top-2 right-2 text-2xl text-white"></HiX>
     {session?.user?.role==="superadmin" &&<Link
            href={'/admin/create'}
            className="block mb-3 p-2 rounded text-blue-700 hover:text-blue-900"
          >
          Create Admin
      </Link>}
      {menu.map((item, index) =>
        item.children ? (
          <div key={index} className="mb-3">
            <button
              onClick={() => toggleMenu(item.name)}
              className="w-full cursor-pointer text-left p-2 rounded  hover:text-gray-400"
            >
              {item.name}
            </button>

            {openMenu === item.name && (
              <div className="ml-4 mt-2">
                {item.children.map((child,i) => (
                  <Link
                    key={i}
                    href={child.path}
                    className={`block p-2 rounded mb-1 ${
                      path === child.path ? "text-gray-400" : "hover:text-gray-400"
                    }`}
                  >
                    {child.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <Link
            key={item.path}
            href={item.path}
            className={`block mb-3 p-2 rounded ${
              path === item.path ? "text-gray-400" : "hover:text-gray-400"
            }`}
          >
            {item.name}
          </Link>
        )
      )}
    </div>
  );
}
