/**
 * ==============================================================================
 * NexuSend Enterprise — Advanced Interactive Engine
 * 1. Multi-Industry WhatsApp Simulator (Papelería, Ferretería, Servicios)
 * 2. Web Audio API Notification Synthesizer (Realistic WA Sound Effects)
 * 3. Full-Resolution Interactive Screenshot Lightbox with Zoom Controls
 * 4. Interactive OCR Vision Scanner Demo (School Supply List Analysis)
 * 5. Dynamic ROI Calculator with Real-Time Reactive Counters
 * 6. Monthly / Annual Billing Toggle with Savings Calculator
 * 7. Confetti Bursts & Interactive Plan Order Modal
 * ==============================================================================
 */

// Central Demo Configuration (Jonathan can replace with his new demo number)
const DEMO_CONFIG = {
  phoneNumber: "593984856914", // <-- Modifica este número cuando conectes tu nuevo chip SIM
  displayNumber: "+593 98 485 6914",
  defaultMessage: "Hola, deseo probar el asistente inteligente de NexuSend en vivo para mi negocio"
};

// State Store
const STATE = {
  currentIndustry: "papeleria", // 'papeleria' | 'ferreteria' | 'servicios'
  soundEnabled: true,
  lightboxZoom: 1,
  billingPeriod: "monthly"
};

// Web Audio API Sound Synthesizer (Zero external audio file dependency)
class SoundFx {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playSent() {
    if (!STATE.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1400, this.ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch (e) {
      // Audio not supported or blocked by browser policy
    }
  }

  playReceived() {
    if (!STATE.soundEnabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "sine";
      osc2.type = "sine";

      osc1.frequency.setValueAtTime(659.25, now); // E5
      osc1.frequency.setValueAtTime(880, now + 0.08); // A5

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

      osc1.connect(gain);
      gain.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.22);
    } catch (e) {
      // Audio not supported
    }
  }
}

const sounds = new SoundFx();

// ==========================================
// SIMULATOR INDUSTRY SCENARIOS
// ==========================================
const SCENARIOS = {
  papeleria: {
    title: "Multiservicios Tisaleo",
    subtitle: "En línea • Papelería & Trámites",
    chips: [
      {
        icon: "camera",
        label: "📸 Escanear foto de lista de útiles",
        msg: "Hola, coticemos esta lista de útiles escolares por favor (adjunto foto)"
      },
      {
        icon: "file-text",
        label: "📄 Enviar PDF para impresión",
        msg: "Buenos días, le adjunto el archivo PDF para imprimir en A3 y a color"
      },
      {
        icon: "book-open",
        label: "✏️ Cotizar cuadernos y resma",
        msg: "¿Cuánto cuestan 3 cuadernos universitarios de 100h y una resma de papel bond?"
      },
      {
        icon: "user-check",
        label: "👤 Traspaso a asesor humano",
        msg: "Quiero hablar con una persona de ventas por favor"
      }
    ],
    greeting: `¡Hola! 👋 Te damos la bienvenida a <strong>Multiservicios Tisaleo</strong>.<br>
    Puedo cotizar tus <strong>listas de útiles completas por foto</strong>, recibir documentos en PDF para imprimir, consultar trámites del SRI/Registro Civil y darte precios oficiales. ¿En qué te ayudamos hoy?`
  },
  ferreteria: {
    title: "Ferretería Bycas",
    subtitle: "En línea • Materiales & Herramientas",
    chips: [
      {
        icon: "package",
        label: "💰 Cemento Holcim y Selvalegre",
        msg: "¿Qué precio tiene el saco de cemento Holcim 50kg y Selvalegre? ¿Tienen stock?"
      },
      {
        icon: "truck",
        label: "🚚 Consultar flete a domicilio",
        msg: "¿Tienen entrega a domicilio para materiales pesados en la ciudad?"
      },
      {
        icon: "file-text",
        label: "📎 Catálogo de tuberías PVC",
        msg: "Por favor envíame la lista de precios de tuberías y conexiones de agua"
      },
      {
        icon: "user-check",
        label: "👤 Hablar con asesor de obra",
        msg: "Necesito proforma para crédito de construcción con un asesor humano"
      }
    ],
    greeting: `¡Hola! Bienvenido a <strong>Ferretería Bycas</strong> 🏗️.<br>
    Cotizamos cemento, varillas de hierro, herramientas y fontanería al instante las 24 horas. ¿Qué material necesitas para tu obra?`
  },
  servicios: {
    title: "Centro Médico & Dental",
    subtitle: "En línea • Citas & Consultas",
    chips: [
      {
        icon: "calendar",
        label: "🗓️ Agendar cita de valoración",
        msg: "Hola, deseo agendar una cita de valoración para este viernes por la tarde"
      },
      {
        icon: "credit-card",
        label: "💳 Formas de pago aceptadas",
        msg: "¿Qué métodos de pago reciben? ¿Aceptan tarjeta o Payphone?"
      },
      {
        icon: "map-pin",
        label: "📍 Dirección y horarios",
        msg: "¿En qué dirección están ubicados y cuál es el horario de atención?"
      },
      {
        icon: "user-check",
        label: "👤 Traspaso a recepción",
        msg: "Quiero consultar un caso especial con la doctora encargada"
      }
    ],
    greeting: `¡Hola! Bienvenido a nuestro <strong>Centro de Atención</strong> 🩺.<br>
    Puedo ayudarte a agendar citas, verificar horarios disponibles y darte información sobre tratamientos y medios de pago. ¿Cómo podemos ayudarte?`
  }
};

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  initNavbar();
  initIndustryTabs();
  initSimulator();
  initSoundToggle();
  initScreenshotLightbox();
  initOcrScannerDemo();
  initRoiCalculator();
  initPricingToggle();
  initFaqAccordion();
  initModalTriggers();
  syncDemoConfig();

  // Floating WA Widget interaction
  initFloatingWidget();
});

