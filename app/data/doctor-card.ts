export type DoctorCard = {
  id: string
  name: string
  speciality: string
  rating: number       
  completedAppointments: number
  pendingAppointments: number
  avatar?: string
}

export const doctorsCardData: DoctorCard[] = [
  {
    id: "DR001",
    name: "Dr. Rahul Sharma",
    speciality: "General Physician",
    rating: 4.6,
    completedAppointments: 128,
    pendingAppointments: 4,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "DR002",
    name: "Dr. Neha Verma",
    speciality: "Cardiology",
    rating: 4.8,
    completedAppointments: 210,
    pendingAppointments: 9,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "DR003",
    name: "Dr. Amit Patel",
    speciality: "Orthopedics",
    rating: 4.4,
    completedAppointments: 176,
    pendingAppointments: 2,
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "DR004",
    name: "Dr. Sneha Iyer",
    speciality: "Neurology",
    rating: 4.9,
    completedAppointments: 98,
    pendingAppointments: 0,
    avatar: "https://i.pravatar.cc/150?img=56",
  },
  {
    id: "DR005",
    name: "Dr. Pooja Mehta",
    speciality: "Dermatology",
    rating: 4.3,
    completedAppointments: 142,
    pendingAppointments: 3,
    avatar: "https://i.pravatar.cc/150?img=23",
  },
  {
    id: "DR006",
    name: "Dr. Karan Malhotra",
    speciality: "Pediatrics",
    rating: 4.7,
    completedAppointments: 189,
    pendingAppointments: 6,
    avatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: "DR007",
    name: "Dr. Anjali Singh",
    speciality: "Gynecology",
    rating: 4.5,
    completedAppointments: 164,
    pendingAppointments: 5,
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    id: "DR008",
    name: "Dr. Rakesh Gupta",
    speciality: "Gastroenterology",
    rating: 4.2,
    completedAppointments: 121,
    pendingAppointments: 7,
    avatar: "https://i.pravatar.cc/150?img=59",
  },
  {
    id: "DR009",
    name: "Dr. Nitin Kulkarni",
    speciality: "Pulmonology",
    rating: 4.6,
    completedAppointments: 155,
    pendingAppointments: 4,
    avatar: "https://i.pravatar.cc/150?img=36",
  },
  {
    id: "DR010",
    name: "Dr. Kavita Rao",
    speciality: "Psychiatry",
    rating: 4.9,
    completedAppointments: 134,
    pendingAppointments: 1,
    avatar: "https://i.pravatar.cc/150?img=52",
  },
]
