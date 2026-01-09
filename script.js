// ============================================
// CUSTOM CURSOR
// ============================================

const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Smooth cursor animation
function animateCursor() {
    // Cursor follows mouse immediately
    cursorX += (mouseX - cursorX) * 0.9;
    cursorY += (mouseY - cursorY) * 0.9;

    // Follower has delay
    followerX += (mouseX - followerX) * 0.15;
    followerY += (mouseY - followerY) * 0.15;

    cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Cursor effects on hover
const hoverElements = document.querySelectorAll('a, button, .service-card, .project-card, .social-link, .stat-card, .collab-card');

hoverElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.5)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1.5)`;
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
        cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px) scale(1)`;
    });
});

// ============================================
// TYPING ANIMATION
// ============================================

const typingText = document.getElementById('typingText');
const phrases = [
    "Hi 👋 I'm Muhammad Idrees",
    "Freelancer & Digital Consultant",
    "Full Stack Developer",
    "Let's Build Something Amazing!"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeText() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingText.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typingText.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Pause at end
        typingSpeed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 500;
    }

    setTimeout(typeText, typingSpeed);
}

// Start typing animation
typeText();

// ============================================
// SCROLL ANIMATIONS
// ============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
});

// ============================================
// SMOOTH SCROLL FOR ANCHORS
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// PARALLAX EFFECT FOR IMAGES
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.image-float-wrapper, .hero-banner');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// ============================================
// PREVENT IMAGE DRAGGING AND CONTEXT MENU
// ============================================

const images = document.querySelectorAll('img');
images.forEach(img => {
    // Prevent drag
    img.addEventListener('dragstart', (e) => {
        e.preventDefault();
    });

    // Prevent right-click context menu on images
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });

    // Make images non-clickable
    img.style.pointerEvents = 'none';
    img.style.userSelect = 'none';
});

// ============================================
// INTERACTIVE STATS COUNTER
// ============================================

function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value.toLocaleString();
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ============================================
// CARD TILT EFFECT
// ============================================

const cards = document.querySelectorAll('.service-card, .project-card, .collab-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0) scale(1)';
    });
});

// ============================================
// TECH BADGE WAVE ANIMATION
// ============================================

const techBadges = document.querySelectorAll('.tech-badge');

techBadges.forEach((badge, index) => {
    badge.style.animationDelay = `${index * 0.05}s`;
});

// ============================================
// INTERSECTION OBSERVER FOR STATS
// ============================================

const statCards = document.querySelectorAll('.stat-card');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => {
    statsObserver.observe(card);
});

// ============================================
// DYNAMIC GRADIENT ANIMATION
// ============================================

let gradientAngle = 0;

function animateGradient() {
    gradientAngle += 0.5;
    const root = document.documentElement;

    // You can uncomment this to create rotating gradients
    // root.style.setProperty('--primary-gradient', 
    //     `linear-gradient(${gradientAngle}deg, #667eea 0%, #764ba2 100%)`);

    requestAnimationFrame(animateGradient);
}

// animateGradient(); // Uncomment to enable

// ============================================
// LOADING ANIMATION
// ============================================

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// ============================================
// ACTIVE SECTION HIGHLIGHT (Optional)
// ============================================

window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // You can add active state logic here if needed
        }
    });
});

// ============================================
// PERFORMANCE OPTIMIZATIONS
// ============================================

// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Use debounced scroll handler for performance
const debouncedScroll = debounce(() => {
    // Add any expensive scroll operations here
}, 10);

window.addEventListener('scroll', debouncedScroll);

// ============================================
// MOBILE DETECTION
// ============================================

function isMobile() {
    return window.innerWidth <= 768;
}

// Disable certain animations on mobile for performance
if (isMobile()) {
    // Disable parallax on mobile
    window.removeEventListener('scroll', parallaxEffect);

    // Simpler animations for mobile
    cards.forEach(card => {
        card.removeEventListener('mousemove', cardTiltEffect);
    });
}

// ============================================
// ACCESSIBILITY: Keyboard Navigation
// ============================================

document.addEventListener('keydown', (e) => {
    // Add keyboard shortcuts if needed
    if (e.key === 'Escape') {
        // Close modals or reset states
    }
});

// ============================================
// EASTER EGG: Konami Code
// ============================================

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            // Easter egg activated!
            document.body.style.animation = 'rainbow 2s infinite';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 5000);
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c👋 Hello, Developer!', 'font-size: 20px; font-weight: bold; color: #00D9FF;');
console.log('%cLooking for opportunities? Let\'s connect!', 'font-size: 14px; color: #667eea;');
console.log('%c📧 contact@expertsgrow.com', 'font-size: 14px; color: #f5576c;');

// ============================================
// PERFORMANCE MONITORING
// ============================================

if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`%cPage Load Time: ${pageLoadTime}ms`, 'color: #00ff88; font-weight: bold;');
    });
}