function syncDemoConfig() {
  const displayEl = document.getElementById("modal-phone-display");
  const waLinkEl = document.getElementById("modal-wa-link");
  if (displayEl) {
    displayEl.textContent = `${DEMO_CONFIG.displayNumber} (Demo Activo)`;
  }
  if (waLinkEl) {
    waLinkEl.href = `https://wa.me/${DEMO_CONFIG.phoneNumber}?text=${encodeURIComponent(DEMO_CONFIG.defaultMessage)}`;
  }
}

function initNavbar() {
  const nav = document.getElementById("main-nav");
  if (!nav) return;
  window.addEventListener("scroll", () => {
    if (window.scrollY > 25) {
      nav.classList.add("nav-scrolled");
    } else {
      nav.classList.remove("nav-scrolled");
    }
  });

  const mobileBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  if (mobileBtn && mobileMenu) {
    mobileBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => mobileMenu.classList.add("hidden"));
    });
  }
}

// ==========================================
// INDUSTRY TABS SWITCHER
// ==========================================
function initIndustryTabs() {
  const buttons = document.querySelectorAll(".industry-tab-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const industry = btn.getAttribute("data-industry");
      if (!industry || industry === STATE.currentIndustry) return;

      STATE.currentIndustry = industry;

      // Update button visual styles
      buttons.forEach(b => {
        b.className = "industry-tab-btn px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-all cursor-pointer flex items-center gap-2";
      });
      btn.className = "industry-tab-btn px-4 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white shadow-md shadow-emerald-600/20 transition-all cursor-pointer flex items-center gap-2";

      loadIndustryScenario(industry);
    });
  });
}

