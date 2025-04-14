// Main JavaScript for Portfolio Website

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    
    if (mobileNavToggle && mobileNav) {
        mobileNavToggle.addEventListener('click', function() {
            mobileNav.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = mobileNavToggle.querySelector('i');
            if (mobileNav.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileNavLinks = mobileNav.querySelectorAll('a');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileNav.classList.remove('active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-links a, .mobile-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Scroll Indicator
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    window.addEventListener('scroll', function() {
        const windowScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (windowScroll / height) * 100;
        
        if (scrollIndicator) {
            scrollIndicator.style.width = scrolled + '%';
        }
    });
    
    // Sticky navigation on scroll
    const navContainer = document.querySelector('.nav-container');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navContainer.classList.add('scrolled');
        } else {
            navContainer.classList.remove('scrolled');
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Floating Contact Button
    const floatingContact = document.querySelector('.floating-contact');
    
    window.addEventListener('scroll', function() {
        if (floatingContact) {
            if (window.scrollY > 300) {
                floatingContact.classList.add('visible');
            } else {
                floatingContact.classList.remove('visible');
            }
        }
    });
    
    if (floatingContact) {
        floatingContact.addEventListener('click', function() {
            const contactSection = document.querySelector('#contact');
            if (contactSection) {
                window.scrollTo({
                    top: contactSection.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Project Gallery Interaction
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.querySelector('.gallery-item-caption').style.opacity = '1';
            this.querySelector('.gallery-item-caption').style.transform = 'translateY(0)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.querySelector('.gallery-item-caption').style.opacity = '0';
            this.querySelector('.gallery-item-caption').style.transform = 'translateY(20px)';
        });
    });
    
// Horizontal Project Scrolling Controls
const scrollLeftBtn = document.querySelector('.scroll-left');
const scrollRightBtn = document.querySelector('.scroll-right');
const projectsContainer = document.querySelector('.projects-scroll-container');

if (scrollLeftBtn && scrollRightBtn && projectsContainer) {
    const scrollStep = 300; // Amount to scroll in pixels on each click
    
    // Function to check scroll position and update arrow visibility.
    function updateScrollButtons() {
        const scrollPos = projectsContainer.scrollLeft;
        const maxScrollPos = projectsContainer.scrollWidth - projectsContainer.clientWidth;
        
        if (scrollPos <= 50) {
            // Fully at the left: hide left arrow, show right arrow if available
            scrollLeftBtn.classList.remove('visible');
            if (maxScrollPos > 10) {
                scrollRightBtn.classList.add('visible');
            } else {
                scrollRightBtn.classList.remove('visible');
            }
        } else if (scrollPos >= maxScrollPos - 1250) {
            // Fully at the right: show left arrow, hide right arrow.
            scrollLeftBtn.classList.add('visible');
            scrollRightBtn.classList.remove('visible');
        } else {
            // In between: show both arrows.
            scrollLeftBtn.classList.add('visible');
            scrollRightBtn.classList.add('visible');
        }
    }
    
    // Click event for the left arrow button.
    scrollLeftBtn.addEventListener('click', function() {
        projectsContainer.scrollBy({
            left: -scrollStep,
            behavior: 'smooth'
        });
    });
    
    // Click event for the right arrow button.
    scrollRightBtn.addEventListener('click', function() {
        projectsContainer.scrollBy({
            left: scrollStep,
            behavior: 'smooth'
        });
    });
    
    // When the user scrolls within the container, update the arrow state.
    projectsContainer.addEventListener('scroll', updateScrollButtons);
    
    // Update arrow visibility when the window loads or is resized.
    window.addEventListener('load', updateScrollButtons);
    window.addEventListener('resize', updateScrollButtons);
    
    // Show arrows when the cursor enters the scroll container.
    projectsContainer.addEventListener('mouseenter', updateScrollButtons);
    
    // Hide arrows when the cursor leaves the scroll container.
    projectsContainer.addEventListener('mouseleave', () => {
        scrollLeftBtn.classList.remove('visible');
        scrollRightBtn.classList.remove('visible');
    });
    
    // Initial update on load.
    updateScrollButtons();
}


    // Form submission handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send the form data to a server
            // For now, we'll just show a success message
            const formData = new FormData(contactForm);
            let formValues = {};
            
            for (let [key, value] of formData.entries()) {
                formValues[key] = value;
            }
            
            console.log('Form submitted:', formValues);
            
            // Show success message
            contactForm.innerHTML = `
                <div class="form-success">
                    <i class="fas fa-check-circle"></i>
                    <h3>Message Sent!</h3>
                    <p>Thank you for reaching out. I'll get back to you soon.</p>
                </div>
            `;
        });
    }
    
    // Add animation classes when elements come into view
    const animateOnScroll = function() {
        const sections = document.querySelectorAll('.section-container');
        
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (sectionTop < windowHeight * 0.75) {
                section.classList.add('animate');
            }
        });
    };
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-section');
    
    window.addEventListener('scroll', function() {
        if (heroSection) {
            const scrollPosition = window.pageYOffset;
            heroSection.style.backgroundPosition = `50% ${scrollPosition * 0.5}px`;
        }
    });
    
    // Run once on page load
    animateOnScroll();
    
    // Run on scroll
    window.addEventListener('scroll', animateOnScroll);
});
