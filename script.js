class BubbleGame {
  constructor(hitBoxId, timerBoxId, scoreBoxId, gameWindowId) {
    // Cache DOM elements
    this.hitBox = document.getElementById(hitBoxId);
    this.timerBox = document.getElementById(timerBoxId);
    this.scoreBox = document.getElementById(scoreBoxId);
    this.gameWindow = document.getElementById(gameWindowId);

    // Game state
    this.score = 0;
    this.timeLeft = 60;
    this.bubbleCount = 144;
    this.bubbles = [];
    this.timer = null;

    // Initialize game
    this.init();
  }

  init() {
    this.createBubbles();
    this.newTarget();
    this.runTimer();
    this.bindEvents();
  }

  // Generate random number
  randomNum() {
    return Math.floor(Math.random() * 50);
  }

  // Fill bubbles initially
  createBubbles() {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < this.bubbleCount; i++) {
      const numBox = document.createElement("div");
      numBox.className =
        "numBox w-[50px] h-[50px] bg-[#054e63] flex justify-center items-center text-white text-xl rounded-full cursor-pointer";
      numBox.textContent = this.randomNum();
      fragment.appendChild(numBox);
      this.bubbles.push(numBox);
    }
    this.gameWindow.innerHTML = "";
    this.gameWindow.appendChild(fragment);
  }

  // Pick new target number
  newTarget() {
    this.hitBox.textContent = this.randomNum();
  }

  // Timer logic
  runTimer() {
    this.timerBox.textContent = this.timeLeft;
    this.timer = setInterval(() => {
      this.timeLeft--;
      this.timerBox.textContent = this.timeLeft;

      if (this.timeLeft <= 0) {
        clearInterval(this.timer);
        this.endGame();
      }
    }, 1000);
  }

  // End game screen
  endGame() {
    this.gameWindow.innerHTML = `
      <h1 class="absolute top-1/2 left-1/2 
                 -translate-x-1/2 -translate-y-1/2 
                 text-3xl font-bold text-center text-[#054e63]">
        Game Over!
      </h1>`;
  }

  // Handle bubble click
  checkUserHit(userHit) {
    if (userHit === this.hitBox.textContent) {
      this.score += 10;
      this.scoreBox.textContent = this.score;
    }
    this.createBubbles();
    this.newTarget();
  }

  // Bind events once
  bindEvents() {
    this.gameWindow.addEventListener("click", (e) => {
      if (e.target.classList.contains("numBox")) {
        this.checkUserHit(e.target.textContent);
      }
    });
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new BubbleGame("hitBox", "timerBox", "scoreBox", "gameWindow");
});
