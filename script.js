document.getElementById("scrollBtn").addEventListener("click", () => {
  window.scrollTo({
    top: window.innerHeight,
    behavior: "smooth"
  });
});

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < window.innerHeight - 100) {
      section.style.opacity = "1";
      section.style.transform = "translateY(0)";
    }
  });
});
let cbPower = 700;
let cbTemp = 320;
let cbRods = 26;
let cbStability = 80;
let cbMinute = 0;
let cbGameOver = false;

function updateCB() {
  document.getElementById("cbPower").textContent = cbPower;
  document.getElementById("cbTemp").textContent = cbTemp;
  document.getElementById("cbRods").textContent = cbRods;
  document.getElementById("cbStability").textContent = cbStability;
  document.getElementById("cbTime").textContent = `01:${cbMinute.toString().padStart(2,"0")}`;
}

function reducePower() {
  if (cbGameOver) return;
  cbPower -= 100;
  cbTemp -= 20;
  cbStability -= 5;
  log("Потужність знижено.");
  checkCB();
}

function withdrawRods() {
  if (cbGameOver || cbRods <= 6) return;
  cbRods -= 4;
  cbPower += 150;
  cbStability -= 10;
  log("Стрижні витягнуто.");
  checkCB();
}

function addRods() {
  if (cbGameOver || cbRods >= 26) return;
  cbRods += 4;
  cbPower -= 80;
  cbStability += 5;
  checkCB();
}

function continueTest() {
  if (cbGameOver) return;
  cbMinute += 5;
  cbPower += 200;
  cbTemp += 60;
  cbStability -= 15;
  log("Експеримент продовжується…");
  checkCB();
}

function cbScram() {
  cbPower += 500; // ефект графітових наконечників
  cbTemp += 300;
  cbStability = 0;
  explosion();
}

function explosion() {
  cbGameOver = true;
  document.getElementById("cbStatus").textContent =
    "💥 01:23 — Вибух реактора. Катастрофа.";
  document.getElementById("cbStatus").style.color = "red";
}

function log(text) {
  document.getElementById("cbStatus").textContent = text;
}

function checkCB() {
  if (cbTemp > 1000 || cbStability <= 0 || cbPower > 3000) {
    explosion();
    return;
  }
  updateCB();
}

updateCB();
