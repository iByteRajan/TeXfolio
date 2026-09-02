def build_jd_analysis_prompt(
    job_description: str
) -> str:

    return f"""
You are an expert technical recruiter and
job-description analyst.

Analyze the following job description.

Your job is NOT to write a resume.

Your job is to extract the information that will
later be used to tailor a candidate's resume.

JOB DESCRIPTION
---------------

{job_description}

---------------

Extract:

1. Job title
2. Seniority level
3. Required skills
4. Preferred skills
5. Responsibilities
6. Important keywords
7. Soft skills
8. Experience requirements
9. Education requirements
10. Technologies

IMPORTANT RULES:

- Only extract information actually present or
  strongly implied by the job description.

- Do not invent technologies.

- Do not add generic technologies just because
  they are common for this type of job.

- Preserve specific technology names such as:
  Node.js, Express.js, MongoDB, React.js,
  PostgreSQL, Docker, AWS, etc.

- Separate REQUIRED skills from PREFERRED skills.

- Responsibilities should represent what the
  candidate is expected to do.

- Keywords should include important ATS-relevant
  terms.

- Technologies should contain concrete tools,
  frameworks, languages, platforms, databases,
  libraries, and APIs.

Return the result according to the provided
structured schema.
"""




def build_tailoring_prompt(
    job_description: str,
    job_analysis,
    relevant_documents: list,
    config
) -> str:
    
    docs_text = "\n\n".join([
        f"Document {i+1}:\n{doc.page_content}"
        for i, doc in enumerate(relevant_documents)
    ])
    
    return f"""
You are an expert technical resume writer. Your task is to tailor a candidate's resume to a specific job description using the candidate's master resume data.

JOB DESCRIPTION
---------------
{job_description}
---------------

JOB ANALYSIS
---------------
{job_analysis}
---------------

CANDIDATE'S RESUME DATA (RETRIEVED)
---------------
{docs_text}
---------------

CONFIGURATION
---------------
{config}
---------------

RULES:
1. Tailor the resume to highlight the most relevant skills, experiences, and projects for the job description.
2. Ensure you strictly adhere to the provided schema for the output.
3. Do not invent or hallucinate any information. Only use the candidate's provided resume data.
4. Keep the descriptions concise and impactful, starting with strong action verbs.
5. If the configuration provides any specific instructions (like tone or length), follow them.

Return the result according to the provided structured schema.
"""

def build_retrieval_queries_prompt(
    job_analysis
) -> str:

    return f"""
You are an expert resume retrieval planner.

You are given a structured analysis of a job
description.

Your task is to create search queries that will
retrieve the most relevant evidence from a
candidate's master resume.

JOB ANALYSIS
------------

Job Title:
{job_analysis.job_title}

Seniority:
{job_analysis.seniority}

Required Skills:
{", ".join(job_analysis.required_skills)}

Preferred Skills:
{", ".join(job_analysis.preferred_skills)}

Responsibilities:
{", ".join(job_analysis.responsibilities)}

Keywords:
{", ".join(job_analysis.keywords)}

Technologies:
{", ".join(job_analysis.technologies)}

Soft Skills:
{", ".join(job_analysis.soft_skills)}

Experience Requirements:
{", ".join(job_analysis.experience_requirements)}

Education Requirements:
{", ".join(job_analysis.education_requirements)}

------------

Generate specialized semantic search queries
for the following resume sections:

1. Projects
2. Experience
3. Skills
4. Achievements
5. Education

RULES:

- Queries should describe the type of evidence
  we are looking for.

- Queries should contain relevant technologies,
  responsibilities, and keywords from the job.

- Do not invent candidate experience.

- Do not assume that the candidate possesses
  a skill merely because the job requires it.

- The queries are for retrieving candidate
  evidence, not generating resume content.

Examples:

For a backend developer:

Projects:
"projects demonstrating Node.js, Express.js,
MongoDB and REST API development"

Experience:
"experience involving backend development,
API development and database integration"

Skills:
"technical skills related to Node.js,
Express.js, MongoDB, JavaScript and REST APIs"

Achievements:
"achievements demonstrating programming,
backend development or technical problem solving"

Education:
"education relevant to computer science,
software engineering or information technology"

Return structured output according to the
provided schema.
"""


