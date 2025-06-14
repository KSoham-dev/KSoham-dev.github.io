// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Navigation elements
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.querySelector('.nav');

    // Mobile menu toggle
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed nav height
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Active navigation link highlighting
    function updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 100; // Offset for better UX

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    }

    // Navigation background on scroll
    function handleNavScroll() {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    }

    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveLink();
        handleNavScroll();
        animateOnScroll();
    });

    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.skill-category, .project-card, .stat-item, .education-card');
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset;

        elements.forEach(element => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const elementVisible = 150; // When element comes into view

            if (scrollTop > (elementTop + elementHeight - windowHeight + elementVisible)) {
                element.classList.add('animate-in');
            }
        });
    }

    // Typing animation for hero tagline
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }

    // Initialize typing animation
    const heroTagline = document.querySelector('.hero-tagline');
    if (heroTagline) {
        const originalText = heroTagline.textContent;
        // Start typing animation after a short delay
        setTimeout(() => {
            typeWriter(heroTagline, originalText, 30);
        }, 1000);
    }

    // Smooth reveal animations for sections
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animatedElements = document.querySelectorAll('.skill-category, .project-card, .stat-item, .education-card, .contact-item');
    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // Data visualization animation
    function animateDataPoints() {
        const dataPoints = document.querySelectorAll('.data-point');
        const dataLines = document.querySelectorAll('.data-line');
        
        // Animate data points with staggered timing
        dataPoints.forEach((point, index) => {
            setTimeout(() => {
                point.style.animationPlayState = 'running';
            }, index * 200);
        });

        // Animate data lines
        dataLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.animationPlayState = 'running';
            }, (index + dataPoints.length) * 200);
        });
    }

    // Start data visualization animation when hero section is visible
    const heroSection = document.querySelector('.hero');
    const heroObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateDataPoints();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    if (heroSection) {
        heroObserver.observe(heroSection);
    }

    // Enhanced skill tag hover effects
    const skillTags = document.querySelectorAll('.skill-tag');
    skillTags.forEach(tag => {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });
        
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Contact form interaction enhancement
    const contactItems = document.querySelectorAll('.contact-item');
    contactItems.forEach(item => {
        item.addEventListener('click', function() {
            const link = this.querySelector('a');
            if (link) {
                link.click();
            }
        });
    });

    // Scroll to top functionality
    function createScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.className = 'scroll-to-top';
        scrollBtn.style.cssText = `
            position: fixed;
            bottom: 30px;
            right: 30px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: linear-gradient(135deg, var(--ds-cyan-primary), var(--ds-teal-primary));
            color: white;
            border: none;
            font-size: 20px;
            font-weight: bold;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
            z-index: 1000;
            box-shadow: 0 4px 15px rgba(0, 171, 228, 0.3);
        `;

        document.body.appendChild(scrollBtn);

        // Show/hide scroll to top button
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                scrollBtn.style.opacity = '1';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });

        // Scroll to top functionality
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Hover effects
        scrollBtn.addEventListener('mouseenter', () => {
            scrollBtn.style.transform = 'scale(1.1)';
        });

        scrollBtn.addEventListener('mouseleave', () => {
            scrollBtn.style.transform = 'scale(1)';
        });
    }

    // Initialize scroll to top button
    createScrollToTop();

    // Parallax effect for hero section
    function handleParallax() {
        const hero = document.querySelector('.hero');
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        if (hero && scrolled < hero.offsetHeight) {
            hero.style.transform = `translateY(${rate}px)`;
        }
    }

    // Add parallax to scroll event (throttled for performance)
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Initialize animations on page load
    setTimeout(() => {
        document.body.classList.add('loaded');
        updateActiveLink();
    }, 100);

    // Easter egg: Konami code for special animation
    let konamiCode = [];
    const konamiSequence = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // Up Up Down Down Left Right Left Right B A

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.keyCode);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.toString() === konamiSequence.toString()) {
            triggerDataScienceAnimation();
            konamiCode = [];
        }
    });

    function triggerDataScienceAnimation() {
        const dataPoints = document.querySelectorAll('.data-point');
        dataPoints.forEach((point, index) => {
            setTimeout(() => {
                point.style.animation = 'pulse 0.5s ease-in-out';
                point.style.background = `hsl(${Math.random() * 360}, 70%, 50%)`;
            }, index * 100);
        });
        
        // Reset after animation
        setTimeout(() => {
            dataPoints.forEach(point => {
                point.style.background = 'var(--ds-cyan-primary)';
                point.style.animation = 'pulse 2s infinite';
            });
        }, 2000);
    }

    // Performance optimization: Lazy load animations
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reduceMotion.matches) {
        // Disable animations for users who prefer reduced motion
        document.body.classList.add('reduce-motion');
    }
});

// CSS for additional animations and effects
const additionalCSS = `
.nav-menu.active {
    display: flex !important;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    width: 100%;
    background: rgba(10, 24, 40, 0.98);
    backdrop-filter: blur(10px);
    padding: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.nav-toggle.active span:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
}

.nav-toggle.active span:nth-child(2) {
    opacity: 0;
}

.nav-toggle.active span:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -6px);
}

.nav-link.active {
    color: var(--ds-cyan-primary) !important;
}

.nav-link.active::after {
    width: 100% !important;
}

.nav.scrolled {
    background: rgba(10, 24, 40, 0.98);
    backdrop-filter: blur(15px);
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
}

.animate-in {
    animation: slideInUp 0.6s ease-out forwards;
}

@keyframes slideInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.loaded .hero-content {
    animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(50px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.reduce-motion * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
}

@media (max-width: 768px) {
    .nav-menu {
        display: none;
    }
    
    .nav-toggle {
        display: flex;
    }
}
`;

// Inject additional CSS
const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);