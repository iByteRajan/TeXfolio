from langchain_openai import ChatOpenAI

from app.schemas.jd import JobAnalysis

from app.services.tailoring.prompts import (
    build_jd_analysis_prompt
)


def parse_job_description(
    job_description: str
) -> JobAnalysis:

    if not job_description.strip():

        raise ValueError(
            "Job description cannot be empty."
        )


    llm = ChatOpenAI(

        model="gpt-5.6-luna",

        temperature=0
    )


    structured_llm = (
        llm.with_structured_output(
            JobAnalysis
        )
    )


    prompt = (
        build_jd_analysis_prompt(
            job_description
        )
    )


    result = structured_llm.invoke(
        prompt
    )


    return result