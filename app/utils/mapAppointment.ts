import { Appointment } from "../data/appointment"

export const mapApiAppointmentToUI = (
  apiData: any[]
): Appointment[] => {
  return apiData.map((item) => ({
    id: item.appointment_id,
    patientName: `${item.User?.first_name ?? ""} ${item.User?.last_name ?? ""}`.trim(),
    contact: item.User?.contact ?? "—",
    symptoms: item.symptoms ?? "—",
    speciality: item.speciality,
    date: item.appointment_date,
    timeSlot: item.time_slot,
    status: item.status,
    assignedDoctor: item.doctor_allotted,
    mode: "Video Consult",
    diagnosis: item.diagnosis,
    doctor_advice: item.doctor_advice,
    prescription_link: item.prescription_link,
    createdAt: item.createdAt,
  

  }))
}
