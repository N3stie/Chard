// Background Music Controller
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const playIcon = document.querySelector('.play-icon');
const pauseIcon = document.querySelector('.pause-icon');
const musicPlayer = document.querySelector('.music-player');

// Birthday countdown
const birthday = new Date('2026-11-14T00:00:00');
const afterCountdownCode = '11-14-2026';
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

const countdownBot = document.getElementById('countdown-bot');
const botOpen = document.getElementById('bot-open');
const botClose = document.getElementById('bot-close');
const botAvatar = document.getElementById('bot-avatar');
const botQuestion = document.querySelector('.bot-question');
const botReply = document.getElementById('bot-reply');
const botOptionsContainer = document.getElementById('bot-options');
const botOptions = document.querySelectorAll('.bot-option');
const botCodeRequest = document.getElementById('bot-code-request');
const botPlease = document.getElementById('bot-please');
const botNevermind = document.getElementById('bot-nevermind');
const initialBotOptions = document.querySelectorAll('.bot-option[data-reply]');
const prankOptions = document.querySelectorAll('.bot-prank-option');
const openingQuestion = 'What are you doing here?';

const botStates = {
    listening: { image: 'images/listening.JPG', alt: 'You listening' },
    thinking: { image: 'images/thinking.JPG', alt: 'You thinking' },
    talking: { image: 'images/talking.JPG', alt: 'You talking' }
};

function setBotState(state) {
    const nextState = botStates[state];
    botAvatar.src = nextState.image;
    botAvatar.alt = nextState.alt;
    countdownBot.classList.toggle('is-talking', state === 'talking');
}

function resetBotConversation() {
    setBotState('listening');
    botQuestion.textContent = openingQuestion;
    botReply.classList.remove('is-visible');
    botCodeRequest.classList.remove('is-visible');
    botCodeRequest.disabled = false;
    prankOptions.forEach((option) => {
        option.classList.remove('is-visible');
        option.disabled = false;
    });
    botOptionsContainer.classList.add('is-ready');
    initialBotOptions.forEach((option) => {
        option.disabled = false;
    });
}

function updateBotVisibility() {
    const countdownFinished = Date.now() >= birthday.getTime();

    if (countdownFinished) {
        countdownBot?.classList.remove('is-visible');
        botOpen?.classList.remove('is-visible');
    } else if (!countdownBot?.classList.contains('has-been-closed')) {
        countdownBot?.classList.add('is-visible');
    }
}

updateBotVisibility();

window.setTimeout(() => {
    if (Date.now() < birthday.getTime()) {
        setBotState('talking');
        window.setTimeout(() => {
            setBotState('listening');
            botOptionsContainer?.classList.add('is-ready');
        }, 850);
    }
}, 500);

botClose?.addEventListener('click', () => {
    countdownBot.classList.remove('is-visible');
    countdownBot.classList.add('has-been-closed');
    botOpen.classList.add('is-visible');
});

botOpen?.addEventListener('click', () => {
    countdownBot.classList.add('is-visible');
    countdownBot.classList.remove('has-been-closed');
    botOpen.classList.remove('is-visible');
});

initialBotOptions.forEach((option) => {
    option.addEventListener('click', () => {
        const isHintRequest = option.dataset.reply === 'hint';
        botOptionsContainer.classList.remove('is-ready');
        botOptions.forEach((botOption) => {
            botOption.disabled = true;
        });
        botReply.classList.remove('is-visible');
        botQuestion.textContent = openingQuestion;
        setBotState('thinking');

        window.setTimeout(() => {
            setBotState('talking');
            window.setTimeout(() => {
                if (isHintRequest) {
                    botQuestion.textContent = 'Hmm... it will be a number and a letter, so give your best to solve it.';
                    botCodeRequest.classList.add('is-visible');
                    botOptionsContainer.classList.add('is-ready');
                    setBotState('listening');
                    botCodeRequest.disabled = false;
                    return;
                }

                botReply.textContent = 'Welcome, curious visitor. You picked a lovely time to stop by.';
                botReply.classList.add('is-visible');
            }, 450);
        }, 700);

        if (!isHintRequest) {
            window.setTimeout(resetBotConversation, 2800);
        }
    });
});

botCodeRequest.addEventListener('click', () => {
    botCodeRequest.disabled = true;
    botCodeRequest.classList.remove('is-visible');
    botOptionsContainer.classList.remove('is-ready');
    botQuestion.textContent = 'Can you please tell me the code?';
    setBotState('thinking');

    window.setTimeout(() => {
        setBotState('talking');
        window.setTimeout(() => {
            botReply.textContent = 'You already know just look and listen and learn XD XD';
            botReply.classList.add('is-visible');
            prankOptions.forEach((option) => {
                option.classList.add('is-visible');
                option.disabled = false;
            });
            botOptionsContainer.classList.add('is-ready');
            setBotState('listening');
        }, 450);
    }, 700);
});

botNevermind.addEventListener('click', resetBotConversation);