def build_evidence_selection_prompt(
    job_analysis,
    evidence,
    config
) -> str:

    return f"""
You are an expert resume relevance evaluator.

Your task is to select the candidate resume
items that are most relevant to the target job.

You MUST NOT rewrite the resume.

You MUST NOT create new information.

You can ONLY select items that appear in
the provided evidence.

JOB ANALYSIS
============

{job_analysis.model_dump_json(indent=2)}

CANDIDATE EVIDENCE
==================

{evidence}

USER CONFIGURATION
==================

{config}

CUSTOM USER INSTRUCTIONS
========================

{config.get("instructions", [])}

SELECTION RULES
===============

1. Select only evidence that is relevant to
   the target job.

2. Never invent a source_id.

3. Every selected source_id MUST exist in the
   provided evidence.

4. Respect the user's enabled/disabled sections.

5. Respect all section limits.

6. Prefer direct technical relevance.

7. Prefer evidence containing technologies,
   responsibilities, or keywords matching
   the job description.

8. Do not select an item merely because it
   exists in the candidate's resume.

9. If nothing is sufficiently relevant,
   return an empty list.

10. Do not rewrite any content.

11. Do not infer a technology from another
    technology.

For example:

MERN does NOT automatically prove that a
specific project used Node.js, Express.js,
or MongoDB unless those technologies are
explicitly present in the evidence.

12. A project can still be selected because
    it demonstrates relevant software development
    experience even when it does not contain
    every required technology.

13. Custom user instructions should influence
    selection when they do not conflict with
    factual accuracy or the section configuration.

Return only the structured selection.
"""


def build_resume_tailoring_prompt(
    job_analysis,
    selected_evidence,
    config,
    original_summary=None
) -> str:

    return f"""
You are an expert technical resume writer.

Your task is to create a tailored resume from
the candidate's existing resume evidence.

The target job is described by the job analysis.

You MUST follow all rules below.

JOB ANALYSIS
============

{job_analysis.model_dump_json(indent=2)}

ORIGINAL SUMMARY
===============

{original_summary or "No summary provided."}

SELECTED CANDIDATE EVIDENCE
===========================

{selected_evidence}

USER CONFIGURATION
==================

{config}

CUSTOM USER INSTRUCTIONS
========================

{config.get("instructions", [])}

CORE RULES
==========

1. Use ONLY information present in the
   selected candidate evidence and original
   summary.

2. NEVER invent:

   - technologies
   - projects
   - companies
   - job titles
   - metrics
   - users
   - achievements
   - responsibilities
   - dates
   - certifications
   - employers
   - education details

3. You may rephrase existing information to make
   it clearer, stronger, more concise and more
   relevant to the target job.

4. Do not introduce a new factual claim while
   rewriting.

5. Preserve the original meaning.

6. Prefer terminology from the job description
   only when it accurately describes information
   already present in the candidate evidence.

7. Do NOT claim experience with a technology
   simply because the job description mentions it.

8. Do NOT infer one technology from another.

9. MERN does not automatically mean that a
   particular project used Node.js, Express.js,
   or MongoDB unless those technologies are
   explicitly present in the evidence.

10. Do not add sections disabled by the user.

11. Respect all section limits.

12. Follow custom user instructions when they
    do not conflict with factual accuracy,
    selected evidence, or configuration.

SUMMARY
=======

If the summary section is enabled:

- Create a concise professional summary.
- You may rewrite the original summary.
- You may use facts from selected evidence.
- Keep it relevant to the target job.
- Do not invent years of experience.
- Do not introduce unsupported technologies.
- If there is insufficient information,
  return null.
- You may rephrase or combine supported facts.

You MUST NOT invent:
- technologies
- experience
- job titles
- companies
- achievements
- metrics
- responsibilities
- qualifications
- projects

Do not infer one technology from another.

For example:
"MERN" alone does not prove that a particular project used
Node.js, Express.js, or MongoDB unless those technologies are
explicitly present in the source evidence.

PROJECTS
========

Only include selected projects.

For each project:

- Preserve the original project identity.
- Preserve factual technologies.
- Rewrite bullets only when useful.
- Do not invent architecture, scale,
  performance numbers, users, or responsibilities.

EXPERIENCE
==========

Only include selected experience.

Rewrite bullets to emphasize relevant
responsibilities while preserving factual meaning.

SKILLS
======

Only use skills explicitly present in
selected candidate evidence.

You may reorder skills to prioritize
job-relevant technologies.

Do not add skills from the job description
that are absent from the candidate evidence.

ACHIEVEMENTS
============

Only include selected achievements.

Do not invent metrics or accomplishments.

EDUCATION
=========

Preserve the candidate's actual education data.

CERTIFICATIONS
==============

Only include selected certifications.

Preserve the actual certification name,
issuer, date, and description.

Do not invent certification information.

OUTPUT
======

Return only the structured TailoredResume object.
"""
