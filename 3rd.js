window.addEventListener('DOMContentLoaded', () => {
    const savedTime = localStorage.getItem('musicTime');

    bgMusic.addEventListener('loadedmetadata', () => {
        if (savedTime) {
            bgMusic.currentTime = parseFloat(savedTime);
        }
    });

    // FORCE PAUSE so the mic doesn't catch the audio
    bgMusic.pause();
    musicBtn.innerHTML = "🎵";
    // We don't change 'musicPlaying' in localStorage yet, so page 4 knows it's supposed to be on later
});


let candlesOut = false;

// Request microphone access
if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio: true })
    .then(function(stream) {
        const audioContext = new AudioContext();
        const analyser = audioContext.createAnalyser();
        const microphone = audioContext.createMediaStreamSource(stream);
        const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

        analyser.smoothingTimeConstant = 0.8;
        analyser.fftSize = 1024;

        microphone.connect(analyser);
        analyser.connect(scriptProcessor);
        scriptProcessor.connect(audioContext.destination);

        scriptProcessor.onaudioprocess = function() {
            const array = new Uint8Array(analyser.frequencyBinCount);
            analyser.getByteFrequencyData(array);
            let values = 0;

            for (let i = 0; i < array.length; i++) {
                values += array[i];
            }

            let average = values / array.length;

            // Sensitivity threshold - adjust '40' if it's too hard/easy
            if (average > 40 && !candlesOut) {
                blowOut();
            }
        };
    })
    .catch(function(err) {
        console.warn("Microphone access denied. User can click the cake instead.");
        // Fallback: allow clicking the cake to blow candles
        document.querySelector('.cake').onclick = blowOut;
    });
}

function blowOut() {
    candlesOut = true;
    const flames = document.querySelectorAll('.flame');
    flames.forEach(f => f.classList.add('out'));
    
    document.getElementById('instruction').innerText = "Make a wish! Happy Birthday!";
    
    const bgMusic = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicBtn');
    
    // Force the music to start playing immediately
    bgMusic.play().then(() => {
        musicBtn.innerHTML = "⏸️";
        localStorage.setItem('musicPlaying', 'true'); // Save state for Page 4
    }).catch(err => {
        console.log("Browser blocked immediate audio play:", err);
    });
    // Trigger Confetti
    confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#f06292', '#ad1457', '#f8bbd0', '#ffffff']
    });

    // Show Next Button
    setTimeout(() => {
        const btn = document.getElementById('next-btn-3');
        btn.classList.remove('next-btn-hidden');
    }, 1000);
}


// 1. Sync music state when the page loads


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


function goToNextPage() {
    window.location.href = "4th.html";
}