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
    bar.style.width = "100%";
    setTimeout(() => {
      /* Ocultar loader */
      loader.classList.add("hidden");
      const accesoRestaurado =
        restaurarAccesoReciente();
      if (!accesoRestaurado) {
        const accessGate =
          document.getElementById(
            "accessGate"
          );
        if (accessGate) {
          accessGate.classList.remove(
            "hidden"
          );
          accessGate.classList.add(
            "visible"
          );
        }
        document.body.classList.add(
          "preload"
        );
      }
    }, 600);
  }, 800);

});
})();

// ─── CONFIGURACIÓN ───────────────────────────────────────────
const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwGQNl7kiDHABeemBRpeEhP2b5NfEjbe_pu4B8NCICYpNN3MSy2GbL6k9dahgmaoYOSEA/exec";
const DIRECCION_CEREMONIA =
  "Lo Campino 255, Quilicura, Santiago";
const DIRECCION_RECEPCION =
  "Casa Irene Eventos - La Cañada del Carmen, Lampa, Región Metropolitana";

// ══════════════════════════════════════════
// VALIDACIÓN DE INVITADO
// ══════════════════════════════════════════
let invitadoAutorizado = false;
let nombreInvitado = "";
let sexoInvitado = "";
let telefonoInvitadoValidado = "";
const ACCESS_CACHE_KEY = "kewinIsiAccess";
const ACCESS_CACHE_MINUTES = 30;

// ══════════════════════════════════════════
// TELÉFONO INTERNACIONAL
// ══════════════════════════════════════════
function soloDigitos(valor) {
  return String(valor || "")
    .replace(/\D/g, "");
}

// ──────────────────────────────────────────
// ACTUALIZAR TEXTO DE AYUDA
// SEGÚN EL PAÍS
// ──────────────────────────────────────────
function actualizarAyudaTelefono() {
  const select =
    document.getElementById("codigoPais");
  const input =
    document.getElementById("telefonoInvitado");
  const help =
    document.getElementById("phoneHelp");
  if (!select || !input || !help) {
    return;
  }
  const codigo =
    soloDigitos(select.value);
  /* Texto fijo */
  help.textContent =
    "Selecciona el código de tu país e ingresa el número de tu celular.";
  /* Chile */
  if (codigo === "56") {
    input.placeholder =
      "9XXXXXXXX";
    input.maxLength = 9;
  }
  /* Otros países */
  else {
    input.placeholder =
      "Número de celular";
    /*
     * E.164 permite máximo
     * 15 dígitos incluyendo código.
     */
    input.maxLength =
      Math.max(
        6,
        15 - codigo.length
      );
  }
}

// ──────────────────────────────────────────
// CONSTRUIR TELÉFONO COMPLETO
// ─────────────────────────────────────────
function obtenerTelefonoCompleto() {
  const select =
    document.getElementById("codigoPais");
  const input =
    document.getElementById("telefonoInvitado");
  if (!select || !input) {
    return {
      codigo: "",
      local: "",
      completo: ""
    };
  }

  const codigo =
    soloDigitos(select.value);
  let local =
    soloDigitos(input.value);
    if (
    codigo &&
    local.startsWith(codigo)
  ) {
    const posibleLocal =
      local.substring(
        codigo.length
      );
    if (
      posibleLocal.length >= 6
    ) {
      local =
        posibleLocal;
    }
  }

  input.value =
    local;
  return {
    codigo: codigo,
    local: local,
    completo:
      `${codigo}${local}`
  };
}

// ──────────────────────────────────────────
// VALIDAR FORMATO
// ──────────────────────────────────────────
function telefonoEsValido(
  codigo,
  local,
  completo
) {
  if (codigo === "56") {
    return (
      /^\d{9}$/.test(local) &&
      /^56\d{9}$/.test(completo)
    );
  }

  return (
    /^\d{7,15}$/.test(completo) &&
    local.length >= 6
  );

}
// ══════════════════════════════════════════
// SEXO DEL INVITADO
// ══════════════════════════════════════════
function normalizarSexo(valor) {
  return String(valor || "")
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    );
}

