import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import Logo1 from "../../logos/logo-no-background.png";

const email = process.env.EMAIL;
const pass = process.env.PASS;

const transporter = nodemailer.createTransport({
  service: "gmail", //because I am using a gmail account
  auth: {
    //use environment variables for username and password
    user: email,
    pass,
  },
});

//Because we want the field names to be capitalized
const textFields: any = {
  name: "Name",
  type: "Type",
  message: "Message",
  clinicEmail: "Clinic Email",
  clinicName: "Clinic Name",
  toEmail: "Email",
};

export async function POST(request: Request) {
  const { name, type, subject, message, clinicName, toEmail, clinicEmail } =
    await request.json();

  const mailOptions = {
    //using my own email due to the user not giving us access to use their email and send an email on their behalf, so when they send a message I will send that mail to myself and Ill know who it is based on the contact info provided.
    from: email,
    to: toEmail,
  };

  const generateEmailContent = (data: any) => {
    const stringData = Object.entries(data).reduce((accum, [key, value]) => {
      return (accum += `${textFields[key]}: \n ${value} \n \n`);
    }, "");

    const htmlData = Object.entries(data).reduce((accum, [key, val]) => {
      return (accum += `<h3 class="form-heading" align="left">${textFields[key]}</h3><p class="form-answer" align="left">${val}</p>`);
    }, "");

    return {
      text: stringData,
      //ran all the html from email.html through a minifier
      html: `<!DOCTYPE html><html> <head> <title></title> <meta charset="utf-8"/> <meta name="viewport" content="width=device-width, initial-scale=1"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <style type="text/css"> body, table, td, a{-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%;}table{border-collapse: collapse !important;}body{height: 100% !important; margin: 0 !important; padding: 0 !important; width: 100% !important;}@media screen and (max-width: 525px){.wrapper{width: 100% !important; max-width: 100% !important;}.responsive-table{width: 100% !important;}.padding{padding: 10px 5% 15px 5% !important;}.section-padding{padding: 0 15px 50px 15px !important;}}.form-container{margin-bottom: 24px; padding: 20px; border: 1px dashed #ccc;}.form-heading{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 400; text-align: left; line-height: 20px; font-size: 18px; margin: 0 0 8px; padding: 0;}.form-answer{color: #2a2a2a; font-family: "Helvetica Neue", "Helvetica", "Arial", sans-serif; font-weight: 300; text-align: left; line-height: 20px; font-size: 16px; margin: 0 0 24px; padding: 0;}div[style*="margin: 16px 0;"]{margin: 0 !important;}</style> </head> <body style="margin: 0 !important; padding: 0 !important; background: #fff"> <div style=" display: none; font-size: 1px; color: #fefefe; line-height: 1px;  max-height: 0px; max-width: 0px; opacity: 0; overflow: hidden; " ></div><table border="0" cellpadding="0" cellspacing="0" width="100%"> <tr> <td bgcolor="#ffffff" align="center" style="padding: 10px 15px 30px 15px" class="section-padding" > <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 500px" class="responsive-table" > <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0"> <tr> <td> <table width="100%" border="0" cellspacing="0" cellpadding="0" > <tr> <td style=" padding: 0 0 0 0; font-size: 16px; line-height: 25px; color: #232323; " class="padding message-content" > <h2>Email from your Physical Therapist!</h2> <img src='https://react-email-demo-ijnnx5hul-resend.vercel.app/static/plaid-logo.png' alt='logo' width="212" height="88" style="display:block;outline:none;border:none;text-decoration:none;margin:0 auto"/> <div class="form-container">${htmlData}</div></td></tr></table> </td></tr></table> </td></tr></table> </td></tr></table> </body></html>`,
    };
  };

  try {
    await transporter.sendMail({
      ...mailOptions,
      ...generateEmailContent({
        name,
        type,
        message,
        clinicName,
        toEmail,
        clinicEmail,
      }),
      subject: subject,
      //   text: 'This is a test string',
      //   html: '<h1>HTML version of the message</h1>',
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: (error as Error).message });
  }
}
