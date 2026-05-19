// c:\Users\Asus\Desktop\sipsak\script.js
// BUILD: 2026-05-19T03:35 — Statik mock tamamen yok. Gerçek API akışı.

// ==========================================
// TOAST & LOADING SYSTEM
// ==========================================
function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icon = type === 'success' ? 'fa-check text-green-400' : (type === 'error' ? 'fa-xmark text-red-400' : 'fa-info-circle text-indigoSoft');
    toast.innerHTML = `<i class="fa-solid ${icon} text-xl"></i> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function showApiLoading(show, statusText) {
    const overlay = document.getElementById('api-loading-overlay');
    const bar = document.getElementById('api-progress-bar');
    const loadingText = document.getElementById('api-loading-text');
    if (show) {
        overlay.classList.remove('hidden');
        overlay.classList.add('flex');
        bar.style.width = '0%';
        if (loadingText && statusText) loadingText.textContent = statusText;
        let progress = 0;
        window.apiProgressInterval = setInterval(() => {
            progress += Math.random() * 12;
            if (progress > 92) progress = 92;
            bar.style.width = `${progress}%`;
        }, 350);
    } else {
        clearInterval(window.apiProgressInterval);
        bar.style.width = '100%';
        setTimeout(() => {
            overlay.classList.remove('flex');
            overlay.classList.add('hidden');
        }, 400);
    }
}

// ==========================================
// i18n MULTI-LANGUAGE SYSTEM
// ==========================================
const i18n = {
    tr: {
        page_title: "Sipsak.com - Endüstriyel Web Araçları", nav_api: "API Aktif",
        cat_all: "Tümü", hero_1: "Sınırsız Güç.", hero_2: "Kusursuz Sonuç.",
        hero_sub: "Amatör kütüphaneleri geride bırakın. Tüm dosyalarınız endüstri standardındaki şifreli yapay zeka sunucularımızda saniyeler içinde sıfır hatayla işlenir.",
        global_drop: "ŞİPŞAK İŞLEMEK İÇİN BIRAK!", global_drop_sub: "Siz bırakın, AI destekli API otomatik yönlendirsin.",
        api_loading: "BULUTTA İŞLENİYOR", btn_back: "Geri Dön",
        t_pdf_split_t: "Bulut PDF Bölücü", t_pdf_split_d: "Sayfa aralığı belirterek PDF'i sunucuda şipşak ayırın.",
        t_pdf_merge_t: "Bulut PDF Birleştirici", t_pdf_merge_d: "Yüzlerce PDF'i çökmeksizin tek dosyada birleştirin.",
        t_pdf_comp_t: "Gerçek PDF Sıkıştırıcı", t_pdf_comp_d: "Görsel kalitesini optimize ederek devasa boyut tasarrufu sağlayın.",
        t_off_cvrt_t: "Evrensel Belge Dönüştürücü", t_off_cvrt_d: "Word, Excel, PPTX belgelerini kusursuzca PDF, HTML veya JSON formatına çevirin.",
        t_img_fmt_t: "Kayıpsız Görsel Dönüştürücü", t_img_fmt_d: "WebP, PNG, JPG arası formatları yüksek teknolojiyle dönüştürün.",
        t_img_ocr_t: "Gelişmiş AI OCR Motoru", t_img_ocr_d: "Karmaşık görselleri sıfır hatayla dijital metne çevirin.",
        t_vid_aud_t: "Sunucu Tabanlı Ses Ayıklayıcı", t_vid_aud_d: "4K Videoların ses kanalını bile çökmeksizin MP3/WAV sökün."
    },
    en: {
        page_title: "Sipsak.com - Industrial Web Tools", nav_api: "API Active",
        cat_all: "All", hero_1: "Unlimited Power.", hero_2: "Flawless Result.",
        hero_sub: "Leave amateur libraries behind. Your files are processed flawlessly in seconds on our industry-standard encrypted AI servers.",
        global_drop: "DROP TO PROCESS!", global_drop_sub: "Drop it, AI-powered API routes it automatically.",
        api_loading: "PROCESSING IN CLOUD", btn_back: "Go Back",
        t_pdf_split_t: "Cloud PDF Splitter", t_pdf_split_d: "Split PDFs on the server instantly by defining page ranges.",
        t_pdf_merge_t: "Cloud PDF Merger", t_pdf_merge_d: "Merge hundreds of PDFs without crashing.",
        t_pdf_comp_t: "True PDF Compressor", t_pdf_comp_d: "Achieve massive size savings by optimizing visual quality.",
        t_off_cvrt_t: "Universal Document Converter", t_off_cvrt_d: "Flawlessly convert Word, Excel, PPTX to PDF, HTML, or JSON.",
        t_img_fmt_t: "Lossless Image Converter", t_img_fmt_d: "Convert between WebP, PNG, JPG with high technology.",
        t_img_ocr_t: "Advanced AI OCR Engine", t_img_ocr_d: "Extract text from complex images with zero errors.",
        t_vid_aud_t: "Server-Based Audio Extractor", t_vid_aud_d: "Extract MP3/WAV from even 4K videos without crashing."
    }
};

let currentLang = 'tr';
function toggleLanguage() {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    document.getElementById('lang-btn').innerHTML = `${currentLang.toUpperCase()} <i class="fa-solid fa-globe text-indigoSoft"></i>`;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) el.innerHTML = i18n[currentLang][key];
    });
    showToast(currentLang === 'tr' ? 'Sistem dili Türkçe.' : 'System language English.', 'success');
}

// ==========================================
// UI ROUTING
// ==========================================
function showDashboard() {
    document.querySelectorAll('.tool-view').forEach(el => el.classList.add('hidden'));
    document.getElementById('dashboard-view').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function filterCategory(cat) {
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.remove('active', 'text-indigoSoft', 'font-bold'));
    event.currentTarget.classList.add('active', 'text-indigoSoft', 'font-bold');
    document.querySelectorAll('.tool-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? 'block' : 'none';
    });
}

// ==========================================
// SMART DROPZONE
// ==========================================
const globalOverlay = document.getElementById('global-drop-overlay');
let dragCounter = 0;
window.addEventListener('dragenter', e => { e.preventDefault(); dragCounter++; globalOverlay.classList.remove('hidden'); globalOverlay.classList.add('flex'); });
window.addEventListener('dragleave', e => { e.preventDefault(); dragCounter--; if (dragCounter <= 0) { dragCounter = 0; globalOverlay.classList.add('hidden'); globalOverlay.classList.remove('flex'); } });
window.addEventListener('dragover', e => e.preventDefault());
window.addEventListener('drop', e => {
    e.preventDefault(); dragCounter = 0; globalOverlay.classList.add('hidden'); globalOverlay.classList.remove('flex');
    if (e.dataTransfer.files.length > 0) {
        const file = e.dataTransfer.files[0];
        const name = file.name.toLowerCase();
        if (name.endsWith('.pdf')) openTool('pdf-split', e.dataTransfer.files);
        else if (name.endsWith('.docx') || name.endsWith('.xlsx') || name.endsWith('.pptx')) openTool('office-convert', e.dataTransfer.files);
        else if (file.type.startsWith('image/')) openTool('img-ocr', e.dataTransfer.files);
        else if (file.type.startsWith('video/')) openTool('vid-audio', e.dataTransfer.files);
        else showToast(currentLang === 'tr' ? 'Desteklenmeyen dosya türü!' : 'Unsupported file type!', 'error');
    }
});

// ==========================================
// API TOOL CONFIGURATIONS
// ==========================================
const apiTools = {
    'pdf-split': {
        title: 't_pdf_split_t', desc: 't_pdf_split_d', icon: 'fa-scissors', color: 'text-red-400',
        accept: 'application/pdf', multiple: false, endpoint: '/api/pdf/split',
        options: [{ id: 'pageRange', type: 'text', label: 'Sayfa Aralıkları (Örn: 1-5, 8)', placeholder: '1-5' }]
    },
    'pdf-merge': {
        title: 't_pdf_merge_t', desc: 't_pdf_merge_d', icon: 'fa-layer-group', color: 'text-red-400',
        accept: 'application/pdf', multiple: true, endpoint: '/api/pdf/merge', options: []
    },
    'pdf-compress': {
        title: 't_pdf_comp_t', desc: 't_pdf_comp_d', icon: 'fa-compress', color: 'text-red-400',
        accept: 'application/pdf', multiple: false, endpoint: '/api/pdf/compress',
        options: [{ id: 'quality', type: 'select', label: 'Sıkıştırma Algoritması', options: [{ val: 'high', text: 'Maksimum Sıkıştırma' }, { val: 'balanced', text: 'Dengeli (Önerilen)' }, { val: 'lossless', text: 'Kayıpsız' }] }]
    },
    'office-convert': {
        title: 't_off_cvrt_t', desc: 't_off_cvrt_d', icon: 'fa-file-invoice', color: 'text-blue-400',
        accept: '.docx,.xlsx,.pptx,.doc,.xls', multiple: false, endpoint: '/api/office/convert',
        options: [{ id: 'targetFormat', type: 'select', label: 'Hedef Format', options: [{ val: 'pdf', text: 'PDF' }, { val: 'html', text: 'HTML' }, { val: 'json', text: 'JSON' }] }]
    },
    'img-ocr': {
        title: 't_img_ocr_t', desc: 't_img_ocr_d', icon: 'fa-eye', color: 'text-yellow-400',
        accept: 'image/*', multiple: false, endpoint: '/api/ocr',
        options: [{ id: 'lang', type: 'select', label: 'Metin Dili (AI Modeli)', options: [{ val: 'auto', text: 'AI Otomatik Algılama' }, { val: 'tur', text: 'Türkçe' }, { val: 'eng', text: 'İngilizce' }] }]
    },
    'img-format': {
        title: 't_img_fmt_t', desc: 't_img_fmt_d', icon: 'fa-image', color: 'text-purple-400',
        accept: 'image/*', multiple: false, endpoint: '/api/media/convert-image',
        options: [
            { id: 'format', type: 'select', label: 'Hedef Format', options: [{ val: 'webp', text: 'WebP' }, { val: 'jpg', text: 'JPG' }, { val: 'png', text: 'PNG' }] },
            { id: 'quality', type: 'range', label: 'Kalite', min: 10, max: 100, val: 90 }
        ]
    },
    'vid-audio': {
        title: 't_vid_aud_t', desc: 't_vid_aud_d', icon: 'fa-music', color: 'text-roseNeon',
        accept: 'video/*', multiple: false, endpoint: '/api/media/extract-audio',
        options: [
            { id: 'format', type: 'select', label: 'Ses Formatı', options: [{ val: 'mp3', text: 'MP3' }, { val: 'wav', text: 'WAV' }] },
            { id: 'bitrate', type: 'select', label: 'Bitrate', options: [{ val: '320k', text: '320 kbps' }, { val: '192k', text: '192 kbps' }] }
        ]
    }
};

let currentConfig = null;
let currentFiles = [];

// ==========================================
// TOOL OPEN & UI BUILDER
// ==========================================
function openTool(toolId, preloadedFiles) {
    const config = apiTools[toolId];
    if (!config) return showToast('Araç bulunamadı!', 'error');
    currentConfig = config;
    currentFiles = [];

    document.getElementById('dashboard-view').classList.add('hidden');
    document.querySelectorAll('.tool-view').forEach(el => el.classList.add('hidden'));
    document.getElementById('generic-tool-ui').classList.remove('hidden');
    window.scrollTo(0, 0);

    // Meta
    document.getElementById('gen-title').innerHTML = i18n[currentLang][config.title] || config.title;
    document.getElementById('gen-desc').innerHTML = i18n[currentLang][config.desc] || config.desc;
    document.getElementById('gen-icon-container').innerHTML = `<i class="fa-solid ${config.icon}"></i>`;
    document.getElementById('gen-icon-container').className = `w-14 h-14 rounded-2xl bg-slate-800 ${config.color} flex items-center justify-center text-2xl shadow-inner border border-white/5`;

    // Input
    const fileInput = document.getElementById('gen-input');
    fileInput.accept = config.accept;
    fileInput.multiple = config.multiple;
    document.getElementById('gen-accept-text').innerText = `Kabul Edilen: ${config.accept}`;

    // Reset
    resetToolWorkspace();

    // Options
    const optionsContainer = document.getElementById('gen-options');
    optionsContainer.innerHTML = '';
    if (config.options && config.options.length > 0) {
        config.options.forEach(opt => {
            const wrap = document.createElement('div');
            wrap.className = 'flex flex-col bg-slate-900/50 p-4 rounded-xl border border-white/5';
            wrap.innerHTML = `<label class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">${opt.label}</label>`;

            if (opt.type === 'select') {
                const sel = document.createElement('select');
                sel.id = `api-opt-${opt.id}`;
                sel.className = 'w-full bg-slate-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigoSoft border border-slate-700 appearance-none font-medium';
                opt.options.forEach(o => sel.innerHTML += `<option value="${o.val}">${o.text}</option>`);
                wrap.appendChild(sel);
            } else if (opt.type === 'text') {
                const inp = document.createElement('input');
                inp.type = 'text'; inp.id = `api-opt-${opt.id}`; inp.placeholder = opt.placeholder || '';
                inp.className = 'w-full bg-slate-800 text-white px-4 py-3 rounded-lg outline-none focus:ring-2 focus:ring-indigoSoft border border-slate-700 font-mono';
                wrap.appendChild(inp);
            } else if (opt.type === 'range') {
                const rWrap = document.createElement('div'); rWrap.className = 'flex items-center gap-4 mt-2';
                const inp = document.createElement('input');
                inp.type = 'range'; inp.id = `api-opt-${opt.id}`; inp.min = opt.min; inp.max = opt.max; inp.value = opt.val;
                inp.className = 'w-full accent-indigoSoft';
                const valDisp = document.createElement('span'); valDisp.className = 'text-indigoSoft font-bold font-mono min-w-[3rem] text-right'; valDisp.innerText = opt.val;
                inp.oninput = () => valDisp.innerText = inp.value;
                rWrap.appendChild(inp); rWrap.appendChild(valDisp);
                wrap.appendChild(rWrap);
            }
            optionsContainer.appendChild(wrap);
        });
        optionsContainer.classList.remove('hidden');
    } else {
        optionsContainer.classList.add('hidden');
    }

    // Events
    document.getElementById('gen-drop').onclick = () => fileInput.click();
    fileInput.onchange = (e) => handleFilesSelected(e.target.files);

    if (preloadedFiles) handleFilesSelected(preloadedFiles);
}

