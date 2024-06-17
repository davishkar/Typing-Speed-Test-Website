const para = document.getElementById("para");
const InputBox = document.getElementById("input");
const StartBtn = document.getElementById("start-btn");
const timer = document.getElementById("timer");
const speed = document.getElementById("speed");
const accuracy = document.getElementById("accuracy");
const RetryBtn = document.getElementById("retry-btn");
const PauseBtn = document.getElementById("pause-btn");

let timeSeconds = 30;
let accuracy1 = 0;
let speed1 = 0;
timer.textContent = `Time left: ${timeSeconds}`;
let paused = false;

StartBtn.addEventListener("click", () => {
  let ParaWords = [];

  // let correctCount = 0;

  const timeInterval = setInterval(() => {
    if (!paused) {
      if (timeSeconds > 0) {
        timeSeconds -= 1;
        timer.textContent = ` Time left : ${timeSeconds}`;
      } else if (timeSeconds === 0) {
        clearInterval(timeInterval);
        alert("Time's Up!");
        ParaWords = para.textContent.trim().split(" ");
        const InputWords = InputBox.value.split(" ");
        timer.textContent = `Time left: ${timeSeconds}`;
        let accuracy1 = 0;
        let speed1 = 0;
        let correctCount = 0;

        InputWords.forEach((Word, Index) => {
          if (Word === ParaWords[Index]) {
            //Index++;
            correctCount += 1;
            console.log(correctCount);
          }
        });
        if (InputBox.value != "") {
          speed1 = (InputWords.length / 30) * 60;
          console.log(speed1);
        }

        accuracy1 = (correctCount / InputWords.length) * 100;
        console.log(accuracy1);
        InputBox.disabled = true;
        // StartBtn.disabled = false;
        // StartBtn.focus();

        accuracy.textContent = `Accuracy : ${accuracy1} %`;
        speed.textContent = `Typing Speed: ${speed1} WPM`;
        //clearInterval();
      }
    }
  }, 1000);
});

function restartPage() {
  location.reload();
}
document.getElementById("retry-btn").addEventListener("click", restartPage);

PauseBtn.addEventListener("click", () => {
  if (paused) {
    paused = false;
    PauseBtn.textContent = "Pause";
  } else {
    paused = true;
    PauseBtn.textContent = "Resume";
  }
});
