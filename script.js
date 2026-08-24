// ─── LOADER ──────────────────────────────────────────────────
(function initLoader() {
  const loader   = document.getElementById("loader");
  const corazon      = document.getElementById("loaderCorazon");
  const bar      = document.getElementById("loaderBar");
  const sparkles = document.getElementById("sparkles");

  // Generar destellos aleatorios
  function crearDestello() {
    const s   = document.createElement("div");
    const tam = Math.random() * 6 + 3;
    s.className = "sparkle";
    s.style.cssText = `
      left:   ${Math.random() * 100}%;
      top:    ${Math.random() * 100}%;
      width:  ${tam}px;
      height: ${tam}px;
      --dur:  ${Math.random() * 2 + 1.5}s;
    `;
    sparkles.appendChild(s);
    setTimeout(() => s.remove(), 3500);
  }

  // Crear destellos continuamente mientras carga
  const sparkleInterval = setInterval(crearDestello, 110);
  
// ─── DESTELLOS DORADOS GLOBALES ──────────────────────────────
(function initSparklesGlobal() {

  const container = document.getElementById('sparklesGlobal');
  if (!container) return;

  // Paleta dorada en tonos lila-dorado
  const colores = [
    'rgba(203,183,216,0.9)',   // lila claro
    'rgba(184,156,200,0.85)',  // lila medio
    'rgba(220,200,235,0.9)',   // lavanda
    'rgba(235,220,255,0.8)',   // blanco lila
    'rgba(210,185,230,0.9)',   // lila suave
    'rgba(255,240,200,0.75)',  // dorado muy suave
    'rgba(240,220,180,0.7)',   // champagne
    'rgba(255,248,220,0.8)',   // crema dorada
  ];

  // Formas disponibles
  const formas = ['dot', 'dot', 'dot', 'star', 'diamond'];

  function crearDestello() {
    const el    = document.createElement('div');
    const forma = formas[Math.floor(Math.random() * formas.length)];
    const color = colores[Math.floor(Math.random() * colores.length)];
    const tam   = Math.random() * 7 + 3; // entre 3px y 10px
    const dur   = Math.random() * 2.5 + 1.8; // entre 1.8s y 4.3s

    el.className = `sparkle-gold ${forma}`;

    el.style.cssText = `
      left:     ${Math.random() * 100}vw;
      top:      ${Math.random() * 100}vh;
      width:    ${tam}px;
      height:   ${tam}px;
      background: ${color};
      --dur:    ${dur}s;
      box-shadow: 0 0 ${tam * 1.5}px ${color};
    `;

    container.appendChild(el);

    // Eliminar después de la animación
    setTimeout(() => el.remove(), dur * 1000);
  }

  // Crear destellos continuamente
  // Más frecuentes al inicio, luego ritmo constante
  let count = 0;
  const burst = setInterval(() => {
    crearDestello();
    count++;
    if (count >= 18) clearInterval(burst);
  }, 80);

  // Ritmo constante después del burst inicial
  setTimeout(() => {
    setInterval(crearDestello, 320);
  }, 1500);

  // Extra: destellos al hacer scroll
  let scrollTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    for (let i = 0; i < 3; i++) {
      setTimeout(crearDestello, i * 80);
    }
    scrollTimer = setTimeout(() => {}, 200);
  }, { passive: true });

  // Extra: destellos al mover el mouse (sutil)
  let mouseTimer;
  window.addEventListener('mousemove', (e) => {
    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(() => {
      const el    = document.createElement('div');
      const forma = formas[Math.floor(Math.random() * formas.length)];
      const color = colores[Math.floor(Math.random() * colores.length)];
      const tam   = Math.random() * 5 + 2;
      const dur   = Math.random() * 1.5 + 1;

      el.className = `sparkle-gold ${forma}`;
      el.style.cssText = `
        left:       ${e.clientX + (Math.random() * 30 - 15)}px;
        top:        ${e.clientY + (Math.random() * 30 - 15)}px;
        width:      ${tam}px;
        height:     ${tam}px;
        background: ${color};
        --dur:      ${dur}s;
        box-shadow: 0 0 ${tam * 2}px ${color};
        position:   fixed;
      `;

      container.appendChild(el);
      setTimeout(() => el.remove(), dur * 1000);
    }, 40);
  }, { passive: true });

})();
  // Barra de progreso animada
  let progress = 0;
  const barInterval = setInterval(() => {
    progress += Math.random() * 4 + 1;
    if (progress >= 100) {
      progress = 100;
      clearInterval(barInterval);
    }
    bar.style.width = progress + "%";
  }, 60);

  // Cuando la página cargó completamente
  window.addEventListener("load", () => {
    setTimeout(() => {
      clearInterval(sparkleInterval);
      // Terminar barra
      bar.style.width = "100%";
      setTimeout(() => {
        loader.classList.add("hidden");
        // Mostrar overlay de entrada
        const overlay = document.getElementById("overlay");
        overlay.classList.add("visible");
      }, 600);
    }, 800);
  });
})();// ─── CONFIGURACIÓN ───────────────────────────────────────────
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxxmoJjXjn-9VFvnkT84U-f3K-YoEMXRYTDMN3LZH8ciVJkii92w92BJie_MQpuP5YN8w/exec";
const DIRECCION_CEREMONIA  = "Lo Campino 255, Quilicura, Santiago";
const DIRECCION_RECEPCION  = "Casa Irene Eventos - La Cañada del Carmen, Lampa, Región Metropolitana";