function resetToolWorkspace() {
    document.getElementById('gen-drop').classList.remove('hidden');
    const ws = document.getElementById('gen-workspace');
    ws.classList.add('hidden');
    ws.classList.remove('flex');
    document.getElementById('gen-result-area').classList.add('hidden');
    document.getElementById('gen-result-area').classList.remove('flex');
    document.getElementById('gen-text-result').classList.add('hidden');
    document.getElementById('gen-text-result').value = '';
    document.getElementById('gen-copy-btn').classList.add('hidden');
    document.getElementById('gen-copy-btn').classList.remove('flex');
    document.getElementById('gen-download-area').classList.add('hidden');
    document.getElementById('gen-download-area').classList.remove('flex');
    document.getElementById('gen-file-list').innerHTML = '';
    document.getElementById('gen-input').value = '';
    currentFiles = [];
}

function handleFilesSelected(files) {
    if (!files || files.length === 0) return;
    if (!currentConfig.multiple && files.length > 1) {
        showToast(currentLang === 'tr' ? 'Lütfen sadece 1 dosya seçin.' : 'Please select only 1 file.', 'error');
        currentFiles = [files[0]];
    } else {
        currentFiles = Array.from(files);
    }

    document.getElementById('gen-drop').classList.add('hidden');
    const ws = document.getElementById('gen-workspace');
    ws.classList.remove('hidden');
    ws.classList.add('flex');

    const listContainer = document.getElementById('gen-file-list');
    listContainer.innerHTML = '';
    currentFiles.forEach(f => {
        const sizeMb = (f.size / (1024 * 1024)).toFixed(2);
        listContainer.innerHTML += `
            <div class="flex items-center gap-4 p-4 bg-slate-800/80 rounded-xl border border-slate-700/50 shadow-sm">
                <i class="fa-solid ${currentConfig.icon} text-2xl ${currentConfig.color}"></i>
                <div class="flex-1 overflow-hidden">
                    <h4 class="text-white font-bold truncate">${f.name}</h4>
                    <p class="text-slate-400 text-xs font-mono mt-1">${sizeMb} MB</p>
                </div>
            </div>
        `;
    });
}

