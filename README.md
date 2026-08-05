# AI-Based Timetable Generation System aligned with NEP 2020 for Multidisciplinary Education Structures

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![NEP 2020 Aligned](https://img.shields.io/badge/NEP%202020-Multidisciplinary-indigo.svg)](https://www.education.gov.in/nep/about-nep)
[![Google OR-Tools](https://img.shields.io/badge/AI%20Engine-Google%20OR--Tools%20CP--SAT-brightgreen.svg)](https://developers.google.com/optimization)

A production-ready, full-stack AI-powered web application for automated, constraint-satisfied timetable generation designed for the **National Education Policy (NEP) 2020 multidisciplinary education structures**.

---

## Technical Stack

* **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, Framer Motion, Recharts, Lucide Icons, Axios.
* **Backend Server**: Node.js, Express, TypeScript, JWT Auth, bcrypt, Multer, Express Validator, Prisma ORM.
* **AI Engine**: Python 3.10+, FastAPI, Google OR-Tools (`ortools.sat.python.cp_model`), Pandas, NumPy, SciKit-Learn.
* **Database**: PostgreSQL / SQLite (Dual Prisma support).
* **Containerization**: Docker & Docker Compose.

---

## Key Features

1. **Role-Based Portals**:
   - **College Admin**: Master management, system parameters, AI generation launcher.
   - **Department Admin & HOD**: Department workload tracking, course basket allocations.
   - **Faculty**: Personal weekly timetable view, availability preferences, leave requests.
   - **Student**: Multidisciplinary Major/Minor credit view, ABC credit account tracker.

2. **NEP 2020 Framework Integration**:
   - Support for **Major**, **Minor**, **Multidisciplinary**, **Skill Enhancement (SEC)**, **Ability Enhancement (AEC)**, and **Value Added Courses (VAC)**.
   - **Academic Bank of Credits (ABC)** verification engine.
   - Credit validation cap (16 - 24 credits per semester).

3. **AI Constraint Satisfaction Engine**:
   - Built on **Google OR-Tools CP-SAT Solver**.
   - Enforces zero faculty double-booking, zero room double-booking, room capacity validation, lab continuous 2-slot block allocation, faculty daily lecture limits, and lunch break protection.

4. **Timetable Studio**:
   - Interactive weekly matrix grid with view switchers (Section, Faculty, Room, Department).
   - Multi-format exports: PDF, CSV, Excel, Print.

---

## Folder Structure

```
├── client/              # React 18 + Vite + TypeScript Frontend
├── server/              # Node.js + Express + Prisma Backend API
├── ai-engine/           # Python + FastAPI + Google OR-Tools CP-SAT Solver
├── database/            # Prisma migrations, schemas, seed data
├── docs/                # Architecture diagrams, API specs, User manuals
├── docker-compose.yml   # Multi-container orchestration
├── Dockerfile           # Production build file
└── README.md            # System documentation
```

---

## Quick Start (Local Setup)

### 1. Client Setup
```bash
cd client
npm install
npm run dev
```
Client runs at `http://localhost:5173`.

### 2. Backend Server Setup
```bash
cd server
npm install
npx prisma db push
npm run dev
```
Express server runs at `http://localhost:5000`.

### 3. AI Engine Setup (Python)
```bash
cd ai-engine
python -m venv venv
# On Windows:
venv\Scripts\activate
pip install -r requirements.txt
python main.py
```
FastAPI AI service runs at `http://localhost:8000`.

---

## Docker Quickstart

```bash
docker-compose up --build
```

---

## License

This project is licensed under the MIT License.
