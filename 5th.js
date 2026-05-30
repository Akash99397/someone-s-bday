// Function to play/pause video when tapped
function togglePlay(video) {
    if (video.paused) {
        // Optional: Pause all other videos before playing this one
        document.querySelectorAll('video').forEach(v => v.pause());
        video.play();
    } else {
        video.pause();
    }
}

// Kill background music data so it doesn't try to play over videos
localStorage.setItem('musicPlaying', 'false');
localStorage.removeItem('musicTime');



// Function to restart the website
function restartJourney() {
    window.location.href = "1st.html";
}


// Auto-pause video when it scrolls out of view
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const video = entry.target.querySelector('video');
        if (video && !entry.isIntersecting) {
            video.pause();
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.video-section').forEach(section => {
    observer.observe(section);
});