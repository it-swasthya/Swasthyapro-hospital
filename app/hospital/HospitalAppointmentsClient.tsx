"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/app/lib/refresh-api";
import { mapHospitalAppointmentsToUI } from "@/app/utils/mapHospitalAppointments";
import HospitalAppointmentTable from "./[name]/HospitalAppointmentTable";
import type { Appointment } from "@/app/data/appointment";

export default function HospitalAppointmentsClient({
  hospitalName,
}: {
  hospitalName: string;
}) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  console.log(appointments,"appointments dta cgd");

 useEffect(() => {
  if (!hospitalName) return;

  const loadData = async () => {
    try {
      const res = await api.get(
        `/appointment/consult/list-appointment/hospital/${hospitalName.toUpperCase()}`
      );

      const apiArray = Array.isArray(res?.data?.data) ? res.data.data : [];

      console.log(apiArray, "api array data ");

      const mapped = mapHospitalAppointmentsToUI(apiArray);

      setAppointments(mapped);
    } catch (error) {
      console.error("Failed to load appointments", error);
    }
  };

  loadData();
}, [hospitalName]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        {hospitalName} Appointments
      </h1>

      <HospitalAppointmentTable data={appointments} />
    </div>
  );
}