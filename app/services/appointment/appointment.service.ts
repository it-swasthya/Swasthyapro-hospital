
const BASE_URL = "https://api.swasthyapro.com/api"


export const getDoctorAppointments = async (
  doctorName: string
) => {
  const res = await fetch(
    `${BASE_URL}/appointment/consult/list-appointment/${doctorName}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", 
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch appointments")
  }

  return res.json()
}

export const getAllAppointmentDoctorLists=async()=>{
     const res = await fetch(
    `${BASE_URL}/appointment/consult/all-appointment`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", 
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch appointments")
  }

  return res.json()
}