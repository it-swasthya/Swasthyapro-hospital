"use client";

import React, { useEffect, useState } from "react";
import { api } from "@/app/lib/refresh-api";
import { mapHospitalAppointmentsToUI } from "@/app/utils/mapHospitalAppointments";
import HospitalAppointmentTable from "./[name]/HospitalAppointmentTable";
import type { Appointment } from "@/app/data/appointment";

export default function HospitalAppointmentsClient() {
  const [hospitalName, setHospitalName] = useState("");
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const storedHospitalName =
      localStorage.getItem("user_hospital_name") || "";

    setHospitalName(storedHospitalName);
  }, []);

  useEffect(() => {
    if (!hospitalName) return;

    const loadData = async () => {
      try {
        const res = await api.get(
          `/appointment/consult/list-appointment/hospital/${hospitalName.toUpperCase()}`
        );

        const apiArray = Array.isArray(
          res?.data?.data
        )
          ? res.data.data
          : [];

        console.log(
          apiArray,
          "api array data"
        );

        const mapped =
          mapHospitalAppointmentsToUI(
            apiArray
          );

        setAppointments(mapped);
      } catch (error) {
        console.error(
          "Failed to load appointments",
          error
        );
      }
    };

    loadData();
  }, [hospitalName]);

  return (
    <div className="p-6">
      <h1 className="mb-4 text-2xl font-semibold">
        {hospitalName} Appointments
      </h1>

      <HospitalAppointmentTable
        data={appointments}
      />
    </div>
  );
}