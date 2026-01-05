export type VideoConsult = {
  id: string

  patientName: string
  symptoms: string

  speciality: string

  date: string
  timeSlot: string

  consultationType: "Video Consult"

  status: "Pending" | "Accepted" | "Completed" | "Cancelled"

  requestedAt: string
}


export const videoConsultData: VideoConsult[] = [
  {
    id: "VC001",
    patientName: "Amit Sharma",
    symptoms: "Fever, sore throat",
    speciality: "General Medicine",
    date: "2026-01-18",
    timeSlot: "10:00 AM - 10:15 AM",
    consultationType: "Video Consult",
    status: "Pending",
    requestedAt: "2026-01-17 09:12",
  },
  {
    id: "VC002",
    patientName: "Neha Verma",
    symptoms: "Chest pain, breathlessness",
    speciality: "Cardiology",
    date: "2026-01-18",
    timeSlot: "10:15 AM - 10:30 AM",
    consultationType: "Video Consult",
    status: "Accepted",
    requestedAt: "2026-01-17 09:20",
  },
  {
    id: "VC003",
    patientName: "Rahul Mehta",
    symptoms: "Lower back pain",
    speciality: "Orthopedics",
    date: "2026-01-18",
    timeSlot: "10:30 AM - 10:45 AM",
    consultationType: "Video Consult",
    status: "Completed",
    requestedAt: "2026-01-16 18:05",
  },
  {
    id: "VC004",
    patientName: "Sneha Iyer",
    symptoms: "Migraine, dizziness",
    speciality: "Neurology",
    date: "2026-01-18",
    timeSlot: "11:00 AM - 11:15 AM",
    consultationType: "Video Consult",
    status: "Pending",
    requestedAt: "2026-01-17 10:01",
  },
  {
    id: "VC005",
    patientName: "Rohit Patel",
    symptoms: "Skin rashes",
    speciality: "Dermatology",
    date: "2026-01-18",
    timeSlot: "11:15 AM - 11:30 AM",
    consultationType: "Video Consult",
    status: "Accepted",
    requestedAt: "2026-01-17 10:22",
  },

  /* ---------- more realistic consults ---------- */

  {
    id: "VC006",
    patientName: "Pooja Malhotra",
    symptoms: "Irregular menstrual cycle",
    speciality: "Gynecology",
    date: "2026-01-19",
    timeSlot: "11:30 AM - 11:45 AM",
    consultationType: "Video Consult",
    status: "Pending",
    requestedAt: "2026-01-18 08:45",
  },
  {
    id: "VC007",
    patientName: "Suresh Reddy",
    symptoms: "High blood sugar",
    speciality: "Diabetology",
    date: "2026-01-19",
    timeSlot: "12:00 PM - 12:15 PM",
    consultationType: "Video Consult",
    status: "Completed",
    requestedAt: "2026-01-17 19:10",
  },
  {
    id: "VC008",
    patientName: "Kiran Kulkarni",
    symptoms: "Chronic cough",
    speciality: "Pulmonology",
    date: "2026-01-19",
    timeSlot: "12:15 PM - 12:30 PM",
    consultationType: "Video Consult",
    status: "Pending",
    requestedAt: "2026-01-18 09:30",
  },
  {
    id: "VC009",
    patientName: "Ananya Singh",
    symptoms: "Anxiety, insomnia",
    speciality: "Psychiatry",
    date: "2026-01-19",
    timeSlot: "12:30 PM - 12:45 PM",
    consultationType: "Video Consult",
    status: "Accepted",
    requestedAt: "2026-01-18 11:02",
  },
  {
    id: "VC010",
    patientName: "Vikas Gupta",
    symptoms: "Abdominal cramps",
    speciality: "Gastroenterology",
    date: "2026-01-20",
    timeSlot: "01:00 PM - 01:15 PM",
    consultationType: "Video Consult",
    status: "Cancelled",
    requestedAt: "2026-01-18 14:15",
  },

  /* ---- extendable up to 30+ ---- */
]
