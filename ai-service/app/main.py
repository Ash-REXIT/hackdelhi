from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import Optional

from app.services.ocr import run_ocr
from app.services.extraction import extract_timesheet
from app.services.matching import match_employee
from app.services.validation import validate_timesheet, explain_flag
from app.services.explain import explain_review_summary, enhance_review_summary
from app.services.fraud import detect_fraud
from app.services.gemini import ai_provider
from app.services.chat import chat

app = FastAPI(title="FlowInvoice AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


class ExtractRequest(BaseModel):
    text: str
    fileType: str = "pdf"


class MatchRequest(BaseModel):
    extracted: dict
    clientId: str


class ValidateRequest(BaseModel):
    timesheetId: str
    extracted: dict
    clientId: str
    employeeId: Optional[str] = None


class FraudRequest(BaseModel):
    timesheetId: str
    extracted: dict
    fileHash: Optional[str] = None


class ExplainReviewRequest(BaseModel):
    reviewType: str = "review"
    extracted: dict = {}
    fieldConfidence: dict = {}
    overallConfidence: Optional[float] = None
    confidenceThreshold: Optional[float] = None
    failedValidation: Optional[list] = None
    fraudReasons: Optional[list] = None
    fraudRiskLevel: Optional[str] = None
    fraudScore: Optional[float] = None
    ambiguityReasons: Optional[list] = None
    flaggedFields: Optional[list] = None
    matchCandidates: Optional[list] = None


class ExplainRequest(BaseModel):
    ruleKey: str
    context: dict


class ChatRequest(BaseModel):
    message: str
    userId: str
    role: str
    clientId: Optional[str] = None
    history: Optional[list] = None


@app.get("/api/health")
async def health():
    return {"status": "healthy", "service": "tia-ai", "aiProvider": ai_provider()}


@app.post("/api/ocr")
async def ocr_endpoint(file: UploadFile = File(...)):
    content = await file.read()
    result = await run_ocr(content, file.filename or "document", file.content_type or "")
    return result


@app.post("/api/extract")
async def extract_endpoint(req: ExtractRequest):
    return await extract_timesheet(req.text, req.fileType)


@app.post("/api/match-employee")
async def match_endpoint(req: MatchRequest):
    return await match_employee(req.extracted, req.clientId)


@app.post("/api/validate")
async def validate_endpoint(req: ValidateRequest):
    return await validate_timesheet(req.timesheetId, req.extracted, req.clientId, req.employeeId)


@app.post("/api/fraud-detect")
async def fraud_endpoint(req: FraudRequest):
    return await detect_fraud(req.timesheetId, req.extracted, req.fileHash)


@app.post("/api/explain-review")
async def explain_review_endpoint(req: ExplainReviewRequest):
    return explain_review_summary(req.model_dump())


@app.post("/api/enhance-review")
async def enhance_review_endpoint(req: ExplainReviewRequest):
    return await enhance_review_summary(req.model_dump())


@app.post("/api/explain")
async def explain_endpoint(req: ExplainRequest):
    return await explain_flag(req.ruleKey, req.context)


@app.post("/api/chat")
async def chat_endpoint(req: ChatRequest):
    return await chat(req.message, req.userId, req.role, req.clientId, req.history)
