import express from "express";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"
import specialtyController from "../controllers/specialtyController"
import clinicController from "../controllers/clinicController"
import handbookController from "../controllers/handbookController"

let router = express.Router();
let initRoutes = (app) => {

    //đăng kí, đăng nhập
    router.post('/api/login', userController.handleLogin);

    //crud user
    router.get('/api/get-all-users', userController.handleGetAllUser);
    router.post('/api/create-new-user', userController.handleCreateNewUser);
    router.put('/api/edit-user', userController.handleEditUser);
    router.delete('/api/delete-user', userController.handleDeleteUser);

    //key code
    router.get('/api/all-code', userController.getAllCode);
    
    //doctor
    router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    
    //lay thong tin danh sach ten cac bac si admin
    router.get('/api/get-all-doctors', doctorController.getAllDoctors);

    //tao thong tin bac si admin
    router.post('/api/save-info-doctors', doctorController.postInforDoctor);

    //lay thong tin chi tiet bac si theo id
    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);

    //tao thoi gian kham benh
    router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule)

    //lay thoi gian kham benh 
    router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);

    //lay thong tin o bang doctor info
    router.get('/api/get-doctor-info-by-id', doctorController.getDoctorInfoById);

    //lay thong tin cho profile dat lich
    router.get('/api/get-profile-doctor-info-by-id', doctorController.getProfileDoctorInfoById);

    //lay ngay dat lich cua benh nhan
    router.get('/api/get-list-patient-for-doctor', doctorController.getListPatientForDoctor);

    //gui hoa don benh nhan
    router.post('/api/send-prescription', doctorController.postSendPrescription);

    //benh nhan huy lich kham, khong den kham
    router.post('/api/cancel-schedule', doctorController.postCancelSchedule);


    //benh nhan dat lich hen
    router.post('/api/patient-booking-appointment', patientController.postPatientBookingAppointment);

    //xac nhan dat lich
    router.post('/api/verify-booking-appointment', patientController.postVerifyBookingAppointment);

    //tao chuyen khoa
    router.post('/api/create-new-specialty', specialtyController.createSpecialty);

    //lấy thong tin chuyen khoa ra homepage
    router.get('/api/get-all-specialty', specialtyController.getAllSpecialty);

    //lấy thong tin chi tiet chuyen khoa 
    router.get(`/api/get-detail-specialty-by-id`, specialtyController.getDetailSpecialtyById);

    //xoa chuyen khoa
    router.delete('/api/delete-specialty', specialtyController.deleteSpecialty);

    //edit chuyen khoa
    router.put('/api/edit-specialty', specialtyController.editSpecialty);

    //tao phong kham
    router.post('/api/create-new-clinic', clinicController.createClinic);

    //lấy thong tin phong kham ra homepage
    router.get('/api/get-all-clinic', clinicController.getAllClinic);

    //lấy thong tin chi tiet phong kham 
    router.get(`/api/get-detail-clinic-by-id`, clinicController.getDetailClinicById);

    //xoa phong kham
    router.delete('/api/delete-clinic', clinicController.deleteClinic);

    //edit phong khám
    router.put('/api/edit-clinic', clinicController.editClinic);

    //tao cam nang
    router.post('/api/create-new-handbook', handbookController.createHandbook);

    //lấy thong tin cam nang ra homepage
    router.get('/api/get-all-handbook', handbookController.getAllHandbook);
    
    //lấy thong tin chi tiet cam nang theo id 
    router.get(`/api/get-detail-handbook-by-id`, handbookController.getDetailHandbookById);

    //xoa bai viet
    router.delete('/api/delete-handbook', handbookController.deleteHandbook);
    
    //edit bài viet
    router.put('/api/edit-handbook', handbookController.editHandbook);

    return app.use("/", router);
}

module.exports = initRoutes;