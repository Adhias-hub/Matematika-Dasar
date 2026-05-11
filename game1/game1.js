const mulut = document.querySelector('.mulut-atas');
const displaySkor = document.getElementById('skor');
const daftarTipe = ['lancip', 'siku-siku', 'tumpul'];
let sudutSekarang = '';
let skor = 0;

function soalBaru() {
    let derajat;
    // Pilih tipe sudut secara acak
    const tipeAcak = daftarTipe[Math.floor(Math.random() * daftarTipe.length)];
    sudutSekarang = tipeAcak;

    if (tipeAcak === 'lancip') {
        // Random antara 15 sampai 65 derajat
        derajat = Math.floor(Math.random() * 50) + 15;
    } else if (tipeAcak === 'siku-siku') {
        // Mutlak 90 derajat
        derajat = 90;
    } else {
        // Tumpul: Random antara 115 sampai 160 derajat
        derajat = Math.floor(Math.random() * 45) + 115;
    }

    // Eksekusi mangap Boli pakai derajat acak
    mulut.style.transform = `rotate(-${derajat}deg)`;
}

function cekJawaban(jawabanUser) {
    if (jawabanUser === sudutSekarang) {
        skor += 10;
        displaySkor.innerText = skor;
        
        // Cek kalau skor sudah 100
        if (skor >= 100) {
            heboh();
        } else {
            mulut.style.filter = "brightness(1.3)";
            setTimeout(() => {
                mulut.style.filter = "brightness(1)";
                soalBaru();
            }, 600);
        }
    } else {
        alert("Waduh, hampir bener nak! Perhatiin lagi mulut Boli 🐊");
        soalBaru();
    }
}

function heboh() {
    // 1. Munculin teks selamat yang gede
    const overlay = document.createElement('div');
    overlay.className = 'overlay-heboh';
    overlay.innerHTML = `
        <div class="konten-menang">
            <h1>🏆 RAJA SUDUT! 🏆</h1>
            <p>Boli bangga banget sama kamu!</p>
            <div class="boli-joget">🐊🕺</div>
            <button onclick="location.reload()">Main Lagi 🔥</button>
        </div>
    `;
    document.body.appendChild(overlay);

    // 2. Mainin suara meriah (kalau ada bell.mp3 ganti suaranya di sini)
    const audio = new Audio('bell.mp3');
    audio.play();

    // 3. Efek guncang layar (earthquake effect)
    document.body.classList.add('guncang');
}

// Jalankan saat pertama kali buka
window.onload = soalBaru;