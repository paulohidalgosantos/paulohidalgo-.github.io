// Mobile menu functionality
document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburgers = document.querySelectorAll('.hamburger');
  
  mobileMenuBtn.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    
    // Animate hamburger menu
    hamburgers.forEach((hamburger, index) => {
      if (mobileMenu.classList.contains('active')) {
        if (index === 0) {
          hamburger.style.transform = 'rotate(45deg) translate(6px, 6px)';
        } else if (index === 1) {
          hamburger.style.opacity = '0';
        } else if (index === 2) {
          hamburger.style.transform = 'rotate(-45deg) translate(6px, -6px)';
        }
      } else {
        hamburger.style.transform = 'none';
        hamburger.style.opacity = '1';
      }
    });
  });

  // Close mobile menu when clicking on a link
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
      mobileMenu.classList.remove('active');
      hamburgers.forEach(hamburger => {
        hamburger.style.transform = 'none';
        hamburger.style.opacity = '1';
      });
    });
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Active navigation link highlighting
function updateActiveNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
  
  let current = '';
  const scrollPosition = window.pageYOffset + 100;

  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;
    
    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('data-section') === current) {
      link.classList.add('active');
    }
  });
}

// Scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll('.education-card, .experience-card, .skill-card, .stat-card, .placeholder-card');
  const windowHeight = window.innerHeight;
  
  elements.forEach(element => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;
    
    if (elementTop < windowHeight - elementVisible) {
      element.classList.add('fade-in');
    }
  });
}

// Navbar background on scroll
function updateNavbarBackground() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(15, 23, 42, 0.98)';
  } else {
    navbar.style.background = 'rgba(15, 23, 42, 0.95)';
  }
}

// Contact form handling
document.querySelector('.contact-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Get form data
  const formData = new FormData(this);
  const name = formData.get('name');
  const email = formData.get('email');
  const message = formData.get('message');
  
  // Create mailto link
  const subject = encodeURIComponent(`Contato de ${name} - Portfólio`);
  const body = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`);
  const mailtoLink = `mailto:paulo_hidalgo_santos@live.com?subject=${subject}&body=${body}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  // Reset form
  this.reset();
  
  // Show success message (optional)
  alert('Obrigado pelo contato! Seu cliente de email será aberto para enviar a mensagem.');
});

// Parallax effect for hero section
function parallaxEffect() {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero-section');
  const heroContent = document.querySelector('.hero-content');
  
  if (heroSection && heroContent) {
    const rate = scrolled * -0.5;
    heroContent.style.transform = `translateY(${rate}px)`;
  }
}

// Typing effect for hero title (optional enhancement)
function typeWriter() {
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    const text = heroName.textContent;
    heroName.textContent = '';
    heroName.style.borderRight = '2px solid #06b6d4';
    
    let i = 0;
    function type() {
      if (i < text.length) {
        heroName.textContent += text.charAt(i);
        i++;
        setTimeout(type, 100);
      } else {
        setTimeout(() => {
          heroName.style.borderRight = 'none';
        }, 1000);
      }
    }
    
    setTimeout(type, 1000);
  }
}

// Initialize all functions
window.addEventListener('scroll', function() {
  updateActiveNavLink();
  animateOnScroll();
  updateNavbarBackground();
  parallaxEffect();
});

window.addEventListener('load', function() {
  updateActiveNavLink();
  animateOnScroll();
  typeWriter();
});

// Resize handler
window.addEventListener('resize', function() {
  // Close mobile menu on resize
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburgers = document.querySelectorAll('.hamburger');
  
  if (window.innerWidth > 768) {
    mobileMenu.classList.remove('active');
    hamburgers.forEach(hamburger => {
      hamburger.style.transform = 'none';
      hamburger.style.opacity = '1';
    });
  }
});

// Intersection Observer for better performance
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
  const elementsToObserve = document.querySelectorAll('.education-card, .experience-card, .skill-card, .stat-card, .placeholder-card');
  elementsToObserve.forEach(element => {
    observer.observe(element);
  });
});

// Add loading animation
window.addEventListener('load', function() {
  document.body.classList.add('loaded');
});

// Smooth reveal animations for sections
const revealSections = function() {
  const sections = document.querySelectorAll('.section');
  
  sections.forEach(section => {
    const sectionTop = section.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    
    if (sectionTop < windowHeight * 0.8) {
      section.style.opacity = '1';
      section.style.transform = 'translateY(0)';
    }
  });
};

// Initialize section reveal
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
  });
  
  revealSections();
});

window.addEventListener('scroll', revealSections);

// Add smooth hover effects
document.addEventListener('DOMContentLoaded', function() {
  // Add hover effect to cards
  const cards = document.querySelectorAll('.education-card, .experience-card, .skill-card');
  
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });
});