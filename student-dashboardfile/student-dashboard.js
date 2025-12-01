/* -------------------- STUDENT DASHBOARD SCRIPT -------------------- */
document.addEventListener("DOMContentLoaded", () => {
  console.log("Student Dashboard Loaded");

  /* -------------------- LOGIN CHECK -------------------- */
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));

  // Prevent access if user is not logged in OR is not a student
  if (!loggedUser || loggedUser.role !== "student") {
    redirectToLogin(); // Silent redirect
    return;
  }

  /* -------------------- DISPLAY STUDENT NAME -------------------- */
  const studentName = document.getElementById("studentName");
  studentName.textContent = loggedUser.fullname;

  /* -------------------- ELEMENT SELECTORS -------------------- */
  const profileButton = document.getElementById("profileButton");
  const navItems = document.querySelectorAll(".menu-list .nav-item");
  const announcementList = document.querySelector(".announcement-list");
  const upcomingLabsContainer = document.querySelector(".labs-scroll-area");
  const logoutButton = document.querySelector(".logout");

  /* -------------------- STATIC DASHBOARD DATA -------------------- */
  const userData = {
    announcements: [
      "System maintenance this weekend."
    ],
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
    // Highlight active menu
    item.addEventListener("click", () => {
      navItems.forEach(i => i.classList.remove("active"));
      item.classList.add("active");
    });

    // Handle redirects
    item.addEventListener("click", (event) => {
      const text = item.textContent.trim();

      if (text.includes("Home")) {
        fadeAndRedirect("../student-dashboardfile/student-dashboard.html");
      } else if (text.includes("Lab Session")) {
        fadeAndRedirect("../labsessionfile/labsession.html");
      } else if (text.includes("Notification")) {
        fadeAndRedirect("notifications.html");
      } else if (text.includes("Log out")) {
        event.preventDefault();
        if (confirm("Are you sure you want to log out?")) {
          localStorage.removeItem("loggedInUser");
          fadeAndRedirect("../loginfile/Login.html");
        }
      }
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
  userData.announcements.forEach(text => {
    const p = document.createElement("p");
    p.textContent = text;
    announcementList.appendChild(p);
  });

  /* -------------------- LOAD UPCOMING LABS -------------------- */
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
      alert(`${lab.code}\n${lab.time}\n${lab.date}`);
    });
    upcomingLabsContainer.appendChild(labCard);
  });

  /* -------------------- REDIRECT FUNCTIONS -------------------- */
  function redirectToLogin() {
    window.location.href = "../loginfile/login.html";
  }

  function fadeAndRedirectToLogin() {
    document.body.style.transition = "opacity 0.4s ease";
    document.body.style.opacity = "0";
    setTimeout(() => redirectToLogin(), 400);
  }

  function fadeAndRedirect(url) {
    document.body.style.transition = "opacity 0.4s ease";
    document.body.style.opacity = "0";
    setTimeout(() => window.location.href = url, 400);
  }
});

