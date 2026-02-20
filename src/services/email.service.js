const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: process.env.EMAIL_USER,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken: process.env.REFRESH_TOKEN,
  },
});

// Verify the connection configuration
transporter.verify((error, success) => {
  if (error) {
    console.error('Error connecting to email server:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});


// Function to send email
const sendEmail = async (to, subject, text, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"Backend Ledger" <${process.env.EMAIL_USER}>`, // sender address
      to, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    });

    console.log('Message sent: %s', info.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

// async function sendRegistrationEmail(userEmail, name){
//     const subject = "welcome to backend ledger";
//     const text = `Hello ${name},\n\n Thank you for registering with Backend Ledger! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.\n\nBest regards,\nThe Backend Ledger Team`;
//     const html = `<p>Hello ${name},</p><p>Thank you for registering with Backend Ledger! We're excited to have you on board. If you have any questions or need assistance, feel free to reach out to our support team.</p><p>Best regards,<br>The Backend Ledger Team</p>`;

//     await sendEmail(userEmail, subject, text, html);

// }

//More professional and visually appealing email template for registration confirmation
async function sendRegistrationEmail(userEmail, name){

  const subject = "🎉 Your Backend Ledger Account is Ready!";

  const text = `Hello ${name},

Your Backend Ledger account has been successfully created.

You can now log in and start managing your backend operations securely and efficiently.

If you did not create this account, please contact support immediately.

Welcome aboard 🚀

Best regards,
Backend Ledger Team`;

    const html = `
    <!DOCTYPE html>
    <html>
    <body style="margin:0;padding:0;background-color:#eef2f7;font-family:Arial,sans-serif;">

      <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;">
        
        <!-- Header -->
        <tr>
          <td style="
            background: linear-gradient(135deg,#1f4037,#99f2c8);
            padding:45px 20px;
            text-align:center;
            color:white;
          ">
            <h1 style="margin:0;font-size:30px;">Welcome to Backend Ledger 🎉</h1>
            <p style="margin-top:10px;font-size:15px;">Your account has been successfully created</p>
          </td>
        </tr>

        <!-- Card Section -->
        <tr>
          <td style="background:#ffffff;padding:35px;border-radius:8px;">
            
            <h2 style="color:#333;margin-top:0;">Hello ${name},</h2>

            <p style="color:#555;line-height:1.6;">
              We're excited to inform you that your <strong>Backend Ledger</strong> account is now active.
            </p>

            <p style="color:#555;line-height:1.6;">
              You can now log in and start managing your backend services securely and efficiently.
            </p>

            <!-- Info Box -->
            <div style="
              background:#f8f9fc;
              padding:15px;
              border-left:4px solid #4e73df;
              margin:20px 0;
              font-size:14px;
              color:#444;
            ">
              🔐 Your account was successfully registered using this email address.
            </div>

            <!-- CTA Button -->
            <div style="text-align:center;margin:30px 0;">
              <a href="https://yourwebsite.com/login"
                style="
                  background:#4e73df;
                  color:white;
                  padding:14px 28px;
                  text-decoration:none;
                  border-radius:6px;
                  font-weight:bold;
                  display:inline-block;
                  font-size:15px;
                ">
                Login to Your Dashboard →
              </a>
            </div>

            <p style="color:#888;font-size:13px;">
              If you did not create this account, please ignore this email or contact support immediately.
            </p>

          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1c1c1c;color:#aaa;text-align:center;padding:20px;font-size:12px;">
            © 2026 Backend Ledger <br>
            Secure. Reliable. Efficient.
          </td>
        </tr>

      </table>

    </body>
    </html>
    `;

    await sendEmail(userEmail, subject, text, html);
}


module.exports = {
    sendRegistrationEmail
};
