// sipsak.com — v3.0 Production Build

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
function showToast(msg, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    const icons = { success: 'fa-check', error: 'fa-xmark', info: 'fa-info' };
    const colors = { success: 'text-emerald-400', error: 'text-rose-400', info: 'text-indigo-400' };
    toast.innerHTML = `<i class="fa-solid ${icons[type] || icons.info} ${colors[type] || colors.info} text-sm"></i> <span>${msg}</span>`;
    container.appendChild(toast);
    setTimeout(() => { toast.classList.add('fade-out'); setTimeout(() => toast.remove(), 250); }, 3500);
}

// ==========================================
// LOADING STATE
// ==========================================
function showApiLoading(show, statusText) {
    const overlay = document.getElementById('api-loading-overlay');
    const bar = document.getElementById('api-progress-bar');
    const text = document.getElementById('api-loading-text');
    if (show) {
        overlay.classList.remove('hidden'); overlay.classList.add('flex');
        bar.style.width = '0%';
        if (text && statusText) text.textContent = statusText;
        let p = 0;
        window._progressTimer = setInterval(() => { p += Math.random() * 10; if (p > 90) p = 90; bar.style.width = `${p}%`; }, 400);
    } else {
        clearInterval(window._progressTimer);
        bar.style.width = '100%';
        setTimeout(() => { overlay.classList.remove('flex'); overlay.classList.add('hidden'); }, 350);
    }
}

// ==========================================
// i18n
// ==========================================
const i18n = {
    tr: {
        page_title: "sipsak.com — Dosya İşleme Platformu", nav_api: "Çevrimiçi",
        cat_all: "Tümü", hero_1: "Dosyalarınızı işleyin.", hero_2: "Saniyeler içinde.",
        hero_sub: "PDF, görsel, video ve ofis dosyalarınızı bulut yapay zeka motoruyla hızlıca dönüştürün.",
        global_drop: "Dosyayı bırakın", global_drop_sub: "Otomatik olarak doğru araca yönlendirilecek.",
        api_loading: "İşleniyor", btn_back: "Geri",
        t_pdf_split_t: "PDF Bölücü", t_pdf_split_d: "Sayfa aralığı belirleyerek PDF'i hızlıca ayırın.",
        t_pdf_merge_t: "PDF Birleştirici", t_pdf_merge_d: "Birden fazla PDF'i tek dosyada birleştirin.",
        t_pdf_comp_t: "PDF Sıkıştırıcı", t_pdf_comp_d: "Kaliteyi koruyarak dosya boyutunu küçültün.",
        t_off_cvrt_t: "Belge Dönüştürücü", t_off_cvrt_d: "Word, Excel, PPTX dosyalarını PDF veya HTML'e çevirin.",
        t_img_fmt_t: "Görsel Dönüştürücü", t_img_fmt_d: "WebP, PNG, JPG formatları arasında dönüştürme yapın.",
        t_img_ocr_t: "AI OCR Motoru", t_img_ocr_d: "Görsellerdeki metni yapay zeka ile okuyun.",
        t_vid_aud_t: "Ses Ayıklayıcı", t_vid_aud_d: "Videolardan ses kanalını MP3 veya WAV olarak çıkarın.",
        seo_rights: "Tüm hakları saklıdır."
    },
    en: {
        page_title: "sipsak.com — File Processing Platform", nav_api: "Online",
        cat_all: "All", hero_1: "Process your files.", hero_2: "In seconds.",
        hero_sub: "Convert PDF, image, video and office files instantly with cloud AI engine.",
        global_drop: "Drop your file", global_drop_sub: "It will be routed to the right tool automatically.",
        api_loading: "Processing", btn_back: "Back",
        t_pdf_split_t: "PDF Splitter", t_pdf_split_d: "Split PDFs by defining page ranges.",
        t_pdf_merge_t: "PDF Merger", t_pdf_merge_d: "Merge multiple PDFs into a single file.",
        t_pdf_comp_t: "PDF Compressor", t_pdf_comp_d: "Reduce file size while preserving quality.",
        t_off_cvrt_t: "Document Converter", t_off_cvrt_d: "Convert Word, Excel, PPTX to PDF or HTML.",
        t_img_fmt_t: "Image Converter", t_img_fmt_d: "Convert between WebP, PNG, and JPG formats.",
        t_img_ocr_t: "AI OCR Engine", t_img_ocr_d: "Read text from images using AI.",
        t_vid_aud_t: "Audio Extractor", t_vid_aud_d: "Extract audio from videos as MP3 or WAV.",
        seo_rights: "All rights reserved."
    }
};

