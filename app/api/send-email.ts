import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer from 'nodemailer';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { method, body } = req;

    if (method !== 'POST' || !body || !body.email || !body.feedback) {
        res.statusCode = 400;
        res.json({
            ok: false,
            error: 'Invalid request',
        });
    }

    const { email, feedback } = body;

    async function main() {
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.eu.mailgun.org',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.MAILGUN_USERNAME,
                    pass: process.env.MAILGUN_PASSWORD,
                },
            });
            const info = await transporter.sendMail({
                from: process.env.MAILGUN_USERNAME,
                to: process.env.MAILGUN_TO,
                subject: 'Hello',
                text: `Email: ${email}\nFeedback: ${feedback}`,
            });

            return { ok: true, info };
        } catch (error) {
            return { ok: false, error };
        }
    }

    const result = await main();

    res.json({ result });
}
