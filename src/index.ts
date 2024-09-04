import express, { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const app = express();

app.use(express.json());

app.post('/sendemail', async (req: Request, res: Response) => {
    const { emailTo, pengumuman, isi } = req.body;

    if (!emailTo || !pengumuman || !isi) {
        return res.status(400).json({ message: 'Field emailTo, pengumuman, dan isi harus diisi.' });
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
        subject: pengumuman,
        text: isi,
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
