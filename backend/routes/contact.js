import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const apiKey = process.env.BREVO_API_KEY;
  if (!apiKey) {
    console.error('❌ Brevo API Key is missing in environment variables');
    return res.status(500).json({ message: 'Mail server configuration error' });
  }

  // Receiver email (user's target email)
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'dyceduworks@gmail.com';
  // Sender email (Must be a verified sender in Brevo. Default to receiver if not set, or customizable)
  const senderEmail = process.env.BREVO_SENDER_EMAIL || receiverEmail;

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'api-key': apiKey,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: name,
          email: senderEmail,
        },
        to: [
          {
            email: receiverEmail,
            name: 'DYC Eduworks',
          },
        ],
        replyTo: {
          email: email,
          name: name,
        },
        subject: `📞 New Contact Message from ${name}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 5px;">
            <h2 style="color: #00ADB5; border-bottom: 2px solid #00ADB5; padding-bottom: 10px;">New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #00ADB5; margin-top: 20px;">
              <p style="margin: 0; font-style: italic; white-space: pre-wrap;">${message}</p>
            </div>
            <p style="font-size: 12px; color: #777; margin-top: 30px; border-top: 1px solid #eee; padding-top: 10px;">
              Sent from DYC Eduworks website contact form.
            </p>
          </div>
        `,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('❌ Brevo API Error response:', data);
      throw new Error(data.message || 'Failed to send email via Brevo');
    }

    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('❌ Mail send error:', error.message);
    res.status(500).json({ message: 'Failed to send message. Please try again later.' });
  }
});

export default router;
