import api from "./interceptors-api";
import axios from "axios";



export const getAllAppointmentDoctorLists =  () => {
    return api.get(`/appointment/consult/all-appointment`);
}

export const getActiveUserAppointment = () => {
    return api.get("/appointment/consult/doctor/all/appointment");
    
           
}

export const getDoctorAllhospitalAppointedData  = () => {
    return api.get(`/appointment/consult/doctor/allotted/appointment?hospital_name=SWASTHYAPRO`,
            );
}


export const getDoctorAllAppointedData  = () => {
    return api.get(`/appointment/consult/doctor/allotted/appointment?hospital_name=`,
            );
}


export const sendSupportMail = async (payload: {
  firstName: string
  lastName: string
  email: string
  phone: string
  message: string
}) => {
  try {
    console.log("Calling Support API...")

    const response = await axios.post(
      "https://api.swasthyapro.com/api/mail/send-mail-for-support-to-swasthyapro",
      payload
    )

    console.log("API Response:", response.data)

    return response.data

  } catch (error: any) {
    console.error("Axios Error:", error)

    if (error.response) {
      // Backend responded with error
      throw new Error(
        error.response.data?.message || "Server Error"
      )
    }

    if (error.request) {
      // No response received
      throw new Error("No response from server")
    }

    throw new Error("Something went wrong")
  }
}



