from typing import Any, Dict, List

from langchain_core.documents import Document


def _clean(value: Any) -> str:
    """
    Convert a value into a clean string.
    """

    if value is None:
        return ""

    if isinstance(value, list):
        return ", ".join(
            str(item)
            for item in value
            if item
        )

    return str(value).strip()


def _get_id(item: Dict[str, Any]) -> str:
    """
    Extract MongoDB _id safely.
    """

    return str(
        item.get("_id", "")
    )


def build_resume_documents(
    resume: Dict[str, Any],
    user_id: str,
    resume_id: str
) -> List[Document]:

    documents: List[Document] = []


    # =====================================================
    # SUMMARY
    # =====================================================

    summary = _clean(
        resume.get("summary")
    )

    if summary:

        documents.append(
            Document(

                page_content=(
                    f"Resume Summary:\n"
                    f"{summary}"
                ),

                metadata={
                    "user_id": user_id,
                    "resume_id": resume_id,
                    "section": "summary",
                    "item_id": "summary"
                }
            )
        )


    # =====================================================
    # EXPERIENCE
    # =====================================================

    experiences = resume.get(
        "experience",
        []
    )

    if isinstance(experiences, list):

        for index, experience in enumerate(
            experiences
        ):

            if not isinstance(
                experience,
                dict
            ):
                continue


            role = _clean(
                experience.get("role")
            )

            company = _clean(
                experience.get("company")
            )

            location = _clean(
                experience.get("location")
            )

            bullets = experience.get(
                "bullets",
                []
            )

            if not isinstance(
                bullets,
                list
            ):
                bullets = [
                    str(bullets)
                ]


            content = "\n".join(
                filter(
                    None,
                    [
                        f"Role: {role}",
                        f"Company: {company}",
                        f"Location: {location}",
                        "Responsibilities:",
                        *[
                            str(b)
                            for b in bullets
                            if b
                        ]
                    ]
                )
            )


            if not content.strip():
                continue


            item_id = (
                _get_id(experience)
                or f"experience-{index}"
            )


            documents.append(
                Document(

                    page_content=content,

                    metadata={
                        "user_id": user_id,
                        "resume_id": resume_id,
                        "section": "experience",
                        "item_id": item_id,
                        "role": role,
                        "company": company
                    }
                )
            )


    # =====================================================
    # PROJECTS
    # =====================================================

    projects = resume.get(
        "projects",
        []
    )

    if isinstance(projects, list):

        for index, project in enumerate(
            projects
        ):

            if not isinstance(
                project,
                dict
            ):
                continue


            name = _clean(
                project.get("name")
            )

            description = _clean(
                project.get(
                    "description"
                )
            )

            technologies = project.get(
                "technologies",
                project.get(
                    "techStack",
                    []
                )
            )

            bullets = project.get(
                "bullets",
                []
            )


            if not isinstance(
                technologies,
                list
            ):
                technologies = [
                    technologies
                ]


            if not isinstance(
                bullets,
                list
            ):
                bullets = [
                    bullets
                ]


            content_parts = [
                f"Project: {name}"
            ]


            if description:

                content_parts.append(
                    f"Description: {description}"
                )


            if technologies:

                content_parts.append(
                    "Technologies: "
                    + ", ".join(
                        str(t)
                        for t in technologies
                        if t
                    )
                )


            if bullets:

                content_parts.append(
                    "Project Details:"
                )

                content_parts.extend(
                    str(b)
                    for b in bullets
                    if b
                )


            content = "\n".join(
                content_parts
            )


            if not content.strip():
                continue


            item_id = (
                _get_id(project)
                or f"project-{index}"
            )


            documents.append(
                Document(

                    page_content=content,

                    metadata={
                        "user_id": user_id,
                        "resume_id": resume_id,
                        "section": "projects",
                        "item_id": item_id,
                        "name": name
                    }
                )
            )


    # =====================================================
    # EDUCATION
    # =====================================================

    education = resume.get(
        "education",
        []
    )

    if isinstance(education, list):

        for index, item in enumerate(
            education
        ):

            if not isinstance(
                item,
                dict
            ):
                continue


            institution = _clean(
                item.get("institution")
            )

            degree = _clean(
                item.get("degree")
            )

            field = _clean(
                item.get("field")
            )

            cgpa = _clean(
                item.get("cgpa")
            )

            description = _clean(
                item.get("description")
            )


            content = "\n".join(
                filter(
                    None,
                    [
                        f"Institution: {institution}",
                        f"Degree: {degree}",
                        f"Field: {field}",
                        f"CGPA: {cgpa}",
                        f"Description: {description}"
                    ]
                )
            )


            if not content.strip():
                continue


            item_id = (
                _get_id(item)
                or f"education-{index}"
            )


            documents.append(
                Document(

                    page_content=content,

                    metadata={
                        "user_id": user_id,
                        "resume_id": resume_id,
                        "section": "education",
                        "item_id": item_id
                    }
                )
            )


    # =====================================================
    # SKILLS
    # =====================================================

    skills = resume.get(
        "skills",
        []
    )

    if isinstance(skills, list):

        for index, skill_group in enumerate(
            skills
        ):

            if not isinstance(
                skill_group,
                dict
            ):
                continue


            category = _clean(
                skill_group.get(
                    "category"
                )
            )

            items = skill_group.get(
                "items",
                []
            )


            if not isinstance(
                items,
                list
            ):
                items = [
                    items
                ]


            content = (
                f"Skill Category: {category}\n"
                f"Skills: "
                f"{', '.join(str(i) for i in items if i)}"
            )


            if not content.strip():
                continue


            item_id = (
                _get_id(skill_group)
                or f"skills-{index}"
            )


            documents.append(
                Document(

                    page_content=content,

                    metadata={
                        "user_id": user_id,
                        "resume_id": resume_id,
                        "section": "skills",
                        "item_id": item_id,
                        "category": category
                    }
                )
            )


    # =====================================================
    # ACHIEVEMENTS
    # =====================================================

    achievements = resume.get(
        "achievements",
        []
    )

    if isinstance(
        achievements,
        list
    ):

        for index, achievement in enumerate(
            achievements
        ):

            if not isinstance(
                achievement,
                dict
            ):
                continue


            title = _clean(
                achievement.get("title")
            )

            description = _clean(
                achievement.get(
                    "description"
                )
            )


            content = "\n".join(
                filter(
                    None,
                    [
                        f"Achievement: {title}",
                        description
                    ]
                )
            )


            if not content.strip():
                continue


            item_id = (
                _get_id(achievement)
                or f"achievement-{index}"
            )


            documents.append(
                Document(

                    page_content=content,

                    metadata={
                        "user_id": user_id,
                        "resume_id": resume_id,
                        "section": "achievements",
                        "item_id": item_id
                    }
                )
            )


    # =====================================================
    # CERTIFICATIONS
    # =====================================================

    certifications = resume.get(
        "certifications",
        []
    )

    if isinstance(
        certifications,
        list
    ):

        for index, certification in enumerate(
            certifications
        ):

            if not isinstance(
                certification,
                dict
            ):
                continue


            name = _clean(
                certification.get("name")
            )

            issuer = _clean(
                certification.get("issuer")
            )

            date = _clean(
                certification.get("date")
            )


            content = "\n".join(
                filter(
                    None,
                    [
                        f"Certification: {name}",
                        f"Issuer: {issuer}",
                        f"Date: {date}"
                    ]
                )
            )


            if not content.strip():
                continue


            item_id = (
                _get_id(certification)
                or f"certification-{index}"
            )


            documents.append(
                Document(

                    page_content=content,

                    metadata={
                        "user_id": user_id,
                        "resume_id": resume_id,
                        "section": "certifications",
                        "item_id": item_id
                    }
                )
            )


    return documents