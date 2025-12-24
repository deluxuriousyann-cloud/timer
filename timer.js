const timerDisplay = document.querySelector('.timerDisplay');
const timerInput = document.querySelector('.timerInput');
const alarmSound = document.getElementById('alarmSound');


let time = 0;
let timeToDisplay = '00:00:00';
let sign = null;
let timerInterval = null;
let minutes = /^[mM]$/;
let hours = /^[hH]$/;
let seconds = /^[sS]$/;
let number = /^[0-9]+$/;
let allowedTimeFormats = /^[0-9]+[mMhHsS]$/;


function updateDisplay() {
    timerDisplay.textContent = timeToDisplay;
    return;
}

function startCountdown() {
    timerInterval = setInterval(() => {
        if (time <= 0) {
            formatTime();
            updateDisplay();
            alarmSound.play();
            time--;
            timerDisplay.textContent = 'time is up nigga';
            clearInterval(timerInterval);
            return;
        }

        formatTime();
        updateDisplay();
        time--;
    }, 1000);
}


function checkSign() {
    if (sign === "m" || sign === "M") {
        time *= 60;
        formatTime();
        console.log(`${time}, converted to seconds`)
        return;
    }

    if (sign === "h" || sign === "H") {
        time *= 3600;
        formatTime();
        console.log(`${time}, converted to seconds`)
        return;
    }

    if (sign === "s" || sign === "S") {
        time;
        formatTime();
        console.log(`${time}, already to seconds`)
        return;
    }

    console.log(`failed to read ${time} in ${sign}`)
}

function formatTime() {
    const hours = String(Math.floor(time / 3600)). padStart(2, '0');
    const minutes = String(Math.floor((time % 3600) / 60)).padStart(2, '0');
    const seconds = String(time % 60).padStart(2, '0');
    timeToDisplay = `${hours}:${minutes}:${seconds}`;
    updateDisplay();
    return;
}

//

document.addEventListener('keydown', (e) => {
    const timeInputValue = timerInput.value.trim();

    if (e.key !== 'Enter') {
        console.log('Not Enter key');
        return;
    };
    if (timeInputValue.length < 1) {
        alert('Please enter a valid time format.');
        return;
    }
    if (!allowedTimeFormats.test(timeInputValue)) {
        alert('please input a valid time format, like 5m for 5 minutes, 10s for 10 seconds or 2h for 2 hours.');
        return;
    }
    if (timeInputValue.startsWith('0')) {
        alert('Please enter a valid time format without leading zeros.');
    }

    if (allowedTimeFormats.test(timeInputValue)) {
        time = parseInt(timeInputValue.slice(0, -1), 10);
        sign = timeInputValue.slice(-1);
        console.log(`time: ${time}`);
        console.log(`symbol: ${sign}`);
        checkSign();
        startCountdown();
        return;
    }

    console.log('Time input value:', timeInputValue);
});
