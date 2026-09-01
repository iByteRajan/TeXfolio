from app.services.tailoring.evidence_selector import (
    select_evidence
)

from app.services.tailoring.evidence_validator import (
    validate_selected_evidence
)


def run_evidence_selection(
    job_analysis,
    evidence,
    config
):

    selected = select_evidence(

        job_analysis=
            job_analysis,

        evidence=
            evidence,

        config=
            config
    )

    selected = validate_selected_evidence(

        selected=
            selected,

        evidence=
            evidence,

        config=
            config
    )

    return selected