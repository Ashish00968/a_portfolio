document.addEventListener('DOMContentLoaded', () => {
    // Prevent scrolling while loader is active
    document.body.classList.add('no-scroll');

    // 1. Preloader Animation
    const loader = document.getElementById('loader');
    setTimeout(() => {
        loader.classList.add('fade-out');
        document.body.classList.remove('no-scroll');
        // Trigger initial hero animations after load
        triggerScrollAnimations();
    }, 1200);

    // 2. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        triggerScrollAnimations();
    });

    // 3. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const closeMenu = document.querySelector('.close-menu');
    const mobileLinks = document.querySelectorAll('.mobile-links a');

    if(hamburger) {
        hamburger.addEventListener('click', () => mobileMenu.classList.add('active'));
    }
    if(closeMenu) {
        closeMenu.addEventListener('click', () => mobileMenu.classList.remove('active'));
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // 4. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal, .fade-up, .fade-in');
    
    function triggerScrollAnimations() {
        const windowHeight = window.innerHeight;
        const revealPoint = 50;
        
        revealElements.forEach(el => {
            const revealTop = el.getBoundingClientRect().top;
            if (revealTop < windowHeight - revealPoint) {
                el.classList.add('active');
            }
        });
    }

    // Trigger once on load in case elements are already in view
    triggerScrollAnimations();

    // 5. Before vs After Slider Logic
    const slider = document.getElementById('ba-slider');
    const editedImage = document.getElementById('ba-edited'); // The overlay image layer
    const handle = document.getElementById('ba-handle');
    let isSliding = false;

    if (slider && editedImage && handle) {
        // Desktop Mouse Events
        slider.addEventListener('mousedown', (e) => {
            isSliding = true;
            updateSlider(e.clientX);
        });
        window.addEventListener('mouseup', () => {
            isSliding = false;
        });
        window.addEventListener('mousemove', (e) => {
            if (!isSliding) return;
            // prevent text selection while sliding
            e.preventDefault();
            updateSlider(e.clientX);
        });

        // Mobile Touch Events
        slider.addEventListener('touchstart', (e) => {
            isSliding = true;
            updateSlider(e.touches[0].clientX);
        });
        window.addEventListener('touchend', () => {
            isSliding = false;
        });
        window.addEventListener('touchmove', (e) => {
            if (!isSliding) return;
            updateSlider(e.touches[0].clientX);
        });

        function updateSlider(clientX) {
            let rect = slider.getBoundingClientRect();
            // Calculate percentage
            let position = ((clientX - rect.left) / rect.width) * 100;
            
            // Constrain between 0% and 100%
            if (position < 0) position = 0;
            if (position > 100) position = 100;
            
            editedImage.style.width = `${position}%`;
            handle.style.left = `${position}%`;
        }
    }

    // Update Copyright Year dynamically
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
