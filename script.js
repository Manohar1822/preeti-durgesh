// Smooth scrolling and animations
document.addEventListener('DOMContentLoaded', function() {
    
    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
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

    // Animate event cards on scroll
    const eventCards = document.querySelectorAll('.event-card');
    eventCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateX(-50px)';
        card.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(card);
    });

    // Animate family members
    const familyMembers = document.querySelectorAll('.family-member');
    familyMembers.forEach((member, index) => {
        member.style.opacity = '0';
        member.style.transform = 'scale(0.8)';
        member.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        observer.observe(member);
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
            heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add sparkle effect on hover to couple image
    const coupleImage = document.querySelector('.couple-image');
    if (coupleImage) {
        coupleImage.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        coupleImage.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    // Create floating particles
    function createFloatingParticle() {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.innerHTML = ['🌸', '🌺', '🌼', '✨', '💫'][Math.floor(Math.random() * 5)];
        particle.style.cssText = `
            position: fixed;
            font-size: ${Math.random() * 20 + 15}px;
            left: ${Math.random() * 100}vw;
            top: 100vh;
            pointer-events: none;
            z-index: 9999;
            animation: floatUp ${Math.random() * 3 + 4}s linear;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        document.body.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 7000);
    }

    // Add keyframes for floating particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes floatUp {
            0% {
                transform: translateY(0) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
                transform: translateY(-100vh) rotate(360deg);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Create particles periodically
    setInterval(createFloatingParticle, 2000);

    // Add click effect to sections
    sections.forEach(section => {
        section.addEventListener('click', function(e) {
            if (e.target.tagName !== 'A' && e.target.tagName !== 'BUTTON') {
                createRipple(e, this);
            }
        });
    });

    function createRipple(event, element) {
        const ripple = document.createElement('div');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, rgba(255, 215, 0, 0.4) 0%, transparent 70%);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            transform: scale(0);
            animation: rippleEffect 0.6s ease-out;
        `;
        
        const rippleStyle = document.createElement('style');
        rippleStyle.textContent = `
            @keyframes rippleEffect {
                to {
                    transform: scale(2);
                    opacity: 0;
                }
            }
        `;
        if (!document.querySelector('style[data-ripple]')) {
            rippleStyle.setAttribute('data-ripple', 'true');
            document.head.appendChild(rippleStyle);
        }
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Add tilt effect to event cards
    eventCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });

    // Add smooth reveal for couple details
    const coupleDetails = document.querySelectorAll('.bride-details, .groom-details');
    coupleDetails.forEach((detail, index) => {
        detail.style.opacity = '0';
        detail.style.transform = index === 0 ? 'translateX(-100px)' : 'translateX(100px)';
        detail.style.transition = 'opacity 1s ease 0.5s, transform 1s ease 0.5s';
        observer.observe(detail);
    });

    // Add count-up animation for dates (optional enhancement)
    const dates = document.querySelectorAll('.event-date');
    dates.forEach(date => {
        date.style.fontWeight = '700';
    });

    // Log a beautiful message to console
    console.log('%c॥ शुभम् भवतु ॥', 'font-size: 24px; color: #8B0000; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);');
    console.log('%cप्रीती & दुर्गेश का विवाह समारोह', 'font-size: 18px; color: #DC143C; font-weight: bold;');
    console.log('%c8 फरवरी 2026', 'font-size: 16px; color: #FFD700; font-weight: bold;');

    // Add loading screen fade out
    setTimeout(() => {
        document.body.style.opacity = '0';
        setTimeout(() => {
            document.body.style.transition = 'opacity 0.5s ease';
            document.body.style.opacity = '1';
        }, 100);
    }, 100);
});

// Prevent right-click on images (optional protection)
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        window.scrollBy({
            top: window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        window.scrollBy({
            top: -window.innerHeight * 0.8,
            behavior: 'smooth'
        });
    } else if (e.key === 'Home') {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    } else if (e.key === 'End') {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});

// Performance optimization: Debounce scroll events
let scrollTimeout;
window.addEventListener('scroll', function() {
    if (scrollTimeout) {
        window.cancelAnimationFrame(scrollTimeout);
    }
    scrollTimeout = window.requestAnimationFrame(function() {
        // Scroll position tracking for future features
        const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        document.body.setAttribute('data-scroll', Math.round(scrollPercent));
    });
});

function startMusic() {
    const music = document.getElementById("bgm");
    music.play();
  }