// Enhanced JavaScript with Animations & Interactions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Particles.js Background
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: "#4361ee"
                },
                shape: {
                    type: "circle"
                },
                opacity: {
                    value: 0.3,
                    random: true
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#4361ee",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "repulse"
                    },
                    onclick: {
                        enable: true,
                        mode: "push"
                    }
                }
            }
        });
    }

    // Loading Screen
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.classList.add('loaded');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    menuToggle?.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle?.classList.remove('active');
            navLinks?.classList.remove('active');
        });
    });

    // // Theme Toggle
    // const themeSwitch = document.getElementById('theme-switch');
    // themeSwitch?.addEventListener('change', function() {
    //     document.body.classList.toggle('dark-mode', this.checked);
    //     localStorage.setItem('theme', this.checked ? 'dark' : 'light');
    // });

    // // Load saved theme
    // const savedTheme = localStorage.getItem('theme');
    // if (savedTheme === 'dark') {
    //     themeSwitch.checked = true;
    //     document.body.classList.add('dark-mode');
    // }

    // Animated Counter
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    const startCounter = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => startCounter(counter), 10);
        } else {
            counter.innerText = target;
        }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounter(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));

    // Magnetic Buttons
    const magneticButtons = document.querySelectorAll('.btn-magnetic');
    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', (e) => {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        button.addEventListener('mouseleave', () => {
            button.style.transform = 'translate(0, 0)';
        });
    });

    // Scroll Effects
    const navbar = document.querySelector('.navbar');
    const backToTop = document.querySelector('.back-to-top');

    window.addEventListener('scroll', () => {
        // Navbar effect
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Parallax effect for hero elements
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-card, .hero-badge');
        parallaxElements.forEach(el => {
            const speed = el.classList.contains('floating-card') ? 0.5 : 0.3;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Back to top functionality
    backToTop?.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    contactForm?.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.btn-submit');
        const originalText = submitBtn.querySelector('span').textContent;
        
        // Show loading state
        submitBtn.querySelector('span').textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            // Show success state
            submitBtn.querySelector('span').textContent = 'Message Sent!';
            submitBtn.style.background = 'linear-gradient(135deg, #4CAF50, #45a049)';
            
            // Reset form
            setTimeout(() => {
                contactForm.reset();
                submitBtn.querySelector('span').textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.style.background = 'linear-gradient(135deg, var(--primary), var(--primary-light))';
                
                // Show confirmation message
                const notification = document.createElement('div');
                notification.className = 'form-notification';
                notification.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    <span>Message sent successfully! I'll get back to you soon.</span>
                `;
                contactForm.appendChild(notification);
                
                setTimeout(() => notification.remove(), 3000);
            }, 2000);
        }, 1500);
    });

    // Floating label enhancement
    const floatingLabels = document.querySelectorAll('.floating-label input, .floating-label textarea');
    floatingLabels.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', () => {
            if (!input.value) {
                input.parentElement.classList.remove('focused');
            }
        });
    });

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const content = card.querySelector('.project-content');
            content.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', () => {
            const content = card.querySelector('.project-content');
            content.style.transform = 'translateY(0)';
        });
    });

    // Typewriter effect for hero description
    const highlightTexts = document.querySelectorAll('.highlight-text');
    highlightTexts.forEach((text, index) => {
        const original = text.getAttribute('data-text');
        let i = 0;
        
        function typeWriter() {
            if (i < original.length) {
                text.textContent += original.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        setTimeout(typeWriter, index * 2000);
    });

    // Skills carousel animation
    const skillsCarousel = document.querySelector('.skills-carousel');
    if (skillsCarousel) {
        const skillsClone = skillsCarousel.innerHTML;
        skillsCarousel.innerHTML += skillsClone;
    }

    // Cursor follower
    const cursorFollower = document.createElement('div');
    cursorFollower.className = 'cursor-follower';
    document.body.appendChild(cursorFollower);

    document.addEventListener('mousemove', (e) => {
        cursorFollower.style.left = e.clientX + 'px';
        cursorFollower.style.top = e.clientY + 'px';
    });

    // Add hover effect to links
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursorFollower.style.transform = 'scale(1.5)';
            cursorFollower.style.background = 'rgba(67, 97, 238, 0.3)';
        });
        
        element.addEventListener('mouseleave', () => {
            cursorFollower.style.transform = 'scale(1)';
            cursorFollower.style.background = 'rgba(67, 97, 238, 0.1)';
        });
    });

    // Add styles for cursor follower
    const cursorStyle = document.createElement('style');
    cursorStyle.textContent = `
        .cursor-follower {
            position: fixed;
            width: 20px;
            height: 20px;
            background: rgba(67, 97, 238, 0.1);
            border-radius: 50%;
            pointer-events: none;
            transform: translate(-50%, -50%);
            z-index: 9999;
            transition: transform 0.2s ease, background 0.2s ease;
            mix-blend-mode: difference;
        }
        
        .form-notification {
            position: fixed;
            bottom: 30px;
            right: 30px;
            background: #4CAF50;
            color: white;
            padding: 15px 20px;
            border-radius: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            animation: slideIn 0.3s ease;
            z-index: 1000;
        }
        
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
    `;
    document.head.appendChild(cursorStyle);
});

// Preload images
window.addEventListener('load', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.opacity = '1';
        img.style.transition = 'opacity 0.5s ease';
    });
});