import requests
import re
import json
from fastapi import APIRouter, HTTPException
from bs4 import BeautifulSoup

router = APIRouter()

@router.get("/leetcode/{username}")
def leetcode_stats(username: str):
    url = "https://leetcode.com/graphql"
    headers = {"Content-Type": "application/json"}

    query = {
        "query": """
        query getUserProfile($username: String!) {
          matchedUser(username: $username) {
            username
            profile {
              ranking
              reputation
              starRating
            }
            submitStats {
              acSubmissionNum {
                difficulty
                count
              }
            }
          }
        }
        """,
        "variables": {"username": username}
    }

    r = requests.post(url, json=query, headers=headers)
    if r.status_code != 200:
        raise HTTPException(status_code=400, detail="LeetCode API request failed")

    data = r.json()
    if "errors" in data or not data.get("data") or not data["data"].get("matchedUser"):
        raise HTTPException(status_code=400, detail="Invalid LeetCode username")

    user = data["data"]["matchedUser"]

    total_solved = user["submitStats"]["acSubmissionNum"][0]["count"]
    easy_solved = user["submitStats"]["acSubmissionNum"][1]["count"]
    medium_solved = user["submitStats"]["acSubmissionNum"][2]["count"]
    hard_solved = user["submitStats"]["acSubmissionNum"][3]["count"]

    return {
        "username": user["username"],
        "ranking": user["profile"]["ranking"],
        "total_solved": total_solved,
        "easy_solved": easy_solved,
        "medium_solved": medium_solved,
        "hard_solved": hard_solved,
        "starRating": user["profile"]["starRating"],
        "reputation": user["profile"]["reputation"]
    }



@router.get("/leetcode/contest/{username}")
def leetcode_contest_stats(username: str):
    url = "https://leetcode.com/graphql"
    headers = {"Content-Type": "application/json"}

    query = {
        "query": """
        query getUserContestRanking($username: String!) {
          userContestRanking(username: $username) {
            attendedContestsCount
            rating
            globalRanking
            topPercentage
          }
          userContestRankingHistory(username: $username) {
            contest {
              title
              startTime
            }
            rating
          }
        }
        """,
        "variables": {"username": username}
    }

    r = requests.post(url, json=query, headers=headers)
    if r.status_code != 200:
        raise HTTPException(status_code=400, detail="LeetCode API request failed")

    data = r.json()
    if "errors" in data or not data.get("data"):
        raise HTTPException(status_code=400, detail="Invalid LeetCode username")

    contest_info = data["data"]["userContestRanking"]
    contest_history = data["data"]["userContestRankingHistory"]

    # Transform into frontend-friendly format
    formatted_history = [
        {"contest": c["contest"]["title"], "rating": c["rating"]}
        for c in contest_history if c["rating"] is not None
    ]

    return {
        "username": username,
        "rating": contest_info["rating"] if contest_info else None,
        "contestRating": formatted_history
    }



@router.get("/codechef/{username}")
def codechef_stats(username: str):
    url = f"https://www.codechef.com/users/{username}"
    headers = {"User-Agent": "Mozilla/5.0"}
    r = requests.get(url, headers=headers)

    if r.status_code != 200:
        raise HTTPException(status_code=400, detail="Invalid CodeChef username")

    soup = BeautifulSoup(r.text, "html.parser")

    # Rating
    rating_tag = soup.find("div", class_="rating-number")
    rating = rating_tag.text.strip() if rating_tag else None

    # Stars
    stars_div = soup.find("div", class_="rating-star")
    stars = "".join([s.text for s in stars_div.find_all("span")]) if stars_div else None

    if not rating or not stars:
        raise HTTPException(status_code=400, detail="Could not parse CodeChef stats")

    return {"username": username, "rating": rating, "stars": stars}



@router.get("/codechef/contest/{username}")
def codechef_contest_stats(username: str):
    url = f"https://www.codechef.com/users/{username}"
    headers = {"User-Agent": "Mozilla/5.0"}
    r = requests.get(url, headers=headers)

    if r.status_code != 200:
        raise HTTPException(status_code=400, detail="Invalid CodeChef username")

    # Look for the embedded JSON in JS
    match = re.search(r"var all_rating = (\[.*?\]);", r.text)
    if not match:
        raise HTTPException(status_code=400, detail="Could not parse contest ratings")

    rating_history = json.loads(match.group(1))

    # Transform into frontend-friendly format
    formatted_history = [
        {"contest": c.get("contest_code", f"Contest {i+1}"), "rating": c.get("rating")}
        for i, c in enumerate(rating_history) if c.get("rating") is not None
    ]

    current_rating = formatted_history[-1]["rating"] if formatted_history else None

    return {
        "username": username,
        "rating": current_rating,
        "contestRating": formatted_history
    }

