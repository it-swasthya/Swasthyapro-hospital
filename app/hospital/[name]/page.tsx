import { getHospitalAppointments } from "@/app/services/appointment/getHospitalAppointments"
import { mapHospitalAppointmentsToUI } from "@/app/utils/mapHospitalAppointments"
import HospitalAppointmentTable from "./HospitalAppointmentTable"

type Props = {
  params: { name: string }
}

const HospitalAppointmentsPage = async ({ params }: Props) => {
//   const hospitalName = params.name
  const hospitalName = "mashh"


  const res = await getHospitalAppointments(hospitalName)
  const appointments = mapHospitalAppointmentsToUI(res.data)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        {hospitalName.toUpperCase()} Appointments
      </h1>

      <HospitalAppointmentTable data={appointments} />
    </div>
  )
}

export default HospitalAppointmentsPage
