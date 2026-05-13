import express from 'express';
import axios from 'axios';
import geoip from 'fast-geoip';
import cors from 'cors';
import dns from 'node:dns';

// CRITICAL: Set DNS resolution to prefer IPv4 to avoid ENOTFOUND errors 
// on certain local networks/ISPs when reaching external APIs.
dns.setDefaultResultOrder('ipv4first');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const LOG_URL = 'https://files.idigest.app/ip.txt';

/**
 * API to fetch and process IP traffic data
 */
app.get('/api/map-data', async (req, res) => {
    try {
        let ipData = "";
        
        try {
            console.log(`Fetching live logs from: ${LOG_URL}`);
            const response = await axios.get(LOG_URL, { 
                timeout: 8000,
                headers: { 'User-Agent': 'Mozilla/5.0' } 
            });
            ipData = response.data;
            console.log("Live data successfully retrieved.");
        } catch (fetchError) {
            console.error("External source unreachable. Details:", fetchError.message);
            
            // Fallback: Real Chinese IPs for testing UI logic when the source is down
            ipData = `
                110.184.123.45
                123.125.114.144
                220.181.38.148
                111.206.223.205
                114.247.50.2
            `;
            console.log("Using internal fallback IP dataset.");
        }

        // Parse IPs using Regex
        const ips = ipData.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || [];
        const regionData = {};

        // Process Geolocation
        for (const ip of ips) {
            const geo = await geoip.lookup(ip);
            
            // Filter: China (CN)
            if (geo && geo.country === 'CN') {
                const region = geo.region || "Unknown Region";
                
                if (!regionData[region]) {
                    regionData[region] = { 
                        name: region, 
                        count: 0, 
                        lat: geo.ll[0], 
                        lng: geo.ll[1] 
                    };
                }
                regionData[region].count++;
            }
        }

        const result = Object.values(regionData);
        console.log(`Mapped ${result.length} unique Chinese regions.`);
        res.json(result);

    } catch (error) {
        console.error("Critical Server Error:", error);
        res.status(500).json({ error: "Internal Server Error processing map data" });
    }
});

/**
 * API to return server health and time
 */
app.get('/api/time', (req, res) => {
    const now = new Date();
    res.json({ 
        time: now.toLocaleTimeString(),
        iso: now.toISOString(),
        status: "Healthy"
    });
});

app.listen(PORT, () => {
    console.log('-------------------------------------------');
    console.log(`🚀 Server running on: http://localhost:${PORT}`);
    console.log(`📍 Map API: http://localhost:${PORT}/api/map-data`);
    console.log(`🕒 Time API: http://localhost:${PORT}/api/time`);
    console.log('-------------------------------------------');
});