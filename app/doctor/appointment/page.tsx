// import { AppointmentTable } from "@/components/doctor/appointment-table"

import AppointmentTable from "@/components/doctor/appointment-table";
// import { appointmentData } from "@/app/data/appointment";
// import { Appointment } from "@/app/data/appointment";

export default function DoctorDashboardPage() {
  return (
    <div className="space-y-6">
      {/* stats + charts above */}

      <div>
        <h2 className="text-lg font-semibold mb-2">
          Appointment Scheduled by Hospital
        </h2>
        <AppointmentTable  />
      </div>
    </div>
  )
}
