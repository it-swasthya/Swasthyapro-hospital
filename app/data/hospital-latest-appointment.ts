export type HospitalAppointmentStatus =
  | "pending"
  | "rescheduled"
  | "cancelled"
  | "completed"

export type HospitalAppointment = {
  id: string
  patientName: string
  speciality: string
  date: string
  timeSlot: string
  status: HospitalAppointmentStatus
  assignedDoctor?: string
}

export const hospitalAppointments: HospitalAppointment[] = [
  {
    id: "APT001",
    patientName: "Amit Sharma",
    speciality: "Cardiology",
    date: "2026-01-15",
    timeSlot: "10:00 AM - 10:15 AM",
    status: "pending",
  },
  {
    id: "APT002",
    patientName: "Neha Verma",
    speciality: "Neurology",
    date: "2026-01-15",
    timeSlot: "10:30 AM - 10:45 AM",
    status: "rescheduled",
  },
  {
    id: "APT003",
    patientName: "Rahul Mehta",
    speciality: "Orthopedics",
    date: "2026-01-14",
    timeSlot: "11:00 AM - 11:15 AM",
    status: "completed",
    assignedDoctor: "Dr. Amit Patel",
  },
]
