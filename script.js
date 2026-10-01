/**
 * ==============================================================================
 * NexuSend Enterprise — Alpine.js + Web Audio Interactive Engine
 * 1. Web Audio Synthesizer (Realistic WA Message Effects)
 * 2. Multi-Industry WhatsApp Simulator (Papelería, Ferretería, Servicios)
 * 3. Reactive ROI Calculator
 * 4. Interactive OCR Laser Scanner Demo
 * 5. HD Lightbox Gallery with Multi-Level Zoom
 * 6. Alpine.js Reactive State Management & Smooth Transitions
 * ==============================================================================
 */

// Official WhatsApp Demo Configuration
const DEMO_CONFIG = {
  phoneNumber: "593984856914",
  displayNumber: "+593 98 485 6914",
  defaultMessage: "Hola, deseo probar el asistente inteligente de NexuSend en vivo para mi negocio"
};

// Web Audio API Sound Synthesizer (Zero external audio file dependency)
class SoundFx {
  constructor() {
    this.ctx = null;
    this.enabled = true;
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
    if (!this.enabled) return;
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
    } catch (e) {}
  }

  playReceived() {
    if (!this.enabled) return;
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
    } catch (e) {}
  }
}

const sounds = new SoundFx();

// Simulator Industry Scenarios (100% Sanitized, Zero confidential data)
const SCENARIOS = {
  papeleria: {
    title: "Librería & Papelería Central",
    subtitle: "En línea • Papelería & Suministros",
    greeting: `¡Hola! 👋 Te damos la bienvenida a <strong>Librería & Papelería Central</strong>.<br>
    Puedo cotizar tus <strong>listas de útiles completas por foto</strong>, recibir archivos PDF para impresión y darte precios oficiales al instante. ¿En qué podemos ayudarte hoy?`,
    chips: [
      {
        icon: "camera",
        label: "📸 Cotizar lista de útiles por foto",
        msg: "Hola, coticemos esta lista de útiles escolares por favor (adjunto foto)"
      },
      {
        icon: "file-text",
        label: "📄 Enviar archivo PDF para impresión",
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
    ]
  },
  ferreteria: {
    title: "Ferretería & Construcción El Progreso",
    subtitle: "En línea • Materiales & Herramientas",
    greeting: `¡Hola! Bienvenido a <strong>Ferretería & Construcción El Progreso</strong> 🏗️.<br>
    Cotizamos cemento, varillas de hierro, herramientas y fontanería al instante las 24 horas. ¿Qué material necesitas para tu proyecto?`,
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
    ]
  },
  servicios: {
    title: "Centro de Consultorios & Servicios",
    subtitle: "En línea • Consultas & Agendamiento",
    greeting: `¡Hola! Bienvenido a nuestro <strong>Centro de Atención Comercial</strong> 🩺.<br>
    Puedo ayudarte a agendar citas, verificar horarios disponibles y darte información sobre tratamientos y medios de pago. ¿Cómo podemos ayudarte?`,
    chips: [
      {
        icon: "calendar",
        label: "🗓️ Agendar cita de valoración",
        msg: "Hola, deseo agendar una cita de valoración para este viernes por la tarde"
      },
      {
        icon: "credit-card",
        label: "💳 Formas de pago aceptadas",
        msg: "¿Qué métodos de pago reciben? ¿Aceptan tarjeta o transferencia?"
      },
      {
        icon: "map-pin",
        label: "📍 Dirección y horarios",
        msg: "¿En qué dirección están ubicados y cuál es el horario de atención?"
      },
      {
        icon: "user-check",
        label: "👤 Traspaso a recepción",
        msg: "Quiero consultar un caso especial con la especialista encargada"
      }
    ]
  }
};

