from typing import List

from langchain_chroma import Chroma
from langchain_core.documents import Document

from app.config import settings
from app.services.rag.embeddings import (
    get_embeddings
)


COLLECTION_NAME = "resume_documents"


def get_vector_store():

    embeddings = get_embeddings()


    return Chroma(

        collection_name=
            COLLECTION_NAME,

        embedding_function=
            embeddings,

        host=
            settings.CHROMA_HOST,

        port=
            settings.CHROMA_PORT
    )


def delete_resume_documents(
    vector_store: Chroma,
    user_id: str,
    resume_id: str
):

    vector_store.delete(

        where={
            "$and": [
                {
                    "user_id": user_id
                },
                {
                    "resume_id": resume_id
                }
            ]
        }
    )


def index_resume(
    documents: List[Document],
    user_id: str,
    resume_id: str
):

    vector_store = (
        get_vector_store()
    )


    # ------------------------------------------------
    # Remove the old version of this resume.
    #
    # This prevents duplicate documents when the
    # user generates the resume multiple times.
    # ------------------------------------------------

    delete_resume_documents(
        vector_store,
        user_id,
        resume_id
    )


    if not documents:

        return vector_store


    # ------------------------------------------------
    # Generate deterministic IDs.
    #
    # Same resume item always gets the same vector ID.
    # ------------------------------------------------

    document_ids = []


    for document in documents:

        section = document.metadata.get(
            "section",
            "unknown"
        )

        item_id = document.metadata.get(
            "item_id",
            "unknown"
        )


        document_id = (
            f"{user_id}:"
            f"{resume_id}:"
            f"{section}:"
            f"{item_id}"
        )


        document_ids.append(
            document_id
        )


    vector_store.add_documents(

        documents=documents,

        ids=document_ids
    )


    return vector_store