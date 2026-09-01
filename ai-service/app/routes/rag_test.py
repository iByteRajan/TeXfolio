from fastapi import APIRouter, HTTPException

from app.schemas.request import (
    TailoringRequest
)

from app.services.rag.document_builder import (
    build_resume_documents
)

from app.services.rag.vector_store import (
    index_resume
)

from app.services.rag.rag_pipeline import (
    run_resume_rag
)

from app.services.tailoring.jd_parser import (
    parse_job_description
)


router = APIRouter(
    prefix="/api/rag",
    tags=["RAG"]
)


@router.post("/test")
async def test_rag(
    request: TailoringRequest
):

    try:

        # =============================================
        # 1. Build resume documents
        # =============================================

        documents = build_resume_documents(

            resume=
                request.master_resume,

            user_id=
                request.user_id,

            resume_id=
                request.resume_id
        )


        if not documents:

            raise HTTPException(

                status_code=400,

                detail=(
                    "Master resume contains "
                    "no usable information."
                )
            )


        # =============================================
        # 2. Index resume
        # =============================================

        index_resume(

            documents=
                documents,

            user_id=
                request.user_id,

            resume_id=
                request.resume_id
        )


        # =============================================
        # 3. Analyze JD
        # =============================================

        job_analysis = (
            parse_job_description(
                request.job_description
            )
        )


        # =============================================
        # 4. Run intelligent RAG
        # =============================================

        rag_result = run_resume_rag(

            job_analysis=
                job_analysis,

            user_id=
                request.user_id,

            resume_id=
                request.resume_id
        )


        # =============================================
        # 5. Return everything for debugging
        # =============================================

        return {

            "job_analysis":
                job_analysis.model_dump(),

            "retrieval_queries":
                rag_result["queries"],

            "retrieved_context":
                rag_result["context"]
        }


    except HTTPException:

        raise


    except Exception as error:

        print(
            "RAG error:",
            error
        )

        raise HTTPException(

            status_code=500,

            detail=str(error)
        )