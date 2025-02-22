const quoteText = document.getElementById("quote-text");
const quoteInput = document.getElementById("quote-input");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const retryBtn = document.getElementById("retry-btn");
const timerDisplay = document.getElementById("timer");
const wpmDisplay = document.getElementById("wpm");
const feedback = document.getElementById("feedback");
const progressBar = document.getElementById("progress");

let timer = 30;
let timerInterval;
let isPaused = false;
let startTime;

// Sample quotes (you can add more)
const quotes = [
  "The only limit to our realization of tomorrow is our doubts of today.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts.",
  "Life is what happens when you're busy making other plans.",
  "Happiness depends upon ourselves.",
  "Believe you can and you're halfway there.",
  "Opportunities don't happen, you create them.",
  "Difficulties in life are intended to make us better, not bitter.",
  "Your time is limited, so don't waste it living someone else's life.",
  "Strive not to be a success, but rather to be of value.",
  "Do what you can, with what you have, where you are.",
  "It does not matter how slowly you go as long as you do not stop.",
  "Don't watch the clock; do what it does. Keep going.",
  "Success usually comes to those who are too busy to be looking for it.",
  "Courage is resistance to fear, mastery of fear, not absence of fear.",
  "The best way to predict the future is to create it.",
  "Do what you love and success will follow. Passion is the fuel behind a successful career.",
  "Failure is the condiment that gives success its flavor.",
  "Dream big and dare to fail.",
  "The road to success and the road to failure are almost exactly the same.",
  "Don’t be afraid to give up the good to go for the great.",
  "All progress takes place outside the comfort zone.",
  "The successful warrior is the average man, with laser-like focus.",
  "Develop success from failures. Discouragement and failure are two of the surest stepping stones to success.",
  "I find that the harder I work, the more luck I seem to have.",
  "Don’t let yesterday take up too much of today.",
  "A journey of a thousand miles begins with a single step.",
  "Everything you’ve ever wanted is on the other side of fear.",
  "Do what you can with all you have, wherever you are.",
  "Act as if what you do makes a difference. It does."
];


// Select a random quote
function loadNewQuote() {
    let randomIndex = Math.floor(Math.random() * quotes.length);
    quoteText.textContent = quotes[randomIndex];
}

// Start the typing test
function startTest() {
    loadNewQuote();
    quoteInput.disabled = false;
    quoteInput.value = "";
    quoteInput.focus();

    startBtn.disabled = true;
    pauseBtn.disabled = false;
    retryBtn.disabled = false;

    feedback.textContent = "";
    progressBar.style.width = "0%";
    timer = 30;
    timerDisplay.textContent = timer;
    startTime = new Date();

    // Start countdown timer
    timerInterval = setInterval(() => {
        if (!isPaused) {
            if (timer > 0) {
                timer--;
                timerDisplay.textContent = timer;
                updateProgressBar();
            } else {
                clearInterval(timerInterval);
                endTest();
            }
        }
    }, 1000);
}

// Pause or resume the test
function togglePause() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? "Resume" : "Pause";
}

// End the test and calculate results
function endTest() {
    quoteInput.disabled = true;
    pauseBtn.disabled = true;
    startBtn.disabled = false;

    let wordsTyped = quoteInput.value.trim().split(/\s+/).length;
    let elapsedTime = (30 - timer) || 1; // Avoid division by zero
    let wpm = Math.round((wordsTyped / elapsedTime) * 60);
    
    wpmDisplay.textContent = wpm > 0 ? wpm : 0;

    feedback.textContent = "Test Completed!";
    progressBar.style.width = "100%";
}

// Restart the test
function restartTest() {
    clearInterval(timerInterval);
    quoteInput.value = "";
    quoteInput.disabled = true;
    timer = 30;
    timerDisplay.textContent = "30";
    wpmDisplay.textContent = "0";
    feedback.textContent = "";
    progressBar.style.width = "0%";
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    pauseBtn.textContent = "Pause";
    isPaused = false;
}

// Update progress bar
function updateProgressBar() {
    let progress = ((30 - timer) / 30) * 100;
    progressBar.style.width = `${progress}%`;
}

// Highlight incorrect words
quoteInput.addEventListener("input", () => {
    let typedText = quoteInput.value;
    let correctText = quoteText.textContent;

    let formattedText = "";
    for (let i = 0; i < typedText.length; i++) {
        if (typedText[i] === correctText[i]) {
            formattedText += `<span class="correct">${typedText[i]}</span>`;
        } else {
            formattedText += `<span class="wrong">${typedText[i]}</span>`;
        }
    }

    quoteText.innerHTML = formattedText + correctText.substring(typedText.length);
});

// Event listeners
startBtn.addEventListener("click", startTest);
pauseBtn.addEventListener("click", togglePause);
retryBtn.addEventListener("click", restartTest);
