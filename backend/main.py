from fastapi import FastAPI, UploadFile, BackgroundTasks, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import Response, StreamingResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from utils.pdf_generator import generate_pdf
from utils.docx_generator import generate_docx
from services.ai_service import get_ai_response
import io

app = FastAPI(title="Resume Generator API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class PersonalInfo(BaseModel):
    fullName: Optional[str] = None
    jobTitle: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    website: Optional[str] = None
    summary: Optional[str] = None

class Experience(BaseModel):
    title: str
    company: str
    date: str
    description: str

class ResumeData(BaseModel):
    personal: PersonalInfo
    experience: List[Experience] = []
    education: List[Dict[str, str]] = []
    skills: List[str] = []
    template: str = "modern"

class TextRequest(BaseModel):
    text: str

@app.get("/")
def read_root():
    return {"message": "Welcome to Resume Generator API"}

@app.post("/generate/pdf")
async def create_pdf(data: ResumeData):
    try:
        pdf_bytes = generate_pdf(data.dict(), data.template)
        return Response(content=pdf_bytes, media_type="application/pdf", headers={"Content-Disposition": "attachment; filename=resume.pdf"})
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate/docx")
async def create_docx(data: ResumeData):
    try:
        docx_stream = generate_docx(data.dict(), data.template)
        return StreamingResponse(
            docx_stream, 
            media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
            headers={"Content-Disposition": "attachment; filename=resume.docx"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/ai/optimize")
async def optimize_text(request: TextRequest):
    try:
        prompt = f"Please polish and improve the following text to be more professional and impactful for a resume:\n\n{request.text}"
        optimized = get_ai_response(prompt)
        return {"optimized_text": optimized}
    except Exception as e:
        # Fallback if AI fails or no key
        return {"optimized_text": request.text, "error": str(e)}

@app.post("/ai/summary")
async def generate_summary(data: ResumeData):
    try:
        # Construct context from data
        context = f"Name: {data.personal.fullName}, Job: {data.personal.jobTitle}. "
        if data.experience:
            context += "Experience: " + ", ".join([f"{e.title} at {e.company}" for e in data.experience])
        
        prompt = f"Write a professional resume summary (around 3-4 sentences) for this candidate: {context}"
        summary = get_ai_response(prompt)
        return {"summary": summary}
    except Exception as e:
        return {"summary": "", "error": str(e)}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
