# Simple Email Sender API

API sederhana untuk mengirim email menggunakan Node.js, Express, dan Nodemailer.

## Endpoint

### `POST /sendemail`
- **Description**: Mengirim email.
- **Request Body**:
  ```json
  {
    "emailTo": "recipient@example.com",
    "subject": "Your Subject",
    "text": "Your email content",
    "pass": "your_secret_password"
  }
  ```
  - **emailTo**: Alamat email penerima.
  - **subject**: Subjek email.
  - **text**: Konten email.
  - **pass**: Password rahasia yang harus sama dengan `YOUR_PASS` di file `.env`.

- **Response**:
  - **Berhasil**: Status 200
    ```json
    {
      "message": "Email berhasil dikirim!"
    }
    ```
  - **Gagal**: Status 400 atau 500
    ```json
    {
      "message": "Gagal mengirim email.",
      "error": "Error details"
    }
    ```

## Contoh Request Menggunakan Fetch di JavaScript
```javascript
fetch('http://localhost:3000/sendemail', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    emailTo: 'recipient@example.com',
    subject: 'Test Email',
    text: 'Hello from Simple Email Sender API!',
    pass: 'your_secret_password'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Catatan Penting
- **YOUR_PASS**: Kamu perlu menambahkan variabel `YOUR_PASS` di file `.env` sebagai password rahasia untuk melindungi endpoint ini. Contoh:
  ```env
  YOUR_PASS=your_secret_password
  ```

## Made By
[Radya](https://radya.fun)


