import axios from "axios";

export interface RegisterPayload {
  role: "doctor" | "hospital";

  fullName: string;
  email: string;
  password: string;
  contact: string;
  address?: string;

  // Doctor
  gender?: string;
  age?: number;
  speciality?: string;
  registrationNo?: string;
  experience?: number;
  hospitals?: string[];

  // Hospital
  establishYear?: number;
  type?: string;
  city?: string;
  pincode?: string;
  centers?: {
    name: string;
  }[];
}

export const registerDoctorHospital = async (
  payload: RegisterPayload
) => {
  const response = await axios.post(
    "https://api.swasthyapro.com/api/auth/register-doctor-hospital",
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  return response.data;
};