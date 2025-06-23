from scholarly import scholarly
import sys
import json

def get_scholar_profile(user_id: str):
    try:
        author = scholarly.search_author_id(user_id)
        filled = scholarly.fill(author)
        
        publications = []
        for pub in filled.get("publications", []):
            bib = pub.get("bib", {})
            title = bib.get("title")
            year = bib.get("pub_year")
            citations = pub.get("num_citations")

            if title and year and citations is not None:
                publications.append({
                    "title": title,
                    "year": int(year),
                    "citations": int(citations)
                })

        return {
            "name": filled.get("name"),
            "citations": filled.get("citedby"),
            "hIndex": filled.get("hindex"),
            "publications": publications
        }

    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    profile = get_scholar_profile(sys.argv[1])
    print(json.dumps(profile))
