# API Documentation

## Auth Endpoints

- `POST /api/auth/login`: User authentication with multi-role token generation.
- `GET /api/auth/profile`: Retrieves current authenticated user profile.
- `POST /api/auth/forgot-password`: Triggers password reset email.

## Timetable Endpoints

- `GET /api/timetable`: Returns generated timetable filtered by section, faculty, or room.
- `POST /api/timetable/generate`: Triggers Python FastAPI Google OR-Tools CP-SAT solver.
- `POST /api/timetable/update-slot`: Updates slot position manually with conflict check.
- `GET /api/timetable/validate`: Runs hard and soft constraint validation.

## NEP 2020 Endpoints

- `GET /api/nep/baskets`: Retrieves Major, Minor, Multidisciplinary, SEC, AEC, VAC course lists.
- `POST /api/nep/validate-credits`: Validates student course selection against 16-24 credit semester limits.

## Python AI Engine Endpoints (Port 8000)

- `POST /generate-timetable`: CP-SAT solver endpoint.
- `POST /validate-timetable`: Constraint validation service.
- `POST /predict-workload`: Faculty workload distribution prediction using Pandas.
