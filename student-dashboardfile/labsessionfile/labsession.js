document.addEventListener("DOMContentLoaded", () => {
  console.log("Lab Session Page Loaded");

  // -------------------- LOGIN CHECK --------------------
  const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!loggedUser || loggedUser.role !== "student") {
    redirectToLogin();
    return;
  }

  // -------------------- DISPLAY STUDENT NAME --------------------
  const studentName = document.getElementById("studentName");
  studentName.textContent = loggedUser.fullname;

  // -------------------- ELEMENT SELECTORS --------------------
  const profileButton = document.getElementById("profileButton");
  const logoutButton = document.querySelector(".logout");
  const navItems = document.querySelectorAll(".menu-list .nav-item");
  const upcomingLabsContainer = document.querySelector(".labs-scroll-area");

  // -------------------- AUTO HIGHLIGHT CURRENT MENU --------------------
  navItems.forEach(item => {
    const link = item.querySelector("a");
    if (link.href === window.location.href) {
      item.classList.add("active"); // Highlight current page
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

  // -------------------- UPCOMING LABS DATA --------------------
  const upcomingLabs = [
    { code: "CSIT 311 - LAB C", time: "3:00 PM - 5:00 PM", date: "October 21, 3031", color: "grey", icon: "fa-computer" },
    { code: "IT 312 - OPEN LAB", time: "6:00 PM - 7:00 PM", date: "October 21, 3031", color: "blue", icon: "fa-microchip" },
    { code: "CSIT 401 - RESEARCH", time: "8:00 AM - 10:00 AM", date: "October 22, 3031", color: "grey", icon: "fa-flask" },
    { code: "IT 213 - OPEN LAB", time: "10:00 AM - 11:00 AM", date: "October 23, 3031", color: "blue", icon: "fa-microchip" }
  ];

  // -------------------- GENERATE LAB CARDS --------------------
  upcomingLabsContainer.innerHTML = "";
  upcomingLabs.forEach(lab => {
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
