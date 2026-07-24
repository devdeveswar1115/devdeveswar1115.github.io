// ==========================================
// THEME TOGGLE
// ==========================================
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeToggle.querySelector('i').classList.replace('fa-moon', 'fa-sun');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const icon = themeToggle.querySelector('i');
        
        if (document.body.classList.contains('dark')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
        }
    });
}

// ==========================================
// SCROLL PROGRESS & NAVBAR
// ==========================================
const navbar = document.querySelector('.navbar');
const progressBar = document.querySelector('.scroll-progress');
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Navbar glassmorphism
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll Progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + "%";

    // Active Navigation
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ==========================================
// MOBILE MENU
// ==========================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinksContainer = document.querySelector('.nav-links');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navLinksContainer.classList.toggle('show');
    });
}

// ==========================================
// INTERSECTION OBSERVERS (REVEAL ANIMATIONS)
// ==========================================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal, .reveal-blur').forEach(el => revealObserver.observe(el));

// ==========================================
// ANIMATED COUNTERS
// ==========================================
const counters = document.querySelectorAll('.counter');
let hasCounted = false;

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasCounted) {
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 2000; // ms
                const increment = target / (duration / 16); // 60fps

                let current = 0;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.ceil(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
            hasCounted = true;
        }
    });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    counterObserver.observe(statsSection);
}

// ==========================================
// PARALLAX & MAGNETIC EFFECTS
// ==========================================
document.addEventListener('mousemove', (e) => {
    const x = e.clientX / window.innerWidth;
    const y = e.clientY / window.innerHeight;

    // Background Blobs
    const blobs = document.querySelectorAll('.blob');
    blobs.forEach((blob, index) => {
        const speed = (index + 1) * 20;
        blob.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });

    // Floating Cards (Hero)
    const floatingCards = document.querySelectorAll('.floating-card');
    floatingCards.forEach((card, index) => {
        const speed = (index + 1) * 15;
        // Don't override the CSS animation, just add to it via a wrapper if needed, 
        // or apply subtle rotation based on mouse.
        card.style.transform = `translate(${x * speed}px, ${y * speed}px) rotate(${x * 5 - 2.5}deg)`;
    });
});

// Magnetic Buttons
const magneticElements = document.querySelectorAll('.magnetic');
magneticElements.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    
    el.addEventListener('mouseleave', () => {
        el.style.transform = 'translate(0px, 0px)';
    });
});

// ==========================================
// NAME SCRAMBLE EFFECT
// ==========================================
const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const first = document.getElementById("scramble-first");
const last = document.getElementById("scramble-last");

const firstText = "DEV DEVESWAR";
const lastText = "RANA";

function scramble(element, finalText) {
    if (!element) return;
    let iteration = 0;
    const interval = setInterval(() => {
        element.innerText = finalText
            .split("")
            .map((letter, index) => {
                if(index < iteration) {
                    return finalText[index];
                }
                return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        
        if(iteration >= finalText.length){
            clearInterval(interval);
        }
        iteration += 1/3;
    }, 30);
}

const scrambleTrigger = document.querySelector(".scramble-trigger");
if (scrambleTrigger) {
    scrambleTrigger.addEventListener("mouseover", () => {
        scramble(first, firstText);
        scramble(last, lastText);
    });
}

// ==========================================
// EMAILJS FORM LOGIC
// ==========================================
emailjs.init("iwIzjRGHuMFCmbjj_");

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
    
        const btn = this.querySelector('button');
        const status = document.getElementById('formStatus');
        const originalText = btn.innerHTML;
    
        btn.innerHTML = 'SENDING...';
        btn.disabled = true;
    
        const params = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };
    
        emailjs.send(
            "service_x5fhnxp", 
            "template_rrfh9gl", 
            params
        )
        .then(function() {
            status.textContent = "Message sent! I will respond shortly.";
            status.style.display = "block";
            status.style.color = "#4caf50";
        
            btn.innerHTML = "SENT!";
            btn.style.backgroundColor = "#4caf50";
        
            contactForm.reset();
        }, function(error) {
            status.textContent = "Failed to send message.";
            status.style.display = "block";
            status.style.color = "#f44336";
        
            btn.innerHTML = originalText;
            btn.disabled = false;
        });
    });
}

// Back to top
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}