// ==========================================
// SUBMIT — THE REAL API FETCH (NO MOCK)
// ==========================================
document.getElementById('gen-submit').onclick = async () => {
    if (currentFiles.length === 0) return showToast('Lütfen önce dosya yükleyin.', 'error');

    showApiLoading(true, currentConfig.endpoint === '/api/ocr' ? 'Gemini AI Vision analiz ediyor...' : 'Bulut sunucusuna gönderiliyor...');

    try {
        let fetchOptions = {};

        // OCR: Base64 JSON body
        if (currentConfig.endpoint === '/api/ocr') {
            const file = currentFiles[0];
            const base64 = await fileToBase64(file);

            fetchOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ image: base64, mimeType: file.type })
            };
        } else {
            // Other tools: FormData
            const formData = new FormData();
            currentFiles.forEach(f => formData.append('files[]', f));
            if (currentConfig.options) {
                currentConfig.options.forEach(opt => {
                    const el = document.getElementById(`api-opt-${opt.id}`);
                    if (el) formData.append(opt.id, el.value);
                });
            }
            fetchOptions = { method: 'POST', body: formData };
        }

        console.log('[SIPSAK] Fetching:', currentConfig.endpoint);
        const response = await fetch(currentConfig.endpoint, fetchOptions);
        console.log('[SIPSAK] Response status:', response.status, 'Content-Type:', response.headers.get('content-type'));

        const contentType = response.headers.get('content-type') || '';

        if (contentType.includes('application/json')) {
            const data = await response.json();
            console.log('[SIPSAK] JSON data received:', data);

            if (data.success === false) {
                // API error — show in result area, NOT throw
                displayResult('API HATA DETAYI:\n\n' + (data.error || 'Bilinmeyen hata'), true);
                showToast(currentLang === 'tr' ? 'API Hatası!' : 'API Error!', 'error');
            } else {
                // Success — extract text
                const outputText = data.text || data.data || JSON.stringify(data, null, 2);
                displayResult(outputText, false);
                showToast(currentLang === 'tr' ? 'İşlem başarıyla tamamlandı!' : 'Completed successfully!', 'success');
            }
        } else {
            // Binary response (PDF, audio, image)
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            const blob = await response.blob();
            let ext = currentConfig.endpoint.includes('audio') ? 'wav' : (currentConfig.endpoint.includes('image') ? 'jpg' : 'pdf');
            const fmtEl = document.getElementById('api-opt-format');
            const tgtEl = document.getElementById('api-opt-targetFormat');
            if (fmtEl) ext = fmtEl.value;
            if (tgtEl && tgtEl.value !== 'pdf') ext = tgtEl.value;
            displayDownload(blob, `sipsak_processed.${ext}`);
            showToast(currentLang === 'tr' ? 'Dosya hazır!' : 'File ready!', 'success');
        }

    } catch (err) {
        console.error('[SIPSAK] CRITICAL ERROR:', err);
        displayResult('SİSTEM HATASI:\n\n' + err.message, true);
        showToast(currentLang === 'tr' ? `Bağlantı Hatası: ${err.message}` : `Connection Error: ${err.message}`, 'error');
    } finally {
        showApiLoading(false);
    }
};

