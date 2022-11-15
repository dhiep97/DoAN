import patientService from '../services/patientService';

let postPatientBookingAppointment = async (req, res) => {
    try {
        let info = await patientService.postPatientBookingAppointment(req.body);
        return res.status(200).json(info)
    } catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: 'Error from server...'
        })
    }
}

module.exports = {
    postPatientBookingAppointment: postPatientBookingAppointment
}