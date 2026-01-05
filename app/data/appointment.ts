// import { Appointment } from "@/types/appointment"

export type AppointmentStatus =
  | "Pending"
  | "Completed"
  | "Cancelled"
  | "Rescheduled"

export type Appointment = {
  id: string
  patientName: string
  symptoms: string
  speciality: string
  date: string
  timeSlot: string
  status: AppointmentStatus
  assignedDoctor?: string
  mode:string
  createdAt:string
}


export const appointmentData: Appointment[] = [
  {
    id: "APT001",
    patientName: "Amit Sharma",
    symptoms: "Fever, sore throat",
    speciality: "General Medicine",
    date: "2026-01-14",
    timeSlot: "10:00 AM - 10:15 AM",
    mode: "Video Consult",
    status: "Pending",
    createdAt: "2026-01-13",
  },
  {
    id: "APT002",
    patientName: "Neha Verma",
    symptoms: "Chest pain, shortness of breath",
    speciality: "Cardiology",
    date: "2026-01-14",
    timeSlot: "10:15 AM - 10:30 AM",
    mode: "Video Consult",
    status: "Completed",
    createdAt: "2026-01-13",
  },
  {
    id: "APT003",
    patientName: "Rahul Mehta",
    symptoms: "Back pain, joint stiffness",
    speciality: "Orthopedics",
    date: "2026-01-14",
    timeSlot: "10:30 AM - 10:45 AM",
    mode: "Video Consult",
    status: "Completed",
    createdAt: "2026-01-12",
  },
  {
    id: "APT004",
    patientName: "Sneha Iyer",
    symptoms: "Headache, dizziness",
    speciality: "Neurology",
    date: "2026-01-15",
    timeSlot: "11:00 AM - 11:15 AM",
    mode: "Video Consult",
    status: "Pending",
    createdAt: "2026-01-14",
  },
  {
    id: "APT005",
    patientName: "Rohit Patel",
    symptoms: "Skin rashes, itching",
    speciality: "Dermatology",
    date: "2026-01-15",
    timeSlot: "11:15 AM - 11:30 AM",
    mode: "Video Consult",
    status: "Completed",
    createdAt: "2026-01-14",
  },

  /* ---------- more realistic data ---------- */

  {
    id: "APT006",
    patientName: "Pooja Malhotra",
    symptoms: "Irregular periods",
    speciality: "Gynecology",
    date: "2026-01-15",
    timeSlot: "11:30 AM - 11:45 AM",
    mode: "Video Consult",
    status: "Pending",
    createdAt: "2026-01-14",
  },
  {
    id: "APT007",
    patientName: "Suresh Reddy",
    symptoms: "High blood sugar levels",
    speciality: "Diabetology",
    date: "2026-01-16",
    timeSlot: "12:00 PM - 12:15 PM",
    mode: "Video Consult",
    status: "Completed",
    createdAt: "2026-01-15",
  },
  {
    id: "APT008",
    patientName: "Kiran Kulkarni",
    symptoms: "Persistent cough",
    speciality: "Pulmonology",
    date: "2026-01-16",
    timeSlot: "12:15 PM - 12:30 PM",
    mode: "Video Consult",
    status: "Pending",
    createdAt: "2026-01-15",
  },
  {
    id: "APT009",
    patientName: "Ananya Singh",
    symptoms: "Anxiety, sleep issues",
    speciality: "Psychiatry",
    date: "2026-01-16",
    timeSlot: "12:30 PM - 12:45 PM",
    mode: "Video Consult",
    status: "Completed",
    createdAt: "2026-01-15",
  },
  {
    id: "APT010",
    patientName: "Vikas Gupta",
    symptoms: "Abdominal pain",
    speciality: "Gastroenterology",
    date: "2026-01-17",
    timeSlot: "01:00 PM - 01:15 PM",
    mode: "Video Consult",
    status: "Cancelled",
    createdAt: "2026-01-16",
  },

  /* ---- you can extend similarly up to 30+ ---- */
]
