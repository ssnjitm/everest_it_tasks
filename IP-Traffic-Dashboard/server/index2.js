import express from 'express';
import axios from 'axios';
import geoip from 'fast-geoip';
import cors from 'cors';


dns.setDefaultResultOrder('ipv4first');
const app = express();
app.use(cors());

const LOG_URL = 'https://files.idigest.app/ip.txt';

// app.get('/api/map-data', async (req, res) => {
//     try {
//         const response = await axios.get(LOG_URL);
//         const ips = response.data.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || [];

//         const regionData = {};

//         for (const ip of ips) {
//             const geo = await geoip.lookup(ip);
//             if (geo && geo.country === 'CN') {
//                 const region = geo.region || "Unknown";

//                 if (!regionData[region]) {
//                     regionData[region] = { 
//                         name: region, 
//                         count: 0, 
//                         lat: geo.ll[0], 
//                         lng: geo.ll[1] 
//                     };
//                 }
//                 regionData[region].count++;
//             }
//         }

//         res.json(Object.values(regionData));
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Failed to fetch log data" });
//     }
// });

// Return Server Time

app.get('/api/map-data', async (req, res) => {
    try {
        let ipData = "";
        try {
            const response = await axios.get(LOG_URL, { timeout: 5000 });
            ipData = response.data;
        } catch (e) {
            console.log("External source down, using mock IP data.");
            // Mock data with some Chinese IPs for your logic to process
            ipData = "1.2.3.4, 110.184.123.45, 123.125.114.144, 220.181.38.148";
        }

        const ips = ipData.match(/\b(?:\d{1,3}\.){3}\d{1,3}\b/g) || [];
        const regionData = {};

        for (const ip of ips) {
            const geo = await geoip.lookup(ip);
            // Your filter for China ('CN')
            if (geo && geo.country === 'CN') {
                const region = geo.region || "Unknown";
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
        res.json(Object.values(regionData));
    } catch (error) {
        console.error("Internal Server Error:", error);
        res.status(500).json({ error: "Failed to process map data" });
    }
});
app.get('/api/time', (req, res) => {
    res.json({ 
        time: new Date().toLocaleTimeString(),
        iso: new Date().toISOString()
    });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});