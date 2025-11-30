/* -------------------- LOGIN SCRIPT -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const emailInput = document.getElementById("username-input");
  const passwordInput = document.getElementById("password-input");
  const loginBtn = document.querySelector(".login");
  const cancelBtn = document.querySelector(".cancel");
  const togglePassword = document.querySelector("#togglePassword");

  /* -------------------- TOGGLE PASSWORD VISIBILITY -------------------- */
  if (togglePassword) {
    togglePassword.addEventListener("click", () => {
      const isPassword = passwordInput.type === "password";
      passwordInput.type = isPassword ? "text" : "password";
      togglePassword.classList.toggle("fa-eye");
      togglePassword.classList.toggle("fa-eye-slash");
    });
  }

  /* -------------------- LOGIN BUTTON -------------------- */
  loginBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    resetStyles();

    if (!email || !password) {
      alert("⚠️ Please fill in all fields.");
      if (!email) highlightError(emailInput);
      if (!password) highlightError(passwordInput);
      return;
    }

    //  TEACHER LOGIN
    if (email === "teacher01" && password === "54321") {
      localStorage.setItem("teacherName", "Prof. Agustin");
      fadeAndRedirect("../teacher-dashboardfile/teacher-dashboard.html");
      return;
    }

    //  STUDENT LOGIN
    if (email === "student01" && password === "12345") {
      localStorage.setItem("studentName", "Ramyrrh Joshua Talimay");
      fadeAndRedirect("../student-dashboardfile/student-dashboard.html");
      return;
    }

    //  INVALID LOGIN
    alert("❌ Invalid username or password.");
    highlightError(passwordInput);
  });

  /* -------------------- CANCEL BUTTON -------------------- */
  cancelBtn.addEventListener("click", () => {
    emailInput.value = "";
    passwordInput.value = "";
    resetStyles();
  });

  /* -------------------- LIVE INPUT HIGHLIGHT -------------------- */
  [emailInput, passwordInput].forEach((input) => {
    input.addEventListener("input", () => {
      input.style.borderColor = "#FF3B3B";
      input.style.boxShadow = "0 0 6px rgba(255, 59, 59, 0.6)";
    });
  });

  /* -------------------- HELPER FUNCTIONS -------------------- */
  function fadeAndRedirect(targetPath) {
    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "0";
    setTimeout(() => {
      const currentPath = window.location.pathname;
      const basePath = currentPath.substring(0, currentPath.lastIndexOf("/"));
      window.location.href = `${basePath}/${targetPath}`;
    }, 500);
  }

  function resetStyles() {
    [emailInput, passwordInput].forEach((input) => {
      input.style.borderColor = "#ccc";
      input.style.boxShadow = "none";
    });
  }

  function highlightError(input) {
    input.style.borderColor = "red";
    input.style.boxShadow = "0 0 6px rgba(255, 0, 0, 0.6)";
    input.classList.add("shake");
    setTimeout(() => input.classList.remove("shake"), 500);
  }
});

