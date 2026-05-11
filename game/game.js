function go(url, element) {
    const player = document.getElementById('player');
    
    // Hitung posisi target
    const rect = element.getBoundingClientRect();
    const stageRect = document.querySelector('.map-stage').getBoundingClientRect();
    
    const targetX = rect.left - stageRect.left + (rect.width / 2) - (player.offsetWidth / 2);
    const targetY = rect.top - stageRect.top;

    // Animasi Jalan
    player.style.left = targetX + "px";
    player.style.top = targetY + "px";
    player.innerHTML = "🏃‍♂️💨"; 

    // Pindah Halaman
    setTimeout(() => {
        document.body.style.opacity = "0";
        document.body.style.transition = "0.5s";
        setTimeout(() => {
            window.location.href = url;
        }, 500);
    }, 900);
}
