let target = Math.floor(Math.random() * 14) + 1;
let currentCount = 0;
let score = 0;

const targetEl = document.getElementById('target-number');
const scoreEl = document.getElementById('score');
const area = document.getElementById('turus-area');
const celeb = document.getElementById('celebration');

targetEl.innerText = target;

// Tambah Lidi
document.getElementById('btn-add').addEventListener('click', () => {
    currentCount++;
    const lidi = document.createElement('div');
    lidi.className = 'lidi';
    if (currentCount % 5 === 0) lidi.classList.add('miring');
    area.appendChild(lidi);
});

// Reset
document.getElementById('btn-clear').addEventListener('click', () => {
    currentCount = 0;
    area.innerHTML = '';
});

// Cek
document.getElementById('btn-submit').addEventListener('click', () => {
    if (currentCount === target) {
        score += 10;
        scoreEl.innerText = score;
        if (score >= 100) {
            celeb.classList.remove('hidden');
        } else {
            alert("Bener Nak! Lanjut! 🔥");
            newRound();
        }
    } else {
        alert(`Salah! Tadi kamu bikin ${currentCount}, harusnya ${target}. Skor Reset ya!`);
        score = 0;
        scoreEl.innerText = score;
        newRound();
    }
});

function newRound() {
    currentCount = 0;
    area.innerHTML = '';
    target = Math.floor(Math.random() * 14) + 1;
    targetEl.innerText = target;
}

function closeCeleb() {
    celeb.classList.add('hidden');
    score = 0;
    scoreEl.innerText = score;
    newRound();
}
