from typing import Dict

from app.services.tailoring.config_filter import (
    is_section_enabled
)


def prepare_evidence(
    context: Dict,
    config: Dict
) -> Dict:

    prepared = {}

    sections = [
        "projects",
        "experience",
        "skills",
        "achievements",
        "education",
        "certifications",
        "codingProfiles"
    ]

    for section in sections:

        if not is_section_enabled(
            config,
            section
        ):
            prepared[section] = []
            continue

        prepared[section] = context.get(
            section,
            []
        )

    return prepared