module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ success: false, error: 'Yalnızca POST istekleri kabul edilir.' });

    try {
        const { image, mimeType } = req.body;
        if (!image) return res.status(400).json({ success: false, error: 'Görsel verisi (image) eksik.' });

        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) return res.status(500).json({ success: false, error: 'GEMINI_API_KEY tanımlı değil.' });

        const base64Data = image.replace(/^data:image\/[a-zA-Z0-9+.-]+;base64,/, '');
        const resolvedMime = mimeType || 'image/jpeg';

        const prompt = "Sen endüstriyel seviyede bir OCR, görsel analiz ve döküman okuma motorusun. Sana yüklenen bu görseldeki tüm metinleri, şemaları, pin isimlerini, teknik detayları ve kodları sıfır hata ile ayıkla. Eğer görsel bir elektronik devre şeması, mikrokontrolcü pinout'u (Örn: ESP32 GPIO) veya teknik bir afiş ise; pin hiyerarşilerini, işlevlerini ve isimlerini yazılımcıların en rahat okuyacağı şekilde çok düzenli, hizalı bir Markdown tablosu veya organize bir liste olarak dök. Giriş veya sonuç yorumu yapma, doğrudan teknik çıktıyı ver.";

        const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        const response = await fetch(geminiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: prompt },
                        { inlineData: { mimeType: resolvedMime, data: base64Data } }
                    ]
                }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            const errMsg = data.error?.message || JSON.stringify(data);
            return res.status(response.status).json({ success: false, error: `Gemini (${response.status}): ${errMsg}` });
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) return res.status(200).json({ success: false, error: 'Görselden metin çıkartılamadı.' });

        return res.status(200).json({ success: true, text });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};