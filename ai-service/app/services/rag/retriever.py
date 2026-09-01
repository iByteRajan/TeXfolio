from typing import Dict, List

from langchain_core.documents import Document

from app.services.rag.vector_store import (
    get_vector_store
)


def retrieve_section(
    vector_store,
    query: str,
    section: str,
    user_id: str,
    resume_id: str,
    k: int = 3
) -> List[Document]:

    if not query.strip():
        return []

    results = (
        vector_store.similarity_search(
            query=query,
            k=k,
            filter={
                "$and": [
                    {
                        "user_id": user_id
                    },
                    {
                        "resume_id": resume_id
                    },
                    {
                        "section": section
                    }
                ]
            }
        )
    )

    return results


def retrieve_multi_query(
    queries,
    user_id: str,
    resume_id: str,
    k_per_query: int = 3
) -> Dict[str, List[Document]]:

    vector_store = (
        get_vector_store()
    )

    results = {
        "projects": [],
        "experience": [],
        "skills": [],
        "achievements": [],
        "education": []
    }

    for section in results.keys():

        section_queries = getattr(
            queries,
            section,
            []
        )

        for query in section_queries:

            documents = retrieve_section(

                vector_store=vector_store,

                query=query,

                section=section,

                user_id=user_id,

                resume_id=resume_id,

                k=k_per_query
            )

            results[section].extend(
                documents
            )

    return results


def deduplicate_documents(
    documents: List[Document]
) -> List[Document]:

    unique = {}

    for document in documents:

        item_id = document.metadata.get(
            "item_id"
        )

        section = document.metadata.get(
            "section"
        )

        key = (
            f"{section}:{item_id}"
        )

        if key not in unique:

            unique[key] = document

    return list(
        unique.values()
    )