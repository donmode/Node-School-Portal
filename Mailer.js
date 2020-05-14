const nodemailer = require("nodemailer");

const getTransporter = () => {
  const EMAIL_USERNAME = process.env.EMAIL_USERNAME || "donmode4u@gmail.com";
  const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD || "ernest2036";
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD,
    },
  });
};

const setOption = (receiver, subject, content) => {
  const EMAIL_USERNAME = process.env.EMAIL_USERNAME || "donmode4u@gmail.com";
  return {
    from: EMAIL_USERNAME,
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
