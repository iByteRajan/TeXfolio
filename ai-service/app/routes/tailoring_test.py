from fastapi import APIRouter, HTTPException

from app.schemas.request import TailoringRequest

from app.services.rag.document_builder import (
    build_resume_documents
)

from app.services.rag.vector_store import (
    index_resume
)

from app.services.tailoring.tailoring_pipeline import (
    run_tailoring_pipeline
)


router = APIRouter(
    prefix="/api/tailoring",
    tags=["Tailoring"]
)


@router.post("/test")
async def test_tailoring(
    request: TailoringRequest
):

    try:

        # ==========================================
        # 1. Build resume documents
        # ==========================================

        documents = build_resume_documents(

            resume=request.master_resume,

            user_id=request.user_id,

            resume_id=request.resume_id
        )


        if not documents:

            raise HTTPException(

                status_code=400,

                detail=(
                    "Master resume contains "
                    "no usable information."
                )
            )


        # ==========================================
        # 2. Index master resume
        # ==========================================

        index_resume(

            documents=documents,

            user_id=request.user_id,

            resume_id=request.resume_id
        )


        # ==========================================
        # 3. Run complete tailoring pipeline
        # ==========================================

        result = run_tailoring_pipeline(
            job_description=request.job_description,
            user_id=request.user_id,
            resume_id=request.resume_id,
            config=(
                request.config.model_dump()
                if hasattr(request.config, "model_dump")
                else request.config
            ),
            master_resume=request.master_resume
        )


        # ==========================================
        # 4. Return complete debug response
        # ==========================================

        return {
            "job_analysis": result["job_analysis"].model_dump(),
            "retrieval_queries": result["retrieval_queries"],
            "retrieved_context": result["retrieved_context"],
            "selected_evidence": result["selected_evidence"].model_dump(),
            "resolved_evidence": result["resolved_evidence"],
            "tailored_resume": result["tailored_resume"].model_dump()
        }


    except HTTPException:

        raise


    except Exception as error:

        print(
            "Tailoring error:",
            error
        )

        raise HTTPException(

            status_code=500,

            detail=str(error)
        )