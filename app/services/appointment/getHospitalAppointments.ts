// export const getHospitalAppointments = async (hospital: string) => {
//   const res = await fetch(
//     `https://api.swasthyapro.com/api/appointment/consult/list-appointment/hospital/${hospital}`,
//     {
//       cache: "no-store",
//     }
//   )

import  {api}  from "@/app/lib/refresh-api";

//   if (!res.ok) {
//     throw new Error("Failed to fetch hospital appointments")
//   }

//   return res.json()
// }



// export const getHospitalAppointments = async (hospital: string) => {
//   const res = await api.get(
//     `/appointment/consult/list-appointment/hospital/${hospital}`
//   );

//   return res.data;
// };
