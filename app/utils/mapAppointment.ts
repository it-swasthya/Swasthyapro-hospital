import { Appointment } from "../data/appointment"

// export const mapApiAppointmentToUI = (
//   apiData: any[]
// ): Appointment[] => {
//   return apiData.map((item) => ({
//     id: item.appointment_id,
//     patientName: `${item.User?.first_name ?? ""} ${item.User?.last_name ?? ""}`.trim(),
//     Email: item.User?.email,
//     contact: item.User?.contact ?? "—",
//     symptoms: item.symptoms ?? "—",
//     speciality: item.speciality,
//     date: item.appointment_date,
//     timeSlot: item.time_slot,
//     hospital: item.hospital,
//     status: item.status,
//     assignedDoctor: item.doctor_allotted,
//     mode: "Video Consult",
//     diagnosis: item.diagnosis,
//     doctor_advice: item.doctor_advice,
//     prescription_link: item.prescription_link,
//     doctorName: item.doctor_allotted,
//     createdAt: item.createdAt,
  

//   }))
// }


 //export const mapApiAppointmentToUI = (
//   apiData: any[]
// ): Appointment[] => {
//   if (!Array.isArray(apiData)) {
//     console.error("Expected array, got:", apiData);
//     return [];
//   }

//   return apiData.map((item) => ({
//     id: item.appointment_id,
//     patientName: `${item.User?.first_name ?? ""} ${item.User?.last_name ?? ""}`.trim(),
//     Email: item.User?.email,
//     contact: item.User?.contact ?? "—",
//     symptoms: item.symptoms ?? "—",
//     speciality: item.speciality,
//     date: item.appointment_date,
//     timeSlot: item.time_slot,
//     hospital: item.hospital,
//     status: item.status,
//     assignedDoctor: item.doctor_allotted,
//     mode: "Video Consult",
//     diagnosis: item.diagnosis,
//     doctor_advice: item.doctor_advice,
//     prescription_link: item.prescription_link,
//     meet_link: item.meet_link ?? null,
//     doctorName: item.doctor_allotted,
//     createdAt: item.createdAt,
//   }));
// };



export const mapApiAppointmentToUI = (
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
    doctorName: item.doctor_allotted,

    doctor_advice: item.doctor_advice,

    prescription_link: item.prescription_link,

    meet_link: item.meet_link ?? null,   // ADD THIS LINE

    mode: "Video Consult",

    createdAt: item.createdAt,
  }));
};