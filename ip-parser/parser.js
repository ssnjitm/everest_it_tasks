// Downloads the log file.
// Uses Regex to find all IP addresses.
// Finds the region for each IP.

import axios from 'axios';
import geoip from 'fast-geoip';

const provinceNames = {
    "ZJ": "Zhejiang",
    "SH": "Shanghai",
    "BJ": "Beijing",
    "GD": "Guangdong",
    "JS": "Jiangsu",
    "SC": "Sichuan",
    "HB": "Hubei",
    "HN": "Hunan",
    "AH": "Anhui",
    "FJ": "Fujian",
    "HE": "Hebei",
    "HL": "Heilongjiang",
    "JL": "Jilin",
    "LN": "Liaoning",
    "SD": "Shandong",
    "SX": "Shanxi",
    "SN": "Shaanxi",
    "CQ": "Chongqing",
    "TJ": "Tianjin",
    "JX": "Jiangxi",
    "HA": "Henan",
    "YN": "Yunnan",
    "GZ": "Guizhou",
    "GX": "Guangxi",
    "NM": "Inner Mongolia",
    "NX": "Ningxia",
    "QH": "Qinghai",
    "XZ": "Tibet",
    "XJ": "Xinjiang",
    "GS": "Gansu",
    // can be added  more if needed
    //ref : https://www.cottongen.org/data/nomenclatures/China_provinces
};

async function processLog() {
    const logUrl = 'https://raw.githubusercontent.com/oneoffdallas/dohservers/master/iplist.txt';

    try {
        console.log("Downloading log file...");
        const response = await axios.get(logUrl, { timeout: 15000 });
        const logData = response.data;

        const ipRegex = /\b(?:\d{1,3}\.){3}\d{1,3}\b/g;
        const ips = [...new Set(logData.match(ipRegex) || [])];

        console.log(`Found ${ips.length} unique IP addresses.`);

        const regionCounts = {};

        console.log("Looking up geo locations...");

        const results = await Promise.all(
            ips.map(ip => geoip.lookup(ip).catch(() => null))
        );

        for (const geo of results) {
            if (geo && geo.country === 'CN') {
                let regionCode = geo.region || "Unknown";
                const fullName = provinceNames[regionCode] || regionCode;
                regionCounts[fullName] = (regionCounts[fullName] || 0) + 1;
            }
        }

        console.log("\n IP Distribution in China (Aggregated by Region):");
        if (Object.keys(regionCounts).length === 0) {
            console.log(" No Chinese IPs found.");
        } else {
            console.table(regionCounts);
        }

    } catch (error) {
        console.error("Error:", error.message);
    }
}

processLog();