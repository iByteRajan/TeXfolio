from app.schemas.retrieval import (
    RetrievalQueries
)

from app.services.tailoring.prompts import (
    build_retrieval_queries_prompt
)

from langchain_openai import ChatOpenAI


def generate_retrieval_queries(
    job_analysis
) -> RetrievalQueries:

    llm = ChatOpenAI(
        model="gpt-5.6-luna",
        temperature=0
    )

    structured_llm = (
        llm.with_structured_output(
            RetrievalQueries
        )
    )

    prompt = (
        build_retrieval_queries_prompt(
            job_analysis
        )
    )

    result = structured_llm.invoke(
        prompt
    )

    return result