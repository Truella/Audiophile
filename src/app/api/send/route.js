// src/app/api/send/route.js
import { Resend } from 'resend';
import { EmailTemplate } from '@/components/email-template';
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST() {
  try {
    // First, let's verify the API key is loaded
    if (!process.env.RESEND_API_KEY) {
      return Response.json(
        { error: 'RESEND_API_KEY is not configured' }, 
        { status: 500 }
      );
    }

    console.log('API Key present:', process.env.RESEND_API_KEY.substring(0, 10) + '...');

    const { data, error } = await resend.emails.send({
			from: "Acme <onboarding@resend.dev>",
			to: ["delivered@resend.dev"],
			subject: "Audiophile Test Email",
			react: EmailTemplate({ firstName: "John" }),
		});

    console.log('Resend data:', data);
    console.log('Resend error:', error);

    if (error) {
      return Response.json({ error }, { status: 500 });
    }

    return Response.json({ data });
  } catch (error) {
    console.error('Caught error:', error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}