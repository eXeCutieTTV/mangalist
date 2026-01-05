# scrape_onepiece_api.py
# Requires: requests, beautifulsoup4
# Usage: python scrape_onepiece_api.py

import requests
from bs4 import BeautifulSoup
import json
import csv
import re
import time

API_URL = "https://onepiece.fandom.com/api.php"
PAGE_TITLE = "Chapters_and_Volumes/Volumes"
HEADERS = {"User-Agent": "OnePieceVolumeScraper/3.0 (your_email@example.com)"}

# Request parsed HTML for the page via the action=parse endpoint
params = {
    "action": "parse",
    "page": PAGE_TITLE,
    "prop": "text",
    "format": "json"
}

resp = requests.get(API_URL, params=params, headers=HEADERS)
resp.raise_for_status()
j = resp.json()

if "error" in j:
    raise RuntimeError("API error: " + json.dumps(j["error"], ensure_ascii=False))

# 'text' contains the HTML string for the whole page (already parsed by MediaWiki)
html = j.get("parse", {}).get("text", {}).get("*")
if not html:
    raise RuntimeError("No parsed HTML returned by API.")

soup = BeautifulSoup(html, "html.parser")

def clean(s):
    return s.strip() if s and isinstance(s, str) else None

data = []

# find only numeric volume anchors: <span id="Volume_1"> or <span id="Volume_101"> etc.
for span in soup.find_all("span", id=re.compile(r"^Volume_(\d+)$")):
    m = re.match(r"Volume_(\d+)", span["id"])
    if not m:
        continue
    volnum = int(m.group(1))

    # header element is usually the parent (the heading)
    header = span.parent

    # next sibling paragraph often has "Japanese: ... / English: ... / Pages: N"
    vol_title_en = vol_title_jp = page_count = None
    info_p = header.find_next_sibling("p")
    if info_p:
        text = info_p.get_text(" ", strip=True)
        if "Japanese:" in text:
            vol_title_jp = clean(text.split("Japanese:", 1)[1].split("/")[0])
        if "English:" in text:
            vol_title_en = clean(text.split("English:", 1)[1].split("/")[0])
        if "Pages:" in text:
            # try to pick the numeric part
            pc = text.split("Pages:", 1)[1].strip().split()[0]
            page_count = clean(pc)

    # chapter table is the next wikitable following the header
    table = header.find_next("table", class_="wikitable")
    if not table:
        # defensive: some pages have slightly different markup; search next table anyway
        table = header.find_next("table")
        if not table:
            print(f"Warning: no table found for Volume {volnum}; skipping.")
            continue

    # assume header row present
    rows = table.find_all("tr")
    if len(rows) <= 1:
        print(f"Warning: no rows in table for Volume {volnum}; skipping.")
        continue

    for row in rows[1:]:
        cols = row.find_all("td")
        # Expect at least 3 columns: chapter#, english title, japanese title
        if len(cols) < 3:
            # skip malformed rows
            continue
        chap_num = clean(cols[0].get_text())
        chap_title_en = clean(cols[1].get_text())
        chap_title_jp = clean(cols[2].get_text())

        data.append({
            "volume": volnum,
            "volume_title_en": vol_title_en,
            "volume_title_jp": vol_title_jp,
            "page_count": page_count,
            "chapter": chap_num,
            "chapter_title_en": chap_title_en,
            "chapter_title_jp": chap_title_jp
        })

    # polite pause (not strictly necessary as it's one API call + local parsing)
    time.sleep(0.1)

if not data:
    raise RuntimeError("No data extracted. Layout may have changed or API returned unexpected HTML.")

# write outputs
with open("one_piece_volumes.json", "w", encoding="utf-8") as jf:
    json.dump(data, jf, ensure_ascii=False, indent=2)

with open("one_piece_volumes.csv", "w", encoding="utf-8", newline="") as cf:
    writer = csv.DictWriter(cf, fieldnames=data[0].keys())
    writer.writeheader()
    writer.writerows(data)

print("Done.")
print(f"Volumes scraped: {len(set(d['volume'] for d in data))}")
print(f"Chapters scraped: {len(data)}")
