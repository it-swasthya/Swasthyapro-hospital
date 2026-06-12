"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SearchForm } from "@/components/ui/search-form";
import { hospitalSidebarItems } from "../config/hospital-sidebar";

export default function HospitalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [hospitalName, setHospitalName] = useState("Hospital");

  useEffect(() => {
    const name = localStorage.getItem("user_hospital_name");

    if (name) {
      setHospitalName(name);
    }
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar */}
        <AppSidebar
          logoSrc="/logo-header.png"
          menuItems={hospitalSidebarItems}
          user={{
            name: hospitalName,
            role: "Hospital",
            avatar: "https://i.pravatar.cc/100?img=10",
          }}
        />

        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex h-14 items-center justify-between border-b px-6">
            <div className="flex items-center gap-3">
              <SidebarTrigger />

           <div className="flex flex-col leading-tight">
  <h1 className="lg:text-2xl md:text-xl sm:text-md  font-bold tracking-tight ">
    Welcome back,{" "}
    <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent uppercase">
      {hospitalName}
    </span>
  </h1>
 
</div>
            </div>

            <div className="w-70">
              <SearchForm />
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 w-full p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
