import { APP_URL } from "@/common/config";

export const registrationEmail = (firstName,lastName,email,password) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Equiyoage</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      background-color: #f4f4f4;
      color: #333;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 600px;
      margin: 20px auto;
      padding: 20px;
      background-color: #fff;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }

    h2 {
      color: #3498db;
    }

    p {
      margin-bottom: 15px;
    }

    .highlight {
      font-weight: bold;
      color: #e74c3c;
    }

    .button {
      display: inline-block;
      padding: 10px 20px;
      background-color: #3498db;
      color: #fff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h2>Welcome to Equiyoage!</h2>
    <p>Congratulations on successfully creating your account. Here are your account details:</p>
    <p>
      <strong>Full Name:</strong> ${firstName} ${lastName}<br>
      <strong>Email:</strong> ${email}<br>
      <strong>Password:</strong> ${password}
    </p>
    <p>
      You can now start exploring Equiyoage by visiting our site:
      <a href="${APP_URL}" class="button">Go to Equiyoage</a>
    </p>
    <p>Thank you for choosing Equiyoage! If you have any questions, feel free to contact our support team.</p>
  </div>
</body>
</html>
`