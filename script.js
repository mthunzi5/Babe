const sections = {
    landing: document.getElementById("landing"),
    message: document.getElementById("message"),
    slideshow: document.getElementById("slideshow")
};

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const startShowBtn = document.getElementById("startShowBtn");
const shareBtn = document.getElementById("shareBtn");
const noPopup = document.getElementById("noPopup");
const closePopup = document.getElementById("closePopup");
const confettiContainer = document.getElementById("confettiContainer");

const envelopes = document.querySelectorAll(".envelope");
const noteReveal = document.getElementById("noteReveal");

const slideshowImage = document.getElementById("slideshowImage");
const loveSong = document.getElementById("loveSong");
const songSource = document.getElementById("songSource");

// Update this if you add a song later
const songPath = "Babe/Danya devs - Umuzi We Glass ft. Nomfundo Moh, Empro, Makhosi, Kinglee Beats (Visualiser) - UMUTHI.mp3"; // Example: "Babe/your-song.mp3"

const photos = [
    "Babe/20221122_160509.jpg",
    "Babe/20230423_160109.jpg",
    "Babe/20230818_150255.jpg",
    "Babe/20230818_151054.jpg",
    "Babe/20240609_154446.jpg",
    "Babe/20240609_154451.jpg",
    "Babe/20240809_191245.jpg",
    "Babe/20241027_152732.jpg",
    "Babe/20241119_152859.jpg",
    "Babe/firstpic.jpg",
    "Babe/Firts_date.jpg",
    "Babe/funny_her.jpg",
    "Babe/happym_moments.jpg",
    "Babe/IMG-20221106-WA0031.jpg",
    "Babe/IMG-20230623-WA0004.jpg",
    "Babe/IMG-20230623-WA0007.jpg",
    "Babe/IMG-20230706-WA0015.jpg",
    "Babe/IMG-20231105-WA0006.jpg",
    "Babe/IMG-20231105-WA0011.jpg",
    "Babe/IMG-20240331-WA0017.jpg",
    "Babe/IMG-20260128-WA0089.jpg",
    "Babe/momontts_to_remember.jpg",
    "Babe/Screenshot_20240831_173607_WhatsApp.jpg",
    "Babe/Screenshot_20241013_231136_WhatsApp.jpg"
];

let slideIndex = 0;
let slideTimer = null;

function showSection(sectionKey) {
    Object.values(sections).forEach(section => section.classList.remove("active"));
    sections[sectionKey].classList.add("active");
}

function showNoPopup() {
    noPopup.classList.remove("hidden");
}

function hideNoPopup() {
    noPopup.classList.add("hidden");
}

function triggerConfetti(count = 60) {
    const colors = ["#ff3b6a", "#ff8db0", "#ffd3e1", "#ffb3c7", "#ff9a9e"];
    for (let i = 0; i < count; i++) {
        const confetti = document.createElement("div");
        confetti.className = "confetti";
        confetti.style.left = Math.random() * 100 + "%";
        confetti.style.background = colors[i % colors.length];
        confetti.style.animationDuration = (Math.random() * 0.6 + 0.8) + "s";
        confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
        confettiContainer.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, 1400);
    }
}

function vibrate() {
    if (navigator.vibrate) {
        navigator.vibrate([80, 40, 80]);
    }
}

function startSlideshow() {
    if (photos.length === 0) return;

    slideshowImage.src = photos[0];
    slideIndex = 0;

    if (slideTimer) {
        clearInterval(slideTimer);
    }

    slideTimer = setInterval(() => {
        slideIndex = (slideIndex + 1) % photos.length;
        slideshowImage.src = photos[slideIndex];
    }, 700); // fast slideshow
}

function loadSong() {
    if (!songPath) return;
    songSource.src = songPath;
    loveSong.autoplay = true;
    loveSong.loop = true;
    loveSong.load();
    loveSong.play().catch(() => {
        // Autoplay may be blocked by browser
    });
}

function handleShare() {
    const shareData = {
        title: "Will You Be My Valentine?",
        text: "A little love surprise for you.",
        url: window.location.href
    };

    if (navigator.share) {
        navigator.share(shareData).catch(() => {
            // User canceled or share failed
        });
        return;
    }

    if (navigator.clipboard) {
        navigator.clipboard.writeText(shareData.url).then(() => {
            noteReveal.textContent = "Link copied! Send it to her.";
        });
        return;
    }

    window.prompt("Copy this link:", shareData.url);
}

// Event listeners
noBtn.addEventListener("click", showNoPopup);
closePopup.addEventListener("click", hideNoPopup);

yesBtn.addEventListener("click", () => {
    showSection("message");
    triggerConfetti(80);
    vibrate();
});

envelopes.forEach(envelope => {
    envelope.addEventListener("click", () => {
        noteReveal.textContent = envelope.dataset.note || "You are amazing.";
        triggerConfetti(30);
        vibrate();
    });
});

startShowBtn.addEventListener("click", () => {
    showSection("slideshow");
    startSlideshow();
    loadSong();
});

shareBtn.addEventListener("click", handleShare);

window.addEventListener("DOMContentLoaded", () => {
    loadSong();
});
