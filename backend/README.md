# TribalSQL — FastAPI Backend

Institutional Database Intelligence API for Bengaluru 4.0 Hackathon.

## Quickstart

### 1. Create a Virtual Environment & Install Dependencies
```bash
python -m venv venv
# Windows:
.\venv\Scripts\activate
# Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
```

### 2. Configure Environment (.env)
Create a `.env` file in `backend/`:
```env
GROQ_API_KEY=your_groq_api_key_here
GROQ_MODEL=qwen-2.5-coder-32b
HINDSIGHT_API_KEY=your_hindsight_key_here
POSTGRES_URI=postgresql://user:password@localhost:5432/novamart_prod_db
```

### 3. Run Development Server
```bash
uvicorn main:app --reload --port 8000
```

Interactive API documentation available at:
- Swagger UI: `http://localhost:8000/docs`
- OpenAPI JSON: `http://localhost:8000/openapi.json`
