const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "santabell257@gmail.com", // replace with your Gmail
    pass: "qnltcufyxurkqddw", // App Password (not your Gmail password)
  },
});

// Endpoint to send order details
app.post("/send-order", (req, res) => {
  console.log("Received order request:", req.body); // Log the request to debug

  const { name, email, items, total } = req.body;

  if (!name || !email || !items || !total) {
    console.log("Missing order details!"); // Debugging if the required data is missing
    return res.status(400).send("Missing order details");
  }

  let orderDetails = "Order Details:\n\n";
  items.forEach((item) => {
    orderDetails += `Item: ${item.name}, Price: ₹${item.price}\n`;
  });

  orderDetails += `\nTotal: ₹${total}`;

  const mailOptions = {
    from: email,
    to: "santabell257@gmail.com", // your email to receive the order details
    subject: `New Order from ${name}`,
    text: `Order placed by: ${name}\nCustomer Email: ${email}\n\n${orderDetails}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending order email:", error);
      return res.status(500).send("Failed to send order email.");
    }
    console.log("Order email sent: " + info.response);
    res.send("Your order has been placed successfully!");
  });
});

// Start the server
app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
