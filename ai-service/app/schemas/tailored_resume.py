from typing import List, Optional

from pydantic import BaseModel, Field


class TailoredExperience(BaseModel):

    source_id: str

    role: str

    company: str

    location: Optional[str] = None

    bullets: List[str] = Field(
        default_factory=list
    )


class TailoredProject(BaseModel):

    source_id: str

    name: str

    description: Optional[str] = None

    technologies: List[str] = Field(
        default_factory=list
    )

    bullets: List[str] = Field(
        default_factory=list
    )


class TailoredAchievement(BaseModel):

    source_id: str

    title: str

    description: Optional[str] = None


class TailoredEducation(BaseModel):

    source_id: str

    institution: str

    degree: str

    field: Optional[str] = None

    cgpa: Optional[str] = None


class TailoredSkills(BaseModel):
    source_id: str
    category: str
    items: List[str] = Field(default_factory=list)

class TailoredCertification(BaseModel):
    source_id: str
    name: str
    issuer: Optional[str] = None
    date: Optional[str] = None
    description: Optional[str] = None


class TailoredCodingProfile(BaseModel):
    source_id: str
    platform: str
    username: str
    url: Optional[str] = None
    rating: Optional[int] = None
    maxRating: Optional[int] = None
    problemsSolved: Optional[int] = None
    contestsParticipated: Optional[int] = None


class TailoredResume(BaseModel):

    summary: Optional[str] = None

    experience: List[
        TailoredExperience
    ] = Field(
        default_factory=list
    )

    projects: List[
        TailoredProject
    ] = Field(
        default_factory=list
    )

    skills: List[
        TailoredSkills
    ] = Field(
        default_factory=list
    )

    achievements: List[
        TailoredAchievement
    ] = Field(
        default_factory=list
    )

    education: List[
        TailoredEducation
    ] = Field(
        default_factory=list
    )

    certifications: List[TailoredCertification] = Field(
        default_factory=list
    )

    codingProfiles: List[TailoredCodingProfile] = Field(
        default_factory=list
    )