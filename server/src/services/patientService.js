import db from "../models/index";
import emailService from './emailService'

let postPatientBookingAppointment = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.email || !data.doctorId || !data.timeType || !data.date || !data.fullName) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing parameter'
                })
            } else {
                
                await emailService.sendSimpleEmail({
                    receiverEmail: data.email,
                    patientName: data.fullName,
                    time: data.timeString,
                    doctorName: data.doctorName,
                    redirectLink: 'https://www.facebook.com'
                })
                let user = await db.User.findOrCreate({
                    where: { email: data.email },
                    defaults: {
                        email: data.email,
                        roleId: 'R3'
                    }
                })

                if (user && user[0]) {
                    await db.Booking.findOrCreate({
                        where: {  patientId: user[0].id, dateBooking: data.date, },
                        defaults: {
                            statusId: 'S1',
                            doctorId: data.doctorId,
                            patientId: user[0].id,
                            dateBooking: data.date,
                            birthday: data.birthday,
                            timeType: data.timeType,
                            reason: data.reason
                        }
                    })
                }
                resolve({
                    errCode: 0,
                    errMessage: 'Save info doctor success!'  
                })
            }
            
        } catch (error) {
            reject(error);
        }
    })
}

module.exports = {
    postPatientBookingAppointment: postPatientBookingAppointment
}