from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import logging

from models import (
    GenerationRequest, GenerationResponse,
    ValidationRequest, ValidationResponse,
    WorkloadPredictionRequest, WorkloadPredictionResponse
)
from solver import NEPTimetableSolver
from optimizer import validate_timetable, predict_workload

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("nep_ai_engine")

app = FastAPI(
    title="NEP 2020 AI Timetable Generation Engine",
    description="FastAPI microservice wrapping Google OR-Tools CP-SAT solver for multidisciplinary education structures.",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "NEP 2020 AI Timetable Solver Engine",
        "version": "1.0.0",
        "solver": "Google OR-Tools CP-SAT"
    }

@app.get("/health")
def health_check():
    return {"status": "healthy"}

@app.post("/generate-timetable", response_model=GenerationResponse)
def generate_timetable(request: GenerationRequest):
    logger.info(f"Received generation request for academic year {request.academicYear}, semester {request.semester}")
    try:
        solver = NEPTimetableSolver(request)
        response = solver.solve()
        return response
    except Exception as e:
        logger.error(f"Generation error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/validate-timetable", response_model=ValidationResponse)
def validate(request: ValidationRequest):
    try:
        return validate_timetable(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/predict-workload", response_model=WorkloadPredictionResponse)
def predict(request: WorkloadPredictionRequest):
    try:
        return predict_workload(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
