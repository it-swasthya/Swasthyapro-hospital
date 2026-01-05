import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SearchForm } from "@/components/ui/search-form"
import { hospitalSidebarItems } from "../config/hospital-sidebar"

export default function DoctorLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <div className="flex min-h-screen w-full bg-background">
                {/* Sidebar */}
                <AppSidebar
                    logoSrc="/logo-header.png"
                    menuItems={hospitalSidebarItems}
                    user={{
                        name: "MASHH HOSPITAL",
                        role: "Hospital",
                        avatar: "https://i.pravatar.cc/100?img=10",
                    }}
                />

                {/* Main area */}
                <div className="flex min-w-0 flex-1 flex-col">
                    {/* Header */}
                    <header className="flex h-14 items-center justify-between border-b px-6">
                        {/* LEFT SIDE */}
                        <div className="flex items-center gap-3">
                            <SidebarTrigger />

                            <div className="flex flex-col leading-tight">

                                <h1 className="text-2xl font-semibold">
                                    Welcome <span className="bg-blue-100 p-4 rounded-t-3xl">MASHH Hospital</span>
                                </h1>
                            </div>
                        </div>

                        {/* RIGHT SIDE */}
                        <div className="w-70">
                            <SearchForm />
                        </div>
                    </header>


                    {/* Page content */}
                    <main className="flex-1 w-full p-6">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    )
}
