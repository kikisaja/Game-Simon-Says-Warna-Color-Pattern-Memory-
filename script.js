// --- DATA WARNA ---
const colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userClickedPattern = [];

let started = false;
let level = 0;
let score = 0;

// --- AMBIL ELEMEN DOM ---
const levelDisplay = document.getElementById("level-display");
const scoreDisplay = document.getElementById("score-display");
const instructionBox = document.getElementById("instruction-box");
const btnStart = document.getElementById("btn-start");
const simonButtons = document.querySelectorAll(".simon-btn");

// --- 1. MULAI PERMAINAN ---
btnStart.addEventListener("click", () => {
    if (!started) {
        level = 0;
        score = 0;
        gamePattern = [];
        started = true;
        btnStart.textContent = "🔄 ULANGI GAME";
        nextSequence();
    }
});

// --- 2. URUTAN POLA BERIKUTNYA ---
function nextSequence() {
    userClickedPattern = [];
    level++;
    score = (level - 1) * 10;
    
    levelDisplay.textContent = level;
    scoreDisplay.textContent = score;
    instructionBox.textContent = `Perhatikan urutan pola warna (${level})...`;

    // Pilih warna acak
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = colors[randomNumber];
    gamePattern.push(randomChosenColor);

    // Tampilkan urutan ke pemain dengan jeda waktu
    gamePattern.forEach((color, index) => {
        setTimeout(() => {
            activateButton(color);
        }, (index + 1) * 600);
    });
}

// --- 3. EFEK NYALA TOMBOL ---
function activateButton(color) {
    const btn = document.getElementById(`btn-${color}`);
    btn.classList.add("active");
    playTone(color);

    setTimeout(() => {
        btn.classList.remove("active");
    }, 300);
}

// --- 4. KLIK PEMAIN ---
simonButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        if (!started) return;

        const userChosenColor = e.target.getAttribute("data-color");
        userClickedPattern.push(userChosenColor);

        activateButton(userChosenColor);
        checkAnswer(userClickedPattern.length - 1);
    });
});

// --- 5. CEK KECOCOKAN JAWABAN ---
function checkAnswer(currentIndex) {
    if (gamePattern[currentIndex] === userClickedPattern[currentIndex]) {
        // Jika urutan benar dan sudah selesai satu ronde
        if (userClickedPattern.length === gamePattern.length) {
            instructionBox.textContent = "Bagus! Bersiap untuk level berikutnya...";
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    } else {
        // Jika salah
        instructionBox.textContent = "Game Over! Urutan salah. Tekan tombol untuk main lagi.";
        playGameOverSound();
        resetGame();
    }
}

// --- 6. RESET GAME ---
function resetGame() {
    started = false;
    btnStart.textContent = "🚀 MULAI GAME";
    document.body.style.backgroundColor = "#f87171"; // Merah tanda game over sesaat
    setTimeout(() => {
        document.body.style.backgroundColor = "var(--bg-main)";
    }, 400);
}

// --- 7. EFEK AUDIO BEEP SEDERHANA (Web Audio API) ---
function playTone(color) {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        let freq = 300;
        if (color === "green") freq = 261.63; // C4
        if (color === "red") freq = 329.63;   // E4
        if (color === "yellow") freq = 392.00;// G4
        if (color === "blue") freq = 523.25;  // C5

        osc.type = "sine";
        osc.frequency.value = freq;

        gain.gain.setValueAtTime(0.08, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.3);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.3);
    } catch (e) {
        // Abaikan jika tidak didukung browser
    }
}

function playGameOverSound() {
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(150, audioCtx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(80, audioCtx.currentTime + 0.5);

        gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.5);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + 0.5);
    } catch (e) {}
}
