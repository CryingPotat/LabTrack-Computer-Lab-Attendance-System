document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("registerForm");

  // Eye toggle function
  function setupPasswordToggle(inputId, iconId) {
    const input = document.getElementById(inputId);
    const icon = document.getElementById(iconId);

    icon.addEventListener("click", () => {
      const isHidden = input.type === "password";
      input.type = isHidden ? "text" : "password";
      icon.classList.toggle("fa-eye");
      icon.classList.toggle("fa-eye-slash");
    });
  }

  setupPasswordToggle("password", "togglePassword");
  setupPasswordToggle("confirm-password", "toggleConfirmPassword");

  // Handle registration
  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const fullname = document.getElementById("fullname").value;
    const email = document.getElementById("email").value.trim().toLowerCase();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirm-password").value;
    const role = document.querySelector('input[name="role"]:checked');

    if (!role) {
      alert("Please select a role.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    if (email.length < 4) {
      alert("Please enter a valid email or ID number.");
      return;
    }

    // Load separated student/teacher lists
    let students = JSON.parse(localStorage.getItem("students")) || [];
    let teachers = JSON.parse(localStorage.getItem("teachers")) || [];

    // Decide where to save
    let targetList = role.value === "teacher" ? teachers : students;

    // Check if exists
    const exists = targetList.some((user) => user.email === email);
    if (exists) {
      alert("This email / ID number is already registered!");
      return;
    }

    const newUser = { fullname, email, password, role: role.value };

    // Save separately
    targetList.push(newUser);

    if (role.value === "teacher") {
      localStorage.setItem("teachers", JSON.stringify(targetList));
    } else {
      localStorage.setItem("students", JSON.stringify(targetList));
    }

    alert("Registration successful! Redirecting to login...");
    window.location.href = "../loginfile/login.html";
  });
});

