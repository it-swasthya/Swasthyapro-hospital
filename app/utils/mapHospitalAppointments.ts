// import type { Appointment, AppointmentStatus } from "@/app/data/appointment"

// export const mapHospitalAppointmentsToUI = (
//   apiData: any[]
// ): Appointment[] => {
//   return apiData.map((item) => ({
//     id: item.appointment_id,
//     patientName: `${item.User?.first_name ?? ""} ${item.User?.last_name ?? ""}`.trim(),
//     contact: item.User?.contact ?? "—",
//     symptoms: item.symptoms ?? "—",
//     speciality: item.speciality ?? "—",
//     date: item.appointment_date,
//     timeSlot: item.time_slot,
//     status: item.status as AppointmentStatus,
//     assignedDoctor: item.doctor_allotted,
//     mode: "Hospital Visit",
//     createdAt: item.createdAt,
//   }))
// }



import type { Appointment, AppointmentStatus } from "@/app/data/appointment"

export const mapHospitalAppointmentsToUI = (
  apiData: any[]
): Appointment[] => {
  return apiData.map((item) => ({
    id: item.appointment_id,

    hospital: item.hospital ?? "SWASTHYAPRO",

    patientName: `${item.User?.first_name ?? ""} ${item.User?.last_name ?? ""}`.trim(),

    contact: item.User?.contact ?? "—",

    symptoms: item.symptoms ?? "—",

    speciality: item.speciality,

    date: item.appointment_date,

    timeSlot: item.time_slot,

    status: item.status,
    

    assignedDoctor: item.doctor_allotted,

    doctor_advice: item.doctor_advice,

    prescription_link: item.prescription_link,

    meet_link: item.meet_link ?? null,   // ✅ ADD THIS LINE

    mode: "Video Consult",

    createdAt: item.createdAt,
  }));
};