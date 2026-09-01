# from fastapi import FastAPI

# from app.routes.tailoring import (
#     router as tailoring_router
# )


# app = FastAPI(
#     title="Resume AI Service",
#     version="1.0.0"
# )


# @app.get("/health")
# async def health():

#     return {
#         "status": "ok",
#         "service": "resume-ai-service"
#     }


# app.include_router(
#     tailoring_router
# )

from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI

from app.routes.tailoring import (
    router as tailoring_router
)

from app.routes.rag_test import (
    router as rag_router
)
from app.routes.jd_test import (
    router as jd_router
)
from app.routes.tailoring_test import (
    router as tailoring_test_router
)

app = FastAPI(

    title="Resume AI Service",

    version="1.0.0"
)

app.include_router(
    jd_router
)
app.include_router(
    tailoring_test_router
)

@app.get("/health")
async def health():

    return {

        "status": "ok",

        "service":
            "resume-ai-service"
    }


app.include_router(
    tailoring_router
)

app.include_router(
    rag_router
)