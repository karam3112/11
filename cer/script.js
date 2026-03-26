/* =====================================================
   مدرسة الغزالي — script.js
   ===================================================== */

'use strict';

// ── STATE ──────────────────────────────────────────────
const state = {
  template: 'appreciation',
  logoSrc: null,   // base64 or null
  useDefaultLogo: true,
};

// ── TEMPLATE CONFIGS ───────────────────────────────────
const TEMPLATES = {
  appreciation: {
    class: 'tpl-appreciation',
    defaults: {
      title:     'شهادة تقدير واعتزاز',
      intro:     'تمنح هذه الشهادة الرفيعة تقديرًا واعترافًا بالجهد والتميّز',
      highlight: 'لتفوقه المستمر وحسن سلوكه',
      qualities: 'المتميز, المجتهد, القدوة',
      body:      'وإيمانًا بأهمية تكريم المتميزين وتعزيز روح الإبداع والعطاء لدى أبنائنا الطلاب، نُقدِّم لهذا الطالب المتميز هذه الشهادة وفاءً بحقه وتحفيزًا له على مواصلة مسيرته المضيئة.',
    },
  },
  academic: {
    class: 'tpl-academic',
    defaults: {
      title:     'شهادة إنجاز أكاديمي',
      intro:     'تُمنح هذه الشهادة تقديرًا للتحصيل الأكاديمي المتميز',
      highlight: 'لتحقيقه المرتبة الأولى على مستوى الصف',
      qualities: 'الأول على الصف, المتفوق, النموذج الأكاديمي',
      body:      'نشهد بأن هذا الطالب قد أبدى مستوى رفيعًا من الالتزام بالتحصيل العلمي والتفوق الدراسي، وأثبت جدارة تامة باستحقاق هذا التقدير والتكريم.',
    },
  },
  encouragement: {
    class: 'tpl-encouragement',
    defaults: {
      title:     'شهادة تشجيع وتحفيز',
      intro:     'نُقدِّم هذه الشهادة تشجيعًا وتحفيزًا على مواصلة المسيرة',
      highlight: 'لإبدائه تقدمًا ملموسًا ومثابرة في التعلم',
      qualities: 'المثابر, المتطور, الواعد',
      body:      'نُشجّع هذا الطالب على المضي قدمًا في مسيرته التعليمية، إذ أبدى تقدمًا ملحوظًا واجتهادًا واضحًا في سعيه نحو التميز والنجاح.',
    },
  },
  occasion: {
    class: 'tpl-occasion',
    defaults: {
      title:     'شهادة مناسبة',
      intro:     'بمناسبة يوم الطالب المتميز لهذا الفصل الدراسي',
      highlight: 'تميّز وأبهر زملاءه وأساتذته',
      qualities: 'مميز, متألق, ملهم',
      body:      'نُهنّئ هذا الطالب بهذه المناسبة الكريمة، ونأمل أن يواصل مسيرته المتألقة محققًا مزيدًا من النجاح والتفوق في جميع مراحله الدراسية.',
    },
  },
  thanks: {
    class: 'tpl-thanks',
    defaults: {
      title:     'شهادة شكر وتقدير',
      intro:     'تُقدَّم هذه الشهادة شكرًا وعرفانًا بالجهود المبذولة',
      highlight: 'لإسهامه الفاعل في الحياة المدرسية',
      qualities: 'المتعاون, المسؤول, القدوة الحسنة',
      body:      'نتقدم بخالص الشكر والتقدير على ما أبداه من تعاون وإسهام في خدمة المجتمع المدرسي، ونُقدِّر هذه الجهود الطيبة التي تستحق كل ثناء وتكريم.',
    },
  },
  teacher: {
    class: 'tpl-teacher',
    defaults: {
      title:     'شهادة تقدير لمعلم/ة متميز/ة',
      intro:     'تُمنح هذه الشهادة اعترافًا بالعطاء التربوي المتميز',
      highlight: 'لما أبدته من إخلاص ودقة وحرص على نجاح الطلاب',
      qualities: 'المعلمة المثالية, القدوة التربوية, الملهِمة',
      body:      'وفاءً لهذه المعلمة الفاضلة التي بذلت جهدًا استثنائيًا في خدمة الرسالة التربوية، وأثّرت إيجابيًا في نفوس طلابها بعلمها وإخلاصها وحسن تعاملها.',
    },
  },
  honor: {
    class: 'tpl-honor',
    defaults: {
      title:     'شهادة فخرية',
      intro:     'تُمنح هذه الشهادة الفخرية تكريمًا رفيعًا لمكانة متميزة',
      highlight: 'رفع اسم مدرسته عاليًا في المحافل والمسابقات',
      qualities: 'الفخر, العزة, الإنجاز الاستثنائي',
      body:      'نُسجِّل بهذه الشهادة الفخرية إعجابنا العميق بهذا الطالب البطل الذي رفع اسم مدرستنا في المحافل الوطنية، وكان سفيرًا حقيقيًا لمدرسة الغزالي.',
    },
  },
  medal: {
    class: 'tpl-medal',
    defaults: {
      title:     'وسام الغزالي',
      intro:     'يُمنح هذا الوسام الرفيع لمن بلغ أعلى درجات التميز والإنجاز',
      highlight: 'إكليل الشرف لأعلى مراتب التفوق',
      qualities: 'الإنجاز الاستثنائي, التفوق النادر, رمز الفخر',
      body:      'بموجب السلطة الممنوحة لنا، نُكرِّم هذا المتميز النادر بوسام الغزالي — أعلى تكريم تمنحه مدرستنا — اعترافًا بإنجاز استثنائي يُخلَّد في سجلات المدرسة ويُحتذى به جيلًا بعد جيل.',
    },
  },
};

