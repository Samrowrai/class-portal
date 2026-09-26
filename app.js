/*
  Demo-only client-side session handling.
  There is no real backend here — credentials are checked in the browser,
  which means anyone can read them in this file. Fine for a prototype;
  swap in a real auth API before this goes to real users.
*/

const DEMO_ID = "demo";
const DEMO_PASSWORD = "demo123";
const SESSION_KEY = "site_session"; // "member" | "visitor"

function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

function setSession(value) {
  localStorage.setItem(SESSION_KEY, value);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

// Call at the top of any page that requires at least a visitor session.
// If nobody is signed in at all, bounce to the login page.
function requireAnySession() {
  if (!getSession()) {
    window.location.href = "index.html";
  }
}

// Call at the top of pages that are members-only.
// Visitors get sent to home.html with a message; signed-out users to login.
function requireMember() {
  const session = getSession();
  if (!session) {
    window.location.href = "index.html";
    return;
  }
  if (session === "visitor") {
    window.location.href = "home.html?blocked=1";
  }
}

function renderWho() {
  const el = document.getElementById("who");
  if (!el) return;
  const session = getSession();
  if (session === "member") {
    el.innerHTML = '<span class="badge badge-member">Signed in</span> demo';
  } else {
    el.innerHTML = '<span class="badge badge-visitor">Visitor</span>';
  }
}

function logout() {
  clearSession();
  window.location.href = "index.html";
}

// ---- Login page wiring ----
function initLoginForm() {
  const form = document.getElementById("login-form");
  if (!form) return;
  const errorEl = document.getElementById("login-error");

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    const id = document.getElementById("login-id").value.trim();
    const pw = document.getElementById("login-password").value;

    if (id === DEMO_ID && pw === DEMO_PASSWORD) {
      setSession("member");
      window.location.href = "home.html";
    } else {
      errorEl.textContent = "That ID and password don't match. Try demo / demo123, or continue as a visitor.";
    }
  });

  const visitorLink = document.getElementById("visitor-link");
  if (visitorLink) {
    visitorLink.addEventListener("click", function (e) {
      e.preventDefault();
      setSession("visitor");
      window.location.href = "home.html";
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  initLoginForm();
  renderWho();

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.addEventListener("click", logout);

  // Show a "that page needs an account" notice if we were redirected here
  const params = new URLSearchParams(window.location.search);
  const notice = document.getElementById("blocked-notice");
  if (notice && params.get("blocked") === "1") {
    notice.style.display = "block";
  }
});
