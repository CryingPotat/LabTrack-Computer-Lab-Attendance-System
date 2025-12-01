document.addEventListener("DOMContentLoaded", () => {
  console.log("Teacher Class List Page Loaded");

  // -------------------- LOGIN CHECK --------------------
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedUser || loggedUser.role !== "teacher") {
    redirectToLogin();
    return;
  }

  // -------------------- DISPLAY TEACHER NAME --------------------
  const teacherName = document.getElementById("teacherName");
  teacherName.textContent = loggedUser.fullname;

  // -------------------- ELEMENT SELECTORS --------------------
  const profileButton = document.getElementById("profileButton");
  const logoutButton = document.querySelector(".logout");
  const navItems = document.querySelectorAll(".menu-list .nav-item");
  const labsScrollArea = document.querySelector(".labs-scroll-area");

  // -------------------- AUTO HIGHLIGHT CURRENT MENU --------------------
  navItems.forEach(item => {
    const link = item.querySelector("a");

    // Only highlight Class Section for this page
    if (link.textContent.includes("Class Section")) {
      item.classList.add("active");
    } else {
      item.classList.remove("active");
    }
  });

  // -------------------- PROFILE BUTTON --------------------
  profileButton.addEventListener("click", () => {
    alert(`Logged in as: ${loggedUser.fullname}`);
  });

  // -------------------- LOGOUT --------------------
  logoutButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("loggedInUser");
      fadeAndRedirectToLogin();
    }
  });

  // -------------------- DYNAMIC CLASS LIST --------------------
  const teacherClasses = [
    { code: "BSIT 3K - CSIT 311", section: "Section C", color: "grey", img: "csit311.png" },
    { code: "BSIT 1T - IT 101", section: "Section A", color: "blue", img: "it101.png" },
    { code: "BSIT 2K - CSIT 212", section: "Section B", color: "grey", img: "csit212.png" }
  ];

  labsScrollArea.innerHTML = "";
  teacherClasses.forEach(cls => {
    const classCard = document.createElement("div");
    classCard.className = `lab-card lab-card-${cls.color}`;
    classCard.innerHTML = `
      <div class="lab-details">
        <p class="course-code">${cls.code}</p>
        <p class="section">${cls.section}</p>
      </div>
      <div class="lab-image">
        <img src="${cls.img}" alt="${cls.code}" width="50">
      </div>
    `;
    labsScrollArea.appendChild(classCard);
  });

  // -------------------- REDIRECT TO LOGIN --------------------
  function redirectToLogin() {
    window.location.href = "../loginfile/login.html";
  }

  function fadeAndRedirectToLogin() {
    document.body.style.transition = "opacity 0.4s ease";
    document.body.style.opacity = "0";
    setTimeout(() => redirectToLogin(), 400);
  }
});


