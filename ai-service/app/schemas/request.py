from typing import Any, Dict, List, Optional

from pydantic import BaseModel, Field


class SectionConfig(BaseModel):

    summary: bool = True
    education: bool = True
    experience: bool = True
    projects: bool = True
    skills: bool = True
    achievements: bool = True
    certifications: bool = True
    codingProfiles: bool = True


class ResumeLimits(BaseModel):

    projects: Optional[int] = None
    experience: Optional[int] = None
    achievements: Optional[int] = None
    certifications: Optional[int] = None
    codingProfiles: Optional[int] = None


class ResumeConfig(BaseModel):

    sections: SectionConfig = Field(
        default_factory=SectionConfig
    )

    limits: ResumeLimits = Field(
        default_factory=ResumeLimits
    )

    target_pages: int = 1

    instructions: List[str] = Field(
        default_factory=list
    )


class TailoringRequest(BaseModel):

    # Identifies the owner of the resume
    user_id: str

    # Identifies the specific master resume
    resume_id: str

    # Job description supplied by the user
    job_description: str

    # Complete master resume from MongoDB
    master_resume: Dict[str, Any]

    # User's tailoring preferences
    config: ResumeConfig