"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { CommonIcons } from "../common/common-icons";
import router from "next/router";

type SidebarItem = {
  title: string;
  url: string;
  icon: string;
};

type AppSidebarProps = {
  logoSrc: string;
  menuItems: SidebarItem[];
  user: {
    name: string;
    role: string;
    avatar?: any;
  };
  logoutPath?: string;
};

export function AppSidebar({
  logoSrc,
  menuItems,
  user,
  logoutPath = "/login",
}: AppSidebarProps) {
  const router = useRouter();
  const handleLogout = () => {
    // 1. Remove token from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user_id");
    if (user.role === "doctor") {
      localStorage.removeItem("user_doctor_name");
    } else {
      localStorage.removeItem("user_hospital_name");
    }

    // 2. Remove token cookie (middleware reads this)
    document.cookie =
      "accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // (optional) remove role if you store it
    document.cookie = "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

    // 3. Redirect to login
    router.push(logoutPath);
  };

  return (
    <Sidebar>
      <SidebarHeader className="flex items-center justify-center py-4">
        <Image src={logoSrc} alt="Logo" width={140} height={32} />
      </SidebarHeader>

      <Separator />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => {
                const Icon = CommonIcons[item.icon];

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url} className="flex items-center gap-2">
                        {Icon && <Icon className="h-4 w-4" />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        <div
          onClick={() => router.push("/doctor/profile")}
          className="flex cursor-pointer items-center gap-3 rounded-lg p-2 transition hover:bg-muted"
        >
          <Avatar>
            {user.avatar ? (
              <AvatarImage src={user.avatar} />
            ) : (
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            )}
          </Avatar>

          <div className="flex flex-col text-sm">
            <span className="font-medium">{user.name}</span>
            <span className="text-muted-foreground">{user.role}</span>
          </div>
        </div>

        <SidebarMenu className="mt-3">
          <SidebarMenuItem>
            <SidebarMenuButton onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
