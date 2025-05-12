let timerInterval;
let timeRemaining = 300;

function updateDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  document.getElementById('display').textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    if (timeRemaining > 0) {
      timeRemaining--;
      updateDisplay();
    } else {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerInterval);
}

function resetTimer() {
  timeRemaining = parseInt(document.getElementById('minutes-input').value) * 60;
  updateDisplay();
}

function changeSound(type) {
  const audio = document.getElementById('ambient-audio');
  const soundMap = {
    rain: 'sounds/rain.mp3',
    forest: 'sounds/forest.mp3',
    waves: 'sounds/waves.mp3'
  };
  audio.src = soundMap[type] || '';
  type !== 'none' ? audio.play() : audio.pause();
}

function playGuided(file) {
  const guided = document.getElementById('guided-audio');
  guided.src = file;
  guided.play();
}

// Auth
function showLogin() {
  document.getElementById('auth-section').classList.remove('hidden');
}

function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.signInWithEmailAndPassword(email, password)
    .catch(err => alert(err.message));
}

function signup() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  auth.createUserWithEmailAndPassword(email, password)
    .catch(err => alert(err.message));
}

auth.onAuthStateChanged(user => {
  if (user) {
    document.getElementById('home-section').classList.add('hidden');
    document.getElementById('meditate-section').classList.remove('hidden');
    document.getElementById('profile-section').classList.remove('hidden');
    document.getElementById('auth-section').classList.add('hidden');
    document.getElementById('user-info').textContent = `Logged in as: ${user.email}`;
    document.getElementById('logout-btn').style.display = 'inline';
  } else {
    document.getElementById('home-section').classList.remove('hidden');
    document.getElementById('meditate-section').classList.add('hidden');
    document.getElementById('profile-section').classList.add('hidden');
    document.getElementById('logout-btn').style.display = 'none';
  }
});

document.getElementById('logout-btn').addEventListener('click', () => {
  auth.signOut();
});