// Generate Intelligent Simulated Replies
function generateBotReply(userText, industry) {
  const lower = userText.toLowerCase();

  // Caso: Asesor Humano en cualquier industria
  if (lower.includes("humano") || lower.includes("persona") || lower.includes("ventas") || lower.includes("recepción") || lower.includes("doctora") || lower.includes("especialista")) {
    return `
      <div class="p-2.5 bg-amber-50 border border-amber-200 rounded-xl mb-2 flex items-start gap-2">
        <span class="text-amber-600 font-bold text-sm">⚠️</span>
        <div class="text-[11px] text-amber-900 leading-tight">
          <strong>Traspaso a Asesor Humano:</strong> La IA se ha silenciado para este contacto.
        </div>
      </div>
      <p>¡Entendido! Con gusto te transfiero con uno de nuestros asesores comerciales del equipo.</p>
      <p class="mt-1 text-slate-600">Un momento por favor, enseguida te responden directamente desde la plataforma.</p>
    `;
  }

  // Caso A: Papelería & Suministros
  if (industry === "papeleria") {
    if (lower.includes("foto") || lower.includes("lista") || lower.includes("útiles") || lower.includes("utiles")) {
      return `
        <div class="p-2.5 bg-emerald-50/80 border border-emerald-200 rounded-xl mb-2">
          <p class="font-bold text-emerald-900 text-[11px] flex items-center gap-1.5">
            <span>📸</span> Visión Artificial OCR Procesada:
          </p>
          <p class="text-[10px] text-slate-600 mt-0.5">Lista Escolar de Educación Inicial y Básica</p>
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
            <p class="font-bold text-[11px] truncate">Catalogo_Comercial_2026.pdf</p>
            <p class="text-[9px] text-slate-500">1 página • Documento recibido</p>
          </div>
        </div>
        <p>¡Hola! He recibido tu documento PDF correctamente. 📄</p>
        <p class="mt-1">Confirmamos la impresión en <strong>formato A3 a full color</strong> ($0.75 c/u). Nuestro equipo comercial ya lo tiene en cola de preparación.</p>
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

  // Caso B: Ferretería & Materiales de Construcción
  if (industry === "ferreteria") {
    if (lower.includes("cemento") || lower.includes("holcim") || lower.includes("selvalegre") || lower.includes("precio")) {
      return `
        <p>¡Hola! Claro que sí, disponemos de stock inmediato en bodega principal:</p>
        <div class="mt-2 space-y-1.5 bg-emerald-50/80 p-2.5 rounded-xl border border-emerald-200 text-[11px]">
          <p>🔹 <strong>Cemento Holcim Fuerte 50kg:</strong> $7.85 c/u</p>
          <p>🔹 <strong>Cemento Selvalegre Especial 50kg:</strong> $7.75 c/u</p>
          <p class="text-slate-600 text-[10px] mt-1">🚚 <em>Envío gratis en la ciudad a partir de 15 sacos.</em></p>
        </div>
        <p class="mt-2">¿Cuántos sacos necesitas para cotizarte con el flete correspondiente?</p>
      `;
    }

    if (lower.includes("flete") || lower.includes("entrega") || lower.includes("domicilio") || lower.includes("camion")) {
      return `
        <p>🚚 <strong>Servicio de Entrega a Domicilio:</strong></p>
        <p class="mt-1">Contamos con camiones de plataforma de 3.5 y 8 toneladas con despacho de lunes a sábado de 07:30 a 17:30.</p>
        <p class="mt-2 text-slate-600">Por favor indícanos el sector de descarga y los materiales a cotizar para confirmar la ruta de entrega.</p>
      `;
    }

    if (lower.includes("tubo") || lower.includes("tuberia") || lower.includes("pvc") || lower.includes("catalogo") || lower.includes("catálogo")) {
      return `
        <div class="p-2.5 bg-indigo-50 border border-indigo-200 rounded-xl mb-2 flex items-center gap-2.5">
          <div class="w-8 h-8 rounded-lg bg-indigo-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">PDF</div>
          <div class="flex-1 truncate">
            <p class="font-bold text-[11px] truncate text-indigo-950">Catalogo_Tuberia_PVC_Presion.pdf</p>
            <p class="text-[9px] text-indigo-600">Catálogo técnico oficial adjunto</p>
          </div>
        </div>
        <p>Adjunto tienes el catálogo oficial con medidas desde 1/2 pulgada hasta 4 pulgadas, codos, uniones y pegamento PVC.</p>
        <p class="mt-1">¿Deseas que te coticemos accesorios en específico?</p>
      `;
    }
  }

  // Caso C: Consultorios & Servicios
  if (industry === "servicios") {
    if (lower.includes("cita") || lower.includes("agendar") || lower.includes("viernes") || lower.includes("hora")) {
      return `
        <p>¡Con mucho gusto! Para este <strong>viernes</strong> tenemos los siguientes horarios disponibles:</p>
        <div class="mt-2 grid grid-cols-2 gap-2 text-center text-[11px]">
          <div class="p-2 bg-emerald-50 border border-emerald-200 rounded-lg font-bold text-emerald-800">
            🕒 15:30 p.m.
          </div>
          <div class="p-2 bg-emerald-50 border border-emerald-200 rounded-lg font-bold text-emerald-800">
            🕒 17:00 p.m.
          </div>
        </div>
        <p class="mt-2 text-slate-600">Por favor confírmanos tu nombre completo y número de cédula para reservar el espacio en agenda.</p>
      `;
    }

    if (lower.includes("pago") || lower.includes("tarjeta") || lower.includes("payphone") || lower.includes("transferencia")) {
      return `
        <p>💳 <strong>Métodos de Pago Aceptados:</strong></p>
        <ul class="mt-1 space-y-1 text-slate-600 text-[11px]">
          <li>• Tarjetas de crédito y débito (Visa / Mastercard)</li>
          <li>• Transferencias bancarias (Pichincha, Guayaquil, Pacífico)</li>
          <li>• Pagos móviles con Payphone y Deuna</li>
        </ul>
        <p class="mt-2">Todos los pagos con tarjeta pueden diferirse a 3 y 6 meses sin intereses.</p>
      `;
    }

    if (lower.includes("direccion") || lower.includes("dirección") || lower.includes("horario") || lower.includes("donde")) {
      return `
        <p>📍 <strong>Ubicación & Horarios de Atención:</strong></p>
        <p class="mt-1">Av. Principal y Calle Comercial, Edificio Centro Empresarial, Piso 2.</p>
        <p class="mt-1 text-slate-600">🕒 <strong>Lunes a Viernes:</strong> 08:30 - 18:30<br>🕒 <strong>Sábados:</strong> 09:00 - 13:30</p>
      `;
    }
  }

  // Respuesta por defecto con RAG
  return `
    <p>¡Gracias por tu mensaje! He consultado nuestra base de conocimientos para responderte.</p>
    <p class="mt-1">¿Podrías especificar qué producto o servicio deseas cotizar para brindarte los detalles precisos?</p>
  `;
}

// ------------------------------------------------------------------------------
// Alpine Component Definitions (Available in Global Window Scope)
// ------------------------------------------------------------------------------

function navController() {
  return {
    mobileMenuOpen: false,
    scrolled: false,
    init() {
      window.addEventListener("scroll", () => {
        this.scrolled = window.pageYOffset > 20;
      });
    }
  };
}

function simulatorApp() {
  return {
    industry: "papeleria",
    soundEnabled: true,
    inputMessage: "",
    isTyping: false,
    messages: [],

    init() {
      this.loadScenario(this.industry);
    },

    loadScenario(key) {
      this.industry = key;
      const data = SCENARIOS[key];
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      this.messages = [
        {
          isUser: false,
          html: data.greeting,
          time: time
        }
      ];

      this.$nextTick(() => {
        this.scrollChat();
        if (window.lucide) window.lucide.createIcons();
      });
    },

    get currentData() {
      return SCENARIOS[this.industry];
    },

    toggleSound() {
      this.soundEnabled = !this.soundEnabled;
      sounds.enabled = this.soundEnabled;
      if (this.soundEnabled) sounds.playReceived();
    },

    sendQuickChip(text) {
      this.sendText(text);
    },

    sendFromInput() {
      if (!this.inputMessage || !this.inputMessage.trim()) return;
      const text = this.inputMessage.trim();
      this.inputMessage = "";
      this.sendText(text);
    },

    sendText(text) {
      sounds.playSent();
      const now = new Date();
      const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

      this.messages.push({
        isUser: true,
        text: text,
        time: time
      });

      this.isTyping = true;
      this.$nextTick(() => this.scrollChat());

      setTimeout(() => {
        this.isTyping = false;
        const reply = generateBotReply(text, this.industry);
        const replyTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        this.messages.push({
          isUser: false,
          html: reply,
          time: replyTime
        });

        sounds.playReceived();
        this.$nextTick(() => {
          this.scrollChat();
          if (window.lucide) window.lucide.createIcons();
        });
      }, 1100);
    },

    scrollChat() {
      const el = document.getElementById("sim-messages");
      if (el) el.scrollTop = el.scrollHeight;
    }
  };
}

function ocrScanner() {
  return {
    isScanning: false,
    scanComplete: true,
    triggerScan() {
      if (this.isScanning) return;
      this.isScanning = true;
      this.scanComplete = false;
      sounds.playSent();

      setTimeout(() => {
        this.isScanning = false;
        this.scanComplete = true;
        sounds.playReceived();
        if (window.confetti) {
          window.confetti({ particleCount: 35, spread: 60, origin: { y: 0.6 } });
        }
      }, 1900);
    }
  };
}

function roiCalculator() {
  return {
    chatsPerDay: 30,
    avgTicket: 25,

    get hoursSaved() {
      return Math.round((this.chatsPerDay * 3 * 30) / 60);
    },

    get afterHoursChats() {
      return Math.round(this.chatsPerDay * 30 * 0.15);
    },

    get salesAssisted() {
      return Math.round(this.afterHoursChats * (this.avgTicket * 0.35));
    }
  };
}

function pricingApp() {
  return {
    billing: "monthly",
    setBilling(mode) {
      this.billing = mode;
      if (mode === "annual" && window.confetti) {
        window.confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.7 }
        });
      }
    }
  };
}

function lightboxApp() {
  return {
    open: false,
    src: "",
    title: "",
    desc: "",
    zoom: 1,

    openImage(src, title, desc) {
      this.src = src;
      this.title = title || "Captura en Alta Resolución";
      this.desc = desc || "Detalle visual de la plataforma NexuSend.";
      this.zoom = 1;
      this.open = true;
    },

    close() {
      this.open = false;
    },

    zoomIn() {
      this.zoom = Math.min(2.5, this.zoom + 0.25);
    },

    zoomOut() {
      this.zoom = Math.max(0.75, this.zoom - 0.25);
    },

    resetZoom() {
      this.zoom = 1;
    }
  };
}

function whatsappModalApp() {
  return {
    open: false,
    teaserOpen: true,
    phone: DEMO_CONFIG.phoneNumber,
    display: DEMO_CONFIG.displayNumber,
    defaultMsg: DEMO_CONFIG.defaultMessage,

    openModal() {
      this.open = true;
    },

    closeModal() {
      this.open = false;
    },

    closeTeaser() {
      this.teaserOpen = false;
    },

    get waUrl() {
      return `https://wa.me/${this.phone}?text=${encodeURIComponent(this.defaultMsg)}`;
    }
  };
}

function faqApp() {
  return {
    active: 0,
    toggle(idx) {
      this.active = this.active === idx ? null : idx;
    }
  };
}

// Export functions to window
window.navController = navController;
window.simulatorApp = simulatorApp;
window.ocrScanner = ocrScanner;
window.roiCalculator = roiCalculator;
window.pricingApp = pricingApp;
window.lightboxApp = lightboxApp;
window.whatsappModalApp = whatsappModalApp;
window.faqApp = faqApp;

// Register with Alpine.js
function registerAlpine() {
  if (!window.Alpine) return;
  window.Alpine.data("navController", navController);
  window.Alpine.data("simulatorApp", simulatorApp);
  window.Alpine.data("ocrScanner", ocrScanner);
  window.Alpine.data("roiCalculator", roiCalculator);
  window.Alpine.data("pricingApp", pricingApp);
  window.Alpine.data("lightboxApp", lightboxApp);
  window.Alpine.data("whatsappModalApp", whatsappModalApp);
  window.Alpine.data("faqApp", faqApp);
}

if (window.Alpine) {
  registerAlpine();
} else {
  document.addEventListener("alpine:init", registerAlpine);
}

// Re-initialize Lucide Icons after DOM updates
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
});
