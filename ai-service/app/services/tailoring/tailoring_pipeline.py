from app.services.tailoring.jd_parser import parse_job_description
from app.services.rag.rag_pipeline import run_resume_rag
from app.services.tailoring.evidence import prepare_evidence
from app.services.tailoring.selection_pipeline import run_evidence_selection
from app.services.tailoring.selected_evidence_resolver import (
    resolve_selected_evidence
)
from app.services.tailoring.resume_tailor import tailor_resume
from app.services.tailoring.tailored_resume_validator import (
    validate_tailored_resume
)

def run_tailoring_pipeline(
    job_description,
    user_id,
    resume_id,
    config,
    master_resume
):

    # ==========================================
    # 1. Analyze job description
    # ==========================================

    job_analysis = (
        parse_job_description(
            job_description
        )
    )


    # ==========================================
    # 2. Retrieve candidate evidence
    # ==========================================

    rag_result = run_resume_rag(

        job_analysis=
            job_analysis,

        user_id=
            user_id,

        resume_id=
            resume_id
    )


    # ==========================================
    # 3. Apply deterministic config filters
    # ==========================================

    evidence = prepare_evidence(

        context=
            rag_result["context"],

        config=
            config
    )


    # ==========================================
    # 4. Select relevant evidence
    # ==========================================

    selected_evidence = run_evidence_selection(
        job_analysis=job_analysis,
        evidence=evidence,
        config=config
    )


    # ==========================================
    # 5. Resolve Selected Evidence
    # ==========================================

    resolved_evidence = resolve_selected_evidence(
        selected=selected_evidence,
        evidence=evidence
    )


    # ==========================================
    # 6. Tailor resume
    # ==========================================

    tailored_resume = tailor_resume(
        job_analysis=job_analysis,
        selected_evidence=resolved_evidence,
        config=config,
        original_summary=master_resume.get("summary")
    )

    tailored_resume = validate_tailored_resume(
        tailored=tailored_resume,
        selected_evidence=resolved_evidence,
        config=config
    )


    return {
    "job_analysis": job_analysis,
    "retrieval_queries": rag_result["queries"],
    "retrieved_context": evidence,
    "selected_evidence": selected_evidence,
    "resolved_evidence": resolved_evidence,
    "tailored_resume": tailored_resume
}