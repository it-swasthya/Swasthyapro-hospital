"use client"

import { doctorsCardData } from "@/app/data/doctor-card"
import { DoctorCard } from "@/components/doctor/doctor-card"
// import { DoctorCard } from "@/app/d"

export default function DoctorsGrid() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {doctorsCardData.map((doctor) => (
        <DoctorCard
          key={doctor.id}
          doctor={doctor}
        />
      ))}
    </div>
  )
}
