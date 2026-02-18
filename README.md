# ResumeGen AI 📄✨

ResumeGen is a high-performance, AI-powered resume builder that allows users to create professional, ATS-optimized resumes in minutes. It features a curated gallery of **130+ template presets**, including official formats for top companies like **Google, Amazon, and McKinsey**.

## 🚀 Key Features

- **🎨 Template Gallery:** 130+ distinctive template presets. Systematic combinations of layouts (Modern, Classic, Executive, Minimalist, Creative) with premium color palettes and typography.
- **🏢 Company-Specific Formats:** One-click presets for FAANG, Consulting, and Finance roles.
- **✨ AI Content Polishing:** Integrated with **Groq (Llama 3.3)** to polish job descriptions and generate professional summaries instantly.
- **📥 Multi-Format Export:** Download your resume as a perfectly styled **PDF** or an editable **DOCX** file.
- **⚡ Live Preview:** Real-time visual feedback as you edit your data and swap styles.
- **📱 Premium UI:** Modern, responsive interface built with Tailwind CSS v4.

## 🛠️ Tech Stack

- **Frontend:** React (Vite), Tailwind CSS v4, Axios.
- **Backend:** FastAPI (Python 3.11+), Uvicorn.
- **AI:** Groq API (Llama 3.3 70B model).
- **Document Generation:** FPDF2 (PDF) & Python-Docx (DOCX).

## 🏃 Getting Started

### Prerequisites
- Python 3.11+
- Node.js 18+
- Groq API Key (Get it from [console.groq.com](https://console.groq.com/))

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # venv\Scripts\activate on Windows
pip install -r requirements.txt
```
Create a `.env` file in the `backend/` folder:
```env
GROQ_API_KEY=your_api_key_here
```
Start the server:
```bash
python main.py
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📄 License
MIT License - Created for professional use.
