"use client";

import { useEffect, useState } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SearchForm } from "@/components/ui/search-form";
import { doctorSidebarItems } from "../config/doctor-sidebar";
import axios from "axios";

export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [userName, setUserName] = useState("Doctor");
  const [speciality, setSpeciality] = useState("doctor");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const userId = localStorage.getItem("user_doctor_id");

        console.log(userId, "id of user ");

        if (!userId) {
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://api.swasthyapro.com/api/auth/get-user-id-role-doctor/${userId}`,
        );

        if (response.data.success) {
          const { user, doctor } = response.data.data;

          setUserName(`${user.first_name} ${user.last_name}`.trim());

          setSpeciality(doctor.specialty);

          // Update localStorage as well (optional)
          // localStorage.setItem("user_doctor_name", doctor?.name || "Doctor");
        }
      } catch (error) {
        console.error("Failed to fetch doctor details:", error);

        // Fallback to stored name
        const storedName = localStorage.getItem("user_doctor_name");

        if (storedName) {
          setUserName(storedName);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, []);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full bg-background">
        {/* Sidebar */}
        <AppSidebar
          logoSrc="/logo-header.png"
          menuItems={doctorSidebarItems}
          user={{
            name: userName,
            role: speciality,
            avatar: "https://i.pravatar.cc/100?img=12",
          }}
        />
        {/* Main Area */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Header */}
          <header className="flex h-16 items-center justify-between border-b px-6">
            {/* Left */}
            <div className="flex items-center gap-3">
              <SidebarTrigger />

              <div className=" hidden sm:flex flex-col leading-tight ">
                <h1 className="lg:text-2xl md:text-xl sm:text-md  font-bold tracking-tight ">
                  Welcome back,{" "}
                  <span className="bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent uppercase">
                    {userName}
                  </span>
                </h1>
              </div>
            </div>

            {/* Right */}
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