// ==========================================
// RESULT DISPLAY FUNCTIONS (Tek Kaynak)
// ==========================================
function displayResult(text, isError) {
    const resArea = document.getElementById('gen-result-area');
    const textRes = document.getElementById('gen-text-result');
    const copyBtn = document.getElementById('gen-copy-btn');
    const dlArea = document.getElementById('gen-download-area');

    // Reset all
    resArea.classList.remove('hidden');
    resArea.classList.add('flex');
    dlArea.classList.add('hidden');
    dlArea.classList.remove('flex');

    // Show textarea
    textRes.classList.remove('hidden');
    textRes.value = text;
    textRes.style.color = isError ? '#f87171' : '#4ade80';

    // Show copy button
    copyBtn.classList.remove('hidden');
    copyBtn.classList.add('flex');
    copyBtn.onclick = () => {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(() => showToast('Panoya kopyalandı!', 'success')).catch(() => fallbackCopy(textRes));
        } else {
            fallbackCopy(textRes);
        }
    };

    // Scroll to result
    resArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function fallbackCopy(textareaEl) {
    textareaEl.select();
    document.execCommand('copy');
    showToast('Panoya kopyalandı!', 'success');
}

function displayDownload(blob, filename) {
    const resArea = document.getElementById('gen-result-area');
    const textRes = document.getElementById('gen-text-result');
    const copyBtn = document.getElementById('gen-copy-btn');
    const dlArea = document.getElementById('gen-download-area');
    const dlBtn = document.getElementById('gen-download-btn');

    resArea.classList.remove('hidden');
    resArea.classList.add('flex');
    textRes.classList.add('hidden');
    copyBtn.classList.add('hidden');
    copyBtn.classList.remove('flex');
    dlArea.classList.remove('hidden');
    dlArea.classList.add('flex');

    const url = URL.createObjectURL(blob);
    dlBtn.onclick = () => {
        const a = document.createElement('a');
        a.href = url; a.download = filename;
        document.body.appendChild(a); a.click(); document.body.removeChild(a);
        showToast('İndiriliyor...', 'success');
    };

    resArea.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ==========================================
// UTILITIES
// ==========================================
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}
