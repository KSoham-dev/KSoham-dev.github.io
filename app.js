// Portfolio Interactive Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Navigation functionality
    initNavigation();
    
    // Smooth scrolling for navigation links
    initSmoothScrolling();
    
    // Scroll animations
    initScrollAnimations();
    
    // Active section highlighting
    initActiveNavigation();
    
    // Mathematical symbol animations
    initMathAnimations();
});

// Navigation menu toggle for mobile
function initNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
        
        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
            }
        });
    }
}

// Smooth scrolling for navigation links
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const heroActions = document.querySelectorAll('.hero-actions a[href^="#"]');
    
    [...navLinks, ...heroActions].forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll animations using Intersection Observer
function initScrollAnimations() {
    // Elements to animate on scroll
    const animatedElements = document.querySelectorAll(
        '.about-text, .highlight-card, .skill-category, .education-card, .project-card, .achievement-item, .interest-card, .contact-item'
    );
    
    // Create intersection observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Apply initial styles and observe elements
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        
        observer.observe(element);
    });
    
    // Special animation for section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const titleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.5
    });
    
    sectionTitles.forEach((title) => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        titleObserver.observe(title);
    });
}

// Active navigation highlighting based on scroll position
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all nav links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to current section's nav link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }
    
    // Throttled scroll event listener
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(updateActiveNav, 10);
    });
    
    // Initial call
    updateActiveNav();
}

// Mathematical symbol animations
function initMathAnimations() {
    const mathSymbols = document.querySelectorAll('.math-symbol.floating');
    
    // Add randomized animation delays
    mathSymbols.forEach((symbol, index) => {
        const randomDelay = Math.random() * 3;
        symbol.style.animationDelay = `-${randomDelay}s`;
        
        // Add hover effect
        symbol.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
            this.style.transform = 'translateY(-5px) rotate(15deg) scale(1.2)';
        });
        
        symbol.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
            this.style.transform = '';
        });
    });
    
    // Create floating mathematical symbols in the background
    createFloatingSymbols();
}

// Create additional floating mathematical symbols
function createFloatingSymbols() {
    const symbols = ['∂', '∆', '∇', '∑', '∏', '∫', '∞', 'π', 'λ', 'α', 'β', 'γ', 'θ', 'μ', 'σ', 'φ', 'ψ', 'ω'];
    const hero = document.querySelector('.hero');
    
    if (!hero) return;
    
    // Create 8 floating symbols
    for (let i = 0; i < 8; i++) {
        const symbol = document.createElement('div');
        symbol.className = 'floating-bg-symbol';
        symbol.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        
        // Random positioning
        symbol.style.position = 'absolute';
        symbol.style.left = Math.random() * 100 + '%';
        symbol.style.top = Math.random() * 100 + '%';
        symbol.style.fontSize = (Math.random() * 20 + 15) + 'px';
        symbol.style.color = 'rgba(255, 215, 0, 0.1)';
        symbol.style.pointerEvents = 'none';
        symbol.style.zIndex = '1';
        symbol.style.fontFamily = 'serif';
        
        // Animation
        symbol.style.animation = `floatBackground ${5 + Math.random() * 5}s ease-in-out infinite`;
        symbol.style.animationDelay = Math.random() * 5 + 's';
        
        hero.appendChild(symbol);
    }
    
    // Add CSS for floating background animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatBackground {
            0%, 100% { 
                transform: translateY(0) rotate(0deg); 
                opacity: 0.1; 
            }
            50% { 
                transform: translateY(-20px) rotate(10deg); 
                opacity: 0.2; 
            }
        }
        
        .nav-link.active {
            color: var(--color-gold) !important;
        }
        
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
}

