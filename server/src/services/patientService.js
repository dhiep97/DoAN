import db from "../models/index";
import emailService from './emailService'
import { v4 as uuidv4 } from 'uuid';

let buildUrlEmail = (doctorId, token, timeType) => {
    let result = `${process.env.URL_REACT}/verify-booking?token=${token}&doctorId=${doctorId}&timeType=${timeType}`;
    return result;
}
let postPatientBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.lastName
                || !data.firstName || !data.selectedGender || !data.address) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {

                let token = uuidv4();
                
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        roleId: 'R3',
                        positionId: 'P6',
                        gender: data.selectedGender,
                        address: data.address,
                        phoneNumber: data.phoneNumber,
                    }
                })

                if (user && user[0]) {
                    let booking = await db.Booking.findOrCreate({
                        where: {  patientId: user[0].id, dateBooking: data.date },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            dateBooking: data.date,
                            birthday: data.birthday,
                            timeType: data.timeType,
                            reason: data.reason,
                            token: token,
                        },
                    })
                    if (booking) {
                        await emailService.sendSimpleEmail({
                            receiverEmail: data.email,
                            patientName: data.lastName + ' ' + data.firstName,
                            time: data.timeString,
                            doctorName: data.doctorName,
                            redirectLink: buildUrlEmail(data.doctorId, token, data.timeType)
                        })
                    }
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save info patient success!'  
                })
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

let postVerifyBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.doctorId || !data.token ||!data.timeType ) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else { 
                let appointment = await db.Booking.findOne({
                    where: {
                        doctorId: data.doctorId,
                        token: data.token,
                        statusId: 'S1'
                    },
                    raw: false
                })
                if (appointment) {
                    appointment.statusId = 'S2';
                    await appointment.save()
                    let book = await db.Schedule.findOne({
                        where: {
                            booking: 'B1',
                            doctorId: data.doctorId,
                            timeType: data.timeType
                        },
                        raw: false,
                    })
                    if (book) {
                        book.booking = 'B2';
                        await book.save();
                    }
                    resolve({
                        errCode: 0,
                        errMessage: 'Update the appointment successfully'
                    })
                } else {
                    resolve({
                        errCode: 2,
                        errMessage: 'Appointment has been activated or does not exist'
                    })
                }
            }
        } catch (error) {
            reject(error);
        }
    })
}
module.exports = {
    postPatientBookingAppointment: postPatientBookingAppointment,
    postVerifyBookingAppointment: postVerifyBookingAppointment
}