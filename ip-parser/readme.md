# IP Parser - China Region Analyzer

A Node.js script that downloads a log file containing IP addresses, extracts them, and analyzes how many IPs belong to **China**, grouped by province/region.

---

## Features

- Downloads IP log from URL
- Extracts unique IPv4 addresses using regex
- Performs GeoIP lookup using `fast-geoip`
- Filters and aggregates IPs located in **China (CN)**
- Converts province codes (ZJ, SH, BJ, etc.) into full names
- Displays results in a clean table format

---

## Tech Stack

- **Node.js**
- **Axios** - For downloading log files
- **fast-geoip** - For IP to location lookup
- ES Modules (`import` syntax)

---

## Setup & Installation

1. Clone or navigate to the project folder:
   ```bash
   cd ip-parser


   📥 Downloading log file...
🔎 Found 731 unique IP addresses.
🌍 Looking up geo locations...
📊 IP Distribution in China (Aggregated by Region):

┌───────────────┬────────┐
│ (index)       │ Values │
├───────────────┼────────┤
│ Zhejiang      │ 3      │
│ Shanghai      │ 1      │
│ Unknown       │ 6      │
└───────────────┴────────┘