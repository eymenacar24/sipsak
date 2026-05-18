module.exports = async (req, res) => {
    // Sadece POST (dosya gönderme) isteklerini kabul et
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Yalnızca POST istekleri kabul edilir.' });
    }

    try {
        // Burası ileride Google Vision veya Gemini ile konuşacağımız mutfak olacak.
        // Şimdilik arayüze "İstek ulaştı!" yanıtı dönüyoruz.
        return res.status(200).json({
            success: true,
            text: "[BULUT MOTORU AKTİF]: Sunucu bağlantısı başarıyla kuruldu kanka! Gerçek yapay zeka entegrasyonu için altyapı hazır."
        });
    } catch (error) {
        return res.status(500).json({ success: false, error: error.message });
    }
};