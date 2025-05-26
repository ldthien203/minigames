import nodemailer from 'nodemailer'

const sendEmail = async (req, res) => {
  const {name, email, subject, message} = req.body
  if (!name || !email || !subject || !message) {
    return res.status(400).json({error: 'Missing requiried fields'})
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.APP_GMAIL,
      pass: process.env.APP_PASSWORD,
    },
  })

  const mailOptions = {
    from: email,
    to: process.env.APP_GMAIL,
    subject: `[Contact] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
  }

  try {
    await transporter.sendMail(mailOptions)
    res.status(200).json({message: 'Email sent successfully'})
  } catch (error) {
    res.status(500).json({error: 'Failed to send email'})
  }
}

export default sendEmail
