const nodemailer = require('nodemailer');
const customerModel = require('../../models/customers');

module.exports = {
    get: async function (req, res) {
        try {
            const userPhone = req.session.phoneNumber;
            const user = await customerModel.findOne({ phone: userPhone });

            if (!user) {
                return res.render('user/login', { error: 'User not found' });
            }
            const otp = Math.floor(100000 + Math.random() * 900000);
            user.forgotPasswordOTP = otp;
            await user.save();

            await emailVerification(user.email,user.name,otp);
            const maskedEmail = maskEmail(user.email); 
            res.render('user/otp',  { email: maskedEmail });
        } catch (error) {
            console.error('Error in forgotPasswordController.get:', error);
        }
    },

    post: async function (req, res) {
        try {
            const otp = req.body.otp;
            const userPhone = req.session.phoneNumber;
            const user = await customerModel.findOne({ phone: userPhone });

            if (!user || user.forgotPasswordOTP !== parseInt(otp, 10)) {
                return res.render('user/otp', {  error: 'Invalid OTP' });
            }


            user.forgotPasswordOTP = undefined;
            await user.save();
            res.redirect('/user/resetPassword');
        } catch (error) {
            console.error('Error in forgotPasswordController.post:', error);
            res.render('error'); // Render an error page or handle as appropriate
        }
    }
};



  function maskEmail(email) {
    const atIndex = email.indexOf('@');
    const maskedPart = email.slice(0, Math.min(atIndex, 4)) + '****' + email.slice(atIndex);
    return maskedPart;
}

  const otpCache = {};

  
  const emailVerification = async (email,name,otpVal) => {
    try {
     
      otpCache[email] = otpVal;
      
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: true,
        auth: {
          user: 'binbookskerala@gmail.com',
          pass: 'rtau qlbi fsbm xogt',
        },
        tls: {
          rejectUnauthorized: false,
        },
      });
  
      let mailOptions = {
        from: 'binbookskerala@gmail.com',
        to: email,
        subject:' Binbooks Password Reset Verification Code',
        html: `
        <p style="font-size: 18px; font-weight: bold; color: #333333;">Dear ${name},</p>

        <p style="font-size: 14px;">This message contains the verification code required to initiate the password reset process for your Binbooks account.</p>

        <p style="font-size: 20px; font-weight: bold; color: #333333;">Verification Code:<span  style="font-size: 20px; font-weight: bold; color: #0088cc;"> ${otpVal} </span></p>

        <p style="font-size: 14px;">Please refrain from sharing this code with anyone for security reasons.</p>

        <p style="font-size: 14px;">If you did not request a password reset or have any concerns about the security of your account, please contact our support team immediately.</p>

        <p style="font-size: 14px;">Thank you for using Binbooks.</p>

        <p style="font-size: 16px; font-weight: bold;">Best regards, BinbooksKerala</p>
    `,
      };1
  
      let info = await transporter.sendMail(mailOptions);
    } catch (error) {
      res.status(500).send("Internal Server Error. Please try again later.");
    }
  };

  