let currentLang = 'tr';
function toggleLanguage() {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    document.getElementById('lang-btn').innerHTML = `${currentLang.toUpperCase()} <i class="fa-solid fa-globe text-zinc-500"></i>`;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) el.innerHTML = i18n[currentLang][key];
    });
    showToast(currentLang === 'tr' ? 'Türkçe' : 'English', 'success');
}

// ==========================================
// ROUTING
// ==========================================
function showDashboard() {
    document.querySelectorAll('.tool-view').forEach(el => el.classList.add('hidden'));
    document.getElementById('dashboard-view').classList.remove('hidden');
    window.scrollTo(0, 0);
}

function filterCategory(cat) {
    document.querySelectorAll('.cat-btn').forEach(b => { b.classList.remove('active', 'text-accent', 'font-semibold'); b.classList.add('text-zinc-500'); });
    event.currentTarget.classList.add('active', 'text-accent', 'font-semibold');
    event.currentTarget.classList.remove('text-zinc-500');
    document.querySelectorAll('.tool-card').forEach(card => {
        card.style.display = (cat === 'all' || card.dataset.cat === cat) ? '' : 'none';
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
        const f = e.dataTransfer.files[0], n = f.name.toLowerCase();
        if (n.endsWith('.pdf')) openTool('pdf-split', e.dataTransfer.files);
        else if (/\.(docx?|xlsx?|pptx?)$/.test(n)) openTool('office-convert', e.dataTransfer.files);
        else if (f.type.startsWith('image/')) openTool('img-ocr', e.dataTransfer.files);
        else if (f.type.startsWith('video/')) openTool('vid-audio', e.dataTransfer.files);
        else showToast('Desteklenmeyen dosya türü', 'error');
    }
});

// ==========================================
// TOOL CONFIG
// ==========================================
const apiTools = {
    'pdf-split': { title: 't_pdf_split_t', desc: 't_pdf_split_d', icon: 'fa-scissors', color: 'text-red-400', accept: 'application/pdf', multiple: false, endpoint: '/api/pdf/split',
        options: [{ id: 'pageRange', type: 'text', label: 'Sayfa Aralığı', placeholder: '1-5, 8' }] },
    'pdf-merge': { title: 't_pdf_merge_t', desc: 't_pdf_merge_d', icon: 'fa-layer-group', color: 'text-red-400', accept: 'application/pdf', multiple: true, endpoint: '/api/pdf/merge', options: [] },
    'pdf-compress': { title: 't_pdf_comp_t', desc: 't_pdf_comp_d', icon: 'fa-compress', color: 'text-red-400', accept: 'application/pdf', multiple: false, endpoint: '/api/pdf/compress',
        options: [{ id: 'quality', type: 'select', label: 'Kalite', options: [{ val: 'high', text: 'Maksimum' }, { val: 'balanced', text: 'Dengeli' }, { val: 'lossless', text: 'Kayıpsız' }] }] },
    'office-convert': { title: 't_off_cvrt_t', desc: 't_off_cvrt_d', icon: 'fa-file-lines', color: 'text-blue-400', accept: '.docx,.xlsx,.pptx,.doc,.xls', multiple: false, endpoint: '/api/office/convert',
        options: [{ id: 'targetFormat', type: 'select', label: 'Hedef Format', options: [{ val: 'pdf', text: 'PDF' }, { val: 'html', text: 'HTML' }, { val: 'json', text: 'JSON' }] }] },
    'img-ocr': { title: 't_img_ocr_t', desc: 't_img_ocr_d', icon: 'fa-eye', color: 'text-amber-400', accept: 'image/*', multiple: false, endpoint: '/api/ocr',
        options: [{ id: 'lang', type: 'select', label: 'Dil', options: [{ val: 'auto', text: 'Otomatik' }, { val: 'tur', text: 'Türkçe' }, { val: 'eng', text: 'English' }] }] },
    'img-format': { title: 't_img_fmt_t', desc: 't_img_fmt_d', icon: 'fa-image', color: 'text-violet-400', accept: 'image/*', multiple: false, endpoint: '/api/media/convert-image',
        options: [{ id: 'format', type: 'select', label: 'Format', options: [{ val: 'webp', text: 'WebP' }, { val: 'jpg', text: 'JPG' }, { val: 'png', text: 'PNG' }] },
                  { id: 'quality', type: 'range', label: 'Kalite', min: 10, max: 100, val: 85 }] },
    'vid-audio': { title: 't_vid_aud_t', desc: 't_vid_aud_d', icon: 'fa-music', color: 'text-rose-400', accept: 'video/*', multiple: false, endpoint: '/api/media/extract-audio',
        options: [{ id: 'format', type: 'select', label: 'Format', options: [{ val: 'mp3', text: 'MP3' }, { val: 'wav', text: 'WAV' }] },
                  { id: 'bitrate', type: 'select', label: 'Bitrate', options: [{ val: '320k', text: '320 kbps' }, { val: '192k', text: '192 kbps' }] }] }
};

