const envelopeContainer = document.getElementById("envelopeContainer");
const instructions = document.getElementById("instructions");
const audio = document.getElementById("romanticAudio");
const floatingHearts = document.getElementById("floatingHearts");
const letterPaper = document.querySelector(".letter-paper");
const envelopeFlap = document.querySelector(".envelope-flap");

let audioEnabled = false;
let isOpen = false;
let animating = false;

const audioStartTime = 160;

function createFloatingHearts() {
  const heartSymbols = ["❤️", "💕", "💖", "💗", "💓", "💞"];
  for (let i = 0; i < 15; i++) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.innerHTML =
      heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
    heart.style.left = Math.random() * 100 + "%";
    heart.style.top = Math.random() * 100 + "%";
    heart.style.animationDelay = Math.random() * 5 + "s";
    heart.style.fontSize = Math.random() * 15 + 15 + "px";
    floatingHearts.appendChild(heart);
  }
}

function enableAudio() {
  if (audioEnabled) return;
  audioEnabled = true;
  audio.volume = 0.7;
  audio.currentTime = audioStartTime;
  audio.play().then(() => audio.pause());
}

function playAudio() {
  if (!audioEnabled) return;
  audio.currentTime = audioStartTime;
  audio.play().catch((err) => console.log(err));
}

function stopAudio() {
  audio.pause();
  audio.currentTime = audioStartTime;
}

function createHeartBurst(x, y) {
  const burst = document.createElement("div");
  burst.className = "heart-burst";
  burst.style.left = x + "px";
  burst.style.top = y + "px";
  const hearts = ["❤️", "💕", "💖", "💗", "💓"];
  for (let i = 0; i < 15; i++) {
    const p = document.createElement("div");
    p.className = "heart-particle";
    p.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    const angle = (i * 24 * Math.PI) / 180;
    const dist = 60 + Math.random() * 40;
    p.style.left = Math.cos(angle) * dist + "px";
    p.style.top = Math.sin(angle) * dist + "px";
    burst.appendChild(p);
  }
  document.body.appendChild(burst);
  setTimeout(() => burst.remove(), 2000);
}

// Abrir la carta
function openEnvelope() {
  animating = true;
  envelopeContainer.classList.add("open");

  letterPaper.style.transition = "transform 1.2s ease 0.3s";
  letterPaper.style.transform = "translateY(-220px)";

  envelopeFlap.style.transition = "transform 1.5s ease";
  envelopeFlap.style.transform = "rotateX(-180deg)";

  // Cambiar texto de instrucciones y moverlo arriba
  instructions.textContent = "✨ Eres mi persona especial J.P.C.J";
  instructions.classList.add("active");

  enableAudio();
  setTimeout(playAudio, 500);

  const rect = envelopeContainer.getBoundingClientRect();
  createHeartBurst(rect.left + rect.width / 2, rect.top + rect.height / 2);

  setTimeout(() => {
    animating = false;
    isOpen = true;
  }, 1500);
}

// Cerrar la carta
function closeEnvelope() {
  animating = true;

  letterPaper.style.transition = "transform 0.8s ease";
  letterPaper.style.transform = "translateY(0)";

  envelopeFlap.style.transition = "transform 0.8s ease";
  envelopeFlap.style.transform = "rotateX(0deg)";

  // Restaurar texto original
  instructions.textContent =
    "💌 Haz clic en el sobre para abrir tu carta especial";
  instructions.classList.remove("active");

  setTimeout(() => {
    envelopeContainer.classList.remove("open");
    isOpen = false;
    animating = false;
    stopAudio();
  }, 1000);
}

envelopeContainer.addEventListener("click", () => {
  if (animating) return;
  if (!isOpen) openEnvelope();
  else closeEnvelope();
});

createFloatingHearts();
