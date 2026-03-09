// // "use client";

// // import React, { useEffect, useState } from "react";
// // import { api } from "@/app/lib/refresh-api";
// // import { mapHospitalAppointmentsToUI } from "@/app/utils/mapHospitalAppointments";
// // import HospitalAppointmentTable from "./HospitalAppointmentTable";

// // const HospitalAppointmentsPage = () => {
// //   const hospitalName = "SWASTHYAPRO";
// //   const [appointments, setAppointments] = useState([]);

// //   useEffect(() => {
// //     const loadData = async () => {
// //       try {
// //         const res = await api.get(
// //           `/appointment/consult/list-appointment/hospital/${hospitalName}`,
// //         );

// //         const apiArray = Array.isArray(res?.data?.data) ? res.data.data : [];

// //         const mapped = mapHospitalAppointmentsToUI(apiArray);

// //         console.log(mapped, "mapped data hosptial ");
// //         setAppointments(mapped);
// //       } catch (error) {
// //         console.error("Failed to load appointments", error);
// //       }
// //     };

// //     loadData();
// //   }, [hospitalName]);

// //   console.log(appointments, "appointments ");

// //   return (
// //     <div className="p-6">
// //       <h1 className="text-2xl font-semibold mb-4">
// //         {hospitalName.toUpperCase()} Appointments
// //       </h1>

// //       <HospitalAppointmentTable data={appointments} />
// //     </div>
// //   );
// // };

// // export default HospitalAppointmentsPage;



// "use client";

// import React, { useEffect, useState } from "react";
// import { api } from "@/app/lib/refresh-api";
// import { mapHospitalAppointmentsToUI } from "@/app/utils/mapHospitalAppointments";
// import HospitalAppointmentTable from "./HospitalAppointmentTable";
// import type { Appointment } from "@/app/data/appointment";

// const HospitalAppointmentsPage = () => {
//   const hospitalName = "SWASTHYAPRO";

//   const [appointments, setAppointments] = useState<Appointment[]>([]);

//   useEffect(() => {
//     const loadData = async () => {
//       try {
//         const res = await api.get(
//           `/appointment/consult/list-appointment/hospital/${hospitalName}`
//         );

//         const apiArray = Array.isArray(res?.data?.data) ? res.data.data : [];

//         const mapped = mapHospitalAppointmentsToUI(apiArray);

//         console.log(mapped, "mapped data hospital");

//         setAppointments(mapped);
//       } catch (error) {
//         console.error("Failed to load appointments", error);
//       }
//     };

//     loadData();
//   }, [hospitalName]);

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-semibold mb-4">
//         {hospitalName.toUpperCase()} Appointments
//       </h1>

//       <HospitalAppointmentTable data={appointments} />
//     </div>
//   );
// };

// export default HospitalAppointmentsPage;



import HospitalAppointmentsClient from "../HospitalAppointmentsClient";

export async function generateStaticParams() {
  return [
    { name: "mashh" },
  ];
}

export default async function Page({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;

  return <HospitalAppointmentsClient hospitalName={name} />;
}