from typing import List, Optional

from pydantic import BaseModel, Field


class JobAnalysis(BaseModel):

    job_title: Optional[str] = None

    seniority: Optional[str] = None

    required_skills: List[str] = Field(
        default_factory=list
    )

    preferred_skills: List[str] = Field(
        default_factory=list
    )

    responsibilities: List[str] = Field(
        default_factory=list
    )

    keywords: List[str] = Field(
        default_factory=list
    )

    soft_skills: List[str] = Field(
        default_factory=list
    )

    experience_requirements: List[str] = Field(
        default_factory=list
    )

    education_requirements: List[str] = Field(
        default_factory=list
    )

    technologies: List[str] = Field(
        default_factory=list
    )