function loadIndustryScenario(industry) {
  const data = SCENARIOS[industry];
  if (!data) return;

  // Update simulator top bar
  const titleEl = document.getElementById("sim-brand-title");
  const subEl = document.getElementById("sim-brand-sub");
  if (titleEl) titleEl.textContent = data.title;
  if (subEl) subEl.textContent = data.subtitle;

  // Render quick chips
  const chipsContainer = document.getElementById("sim-chips-container");
  if (chipsContainer) {
    chipsContainer.innerHTML = "";
    data.chips.forEach(chip => {
      const chipBtn = document.createElement("button");
      chipBtn.className = "sim-chip text-left p-3 rounded-xl border border-slate-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-slate-800 text-xs font-semibold transition-all flex items-center justify-between group shadow-sm";
      chipBtn.setAttribute("data-msg", chip.msg);
      chipBtn.innerHTML = `
        <span class="flex items-center gap-2">${chip.label}</span>
        <i data-lucide="chevron-right" class="w-4 h-4 text-slate-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-transform"></i>
      `;
      chipBtn.addEventListener("click", () => {
        const input = document.getElementById("sim-input");
        if (input) {
          input.value = chip.msg;
          sendSimMessage(chip.msg);
        }
      });
      chipsContainer.appendChild(chipBtn);
    });
    if (window.lucide) lucide.createIcons();
  }

  // Reset chat message stream with greeting
  const stream = document.getElementById("sim-messages");
  if (stream) {
    stream.innerHTML = `
      <div class="flex justify-start msg-bubble">
        <div class="bg-white text-slate-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm max-w-[88%] border border-slate-200/60 leading-relaxed text-xs">
          <p class="font-bold text-emerald-800 text-[11px] mb-1 flex items-center gap-1.5">
            <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
            ${data.title} (Asistente IA):
          </p>
          <p>${data.greeting}</p>
          <span class="block text-[9px] text-slate-400 text-right mt-1.5">10:00 AM</span>
        </div>
      </div>
    `;
  }
}

// ==========================================
// SIMULATOR MESSAGING ENGINE
// ==========================================
function initSimulator() {
  const sendBtn = document.getElementById("sim-send-btn");
  const inputEl = document.getElementById("sim-input");

  if (!sendBtn || !inputEl) return;

  sendBtn.addEventListener("click", () => {
    sendSimMessage(inputEl.value);
  });

  inputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendSimMessage(inputEl.value);
    }
  });

  // Load default scenario (Papelería)
  loadIndustryScenario("papeleria");
}

function sendSimMessage(text) {
  const clean = text ? text.trim() : "";
  if (!clean) return;

  const inputEl = document.getElementById("sim-input");
  if (inputEl) {
    inputEl.value = "";
    inputEl.focus();
  }

  sounds.playSent();
  appendUserBubble(clean);

  // Show typing indicator
  const typingEl = document.getElementById("sim-typing");
  if (typingEl) typingEl.classList.remove("hidden");
  scrollSim();

  // Simulated latency
  setTimeout(() => {
    if (typingEl) typingEl.classList.add("hidden");
    const replyHtml = generateBotReply(clean, STATE.currentIndustry);
    appendBotBubble(replyHtml);
    sounds.playReceived();
  }, 1150);
}

function appendUserBubble(text) {
  const container = document.getElementById("sim-messages");
  if (!container) return;

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  const el = document.createElement("div");
  el.className = "flex justify-end msg-bubble";
  el.innerHTML = `
    <div class="bg-[#d9fdd3] text-slate-900 p-3 rounded-2xl rounded-tr-none shadow-sm max-w-[85%] border border-emerald-300/40 text-xs leading-relaxed">
      <p>${escapeHtml(text)}</p>
      <div class="flex items-center justify-end gap-1 text-[9px] text-slate-500 mt-1">
        <span>${time}</span>
        <span class="text-emerald-700 font-bold">✓✓</span>
      </div>
    </div>
  `;
  container.appendChild(el);
  scrollSim();
}

function appendBotBubble(html) {
  const container = document.getElementById("sim-messages");
  if (!container) return;

  const now = new Date();
  const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const scenario = SCENARIOS[STATE.currentIndustry] || SCENARIOS.papeleria;

  const el = document.createElement("div");
  el.className = "flex justify-start msg-bubble";
  el.innerHTML = `
    <div class="bg-white text-slate-800 p-3.5 rounded-2xl rounded-tl-none shadow-sm max-w-[88%] border border-slate-200/80 text-xs leading-relaxed">
      <p class="font-bold text-emerald-800 text-[11px] mb-1 flex items-center gap-1.5">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
        ${scenario.title} (IA Oficial):
      </p>
      ${html}
      <span class="block text-[9px] text-slate-400 text-right mt-1.5">${time}</span>
    </div>
  `;
  container.appendChild(el);
  scrollSim();
}

function scrollSim() {
  const container = document.getElementById("sim-messages");
  if (container) {
    container.scrollTo({ top: container.scrollHeight, behavior: "smooth" });
  }
}

