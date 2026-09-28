from app.schemas.tailored_resume import TailoredResume


# Sections that can be controlled by the user.
CONTENT_SECTIONS = [
    "projects",
    "experience",
    "skills",
    "achievements",
    "education",
    "certifications",
    "codingProfiles",
]


# Sections for which a numeric limit is supported.
LIMITED_SECTIONS = [
    "projects",
    "experience",
    "achievements",
    "certifications",
    "codingProfiles",
]


def _build_allowed_ids(
    selected_evidence: dict
) -> dict:
    """
    Build a mapping:

        section -> set of allowed source/item IDs

    Only IDs present in selected_evidence are allowed
    in the final tailored resume.
    """

    allowed_ids = {}

    for section in CONTENT_SECTIONS:

        evidence_items = selected_evidence.get(
            section,
            []
        )

        allowed_ids[section] = {
            item.get("metadata", {}).get("item_id")
            for item in evidence_items
            if item.get("metadata", {}).get("item_id")
        }

    return allowed_ids


def _get_sections_config(
    config: dict
) -> dict:
    """
    Read section configuration.

    Missing section configuration defaults to True
    so older configurations remain compatible.
    """

    return config.get(
        "sections",
        {}
    )


def _get_limits_config(
    config: dict
) -> dict:
    """
    Read resume limits.

    Missing limits default to an empty dictionary.
    """

    return config.get(
        "limits",
        {}
    )


def _validate_limit(
    section: str,
    value
) -> int | None:
    """
    Validate a single numeric limit.

    None means:
        no limit

    0 means:
        include zero items

    Negative values are rejected because they are
    invalid resume configuration.
    """

    if value is None:
        return None

    try:
        value = int(value)
    except (TypeError, ValueError):
        raise ValueError(
            f"Invalid limit for '{section}': {value}"
        )

    if value < 0:
        raise ValueError(
            f"Limit for '{section}' cannot be negative"
        )

    return value


def _apply_limit(
    items: list,
    limit: int | None
) -> list:
    """
    Apply a deterministic limit.

    None -> no limit
    0    -> empty list
    n    -> first n items
    """

    if limit is None:
        return items

    return items[:limit]


def validate_tailored_resume(
    tailored: TailoredResume,
    selected_evidence: dict,
    config: dict
) -> TailoredResume:

    # ==================================================
    # 1. BUILD ALLOWED SOURCE IDS
    # ==================================================

    allowed_ids = _build_allowed_ids(
        selected_evidence
    )

    sections_config = _get_sections_config(
        config
    )

    limits_config = _get_limits_config(
        config
    )

    # ==================================================
    # 2. ENFORCE SECTION CONFIGURATION
    # ==================================================
    #
    # The LLM does NOT get the final say here.
    #
    # If the user disables a section, it is removed
    # regardless of what the LLM returned.
    #

    for section in CONTENT_SECTIONS:

        enabled = sections_config.get(
            section,
            True
        )

        if not enabled:

            setattr(
                tailored,
                section,
                []
            )

    # Summary is special because it is a string,
    # not a list.

    if not sections_config.get(
        "summary",
        True
    ):
        tailored.summary = None

    # ==================================================
    # 3. VALIDATE SOURCE IDS
    # ==================================================
    #
    # Every generated item must correspond to an item
    # that was actually selected as evidence.
    #

    tailored.projects = [
        item
        for item in tailored.projects
        if item.source_id
        in allowed_ids["projects"]
    ]

    tailored.experience = [
        item
        for item in tailored.experience
        if item.source_id
        in allowed_ids["experience"]
    ]

    tailored.skills = [
        item
        for item in tailored.skills
        if item.source_id
        in allowed_ids["skills"]
    ]

    tailored.achievements = [
        item
        for item in tailored.achievements
        if item.source_id
        in allowed_ids["achievements"]
    ]

    tailored.education = [
        item
        for item in tailored.education
        if item.source_id
        in allowed_ids["education"]
    ]

    tailored.certifications = [
        item
        for item in tailored.certifications
        if item.source_id
        in allowed_ids["certifications"]
    ]

    tailored.codingProfiles = [
        item
        for item in tailored.codingProfiles
        if item.source_id
        in allowed_ids["codingProfiles"]
    ]

    # ==================================================
    # 4. VALIDATE AND APPLY LIMITS
    # ==================================================
    #
    # These limits are enforced AFTER the LLM response.
    #
    # Therefore the LLM cannot bypass them.
    #

    for section in LIMITED_SECTIONS:

        limit = _validate_limit(
            section,
            limits_config.get(section)
        )

        current_items = getattr(
            tailored,
            section
        )

        setattr(
            tailored,
            section,
            _apply_limit(
                current_items,
                limit
            )
        )

    # ==================================================
    # 5. FINAL SECTION SAFETY CHECK
    # ==================================================
    #
    # Re-apply disabled sections after limits.
    #
    # This is intentionally redundant.
    #
    # Configuration should always win.
    #

    for section in CONTENT_SECTIONS:

        if not sections_config.get(
            section,
            True
        ):
            setattr(
                tailored,
                section,
                []
            )

    if not sections_config.get(
        "summary",
        True
    ):
        tailored.summary = None

    # ==================================================
    # 6. RETURN FINAL RESUME
    # ==================================================

    return tailored