// ─── ENTRADA AL SITIO ────────────────────────────────────────
function enterSite(playMusic) {
  //window.scrollTo(0, 0);
  const overlay = document.getElementById("overlay");
  const hero    = document.querySelector(".hero");
  const topNav = document.getElementById("topNav");

 // hero.scrollIntoView({ behavior:"instant", block:"start" });
  // Ocultar overlay
  overlay.classList.add("hidden");
  // Mostrar menú de navegación
  if (topNav) {
    setTimeout(() => {
      topNav.classList.add("menu-visible");
    }, 500);
  }
  // Animar el hero
  setTimeout(() => {
    document.body.classList.remove("preload");
    hero.classList.add("hero-visible");
  }, 300);
// Ir al inicio DESPUÉS de que el overlay empiece a desaparecer
  setTimeout(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    hero.scrollIntoView({ behavior: "instant", block: "start" });
  }, 100);

  // Ocultar overlay del DOM completamente
  setTimeout(() => {
    overlay.style.display = "none";
  }, 3000);

  // ── MÚSICA ──
  if (playMusic) {
    reproducirMusica();
  }
  
}
// ─── FUNCIÓN DE MÚSICA ───────────────────────────────────────
function reproducirMusica() {
  if (typeof player !== 'undefined' && player !== null && window.__ytPlayerReady) {
    try {
      player.unMute();
      player.playVideo();
 
      // Subir volumen poco a poco
      let vol = 0;
      player.setVolume(vol);
      const fadeIn = setInterval(() => {
        vol += 5;
        if (vol >= 50) {
          vol = 50;
          clearInterval(fadeIn);
        }
        player.setVolume(vol);
      }, 150);
 
    } catch (err) {
      console.warn("No se pudo reproducir la música:", err);
    }
  } else {
    // El player todavía no está listo (típico en conexiones móviles lentas):
    // guardamos la intención y la ejecutamos apenas esté listo.
    window.__musicaPendiente = true;
    let intentos = 0;
    const esperar = setInterval(() => {
      intentos++;
      if (typeof player !== 'undefined' && player !== null && window.__ytPlayerReady) {
        clearInterval(esperar);
        reproducirMusica();
      }
      // Dejar de intentar después de 10 segundos
      if (intentos > 20) clearInterval(esperar);
    }, 500);
  }
}
// ══════════════════════════════════════════
// MENÚ DE NAVEGACIÓN
// ══════════════════════════════════════════
function toggleMenu(force) {
  const menu = document.getElementById("menuPanel");
  const toggle = document.getElementById("menuToggle");
  if (!menu || !toggle) return;
  let shouldOpen;
  if (typeof force === "boolean") {
    shouldOpen = force;
  } else {
    shouldOpen = !menu.classList.contains("open");
  }
  menu.classList.toggle("open", shouldOpen);
  toggle.classList.toggle("active", shouldOpen);
  toggle.setAttribute(
    "aria-expanded",
    shouldOpen ? "true" : "false"
  );
  document.body.style.overflow = shouldOpen
    ? "hidden"
    : "";
}