// ──────────────────────────────────────────
// INVITADO / INVITADA
// ──────────────────────────────────────────
function obtenerTratamiento(sexo) {
  const valor =
    normalizarSexo(sexo);
  const femenino = [
    "f",
    "femenino",
    "mujer",
    "female",
    "invitada"
  ];

  const masculino = [
    "m",
    "masculino",
    "hombre",
    "male",
    "invitado"
  ];

  if (
    femenino.includes(valor)
  ) {
    return {
      invitacion:
        "estás invitada",
      bienvenida:
        "Bienvenida"
    };
  }

  if (
    masculino.includes(valor)
  ) {
    return {
      invitacion:
        "estás invitado",
      bienvenida:
        "Bienvenido"
    };
  }

  return {
    invitacion:
      "están invitados",
    bienvenida:
      "Bienvenidos"
  };
}

// ──────────────────────────────────────────
// ACTUALIZAR TEXTO DEL OVERLAY
// ──────────────────────────────────────────
function actualizarTextoOverlay(
  sexo,
  nombre
) {
  const textoOverlay =
    document.getElementById(
      "overlayInviteText"
    )
    ||
    document.querySelector(
      ".eyebrow_overlay"
    );
  if (!textoOverlay) {
    return;
  }

  const tratamiento =
    obtenerTratamiento(sexo);
  const nombreLimpio =
    String(nombre || "")
      .trim();
  if (nombreLimpio) {
    textoOverlay.textContent =
      `${nombreLimpio}, ${tratamiento.invitacion} al matrimonio de:`;
  }
  else {
    textoOverlay.textContent =
      `Estás ${tratamiento.invitacion} al matrimonio de:`;
  }
}
// ══════════════════════════════════════════
// MEMORIA TEMPORAL DEL ACCESO
// ══════════════════════════════════════════
function guardarAccesoReciente(tipo) {
  const registro = {
    tipo: tipo,
    nombre:
      nombreInvitado,
    sexo:
      sexoInvitado,
    telefono:
      telefonoInvitadoValidado,
    expira:
      Date.now() +
      ACCESS_CACHE_MINUTES *
      60 *
      1000
  };
  try {
    localStorage.setItem(
      ACCESS_CACHE_KEY,
      JSON.stringify(
        registro
      )
    );
  }
  catch (error) {
    console.warn(
      "No se pudo guardar acceso:",
      error
    );
  }

  // Mantener también sessionStorage
  // porque RSVP utiliza estos datos.
  try {
    sessionStorage.setItem(
      "invitadoAutorizado",
      tipo === "invitado"
        ? "true"
        : "false"
    );
    sessionStorage.setItem(
      "nombreInvitado",
      nombreInvitado
    );
    sessionStorage.setItem(
      "sexoInvitado",
      sexoInvitado
    );

    sessionStorage.setItem(
      "telefonoInvitado",
      telefonoInvitadoValidado
    );
  }
  catch (error) {
    console.warn(
      "No se pudo guardar sesión:",
      error
    );
  }
}

// ──────────────────────────────────────────
// LEER ACCESO GUARDADO
// ──────────────────────────────────────────
function leerAccesoReciente() {
  try {
    const raw =
      localStorage.getItem(
        ACCESS_CACHE_KEY
      );
    if (!raw) {
      return null;
    }
    const data =
      JSON.parse(raw);
    // Si pasaron 30 minutos
    // volvemos a validar.
    if (
      !data.expira ||
      Date.now() > data.expira
    ) {
      localStorage.removeItem(
        ACCESS_CACHE_KEY
      );
      return null;
    }
    return data;
  }
  catch (error) {
    return null;
  }
}

// ══════════════════════════════════════════
// OCULTAR PANTALLA DE TELÉFONO
// ══════════════════════════════════════════
function ocultarPantallaAcceso() {
  const accessGate =
    document.getElementById(
      "accessGate"
    );
  if (!accessGate) {
    return;
  }
  accessGate.classList.remove(
    "visible"
  );
  accessGate.classList.add(
    "hidden"
  );
}

