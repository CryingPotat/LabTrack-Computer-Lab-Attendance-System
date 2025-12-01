document.addEventListener("DOMContentLoaded", () => {
  console.log("Notifications Page Loaded");

  /* -------------------- MENU NAVIGATION -------------------- */
  const menuItems = document.querySelectorAll(".menu-list .nav-item");

  menuItems.forEach(item => {
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
          fadeAndRedirect("../../loginfile/Login.html");
        }
      }
    });
  });

  /* -------------------- BACK BUTTON -------------------- */
  const backBtn = document.querySelector(".back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      fadeAndRedirect("../student-dashboardfile/student-dashboard.html");
    });
  }

  /* -------------------- FADE AND REDIRECT FUNCTION -------------------- */
  function fadeAndRedirect(url) {
    document.body.style.transition = "opacity 0.5s";
    document.body.style.opacity = 0;

    setTimeout(() => {
      window.location.href = url;
    }, 500); // Wait 0.5s for fade
  }
});

