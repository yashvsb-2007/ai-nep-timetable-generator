from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any

class TimeSlotInput(BaseModel):
    id: str
    dayOfWeek: str  # MONDAY, TUESDAY, etc.
    slotNumber: int
    startTime: str  # "09:00"
    endTime: str    # "10:00"
    isBreak: bool = False

class RoomInput(BaseModel):
    id: str
    code: str
    name: str
    capacity: int
    isLab: bool = False
    building: str
    hasProjector: bool = True

class FacultyInput(BaseModel):
    id: str
    name: str
    departmentId: str
    maxWeeklyHours: int = 18
    maxDailyLectures: int = 4
    preferredSlots: List[str] = []      # list of timeSlotIds
    unavailableSlots: List[str] = []    # list of timeSlotIds

class SubjectInput(BaseModel):
    id: str
    code: str
    name: str
    courseType: str  # MAJOR, MINOR, MULTIDISCIPLINARY, SEC, AEC, VAC, INTERNSHIP
    credits: int
    weeklyLectures: int
    isLab: bool = False
    labDuration: int = 2  # default 2 contiguous slots for lab
    departmentId: str
    requiredRoomCapacity: int = 30

class SectionInput(BaseModel):
    id: str
    name: str
    departmentId: str
    semester: int
    studentCount: int
    majorSubjectIds: List[str] = []
    minorSubjectIds: List[str] = []
    multidisciplinarySubjectIds: List[str] = []
    electiveSubjectIds: List[str] = []

class GenerationRequest(BaseModel):
    academicYear: str
    semester: int
    departments: List[str]
    timeSlots: List[TimeSlotInput]
    rooms: List[RoomInput]
    faculty: List[FacultyInput]
    subjects: List[SubjectInput]
    sections: List[SectionInput]
    constraints: Optional[Dict[str, Any]] = Field(default_factory=dict)

class TimetableAssignment(BaseModel):
    sectionId: str
    subjectId: str
    facultyId: str
    roomId: str
    timeSlotId: str
    dayOfWeek: str
    slotNumber: int
    isLab: bool = False

class GenerationResponse(BaseModel):
    status: str  # SUCCESS, FEASIBLE, INFEASIBLE, ERROR
    score: float
    totalAllocatedSlots: int
    unallocatedCount: int
    assignments: List[TimetableAssignment]
    conflicts: List[str] = []
    metrics: Dict[str, Any] = Field(default_factory=dict)

class ValidationRequest(BaseModel):
    assignments: List[TimetableAssignment]
    rooms: List[RoomInput]
    faculty: List[FacultyInput]
    sections: List[SectionInput]

class ValidationResponse(BaseModel):
    isValid: bool
    hardViolations: List[str]
    softViolations: List[str]
    workloadScore: float

class WorkloadPredictionRequest(BaseModel):
    faculty: List[FacultyInput]
    assignments: List[TimetableAssignment]

class WorkloadPredictionResponse(BaseModel):
    workloadDistribution: Dict[str, int]
    overloadedFaculty: List[str]
    underutilizedFaculty: List[str]
    recommendations: List[str]
