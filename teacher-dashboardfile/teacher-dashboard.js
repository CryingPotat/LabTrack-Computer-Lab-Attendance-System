/* -------------------- TEACHER DASHBOARD SCRIPT -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Teacher Dashboard Loaded");

  /* -------------------- FIX: CLEAR studentName ON TEACHER DASHBOARD -------------------- */
  localStorage.removeItem("studentName");

  /* -------------------- LOGIN CHECK -------------------- */
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // If user is not logged in OR not teacher → redirect silently
  if (!loggedUser || loggedUser.role !== "teacher") {
    redirectToLogin();  // No alert
    return;
  }

  /* -------------------- DISPLAY TEACHER NAME -------------------- */
  const teacherName = document.getElementById("teacherName");
  teacherName.textContent = loggedUser.fullname;

  /* -------------------- ELEMENT SELECTORS -------------------- */
  const profileButton = document.getElementById("profileButton");
  const navItems = document.querySelectorAll(".menu-list .nav-item");
  const announcementList = document.querySelector(".announcement-list");
  const labsScrollArea = document.querySelector(".labs-scroll-area");
  const logoutButton = document.querySelector(".logout");

  /* -------------------- DASHBOARD DATA -------------------- */
  const teacherData = {
    announcements: [
      "No Updates.",
      
    ],
    classSections: [
      { code: "BSIT 3K - CSIT 311", img: "csit311.png", color: "grey" },
      { code: "BSIT 1T - IT 101", img: "it101.png", color: "blue" },
      { code: "BSIT 2K - CSIT 212", img: "csit212.png", color: "grey" }
    ]
  };

  /* -------------------- SIDEBAR NAVIGATION -------------------- */
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });
  });

  /* -------------------- PROFILE BUTTON -------------------- */
  profileButton.addEventListener("click", () => {
    alert(`Logged in as: ${loggedUser.fullname}`);
  });

  /* -------------------- LOGOUT FUNCTION -------------------- */
  logoutButton.addEventListener("click", () => {
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("loggedInUser");
      fadeAndRedirectToLogin();
    }
  });

  /* -------------------- LOAD ANNOUNCEMENTS -------------------- */
  announcementList.innerHTML = "";
  teacherData.announcements.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    announcementList.appendChild(p);
  });

  /* -------------------- LOAD CLASS SECTIONS -------------------- */
  labsScrollArea.innerHTML = "";
  teacherData.classSections.forEach(cls => {
    const card = document.createElement("a");
    card.href = "#";
    card.className = `lab-card lab-card-${cls.color}`;
    card.innerHTML = `
      <div class="lab-details">
        <p class="course-code">${cls.code}</p>
      </div>
      <div class="lab-image">
        <img src="${cls.img}" alt="${cls.code}" width="50">
      </div>
    `;
    card.addEventListener("click", () => {
      alert(`${cls.code}`);
    });
    labsScrollArea.appendChild(card);
  });

  /* -------------------- REDIRECT TO LOGIN -------------------- */
  function redirectToLogin() {
    window.location.href = "../loginfile/login.html"; // Silent redirect
  }

  function fadeAndRedirectToLogin() {
    document.body.style.transition = "opacity 0.4s ease";
    document.body.style.opacity = "0";
    setTimeout(() => redirectToLogin(), 400);
  }
});

