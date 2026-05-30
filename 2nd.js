const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicBtn');

// 1. Sync music state when the page loads
// 1. Sync music state safely when the page loads
window.addEventListener('DOMContentLoaded', () => {
    const isPlaying = localStorage.getItem('musicPlaying') === 'true';
    const savedTime = localStorage.getItem('musicTime');

    // Wait until the audio file has loaded enough metadata (like duration) before setting time
    bgMusic.addEventListener('loadedmetadata', () => {
        if (savedTime) {
            bgMusic.currentTime = parseFloat(savedTime);
        }
    });

    if (isPlaying) {
        bgMusic.play().then(() => {
            musicBtn.innerHTML = "⏸️";
        }).catch(() => {
            musicBtn.innerHTML = "🎵";
            
            // Hidden listener to unlock audio on first screen tap
            const unlockAudio = () => {
                if (localStorage.getItem('musicPlaying') === 'true') {
                    bgMusic.play().then(() => {
                        musicBtn.innerHTML = "⏸️";
                    });
                }
                document.removeEventListener('click', unlockAudio);
                document.removeEventListener('touchstart', unlockAudio);
            };
            document.addEventListener('click', unlockAudio);
            document.addEventListener('touchstart', unlockAudio);
        });
    }
});
// 2. Save the exact playback second continuously
bgMusic.addEventListener('timeupdate', () => {
    localStorage.setItem('musicTime', bgMusic.currentTime);
});

// 3. Handle manual Play/Pause clicking
function toggleMusic() {
    if (bgMusic.paused) {
        bgMusic.play();
        musicBtn.innerHTML = "⏸️";
        localStorage.setItem('musicPlaying', 'true');
    } else {
        bgMusic.pause();
        musicBtn.innerHTML = "🎵";
        localStorage.setItem('musicPlaying', 'false');
    }
}

// 4. Ensure state is saved right before switching pages
window.addEventListener('beforeunload', () => {
    localStorage.setItem('musicTime', bgMusic.currentTime);
}); 


function openEnvelope() {
    const wrapper = document.querySelector('.envelope-wrapper');
    const nextBtn = document.getElementById('next-btn');
    
    // Add the open class to trigger CSS animations
    wrapper.classList.add('open');
    
    // Show the next button after a short delay
    setTimeout(() => {
        nextBtn.classList.remove('next-btn-hidden');
        nextBtn.classList.add('next-btn-visible');
    }, 1000);

}

function goToNextPage() {
    window.location.href = "3rd.html";
}