// ══════════════════════════════════════════
// INVITADO AUTORIZADO
// ══════════════════════════════════════════
function activarVistaInvitado() {
  document.body.classList.remove(
    "guest-view"
  );
  invitadoAutorizado = true;
  // Personalizar overlay
  actualizarTextoOverlay(
    sexoInvitado,
    nombreInvitado
  );
  // Precargar nombre RSVP
  const nombreRSVP =
    document.getElementById(
      "nombre"
    );
  if (
    nombreRSVP &&
    nombreInvitado
  ) {
    nombreRSVP.value =
      nombreInvitado;
  }
  ocultarPantallaAcceso();
  // Mostrar overlay
  const overlay =
    document.getElementById(
      "overlay"
    );
  if (overlay) {
    overlay.style.display =
      "";
    overlay.classList.remove(
      "hidden"
    );
    overlay.classList.add(
      "visible"
    );
  }
  document.body.classList.add(
    "preload"
  );
}
// ══════════════════════════════════════════
// PERSONA NO INVITADA
// ══════════════════════════════════════════
function activarVistaVisitante() {
  invitadoAutorizado =
    false;
  // Activamos modo público
  document.body.classList.add(
    "guest-view"
  );
  ocultarPantallaAcceso();
  // NO mostrar overlay
  const overlay =
    document.getElementById(
      "overlay"
    );
  if (overlay) {
    overlay.classList.remove(
      "visible"
    );
    overlay.classList.add(
      "hidden"
    );
    overlay.style.display =
      "none";
  }
  // ═════════════════════════════════════
  // CAMBIAR TEXTO DEL HERO
  // ═════════════════════════════════════
  const heroLead =
    document.getElementById(
      "heroLead"
    );
  if (heroLead) {
    heroLead.textContent =
      "Aunque no podamos compartir este día contigo de manera presencial, " +
      "queremos compartir contigo un pedacito de este momento tan importante. " +
      "Nos hace mucha ilusión que conozcas nuestra historia y seas parte " +
      "de este nuevo capítulo que comenzamos juntos. 💜";
  }
  // ═════════════════════════════════════
  // CAMBIAR TÍTULO DE DETALLES
  // ═════════════════════════════════════
  const detallesTitle =
    document.querySelector(
      "#detalles .section-title"
    );
  if (detallesTitle) {
    detallesTitle.textContent =
      "Nuestra ceremonia";
  }

  // ═════════════════════════════════════
  // FOOTER
  // ═════════════════════════════════════
  const footerText =
    document.querySelector(
      ".footer-text"
    );
  if (footerText) {
    footerText.textContent =
      "Gracias por ser parte de nuestra historia";
  }
  // ═════════════════════════════════════
  // MOSTRAR MENÚ
  // ═════════════════════════════════════
  const topNav =
    document.getElementById(
      "topNav"
    );
  if (topNav) {
    topNav.classList.add(
      "menu-visible"
    );
  }
  // ═════════════════════════════════════
  // MOSTRAR HERO
  // ═════════════════════════════════════
  const hero =
    document.querySelector(
      ".hero"
    );
  document.body.classList.remove(
    "preload"
  );
  document.documentElement
    .classList.remove(
      "preload-lock"
    );
  if (hero) {
    hero.classList.add(
      "hero-visible"
    );
  }
  // Ir directamente arriba
  window.scrollTo({
    top: 0,
    behavior: "auto"
  });
}
// ══════════════════════════════════════════
// RESTAURAR ACCESO
// SAFARI / RECARGA / SEGUNDA ENTRADA
// ══════════════════════════════════════════
function restaurarAccesoReciente() {
  const data =
    leerAccesoReciente();
  if (
    !data ||
    !data.tipo
  ) {
    return false;
  }

  nombreInvitado =
    data.nombre || "";
  sexoInvitado =
    data.sexo || "";
  telefonoInvitadoValidado =
    data.telefono || "";
  // INVITADO
  if (
    data.tipo === "invitado"
  ) {
    activarVistaInvitado();
    return true;
  }
  // VISITANTE
  if (
    data.tipo === "visitante"
  ) {
    activarVistaVisitante();
    return true;
  }
  return false;
}
// ══════════════════════════════════════════
// FETCH CON TIEMPO MÁXIMO
// ══════════════════════════════════════════
async function fetchConTimeout(
  url,
  opciones = {},
  timeoutMs = 25000
) {
  const controller =
    new AbortController();
  const timer =
    setTimeout(
      () => controller.abort(),
      timeoutMs
    );
  try {
    return await fetch(
      url,
      {
        ...opciones,
        signal:
          controller.signal,
        cache:
          "no-store"
      }
    );
  }

  finally {
    clearTimeout(
      timer
    );
  }
}

