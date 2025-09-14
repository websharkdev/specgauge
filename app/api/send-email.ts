import type { NextApiRequest, NextApiResponse } from 'next';
import nodemailer, { SentMessageInfo } from 'nodemailer';

type FeedbackRequestBody = {
    email: string;
    feedback: string;
};

type MainResult =
    | { ok: true; info: SentMessageInfo }
    | { ok: false; error: unknown };

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
): Promise<void> {
    const { method, body } = req;

    // Проверяем что метод POST и тело валидно
    if (
        method !== 'POST' ||
        !body ||

        typeof (body as any).email !== 'string' ||

        typeof (body as any).feedback !== 'string'
    ) {
        res.status(400).json({
            ok: false,
            error: 'Invalid request',
        });
        return;
    }

    const { email, feedback } = body as FeedbackRequestBody;

    async function main(): Promise<MainResult> {
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
