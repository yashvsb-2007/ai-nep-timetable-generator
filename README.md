# 🎓 AI-Based Timetable Generation System aligned with NEP 2020

An AI-powered timetable generation system that automatically creates optimized university timetables based on the National Education Policy (NEP) 2020. The system reduces manual scheduling conflicts, efficiently allocates faculty and classrooms, and supports multidisciplinary course structures.

## 🚀 Live Demo
https://ai-nep-timetable-8c9lphbut-hackanova.vercel.app/

---

# 📌 Features

- AI-based timetable generation
- NEP 2020 multidisciplinary support
- College Admin Dashboard
- Department Management
- Faculty Management
- Student Management
- Classroom Allocation
- Timetable Studio
- Reports & Analytics
- JWT Authentication
- Responsive UI
- REST API Backend

---

# 🛠 Tech Stack

## Frontend

- React.js
- TypeScript
- Vite
- Tailwind CSS
- Axios
- Framer Motion
- Recharts

## Backend

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- JWT Authentication
- Bcrypt

## AI Engine

- Python
- Google OR-Tools
- FastAPI
- Pandas
- NumPy

## Database

- PostgreSQL
- Prisma ORM

---

# 📂 Project Structure

```
AI-Based-Timetable-Generation-System
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── src
│   ├── prisma
│   └── package.json
│
├── ai-engine
│   ├── solver.py
│   ├── optimizer.py
│   ├── models.py
│   └── requirements.txt
│
├── docs
│
├── docker-compose.yml
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yashvsb-2007/ai-nep-timetable-generator.git
```

```bash
cd ai-nep-timetable-generator
```

---

# Install Frontend

```bash
cd client
npm install
npm run dev
```

---

# Install Backend

```bash
cd server
npm install
npm run dev
```

---

# Install AI Engine

```bash
cd ai-engine
pip install -r requirements.txt
python main.py
```

---

# Environment Variables

Create a `.env` file inside the server folder.

```env
PORT=5000

DATABASE_URL=your_database_url

JWT_SECRET=your_secret_key

AI_ENGINE_URL=http://localhost:8000
```

---

# API Endpoints

## Authentication

- POST `/auth/login`
- GET `/auth/profile`

## Timetable

- GET `/timetable`
- POST `/timetable/generate`
- POST `/timetable/update-slot`

---

# Deployment

## Frontend

- Vercel

## Backend

- Render

## AI Engine

- FastAPI (Python)

---

# Future Enhancements

- AI Conflict Prediction
- Faculty Leave Management
- Automatic Classroom Optimization
- Attendance Integration
- Mobile Application
- Email Notifications
- PDF Timetable Export

---

# Screenshots

- Login Page
- Dashboard
- Timetable Studio
- Reports & Analytics
- AI Timetable Generation

(Add screenshots here.)

---

# Author

yashwanth S

---

# License

This project is developed for academic purposes and Smart India Hackathon (SIH) / College Project.
