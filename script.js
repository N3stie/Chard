// Background Music Controller
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const musicPlayer = document.querySelector('.music-player');

// Birthday countdown
const birthday = new Date('2026-11-14T00:00:00');
const afterCountdownCode = 'NOVEMBER14';
const todayCode = '!@#$%^&*()RIA';
const countdownElements = {
    days: document.getElementById('days'),
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds')
};

function updateCountdown() {
    const countdownFinished = Date.now() >= birthday.getTime();
    const remaining = Math.max(0, birthday.getTime() - Date.now());
    const totalSeconds = Math.floor(remaining / 1000);
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    countdownElements.days.textContent = days;
    countdownElements.hours.textContent = String(hours).padStart(2, '0');
    countdownElements.minutes.textContent = String(minutes).padStart(2, '0');
    countdownElements.seconds.textContent = String(seconds).padStart(2, '0');

    document.body.classList.toggle('countdown-finished', countdownFinished);
}

updateCountdown();
setInterval(updateCountdown, 1000);

const codeForm = document.getElementById('code-form');
const codeInput = document.getElementById('special-code');
const codeStatus = document.getElementById('code-status');

if (codeForm && codeInput && codeStatus) {
    codeForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const submittedCode = codeInput.value.trim().toUpperCase();
        const countdownFinished = Date.now() >= birthday.getTime();
        const isTodayCode = submittedCode === todayCode;
        const isAfterCountdownCode = submittedCode === afterCountdownCode && countdownFinished;

        if (isTodayCode || isAfterCountdownCode) {
            codeStatus.textContent = 'Code accepted. Your surprise is ready.';
            codeStatus.className = 'code-status success';
            window.location.href = 'surprise.html';
            return;
        }

        codeStatus.textContent = submittedCode === afterCountdownCode
            ? 'That code will work when the countdown reaches zero.'
            : 'That code is not quite right. Try again.';
        codeStatus.className = 'code-status error';
        codeInput.select();
    });
}

if (bgMusic && musicToggle && playIcon && pauseIcon && musicPlayer) {
    // Set volume to 40%
    bgMusic.volume = 0.4;

    // Try to play automatically
    function initAudio() {
        bgMusic.play().then(() => {
            // Autoplay successful
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
            musicPlayer.classList.remove('paused');
        }).catch(error => {
            // Autoplay blocked - show play button
            console.log('Click anywhere to play music');
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
            musicPlayer.classList.add('paused');
        });
    }

    // Toggle play/pause when button is clicked
    musicToggle.addEventListener('click', function() {
        if (bgMusic.paused) {
            bgMusic.play();
            playIcon.style.display = 'none';
            pauseIcon.style.display = 'inline';
            musicPlayer.classList.remove('paused');
        } else {
            bgMusic.pause();
            playIcon.style.display = 'inline';
            pauseIcon.style.display = 'none';
            musicPlayer.classList.add('paused');
        }
    });

    // Try to play when user clicks anywhere (if autoplay blocked)
    document.addEventListener('click', function playOnClick() {
        if (bgMusic.paused) {
            bgMusic.play().then(() => {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'inline';
                musicPlayer.classList.remove('paused');
            }).catch(() => {});
        }
        document.removeEventListener('click', playOnClick);
    }, { once: true });

    // Initialize on page load
    window.addEventListener('load', initAudio);
}