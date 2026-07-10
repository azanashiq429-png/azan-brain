export default async function handler(req, res) {
    // 1. Enable CORS headers taake aapka frontend serverless function se smoothly communicate kare
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

    // Handle preflight OPTIONS requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Sirf POST requests allow karni hain
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { prompt } = req.body;

    // GitHub Security Bypass: Key ab environment variable se safe tareeqe se load hogi
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
    
    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: "API Key Configuration Missing on Vercel Settings!" });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        const data = await response.json();
        
        if (!data.candidates || !data.candidates[0].content.parts[0].text) {
            return res.status(500).json({ error: "Invalid response structure from Google AI Matrix" });
        }

        let aiText = data.candidates[0].content.parts[0].text;
        
        // Response successfully send karna
        return res.status(200).json({ result: aiText });
        
    } catch (error) {
        return res.status(500).json({ error: "Backend Integration Offline", details: error.message });
    }
}
  
