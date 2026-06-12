"use client"

import { usePathname } from "next/navigation"
import { Card } from "@/components/ui/card"
import { CommonIcons } from "@/components/common/common-icons"

import { stats as doctorStats } from "@/app/data/doctor-stat"
import { hospitalStats } from "@/app/data/hospital-stat"

export function DoctorStatsCards() {
  const pathname = usePathname()

  const isDoctorDashboard = pathname.startsWith("/doctor")
  const activeStats = isDoctorDashboard ? doctorStats : hospitalStats

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {activeStats.map((item) => {
        const Icon = CommonIcons[item.icon]

        return (
          <Card
            key={item.title}
            className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary/30"
          >
            {/* Decorative gradient blob */}
            <div
              className={`absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-2xl transition-opacity group-hover:opacity-20 ${item.iconBg}`}
            />

            <div className="relative flex items-center justify-between">
              {/* Left */}
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </p>

                <p className="text-3xl font-bold tracking-tight">
                  {item.value}
                </p>

                <div className="flex items-center gap-1">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold ${item.changeColor} bg-current/10`}
                  >
                    {item.change}
                  </span>
                </div>
              </div>

              {/* Right Icon */}
              <div
                className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl shadow-sm ring-1 ring-inset ring-black/5 transition-transform duration-300 group-hover:scale-110 ${item.iconBg}`}
              >
                {Icon && <Icon className="h-6 w-6" />}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}