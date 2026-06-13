"use client";

import { useState } from "react";

import { doctorsCardData } from "@/app/data/doctor-card";
import DoctorRegistrationDialog from "@/components/auth/DoctorRegistrationDialog";
import { DoctorCard } from "@/components/doctor/doctor-card";

export default function DoctorsGrid() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <DoctorRegistrationDialog
        open={open}
        onOpenChange={setOpen}
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 max-w-5xl mx-auto">
        {/* Add Doctor Card */}
        <div
          onClick={() => setOpen(true)}
          className="cursor-pointer rounded-xl border-2 border-dashed border-gray-300 hover:border-primary hover:bg-gray-50 transition-all duration-300 flex items-center justify-center min-h-[260px]"
        >
          <div className="text-center">
            <div className="text-5xl font-light text-primary">+</div>
            <p className="mt-2 text-lg font-semibold">
              Add Doctor
            </p>
          </div>
        </div>

        {doctorsCardData.map((doctor) => (
          <DoctorCard
            key={doctor.id}
            doctor={doctor}
          />
        ))}
      </div>
    </>
  );
}