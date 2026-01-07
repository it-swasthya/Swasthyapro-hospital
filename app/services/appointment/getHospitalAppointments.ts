export const getHospitalAppointments = async (hospital: string) => {
  const res = await fetch(
    `https://api.swasthyapro.com/api/appointment/consult/list-appointment/hospital/${hospital}`,
    {
      cache: "no-store", // SSR fresh data
    }
  )

  if (!res.ok) {
    throw new Error("Failed to fetch hospital appointments")
  }

  return res.json()
}
