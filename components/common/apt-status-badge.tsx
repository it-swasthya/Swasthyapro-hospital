"use client"

import { Badge } from "@/components/ui/badge"
import type { AppointmentStatus } from "@/app/data/appointment"

export function AppointmentStatusBadge({
  status,
}: {
  status: AppointmentStatus
}) {
  const styles: Record<AppointmentStatus, string> = {
    Completed: "bg-green-100 text-green-700 border-green-200",
    Allotted: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Cancelled: "bg-red-100 text-red-700 border-red-200",
    Scheduled: "bg-blue-100 text-blue-700 border-blue-200",
  }

  return (
    <Badge
      variant="outline"
      className={`capitalize ${styles[status]}`}
    >
      {status}
    </Badge>
  )
}