let currentConfig = null;
let currentFiles = [];

// ==========================================
// TOOL UI
// ==========================================
function openTool(toolId, preloadedFiles) {
    const config = apiTools[toolId];
    if (!config) return showToast('Araç bulunamadı', 'error');
    currentConfig = config;
    currentFiles = [];

    document.getElementById('dashboard-view').classList.add('hidden');
    document.querySelectorAll('.tool-view').forEach(el => el.classList.add('hidden'));
    document.getElementById('generic-tool-ui').classList.remove('hidden');
    window.scrollTo(0, 0);

    document.getElementById('gen-title').innerHTML = i18n[currentLang][config.title] || config.title;
    document.getElementById('gen-desc').innerHTML = i18n[currentLang][config.desc] || config.desc;
    document.getElementById('gen-icon-container').innerHTML = `<i class="fa-solid ${config.icon}"></i>`;
    document.getElementById('gen-icon-container').className = `w-11 h-11 rounded-xl bg-zinc-800 ${config.color} flex items-center justify-center text-lg border border-white/[0.04]`;

    const fileInput = document.getElementById('gen-input');
    fileInput.accept = config.accept;
    fileInput.multiple = config.multiple;
    document.getElementById('gen-accept-text').innerText = config.accept;

    resetToolWorkspace();
    buildOptions(config);

    document.getElementById('gen-drop').onclick = () => fileInput.click();
    fileInput.onchange = (e) => handleFilesSelected(e.target.files);
    if (preloadedFiles) handleFilesSelected(preloadedFiles);
}

function buildOptions(config) {
    const container = document.getElementById('gen-options');
    container.innerHTML = '';
    if (!config.options || config.options.length === 0) { container.classList.add('hidden'); return; }

    config.options.forEach(opt => {
        const wrap = document.createElement('div');
        wrap.className = 'flex flex-col gap-1.5';
        wrap.innerHTML = `<label class="text-[11px] font-semibold text-zinc-500 uppercase tracking-wider">${opt.label}</label>`;

        if (opt.type === 'select') {
            const sel = document.createElement('select');
            sel.id = `api-opt-${opt.id}`;
            sel.className = 'w-full bg-zinc-800/80 text-white px-3 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-accent/50 border border-zinc-700/50 text-sm font-medium appearance-none';
            opt.options.forEach(o => sel.innerHTML += `<option value="${o.val}">${o.text}</option>`);
            wrap.appendChild(sel);
        } else if (opt.type === 'text') {
            const inp = document.createElement('input');
            Object.assign(inp, { type: 'text', id: `api-opt-${opt.id}`, placeholder: opt.placeholder || '' });
            inp.className = 'w-full bg-zinc-800/80 text-white px-3 py-2.5 rounded-lg outline-none focus:ring-1 focus:ring-accent/50 border border-zinc-700/50 font-mono text-sm';
            wrap.appendChild(inp);
        } else if (opt.type === 'range') {
            const rw = document.createElement('div'); rw.className = 'flex items-center gap-3 mt-1';
            const inp = document.createElement('input');
            Object.assign(inp, { type: 'range', id: `api-opt-${opt.id}`, min: opt.min, max: opt.max, value: opt.val });
            inp.className = 'w-full accent-accent';
            const v = document.createElement('span'); v.className = 'text-accent font-semibold font-mono text-sm min-w-[2.5rem] text-right'; v.innerText = opt.val;
            inp.oninput = () => v.innerText = inp.value;
            rw.appendChild(inp); rw.appendChild(v); wrap.appendChild(rw);
        }
        container.appendChild(wrap);
    });
    container.classList.remove('hidden');
}

function resetToolWorkspace() {
    document.getElementById('gen-drop').classList.remove('hidden');
    const ws = document.getElementById('gen-workspace');
    ws.classList.add('hidden'); ws.classList.remove('flex');
    const res = document.getElementById('gen-result-area');
    res.classList.add('hidden'); res.classList.remove('flex');
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
    currentFiles = currentConfig.multiple ? Array.from(files) : [files[0]];

    document.getElementById('gen-drop').classList.add('hidden');
    const ws = document.getElementById('gen-workspace');
    ws.classList.remove('hidden'); ws.classList.add('flex');

    const list = document.getElementById('gen-file-list');
    list.innerHTML = '';
    currentFiles.forEach(f => {
        const mb = (f.size / (1024 * 1024)).toFixed(2);
        list.innerHTML += `
            <div class="flex items-center gap-3 p-3 bg-zinc-800/50 rounded-xl border border-white/[0.04]">
                <i class="fa-solid ${currentConfig.icon} text-lg ${currentConfig.color}"></i>
                <div class="flex-1 min-w-0">
                    <p class="text-sm font-medium text-white truncate">${f.name}</p>
                    <p class="text-zinc-500 text-xs font-mono">${mb} MB</p>
                </div>
            </div>`;
    });
}