// ── LOGO STATE ─────────────────────────────────────────
function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    state.logoSrc = e.target.result;
    // show preview
    const img = document.getElementById('logoPreviewImg');
    const placeholder = document.getElementById('logoPlaceholder');
    img.src = state.logoSrc;
    img.style.display = 'block';
    placeholder.style.display = 'none';
    document.getElementById('btnRemoveLogo').style.display = 'inline-block';
    updatePreview();
  };
  reader.readAsDataURL(file);
}

function removeLogo() {
  state.logoSrc = null;
  const img = document.getElementById('logoPreviewImg');
  const placeholder = document.getElementById('logoPlaceholder');
  img.src = '';
  img.style.display = 'none';
  placeholder.style.display = 'flex';
  document.getElementById('btnRemoveLogo').style.display = 'none';
  document.getElementById('logoInput').value = '';
  updatePreview();
}

// ── TEMPLATE SELECTION ─────────────────────────────────
function selectTemplate(el, tpl) {
  document.querySelectorAll('.tpl-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  state.template = tpl;
  // fill defaults only if fields are empty
  const cfg = TEMPLATES[tpl].defaults;
  setDefault('fldTitle',     cfg.title);
  setDefault('fldIntro',     cfg.intro);
  setDefault('fldHighlight', cfg.highlight);
  setDefault('fldQualities', cfg.qualities);
  setDefault('fldBody',      cfg.body);
  updatePreview();
}

function setDefault(id, val) {
  const el = document.getElementById(id);
  // always overwrite with template default to give feel of template switching
  el.value = val;
}

// ── GET FIELD VALUES ───────────────────────────────────
function fv(id) { return (document.getElementById(id).value || '').trim(); }

function getQualities() {
  const raw = fv('fldQualities');
  if (!raw) return [];
  return raw.split(/[,،]+/).map(s => s.trim()).filter(Boolean);
}

// ── FONT SIZE ADAPTATION ───────────────────────────────
function adaptNameSize(name) {
  const len = name.length;
  if (len <= 12) return '44px';
  if (len <= 18) return '36px';
  if (len <= 24) return '29px';
  return '24px';
}

function adaptBodySize(text) {
  const len = text.length;
  if (len <= 120) return '15px';
  if (len <= 220) return '13.5px';
  return '12.5px';
}

// ── BUILD CERTIFICATE HTML ─────────────────────────────
function buildCertHTML() {
  const tpl     = state.template;
  const cfg     = TEMPLATES[tpl];
  const name    = fv('fldName')     || 'اسم الطالب / المكرَّم';
  const title   = fv('fldTitle')    || cfg.defaults.title;
  const intro   = fv('fldIntro')    || cfg.defaults.intro;
  const hl      = fv('fldHighlight')|| cfg.defaults.highlight;
  const body    = fv('fldBody')     || cfg.defaults.body;
  const signer  = fv('fldSigner')   || 'مدير المدرسة';
  const sTitle  = fv('fldSignerTitle') || 'المدير العام';
  const date    = fv('fldDate')     || getHijriToday();
  const school  = fv('fldSchool')   || 'مدرسة الغزالي';
  const tagline = fv('fldTagline')  || 'نحو مستقبل مشرق بالعلم والقيم';
  const quals   = getQualities();

  // Logo
  const logoHTML = state.logoSrc
    ? `<div class="cert-logo-wrap"><img src="${state.logoSrc}" alt="شعار" /></div>`
    : `<div class="cert-logo-placeholder">غ</div>`;

  // Qualities
  const qualsHTML = quals.length > 0
    ? `<div class="cert-qualities">${quals.map(q => `<span class="cert-quality-tag">${q}</span>`).join('')}</div>`
    : '';

  // Medal extra star
  const medalStar = tpl === 'medal'
    ? `<div class="cert-star">✦ ✦ ✦</div>`
    : '';

  return `
    <div class="cert-bg"></div>
    <div class="cert-border"></div>
    <div class="cert-border-inner cert-border-inner-b"></div>

    <div class="cert-header">
      ${logoHTML}
      <div class="cert-school-info">
        <div class="cert-school-name">${school}</div>
        <div class="cert-school-tagline">${tagline}</div>
      </div>
      ${logoHTML}
    </div>

    <div class="cert-divider-gold"></div>

    <div class="cert-content">
      <div class="cert-title">${title}</div>
      <div class="cert-intro">${intro}</div>
      <div class="cert-divider-small"></div>
      <div class="cert-name" style="font-size:${adaptNameSize(name)}">${name}</div>
      ${qualsHTML}
      ${hl ? `<div class="cert-highlight">${hl}</div>` : ''}
      ${medalStar}
      <div class="cert-divider-small"></div>
      <div class="cert-body" style="font-size:${adaptBodySize(body)}">${body}</div>
    </div>

    <div class="cert-footer">
      <div class="cert-signer">
        <div class="cert-signer-line"></div>
        <div class="cert-signer-name">${signer}</div>
        <div class="cert-signer-title">${sTitle}</div>
      </div>
      <div class="cert-date-area">
        <div class="cert-date-label">التاريخ</div>
        <div class="cert-date-val">${date}</div>
      </div>
      <div class="cert-footer-school">
        <div class="cert-footer-school-name">${school}</div>
        <div class="cert-footer-school-tag">${tagline}</div>
      </div>
    </div>
  `;
}

// ── UPDATE PREVIEW ─────────────────────────────────────
function updatePreview() {
  const cert = document.getElementById('certificate');
  const tpl  = state.template;
  const cfg  = TEMPLATES[tpl];

  // Remove all template classes
  Object.values(TEMPLATES).forEach(t => cert.classList.remove(t.class));
  cert.classList.add(cfg.class);

  cert.innerHTML = buildCertHTML();
  scalePreview();
}

function scalePreview() {
  const wrap   = document.querySelector('.preview-wrap');
  const scaler = document.getElementById('previewScaler');
  const certW  = 900;
  const availW = wrap.clientWidth - 40;
  const scale  = Math.min(1, availW / certW);
  scaler.style.transform = `scale(${scale})`;
  scaler.style.transformOrigin = 'top center';
  // adjust wrap height
  const certH = 636;
  wrap.style.minHeight = (certH * scale + 40) + 'px';
}

// ── CAPTURE CERTIFICATE ────────────────────────────────
async function captureCert() {
  const cert = document.getElementById('certificate');
  // temporarily reset transform
  const scaler = document.getElementById('previewScaler');
  const prev = scaler.style.transform;
  scaler.style.transform = 'scale(1)';
  await new Promise(r => setTimeout(r, 80));

  const canvas = await html2canvas(cert, {
    scale: 3,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    width: 900,
    height: 636,
    logging: false,
  });

  scaler.style.transform = prev;
  return canvas;
}

// ── DOWNLOAD PNG ───────────────────────────────────────
async function downloadPNG() {
  showToast('⏳ جاري تجهيز الصورة...');
  try {
    const canvas = await captureCert();
    const link = document.createElement('a');
    link.download = 'شهادة-الغزالي.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('✅ تم تحميل الصورة بنجاح');
  } catch (e) {
    showToast('❌ حدث خطأ، حاول مجددًا');
    console.error(e);
  }
}

// ── DOWNLOAD PDF ───────────────────────────────────────
async function downloadPDF() {
  showToast('⏳ جاري تجهيز ملف PDF...');
  try {
    const canvas = await captureCert();
    const { jsPDF } = window.jspdf;
    // A4 landscape
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' });
    const pageW = pdf.internal.pageSize.getWidth();
    const pageH = pdf.internal.pageSize.getHeight();
    const imgData = canvas.toDataURL('image/png');

    // fit cert into A4 landscape with margins
    const margin = 10;
    const imgW = pageW - margin * 2;
    const imgH = imgW * (636 / 900);
    const y = (pageH - imgH) / 2;

    pdf.addImage(imgData, 'PNG', margin, y, imgW, imgH);
    pdf.save('شهادة-الغزالي.pdf');
    showToast('✅ تم تصدير PDF بنجاح');
  } catch (e) {
    showToast('❌ حدث خطأ، حاول مجددًا');
    console.error(e);
  }
}

// ── PRINT ─────────────────────────────────────────────
function printCertificate() {
  window.print();
}

// ── TOAST ─────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ── HIJRI DATE HELPER ─────────────────────────────────
function getHijriToday() {
  try {
    const d = new Date();
    const hijri = new Intl.DateTimeFormat('ar-SA-u-ca-islamic', {
      day:   'numeric',
      month: 'numeric',
      year:  'numeric',
    }).format(d);
    return hijri + ' هـ';
  } catch {
    return new Date().toLocaleDateString('ar');
  }
}

// ── INIT ──────────────────────────────────────────────
function init() {
  // Pre-fill school fields
  document.getElementById('fldSchool').value  = 'مدرسة الغزالي';
  document.getElementById('fldTagline').value = 'نحو مستقبل مشرق بالعلم والقيم';
  document.getElementById('fldSigner').value  = 'مدير المدرسة';
  document.getElementById('fldSignerTitle').value = 'المدير العام';
  document.getElementById('fldDate').value    = getHijriToday();

  // Load first template defaults
  const cfg = TEMPLATES['appreciation'].defaults;
  document.getElementById('fldTitle').value     = cfg.title;
  document.getElementById('fldIntro').value     = cfg.intro;
  document.getElementById('fldHighlight').value = cfg.highlight;
  document.getElementById('fldQualities').value = cfg.qualities;
  document.getElementById('fldBody').value      = cfg.body;
  document.getElementById('fldName').value      = 'أحمد محمد الزهراني';

  updatePreview();

  // Rescale on resize
  window.addEventListener('resize', scalePreview);
}

document.addEventListener('DOMContentLoaded', init);
