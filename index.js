// FCC: Build a Pomodoro Clock
// User Story: I can start a 25 minute pomodoro, and the timer will go off once 25 minutes has elapsed.
// User Story: I can reset the clock for my next pomodoro.
// User Story: I can customize the length of each pomodoro.

// 8-bit style Pomodoro timer

// Wrap everything in an IIFE
!function() {

  var btminus = document.getElementById('btm');
  var btplus = document.getElementById('btp');
  var wtminus = document.getElementById('wtm');
  var wtplus = document.getElementById('wtp');

  var reset = document.getElementById('reset');

  var breakTime = document.getElementById('bt-timer');
  var workTime = document.getElementById('wt-timer');

  var startPauseButton = document.getElementById('tomato-stem');
  var timerDisplay = document.getElementById('timer');

  var timerState = 'work'; // initially set for the work timer to start
  var startState = 0; // not started yet
  var pauseState = 0; // not paused yet
  var pauseTime = 0;
  var timeout = null;

  function toggleTimer(activity) {
    var time = 0;
    var startTime = 0;
    var timeLeft = 0;
    var minutes, seconds;

    if(pauseTime) { // if resuming from pause
      time = pauseTime;
      pauseTime = 0;
      minutes = Math.floor(time / 60);
      seconds = ('0' + Math.round(time % 60)).slice(-2);
      timerDisplay.textContent = minutes + ':' + seconds;
      startTime = new Date().getTime() + 1000 * time;
    }
    else { // if starting from beginning
      if(activity == 'work') {
        time = document.getElementById('wt-timer').textContent;
      }
      else {
        time = document.getElementById('bt-timer').textContent;
      }
      startTime = new Date().getTime() + 60 * 1000 * Number(time);
    }
    if(!pauseState) { // countdown while not paused
      timeout = setInterval(function() {
        timeLeft = (startTime - new Date().getTime()) / 1000;
        minutes = Math.floor(timeLeft / 60);
        seconds = ('0' + Math.round(timeLeft % 60)).slice(-2);

         if(pauseState) { // if it does get paused, record time.
            clearInterval(timeout);
            pauseTime = timeLeft;
          }

        timerDisplay.textContent = minutes + ':' + seconds;

        if(timeLeft <= 0) {
           document.getElementById('tomato-stem').classList.remove('alarm');
          document.getElementById('tomato-body').classList.remove('alarm'); 
          document.getElementById('tomato-stem').classList.add('alarm');
          document.getElementById('tomato-body').classList.add('alarm');
          clearInterval(timeout);
          if(activity == 'work') {
            toggleTimer('break');
          }
        }     
      }, 1000);
    }
  }

  startPauseButton.addEventListener('click', function() {
    if(!startState) { // if timer hasn't been started
      startState = 1; // it has now
      toggleTimer(timerState);
    }
    else if(pauseState) { // if timer has already been started and it was paused
      pauseState = 0; //resume timer
      toggleTimer(timerState);
    }
    else { // if timer has started but has not been paused.
      pauseState = 1; // it is now paused.
      toggleTimer(timerState);
    }
  });

  btminus.addEventListener('click', function() {
    breakTime.textContent -= 1;
  });

  btplus.addEventListener('click', function() {
    breakTime.textContent = Number(breakTime.textContent) + 1;
  });

  wtminus.addEventListener('click', function() {
    workTime.textContent -= 1;
  });

  wtplus.addEventListener('click', function() {
   workTime.textContent = Number(workTime.textContent) + 1;
  });

  reset.addEventListener('click', function() {
    clearInterval(timeout);
    startState = 0;
    pauseState = 0;
    pauseTime = 0;
    if(Number(workTime.textContent) > 0) {
      timerDisplay.textContent = workTime.textContent + ':' + '00';
    }
    else if(Number(breakTime.textContent) > 0) {
      timerDisplay.textContent = breakTime.textContent + ':' + '00';
    }
  });

}();
