from typing import List, Optional

from pydantic import BaseModel, Field


class PersonalInfo(BaseModel):

    name: str

    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None

    github: Optional[str] = None
    linkedin: Optional[str] = None
    portfolio: Optional[str] = None


class Education(BaseModel):

    institution: str

    degree: Optional[str] = None
    field: Optional[str] = None
    cgpa: Optional[str] = None

    description: Optional[str] = None


class Experience(BaseModel):

    role: str
    company: str

    location: Optional[str] = None

    bullets: List[str] = Field(
        default_factory=list
    )


class Project(BaseModel):

    name: str

    bullets: List[str] = Field(
        default_factory=list
    )

    technologies: List[str] = Field(
        default_factory=list
    )

    github: Optional[str] = None
    link: Optional[str] = None


class SkillGroup(BaseModel):

    category: str

    items: List[str] = Field(
        default_factory=list
    )


class Achievement(BaseModel):

    title: str

    description: Optional[str] = None


class Certification(BaseModel):

    name: str

    issuer: Optional[str] = None

    date: Optional[str] = None


class TailoredResume(BaseModel):

    personal: PersonalInfo

    summary: Optional[str] = None

    education: List[Education] = Field(
        default_factory=list
    )

    experience: List[Experience] = Field(
        default_factory=list
    )

    projects: List[Project] = Field(
        default_factory=list
    )

    skills: List[SkillGroup] = Field(
        default_factory=list
    )

    achievements: List[Achievement] = Field(
        default_factory=list
    )

    certifications: List[Certification] = Field(
        default_factory=list
    )

class RAGResponse(BaseModel):

    queries: dict

    context: dict

class TailoringResponse(BaseModel):

    tailored_resume: TailoredResume

    jd_analysis: dict

    rag: RAGResponse

