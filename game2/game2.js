// --- BAGIAN ATAS (DEKLARASI) ---
const itemsData = [
    { name: "Donat", emoji: "🍩", shape: "lingkaran" },
    { name: "Koin", emoji: "🪙", shape: "lingkaran" },
    { name: "Bola", emoji: "⚽", shape: "lingkaran" },
    { name: "Jam", emoji: "🕒", shape: "lingkaran" },
    { name: "Roti", emoji: "🍞", shape: "persegi" },
    { name: "Jendela", emoji: "🪟", shape: "persegi" },
    { name: "Bingkai", emoji: "🖼️", shape: "persegi" },
    { name: "Ubin", emoji: "⬛", shape: "persegi" },
    { name: "Tenda", emoji: "⛺", shape: "segitiga" },
    { name: "Onigiri", emoji: "🍙", shape: "segitiga" },
    { name: "Gunung", emoji: "⛰️", shape: "segitiga" },
    { name: "Penggaris", emoji: "📐", shape: "segitiga" },
    { name: "HP", emoji: "📱", shape: "persegi-panjang" },
    { name: "Amplop", emoji: "✉️", shape: "persegi-panjang" },
    { name: "Cokelat", emoji: "🍫", shape: "persegi-panjang" },
    { name: "Uang", emoji: "💵", shape: "persegi-panjang" }
];

let score = 0;
let lives = 3;
let currentLevel = 1;
let isHebohActive = false; // <-- WAJIB ADA INI BIAR GAK ERROR

const spawner = document.getElementById('item-spawner');
const scoreDisplay = document.getElementById('score');
const celebration = document.getElementById('celebration');

// --- FUNGSI CORE ---

function spawnItem() {
    spawner.innerHTML = '';
    let randomData;
    
    if (currentLevel >= 3 && Math.random() > 0.7) {
        randomData = { name: "Api", emoji: "🔥", shape: "none" };
    } else {
        randomData = itemsData[Math.floor(Math.random() * itemsData.length)];
    }
    
    const itemEl = document.createElement('div');
    itemEl.className = 'item';
    itemEl.draggable = true;
    itemEl.innerText = randomData.emoji;
    itemEl.dataset.shape = randomData.shape;

    itemEl.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', randomData.shape);
    });

    spawner.appendChild(itemEl);
}

function checkLevelUp() {
    console.log("Skor:", score);

    if (score === 50 && currentLevel < 2) {
        currentLevel = 2;
        alert("Level 2: Posisi Kotak Berubah!");
        shuffleZones();
    } 
    else if (score === 100 && currentLevel < 3) {
        currentLevel = 3;
        alert("Level 3: AWAS API! ⚡");
    } 

    // TRIGGER HEBOH
    if (score >= 200 && !isHebohActive) { 
        isHebohActive = true; 
        showHeboh(); 
    }
}

function showHeboh() {
    if (celebration) {
        celebration.classList.remove('hidden');
        document.body.classList.add('party-mode'); // Efek kedap-kedip
    }
}

function closeCeleb() {
    celebration.classList.add('hidden');
    document.body.classList.remove('party-mode');
    resetGame();
}

function resetGame() {
    score = 0;
    lives = 3;
    currentLevel = 1;
    isHebohActive = false; // Reset flag hebohnya juga
    scoreDisplay.innerText = score;
    shuffleZones(); 
    spawnItem();
}

// --- LOGIKA DRAG & DROP ---

document.querySelectorAll('.drop-zone').forEach(zone => {
    zone.addEventListener('dragover', e => e.preventDefault());
    zone.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedShape = e.dataTransfer.getData('text/plain');
        const zoneShape = zone.dataset.shape;

        if (draggedShape === zoneShape) {
            score += 10;
            scoreDisplay.innerText = score;
            checkLevelUp();
            spawnItem();
        } else {
            document.body.classList.add('shake');
            setTimeout(() => document.body.classList.remove('shake'), 500);
            lives--;
            if (lives <= 0) {
                alert("Game Over! Skor Akhir: " + score);
                resetGame();
            } else {
                alert("Salah! Nyawa sisa: " + lives);
                spawnItem();
            }
        }
    });
});

// Logika Tempat Sampah
const trashBin = document.getElementById('trash-bin');
if (trashBin) {
    trashBin.addEventListener('dragover', e => e.preventDefault());
    trashBin.addEventListener('drop', (e) => {
        e.preventDefault();
        const draggedShape = e.dataTransfer.getData('text/plain');
        if (draggedShape === "none") {
            score += 5;
            scoreDisplay.innerText = score;
            checkLevelUp();
            spawnItem();
        } else {
            alert("Jangan dibuang!");
        }
    });
}

