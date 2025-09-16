class BubbleGame {
  constructor(hitBoxId, timerBoxId, scoreBoxId) {
    this.hitBox = document.getElementById(hitBoxId);
    this.timerBox = document.getElementById(timerBoxId);
    this.scoreBox = document.getElementById(scoreBoxId);

    this.score = 0;
    this.timeLeft = 60;
    this.bubbles = [];

    this.generateRandomNums();
    this.runTimer();
  }

  generateRandomNums() {
    this.bubbles = Array.from({ length: 144 }, () =>
      Math.floor(Math.random() * 100)
    );
    this.createBubbles();
    this.hitBox.textContent = Math.floor(Math.random() * 100);
  }

  createBubbles() {
    const gameWindow = document.getElementById("gameWindow");
    gameWindow.innerHTML = "";
    this.bubbles.forEach((val) => {
      const numBox = document.createElement("div");
      numBox.className =
        "numBox w-[50px] h-[50px] bg-[#054e63] flex justify-center items-center text-white text-xl rounded-full cursor-pointer";
      numBox.textContent = val;
      gameWindow.appendChild(numBox);
    });
  }

  checkUserHit() {}

  runTimer() {
    this.timerBox.textContent = this.timeLeft;
    const timer = setInterval(() => {
      this.timeLeft -= 1;
      this.timerBox.textContent = this.timeLeft;
      if (this.timeLeft === 0) {
        clearInterval(timer);
        document.getElementById(
          "gameWindow"
        ).innerHTML = `<h1 class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl font-bold text-center text-[#054e63]">Game Over!</h1>`;
      }
    }, 1000);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new BubbleGame("hitBox", "timerBox", "scoreBox");

  document.getElementById("gameWindow").addEventListener("click", (e) => {
    if (e.target.classList.contains("numBox")) {
      game.generateRandomNums();
    }
  });
});
