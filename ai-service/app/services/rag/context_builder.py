from typing import Dict, List

from langchain_core.documents import Document


def build_retrieval_context(
    results: Dict[str, List[Document]]
) -> Dict:

    context = {}

    for section, documents in results.items():

        context[section] = []

        for document in documents:

            context[section].append({

                "content":
                    document.page_content,

                "metadata":
                    document.metadata
            })

    return context