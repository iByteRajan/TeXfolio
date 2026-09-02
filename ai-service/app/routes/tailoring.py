from fastapi import APIRouter, HTTPException
import traceback

from app.schemas.request import TailoringRequest
from app.schemas.response import TailoringResponse, RAGResponse

from app.services.rag.document_builder import build_resume_documents
from app.services.rag.vector_store import index_resume

from app.services.tailoring.tailoring_pipeline import (
    run_tailoring_pipeline
)


router = APIRouter(
    prefix="/api/tailoring",
    tags=["Tailoring"]
)


@router.post("/generate", response_model=TailoringResponse)
async def generate_tailored_resume(request: TailoringRequest):

    print("\n" + "=" * 60)
    print("TAILORING REQUEST STARTED")
    print("=" * 60)

    try:

        # --------------------------------------------------
        # STEP 1: Build resume documents
        # --------------------------------------------------

        print("\n[1] Building resume documents...")

        documents = build_resume_documents(
            resume=request.master_resume,
            user_id=request.user_id,
            resume_id=request.resume_id
        )

        print(f"[1] Documents created: {len(documents)}")

        if not documents:
            raise HTTPException(
                status_code=400,
                detail="Master resume contains no usable information."
            )


        # --------------------------------------------------
        # STEP 2: Index resume
        # --------------------------------------------------

        print("\n[2] Indexing resume...")

        index_resume(
            documents=documents,
            user_id=request.user_id,
            resume_id=request.resume_id
        )

        print("[2] Resume indexed successfully")


        # --------------------------------------------------
        # STEP 3: Run tailoring pipeline
        # --------------------------------------------------

        print("\n[3] Running tailoring pipeline...")

        result = run_tailoring_pipeline(
            job_description=request.job_description,
            user_id=request.user_id,
            resume_id=request.resume_id,
            config=request.config,
            master_resume=request.master_resume
        )

        print("[3] Tailoring pipeline completed successfully")


        # --------------------------------------------------
        # STEP 4: Build response
        # --------------------------------------------------

        print("\n[4] Building response...")

        response = TailoringResponse(
            tailored_resume=result["tailored_resume"],
            jd_analysis=result["job_analysis"].model_dump(),
            rag=RAGResponse(
                queries=result["retrieval_queries"],
                context=result["retrieved_context"]
            )
        )

        print("[4] Response built successfully")

        print("\n" + "=" * 60)
        print("TAILORING REQUEST SUCCESS")
        print("=" * 60)

        return response


    except HTTPException:
        raise


    except Exception as error:

        print("\n" + "=" * 60)
        print("TAILORING ERROR")
        print("=" * 60)

        print("Error type:", type(error).__name__)
        print("Error:", error)

        print("\nFULL TRACEBACK:")
        traceback.print_exc()

        print("=" * 60)

        raise HTTPException(
            status_code=500,
            detail=str(error)
        )