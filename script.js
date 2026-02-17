// ❤️ Global State
let countdownTimer;

// ❤️ Floating Hearts Animation
const heartColors = [
  "#ff4d6d",
  "#ff758c",
  "#ff8fa3",
  "#ffb3c1",
  "#ffffff",
  "#e9ecef",
];

function createHeart() {
  const heart = document.createElement("div");
  heart.classList.add("heart");
  heart.innerHTML = "❤️";

  const size = Math.random() * 25 + 15;
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = Math.random() * 3 + 3 + "s";
  heart.style.fontSize = size + "px";
  heart.style.color =
    heartColors[Math.floor(Math.random() * heartColors.length)];
  heart.style.opacity = Math.random() * 0.4 + 0.6;

  document.getElementById("hearts-container").appendChild(heart);

  // Remove heart after animation ends
  setTimeout(() => {
    heart.remove();
  }, 6000);
}

// ❤️ Surprise Logic
function openSurprise() {
  const overlay = document.getElementById("surprise-overlay");
  const container = document.getElementById("main-container");
  const music = document.getElementById("bg-music");

  // Ensure we start at the top
  window.scrollTo(0, 0);

  // Fade out overlay
  overlay.style.opacity = "0";
  overlay.style.transform = "scale(1.1)";

  setTimeout(() => {
    overlay.style.visibility = "hidden";
    container.classList.add("visible");

    // Start interactions
    startCountdown();
    setTimeout(typeWriter, 1000); // Small delay for content fade-in
  }, 1000);

  // Play music (handle browsers that might still block it)
  music.volume = 0.5;
  music.play().catch((e) => console.log("Audio play blocked or failed", e));

  // Start floating hearts - faster at start, then regular
  for (let i = 0; i < 15; i++) {
    setTimeout(createHeart, Math.random() * 1000);
  }
  setInterval(createHeart, 400);
}

// ❤️ Love Letter Typing Effect
const text = `Temi,

There’s something I’ve been wanting to tell you properly.

The day you made me fall in love with you, a day I can never forget, plays in my head more often than you know.

It wasn’t something dramatic.
It was something simple and spontaneous.
The way you even made me smiled.
The way you spoke.
The way you made everything feel lighter.

That was the moment.

I couldn’t give you anything on Valentine’s Day,
but I hope this shows you something important:

Even when I don't have what it take,
I will always have intention.
I will always have effort.
And I will always choose you.

Next week can’t come fast enough ❤️`;

let index = 0;
const speed = 40;

function typeWriter() {
  const element = document.getElementById("typed-text");
  if (index < text.length) {
    element.innerHTML += text.charAt(index);
    index++;
    setTimeout(typeWriter, speed);
  }
}

// ❤️ Countdown Timer
function updateTimer() {
  const countdownDate = new Date("February 24, 2026 18:00:00").getTime();
  const now = new Date().getTime();
  const distance = countdownDate - now;

  if (distance < 0) {
    clearInterval(countdownTimer);
    document.getElementById("timer").innerHTML =
      "<div style='grid-column: span 4; font-size: 2rem; font-family: \"Dancing Script\"'>I'm finally with you ❤️</div>";
    return;
  }

  const days = Math.floor(distance / (1000 * 70 * 60 * 24));
  const hours = Math.floor(
    (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  document.getElementById("timer").innerHTML = `
    <div class="timer-unit"><span class="timer-val">${days}</span><span class="timer-label">Days</span></div>
    <div class="timer-unit"><span class="timer-val">${hours}</span><span class="timer-label">Hours</span></div>
    <div class="timer-unit"><span class="timer-val">${minutes}</span><span class="timer-label">Mins</span></div>
    <div class="timer-unit"><span class="timer-val">${seconds}</span><span class="timer-label">Secs</span></div>
  `;
}

function startCountdown() {
  updateTimer(); // Run once immediately
  countdownTimer = setInterval(updateTimer, 1000);
}
