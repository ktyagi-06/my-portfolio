
# 🚀 Full Stack Portfolio Website — Next.js + Tailwind + Email API

A modern full-stack developer portfolio built using **Next.js**, **React**, and **Tailwind CSS**, featuring a working backend contact API with **Nodemailer + Gmail SMTP** deployed on **Vercel**.

This project showcases my frontend, backend, and deployment skills in a production-style setup.

---

## 🔥 Features

* ⚡ Next.js App Router architecture
* 🎨 Responsive UI with Tailwind CSS
* 🧩 Component-based React structure
* 📬 Contact form with real email delivery
* 🔐 Secure SMTP using environment variables
* ☁️ Serverless API routes
* 🚀 Deployed on Vercel
* 📱 Mobile-first design
* 🧠 Clean folder structure & scalable layout

---

## 🛠 Tech Stack

**Frontend**

* Next.js
* React
* Tailwind CSS
* TypeScript

**Backend**

* Next.js API Routes
* Nodemailer
* Gmail SMTP

**Deployment**

* Vercel

---

## 📂 Project Structure

/app
/api/send → Email API route
/components → Reusable UI components
/public → Assets
/styles → Global styles

---

## ⚙️ Environment Variables

Create a `.env.local` file in root:

SMTP_USER=your_gmail_address
SMTP_PASS=your_gmail_app_password
SMTP_TO=your_destination_email

> ⚠️ Use Gmail App Password — not your real Gmail password.

---

## ▶️ Getting Started

Install dependencies:

npm install

Run development server:

npm run dev

Open:

[http://localhost:3000](http://localhost:3000)

---

## 📬 Contact Form Flow

1. User submits form
2. Frontend sends POST request to `/api/send`
3. Serverless function validates input
4. Nodemailer sends email via SMTP
5. Success / error returned to UI

---

## 🚀 Deployment

This project is deployed on **Vercel**.

To deploy your own copy:

* Fork repo
* Import into Vercel
* Add environment variables
* Deploy

---

## 📈 Why This Project Matters

This project demonstrates:

* Full-stack Next.js capability
* API route handling
* Secure environment config
* Third-party service integration
* Production deployment workflow

---

## 👨‍💻 Author

Kunal Tyagi
B.Tech — Full Stack & ML Focus
Open to internships & developer roles

---

## ⭐ Future Improvements

* Blog section with CMS
* Project dashboard
* Admin message viewer
* Analytics integration
* Authentication layer

---

If you like this project, consider giving it a ⭐


Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
