"use client"

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts"
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card"

const data = [
  { month: "Jan", appointments: 32 },
  { month: "Feb", appointments: 45 },
  { month: "Mar", appointments: 28 },
  { month: "Apr", appointments: 60 },
  { month: "May", appointments: 52 },
  { month: "Jun", appointments: 68 },
]

export function AppointmentsChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly Appointments</CardTitle>
      </CardHeader>

      <CardContent className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="month" />
            <YAxis allowDecimals={false} />

            <Tooltip
              contentStyle={{
                borderRadius: 8,
                border: "1px solid hsl(var(--border))",
              }}
            />

            <Line
              type="monotone"
              dataKey="appointments"
              stroke=" #bbff99"
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
