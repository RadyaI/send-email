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
    "text": "Your email content"
  }
  ```
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
    text: 'Hello from Simple Email Sender API!'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

## Made By
[Radya](https://radya.fun)


