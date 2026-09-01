# from langchain_openai import ChatOpenAI

# from app.schemas.response import (
#     TailoredResume
# )

# from app.services.tailoring.prompts import (
#     build_tailoring_prompt
# )


# def tailor_resume(
#     job_description,
#     job_analysis,
#     relevant_documents,
#     config
# ):

#     llm = ChatOpenAI(
#         model="gpt-5.6-mini",
#         temperature=0
#     )


#     structured_llm = (
#         llm.with_structured_output(
#             TailoredResume
#         )
#     )


#     prompt = build_tailoring_prompt(
#         job_description=
#             job_description,

#         job_analysis=
#             job_analysis,

#         relevant_documents=
#             relevant_documents,

#         config=config
#     )


#     return structured_llm.invoke(
#         prompt
#     )

from langchain_openai import ChatOpenAI

from app.schemas.tailored_resume import (
    TailoredResume
)

from app.services.tailoring.prompts import (
    build_resume_tailoring_prompt
)


def tailor_resume(
    job_analysis,
    selected_evidence,
    config,
    original_summary=None
) -> TailoredResume:

    llm = ChatOpenAI(

        model="gpt-5.6-luna",

        temperature=0.2
    )

    structured_llm = (
        llm.with_structured_output(
            TailoredResume
        )
    )

    prompt = build_resume_tailoring_prompt(
        job_analysis=job_analysis,
        selected_evidence=selected_evidence,
        config=config,
        original_summary=original_summary
    )

    result = structured_llm.invoke(
        prompt
    )

    return result