function shuffleZones() {
    const zones = Array.from(document.querySelectorAll('.drop-zone'));
    const positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
    positions.sort(() => Math.random() - 0.5);
    zones.forEach((zone, i) => {
        zone.className = `drop-zone ${positions[i]}`;
    });
}

spawnItem();

// --- LOGIKA TOUCH UNTUK LAYAR SENTUH (VERSI FIX) ---

// --- LOGIKA TOUCH SCREEN (SATU SAJA, SUDAH BERSIH) ---

let itemAktif = null;
let sentuhanX = 0;
let sentuhanY = 0;

spawner.addEventListener('touchstart', function(e) {
    itemAktif = document.getElementById('item-spawner');
    if (!itemAktif) return;

    const lokasi = e.touches[0];
    const rect = itemAktif.getBoundingClientRect();

    // GUNAKAN PAGE X/Y UNTUK KALKULASI JARAK JARI KE BENDA
    // Ini lebih akurat buat nangkep posisi jempol relatif terhadap benda
    sentuhanX = lokasi.clientX - rect.left;
    sentuhanY = lokasi.clientY - rect.top;

    // AMBIL POSISI SAAT INI (RELATIF TERHADAP VIEWPORT)
    const currentLeft = rect.left;
    const currentTop = rect.top;

    // LOCK STYLE (PENTING: Reset margin biar gak geser ke kanan atas)
    itemAktif.style.margin = "0"; 
    itemAktif.style.width = rect.width + 'px';
    itemAktif.style.height = rect.height + 'px';
    itemAktif.style.position = 'fixed';
    
    // TEMPEL DI POSISI YANG SAMA PERSIS SAAT DISENTUH
    itemAktif.style.left = currentLeft + 'px';
    itemAktif.style.top = currentTop + 'px';
    
    itemAktif.style.zIndex = '10000';
    itemAktif.style.pointerEvents = 'none'; 
    itemAktif.style.animation = 'none';
    itemAktif.style.transition = 'none';
}, { passive: false });

// 2. Saat jari menggeser (MOVE)
document.addEventListener('touchmove', function(e) {
    if (!itemAktif) return;
    e.preventDefault(); 

    const lokasi = e.touches[0];
    
    itemAktif.style.left = (lokasi.clientX - sentuhanX) + 'px';
    itemAktif.style.top = (lokasi.clientY - sentuhanY) + 'px';
}, { passive: false });

// 3. Saat jari dilepas (END)
document.addEventListener('touchend', function(e) {
    if (!itemAktif) return;

    const lokasi = e.changedTouches[0];
    
    // Cari elemen drop-zone di bawah lokasi jari
    const elemenBawah = document.elementFromPoint(lokasi.clientX, lokasi.clientY);
    const zona = elemenBawah ? elemenBawah.closest('.drop-zone, #trash-bin') : null;

    // AMBIL DATA SHAPE DARI ANAKNYA (si emoji .item)
    const emojiKonten = itemAktif.querySelector('.item');
    const bentukItem = emojiKonten ? emojiKonten.dataset.shape : "none";

    if (zona) {
        if (zona.id === 'trash-bin') {
            if (bentukItem === "none") {
                score += 5;
                updateGameStatus();
            } else {
                alert("Jangan dibuang!");
                kurangiNyawa();
            }
        } else {
            const zonaShape = zona.dataset.shape;
            if (bentukItem === zonaShape) {
                score += 10;
                updateGameStatus();
            } else {
                alert("Bentuk tidak cocok!");
                kurangiNyawa();
            }
        }
    }

    // Kembalikan Spawner ke posisi tengah atau reset lewat spawnItem()
    itemAktif.style.position = ''; // Balikin ke absolute di CSS
    itemAktif.style.left = '';     // Reset style inline
    itemAktif.style.top = '';
    itemAktif.style.pointerEvents = 'auto';
    
    itemAktif = null;
    spawnItem(); // Ini otomatis bakal bikin emoji baru dan reset spawner kalau kodingan spawnItem-nya bener
}, { passive: false });

// --- FUNGSI PEMBANTU (PASTIKAN SUDAH ADA) ---

function updateGameStatus() {
    scoreDisplay.innerText = score;
    checkLevelUp();
}

function kurangiNyawa() {
    lives--;
    document.body.classList.add('shake');
    setTimeout(() => document.body.classList.remove('shake'), 500);
    
    if (lives <= 0) {
        alert("Game Over! Skor: " + score);
        resetGame();
    }
}
