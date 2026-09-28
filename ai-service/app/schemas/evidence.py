from typing import List

from pydantic import BaseModel, Field


class SelectedEvidence(BaseModel):

    projects: List[str] = Field(
        default_factory=list
    )

    experience: List[str] = Field(
        default_factory=list
    )

    skills: List[str] = Field(
        default_factory=list
    )

    achievements: List[str] = Field(
        default_factory=list
    )

    education: List[str] = Field(
        default_factory=list
    )

    certifications: List[str] = Field(
        default_factory=list
    )

    codingProfiles: List[str] = Field(
        default_factory=list
    )