// Intelligent Bot Response Parser
function generateBotReply(text, industry) {
  const lower = text.toLowerCase();

  // Caso A: Papelería & Multiservicios Tisaleo
  if (industry === "papeleria") {
    if (lower.includes("foto") || lower.includes("lista") || lower.includes("útiles") || lower.includes("crayolas")) {
      return `
        <div class="p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-xl mb-2">
          <p class="font-bold text-emerald-900 text-[11px] flex items-center gap-1.5">
            <span>📸</span> Visión Artificial OCR Procesada:
          </p>
          <p class="text-[10px] text-slate-600 mt-0.5">Lista de Inicial 2 (Unidad Educativa Aníbal Salgado Ruiz)</p>
        </div>
        <p>¡Hola! Con mucho gusto le ayudamos con la cotización completa de la lista de útiles solicitada:</p>
        <div class="mt-2 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px]">
          <p>• <strong>1 Caja de crayolas triangulares jumbo:</strong> $2.75</p>
          <p>• <strong>1 Frasco de témpera 250ml (amarillo):</strong> $2.25</p>
          <p>• <strong>1 Caja de plastilina grande (12 col):</strong> $1.50</p>
          <p>• <strong>1 Pincel plano N. 24:</strong> $1.00</p>
          <div class="border-t border-slate-200 pt-1.5 mt-1 font-bold text-emerald-800 flex justify-between text-xs">
            <span>TOTAL ESTIMADO:</span>
            <span>$7.50 USD</span>
          </div>
        </div>
        <p class="mt-2">¿Desea que se lo tengamos armado y empacado para que solo pase a retirarlo por el local?</p>
      `;
    }

    if (lower.includes("pdf") || lower.includes("imprimir") || lower.includes("a3") || lower.includes("color")) {
      return `
        <div class="p-2.5 bg-slate-100 border border-slate-200 rounded-xl mb-2 flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-red-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0">PDF</div>
          <div class="flex-1 truncate">
            <p class="font-bold text-[11px] truncate">Diseño sin título (3).pdf</p>
            <p class="text-[9px] text-slate-500">1 página • Documento recibido</p>
          </div>
        </div>
        <p>¡Hola! He recibido tu documento PDF correctamente. 📄</p>
        <p class="mt-1">Confirmamos la impresión en <strong>formato A3 a full color</strong> ($0.75 c/u). Nuestro equipo en <em>Multiservicios Tisaleo</em> ya lo envió a cola de impresión.</p>
        <p class="mt-1 text-slate-600">Estará listo en 5 minutos para su retiro en ventanilla.</p>
      `;
    }

    if (lower.includes("cuaderno") || lower.includes("resma") || lower.includes("100h")) {
      return `
        <p>¡Claro que sí! Aquí tienes los valores disponibles:</p>
        <div class="mt-2 space-y-1 bg-slate-50 p-2.5 rounded-xl border border-slate-200 text-[11px]">
          <p>• <strong>3 Cuadernos anillados 100h cuadros:</strong> $1.25 c/u &rarr; <strong>$3.75</strong></p>
          <p>• <strong>1 Resma de papel bond 75g (500 hojas):</strong> $4.20 c/u</p>
          <div class="border-t border-slate-200 pt-1 mt-1 font-bold text-emerald-800 flex justify-between">
            <span>TOTAL:</span>
            <span>$7.95 USD</span>
          </div>
        </div>
        <p class="mt-2">¿Deseas incluir esferos o forros para los cuadernos?</p>
      `;
    }
  }

  // Caso B: Ferretería Bycas
  if (industry === "ferreteria") {
    if (lower.includes("cemento") || lower.includes("holcim") || lower.includes("selvalegre") || lower.includes("precio")) {
      return `
        <p>¡Hola! Claro que sí, disponemos de stock inmediato en bodega principal:</p>
        <div class="mt-2 space-y-1.5 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-[11px]">
          <p>🔹 <strong>Cemento Holcim Fuerte 50kg:</strong> $7.85 c/u</p>
          <p>🔹 <strong>Cemento Selvalegre Especial 50kg:</strong> $7.75 c/u</p>
          <p class="text-slate-600 text-[10px] mt-1">🚚 <em>Envío gratis en la ciudad a partir de 15 sacos.</em></p>
        </div>
        <p class="mt-2">¿Cuántos sacos necesitas y en qué sector está ubicada tu obra?</p>
      `;
    }

    if (lower.includes("flete") || lower.includes("domicilio") || lower.includes("envio")) {
      return `
        <p>Realizamos despachos con nuestra flota de camiones de Lunes a Sábado:</p>
        <p class="mt-1 text-slate-600">• Entregas el mismo día para pedidos confirmados antes de las 12:00 PM.<br>• Descarga a pie de vereda incluida sin costo adicional.</p>
        <p class="mt-2">Indícanos tu dirección exacta o envíanos tu ubicación por WhatsApp para coordinar.</p>
      `;
    }
  }

  // Caso C: Traspaso a Humano (General)
  if (lower.includes("humano") || lower.includes("persona") || lower.includes("asesor") || lower.includes("vendedor") || lower.includes("doctora")) {
    return `
      <div class="p-2.5 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 mb-2">
        <strong>👤 Traspaso Humano Activado:</strong><br>
        El asistente de IA se ha puesto en pausa para que nuestro asesor tome el control directo del chat.
      </div>
      <p>Te hemos conectado con nuestro asesor comercial de turno. Te responderá en breves momentos en este mismo chat.</p>
    `;
  }

  // Respuesta inteligente por defecto
  return `
    <p>Comprendo tu consulta: <em>"${escapeHtml(text)}"</em>.</p>
    <p class="mt-1.5">Con <strong>NexuSend</strong>, la IA está conectada a tu inventario, lista de precios y documentos en PDF, respondiendo de forma exacta en menos de 2 segundos.</p>
    <p class="mt-1 text-slate-600">Prueba preguntando por precios, catálogos o enviando un documento.</p>
  `;
}

