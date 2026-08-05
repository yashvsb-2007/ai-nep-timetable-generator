import pandas as pd
import numpy as np
from typing import List, Dict, Any
from models import (
    TimetableAssignment, RoomInput, FacultyInput, SectionInput,
    ValidationRequest, ValidationResponse, WorkloadPredictionRequest, WorkloadPredictionResponse
)

def validate_timetable(req: ValidationRequest) -> ValidationResponse:
    hard_violations = []
    soft_violations = []

    # Check for faculty conflicts
    fac_slots = {}
    room_slots = {}
    sec_slots = {}

    for a in req.assignments:
        # Faculty clash
        key_f = (a.facultyId, a.timeSlotId)
        if key_f in fac_slots:
            hard_violations.append(f"Faculty {a.facultyId} double booked at slot {a.timeSlotId}")
        fac_slots[key_f] = a

        # Room clash
        key_r = (a.roomId, a.timeSlotId)
        if key_r in room_slots:
            hard_violations.append(f"Room {a.roomId} double booked at slot {a.timeSlotId}")
        room_slots[key_r] = a

        # Section clash
        key_s = (a.sectionId, a.timeSlotId)
        if key_s in sec_slots:
            hard_violations.append(f"Section {a.sectionId} double booked at slot {a.timeSlotId}")
        sec_slots[key_s] = a

    # Faculty Workload calculation
    fac_counts = {}
    for a in req.assignments:
        fac_counts[a.facultyId] = fac_counts.get(a.facultyId, 0) + 1

    workloads = list(fac_counts.values())
    variance = np.var(workloads) if workloads else 0
    workload_score = max(0.0, 100.0 - float(variance * 5.0))

    for f in req.faculty:
        hrs = fac_counts.get(f.id, 0)
        if hrs > f.maxWeeklyHours:
            soft_violations.append(f"Faculty {f.name} exceeds max weekly hours ({hrs} > {f.maxWeeklyHours})")

    return ValidationResponse(
        isValid=len(hard_violations) == 0,
        hardViolations=hard_violations,
        softViolations=soft_violations,
        workloadScore=round(workload_score, 2)
    )


def predict_workload(req: WorkloadPredictionRequest) -> WorkloadPredictionResponse:
    df = pd.DataFrame([a.dict() for a in req.assignments]) if req.assignments else pd.DataFrame()
    
    distribution = {}
    overloaded = []
    underutilized = []
    recommendations = []

    if not df.empty:
        fac_group = df.groupby('facultyId').size().to_dict()
    else:
        fac_group = {}

    for f in req.faculty:
        assigned_hrs = fac_group.get(f.id, 0)
        distribution[f.name] = assigned_hrs

        if assigned_hrs > f.maxWeeklyHours:
            overloaded.append(f.name)
            recommendations.append(f"Reassign {assigned_hrs - f.maxWeeklyHours} hours from {f.name} to underutilized faculty.")
        elif assigned_hrs < (f.maxWeeklyHours * 0.5):
            underutilized.append(f.name)

    if not overloaded:
        recommendations.append("Faculty workload is optimally balanced across all departments.")

    return WorkloadPredictionResponse(
        workloadDistribution=distribution,
        overloadedFaculty=overloaded,
        underutilizedFaculty=underutilized,
        recommendations=recommendations
    )
