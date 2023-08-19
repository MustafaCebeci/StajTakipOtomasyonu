const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'stajtakipotomasyon@gmail.com',
        pass: 'fsizfzpkyatxzpta'
    }
});

module.exports = transporter;