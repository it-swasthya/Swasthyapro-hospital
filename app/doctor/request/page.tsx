// import { AppointmentTable } from "@/components/doctor/appointment-table"

import AppointmentTable from "@/components/doctor/appointment-table";
import VideoAppointmentTable from "@/components/doctor/video-consult-table";


export default function DoctorDashboardPage() {
  return (
    <div className="space-y-6">
      {/* stats + charts above */}

      <div>
        <h2 className="text-lg font-semibold mb-2">
          Video Consult Request
        </h2>
        <VideoAppointmentTable />
      </div>
    </div>
  )
}
