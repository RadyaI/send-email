import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors'
import 'dotenv/config';

const app = express();

app.use(express.json());
app.use(cors())

app.get('/', (req: Request, res: Response) => {
    res.json({ status: 'working' }) 
})

app.get('/ip', (req: Request, res: Response) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.json(ip);
})

app.post('/sendemail', async (req: Request, res: Response) => {
    const { emailTo, subject, text, pass } = req.body;

    if (!emailTo || !subject || !text || pass != process.env.YOUR_PASS) {
        return res.status(400).json({ message: 'Field emailTo, subject, dan text harus diisi.' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: emailTo,
        subject: subject,
        text: text,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email berhasil dikirim!' });
    } catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Gagal mengirim email.', error });
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});

export default app;
