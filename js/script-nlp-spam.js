/* ========================================
   NLP SPAM DATA CLEANING TUTORIAL
   Interactive Script
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // --- Element References ---
  const themeToggle = document.getElementById('theme-toggle');
  const themeLabel = document.getElementById('theme-label');
  const sidebarLeft = document.getElementById('sidebar-left');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const overlay = document.getElementById('overlay');
  const scrollTopBtn = document.getElementById('scroll-top');
  const progressFill = document.getElementById('progress-fill');
  const progressText = document.getElementById('progress-text');
  const sidebarLinks = document.querySelectorAll('.sidebar__link');
  const stepSections = document.querySelectorAll('.step-section');
  const copyButtons = document.querySelectorAll('.formula-block__copy');

  // --- Constants ---
  const TOTAL_STEPS = stepSections.length;

  // ========================================
  // DARK MODE
  // ========================================
  function getStoredTheme() {
    return localStorage.getItem('nlp-spam-theme') || 'light';
  }

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('nlp-spam-theme', theme);
    themeLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
  }

  // Initialize theme
  setTheme(getStoredTheme());

  themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    setTheme(current === 'dark' ? 'light' : 'dark');
  });

  // ========================================
  // MOBILE SIDEBAR
  // ========================================
  function openSidebar() {
    sidebarLeft.classList.add('open');
    mobileMenuBtn.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSidebar() {
    sidebarLeft.classList.remove('open');
    mobileMenuBtn.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileMenuBtn.addEventListener('click', () => {
    if (sidebarLeft.classList.contains('open')) {
      closeSidebar();
    } else {
      openSidebar();
    }
  });

  overlay.addEventListener('click', closeSidebar);

  // Close sidebar when clicking a link on mobile
  sidebarLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });

  // ========================================
  // SCROLL SPY (Active sidebar link)
  // ========================================
  const readSections = new Set();

  function updateActiveLink() {
    const scrollY = window.scrollY;
    const headerHeight = 72;
    let currentSection = null;

    stepSections.forEach(section => {
      const sectionTop = section.offsetTop - headerHeight - 100;
      const sectionBottom = sectionTop + section.offsetHeight;

      if (scrollY >= sectionTop && scrollY < sectionBottom) {
        currentSection = section.id;
      }
    });

    if (currentSection) {
      // Update Left Sidebar
      sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === `#${currentSection}`) {
          link.classList.add('active');
          if (currentSection.startsWith('step-')) {
            readSections.add(currentSection);
          }
        } else {
          link.classList.remove('active');
        }
      });

      updateProgress();
    }
  }

  function updateProgress() {
    const count = readSections.size;
    const percent = Math.round((count / TOTAL_STEPS) * 100);
    progressFill.style.width = `${percent}%`;
    progressText.textContent = `${count} / ${TOTAL_STEPS}`;
  }

  // Throttled scroll handler
  let scrollTicking = false;
  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        updateActiveLink();
        scrollTicking = false;
      });
      scrollTicking = true;
    }
  });

  // ========================================
  // INTERSECTION OBSERVER (Animate in)
  // ========================================
  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.1
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, observerOptions);

  stepSections.forEach(section => {
    sectionObserver.observe(section);
  });

  // Also observe dataset preview
  const datasetPreview = document.querySelector('.dataset-preview');
  if (datasetPreview) {
    datasetPreview.style.opacity = '0';
    datasetPreview.style.transform = 'translateY(20px)';
    datasetPreview.style.transition = 'opacity 0.6s ease, transform 0.6s ease';

    const previewObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });

    previewObserver.observe(datasetPreview);
  }

  // ========================================
  // COPY TO CLIPBOARD
  // ========================================
  copyButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const textToCopy = button.getAttribute('data-copy');

      try {
        await navigator.clipboard.writeText(textToCopy);
        const originalText = button.innerHTML;
        button.innerHTML = '<i data-lucide="check"></i> Copied!';
        if (typeof lucide !== 'undefined') {
          lucide.createIcons({ root: button });
        }
        button.classList.add('copied');

        setTimeout(() => {
          button.innerHTML = originalText;
          button.classList.remove('copied');
        }, 2000);
      } catch (err) {
        // Fallback for older browsers
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);

        const originalText = button.innerHTML;
        button.innerHTML = '<i data-lucide="check"></i> Copied!';
        if (typeof lucide !== 'undefined') {
          lucide.createIcons({ root: button });
        }
        button.classList.add('copied');

        setTimeout(() => {
          button.innerHTML = originalText;
          button.classList.remove('copied');
        }, 2000);
      }
    });
  });

  // ========================================
  // SCROLL TO TOP
  // ========================================
  function toggleScrollTopButton() {
    if (window.scrollY > 500) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', () => {
    if (!scrollTicking) {
      window.requestAnimationFrame(() => {
        toggleScrollTopButton();
      });
    }
  });

  // Also check on load
  toggleScrollTopButton();

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ========================================
  // HERO STATS ANIMATION (Count up)
  // ========================================
  function animateCountUp(element, target, duration = 1500) {
    const isNumber = !isNaN(parseInt(target));
    if (!isNumber) return;

    const targetNum = parseInt(target);
    const start = 0;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(start + (targetNum - start) * eased);

      element.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  // Observe hero stats
  const heroStats = document.querySelectorAll('.hero__stat-value');
  const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target.textContent;
        animateCountUp(entry.target, target);
        heroObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  heroStats.forEach(stat => heroObserver.observe(stat));

  // ========================================
  // INITIALIZE LUCIDE ICONS
  // ========================================
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // ========================================
  // INITIAL STATE
  // ========================================
  updateActiveLink();
});