// Particle effect for mathematical symbols
function createParticleEffect() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const canvas = document.createElement('canvas');
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    
    hero.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = hero.offsetWidth;
        canvas.height = hero.offsetHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    const particles = [];
    const symbols = ['∂', '∆', '∇', '∑', '∏', '∫', '∞', 'π', 'λ'];
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.symbol = symbols[Math.floor(Math.random() * symbols.length)];
            this.opacity = Math.random() * 0.5 + 0.1;
            this.size = Math.random() * 10 + 5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            
            if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
            if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        }
        
        draw() {
            ctx.save();
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = '#FFD700';
            ctx.font = `${this.size}px serif`;
            ctx.textAlign = 'center';
            ctx.fillText(this.symbol, this.x, this.y);
            ctx.restore();
        }
    }
    
    // Create particles
    for (let i = 0; i < 15; i++) {
        particles.push(new Particle());
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

// Add typing effect to hero title
function initTypingEffect() {
    const heroTitle = document.querySelector('.hero-title');
    if (!heroTitle) return;
    
    const originalText = 'Soham Kulkarni';
    const mathSymbolStart = heroTitle.querySelector('.math-symbol:first-child');
    const mathSymbolEnd = heroTitle.querySelector('.math-symbol:last-child');
    
    // Hide the name initially
    const nameSpan = document.createElement('span');
    nameSpan.style.opacity = '0';
    nameSpan.textContent = originalText;
    
    // Replace content
    heroTitle.innerHTML = '';
    heroTitle.appendChild(mathSymbolStart.cloneNode(true));
    heroTitle.appendChild(nameSpan);
    heroTitle.appendChild(mathSymbolEnd.cloneNode(true));
    
    // Typing animation
    setTimeout(() => {
        nameSpan.style.opacity = '1';
        nameSpan.style.transition = 'opacity 0.5s ease';
        
        let index = 0;
        nameSpan.textContent = '';
        
        function typeCharacter() {
            if (index < originalText.length) {
                nameSpan.textContent += originalText.charAt(index);
                index++;
                setTimeout(typeCharacter, 100);
            }
        }
        
        typeCharacter();
    }, 1000);
}

// Initialize enhanced scroll effects
function initEnhancedScrollEffects() {
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Navbar hide/show on scroll
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
        
        // Parallax effect for hero background
        const hero = document.querySelector('.hero');
        const heroBackground = document.querySelector('.hero-background');
        
        if (hero && heroBackground && scrollTop < hero.offsetHeight) {
            const parallaxSpeed = scrollTop * 0.5;
            heroBackground.style.transform = `translateY(${parallaxSpeed}px)`;
        }
    });
    
    // Add smooth transition to navbar
    navbar.style.transition = 'transform 0.3s ease-in-out';
}

// Add contact form functionality (if needed in future)
function initContactForm() {
    // This can be expanded if a contact form is added
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Track email click for analytics if needed
            console.log('Email link clicked');
        });
    });
}

// Add keyboard navigation
function initKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        const sections = ['home', 'about', 'skills', 'education', 'projects', 'contact'];
        const currentSection = sections.find(section => {
            const element = document.getElementById(section);
            const rect = element.getBoundingClientRect();
            return rect.top <= 100 && rect.bottom >= 100;
        });
        
        const currentIndex = sections.indexOf(currentSection);
        
        // Arrow key navigation
        if (e.key === 'ArrowDown' && currentIndex < sections.length - 1) {
            e.preventDefault();
            document.getElementById(sections[currentIndex + 1]).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (e.key === 'ArrowUp' && currentIndex > 0) {
            e.preventDefault();
            document.getElementById(sections[currentIndex - 1]).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
        
        // Home key - scroll to top
        if (e.key === 'Home') {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // End key - scroll to bottom
        if (e.key === 'End') {
            e.preventDefault();
            window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
        }
    });
}

// Performance optimization - Debounce function
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

// Initialize all enhanced features
document.addEventListener('DOMContentLoaded', function() {
    // Add small delay to ensure all elements are rendered
    setTimeout(() => {
        initEnhancedScrollEffects();
        initContactForm();
        initKeyboardNavigation();
        
        // Only create particle effect on larger screens for performance
        if (window.innerWidth > 768) {
            createParticleEffect();
        }
    }, 500);
});

// Handle window resize
window.addEventListener('resize', debounce(function() {
    // Recalculate positions if needed
    initActiveNavigation();
}, 250));