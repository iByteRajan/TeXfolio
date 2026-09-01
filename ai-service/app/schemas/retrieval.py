from typing import List

from pydantic import BaseModel, Field


class RetrievalQueries(BaseModel):

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