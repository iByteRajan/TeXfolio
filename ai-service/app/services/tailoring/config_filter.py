def is_section_enabled(
    config,
    section: str
) -> bool:

    sections = config.get(
        "sections",
        {}
    )

    return sections.get(
        section,
        True
    )


def get_section_limit(
    config,
    section: str
):

    limits = config.get(
        "limits",
        {}
    )

    return limits.get(
        section
    )