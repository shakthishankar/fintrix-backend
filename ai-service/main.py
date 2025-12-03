from fastapi import FastAPI
from pydantic import BaseModel
from typing import List

app = FastAPI()

class Lead(BaseModel):
    lead_id: int
    name: str

class RequestBody(BaseModel):
    org_id: int
    leads: List[Lead]
@app.get("/health")
def health():
    return {"status": "ai-service-running"}

@app.post("/recommend")
def recommend(body: RequestBody):
    # Simple example logic (not ML)
    results = []
    for lead in body.leads:
        score = (lead.lead_id % 100) / 100
        results.append({"lead_id": lead.lead_id, "score": score})

    return {"lead_scores": results}
