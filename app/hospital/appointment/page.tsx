// import AppointmentTable from "@/components/hospital/appointment-table"

import AppointmentTable from "@/components/hospital/hopital-appointment-table";

export default function HospitalDashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">
        Hospital Dashboard
      </h1>

      <AppointmentTable />
    </div>
  )
}