// Sound FX Mute/Unmute Toggle
function initSoundToggle() {
  const btn = document.getElementById("sim-sound-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    STATE.soundEnabled = !STATE.soundEnabled;
    btn.innerHTML = STATE.soundEnabled
      ? `<i data-lucide="volume-2" class="w-4 h-4 text-white"></i>`
      : `<i data-lucide="volume-x" class="w-4 h-4 text-white/50"></i>`;
    if (window.lucide) lucide.createIcons();
  });
}

// ==========================================
// FULL-RESOLUTION SCREENSHOT LIGHTBOX
// ==========================================
function initScreenshotLightbox() {
  const modal = document.getElementById("lightbox-modal");
  const imgEl = document.getElementById("lightbox-img");
  const titleEl = document.getElementById("lightbox-title");
  const descEl = document.getElementById("lightbox-desc");
  const closeBtn = document.getElementById("lightbox-close");
  const zoomInBtn = document.getElementById("lightbox-zoom-in");
  const zoomOutBtn = document.getElementById("lightbox-zoom-out");
  const zoomResetBtn = document.getElementById("lightbox-zoom-reset");

  if (!modal || !imgEl) return;

  function updateZoom() {
    imgEl.style.transform = `scale(${STATE.lightboxZoom})`;
  }

  function openLightbox(src, title, desc) {
    STATE.lightboxZoom = 1;
    updateZoom();
    imgEl.src = src;
    if (titleEl) titleEl.textContent = title || "Captura del Sistema en Alta Resolución";
    if (descEl) descEl.textContent = desc || "Visualización directa del software en producción.";
    modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    modal.classList.add("hidden");
    document.body.style.overflow = "auto";
  }

  document.querySelectorAll(".screenshot-trigger").forEach(card => {
    card.addEventListener("click", () => {
      const src = card.getAttribute("data-src");
      const title = card.getAttribute("data-title");
      const desc = card.getAttribute("data-desc");
      if (src) openLightbox(src, title, desc);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeLightbox);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });

  if (zoomInBtn) {
    zoomInBtn.addEventListener("click", () => {
      if (STATE.lightboxZoom < 2.5) {
        STATE.lightboxZoom += 0.25;
        updateZoom();
      }
    });
  }

  if (zoomOutBtn) {
    zoomOutBtn.addEventListener("click", () => {
      if (STATE.lightboxZoom > 0.75) {
        STATE.lightboxZoom -= 0.25;
        updateZoom();
      }
    });
  }

  if (zoomResetBtn) {
    zoomResetBtn.addEventListener("click", () => {
      STATE.lightboxZoom = 1;
      updateZoom();
    });
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.classList.contains("hidden")) {
      closeLightbox();
    }
  });
}

