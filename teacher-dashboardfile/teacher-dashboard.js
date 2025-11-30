/* -------------------- TEACHER DASHBOARD SCRIPT -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Teacher Dashboard Loaded");

  /* -------------------- LOGIN CHECK -------------------- */
  const savedName = localStorage.getItem("teacherName");
  const teacherName = document.getElementById("teacherName");

  if (!savedName) {
    alert("Please log in first.");
    redirectToLogin();
    return;
  }

  // Display teacher's name in header
  teacherName.textContent = savedName;

  /* -------------------- ELEMENT SELECTORS -------------------- */
  const profileButton = document.getElementById("profileButton");
  const navItems = document.querySelectorAll(".menu-list .nav-item");
  const announcementList = document.querySelector(".announcement-list");
  const labsScrollArea = document.querySelector(".labs-scroll-area");
  const logoutButton = document.querySelector(".logout");

  /* -------------------- STATIC DASHBOARD DATA -------------------- */
  const teacherData = {
        classSections: [
      {
        code: "BSIT 3K - CSIT 311",
        img: "csit311.png",
        color: "grey"
      },
      {
        code: "BSIT 1T - IT 101",
        img: "it101.png",
        color: "blue"
      },
      {
        code: "BSIT 2K - CSIT 212",
        img: "csit212.png",
        color: "grey"
      }
    ]
  };

  /* -------------------- SIDEBAR NAVIGATION -------------------- */
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
      console.log(`Navigated to: ${item.textContent.trim()}`);
    });
  });

  /* -------------------- PROFILE BUTTON -------------------- */
  profileButton.addEventListener("click", () => {
    alert(`👤 Logged in as: ${savedName}`);
  });

  /* -------------------- LOGOUT FUNCTION -------------------- */
  logoutButton.addEventListener("click", () => {
    const confirmLogout = confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("teacherName");
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";
      setTimeout(() => redirectToLogin(), 500);
    }
  });

  /* -------------------- LOAD ANNOUNCEMENTS -------------------- */
  if (teacherData.announcements.length > 0) {
    announcementList.classList.remove("no-content");
    announcementList.innerHTML = "";
    teacherData.announcements.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      announcementList.appendChild(p);
    });
  }

  /* -------------------- LOAD CLASS SECTIONS -------------------- */
  if (teacherData.classSections.length > 0) {
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
        alert(`📘 ${cls.code}`);
      });

      labsScrollArea.appendChild(card);
    });
  }

  /* -------------------- LOGIN REDIRECT FUNCTION -------------------- */
  function redirectToLogin() {
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf("/"));
    window.location.href = `${basePath}/../loginfile/login.html`;
  }
});
