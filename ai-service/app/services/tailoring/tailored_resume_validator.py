from app.schemas.tailored_resume import TailoredResume


def validate_tailored_resume(
    tailored: TailoredResume,
    selected_evidence: dict,
    config: dict
) -> TailoredResume:

    # --------------------------------------------------
    # Allowed source IDs
    # --------------------------------------------------

    allowed_ids = {}

    sections = [
        "projects",
        "experience",
        "skills",
        "achievements",
        "education",
        "certifications"
    ]

    for section in sections:

        allowed_ids[section] = {
            item.get("metadata", {}).get("item_id")
            for item in selected_evidence.get(
                section,
                []
            )
        }

    # --------------------------------------------------
    # Remove disabled sections
    # --------------------------------------------------

    for section in sections:

        enabled = (
            config
            .get("sections", {})
            .get(section, True)
        )

        if not enabled:

            if hasattr(tailored, section):

                if section == "skills":
                    setattr(
                        tailored,
                        section,
                        []
                    )
                else:
                    setattr(
                        tailored,
                        section,
                        []
                    )

    # --------------------------------------------------
    # Validate source IDs
    # --------------------------------------------------

    tailored.projects = [
        item
        for item in tailored.projects
        if item.source_id in allowed_ids["projects"]
    ]

    tailored.experience = [
        item
        for item in tailored.experience
        if item.source_id in allowed_ids["experience"]
    ]

    tailored.achievements = [
        item
        for item in tailored.achievements
        if item.source_id in allowed_ids["achievements"]
    ]

    tailored.education = [
        item
        for item in tailored.education
        if item.source_id in allowed_ids["education"]
    ]

    tailored.certifications = [
        item
        for item in tailored.certifications
        if item.source_id in allowed_ids["certifications"]
    ]

    # --------------------------------------------------
    # Skills require special handling
    # --------------------------------------------------

    allowed_skill_ids = allowed_ids["skills"]

    tailored.skills = [
        item
        for item in tailored.skills
        if item.source_id in allowed_skill_ids
    ]

    # --------------------------------------------------
    # Apply limits again
    # --------------------------------------------------

    limits = config.get(
        "limits",
        {}
    )

    tailored.projects = tailored.projects[
        :limits.get("projects", len(tailored.projects))
    ]

    tailored.experience = tailored.experience[
        :limits.get("experience", len(tailored.experience))
    ]

    tailored.achievements = tailored.achievements[
        :limits.get(
            "achievements",
            len(tailored.achievements)
        )
    ]

    tailored.certifications = tailored.certifications[
        :limits.get(
            "certifications",
            len(tailored.certifications)
        )
    ]

    return tailored