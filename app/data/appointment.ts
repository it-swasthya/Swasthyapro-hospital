 //import { Appointment } from "@/types/appointment"
 import { ReactNode } from "react"
export type AppointmentStatus =
  | "Allotted"
  | "Scheduled"
  | "Completed"
  | "Cancelled"

export type Appointment = {
  hospital: ReactNode
  doctor_advice: string
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
  IsAssignedDoctor?:string
  doctorName?: string
  Email?:string
  mode: string
  diagnosis?: string 
  advice?: string 
  prescription_link:string
  meet_link:string
  createdAt: string
}










