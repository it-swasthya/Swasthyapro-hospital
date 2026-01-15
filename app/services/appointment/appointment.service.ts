import axios from "axios"


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



export const updateAppointmentStatus = async (
  appointmentId: string,
  action: "accept" | "reject"
) => {
  const apiAction = action === "accept" ? "schedule" : "cancel";

  const res = await axios.put(
    `https://api.swasthyapro.com/api/appointment/consult/user/update-status-appointment/${appointmentId}`,
    { action: apiAction },
    {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }
  );

  return res.data;
};




export const assignDoctor = async (
  appointmentId: string,
  doctorName: string
) => {
  const res = await axios.put(
    `${"https://api.swasthyapro.com/api/appointment/consult/hospital/assign-doctor"}/${appointmentId}`,
    {
      doctor_name: doctorName,
    },
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    }
  )

  return res.data
}




const BASE =
  "https://api.swasthyapro.com/api/appointment/consult/doctor/consultation/report"

export const submitConsultationReport = async (payload: {
  appointmentId: string
  diagnosis: string
  advice: string
  file: File
}) => {
  const formData = new FormData()

  // DO NOT send appointment_id in body anymore
  formData.append("diagnosis", payload.diagnosis)
  formData.append("advice", payload.advice)
  formData.append("file", payload.file)

  const res = await axios.post(
    `${BASE}/${payload.appointmentId}`, 
    formData,
    {
      withCredentials: true, 
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  )

  return res.data
}