export type DoctorAppointmentSummary = {
  id: string
  name: string
  speciality: string
  pending: number
  completed: number
  status: "completed" | "pending" | "rescheduled" | "cancelled",
}

export const doctorAppointmentData: DoctorAppointmentSummary[] = [
  {
    id: "DR001",
    name: "Dr. Rahul Sharma",
    speciality: "General Physician",
    pending: 4,
    completed: 28,
    status: "completed",
  },
  {
    id: "DR002",
    name: "Dr. Neha Verma",
    speciality: "Cardiology",
    pending: 7,
    completed: 41,
    status: "pending",
  },
  {
    id: "DR003",
    name: "Dr. Amit Patel",
    speciality: "Orthopedics",
    pending: 2,
    completed: 19,
    status: "rescheduled",
  },
  {
    id: "DR004",
    name: "Dr. Sneha Iyer",
    speciality: "Neurology",
    pending: 0,
    completed: 34,
    status: "cancelled",
  },
  {
    id: "DR005",
    name: "Dr. Amit Patel",
    speciality: "Orthopedics",
    pending: 2,
    completed: 19,
    status: "rescheduled",
  },
  {
    id: "DR006",
    name: "Dr. Sneha Iyer",
    speciality: "Neurology",
    pending: 0,
    completed: 34,
    status: "completed",
  },
]
