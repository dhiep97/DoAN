require('dotenv').config;
import Nodemailer from 'Nodemailer';

let sendSimpleEmail = async (dataSend) => {

    // create reusable transporter object using the default SMTP transport
    let transporter = Nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: process.env.EMAIL_APP, // generated ethereal user
            pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
        },
    });

    // send mail with defined transport object
    let info = await transporter.sendMail({
        from: '"HiDu Booking 👻" <dhiep97@gmail.com>', // sender address
        to: dataSend.receiverEmail, // list of receivers
        subject: "Thông tin đặt lịch khám bệnh", // Subject line
        html: 
            `
            <h3>Xin chào ${dataSend.patientName}</h3>
            <p>Email này được gửi đến bạn khi bạn đặt lịch khám bệnh online trên ĐATN do mình test.</p>
            <p>Thông tin đặt lịch khám bệnh</p>
            <div><b>Thời gian: ${dataSend.time}</b></div>
            <div><b>Tên bác sĩ: ${dataSend.doctorName}</b></div>
            <p>Nếu các thông tin là đúng. Vui lòng click vào đường link bên dưới
            để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh</p>
            <div>
            <a href=${dataSend.redirectLink} target="_blank">Click here</a>
            </div>
            <p>Nếu làm phiền tới bạn. Xin vui lòng bỏ qua. Không bỏ qua là ta cho quả đấm vào mồm.</p>
            <div>Xin chân thành cảm ơn!</div>
            `
    });
}

module.exports = {
    sendSimpleEmail: sendSimpleEmail
}