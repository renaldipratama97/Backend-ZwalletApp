var nodemailer = require('nodemailer')
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME, // generated ethereal user
        pass: process.env.EMAIL_PASSWORD, // generated ethereal password
    },
});

const sendEmail = async (username, email) =>{
    const emailTemplate = `<!DOCTYPE html>
    <html lang="en">
    
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email</title>
    <style>
    body {
        background-color: #F9F9F9 !important;
        font-family: 'Helvetica Neue', Helvetica;
    }
    
    h1 {
        margin-top: 40px;
        text-align: center;
        color: #E0E0E0;
        font-weight: 500;
        font-size: 40px;
    }
    
    h2 {
        font-weight: 500;
        color: #556171;
    }
    
    .box {
        width: 500px;
        height: max-content;
        background-color: #FFFFFF;
        margin: 20px auto 0 auto;
        padding: 40px;
    }
    
    .desc {
        color: #8A7F8D;
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
    }
    
    .box .footer {
        color: #556171;
        font-size: 13px;
        font-weight: 500;
        text-align: left;
    }
    
    .footer {
        text-align: center;
        color: #556171;
        font-size: 13px;
        font-weight: 500;
        margin-top: 40px;
    }
    
    .btn {
        display: block;
        margin: 30px auto 0 auto;
        background-color: #6379F4;
        color: white !important;
        border: none;
        width: 115px;
        font-size: 16px;
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
        padding:15px;
    }
    
    .email {
        color: #7289DA;
        text-decoration: none;
    }
    
    hr {
        margin-top: 40px;
    }
    </style>
    </head>
    
    <body>
    <div class="container">
        <h1>Zwallet App</h1>
        <div class="box mx-auto mt-5 p-5">
            <h2>Hai <span style="text-transform:capitalize">${username}</span></h2>
            <p class="desc mt-3">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, eius nemo animi autem
            in optio quos libero cupiditate alias ab obcaecati dolores pariatur, officiis nam, assumenda necessitatibus
            harum accusantium tenetur praesentium delectus sit? Ipsum officiis hic laborum architecto delectus! Et.</p>
            <p class="desc mt-3">Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ducimus, nostrum ea rerum
            quaerat suscipit!</p>
            <a href="${process.env.BASE_URL_FRONT_END}/auth/activation/${email}" class="btn">Verify email</a >
            <hr>
            <p class="footer">
            Need help? Contact our support team or hit us up on email <a class="email"href="mailto:${process.env.EMAIL_USERNAME}">click in here</a>
            </p>
        </div>
        <p class="footer">Sent by Zwallet Team</p>
    </div>
    </body>
    
    </html>`
    return new Promise((resolve, reject)=>{
        const message = {
        from: process.env.EMAIL_USERNAME, // sender address
        to: email, // list of receivers
        subject: "Email Verification", // Subject line
        // text: "Hello world?", // plain text body
        html: emailTemplate, // html body
    }
    
    transporter.sendMail(message, (error, info) => {
        if (!error) {
            resolve(info)
        }else{
            reject(error)
        }
    })
})
}

module.exports = sendEmail