botPlease.addEventListener('click', () => {
    botPlease.disabled = true;
    botNevermind.disabled = true;
    botOptionsContainer.classList.remove('is-ready');
    botReply.textContent = 'okay, wait for 10secs... 10';
    botReply.classList.add('is-visible');
    setBotState('talking');

    let secondsLeft = 10;
    const countdownTimer = window.setInterval(() => {
        secondsLeft -= 1;

        if (secondsLeft > 0) {
            botReply.textContent = `okay, wait for 10secs... ${secondsLeft}`;
            return;
        }

        window.clearInterval(countdownTimer);
        botReply.textContent = 'its a prank!! bahala ka jan';
        setBotState('talking');
        window.setTimeout(resetBotConversation, 2800);
    }, 1000);
});

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

// Free-walk sprite and click-to-slash interaction.
const walker = document.getElementById('walker');

if (walker) {
    const movement = { up: false, down: false, left: false, right: false };
    const position = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const roamVelocity = { x: 1.2, y: 0.7 };
    const speed = 4;
    let lastFrame = performance.now();
    let nextDirectionChange = lastFrame + 2200;
    let slashTimer;

    function setMovement(key, isPressed) {
        if (key === 'ArrowUp' || key.toLowerCase() === 'w') movement.up = isPressed;
        if (key === 'ArrowDown' || key.toLowerCase() === 's') movement.down = isPressed;
        if (key === 'ArrowLeft' || key.toLowerCase() === 'a') movement.left = isPressed;
        if (key === 'ArrowRight' || key.toLowerCase() === 'd') movement.right = isPressed;
    }

    function keepInBounds() {
        const halfWidth = walker.offsetWidth / 2;
        const halfHeight = walker.offsetHeight / 2;
        position.x = Math.max(halfWidth, Math.min(window.innerWidth - halfWidth, position.x));
        position.y = Math.max(halfHeight, Math.min(window.innerHeight - halfHeight, position.y));
    }

    function moveWalker(now) {
        const elapsed = Math.min(32, now - lastFrame);
        lastFrame = now;
        const horizontal = Number(movement.right) - Number(movement.left);
        const vertical = Number(movement.down) - Number(movement.up);
        const isMoving = horizontal !== 0 || vertical !== 0;

        if (now >= nextDirectionChange) {
            const angle = Math.random() * Math.PI * 2;
            const roamSpeed = 0.9 + Math.random() * 1.2;
            roamVelocity.x = Math.cos(angle) * roamSpeed;
            roamVelocity.y = Math.sin(angle) * roamSpeed;
            nextDirectionChange = now + 1800 + Math.random() * 2600;
        }

        if (isMoving) {
            const length = Math.hypot(horizontal, vertical) || 1;
            roamVelocity.x = (horizontal / length) * speed;
            roamVelocity.y = (vertical / length) * speed;
        } else {
            position.x += roamVelocity.x * (elapsed / 16);
            position.y += roamVelocity.y * (elapsed / 16);

            const halfWidth = walker.offsetWidth / 2;
            const halfHeight = walker.offsetHeight / 2;
            if (position.x <= halfWidth || position.x >= window.innerWidth - halfWidth) {
                roamVelocity.x *= -1;
                position.x = Math.max(halfWidth, Math.min(window.innerWidth - halfWidth, position.x));
            }
            if (position.y <= halfHeight || position.y >= window.innerHeight - halfHeight) {
                roamVelocity.y *= -1;
                position.y = Math.max(halfHeight, Math.min(window.innerHeight - halfHeight, position.y));
            }
        }

        keepInBounds();
        walker.classList.add('is-walking');
        walker.classList.toggle('is-facing-right', roamVelocity.x > 0);

        walker.style.left = `${position.x}px`;
        walker.style.top = `${position.y}px`;
        window.requestAnimationFrame(moveWalker);
    }

    function slashAt(clientX, clientY) {
        const mark = document.createElement('span');
        mark.className = 'slash-mark';
        mark.style.left = `${clientX - 32}px`;
        mark.style.top = `${clientY - 32}px`;
        document.body.appendChild(mark);
        mark.addEventListener('animationend', () => mark.remove(), { once: true });
        walker.classList.remove('is-slashing');
        void walker.offsetWidth;
        walker.classList.add('is-slashing');
        window.clearTimeout(slashTimer);
        slashTimer = window.setTimeout(() => walker.classList.remove('is-slashing'), 320);
    }

    window.addEventListener('keydown', (event) => {
        setMovement(event.key, true);
        if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(event.key)) {
            event.preventDefault();
        }
    });

    window.addEventListener('keyup', (event) => setMovement(event.key, false));
    window.addEventListener('blur', () => Object.keys(movement).forEach((key) => { movement[key] = false; }));
    window.addEventListener('resize', keepInBounds);
    document.addEventListener('click', (event) => {
        if (!event.target.closest('button, a, input, video, .walker')) slashAt(event.clientX, event.clientY);
    });
    window.requestAnimationFrame(moveWalker);
}