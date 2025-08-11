![Arthafolio header](assets/images/header.png)

# 📊 Arthafolio

Arthafolio is a sleek and user-friendly **cryptocurrency portfolio tracker** that makes monitoring your digital assets effortless 💰.

## ⚡ Features

- Add, remove, and edit your holdings in real time through a clean and intuitive interface ✍️
- Monitor your portfolio’s value with hourly snapshots, and explore performance over multiple timeframes: daily, weekly, monthly, quarterly, and yearly 📈
- Secure account management with user registration, email verification, and login functionality 🔐
- Personalize your experience with customizable preferences:

  - Hide sensitive data directly in the UI for enhanced privacy 🔒
  - Select your preferred currency (Euro € or US Dollar \$) 💱
  - Switch effortlessly between light and dark themes for optimal viewing anytime 🌙

Built as a **Progressive Web App (PWA)** 📱, providing a fast, reliable, and native-like experience on any device.

**Coming soon:** AI integration with Sonnet 4 to deliver smart insights and information about your portfolio 🤖✨

## 🚀 How to Run Locally

This project is built with Next.js 15 for the frontend and Ruby on Rails 8 for the backend. Follow the steps below to set up and run the application locally.

### 1. Clone the Repository

```bash
git clone https://github.com/6eero/Arthafolio.git
cd Arthafolio
```

### 2. Run the Frontend

```bash
cd frontend
```

Then:

```bash
nvm install
nvm use
npm install
cp .env.example .env.local
```

Edit `.env.local` and fill in the required values.

Start the development server:

```bash
npm run dev
```

Frontend will be running at: [http://localhost:3000](http://localhost:3000)

### 3. Run the Backend

```bash
cd backend
```

Copy the example environment file for both environments:

```bash
cp .env.example .env.development
cp .env.example .env.production
```

Edit the files and insert the correct values as needed. Then build and run the containers:

```bash
docker-compose up --build
```

> ℹ️ The backend will run in either development or production mode depending on your `.env` configuration.

Backend will be running at: [http://localhost:3001](http://localhost:3001)

### 🧪 Environment Variables

- The `.env.general` file is a template.
- Use it to create your `.env.local`, `.env.development`, and `.env.production` files as needed.
