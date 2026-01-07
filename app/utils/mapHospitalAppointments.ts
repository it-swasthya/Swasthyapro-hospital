import type { Appointment, AppointmentStatus } from "@/app/data/appointment"

export const mapHospitalAppointmentsToUI = (
  apiData: any[]
): Appointment[] => {
  return apiData.map((item) => ({
    id: item.appointment_id,
    patientName: `${item.User?.first_name ?? ""} ${item.User?.last_name ?? ""}`.trim(),
    contact: item.User?.contact ?? "—",
    symptoms: item.symptoms ?? "—",
    speciality: item.speciality ?? "—",
    date: item.appointment_date,
    timeSlot: item.time_slot,
    status: item.status as AppointmentStatus,
    assignedDoctor: item.doctor_allotted,
    mode: "Hospital Visit",
    createdAt: item.createdAt,
  }))
}
