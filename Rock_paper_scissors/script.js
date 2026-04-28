// ===== GAME LOGIC =====
function getWinner(player1, player2) {
  player1 = player1.toLowerCase();
  player2 = player2.toLowerCase();

  if (player1 === player2) return "Draw";

  if (
    (player1 === "rock"     && player2 === "scissors") ||
    (player1 === "scissors" && player2 === "paper")    ||
    (player1 === "paper"    && player2 === "rock")
  ) return "Player1 Wins";

  return "Player2 Wins";
}

// ===== STATE =====
const state = {
  p1: null,
  p2: null,
  scores: { p1: 0, p2: 0 },
  round: 0,
};

const EMOJI = { rock: "🪨", paper: "📄", scissors: "✂️" };

// ===== DOM REFS =====
const icon1      = document.getElementById("icon1");
const icon2      = document.getElementById("icon2");
const selected1  = document.getElementById("selected1");
const selected2  = document.getElementById("selected2");
const fightBtn   = document.getElementById("fightBtn");
const resetBtn   = document.getElementById("resetBtn");
const resetScoreBtn = document.getElementById("resetScoreBtn");
const resultBanner  = document.getElementById("resultBanner");
const resultText    = document.getElementById("resultText");
const score1El   = document.getElementById("score1");
const score2El   = document.getElementById("score2");
const historyList = document.getElementById("historyList");
const zone1      = document.getElementById("zone1");
const zone2      = document.getElementById("zone2");

// ===== CHOICE SELECTION =====
document.querySelectorAll(".choice-btn").forEach(btn => {
  btn.addEventListener("click", () => {
    const player = btn.dataset.player;
    const choice = btn.dataset.choice;

    // Highlight active button for this player
    document.querySelectorAll(`.choice-btn[data-player="${player}"]`).forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    if (player === "1") {
      state.p1 = choice;
      icon1.textContent = EMOJI[choice];
      selected1.classList.add("chosen");
    } else {
      state.p2 = choice;
      icon2.textContent = EMOJI[choice];
      selected2.classList.add("chosen");
    }

    // Enable fight button when both chosen
    fightBtn.disabled = !(state.p1 && state.p2);
  });
});

// ===== FIGHT =====
fightBtn.addEventListener("click", () => {
  if (!state.p1 || !state.p2) return;

  fightBtn.classList.add("shake");
  setTimeout(() => fightBtn.classList.remove("shake"), 400);

  const result = getWinner(state.p1, state.p2);
  state.round++;

  // Update scores
  let bannerClass = "";
  let displayText = "";

  if (result === "Player1 Wins") {
    state.scores.p1++;
    bannerClass = "win1";
    displayText = "⚡ PLAYER 1 WINS";
    zone1.classList.add("winner");
    zone2.classList.remove("winner");
    popScore(score1El);
  } else if (result === "Player2 Wins") {
    state.scores.p2++;
    bannerClass = "win2";
    displayText = "⚡ PLAYER 2 WINS";
    zone2.classList.add("winner");
    zone1.classList.remove("winner");
    popScore(score2El);
  } else {
    bannerClass = "draw";
    displayText = "— DRAW —";
    zone1.classList.remove("winner");
    zone2.classList.remove("winner");
  }

  score1El.textContent = state.scores.p1;
  score2El.textContent = state.scores.p2;

  // Show result
  resultBanner.className = `result-banner show ${bannerClass}`;
  resultText.textContent = displayText;

  // Lock choices after fight
  document.querySelectorAll(".choice-btn").forEach(b => b.disabled = true);
  fightBtn.disabled = true;

  // Add to history
  addHistory(state.round, state.p1, state.p2, result, bannerClass);
});

// ===== RESET ROUND =====
resetBtn.addEventListener("click", resetRound);

function resetRound() {
  state.p1 = null;
  state.p2 = null;

  icon1.textContent = "?";
  icon2.textContent = "?";
  selected1.classList.remove("chosen");
  selected2.classList.remove("chosen");

  document.querySelectorAll(".choice-btn").forEach(b => {
    b.classList.remove("active");
    b.disabled = false;
  });

  fightBtn.disabled = true;

  resultBanner.className = "result-banner";
  resultText.textContent = "";

  zone1.classList.remove("winner");
  zone2.classList.remove("winner");
}

// ===== RESET SCORES =====
resetScoreBtn.addEventListener("click", () => {
  state.scores.p1 = 0;
  state.scores.p2 = 0;
  state.round = 0;
  score1El.textContent = "0";
  score2El.textContent = "0";
  historyList.innerHTML = '<span class="history-empty">No rounds played yet.</span>';
  resetRound();
});

// ===== SCORE POP ANIMATION =====
function popScore(el) {
  el.classList.remove("pop");
  void el.offsetWidth; // reflow
  el.classList.add("pop");
  el.addEventListener("transitionend", () => el.classList.remove("pop"), { once: true });
}

// ===== HISTORY =====
function addHistory(round, p1, p2, result, cls) {
  // Remove empty placeholder
  const empty = historyList.querySelector(".history-empty");
  if (empty) empty.remove();

  const entry = document.createElement("div"); 
  entry.className = `history-entry ${cls}`;
  entry.innerHTML = `
    <span class="history-round">#${round}</span>
    <span>${EMOJI[p1]} P1 &nbsp;·&nbsp; ${EMOJI[p2]} P2</span>
    <span class="history-result">${
      result === "Draw" ? "DRAW" :
      result === "Player1 Wins" ? "P1 WINS" : "P2 WINS"
    }</span>
  `;
  historyList.prepend(entry);
}