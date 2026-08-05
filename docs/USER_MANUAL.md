# User Manual - NEP 2020 AI Timetable ERP

## Getting Started

### 1. Accessing the Platform
- Open your web browser and navigate to `http://localhost:5173`.
- Select your role from the login persona buttons: **College Admin**, **HOD**, **Faculty**, or **Student**.
- Click **Sign In**.

### 2. Generating a Timetable (Admin / HOD)
1. Go to **Timetable Studio** from the sidebar menu.
2. Click the **Auto-Generate AI** button in the header toolbar.
3. The system invokes Google OR-Tools CP-SAT solver to compute a conflict-free schedule satisfying all faculty workload limits, room capacity, and multidisciplinary elective slot alignments.
4. View results in Weekly Grid mode, export as CSV, or print.

### 3. Student Course Registration & ABC Credits
1. Navigate to **NEP Credit Basket**.
2. Enter your Academic Bank of Credits (ABC) Account ID to verify accumulated credits.
3. Select your Major, Minor, Multidisciplinary, and SEC/VAC subjects.
