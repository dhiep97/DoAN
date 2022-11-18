import express from "express";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"
import doctorController from "../controllers/doctorController"
import patientController from "../controllers/patientController"

let router = express.Router();
let initRoutes = (app) => {
    
    router.get("/", homeController.getHomePage)
    router.get('/crud', homeController.getCRUD);
    router.post('/post-crud', homeController.postCRUD);

    router.get('/get-crud', homeController.displayGetCRUD);
    router.get('/edit-crud', homeController.getEditCRUD);
    router.post('/put-crud', homeController.putCRUD);
    router.get('/delete-crud', homeController.deleteCRUD);

    //đăng kí, đăng nhập
    router.post('/api/login', userController.handleLogin);
    router.post('/api/register', userController.handleRegister);

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

    //benh nhan dat lich hen
    router.post('/api/patient-booking-appointment', patientController.postPatientBookingAppointment);

    //xac nhan dat lich
    router.post('/api/verify-booking-appointment', patientController.postVerifyBookingAppointment);

    
    return app.use("/", router);
}

module.exports = initRoutes;