from fastapi import APIRouter, HTTPException

from pydantic import BaseModel

from app.services.tailoring.jd_parser import (
    parse_job_description
)


router = APIRouter(
    prefix="/api/jd",
    tags=["Job Description"]
)


class JDRequest(BaseModel):

    job_description: str


@router.post("/analyze")
async def analyze_job_description(
    request: JDRequest
):

    try:

        analysis = (
            parse_job_description(
                request.job_description
            )
        )


        return analysis.model_dump()


    except Exception as error:

        raise HTTPException(

            status_code=500,

            detail=str(error)
        )