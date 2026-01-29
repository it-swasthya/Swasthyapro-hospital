import { api } from "./api";


export const loginDoctor = async (data: {
  email: string;
  password: string;
}) => {
  const res = await api.post("/auth/asdsaxz2424ssdds", data);



  console.log(res?.data , "login doctor data");
  return res.data;
};

export const loginHospital = async (data: {
  email: string;
  password: string;
  secretKey: string;
}) => {
  const res = await api.post("/auth/asdsaxz2424ssdds", data);
  return res.data;
};

export const logoutUser = async (token: string) => {
  await api.post(
    "/auth/logout-cookie",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
