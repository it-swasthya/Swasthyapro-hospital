// import { AppointmentTable } from "@/components/doctor/appointment-table"

import AllDoctorAppointmentTable from "@/components/doctor/AllAppointment";


export default function AllDoctorConsult() {
  return (
    <div className="space-y-6">
      {/* stats + charts above */}

      <div>
        <h2 className="text-lg font-semibold mb-2">
          Your All Appointment
        </h2>
        <AllDoctorAppointmentTable />
      </div>
    </div>
  )
}
