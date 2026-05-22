import requests
from collections import Counter
import json

URL = "https://yc-oss.github.io/api/companies/top.json"

response = requests.get(URL)

print("STATUS:", response.status_code)

companies = response.json()

print("TOTAL COMPANIES:", len(companies))

print("FIRST COMPANY:")
print(companies[0])

location_counter = Counter()

for company in companies:
    locations = company.get("all_locations", "")

    if not locations:
        continue

    split_locations = locations.split(";")

    for location in split_locations:
        cleaned = location.strip()

        if cleaned:
            location_counter[cleaned] += 1

print("\nTOTAL UNIQUE LOCATIONS:")
print(len(location_counter))

print("\nTOP 20 LOCATIONS:\n")

for location, count in location_counter.most_common(20):
    print(location, "->", count)

with open("locations.json", "w") as f:
    json.dump(dict(location_counter), f, indent=2)

print("\nSaved locations.json")