export interface DoctorCard {
  id: string;
  name: string;
  designation: string;
  rating: number;
  availability: string;
  workingHours: string;
  isActive: boolean;
  avatar: string;
}

export const doctorsCardData = [
  {
    id: "DR001",
    name: "Dr. Rahul Sharma",
    designation: "General Physician",
    rating: 4.6,
    availability: "Available",
    workingHours: "09:00 AM - 05:00 PM",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=12",
  },
  {
    id: "DR002",
    name: "Dr. Neha Verma",
    designation: "Cardiologist",
    rating: 4.8,
    availability: "Busy",
    workingHours: "10:00 AM - 06:00 PM",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=47",
  },
  {
    id: "DR003",
    name: "Dr. Amrita Patel",
    designation: "Orthopedic Surgeon",
    rating: 4.4,
    availability: "Available",
    workingHours: "08:00 AM - 04:00 PM",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=32",
  },
  {
    id: "DR004",
    name: "Dr. Saurabh Iyer",
    designation: "Neurologist",
    rating: 4.9,
    availability: "On Leave",
    workingHours: "09:00 AM - 03:00 PM",
    isActive: false,
    avatar: "https://i.pravatar.cc/150?img=56",
  },
  {
    id: "DR005",
    name: "Dr. Pooja Mehta",
    designation: "Dermatologist",
    rating: 4.3,
    availability: "Available",
    workingHours: "11:00 AM - 07:00 PM",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=23",
  },
  {
    id: "DR006",
    name: "Dr. Karan Malhotra",
    designation: "Pediatrician",
    rating: 4.7,
    availability: "Busy",
    workingHours: "09:30 AM - 05:30 PM",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=18",
  },
  {
    id: "DR007",
    name: "Dr. Anjali Singh",
    designation: "Gynecologist",
    rating: 4.5,
    availability: "Available",
    workingHours: "08:00 AM - 02:00 PM",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=44",
  },
  {
    id: "DR008",
    name: "Dr. Rakesh Gupta",
    designation: "Gastroenterologist",
    rating: 4.2,
    availability: "Offline",
    workingHours: "10:00 AM - 04:00 PM",
    isActive: false,
    avatar: "https://i.pravatar.cc/150?img=59",
  },
  {
    id: "DR009",
    name: "Dr. Nikita Kulkarni",
    designation: "Pulmonologist",
    rating: 4.6,
    availability: "Available",
    workingHours: "09:00 AM - 06:00 PM",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=36",
  },
  {
    id: "DR010",
    name: "Dr. Karan Rao",
    designation: "Psychiatrist",
    rating: 4.9,
    availability: "Available",
    workingHours: "10:00 AM - 05:00 PM",
    isActive: true,
    avatar: "https://i.pravatar.cc/150?img=52",
  },
];
