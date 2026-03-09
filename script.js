// Background Music Controller
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const musicPlayer = document.querySelector('.music-player');

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