// ==========================================
// INTERACTIVE OCR SCANNER DEMO
// ==========================================
function initOcrScannerDemo() {
  const triggerBtn = document.getElementById("demo-scan-btn");
  const laserEl = document.getElementById("ocr-laser");
  const ocrResults = document.getElementById("ocr-results-box");

  if (!triggerBtn || !laserEl || !ocrResults) return;

  triggerBtn.addEventListener("click", () => {
    triggerBtn.disabled = true;
    triggerBtn.innerHTML = `
      <i data-lucide="loader" class="w-4 h-4 animate-spin"></i>
      <span>Escaneando con Gemini 3.6 Flash...</span>
    `;
    if (window.lucide) lucide.createIcons();

    laserEl.classList.remove("hidden");
    ocrResults.classList.add("opacity-40");

    setTimeout(() => {
      laserEl.classList.add("hidden");
      ocrResults.classList.remove("opacity-40");
      triggerBtn.disabled = false;
      triggerBtn.innerHTML = `
        <i data-lucide="sparkles" class="w-4 h-4 text-emerald-400"></i>
        <span>¡Escaneo Completado con Éxito! (Probar de nuevo)</span>
      `;
      if (window.lucide) lucide.createIcons();

      // Trigger small confetti
      if (typeof confetti === "function") {
        confetti({
          particleCount: 40,
          spread: 50,
          origin: { y: 0.7 }
        });
      }
    }, 1800);
  });
}

// ==========================================
// DYNAMIC ROI CALCULATOR
// ==========================================
function initRoiCalculator() {
  const chatsSlider = document.getElementById("roi-chats-slider");
  const chatsVal = document.getElementById("roi-chats-val");
  const ticketSlider = document.getElementById("roi-ticket-slider");
  const ticketVal = document.getElementById("roi-ticket-val");

  const salesResult = document.getElementById("roi-sales-result");
  const hoursResult = document.getElementById("roi-hours-result");
  const percentResult = document.getElementById("roi-percent-result");

  if (!chatsSlider || !ticketSlider) return;

  function recalculate() {
    const dailyChats = parseInt(chatsSlider.value, 10);
    const avgTicket = parseInt(ticketSlider.value, 10);

    chatsVal.textContent = `${dailyChats} chats / día`;
    ticketVal.textContent = `$${avgTicket} USD`;

    const monthlyChats = dailyChats * 30;
    const recoveredChats = monthlyChats * 0.15; // 15% recovered
    const salesAmount = Math.round(recoveredChats * avgTicket);

    const totalHours = Math.round((monthlyChats * 3) / 60);
    const planCost = 29.90;
    const roiPercent = Math.round(((salesAmount - planCost) / planCost) * 100);

    if (salesResult) salesResult.textContent = `+$${salesAmount.toLocaleString()} USD`;
    if (hoursResult) hoursResult.textContent = `${totalHours} Horas`;
    if (percentResult) percentResult.textContent = `${roiPercent.toLocaleString()}%`;
  }

  chatsSlider.addEventListener("input", recalculate);
  ticketSlider.addEventListener("input", recalculate);
  recalculate();
}

// ==========================================
// PRICING TOGGLE
// ==========================================
function initPricingToggle() {
  const btnMonthly = document.getElementById("btn-monthly");
  const btnAnnual = document.getElementById("btn-annual");
  const priceElements = document.querySelectorAll(".plan-price-val");

  if (!btnMonthly || !btnAnnual) return;

  btnMonthly.addEventListener("click", () => {
    STATE.billingPeriod = "monthly";
    btnMonthly.className = "px-5 py-2 rounded-full bg-white text-slate-900 shadow-sm transition-all cursor-pointer font-bold";
    btnAnnual.className = "px-5 py-2 rounded-full text-slate-600 hover:text-slate-900 transition-all cursor-pointer";

    priceElements.forEach(el => {
      const m = el.getAttribute("data-monthly");
      if (m) el.textContent = `$${m}`;
    });
  });

  btnAnnual.addEventListener("click", () => {
    STATE.billingPeriod = "annual";
    btnAnnual.className = "px-5 py-2 rounded-full bg-white text-slate-900 shadow-sm transition-all cursor-pointer font-bold";
    btnMonthly.className = "px-5 py-2 rounded-full text-slate-600 hover:text-slate-900 transition-all cursor-pointer";

    priceElements.forEach(el => {
      const a = el.getAttribute("data-annual");
      if (a) el.textContent = `$${a}`;
    });

    if (typeof confetti === "function") {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 }
      });
    }
  });
}

