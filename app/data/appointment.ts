// import { Appointment } from "@/types/appointment"
export type AppointmentStatus =
  | "Allotted"
  | "Scheduled"
  | "Completed"
  | "Cancelled"

export type Appointment = {
  // appointment_id(arg0: string, appointment_id: any): unknown
  id: string
  patientName: string
  contact: string
  symptoms: string
  speciality: string
  date: string
  timeSlot: string
  status: AppointmentStatus
  assignedDoctor?: string
  mode: string
  diagnosis?: string 
  advice?: string 
  prescription_link:string
  createdAt: string
}







