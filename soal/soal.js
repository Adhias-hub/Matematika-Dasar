// 1. DATABASE SOAL ANALISIS (GAMBAR + TABEL/ABC)
const dataSemuaSoal = [
    {
        tipe: "tabel",
        url: "img/Turus Buah.webp",
        instruksi: "Hitunglah jumlah buah pada gambar dan isi tabel!",
        items: [
            { nama: "Durian", benar: 5 },
            { nama: "Anggur", benar: 9 },
            { nama: "Manggis", benar: 6 },
            { nama: "Buah Naga", benar: 8 },
            { nama: "Pir", benar: 7 }
        ]
    },
    {
        tipe: "tabel",
        url: "img/Turus.webp",
        instruksi: "Tuliskan angka berdasarkan jumlah alat musik!",
        items: [
            { nama: "Bonang", benar: 4 },
            { nama: "Rebab", benar: 3 },
            { nama: "Gong", benar: 3 },
            { nama: "Saron", benar: 5 },
            { nama: "Kendang", benar: 3 },
            { nama: "Siter", benar: 2 }
        ]
    },
    {
        tipe: "tabel",
        url: "img/Tabel Hewan.webp", // Gambar Kelinci, Harimau, Sapi, dll
        instruksi: "Hitunglah jumlah hewan pada gambar!",
        items: [
            { nama: "Kelinci", benar: 3 },
            { nama: "Harimau", benar: 4 },
            { nama: "Tupai", benar: 3 },
            { nama: "Sapi", benar: 6 }
        ]
    },
    {
        tipe: "abc",
        url: "img/Bangun Datar.webp",
        instruksi: "Pilih jawaban yang paling benar!",
        tanya: "Bangun yang memiliki 5 sisi dan 5 sudut adalah...",
        opsi: ["a. Persegi", "b. Segi Lima", "c. Segi Enam"],
        kunci: 1
    },
    {
        tipe: "abc",
        url: "img/Penggaris.webp",
        instruksi: "Lihat penggaris dengan teliti!",
        tanya: "Berapakah panjang CD pada gambar?",
        opsi: ["a. 11 cm", "b. 12 cm", "c. 13 cm"],
        kunci: 1
    },
    {
        tipe: "abc",
        url: "img/Segitiga.webp",
        instruksi: "Perhatikan ruas garisnya!",
        tanya: "Bangun datar segitiga tersebut memiliki ... sisi.",
        opsi: ["a. 3", "b. 4", "c. 5"],
        kunci: 0
    },
    {
        tipe: "abc",
        url: "img/Orang.webp", // Gambar tabel tinggi badan Afif, Dita, dll
        instruksi: "Analisis tabel tinggi badan berikut!",
        tanya: "Siswa yang memiliki tinggi badan paling tinggi yaitu ....",
        opsi: ["A. Afif", "B. Dita", "C. Gita", "D. Aira"],
        kunci: 2 // Gita (130cm)
    }
];

// 2. DATABASE KUIS CEPAT (HANYA TEKS)
const daftarSoalTeks = [
    {
        tanya: "Data Nilai: 85, 85, 75, 90, 80, 95. Berapa banyak siswa yang mendapat nilai 90?",
        pilihan: ["1 orang", "2 orang", "5 orang", "7 orang"],
        jawaban: "1 orang"
    },
    {
        tanya: "Apa yang dimaksud dengan tabel?",
        pilihan: ["Gambar seni", "Cerita pendek", "Daftar nama", "Data dalam kolom & baris"],
        jawaban: "Data dalam kolom & baris"
    },
    {
        tanya: "Data Buah: Apel 4, Pisang 6, Jeruk 3. Berapa jumlah Pisang pada data tersebut?",
        pilihan: ["3 buah", "4 buah", "6 buah", "9 buah"],
        jawaban: "6 buah"
    },
    {
        tanya: "Tabel berisi data yang disusun dalam bentuk...",
        pilihan: ["Cerita dan gambar", "Warna dan suara", "Baris dan kolom", "Angka dan gambar"],
        jawaban: "Baris dan kolom"
    },
    {
        tanya: "Data Pengunjung: Senin 30, Selasa 25, Rabu 35, Kamis 20. Urutan dari yang paling SEPI ke RAMAI adalah...",
        pilihan: ["Senin, Selasa, Rabu, Kamis", "Kamis, Selasa, Senin, Rabu", "Rabu, Senin, Selasa, Kamis", "Kamis, Rabu, Selasa, Senin"],
        jawaban: "Kamis, Selasa, Senin, Rabu"
    },
    {
        tanya: "Data Sayur: Bayam 4, Brokoli 7, Jagung 3, Selada 9, Kangkung 6. Berapa siswa yang suka Kangkung?",
        pilihan: ["3 siswa", "4 siswa", "6 siswa", "9 siswa"],
        jawaban: "6 siswa"
    },
    {
        tanya: "Apa guna Turus dalam pengolahan data?",
        pilihan: ["Memperbagus tabel", "Memudahkan menghitung jumlah", "Memberi warna", "Menghapus data"],
        jawaban: "Memudahkan menghitung jumlah"
    },
    {
        tanya: "Simbol garis lurus (||||) dalam turus melambangkan angka...",
        pilihan: ["2", "3", "4", "5"],
        jawaban: "4"
    },
    {
        tanya: "Data nilai terkecil dari: 75, 80, 65, 90, 85 adalah...",
        pilihan: ["65", "75", "80", "90"],
        jawaban: "65"
    },
    {
        tanya: "Siswa yang memiliki tinggi badan paling pendek dari data: Afif (120cm), Dita (115cm), Gita (130cm) adalah...",
        pilihan: ["Afif", "Dita", "Gita", "Semua sama"],
        jawaban: "Dita"
    }
];

