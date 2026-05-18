const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

async function sendWelcomeEmail(to, name) {
  await transporter.sendMail({
    from: `"Liberty" <${process.env.MAIL_USER}>`,
    to,
    subject: "Добро пожаловать в Liberty!",
    text: `Приветствуем в Liberty, где есть книги на любой вкус. Желаем приятных покупок.`,
    html: `
      <h2>Привет, ${name || "друг"}</h2>
      <p>Добро пожаловать в <b>Liberty</b> — магазин книг на любой вкус.</p>
      <p>Желаем приятных покупок</p>
    `
  });
}

async function sendOrderEmail(to, name, orderId, items = []) {
  const itemsHtml = items.map(i => `
    <li>
      ${i.title} - ${i.quantity} x ${i.price} р.
    </li>
  `).join("");

  await transporter.sendMail({
    from: `"Liberty" <${process.env.MAIL_USER}>`,
    to,
    subject: `Заказ #${orderId} оформлен`,
    html: `
      <h2>Спасибо за заказ, ${name || "друг"}!</h2>

      <h3>Состав заказа:</h3>
      <ul>
        ${itemsHtml}
      </ul>

      <p>Мы скоро свяжемся с вами.</p>
    `
  });
}

module.exports = { sendWelcomeEmail, sendOrderEmail };