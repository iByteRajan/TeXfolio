from langchain_openai import ChatOpenAI

from app.schemas.evidence import (
    SelectedEvidence
)

from app.services.tailoring.prompts import (
    build_evidence_selection_prompt
)


def select_evidence(
    job_analysis,
    evidence,
    config
) -> SelectedEvidence:

    llm = ChatOpenAI(
        model="gpt-5.6-luna",
        temperature=0
    )

    structured_llm = (
        llm.with_structured_output(
            SelectedEvidence
        )
    )

    prompt = (
        build_evidence_selection_prompt(
            job_analysis,
            evidence,
            config
        )
    )

    result = structured_llm.invoke(
        prompt
    )

    return result