// ══════════════════════════════════════════
// VALIDAR INVITADO
// ══════════════════════════════════════════
async function validarInvitado(e) {
  e.preventDefault();
  const input =
    document.getElementById(
      "telefonoInvitado"
    );
  const btn =
    document.getElementById(
      "accessBtn"
    );

  const message =
    document.getElementById(
      "accessMessage"
    );


  if (
    !input ||
    !btn ||
    !message
  ) {

    return;

  }

  const telefonoData =
    obtenerTelefonoCompleto();
  // ═════════════════════════════════════
  // VALIDACIÓN LOCAL
  // ═════════════════════════════════════
  if (
    !telefonoEsValido(
      telefonoData.codigo,
      telefonoData.local,
      telefonoData.completo
    )
  ) {
    message.className =
      "access-message error";
    if (
      telefonoData.codigo === "56"
    ) {
      message.textContent =
        "Para Chile ingresa los 9 dígitos de tu celular, por ejemplo 987654321.";
    }
    else {
      message.textContent =
        "Revisa el código de país y el número ingresado.";
    }
    input.focus();
    return;
  }
  // ═════════════════════════════════════
  // VERIFICANDO
  // ═════════════════════════════════════
  btn.disabled =
    true;
  btn.textContent =
    "Verificando...";
  message.className =
    "access-message";
  message.textContent =
    "";
  try {
    const parametros =
  new URLSearchParams({
    accion:
      "validarTelefono",
    telefono:
      telefonoData.completo,
    t:
      Date.now().toString()
  });

const urlValidacion =
  `${APPS_SCRIPT_URL}?${parametros.toString()}`;

const response =
  await fetchConTimeout(
    urlValidacion,
    {
      method:
        "GET",
      cache:
        "no-store"
    },
    25000
  );
if (!response.ok) {
  throw new Error(
    `Error HTTP: ${response.status}`
  );
}

const data =
  await response.json();

console.log(
  "Respuesta Apps Script:",
  data
);

if (
  data.estado === "ok" &&
  !data.resultado
) {
  throw new Error(
    "VERSION_APPS_SCRIPT_INCORRECTA"
  );
}
    // ═════════════════════════════════════
    // INVITADO ENCONTRADO
    // ═════════════════════════════════════
    if (
      data.resultado === "ok"
    ) {
      invitadoAutorizado =
        true;
      nombreInvitado =
        data.nombre || "";
      sexoInvitado =
        data.sexo || "";
      telefonoInvitadoValidado =
        soloDigitos(
          data.telefono ||
          telefonoData.completo
        );
      const tratamiento =
        obtenerTratamiento(
          sexoInvitado
        );
      // Mensaje antes del overlay
      message.className =
        "access-message success";
      if (
        nombreInvitado
      ) {
        message.textContent =
          `¡${tratamiento.bienvenida}, ${nombreInvitado}! 💜`;
      }
      else {
        message.textContent =
          `¡${tratamiento.bienvenida}! 💜`;
      }
      // Guardar por 30 minutos
      guardarAccesoReciente(
        "invitado"
      );
      // Mostrar overlay
      setTimeout(
        () => {
          activarVistaInvitado();
        },
        450
      );
      return;
    }
    // ═════════════════════════════════════
    // NO ESTÁ EN LISTA
    // ═════════════════════════════════════
    if (
      data.resultado ===
        "no_encontrado"
      ||
      data.resultado ===
        "no_autorizado"
    ) {
      nombreInvitado =
        "";
      sexoInvitado =
        "";
      telefonoInvitadoValidado =
        telefonoData.completo;
      message.className =
        "access-message";
      message.textContent =
        "Gracias por visitarnos 💜 Queremos compartir contigo un pedacito de nuestra historia.";
      // Recordar vista pública

      guardarAccesoReciente(
        "visitante"
      );

      setTimeout(
        () => {
          activarVistaVisitante();
        },
        300
      );
      return;
    }
    // ═════════════════════════════════════
    // OTRO ERROR APPS SCRIPT
    // ═════════════════════════════════════
    message.className =
      "access-message error";
    message.textContent =
      data.mensaje ||
      "No pudimos verificar tu acceso en este momento.";
  }
  catch (error) {
  console.error(
    "Error validando invitado:",
    error
  );
  message.className =
    "access-message error";
  if (
    error &&
    error.name === "AbortError"
  ) {
    message.textContent =
      "No fue posible completar la validación. Por favor intenta nuevamente.";
  }
  else if (
    error &&
    error.message ===
      "VERSION_APPS_SCRIPT_INCORRECTA"
  ) {
    message.textContent =
      "Estamos actualizando la invitación. Por favor intenta nuevamente en unos segundos.";
  }
  else {
    message.textContent =
      "No pudimos verificar tu número en este momento. Por favor intenta nuevamente.";
  }
}

  finally {


    btn.disabled =
      false;


    btn.textContent =
      "Ingresar a la invitación";

  }

}


