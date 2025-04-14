// Starfield Animation
const canvas = document.getElementById('starfield');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const stars = [];
for (let i = 0; i < 100; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2,
        opacity: Math.random()
    });
}

function animateStars() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
        star.opacity += (Math.random() - 0.5) * 0.05;
        if (star.opacity < 0) star.opacity = 0;
        if (star.opacity > 1) star.opacity = 1;
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// Sticky Navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Animations
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.anim');
    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.9) {
            el.classList.add('show');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Back to Top Button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTop.style.display = 'block';
    } else {
        backToTop.style.display = 'none';
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Easter Egg
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('glowing-text')) {
        const sparkle = document.createElement('div');
        sparkle.style.position = 'fixed';
        sparkle.style.left = `${e.clientX}px`;
        sparkle.style.top = `${e.clientY}px`;
        sparkle.style.width = '10px';
        sparkle.style.height = '10px';
        sparkle.style.background = '#ffb3e6';
        sparkle.style.borderRadius = '50%';
        sparkle.style.boxShadow = '0 0 10px #ffb3e6';
        sparkle.style.animation = 'sparkle 1s ease-out forwards';
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 1000);
    }
});

// Sparkle Animation
const style = document.createElement('style');
style.innerHTML = `
@keyframes sparkle {
    0% { transform: scale(1); opacity: 1; }
    100% { transform: scale(2); opacity: 0; }
}`;
document.head.appendChild(style);


// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
    body.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateToggleIcon(theme);
}

function updateToggleIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'light') {
        icon.classList.remove('bi-moon-stars-fill');
        icon.classList.add('bi-sun-fill');
    } else {
        icon.classList.remove('bi-sun-fill');
        icon.classList.add('bi-moon-stars-fill');
    }
}

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    setTheme(savedTheme);
});

// Toggle theme on button click
themeToggle.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme') || 'dark';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
});