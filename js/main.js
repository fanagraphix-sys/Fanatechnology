document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  const preloader = document.getElementById("preloader");
  if (preloader) {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => {
        preloader.style.display = "none";
      }, 500);
    }, 1000);
  }

  // Sticky Navbar
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  const hamburger = document.getElementById('hamburger');
  const offcanvasMenu = document.getElementById('offcanvas-menu');
  const offcanvasOverlay = document.getElementById('offcanvas-overlay');
  const closeMenuBtn = document.getElementById('close-menu');
  const offcanvasLinks = document.querySelectorAll('.offcanvas-link');

  if (hamburger) {
    function openMenu() {
      offcanvasMenu.classList.add('active');
      offcanvasOverlay.classList.add('active');
    }

    function closeMenu() {
      offcanvasMenu.classList.remove('active');
      offcanvasOverlay.classList.remove('active');
    }

    hamburger.addEventListener('click', openMenu);
    closeMenuBtn.addEventListener('click', closeMenu);
    offcanvasOverlay.addEventListener('click', closeMenu);

    offcanvasLinks.forEach(link => {
      link.addEventListener('click', closeMenu);
    });
  }

  // Scroll Reveal Animations
  const reveals = document.querySelectorAll(".reveal");
  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;

    reveals.forEach(reveal => {
      const elementTop = reveal.getBoundingClientRect().top;
      if (elementTop < windowHeight - elementVisible) {
        reveal.classList.add("active");
        
        // Counter Animation for stats
        const counters = reveal.querySelectorAll(".stat-number");
        counters.forEach(counter => {
          if (!counter.classList.contains("counted") && counter.hasAttribute("data-target")) {
            counter.classList.add("counted");
            const target = +counter.getAttribute("data-target");
            const duration = 2000;
            const increment = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.innerText = Math.ceil(current) + "+";
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerText = target + "+";
              }
            };
            updateCounter();
          }
        });
      }
    });
  };
  
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on load

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(question => {
    question.addEventListener("click", () => {
      const item = question.parentElement;
      const isActive = item.classList.contains("active");
      const icon = question.querySelector("i");
      
      // Close all
      document.querySelectorAll(".faq-item").forEach(faq => {
        faq.classList.remove("active");
        faq.querySelector(".faq-question").classList.remove("active");
        
        // Reset icon to plus
        const faqIcon = faq.querySelector(".faq-question i");
        if (faqIcon) {
          faqIcon.classList.remove("fa-minus");
          faqIcon.classList.add("fa-plus");
        }
      });
      
      // Open clicked item if it wasn't already active
      if (!isActive) {
        item.classList.add("active");
        question.classList.add("active");
        
        // Change icon to minus
        if (icon) {
          icon.classList.remove("fa-plus");
          icon.classList.add("fa-minus");
        }
      }
    });
  });

  // AI Chat Assistant
  const chatToggle = document.getElementById("chatToggle");
  const chatClose = document.getElementById("chatClose");
  const chatWidget = document.getElementById("chatWidget");
  const chatBody = document.getElementById("chatBody");
  const replyBtns = document.querySelectorAll(".reply-btn");

  const toggleChat = () => {
    chatWidget.classList.toggle("active");
  };

  if (chatToggle && chatClose) {
    chatToggle.addEventListener("click", toggleChat);
    chatClose.addEventListener("click", toggleChat);
  }

  // Quick Replies logic
  replyBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const text = btn.innerText;
      
      // User message
      const userMsg = document.createElement("div");
      userMsg.className = "chat-msg";
      userMsg.style.background = "var(--primary-gradient)";
      userMsg.style.color = "white";
      userMsg.style.alignSelf = "flex-end";
      userMsg.style.borderRadius = "16px 16px 4px 16px";
      userMsg.innerText = text;
      chatBody.appendChild(userMsg);

      // Typing animation
      const typingMsg = document.createElement("div");
      typingMsg.className = "chat-msg";
      typingMsg.innerHTML = "Typing...";
      typingMsg.style.opacity = "0.7";
      chatBody.appendChild(typingMsg);
      chatBody.scrollTop = chatBody.scrollHeight;

      // Bot response
      setTimeout(() => {
        typingMsg.remove();
        const botMsg = document.createElement("div");
        botMsg.className = "chat-msg";
        
        if (text.includes("Website")) {
          botMsg.innerText = "Great choice! We specialize in custom, responsive websites. Do you need a standard business site or an e-commerce platform?";
        } else if (text.includes("App")) {
          botMsg.innerText = "We build native and cross-platform apps. Are you looking for iOS, Android, or both?";
        } else if (text.includes("Pricing")) {
          botMsg.innerText = "Our packages start at ₹5,500 for a standard website. Check out the Packages section for more details!";
        } else if (text.includes("Contact")) {
          botMsg.innerText = "You can reach us at 86101 83525 or info@fanatechnology.com. Would you like me to hand you over to a human agent?";
        } else {
          botMsg.innerText = "Thanks for your interest! Our team will get back to you shortly.";
        }
        
        chatBody.appendChild(botMsg);
        chatBody.scrollTop = chatBody.scrollHeight;
      }, 1000);
    });
  });

  // Smooth scroll for anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href !== '#') {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
          window.scrollTo({
            top: target.offsetTop - 80,
            behavior: 'smooth'
          });
          
          // Update active link
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
          if (this.classList.contains('active') === false) {
             this.classList.add('active');
          }
        }
      }
    });
  });

  // Portfolio Marquee
  const portfolioMarquee = document.getElementById("portfolio-marquee");
  if (portfolioMarquee) {
    const originalCards = Array.from(portfolioMarquee.children);
    portfolioMarquee.innerHTML = '';
    
    const track1 = document.createElement("div");
    track1.className = "marquee-track";
    const track2 = document.createElement("div");
    track2.className = "marquee-track";
    track2.setAttribute("aria-hidden", "true");
    
    originalCards.forEach(card => {
      // Remove reveal class so they don't fade in weirdly inside the marquee
      card.classList.remove("reveal");
      card.style.transitionDelay = "0s";
      
      track1.appendChild(card);
      track2.appendChild(card.cloneNode(true));
    });
    
    portfolioMarquee.appendChild(track1);
    portfolioMarquee.appendChild(track2);
  }

  // Services Marquee
  const servicesMarquee = document.getElementById("services-marquee");
  if (servicesMarquee) {
    const originalCards = Array.from(servicesMarquee.children);
    servicesMarquee.innerHTML = '';
    
    const track1 = document.createElement("div");
    track1.className = "marquee-track";
    const track2 = document.createElement("div");
    track2.className = "marquee-track";
    track2.setAttribute("aria-hidden", "true");
    
    originalCards.forEach(card => {
      card.classList.remove("reveal");
      card.style.transitionDelay = "0s";
      track1.appendChild(card);
      track2.appendChild(card.cloneNode(true));
    });
    
    servicesMarquee.appendChild(track1);
    servicesMarquee.appendChild(track2);
  }

  // Clients Marquee
  const clientsMarquee = document.getElementById("client-marquee");
  if (clientsMarquee) {
    const originalCards = Array.from(clientsMarquee.children);
    clientsMarquee.innerHTML = '';
    
    const track1 = document.createElement("div");
    track1.className = "marquee-track";
    const track2 = document.createElement("div");
    track2.className = "marquee-track";
    track2.setAttribute("aria-hidden", "true");
    
    originalCards.forEach(card => {
      card.classList.remove("reveal");
      card.style.transitionDelay = "0s";
      track1.appendChild(card);
      track2.appendChild(card.cloneNode(true));
    });
    
    clientsMarquee.appendChild(track1);
    clientsMarquee.appendChild(track2);
  }

  // Testimonials Marquee
  const testimonialMarquee = document.getElementById("testimonial-marquee");
  if (testimonialMarquee) {
    const originalCards = Array.from(testimonialMarquee.children);
    testimonialMarquee.innerHTML = '';
    
    const track1 = document.createElement("div");
    track1.className = "marquee-track";
    const track2 = document.createElement("div");
    track2.className = "marquee-track";
    track2.setAttribute("aria-hidden", "true");
    
    originalCards.forEach(card => {
      card.classList.remove("reveal");
      card.style.transitionDelay = "0s";
      track1.appendChild(card);
      track2.appendChild(card.cloneNode(true));
    });
    
    testimonialMarquee.appendChild(track1);
    testimonialMarquee.appendChild(track2);
  }

  // Modal Logic
  const modal = document.getElementById("quoteModal");
  const openModalBtns = document.querySelectorAll(".open-modal-btn");
  const closeModalBtn = document.getElementById("closeModal");
  
  if (modal) {
    openModalBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
      });
    });
    
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("active");
      document.body.style.overflow = "";
    });
    
    // Close on outside click
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
        document.body.style.overflow = "";
      }
    });
  }

  // Mobile Bottom Menu Active State
  const bottomMenuItems = document.querySelectorAll('.bottom-menu-item');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
        current = section.getAttribute('id');
      }
    });

    bottomMenuItems.forEach(item => {
      item.classList.remove('active');
      if (item.getAttribute('href').includes(current)) {
        item.classList.add('active');
      }
    });
  });

});
