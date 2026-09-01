from fastapi import APIRouter, HTTPException

from app.schemas.request import (
    TailoringRequest
)

from app.schemas.response import (
    TailoringResponse
)

from app.services.rag.document_builder import (
    build_resume_documents
)

from app.services.rag.vector_store import (
    index_resume
)

from app.services.tailoring.jd_parser import (
    parse_job_description
)

from app.services.tailoring.resume_tailor import (
    tailor_resume
)

from app.services.rag.rag_pipeline import (
    run_resume_rag
)

router = APIRouter(
    prefix="/api/tailoring",
    tags=["Tailoring"]
)


@router.post(
    "/generate",
    response_model=TailoringResponse
)
async def generate_tailored_resume(
    request: TailoringRequest
):

    try:

        # =================================================
        # 1. Convert master resume into RAG documents
        # =================================================

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


        # =================================================
        # 2. Index the resume
        #
        # Old documents for this resume are removed first.
        # =================================================

        index_resume(

            documents=documents,

            user_id=request.user_id,

            resume_id=request.resume_id
        )


        # =================================================
        # 3. Analyze the Job Description
        # =================================================

        job_analysis = (
            parse_job_description(
                request.job_description
            )
        )


        # =================================================
        # 4. Build retrieval query
        # =================================================

        rag_result = run_resume_rag(

            job_analysis=
                job_analysis,

            user_id=
                request.user_id,

            resume_id=
                request.resume_id
        )

        relevant_documents = (
            rag_result["context"]
        )



        # =================================================
        # 6. Tailor the resume
        # =================================================

        tailored_resume = (

            tailor_resume(

                job_description=
                    request.job_description,

                job_analysis=
                    job_analysis,

                relevant_documents=
                    relevant_documents,

                config=
                    request.config
            )
        )


        # =================================================
        # 7. Return result
        # =================================================

        return TailoringResponse(

            tailored_resume=
                tailored_resume,

            jd_analysis=
                job_analysis.model_dump(),

            rag=RAGResponse(

                queries=
                    rag_result["queries"],

                context=
                    rag_result["context"]
            )
        )


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