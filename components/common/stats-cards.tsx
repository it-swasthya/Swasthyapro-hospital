"use client"

import { usePathname } from "next/navigation"
import { Card } from "@/components/ui/card"
import { CommonIcons } from "@/components/common/common-icons"

import { stats as doctorStats } from "@/app/data/doctor-stat"
import { hospitalStats } from "@/app/data/hospital-stat"

export function DoctorStatsCards() {
  const pathname = usePathname()

  // 🔑 decide which stats to show
  const isDoctorDashboard = pathname.startsWith("/doctor")
  const activeStats = isDoctorDashboard
    ? doctorStats
    : hospitalStats

  return (
    <div className="grid w-full grid-cols-1 overflow-hidden rounded-xl border sm:grid-cols-2 lg:grid-cols-4">
      {activeStats.map((item, index) => {
        const Icon = CommonIcons[item.icon]

        return (
          <Card
            key={item.title}
            className={`rounded-none border-0 ${
              index !== activeStats.length - 1
                ? "lg:border-r"
                : ""
            }`}
          >
            <div className="flex items-center justify-between p-6">
              {/* Left */}
              <div className="space-y-1">
                <p className="text-sm text-muted-foreground">
                  {item.title}
                </p>

                <p className="text-2xl font-bold">
                  {item.value}
                </p>

                <p className={`text-xs ${item.changeColor}`}>
                  {item.change}
                </p>
              </div>

              {/* Right Icon */}
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-full ${item.iconBg}`}
              >
                {Icon && <Icon className="h-5 w-5" />}
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
