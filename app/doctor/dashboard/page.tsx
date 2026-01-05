import { DoctorStatsCards } from "@/components/common/stats-cards"
import { AppointmentsChart } from "@/components/doctor/appointment-chart"
import { DepartmentChart } from "@/components/doctor/department-chart"
import { UpcomingAppointments } from "@/components/doctor/upcoming-appointments"
import { PatientsLastProcedure } from "@/components/doctor/patients-last-procedure"

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Doctor Dashboard
      </h1>

      <DoctorStatsCards />

      <div className="grid gap-6 lg:grid-cols-2">
        <AppointmentsChart />
        <DepartmentChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <UpcomingAppointments />
        <PatientsLastProcedure />
      </div>
    </div>
  )
}