// 3. VARIABEL STATE
let totalSkor = 0;
let indexGambar = 0;
let indexTeks = 0;

// 4. FUNGSI NAVIGASI TAB
function switchTab(tabId) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event) event.currentTarget.classList.add('active');

    document.querySelectorAll('.tab-content').forEach(content => content.classList.add('hidden'));
    document.getElementById(tabId).classList.remove('hidden');

    if (tabId === 'mode-gambar') muatSoalGambar();
    else renderTeks();
}

// 5. LOGIKA MODE GAMBAR
function muatSoalGambar() {
    const soal = dataSemuaSoal[indexGambar];
    document.getElementById('gambar-materi').src = soal.url;
    document.getElementById('instruksi-gambar').innerText = soal.instruksi;
    
    // Update Header
    document.getElementById('skor-display').innerText = totalSkor;
    document.getElementById('soal-ke').innerText = indexGambar + 1;

    const isiTabel = document.getElementById('isi-tabel-kuis');
    const btnCek = document.getElementById('btn-cek-tabel');
    isiTabel.innerHTML = "";
    btnCek.style.display = "none";
    
    const btnLanjutLama = document.getElementById('btn-lanjut');
    if (btnLanjutLama) btnLanjutLama.remove();

    if (soal.tipe === "tabel") {
        btnCek.style.display = "block";
        soal.items.forEach((item, i) => {
            isiTabel.innerHTML += `<tr><td>${item.nama}</td><td><input type="number" id="input-item-${i}" class="input-tabel"></td></tr>`;
        });
    } else {
        let htmlABC = `<div class="card-soal"><h3>${soal.tanya}</h3><div class="grid-opsi">`;
        soal.opsi.forEach((o, i) => {
            htmlABC += `<button class="btn-abc" data-label="${['A','B','C'][i]}" onclick="cekABC(${i})">${o}</button>`;
        });
        isiTabel.innerHTML = `<tr><td colspan="2" style="border:none; padding:0;">${htmlABC + "</div></div>"}</td></tr>`;
    }
}

function cekJawabanTabel() {
    const soal = dataSemuaSoal[indexGambar];
    let betul = true;
    soal.items.forEach((item, i) => {
        if (parseInt(document.getElementById(`input-item-${i}`).value) !== item.benar) betul = false;
    });

    if (betul) {
        totalSkor += 20;
        alert("🐊 MANTAP! Skor: " + totalSkor);
        munculkanTombolLanjut();
    } else alert("🧐 Coba hitung lagi!");
}

function cekABC(pilihan) {
    if (pilihan === dataSemuaSoal[indexGambar].kunci) {
        totalSkor += 20;
        alert("✅ BENAR! Skor: " + totalSkor);
        munculkanTombolLanjut();
    } else alert("❌ SALAH!");
}

function munculkanTombolLanjut() {
    document.getElementById('btn-cek-tabel').style.display = "none";
    document.getElementById('skor-display').innerText = totalSkor;
    if (indexGambar < dataSemuaSoal.length - 1) {
        const btn = document.createElement('button');
        btn.id = "btn-lanjut";
        btn.innerText = "Lanjut Soal Berikutnya ➡️";
        btn.className = "btn-cek-tabel"; // Pakai gaya tombol cek lo
        btn.style = "background: #2196F3; color: white; width: 100%; border: none; padding: 15px; border-radius: 10px; cursor: pointer; font-weight: bold; margin-top: 10px;";
        btn.onclick = () => { indexGambar++; muatSoalGambar(); };
        document.querySelector('.tabel-jawaban-container').appendChild(btn);
    } else alert("🎉 SELESAI SEMUA!");
}

// 6. LOGIKA MODE TEKS (ABC SAJA)
function renderTeks() {
    const data = daftarSoalTeks[indexTeks];
    const container = document.getElementById('display-kuis');
    container.innerHTML = `
        <div class="card-soal">
            <h3>${data.tanya}</h3>
            <div class="grid-opsi">
                ${data.pilihan.map((o, i) => `<button class="btn-abc" data-label="${['A','B','C','D'][i]}" onclick="cekJawabanTeks('${o}')">${o}</button>`).join('')}
            </div>
        </div>
    `;
}

function cekJawabanTeks(user) {
    if (user === daftarSoalTeks[indexTeks].jawaban) {
        totalSkor += 10;
        alert("PINTER! +10");
    } else alert("SALAH! 🐊");
    
    indexTeks++;
    if (indexTeks < daftarSoalTeks.length) renderTeks();
    else alert("Selesai! Skor: " + totalSkor);
    document.getElementById('skor-display').innerText = totalSkor;
}

window.onload = muatSoalGambar;
