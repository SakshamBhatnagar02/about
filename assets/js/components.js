/* ==========================================================================
   Central Portfolio Config
   Update your genuine contact & profile links once here.
   ========================================================================== */
const PORTFOLIO_CONFIG = {
  authorName: "Saksham Bhatnagar",
  // Replace with your real contact email and GitHub URL
  email: "bhatnagarsaksham50@proton.me", 
  githubUrl: "https://github.com/SakshamBhatnagar02", 
  activeYear: "2026"
};

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  setupContactFormHandler();
});

// Identify active navigation view
function getActivePage() {
  const path = window.location.pathname.toLowerCase();
  if (path.includes("about")) return "about";
  if (path.includes("projects")) return "projects";
  if (path.includes("contact")) return "contact";
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
            Class 12 Non-Medical &bull; JEE Aspirant &bull; Web & Application Developer
          </p>
        </div>
        <div class="social-links">
          <a href="${PORTFOLIO_CONFIG.githubUrl}" target="_blank" rel="noopener noreferrer" class="social-link" title="GitHub Profile">
            <i class="fa-brands fa-github"></i>
          </a>
          <a href="mailto:${PORTFOLIO_CONFIG.email}" class="social-link" title="Send Direct Email">
            <i class="fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
  `;
}

// Redirects form input into an email client mailto URL
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

    // Automatically launches user's default email client
    window.location.href = `mailto:${PORTFOLIO_CONFIG.email}?subject=${subject}&body=${bodyContent}`;
  });
}