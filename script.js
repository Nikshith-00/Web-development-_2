const display = document.getElementById("display");
const startBtn = document.getElementById("startBtn");
const pauseBtn = document.getElementById("pauseBtn");
const lapBtn = document.getElementById("lapBtn");
const resetBtn = document.getElementById("resetBtn");
const lapsList = document.getElementById("lapsList");
const lapCount = document.getElementById("lapCount");
const emptyLaps = document.getElementById("emptyLaps");
const statusText = document.getElementById("status");

let startTime = 0;
let elapsedTime = 0;
let timerId = null;
let lapNumber = 0;
let lastLapTime = 0;

function formatTime(time) {
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const centiseconds = Math.floor((time % 1000) / 10);

  return (
    String(hours).padStart(2, "0") + ":" +
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + "." +
    String(centiseconds).padStart(2, "0")
  );
}

function updateDisplay() {
  elapsedTime = Date.now() - startTime;
  display.textContent = formatTime(elapsedTime);
}

function startStopwatch() {
  if (timerId !== null) return;

  startTime = Date.now() - elapsedTime;
  timerId = setInterval(updateDisplay, 10);

  statusText.textContent = "Stopwatch is running";
  startBtn.disabled = true;
  pauseBtn.disabled = false;
  lapBtn.disabled = false;
}

function pauseStopwatch() {
  if (timerId === null) return;

  clearInterval(timerId);
  timerId = null;
  statusText.textContent = "Stopwatch paused";

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function resetStopwatch() {
  clearInterval(timerId);
  timerId = null;
  elapsedTime = 0;
  startTime = 0;
  lapNumber = 0;
  lastLapTime = 0;

  display.textContent = "00:00:00.00";
  lapsList.innerHTML = "";
  lapCount.textContent = "0 laps";
  emptyLaps.style.display = "block";
  statusText.textContent = "Ready to start";

  startBtn.disabled = false;
  pauseBtn.disabled = true;
  lapBtn.disabled = true;
}

function addLap() {
  if (timerId === null) return;

  lapNumber++;

  const currentTime = elapsedTime;
  const lapTime = currentTime - lastLapTime;
  lastLapTime = currentTime;

  const li = document.createElement("li");
  li.innerHTML = `<span>Lap ${lapNumber}</span><strong>${formatTime(lapTime)}</strong>`;

  lapsList.prepend(li);
  emptyLaps.style.display = "none";
  lapCount.textContent = `${lapNumber} ${lapNumber === 1 ? "lap" : "laps"}`;
}

startBtn.addEventListener("click", startStopwatch);
pauseBtn.addEventListener("click", pauseStopwatch);
lapBtn.addEventListener("click", addLap);
resetBtn.addEventListener("click", resetStopwatch);

pauseBtn.disabled = true;
lapBtn.disabled = true;
