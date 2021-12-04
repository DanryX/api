require('dotenv').config();

const nodemailer = require('nodemailer');

module.exports = () => {
  let transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASSSWORD
    }
  });

  const defaultParams = {
    from: '"MailChecker 👻" <mail@example.com>',
    // to: 'example@test.com',
    // subject: 'Subject',
    // text: 'Example text',
    // html: "<b>Example text</b>",
  };

  return (ctx, next) => {
    ctx.sendMail = params => {
      return new Promise((resolve, reject) => {
        transporter.sendMail(Object.assign({}, defaultParams, params), (error, info) => {
          if (error) reject(error);
          resolve(info);
        });
      });
    };

    return next();
  };
}
