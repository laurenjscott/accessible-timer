//Added 2024-09-02
window.addEventListener("load", () => {
  const form = document.querySelector("form");
  const restartButton = document.querySelector(".btn-restart");

  let time;
  let interval;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    startTimer();
  });

  restartButton.addEventListener("click", restart);
});

function startTimer() {
  const form = document.querySelector("form");
  const startButton = document.querySelector(".btn-start");
  const minutesSpan = document.querySelector("span.minutes");
  const secondsSpan = document.querySelector("span.seconds");
  const timerContainer = document.querySelector(".container-countdown-timer");
  const timerCaption = document.querySelector(".string-timer-caption");
  const startTimerAnnouncementString = document.querySelector(
    "p.start-timer-announcement"
  );

  const startingTime = document.querySelector("input").value;
  time = startingTime * 60; //converts to seconds

  //Reset form and remove it from layout
  form.reset();
  form.classList.add("no-display");

  //Show timer section
  timerContainer.classList.toggle("show-element");

  let minutes = Math.floor(time / 60); // user selected time in minutes
  let seconds = time % 60; //remainder
  seconds = seconds < 10 ? "0" + seconds : seconds; //prefaces seconds value with a "0" if less than 10 seconds
  minutesSpan.textContent = minutes;
  secondsSpan.textContent = seconds;

  setTimerCaptionString(timerCaption);

  startTimerAnnouncementString.textContent = `Counting down from ${minutes}`;

  updateTimer(minutes); //decreases 2.5s delay in updateTimer function starts in set interval below

  interval = setInterval(updateTimer, 1000); //sets the updateTimer function to run every second
}

function updateTimer(originalMinutes) {
  const startButton = document.querySelector(".btn-start");
  const minutesSpan = document.querySelector("span.minutes");
  const secondsSpan = document.querySelector("span.seconds");
  const timerCaption = document.querySelector(".string-timer-caption");
  const restartButton = document.querySelector(".btn-restart");

  let minutes = Math.floor(time / 60); // user selected time in minutes
  let seconds = time % 60; //remainder
  seconds = seconds < 10 ? "0" + seconds : seconds; //prefaces seconds value with a "0" if less than 10 seconds
  if (originalMinutes != minutes) {
    minutesSpan.textContent = minutes;
  }
  secondsSpan.textContent = seconds;

  setTimerCaptionString(timerCaption);

  if (time == 0) {
    clearInterval(interval);
    restartButton.classList.toggle("show-element");
    return;
  }

  time--;
}

function restart() {
  const form = document.querySelector("form");
  const timerContainer = document.querySelector(".container-countdown-timer");

  //show the form again (add back to layout);
  form.classList.toggle("no-display");

  //hide the timer container (set opacity)
  timerContainer.classList.toggle("show-element");

  //hide the restart button (set opacity)
  event.currentTarget.classList.toggle("show-element");

  //focus on the input
  form.querySelector("input").focus();
}

//Added 2024-09-02

function setTimerCaptionString(timerCaption) {
  if (time >= 120) {
    //make modular function
    timerCaption.textContent = "Minutes until alarm";
  } else if (time >= 60) {
    timerCaption.textContent = "Minute until alarm";
  } else if (time > 1 || time == 0) {
    timerCaption.textContent = "Seconds until alarm";
  } else {
    timerCaption.textContent = "Second until alarm";
  }
}
