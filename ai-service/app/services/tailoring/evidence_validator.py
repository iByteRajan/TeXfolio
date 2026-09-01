from app.schemas.evidence import SelectedEvidence


def validate_selected_evidence(
    selected: SelectedEvidence,
    evidence: dict,
    config: dict
) -> SelectedEvidence:

    sections = [
        "projects",
        "experience",
        "skills",
        "achievements",
        "education",
        "certifications"
    ]

    for section in sections:

        available_ids = {
            item.get("metadata", {}).get("item_id")
            for item in evidence.get(section, [])
        }

        selected_ids = getattr(
            selected,
            section
        )

        # Remove invalid IDs
        selected_ids = [
            item_id
            for item_id in selected_ids
            if item_id in available_ids
        ]

        # Respect section limit
        limit = (
            config
            .get("limits", {})
            .get(section)
        )

        if limit is not None:
            selected_ids = selected_ids[:limit]

        # Respect section enable/disable
        enabled = (
            config
            .get("sections", {})
            .get(section, True)
        )

        if not enabled:
            selected_ids = []

        setattr(
            selected,
            section,
            selected_ids
        )

    return selected