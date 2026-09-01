from typing import Dict

from app.schemas.evidence import SelectedEvidence


def resolve_selected_evidence(
    selected: SelectedEvidence,
    evidence: Dict
) -> Dict:

    resolved = {}

    sections = [
        "projects",
        "experience",
        "skills",
        "achievements",
        "education",
        "certifications"
    ]

    for section in sections:

        selected_ids = set(
            getattr(
                selected,
                section
            )
        )

        resolved[section] = [
            item
            for item in evidence.get(
                section,
                []
            )
            if item.get("metadata", {}).get(
                "item_id"
            ) in selected_ids
        ]

    return resolved