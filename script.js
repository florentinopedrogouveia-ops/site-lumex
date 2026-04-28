/**
 * LUMEX Agency - Interactive Elements (SaaS/Orange Edition)
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Active Navigation State ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').includes(current)) {
                a.classList.add('active');
            }
        });
    });

    // --- 2. Advanced Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 80;

        revealElements.forEach((element) => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    // Initial check and listen for scroll
    revealOnScroll();
    window.addEventListener('scroll', revealOnScroll);

    // --- 3. Interactive Mouse Glow on Feature Cards ---
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const glow = card.querySelector('.card-glow');
            if(glow) {
                // Center the glow exactly on the mouse coordinates
                glow.style.left = `${x}px`;
                glow.style.top = `${y}px`;
                glow.style.transform = 'translate(-50%, -50%)';
            }
        });

        card.addEventListener('mouseleave', () => {
            const glow = card.querySelector('.card-glow');
            if(glow) {
                // Return glow to top center smoothly
                glow.style.left = '50%';
                glow.style.top = '0';
            }
        });
    });

    // --- 4. 3D Parallax Effect for Hero Visuals ---
    const heroSection = document.querySelector('.hero');
    const visuals = document.querySelector('.hero-visuals');
    
    if (heroSection && visuals) {
        heroSection.addEventListener('mousemove', (e) => {
            const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
            const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
            
            // Move the container slightly
            visuals.style.transform = `translateY(${yAxis}px) translateX(${xAxis}px)`;
        });

        heroSection.addEventListener('mouseleave', () => {
            visuals.style.transition = "transform 0.5s ease";
            visuals.style.transform = `translateY(0px) translateX(0px)`;
            
            setTimeout(() => {
                visuals.style.transition = "none";
            }, 500);
        });
    }

    // --- 5. Smooth Scrolling ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });
});