// ──────────────────────────────────────────
// CERRAR MENÚ Y DESPLAZARSE A UNA SECCIÓN
// ──────────────────────────────────────────
function cerrarMenuYIr(id) {
  const menu = document.getElementById("menuPanel");
  const toggle = document.getElementById("menuToggle");
  const section = document.getElementById(id);
  if (!section) return;
  // Cerrar menú
  menu.classList.remove("open");
  toggle.classList.remove("active");
  toggle.setAttribute(
    "aria-expanded",
    "false"
  );
  document.body.style.overflow = "";
  // Esperar un poquito para que cierre el panel
  setTimeout(() => {
    section.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  }, 250);
}

// ──────────────────────────────────────────
// CERRAR CON ESCAPE
// ──────────────────────────────────────────
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    toggleMenu(false);

  }

});
// ─── COUNTDOWN ───────────────────────────────────────────────
const weddingDate = new Date('2027-03-06T17:30:00').getTime();

function updateCountdown() {
  const diff      = weddingDate - Date.now();
  const countdown = document.getElementById('countdown');

  if (diff <= 0) {
    countdown.innerHTML = `<div><span>🎉</span>¡Hoy es el gran día!</div>`;
    return;
  }

  const days    = Math.floor(diff / (1000*60*60*24));
  const hours   = Math.floor((diff / (1000*60*60)) % 24);
  const minutes = Math.floor((diff / (1000*60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.innerHTML = `
    <div><span>${days}</span>días</div>
    <div><span>${hours}</span>horas</div>
    <div><span>${minutes}</span>min</div>
    <div><span>${seconds}</span>seg</div>
  `;
}
setInterval(updateCountdown, 1000);
updateCountdown();

// ─── MAPAS: detectar dispositivo ─────────────────────────────
function buildMapUrl(direccion) {
  const encoded = encodeURIComponent(direccion);
  const isIOS   = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);

  if (isIOS)     return `maps://maps.apple.com/?q=${encoded}`;
  if (isAndroid) return `geo:0,0?q=${encoded}`;
  return `https://maps.google.com/?q=${encoded}`;
}

document.addEventListener("DOMContentLoaded", () => {
  const btnCeremonia = document.getElementById("mapBtnCeremonia");
  const btnRecepcion = document.getElementById("mapBtnRecepcion");

  // Siempre abre en nueva pestaña en desktop,
  // en móvil intenta app nativa con fallback
  const isIOS     = /iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isMobile  = isIOS || isAndroid;

  [
    { btn: btnCeremonia, dir: DIRECCION_CEREMONIA },
    { btn: btnRecepcion, dir: DIRECCION_RECEPCION }
  ].forEach(({ btn, dir }) => {
    if (!btn) return;
    const encoded = encodeURIComponent(dir);
    const googleUrl = `https://maps.google.com/?q=${encoded}`;

    if (isMobile) {
      btn.href = isIOS
        ? `maps://maps.apple.com/?q=${encoded}`
        : `geo:0,0?q=${encoded}`;

      btn.addEventListener("click", () => {
        setTimeout(() => window.open(googleUrl, "_blank"), 1500);
      });
    } else {
      btn.href = googleUrl;
    }
  });
});
// ══════════════════════════════════════════
// CARRUSEL RESPONSIVE
// ══════════════════════════════════════════
function initCarousel() {
  const track   = document.getElementById("carouselTrack");
  const dotsEl  = document.getElementById("carouselDots");
  const prevBtn = document.getElementById("carouselPrev");
  const nextBtn = document.getElementById("carouselNext");

  if (!track) return;

  const slides = Array.from(track.querySelectorAll(".carousel-slide"));
  const total  = slides.length;
  if (total === 0) return;

  let current   = 0;
  let autoTimer = null;

  // ─────────────────────────────────────
  // ¿Cuántas fotos se ven a la vez?
  // ─────────────────────────────────────
  function getVisible() {
    return window.innerWidth >= 768 ? 3 : 1;
  }

  // ─────────────────────────────────────
  // Índice máximo al que se puede ir
  // ─────────────────────────────────────
  function getMax() {
    return Math.max(0, total - getVisible());
  }

  // ─────────────────────────────────────
  // Aplicar el ancho correcto a cada slide
  // según el breakpoint actual
  // ─────────────────────────────────────
  function setSlideSizes() {
    const visible = getVisible();
    const pct     = 100 / visible; // 33.33% en desktop, 100% en móvil

    slides.forEach(slide => {
      slide.style.flex     = `0 0 ${pct}%`;
      slide.style.width    = `${pct}%`;
      slide.style.minWidth = `${pct}%`;
    });
  }

  // ─────────────────────────────────────
  // Mover la pista al índice indicado
  // ─────────────────────────────────────
  function goTo(index) {
    const max     = getMax();
    current       = Math.max(0, Math.min(index, max));
    const visible = getVisible();

    // Desplazamiento = current * (100 / visible) %
    // Esto funciona porque cada slide ocupa (100/visible)%
    const offset = current * (100 / visible);
    track.style.transform = `translateX(-${offset}%)`;

    // Actualizar puntos
    if (dotsEl) {
      dotsEl.querySelectorAll(".carousel-dot").forEach((dot, i) => {
        dot.classList.toggle("active", i === current);
      });
    }
  }

  // ─────────────────────────────────────
  // Siguiente / Anterior
  // ─────────────────────────────────────
  function next() {
    goTo(current >= getMax() ? 0 : current + 1);
  }

  function prev() {
    goTo(current <= 0 ? getMax() : current - 1);
  }

  // ─────────────────────────────────────
  // Crear puntos indicadores
  // ─────────────────────────────────────
  function createDots() {
    if (!dotsEl) return;
    dotsEl.innerHTML = "";
    const max = getMax();

    for (let i = 0; i <= max; i++) {
      const dot = document.createElement("button");
      dot.type      = "button";
      dot.className = "carousel-dot" + (i === current ? " active" : "");
      dot.setAttribute("aria-label", `Foto ${i + 1}`);
      dot.addEventListener("click", () => {
        goTo(i);
        restartAuto();
      });
      dotsEl.appendChild(dot);
    }
  }

  // ─────────────────────────────────────
  // Auto-avance cada 3 segundos
  // ─────────────────────────────────────
  function startAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(next, 3000);
  }

  function restartAuto() {
    startAuto();
  }

  // ─────────────────────────────────────
  // Botones
  // ─────────────────────────────────────
  if (prevBtn) {
    prevBtn.addEventListener("click", e => {
      e.preventDefault();
      prev();
      restartAuto();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", e => {
      e.preventDefault();
      next();
      restartAuto();
    });
  }

  // ─────────────────────────────────────
  // Swipe táctil
  // ─────────────────────────────────────
  let touchStartX = 0;

  track.addEventListener("touchstart", e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  track.addEventListener("touchend", e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
      restartAuto();
    }
  }, { passive: true });

  // ─────────────────────────────────────
  // Recalcular al cambiar tamaño de pantalla
  // ─────────────────────────────────────
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      setSlideSizes();
      createDots();
      // Si el índice actual ya no es válido, volver al inicio
      if (current > getMax()) current = 0;
      goTo(current);
    }, 200);
  });

  // ─────────────────────────────────────
  // INICIALIZAR
  // ─────────────────────────────────────
  setSlideSizes();   // primero aplicar tamaños
  createDots();      // luego crear puntos
  goTo(0);           // ir al inicio
  startAuto();       // arrancar auto-avance

  console.log(`Carrusel listo: ${total} fotos, ${getVisible()} visibles`);
}

