import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';
import models from '../models';

const mailService = {
  sendRegEmail: async (token) => {
    models.User.findOne({where: {id: token } }).then(async (project) => {
      const email = project.email;
      const link = encodeURI(`https://srn.pw/verify?token=${token}`);

      const transporter = nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });

      await transporter.sendMail({
        from: '"srn.pw admin" <contact@srn.pw>',
        to: email,
        subject: 'Verify your srn.pw account',
        html:
          `Welcome to <a href="https://srn.pw">srn.pw</a>! Someone (hopefully you!) registered for an account with this email address. If this was you, click the link below to verify your account. Otherwise, please ignore this email. <br /> <a href="${
            link
          }">${
            link
          }</a>`,
      });
    }); 
  },
  sendResetEmail: async (token) => {
    const signature = process.env.JWT_SECRET;
    let email;
    jwt.verify(token, signature, (err, decoded) => {
      email = decoded.data.email;
    });

    const link = encodeURI(`https://srn.pw/reset?token=${token}`);

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: '"srn.pw admin" <contact@srn.pw>',
      to: email,
      subject: 'Reset your srn.pw password',
      html:
        `Someone (hopefully you) has requested to reset your password on <a href="https://srn.pw">srn.pw</a>. If this was you, click the link below to change your password. Otherwise, please ignore this email. <br /> <a href="${
          link
        }">${
          link
        }</a>`,
    });
  },
};

export default mailService;
