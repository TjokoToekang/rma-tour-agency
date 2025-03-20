$(document).ready(function () {
  let admin_token = localStorage.getItem("admin_token");

  // Check if admin_token exists
  if (admin_token) {
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
            window.location.href = "dashboard.php";
          } else {
            app.dialog.close();
            console.log("user not validated");
            localStorage.removeItem("admin_token");
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

  // Format the time using Moment.js
  moment.locale("id");
  var formattedDate = moment(new Date()).format("dddd, DD MMMM YYYY");

  $(".date-nav").text(formattedDate);

  function isValidEmail(email) {
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function generateOTP() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
    let otp = "";
    for (let i = 0; i < 4; i++) {
      otp += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return otp;
  }

  // Function to generate a unique token
  function generateToken() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  // console.log(generateToken());

   function sendOTP(otp, token) {
    const botToken = "8083111586:AAHJBeobVfmhByQ_VWgifi07Q1ESq5vHIE0";
    const chat_ids = ["7793697975", "884653961", "7324855338"]; // Array of chat IDs
    const message = `Hello Admin 👋\nKode masuk Anda: ${otp}\n\nJika Anda tidak melakukan permintaan kode masuk, abaikan pesan ini.`;

    let successCount = 0;
    let totalRecipients = chat_ids.length;

    // Send message to each chat ID
    chat_ids.forEach((chat_id) => {
      // First, get the chat ID for the username
      $.ajax({
        url: `https://api.telegram.org/bot${botToken}/getChat`,
        method: "POST",
        data: { chat_id: chat_id },
        success: function (response) {
          if (response.ok) {
            const chatId = response.result.id;

            // Now send the message using the chat ID
            $.ajax({
              url: `https://api.telegram.org/bot${botToken}/sendMessage`,
              method: "POST",
              data: {
                chat_id: chatId,
                text: message,
              },
              success: function (response) {
                if (response.ok) {
                  successCount++;
                //   console.log(`Message sent successfully to ${chat_id}`);

                  // Only proceed if all messages have been sent
                  if (successCount === totalRecipients) {
                    setTimeout(() => {
                      app.dialog.close();
                      $(".form-dashboard").hide();
                      $(".form-otp").removeClass("fadeout");
                      $(".form-otp").fadeIn();
                    }, 100);
                  }
                } else {
                  app.dialog.alert(
                    `Failed to send message to ${chat_id}:`,
                    response
                  );
                }
              },
              error: function (xhr, status, error) {
                app.dialog.alert(
                  `Error sending otp message to ${chat_id}:`,
                  error
                );
              },
            });
          } else {
            app.dialog.alert(`Failed to get chat ID for ${chat_id}:`, response);
          }
        },
        error: function (xhr, status, error) {
          app.dialog.alert(`Error getting chat ID for ${chat_id}:`, error);
        },
      });
    });
  }
  
  $(".cont-dash").on("click", function (e) {
    e.preventDefault();

    var email = $("#input-email").val().trim();
    var password = $("#input-password").val().trim();

    // Validation
    if (email === "" || password === "") {
      app.dialog.alert("Please fill in all fields", "Oops");
      return;
    }

    if (!isValidEmail(email)) {
      app.dialog.alert("Please enter a valid email address", "Oops");
      return;
    }

    app.dialog.preloader();

    setTimeout(() => {
      // AJAX call
      $.ajax({
        url: "function/login_api.php",
        type: "POST",
        data: {
          email: email,
          access_code: password,
        },
        dataType: "json",
        success: function (response) {
          if (response.success) {
            let otp = generateOTP();
            let token = generateToken();

            $.ajax({
              url: "function/send-otp.php",
              type: "POST",
              data: {
                otp: otp,
                token: token,
              },
              dataType: "json",
              success: function (loginResponse) {
                if (loginResponse.success) {
                //   console.log(loginResponse.message);
                  $(".form-dashboard").addClass("fadeout");
                  sendOTP(otp, token);
                } else {
                  app.dialog.alert(loginResponse.message);
                }
              },
              error: function () {
                app.dialog.close();
                app.dialog.alert(
                  "An error occurred during send otp. Please try again."
                );
              },
            });
          } else {
            app.dialog.close();
            app.dialog.alert(response.message);
          }
        },
        error: function () {
          app.dialog.close();
          app.dialog.alert("An error occurred. Please try again.");
        },
      });
    }, 800);
  });

  $(".form-back").on("click", function () {
    app.dialog.confirm("Mulai dari awal?", function () {
      $("#input-otp").val("");
      $(".form-otp").addClass("fadeout");

      setTimeout(() => {
        $(".form-otp").hide();
        $(".form-dashboard").removeClass("fadeout");
        $(".form-dashboard").fadeIn();
      }, 100);
    });
  });

  $(".cont-otp").on("click", function () {
    let otps = $("#input-otp").val().trim();

    // Validation
    if (otps === "") {
      app.dialog.alert("Please input the otp code", "Oops");
      return;
    }

    app.dialog.preloader();

    setTimeout(() => {
      $.ajax({
        url: "function/check-otp.php",
        type: "POST",
        data: {
          otp: otps,
        },
        dataType: "json",
        success: function (otpResponse) {
          if (otpResponse.exists) {
            app.dialog.close();
            localStorage.setItem("admin_token", otpResponse.token);
            window.location.href = "dashboard.php";
          } else {
            app.dialog.close();
            app.dialog.alert("Kode akses salah!", "Oops");
          }
        },
        error: function () {
          app.dialog.close();
          app.dialog.alert(
            "An error occurred during check otp. Please try again."
          );
        },
      });
    }, 800);
  });
});