// ==========================================
// FAQ ACCORDION
// ==========================================
function initFaqAccordion() {
  const buttons = document.querySelectorAll(".faq-btn");
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const chevron = btn.querySelector("[data-lucide='chevron-down']");
      const isHidden = content.classList.contains("hidden");

      document.querySelectorAll(".faq-content").forEach(c => c.classList.add("hidden"));
      document.querySelectorAll(".faq-btn [data-lucide='chevron-down']").forEach(ch => {
        ch.style.transform = "rotate(0deg)";
      });

      if (isHidden) {
        content.classList.remove("hidden");
        if (chevron) chevron.style.transform = "rotate(180deg)";
      }
    });
  });
}

// ==========================================
// ORDER / DEMO MODAL TRIGGER
// ==========================================
function initModalTriggers() {
  const modal = document.getElementById("contact-modal");
  const closeBtn = document.getElementById("close-modal");
  const cancelBtn = document.getElementById("modal-cancel-btn");
  const titleEl = document.getElementById("modal-title");
  const descEl = document.getElementById("modal-desc");
  const waLink = document.getElementById("modal-wa-link");

  if (!modal) return;

  function openModal(title, desc, message) {
    if (titleEl) titleEl.textContent = title;
    if (descEl) descEl.textContent = desc;
    if (waLink) {
      const msg = message || DEMO_CONFIG.defaultMessage;
      waLink.href = `https://wa.me/${DEMO_CONFIG.phoneNumber}?text=${encodeURIComponent(msg)}`;
    }
    modal.classList.remove("hidden");
  }

  function closeModal() {
    modal.classList.add("hidden");
  }

  // Demo buttons
  document.querySelectorAll(".open-demo-trigger").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(
        "Probar Asistente en WhatsApp Real",
        "Te conectaremos al instante con nuestro número oficial de demostración para que pruebes las respuestas desde tu propio celular.",
        "Hola Jonathan, deseo probar la demostración de NexuSend en vivo desde mi celular."
      );
    });
  });

  // Buy buttons
  document.querySelectorAll(".buy-plan-btn").forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const plan = btn.getAttribute("data-plan") || "starter";
      const price = btn.getAttribute("data-price") || "19.90";
      const planName = plan.charAt(0).toUpperCase() + plan.slice(1);

      if (typeof confetti === "function") {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.6 } });
      }

      openModal(
        `Contratar Plan ${planName} ($${price}/mes)`,
        `Tu cuenta se configurará con base de datos independiente y aislamiento total. Haz clic para activar tu acceso inmediato por WhatsApp.`,
        `Hola Jonathan, deseo contratar el plan NexuSend ${planName} ($${price}/mes) y activar mi acceso de inmediato.`
      );
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  if (cancelBtn) cancelBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// Floating WhatsApp Widget
function initFloatingWidget() {
  const widgetBtn = document.getElementById("floating-wa-btn");
  const teaser = document.getElementById("floating-wa-teaser");
  const closeTeaser = document.getElementById("close-wa-teaser");

  if (!widgetBtn) return;

  if (closeTeaser && teaser) {
    closeTeaser.addEventListener("click", (e) => {
      e.stopPropagation();
      teaser.classList.add("hidden");
    });
  }

  widgetBtn.addEventListener("click", () => {
    const defaultMsg = encodeURIComponent("Hola Jonathan, deseo probar el asistente en vivo para mi negocio.");
    window.open(`https://wa.me/${DEMO_CONFIG.phoneNumber}?text=${defaultMsg}`, "_blank");
  });
}

function escapeHtml(text) {
  const map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" };
  return text.replace(/[&<>"']/g, m => map[m]);
}
