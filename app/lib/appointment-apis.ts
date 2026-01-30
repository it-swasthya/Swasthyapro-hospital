import api from "./interceptors-api";



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



