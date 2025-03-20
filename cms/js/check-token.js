$(document).ready(function () {
    let admin_token = localStorage.getItem("admin_token");
  
    // Check if admin_token exists
    if (!admin_token) {
      // Redirect to index.php if admin_token doesn't exist
      window.location.href = "index.php";
    } else {
      app.dialog.preloader();
  
      setTimeout(() => {
        $.ajax({
          url: "function/check-token.php",
          type: "POST",
          data: {
            token: admin_token,
          },
          dataType: "json",
          success: function (response) {
            if (response.exists) {
              app.dialog.close();
              console.log("user validated");
            } else {
              app.dialog.close();
              window.location.href = "index.php";
            }
          },
          error: function () {
            app.dialog.close();
            app.dialog.alert(
              "An error occurred during check otp. Please try again."
            );
          },
        });
      }, 300);
    }
  
    // Implement logout functionality
    $(".btn-logout").on("click", function () {
      app.dialog.confirm("Logout?", "Confirm", function () {
        // Remove admin_token from local storage
        localStorage.removeItem("admin_token");
        // Redirect to index.php
        window.location.href = "index.php";
      });
    });
  });
  