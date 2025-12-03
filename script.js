// Combined JavaScript for Bhagvat Vyas Dr Ramanand Ji Website

document.addEventListener("DOMContentLoaded", function() {
  
  // ========== 1. HAMBURGER MENU TOGGLE ==========
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('header nav');
  
  if (hamburger && navMenu) {
    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      navMenu.classList.toggle('active');
      hamburger.textContent = navMenu.classList.contains('active') ? '✕' : '☰';
      
      // Toggle aria-expanded for accessibility
      const isExpanded = navMenu.classList.contains('active');
      hamburger.setAttribute('aria-expanded', isExpanded);
    });
    
    // Close menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (event) => {
      if (navMenu.classList.contains('active') && 
          !navMenu.contains(event.target) && 
          !hamburger.contains(event.target)) {
        navMenu.classList.remove('active');
        hamburger.textContent = '☰';
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // ========== 2. ACTIVE NAV LINK HIGHLIGHTING ==========
  const path = window.location.pathname.split("/").pop() || "index.html";
  const navLinks = document.querySelectorAll("header nav a");

  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === path || (path === "" && href === "index.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // ========== 3. IMAGE LIGHTBOX FUNCTIONALITY ==========
  const images = document.querySelectorAll('.gallery-grid img');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.querySelector('.lightbox-close');
  
  if (images.length > 0 && lightbox && lightboxImg) {
    images.forEach(img => {
      img.addEventListener('click', function() {
        lightbox.style.display = 'flex';
        lightboxImg.src = this.src;
        lightboxImg.alt = this.alt;
        document.body.style.overflow = 'hidden';
      });
    });
    
    // Close lightbox
    if (lightboxClose) {
      lightboxClose.addEventListener('click', function() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      });
    }
    
    // Close lightbox on outside click
    lightbox.addEventListener('click', function(e) {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }

  // ========== 4. FORM HANDLING ==========
  const contactForm = document.getElementById('contactForm');
  const newsletterForm = document.getElementById('newsletterForm');
  
  // Contact Form
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Simple validation
      const name = document.getElementById('name')?.value;
      const phone = document.getElementById('phone')?.value;
      
      if (!name || !phone) {
        alert('Please fill in required fields: Name and Phone');
        return;
      }
      
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        alert('Thank you for your message! The sewa team will contact you within 24 hours.');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }
  
  // Newsletter Form
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = document.getElementById('newsletter-email') || 
                        document.getElementById('newsletter-email-about');
      const email = emailInput?.value;
      
      if (!email || !email.includes('@')) {
        alert('Please enter a valid email address');
        return;
      }
      
      const submitBtn = newsletterForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Subscribing...';
      submitBtn.disabled = true;
      
      // Simulate API call
      setTimeout(() => {
        alert('Thank you for subscribing! You will receive updates about upcoming Kathas.');
        newsletterForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }, 1500);
    });
  }

  // ========== 5. LAZY LOADING IMAGES ==========
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');
          if (src) {
            img.src = src;
            img.classList.remove('loading-placeholder');
          }
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.1
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });
  }

  // ========== 6. SMOOTH SCROLLING ==========
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // ========== 7. DYNAMIC YEAR UPDATE ==========
  const yearElements = document.querySelectorAll('.current-year, #current-year');
  if (yearElements.length > 0) {
    const currentYear = new Date().getFullYear();
    yearElements.forEach(el => {
      el.textContent = currentYear;
    });
  }

  // ========== 8. FIX FOR IMAGES ON MOBILE ==========
  const allImages = document.querySelectorAll('img');
  allImages.forEach(img => {
    // Add loading="lazy" for better performance
    if (!img.hasAttribute('loading')) {
      img.setAttribute('loading', 'lazy');
    }
    
    // Ensure images are responsive
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
  });

  // ========== 9. FIX FOR GOOGLE MAPS ON MOBILE ==========
  const mapIframes = document.querySelectorAll('iframe[src*="google.com/maps"]');
  mapIframes.forEach(iframe => {
    iframe.style.maxWidth = '100%';
    iframe.style.height = 'auto';
    iframe.style.minHeight = '300px';
  });

  // ========== 10. PREVENT ZOOM ON INPUT FOCUS (iOS) ==========
  const inputs = document.querySelectorAll('input, textarea, select');
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.style.fontSize = '16px';
    });
  });

  console.log('Website JavaScript loaded successfully!');
});