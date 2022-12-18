import axios from '../axios';

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`);
}

const createNewUserService = (data) => { 
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = (userId) => {
    return axios.delete('/api/delete-user',
        {
            data: { id: userId }
        });
}

const editUserService = (inputData) => {
    return axios.put('/api/edit-user', inputData);
}

const getAllCodeService = (inputType) => {
    return axios.get(`/api/all-code?type=${inputType}`);
}

const getTopDoctorHomeService = (limit) => {
    return axios.get(`/api/top-doctor-home?limit=${limit}`);
}

const getAllDoctorService = () => {
    return axios.get(`/api/get-all-doctors`);
}

const saveDetailDoctorService = (data) => {
    return axios.post(`/api/save-info-doctors`, data);
}

const getDetailInfoDoctor = (inputId) => {
    return axios.get(`/api/get-detail-doctor-by-id?id=${inputId}`);
}

const saveBulkScheduleDoctor = (data) => {
    return axios.post('/api/bulk-create-schedule', data)
}

const getScheduleDoctorByDate = (doctorId, date) => {
    return axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`)
}

const deleteSchedule = (id) => {
    return axios.delete(`/api/delete-schedule`, { data: { id: id }});
}

const getDoctorInfoById = (doctorId) => {
    return axios.get(`/api/get-doctor-info-by-id?doctorId=${doctorId}`)
}

const getProfileDoctorInfoById = (doctorId) => {
    return axios.get(`/api/get-profile-doctor-info-by-id?doctorId=${doctorId}`)
}

const getAllDoctorInfo = () => {
    return axios.get(`/api/get-all-doctor-info`)
}

const postPatientBookingAppointment = (data) => {
    return axios.post('/api/patient-booking-appointment', data)
}

const postVerifyBookingAppointment = (data) => {
    return axios.post('/api/verify-booking-appointment', data)
}

const countDoctor = () => {
    return axios.get(`/api/countDoctor`);
}

const countPatient = () => {
    return axios.get(`/api/countPatient`);
}

const createNewSpecialty = (data) => {
    return axios.post('/api/create-new-specialty', data)
}

const getAllSpecialty = () => {
    return axios.get(`/api/get-all-specialty`);
}

const getDetailSpecialtyById = (data) => {
    return axios.get(`/api/get-detail-specialty-by-id?id=${data.id}`);
}

const deleteSpecialty = (id) => {
    return axios.delete(`/api/delete-specialty`, { data: { id: id }});
}

const editSpecialty = (data) => {
    return axios.put('/api/edit-specialty', data);
}

const createNewClinic = (data) => {
    return axios.post('/api/create-new-clinic', data)
}

const getAllClinic = () => {
    return axios.get(`/api/get-all-clinic`);
}

const getDetailClinicById = (data) => {
    return axios.get(`/api/get-detail-clinic-by-id?id=${data.id}`);
}

const deleteClinic = (id) => {
    return axios.delete(`/api/delete-clinic`, { data: { id: id }});
}

const editClinic = (data) => {
    return axios.put('/api/edit-clinic', data);
}

const countClinic = () => {
    return axios.get(`/api/countClinic`);
}

const getAllPatientForDoctor = (data) => {
    return axios.get(`/api/get-list-patient-for-doctor?doctorId=${data.doctorId}&date=${data.date}`);
}

const createNewHandbook = (data) => {
    return axios.post('/api/create-new-handbook', data)
}

const getAllHandbook = () => {
    return axios.get(`/api/get-all-handbook`);
}

const getDetailHandbookById = (data) => {
    return axios.get(`/api/get-detail-handbook-by-id?id=${data.id}`);
}

const deleteHandbook = (id) => {
    return axios.delete(`/api/delete-handbook`, { data: { id: id }});
}

const editHandbook = (data) => {
    return axios.put('/api/edit-handbook', data);
}

const countHandbook = () => {
    return axios.get(`/api/countHandbook`);
}

const postSendPrescription = (data) => {
    return axios.post(`/api/send-prescription`, data);
}

const postCancelSchedule = (data) => {
    return axios.post(`/api/cancel-schedule`, data);
}

export {
    getAllUsers,
    createNewUserService,
    deleteUserService,
    editUserService,
    getAllCodeService,
    getTopDoctorHomeService,
    getAllDoctorService,
    saveDetailDoctorService,
    getDetailInfoDoctor,
    saveBulkScheduleDoctor,
    getScheduleDoctorByDate,
    getDoctorInfoById,
    getProfileDoctorInfoById,
    postPatientBookingAppointment,
    postVerifyBookingAppointment,
    createNewSpecialty,
    getAllSpecialty,
    getDetailSpecialtyById,
    createNewClinic,
    getAllClinic,
    getDetailClinicById,
    getAllPatientForDoctor,
    createNewHandbook,
    getAllHandbook,
    getDetailHandbookById,
    postSendPrescription,
    postCancelSchedule,
    deleteHandbook,
    deleteClinic,
    deleteSpecialty,
    editHandbook,
    editSpecialty,
    editClinic,
    countDoctor,
    countPatient,
    countHandbook,
    countClinic,
    deleteSchedule,
    getAllDoctorInfo
}
