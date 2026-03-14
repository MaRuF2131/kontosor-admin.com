'use client'
import Sidebar from "@/components/admin/Sidebar";
import Topbar from "@/components/admin/Topbar";
import ProtectedRoute from "@/lib/ProtectedRoute";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({ children }) {
    const path=usePathname();
    const [SidebarOpen,setSidebarOpen]=useState(false)
    useEffect(()=>{
         setSidebarOpen(false)
    },[path])
  return (
  <ProtectedRoute> 
      <div className="flex h-screen overflow-hidden">
        <Sidebar SidebarOpen={SidebarOpen} setSidebarOpen={setSidebarOpen}/>
        <div className="flex-1 bg-gray-100 h-screen overflow-hidden">
          <Topbar setSidebarOpen={setSidebarOpen}/>
          <div className=" px-3 pt-3 pb-20 h-screen overflow-auto ">{children}</div>
        </div>
      </div>
    </ProtectedRoute> 
  );
}
