const nodemailer = require("nodemailer");

const getTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
};

const setOption = (receiver, subject, content) => {
  return {
    from: process.env.EMAIL_USERNAME,
    to: receiver,
    subject: subject,
    html: content,
  };
};

const SendMail = (receiver, subject, content) => {
  return new Promise((resolve, reject) => {
    const transporter = getTransporter();
    const mailOptions = setOption(receiver, subject, content);
    return transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("errooor::: ", error);
        reject({ success: false, error: error });
      } else {
        console.log("success::: ");

        resolve({ success: true, message: "Mail sent successfully" });
      }
    });
  });
};

module.exports = { SendMail };
