/* ==========================================================================
   Central Portfolio Config
   ========================================================================== */
const PORTFOLIO_CONFIG = {
  authorName: "Saksham Bhatnagar",
  email: "bhatnagarsaksham50@proton.me", 
  githubUrl: "https://github.com/sakshambhatnagar02", 
  gravatarUrl: "https://gravatar.com/sakshambhatnagar",
  activeYear: "2026"
};

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  setupContactFormHandler();
  initScrollAnimations();
});

// Strict filename detection to avoid false active matches
function getActivePage() {
  const pathname = window.location.pathname.toLowerCase().replace(/\/$/, "");

  if (pathname.endsWith("/about.html") || pathname.endsWith("/about")) return "about";
  if (pathname.endsWith("/projects.html") || pathname.endsWith("/projects")) return "projects";
  if (pathname.endsWith("/contact.html") || pathname.endsWith("/contact")) return "contact";

  return "home";
}

function renderHeader() {
  const headerContainer = document.getElementById("header-root");
  if (!headerContainer) return;

  const active = getActivePage();

  headerContainer.innerHTML = `
    <header id="site-header">
      <div class="container nav-wrapper">
        <a href="index.html" class="brand-logo" aria-label="Saksham Bhatnagar Portfolio">
          <i class="fa-solid fa-terminal"></i>
          <span>Saksham<span style="color: var(--sky-light);">.dev</span></span>
        </a>
        <button class="menu-toggle" id="menuToggle" aria-label="Toggle navigation menu">
          <i class="fa-solid fa-bars"></i>
        </button>
        <ul class="nav-links" id="navMenu">
          <li><a href="index.html" class="nav-link ${active === 'home' ? 'active' : ''}"><i class="fa-solid fa-house"></i> Home</a></li>
          <li><a href="about.html" class="nav-link ${active === 'about' ? 'active' : ''}"><i class="fa-solid fa-user"></i> About & Skills</a></li>
          <li><a href="projects.html" class="nav-link ${active === 'projects' ? 'active' : ''}"><i class="fa-solid fa-layer-group"></i> Projects</a></li>
          <li><a href="contact.html" class="nav-link ${active === 'contact' ? 'active' : ''}"><i class="fa-solid fa-paper-plane"></i> Contact</a></li>
        </ul>
      </div>
    </header>
  `;

  const toggleBtn = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  toggleBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    const isOpen = navMenu.classList.contains("open");
    toggleBtn.innerHTML = isOpen 
      ? '<i class="fa-solid fa-xmark"></i>' 
      : '<i class="fa-solid fa-bars"></i>';
  });
}

function renderFooter() {
  const footerContainer = document.getElementById("footer-root");
  if (!footerContainer) return;

  footerContainer.innerHTML = `
    <footer id="site-footer">
      <div class="container footer-content">
        <div>
          <p style="font-weight: 500; color: var(--silver-light);">
            &copy; ${PORTFOLIO_CONFIG.activeYear} ${PORTFOLIO_CONFIG.authorName} &bull; Built with precision and code.
          </p>
          <p style="font-size: 0.85rem; color: var(--silver); margin-top: 0.3rem;">
            Class 12 Non-Medical &bull; IITian Classes, Bathinda &bull; Gurdaspur, India <span class="fi fi-in"></span>
          </p>
        </div>
        <div class="social-links">
          <a href="${PORTFOLIO_CONFIG.githubUrl}" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub Profile">
            <i class="fa-brands fa-github"></i>
          </a>
          <a href="${PORTFOLIO_CONFIG.gravatarUrl}" target="_blank" rel="noopener noreferrer" class="social-link" title="Gravatar Profile">
            <img src="assets/img/gravatar.svg" alt="Gravatar" class="social-svg-icon">
          </a>
          <a href="mailto:${PORTFOLIO_CONFIG.email}" class="social-link" title="Send Direct Email">
            <i class="fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
  `;
}

// Mailto Redirect Form Handler
function setupContactFormHandler() {
  const form = document.getElementById("portfolio-contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("form-name").value.trim();
    const senderEmail = document.getElementById("form-email").value.trim();
    const userMessage = document.getElementById("form-message").value.trim();

    if (!name || !senderEmail || !userMessage) return;

    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const bodyContent = encodeURIComponent(
      `Hello Saksham,\n\nYou have received a new message from your portfolio contact form:\n\n` +
      `Name: ${name}\n` +
      `Email: ${senderEmail}\n\n` +
      `Message:\n${userMessage}\n\n` +
      `Sent via Saksham.dev Portfolio Form`
    );

    window.location.href = `mailto:${PORTFOLIO_CONFIG.email}?subject=${subject}&body=${bodyContent}`;
  });
}

// Lightweight Scroll-Reveal Observer
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll(".animate-reveal");
  if (!animatedElements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  animatedElements.forEach((el) => observer.observe(el));
}