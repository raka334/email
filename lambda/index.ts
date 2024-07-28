import { Hono } from 'hono'
import { handle } from 'hono/aws-lambda'

const app = new Hono()

app.post('/', async (c) => {
  const { email } = await c.req.json()
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${process.env.RESEND_API_TOKEN}`,
    },
    body: JSON.stringify({
      from: `AMAN is Shit <${process.env.MAIL_FROM_EMAIL}>`,
      to: [email],
      subject: 'hello world',
      html: '<strong>it works!</strong>',
    }),
  });

  if (!res.ok) {
    return c.json({ error: 'Failed to send email' }, 500)
  }
  else {
    return c.json({ message: 'Email sent' })
  }
})

export const handler = handle(app)