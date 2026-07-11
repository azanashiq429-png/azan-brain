export default async function handler(req, res) {
    // CORS Headers taake localhost aur vercel dono par block na ho
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        let bodyData = req.body;
        if (typeof bodyData === 'string') {
            bodyData = JSON.parse(bodyData);
        }

        const prompt = bodyData.prompt;
        if (!prompt) {
            return res.status(400).json({ error: "Prompt data is missing" });
        }

        // Vercel dashboard variables se read karega
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) {
            return res.status(500).json({ error: "API Key is missing in Vercel Settings!" });
        }

        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });
        
        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0].content.parts[0].text) {
            return res.status(500).json({ error: "Invalid response from Gemini AI structure" });
        }

        let aiText = data.candidates[0].content.parts[0].text;
        return res.status(200).json({ result: aiText });
        
    } catch (error) {
        return res.status(500).json({ error: "Server Error", details: error.message });
    }
    }
    
