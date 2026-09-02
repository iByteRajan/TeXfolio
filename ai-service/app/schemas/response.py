from typing import Dict, Any

from pydantic import BaseModel

from app.schemas.tailored_resume import (
    TailoredResume
)


class RAGResponse(BaseModel):

    queries: Dict[str, Any]

    context: Dict[str, Any]


class TailoringResponse(BaseModel):

    tailored_resume: TailoredResume

    jd_analysis: Dict[str, Any]

    rag: RAGResponse