// Iniciar cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  initCarousel();
});

// ══════════════════════════════════════════
// POPUP BANCO
// ══════════════════════════════════════════
function abrirBanco() {
  const backdrop = document.getElementById("bancoBackdrop");
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function cerrarBanco(e) {
  if (e && e.target !== document.getElementById("bancoBackdrop")) return;
  document.getElementById("bancoBackdrop").classList.remove("open");
  document.body.style.overflow = "";
}

// ─── POPUP RSVP ──────────────────────────────────────────────
function abrirRSVP() {
  const backdrop = document.getElementById("rsvpBackdrop");
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function cerrarRSVP(e) {
  // Si se llama desde el backdrop, solo cerrar si el clic fue en el fondo
  if (e && e.target !== document.getElementById("rsvpBackdrop")) return;
  const backdrop = document.getElementById("rsvpBackdrop");
  backdrop.classList.remove("open");
  document.body.style.overflow = "";
}

// Cerrar con tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") cerrarRSVP();
});

// ─── COPIAR DATOS BANCARIOS ───────────────────────────────────
function copiarTodo() {
  const texto =
    `Isidora\n` +
    `12.345.678-9\n` +
    `Banco Estado\n` +
    `Cuenta Vista\n` +
    `12345678999`;

  navigator.clipboard.writeText(texto).then(() => {
    mostrarToast();
  }).catch(() => {
    const el = document.createElement("textarea");
    el.value = texto;
    el.style.cssText = "position:fixed;opacity:0;";
    document.body.appendChild(el);
    el.select();
    document.execCommand("copy");
    document.body.removeChild(el);
    mostrarToast();
  });
}

