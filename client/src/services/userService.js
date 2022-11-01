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

const updateInfoDoctor = (inputData) => {
    return axios.put('/api/update-info-doctor', inputData);
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
    updateInfoDoctor
}