// ==========================================
// API SUBMIT
// ==========================================
const submitBtn = document.getElementById('gen-submit');
if (submitBtn) {
    const btn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(btn, submitBtn);

    btn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (currentFiles.length === 0) return showToast('Dosya yükleyin', 'error');

        const isOCR = currentConfig.endpoint.includes('/api/ocr');
        showApiLoading(true, isOCR ? 'AI analiz ediyor...' : 'İşleniyor...');

        try {
            let opts = {};
            if (isOCR) {
                const file = currentFiles[0];
                const base64 = await fileToBase64(file);
                opts = { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ image: base64, mimeType: file.type }) };
            } else {
                const fd = new FormData();
                currentFiles.forEach(f => fd.append('files[]', f));
                if (currentConfig.options) currentConfig.options.forEach(o => { const el = document.getElementById(`api-opt-${o.id}`); if (el) fd.append(o.id, el.value); });
                opts = { method: 'POST', body: fd };
            }

            const res = await fetch(currentConfig.endpoint, opts);
            const ct = res.headers.get('content-type') || '';

            if (ct.includes('application/json')) {
                const data = await res.json();
                if (data.success === false) {
                    displayResult('Hata: ' + (data.error || `HTTP ${res.status}`), true);
                    showToast('İşlem başarısız', 'error');
                } else {
                    displayResult(data.text || data.data || JSON.stringify(data, null, 2), false);
                    showToast('Tamamlandı', 'success');
                }
            } else {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const blob = await res.blob();
                let ext = currentConfig.endpoint.includes('audio') ? 'wav' : 'pdf';
                const fmtEl = document.getElementById('api-opt-format');
                if (fmtEl) ext = fmtEl.value;
                displayDownload(blob, `sipsak.${ext}`);
                showToast('Dosya hazır', 'success');
            }
        } catch (err) {
            displayResult('Bağlantı hatası: ' + err.message, true);
            showToast(err.message, 'error');
        } finally {
            showApiLoading(false);
        }
    });
}

// ==========================================
// DISPLAY
// ==========================================
function displayResult(text, isError) {
    const area = document.getElementById('gen-result-area');
    const ta = document.getElementById('gen-text-result');
    const cp = document.getElementById('gen-copy-btn');
    const dl = document.getElementById('gen-download-area');

    area.classList.remove('hidden'); area.classList.add('flex');
    dl.classList.add('hidden'); dl.classList.remove('flex');
    ta.classList.remove('hidden');
    ta.value = text;
    ta.style.color = isError ? '#fb7185' : '#34d399';
    cp.classList.remove('hidden'); cp.classList.add('flex');
    cp.onclick = () => {
        if (navigator.clipboard) navigator.clipboard.writeText(text).then(() => showToast('Kopyalandı', 'success')).catch(() => { ta.select(); document.execCommand('copy'); showToast('Kopyalandı', 'success'); });
        else { ta.select(); document.execCommand('copy'); showToast('Kopyalandı', 'success'); }
    };
    area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function displayDownload(blob, filename) {
    const area = document.getElementById('gen-result-area');
    const ta = document.getElementById('gen-text-result');
    const cp = document.getElementById('gen-copy-btn');
    const dl = document.getElementById('gen-download-area');
    const btn = document.getElementById('gen-download-btn');

    area.classList.remove('hidden'); area.classList.add('flex');
    ta.classList.add('hidden'); cp.classList.add('hidden'); cp.classList.remove('flex');
    dl.classList.remove('hidden'); dl.classList.add('flex');

    const url = URL.createObjectURL(blob);
    btn.onclick = () => { const a = document.createElement('a'); a.href = url; a.download = filename; document.body.appendChild(a); a.click(); a.remove(); showToast('İndiriliyor...', 'success'); };
    area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// ==========================================
// UTILITY
// ==========================================
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const r = new FileReader();
        r.onload = () => resolve(r.result);
        r.onerror = reject;
        r.readAsDataURL(file);
    });
}

// Global scope for inline handlers
window.toggleLanguage = toggleLanguage;
window.showDashboard = showDashboard;
window.filterCategory = filterCategory;
window.openTool = openTool;
