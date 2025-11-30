/* -------------------- STUDENT DASHBOARD SCRIPT -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ Student Dashboard Loaded");

  /* -------------------- LOGIN CHECK -------------------- */
  const savedName = localStorage.getItem("studentName");
  const studentName = document.getElementById("studentName");

  // If user is not logged in, redirect to login page
  if (!savedName) {
    alert("Please log in first.");
    redirectToLogin();
    return;
  }

  // Display student's name in the header
  studentName.textContent = savedName;

  /* -------------------- ELEMENT SELECTORS -------------------- */
  const profileButton = document.getElementById("profileButton");
  const navItems = document.querySelectorAll(".menu-list .nav-item");
  const announcementList = document.querySelector(".announcement-list");
  const upcomingLabsContainer = document.querySelector(".labs-scroll-area");
  const logoutButton = document.querySelector(".logout");

  /* -------------------- STATIC DASHBOARD DATA -------------------- */
  const userData = {
    upcomingLabs: [
      {
        code: "CSIT 311 - LAB C",
        time: "3:00 PM - 5:00 PM",
        date: "OCTOBER 21, 3031",
        color: "grey",
        icon: "fa-computer"
      },
      {
        code: "IT 312 - OPEN LAB",
        time: "6:00 PM - 7:00 PM",
        date: "OCTOBER 21, 3031",
        color: "blue",
        icon: "fa-microchip"
      },
      {
        code: "CSIT 401 - RESEARCH",
        time: "8:00 AM - 10:00 AM",
        date: "OCTOBER 22, 3031",
        color: "grey",
        icon: "fa-flask"
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
      // Remove stored login and fade out
      localStorage.removeItem("studentName");
      document.body.style.transition = "opacity 0.5s ease";
      document.body.style.opacity = "0";

      // Redirect back to login after short delay
      setTimeout(() => {
        redirectToLogin();
      }, 500);
    }
  });

  /* -------------------- LOAD ANNOUNCEMENTS -------------------- */
  if (userData.announcements.length > 0) {
    announcementList.classList.remove("no-content");
    announcementList.innerHTML = "";

    userData.announcements.forEach(text => {
      const p = document.createElement("p");
      p.textContent = text;
      announcementList.appendChild(p);
    });
  }

  /* -------------------- LOAD UPCOMING LABS -------------------- */
  if (userData.upcomingLabs.length > 0) {
    upcomingLabsContainer.innerHTML = "";

    userData.upcomingLabs.forEach(lab => {
      const labCard = document.createElement("a");
      labCard.href = "#";
      labCard.className = `lab-card lab-card-${lab.color}`;
      labCard.innerHTML = `
        <div class="lab-details">
          <p class="course-code">${lab.code}</p>
          <p class="time">${lab.time}</p>
          <p class="date">${lab.date}</p>
        </div>
        <div class="lab-image">
          <i class="fa-solid ${lab.icon}"></i>
        </div>
      `;

      labCard.addEventListener("click", () => {
        alert(`📘 ${lab.code}\n🕒 ${lab.time}\n📅 ${lab.date}`);
      });

      upcomingLabsContainer.appendChild(labCard);
    });
  }

  /* -------------------- LOGIN REDIRECT FUNCTION -------------------- */
  function redirectToLogin() {
    // Works regardless of folder structure (student-dashboardfile → loginfile)
    const currentPath = window.location.pathname;
    const basePath = currentPath.substring(0, currentPath.lastIndexOf("/"));
    window.location.href = `${basePath}/../loginfile/login.html`;
  }
});

