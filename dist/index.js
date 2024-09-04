"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const nodemailer_1 = __importDefault(require("nodemailer"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.post('/sendemail', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { emailTo, pengumuman, isi } = req.body;
    if (!emailTo || !pengumuman || !isi) {
        return res.status(400).json({ message: 'Field emailTo, pengumuman, dan isi harus diisi.' });
    }
    const transporter = nodemailer_1.default.createTransport({
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
        yield transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Email berhasil dikirim!' });
    }
    catch (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Gagal mengirim email.', error });
    }
}));
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server berjalan di port ${port}`);
});
exports.default = app;
