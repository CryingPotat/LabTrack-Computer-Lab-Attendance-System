document.addEventListener("DOMContentLoaded", () => {
  console.log("Notifications Page Loaded");

  /* -------------------- MENU NAVIGATION -------------------- */
  const menuItems = document.querySelectorAll(".menu-list .nav-item");

  menuItems.forEach(item => {
    item.addEventListener("click", (event) => {
      const text = item.textContent.trim();

      switch (text) {
        case "Home":
          fadeAndRedirect("../student-dashboardfile/student-dashboard.html");
          break;

        case "Lab Session":
          fadeAndRedirect("../labs/labs.html");
          break;

        case "Notification":
          fadeAndRedirect("notifications.html");
          break;

        case "Log out":
          // Prevent default link behavior (important!)
          event.preventDefault();

          // Confirm logout
          if (confirm("Are you sure you want to log out?")) {
            localStorage.removeItem("loggedInUser");
            fadeAndRedirect("../../loginfile/login.html");
          }
          // If Cancel, do nothing → stay on the page
          break;
      }
    });
  });

  /* -------------------- BACK BUTTON -------------------- */
  const backBtn = document.querySelector(".back-btn");

  if (backBtn) {
    backBtn.addEventListener("click", (e) => {
      e.preventDefault();
      fadeAndRedirect("../../teacher-dashboardfile/teacher-dashboard.html");
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

