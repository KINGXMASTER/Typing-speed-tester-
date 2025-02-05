const textToType = document.getElementById('text-to-type').textContent;
const inputBox = document.getElementById('input-box');
const timerElement = document.getElementById('timer');
const accuracyElement = document.getElementById('accuracy');
const speedElement = document.getElementById('speed');
const startButton = document.getElementById('start-btn');

let startTime, timerInterval;

function startTest() {
  inputBox.value = "";
  inputBox.disabled = false;
  inputBox.focus();
  startButton.disabled = true;
  resetStats();
  startTime = new Date().getTime();
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 100);
}

function updateTimer() {
  const elapsedTime = Math.floor((new Date().getTime() - startTime) / 1000);
  timerElement.textContent = `Time: ${elapsedTime}s`;
}

function calculateResults() {
  clearInterval(timerInterval);
  const typedText = inputBox.value.trim();
  const elapsedTime = (new Date().getTime() - startTime) / 1000;
  const wordsTyped = typedText.split(/\s+/).length;

  const correctChars = typedText.split('').filter((char, index) => char === textToType[index]).length;
  const accuracy = ((correctChars / textToType.length) * 100).toFixed(2);
  const speed = Math.floor((wordsTyped / elapsedTime) * 60);

  accuracyElement.textContent = `Accuracy: ${accuracy}%`;
  speedElement.textContent = `Speed: ${speed} WPM`;
  inputBox.disabled = true;
  startButton.disabled = false;
}

function resetStats() {
  timerElement.textContent = "Time: 0s";
  accuracyElement.textContent = "Accuracy: 0%";
  speedElement.textContent = "Speed: 0 WPM";
}

inputBox.addEventListener('input', () => {
  if (inputBox.value === textToType) {
    calculateResults();
  }
});

startButton.addEventListener('click', startTest);
