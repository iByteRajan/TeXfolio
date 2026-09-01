from app.services.rag.query_generator import (
    generate_retrieval_queries
)

from app.services.rag.retriever import (
    retrieve_multi_query,
    deduplicate_documents
)

from app.services.rag.context_builder import (
    build_retrieval_context
)


def run_resume_rag(
    job_analysis,
    user_id: str,
    resume_id: str
):

    # =================================================
    # 1. Generate specialized search queries
    # =================================================

    retrieval_queries = (
        generate_retrieval_queries(
            job_analysis
        )
    )


    # =================================================
    # 2. Retrieve documents for each section
    # =================================================

    results = retrieve_multi_query(

        queries=
            retrieval_queries,

        user_id=
            user_id,

        resume_id=
            resume_id,

        k_per_query=3
    )


    # =================================================
    # 3. Deduplicate each section
    # =================================================

    for section in results:

        results[section] = (
            deduplicate_documents(
                results[section]
            )
        )


    # =================================================
    # 4. Convert into LLM-friendly context
    # =================================================

    context = (
        build_retrieval_context(
            results
        )
    )


    return {

        "queries":
            retrieval_queries.model_dump(),

        "context":
            context
    }