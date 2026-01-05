"use client"

import { Badge } from "@/components/ui/badge"

type Props = {
  status: "completed" | "pending" | "cancelled" | "rescheduled"
}

export function AppointmentStatusBadge({ status }: Props) {
  const styles: Record<Props["status"], string> = {
    completed: "bg-green-100 text-green-700 border-green-200",
    pending: "bg-yellow-100 text-yellow-700 border-yellow-200",
    cancelled: "bg-red-100 text-red-700 border-red-200",
    rescheduled: "bg-blue-100 text-blue-700 border-blue-200",
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
