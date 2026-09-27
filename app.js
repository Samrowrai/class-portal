const SESSION_KEY = "site_session"; // "member" | "visitor"
const NAME_KEY = "student_name";

function getSession() {
  return localStorage.getItem(SESSION_KEY);
}

function setSession(value) {
  localStorage.setItem(SESSION_KEY, value);
}

function clearSession() {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(NAME_KEY);
}

// Call at the top of any page that requires at least a visitor session.
function requireAnySession() {
  if (!getSession()) {
    window.location.href = "index.html";
  }
}

// Call at the top of pages that are members-only.
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
    const name = localStorage.getItem(NAME_KEY) || "Student";
    el.innerHTML = '<span class="badge badge-member">Signed in</span> ' + name;
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

  form.addEventListener("submit", async function (e) {
    e.preventDefault();
    errorEl.textContent = "";

    const id = document.getElementById("login-id").value.trim();
    const password = document.getElementById("login-password").value;

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password })
      });
      const data = await response.json();

      if (data.ok) {
        setSession("member");
        localStorage.setItem(NAME_KEY, data.name || data.id);
        window.location.href = "home.html";
      } else {
        errorEl.textContent = data.error || "Sign in failed.";
      }
    } catch (err) {
      errorEl.textContent = "Couldn't reach the server. Try again in a moment.";
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

  const params = new URLSearchParams(window.location.search);

  const notice = document.getElementById("blocked-notice");
  if (notice && params.get("blocked") === "1") {
    notice.style.display = "block";
  }
});
