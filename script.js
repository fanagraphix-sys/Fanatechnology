document.addEventListener('DOMContentLoaded', () => {
    // 0. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.add('light-mode');
        themeIcon.classList.replace('ph-sun', 'ph-moon');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        
        if (document.body.classList.contains('light-mode')) {
            themeIcon.classList.replace('ph-sun', 'ph-moon');
            localStorage.setItem('theme', 'light');
        } else {
            themeIcon.classList.replace('ph-moon', 'ph-sun');
            localStorage.setItem('theme', 'dark');
        }
    });

    // 1. Dynamic Year for Footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // 2. Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-link');
    const menuIcon = menuToggle.querySelector('i');

    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('nav-open');
        
        // Toggle icon between list and X
        if (navLinks.classList.contains('nav-open')) {
            menuIcon.classList.remove('ph-list');
            menuIcon.classList.add('ph-x');
        } else {
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
        }
    });

    // Close mobile menu when a link is clicked
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('nav-open');
            menuIcon.classList.remove('ph-x');
            menuIcon.classList.add('ph-list');
        });
    });

    // 7. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = question.classList.contains('active');
            
            // Close all other FAQs
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });

            // Open clicked FAQ if it wasn't already open
            if (!isOpen) {
                question.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });

    // 3. Navbar Background on Scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 4. Initialize AOS Animations
    AOS.init({
        duration: 800,
        easing: 'ease-out',
        once: true,
        offset: 100
    });

    // 5. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - sectionHeight / 3)) {
                current = section.getAttribute('id');
            }
        });

        links.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // 6. Handle Contact Form Submission (Prevent Default)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.innerHTML;
            
            // Simple UI feedback
            submitBtn.innerHTML = '<i class="ph ph-check-circle"></i> Sent Successfully!';
            submitBtn.style.background = '#10b981'; // Green
            
            // Reset form
            contactForm.reset();
            
            // Restore button after 3 seconds
            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
            }, 3000);
        });
    }

    // 8. Popup Form Logic (Show after 3 seconds)
    const leadPopup = document.getElementById('leadPopup');
    const closePopupBtn = document.getElementById('closePopup');
    
    if (leadPopup) {
        // Show popup after 3 seconds
        setTimeout(() => {
            leadPopup.classList.add('active');
        }, 3000);

        // Close popup when clicking X
        if (closePopupBtn) {
            closePopupBtn.addEventListener('click', () => {
                leadPopup.classList.remove('active');
            });
        }

        // Close popup when clicking outside the content
        leadPopup.addEventListener('click', (e) => {
            if (e.target === leadPopup) {
                leadPopup.classList.remove('active');
            }
        });

        // Handle popup form submission
        const popupForm = document.getElementById('popupForm');
        if (popupForm) {
            popupForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const submitBtn = popupForm.querySelector('.submit-btn');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<i class="ph ph-check-circle"></i> Request Sent!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    leadPopup.classList.remove('active');
                    // Reset after transition
                    setTimeout(() => {
                        popupForm.reset();
                        submitBtn.innerHTML = originalText;
                        submitBtn.style.background = '';
                    }, 400);
                }, 2000);
            });
        }
    }

    // 9. AI Chatbot Logic
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotWindow = document.getElementById('chatbotWindow');
    const closeChatbot = document.getElementById('closeChatbot');
    const chatbotForm = document.getElementById('chatbotForm');
    const chatbotInputField = document.getElementById('chatbotInputField');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const suggestedQs = document.querySelectorAll('.suggested-q');

    if (chatbotToggle && chatbotWindow) {
        // Toggle chatbot window
        chatbotToggle.addEventListener('click', () => {
            chatbotWindow.classList.toggle('active');
        });

        // Close chatbot window
        if (closeChatbot) {
            closeChatbot.addEventListener('click', () => {
                chatbotWindow.classList.remove('active');
            });
        }

        // Function to add a message to the chat
        const addMessage = (text, sender) => {
            const msgDiv = document.createElement('div');
            msgDiv.classList.add('message', sender === 'user' ? 'user-message' : 'ai-message');
            msgDiv.textContent = text;
            chatbotMessages.appendChild(msgDiv);
            chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        };

        // Handle form submission
        chatbotForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const text = chatbotInputField.value.trim();
            if (!text) return;

            // Add user message
            addMessage(text, 'user');
            chatbotInputField.value = '';

            // Simulate AI typing delay
            setTimeout(() => {
                addMessage("Thanks for your question! I'm just a demo AI right now, but Arshad will get back to you shortly if you use the contact form.", 'ai');
            }, 1000);
        });

        // Handle suggested questions clicks
        suggestedQs.forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.textContent;
                addMessage(text, 'user');
                
                // Hide suggested questions after clicking
                btn.parentElement.style.display = 'none';

                // Simulate AI response based on question
                setTimeout(() => {
                    if (text.includes("pricing")) {
                        addMessage("My primary logo package is ₹1500, and the comprehensive brand package is ₹3000. You can check the Pricing section for more details!", 'ai');
                    } else if (text.includes("long")) {
                        addMessage("Most logo projects take between 2 to 7 business days depending on revisions and complexity.", 'ai');
                    } else {
                        addMessage("To start a project, simply use the Contact form or message me directly on WhatsApp at +91 89391 85200.", 'ai');
                    }
                }, 1000);
            });
        });
    }

    // 10. Typing Review System
    const reviews = [
        { text: "Arshad completely transformed our brand identity. The logo is minimalist, memorable, and exactly what we wanted!", name: "Sarah Jenkins", role: "CEO, TechStart" },
        { text: "Incredibly fast execution and highly professional. The modern design elements he added to our branding were stunning.", name: "David Chen", role: "Marketing Director" },
        { text: "Great communication throughout the design process. The final files were well-organized and brand-ready.", name: "Elena Rodriguez", role: "Small Business Owner" }
    ];

    const typedReviewEl = document.getElementById('typed-review');
    const reviewerNameEl = document.getElementById('reviewer-name');
    const reviewerRoleEl = document.getElementById('reviewer-role');
    
    if (typedReviewEl) {
        let reviewIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeEffect() {
            const currentReview = reviews[reviewIndex];
            
            if (isDeleting) {
                typedReviewEl.textContent = currentReview.text.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typedReviewEl.textContent = currentReview.text.substring(0, charIndex + 1);
                charIndex++;
            }
            
            // Update reviewer info immediately when starting to type a new review
            if (charIndex === 1 && !isDeleting) {
                reviewerNameEl.textContent = "- " + currentReview.name;
                reviewerRoleEl.textContent = currentReview.role;
            }

            let typeSpeed = isDeleting ? 20 : 40;

            if (!isDeleting && charIndex === currentReview.text.length) {
                // Pause at the end of the sentence
                typeSpeed = 4000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                reviewIndex = (reviewIndex + 1) % reviews.length;
                typeSpeed = 500;
                // Clear name while empty
                reviewerNameEl.textContent = "";
                reviewerRoleEl.textContent = "";
            }

            setTimeout(typeEffect, typeSpeed);
        }

        // Start typing effect slightly after load
        setTimeout(typeEffect, 1500);
    }
});
