// Nombre de la marca: cámbialo aquí y se actualiza en toda la página.
const BRAND_NAME = "Bett&Well 360°";

document.querySelectorAll(".brand-name").forEach((el) => (el.textContent = BRAND_NAME));
document.title = `${BRAND_NAME} · Salud ocupacional y bienestar integral`;
document.getElementById("year").textContent = new Date().getFullYear();

// Menú móvil
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("menu");
toggle.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  toggle.setAttribute("aria-expanded", open);
});
menu.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  })
);

// Animación al hacer scroll
const revealTargets = document.querySelectorAll(".pillar, .audience, .steps li, .dash, .member, .contact > *");
if ("IntersectionObserver" in window) {
  const io = new IntersectionObserver(
    (entries) =>
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          io.unobserve(e.target);
        }
      }),
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => {
    el.classList.add("reveal");
    io.observe(el);
  });
}

// Enlaces aún sin destino (WhatsApp, legales, redes): evita que salten al inicio
document.querySelectorAll('a[href="#"]').forEach((a) => a.addEventListener("click", (e) => e.preventDefault()));

// Formulario de contacto (por ahora solo valida; falta conectarlo a un correo o servicio)
const form = document.getElementById("contact-form");
const status = form.querySelector(".form-status");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const { nombre, correo, empresa, colaboradores, acepto } = form.elements;
  let error = "";
  if (!nombre.value.trim() || !empresa.value.trim()) error = "Completa tu nombre y el nombre de tu empresa.";
  else if (!correo.value.trim() || !correo.validity.valid) error = "Escribe un correo válido, por ejemplo nombre@empresa.com.";
  else if (!colaboradores.value) error = "Selecciona el número de colaboradores de tu empresa.";
  else if (!acepto.checked) error = "Para enviar, acepta la política de privacidad.";
  if (error) {
    status.textContent = error;
    status.className = "form-status error";
    return;
  }
  status.textContent = `¡Gracias, ${nombre.value.trim()}! Te contactaremos pronto.`;
  status.className = "form-status ok";
  form.reset();
});
