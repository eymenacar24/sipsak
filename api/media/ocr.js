module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Yalnızca POST istekleri kabul edilir.' });
    }
    try {
        const { image } = req.body; 
        if (!image) return res.status(400).json({ success: false, error: 'Görsel verisi bulunamadı.' });

        const base64Data = image.replace(/^data:image\/\w+;base64,/, "");

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [
                        { text: "Sen endüstriyel seviyede bir OCR, görsel analiz ve döküman okuma motorusun. Sana yüklenen bu görseldeki tüm metinleri, şemaları, pin isimlerini, teknik detayları ve kodları sıfır hata ile ayıkla. Eğer görsel bir elektronik devre şeması, mikrokontrolcü pinout'u (Örn: ESP32 GPIO) ise; pin hiyerarşilerini ve isimlerini çok düzenli bir Markdown tablosu olarak dök. Giriş veya sonuç yorumu yapma, doğrudan teknik çıktıyı ver." },
                        { inlineData: { mimeType: "image/jpeg", data: base64Data } }
                    ]
                }]
            })
        });

        const data = await response.json();
        const responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Metin okunamadı.";
        return res.status(200).json({ success: true, text: responseText });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};