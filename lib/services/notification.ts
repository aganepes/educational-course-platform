// SMS we Email üçin mock/integrasiýa hyzmaty
export async function sendBuyVerificationOTP({
  email,
  phone,
  code,
  courseTitle,
}: {
  email?: string;
  phone?: string;
  code: string;
  courseTitle: string;
}) {
  const message = `Kursy satyn almak üçin tassyklama kodyňyz: ${code}. Kurs: ${courseTitle}`;

  // 1. Email ugratmak (Resend, Nodemailer we s.m. arkaly)
  if (email) {
    console.log(`[EMAIL SENT -> ${email}]: ${message}`);
    // Mysal üçin Resend:
    // await resend.emails.send({ from: "no-reply@domain.com", to: email, subject: "Satyn alyş kody", text: message });
  }

  // 2. SMS ugratmak (Twilio, SMS Provider API arkaly)
  if (phone) {
    console.log(`[SMS SENT -> ${phone}]: ${message}`);
    // Mysal üçin SMS API:
    // await smsProvider.send({ to: phone, message });
  }
}