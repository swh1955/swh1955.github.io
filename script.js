let currentSlide = 0;
const slides = document.querySelectorAll('.slide');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

// Initiale Anzeige der ersten Folie
showSlide(currentSlide);

// Funktion zum Anzeigen der Folie
function showSlide(index) {
    // Alle Folien ausblenden
    slides.forEach((slide) => {
        slide.style.display = 'none';
    });

    // Die aktuelle Folie anzeigen
    slides[index].style.display = 'block';

    // Alle Audios stoppen
    document.querySelectorAll('audio').forEach(audio => {
        audio.pause();
        audio.currentTime = 0;
    });

    // "Zurück"-Button deaktivieren, wenn es der erste Slide ist
    if (index === 0) {
        prevBtn.style.display = 'none';
    } else {
        prevBtn.style.display = 'block';
    }

    // "Vorwärts"-Button deaktivieren, wenn es der letzte Slide ist
    if (index === slides.length - 1) {
        nextBtn.style.display = 'none';
    } else {
        nextBtn.style.display = 'block';
    }
}

// Vorwärts bewegen
nextBtn.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
});

// Rückwärts bewegen
prevBtn.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
});

// Swipe-Gesten hinzufügen (für mobile Geräte)
let startX = 0;

document.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

document.addEventListener('touchend', (e) => {
    let endX = e.changedTouches[0].clientX;

    if (startX - endX > 50) {
        // Wischen nach links (nächstes Bild)
        nextBtn.click();
    } else if (endX - startX > 50) {
        // Wischen nach rechts (vorheriges Bild)
        prevBtn.click();
    }
});