function mostrarToast() {
  const toast = document.getElementById("copyToast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 2800);
}

// ─── ENVIAR RSVP A GOOGLE SHEETS ─────────────────────────────
async function enviarRSVP(e) {
  e.preventDefault();

  const nombre     = document.getElementById("nombre").value.trim();
  const asistencia = document.getElementById("asistencia").value;
  const cancion    = document.getElementById("cancion").value.trim();
  const mensaje    = document.getElementById("mensaje").value.trim();
  const btn        = document.getElementById("submitBtn");
  const formMsg    = document.getElementById("formMsg");

  if (!nombre || !asistencia) {
    formMsg.textContent = "Por favor completa tu nombre y si asistirás.";
    formMsg.style.color = "#c0392b";
    return;
  }

  btn.disabled    = true;
  btn.textContent = "Enviando...";
  formMsg.textContent = "";

  // Columnas: Fecha | Nombre | Asistencia | Canción | Mensaje
  const payload = { nombre, asistencia, cancion, mensaje };

  try {
    await fetch(APPS_SCRIPT_URL, {
      method:  "POST",
      mode:    "no-cors",
      headers: { "Content-Type":"application/json" },
      body:    JSON.stringify(payload)
    });

    formMsg.textContent = "¡Gracias! Tu confirmación fue enviada con éxito 💜";
    formMsg.style.color = "#9a84a8";
    document.getElementById("rsvpForm").reset();

    // Cerrar panel después de 2.5s
    setTimeout(() => cerrarRSVP(), 2500);

  } catch (error) {
    formMsg.textContent = "Hubo un error al enviar. Por favor intenta de nuevo.";
    formMsg.style.color = "#c0392b";
    console.error(error);
  } finally {
    btn.disabled    = false;
    btn.textContent = "Confirmar asistencia";
  }
}
