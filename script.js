class BubbleGame {
  constructor(hitBoxId, timerBoxId, scoreBoxId) {
    this.hitBox = document.getElementById(hitBoxId);
    this.timerBox = document.getElementById(timerBoxId);
    this.scoreBox = document.getElementById(scoreBoxId);

    this.score = 0;
    this.timeLeft = 60;
    this.hit = 0;
    this.bubbles = [];

    this.generateRandomNums();
  }

  generateRandomNums() {
    this.bubbles = Array.from({ length: 152 }, () =>
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
}

document.addEventListener("DOMContentLoaded", () => {
  const game = new BubbleGame("hitBox", "timerBox", "scoreBox");

  document.getElementById("gameWindow").addEventListener("click", (e) => {
    if (e.target.classList.contains("numBox")) {
      game.generateRandomNums();
    }
  });
});
