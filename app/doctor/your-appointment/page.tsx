import YourAppointmentTable from "@/components/doctor/appointment/YourAppointments";




export default function YourAppointmentPage() {
  return (
    <div className="space-y-6">
      {/* stats + charts above */}

      <div>
        <h2 className="text-lg font-semibold mb-2">
          Your Appointment
        </h2>
         <YourAppointmentTable/>
      </div>
    </div>
  )
}