// ══════════════════════════════════════════
// INICIALIZAR SELECTOR DE PAÍS
// ══════════════════════════════════════════

document.addEventListener(

  "DOMContentLoaded",

  () => {

    actualizarAyudaTelefono();

  }

);


// ══════════════════════════════════════════
// SAFARI
// ══════════════════════════════════════════

window.addEventListener(

  "pageshow",

  (event) => {


    // Safari puede restaurar la página
    // desde su memoria bfcache.

    if (
      event.persisted
    ) {

      restaurarAccesoReciente();

    }

  }

);

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
    document.documentElement.classList.remove("preload-lock");
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
// IMPORTANTE: esta función se llama directamente desde el onclick del botón
// (mismo "gesto" del usuario). En móvil, desmutear un video que YA está
// sonando (aunque en silencio) sí está permitido; pedirle a un video que
// arranque desde cero fuera del clic original, NO lo está — por eso antes
// fallaba solo en celular.
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
const weddingDate = new Date('2027-03-06T15:00:00').getTime();

function updateCountdown() {
  const diff      = weddingDate - Date.now();
  const countdown = document.getElementById('countdown');

  if (diff <= 0) {
    countdown.innerHTML = `<div>¡Hoy es el gran día!</div>`;
    return;
  }

  const days    = Math.floor(diff / (1000*60*60*24));
  const hours   = Math.floor((diff / (1000*60*60)) % 24);
  const minutes = Math.floor((diff / (1000*60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  countdown.innerHTML = `
    <div><span>${days}</span><small>Días</small></div>
    <div><span>${hours}</span><small>Horas</small></div>
    <div><span>${minutes}</span><small>Minutos</small></div>
    <div><span>${seconds}</span><small>Segundos</small></div>
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
let rsvpScrollY = 0;

function abrirRSVP() {
  const backdrop = document.getElementById("rsvpBackdrop");
  // Guardamos la posición de scroll y "congelamos" el body.
  // En iOS, overflow:hidden por sí solo NO evita que la página de
  // fondo siga scrolleando con el dedo: por eso antes, al bajar
  // dentro del popup, a veces el gesto se lo "robaba" el fondo y
  // parecía que ya no se podía volver a subir.
  rsvpScrollY = window.scrollY || window.pageYOffset || 0;
  backdrop.classList.add("open");
  document.body.style.position = "fixed";
  document.body.style.top = `-${rsvpScrollY}px`;
  document.body.style.width = "100%";
  document.body.style.overflow = "hidden";
}

function cerrarRSVP(e) {
  // Si se llama desde el backdrop, solo cerrar si el clic fue en el fondo
  if (e && e.target !== document.getElementById("rsvpBackdrop")) return;
  const backdrop = document.getElementById("rsvpBackdrop");
  backdrop.classList.remove("open");
  document.body.style.position = "";
  document.body.style.top = "";
  document.body.style.width = "";
  document.body.style.overflow = "";
  window.scrollTo(0, rsvpScrollY);
}

// Si el campo enfocado queda tapado por el teclado del celular,
// lo llevamos al centro del panel apenas el teclado termina de abrir.
document.addEventListener("focusin", (e) => {
  const panel = document.getElementById("rsvpPanel");
  if (panel && panel.contains(e.target)) {
    setTimeout(() => {
      e.target.scrollIntoView({ block: "center", behavior: "smooth" });
    }, 300);
  }
});

// ─── POPUP DRESS CODE ───────────────────────────────────────
function abrirDresscode() {
  const backdrop = document.getElementById("dresscodeBackdrop");
  backdrop.classList.add("open");
  document.body.style.overflow = "hidden";
}

function cerrarDresscode(e) {
  if (e && e.target !== document.getElementById("dresscodeBackdrop")) return;
  document.getElementById("dresscodeBackdrop").classList.remove("open");
  document.body.style.overflow = "";
}

// Cerrar con tecla Escape
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    cerrarRSVP();
    cerrarDresscode();
  }
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

// ══════════════════════════════════════════
// ENVIAR RSVP A GOOGLE SHEETS
// ══════════════════════════════════════════

async function enviarRSVP(e) {

  e.preventDefault();


  const nombre =
    document
      .getElementById("nombre")
      .value
      .trim();


  const asistencia =
    document
      .getElementById("asistencia")
      .value;


  const restriccion =
    document
      .getElementById("restriccion")
      .value
      .trim();


  const cancion =
    document
      .getElementById("cancion")
      .value
      .trim();


  const mensaje =
    document
      .getElementById("mensaje")
      .value
      .trim();


  const btn =
    document.getElementById(
      "submitBtn"
    );


  const formMsg =
    document.getElementById(
      "formMsg"
    );


  // Recuperamos el teléfono que
  // ya fue validado al entrar

  const telefono =
    telefonoInvitadoValidado ||
    sessionStorage.getItem(
      "telefonoInvitado"
    ) ||
    "";


  // ─────────────────────────────────────
  // VALIDACIONES
  // ─────────────────────────────────────

  if (!nombre) {

    formMsg.textContent =
      "No pudimos identificar tu nombre.";

    formMsg.style.color =
      "#c0392b";

    return;
  }


  if (!telefono) {

    formMsg.textContent =
      "No pudimos identificar tu número de celular. Actualiza la página e ingresa nuevamente.";

    formMsg.style.color =
      "#c0392b";

    return;
  }


  if (!asistencia) {

    formMsg.textContent =
      "Por favor indica si asistirás.";

    formMsg.style.color =
      "#c0392b";

    return;
  }


  btn.disabled = true;

  btn.textContent =
    "Enviando...";

  formMsg.textContent = "";


  try {
    // Apps Script usa e.parameter
    const datos =
      new URLSearchParams();
    datos.append(
      "accion",
      "rsvp"
    );
    datos.append(
      "nombre",
      nombre
    );
    datos.append(
      "telefono",
      telefono
    );
    datos.append(
      "asistencia",
      asistencia
    );
    datos.append(
      "restriccion",
      restriccion
    );
    datos.append(
      "cancion",
      cancion
    );
    datos.append(
      "mensaje",
      mensaje
    );
    const response =
      await fetch(
        APPS_SCRIPT_URL,
        {
          method: "POST",
          body: datos
        }
      );
    if (!response.ok) {
      throw new Error(
        `Error HTTP: ${response.status}`
      );
    }
    const data =
      await response.json();
    console.log(
      "Respuesta RSVP:",
      data
    );
    // ─────────────────────────────────
    // RSVP GUARDADO
    // ─────────────────────────────────
    if (data.resultado === "ok") {
      formMsg.textContent =
        "¡Gracias! Tu confirmación fue registrada correctamente 💜";
      formMsg.style.color =
        "#a37fc0";
      // No limpiamos inmediatamente
      // el nombre oficial
      document
        .getElementById(
          "asistencia"
        )
        .value = "";
      document
        .getElementById(
          "restriccion"
        )
        .value = "";
      document
        .getElementById(
          "cancion"
        )
        .value = "";
      document
        .getElementById(
          "mensaje"
        )
        .value = "";
      setTimeout(
        () => cerrarRSVP(),
        2500
      );
    }
    // ─────────────────────────────────
    // ERROR DESDE APPS SCRIPT
    // ─────────────────────────────────
    else {
      formMsg.textContent =
        data.mensaje ||
        "No pudimos registrar tu confirmación.";
      formMsg.style.color =
        "#c0392b";
    }
  } catch (error) {
    console.error(
      "Error enviando RSVP:",
      error
    );
    formMsg.textContent =
      "Hubo un error al enviar. Por favor intenta nuevamente.";
    formMsg.style.color =
      "#c0392b";
  } 
  finally {
    btn.disabled = false;
    btn.textContent =
      "Confirmar asistencia";
  }
}