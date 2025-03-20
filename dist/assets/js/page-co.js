$(document).ready(function () {
  // AJAX call to the API
  $.ajax({
    url: "https://rma-tour.com/cms/function/get-all-visa.php",
    type: "GET",
    dataType: "json",
    success: function (response) {
      if (response.success && Array.isArray(response.data)) {
        // Sort the data by id_visa
        response.data.sort((a, b) => a.id_visa - b.id_visa);

        for (let iv = 0; iv < response.data.length; iv++) {
          let option = `<option value="${response.data[iv].id_visa}" class="color1" data-name="${response.data[iv].country}" data-vtype="${response.data[iv].visa_type}" data-entry="${response.data[iv].entry}" data-vprice="${response.data[iv].price}" data-remarks="${response.data[iv].remarks}">${response.data[iv].country} - ${response.data[iv].entry}</option>`;
          $(option).appendTo(".dropdown-type");
        }

        $(".dropdown-type").on("change", function () {
          let selectedOption = $(this).find("option:selected");
          let id = $(this).val();
          let country = selectedOption.data("name");
          let vtype = selectedOption.data("vtype");
          let entry = selectedOption.data("entry");
          let vprice = selectedOption.data("vprice");
          let remarks = selectedOption.data("remarks");

          $(".country").text(country);
          $(".vtype").text(vtype);
          $(".entry").text(entry);
          $(".remarks").text(remarks);
          $(".vprice").text("Rp " + vprice);
        });
      } else {
        app.dialog.close();
        app.dialog.alert("Error: " + response.message);
      }
    },
    error: function (xhr, status, error) {
      app.dialog.close();
      app.dialog.alert("An error occurred. Please try again later.");
      console.error(xhr.responseText);
    },
  });

  $(".btn-confirm").on("click", function (e) {
    e.preventDefault();

    // Get input values
    var ids = $(".dropdown-type").val();
    var fullname = $("#input-name").val().trim();
    var email = $("#input-email").val().trim();
    var whatsapp = $("#input-phone").val().trim();

    console.log(ids);

    // Validate inputs
    if (ids === null || fullname === "" || email === "" || whatsapp === "") {
      app.dialog.alert("Please fill in all fields", "Oops");
      return;
    }

    // Validate email format
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      app.dialog.alert("Please enter a valid email address", "Oops");
      return;
    }

    app.dialog.confirm("Checkout now?", "Confirm", function () {
      app.dialog.preloader();
      setTimeout(() => {
        // AJAX call to the API
        $.ajax({
          url: "https://rma-tour.com/cms/function/checkout.php",
          type: "POST",
          dataType: "json",
          data: {
            id_visa: ids,
            fullname: fullname,
            email: email,
            whatsapp: whatsapp,
          },
          success: function (response) {
            if (response.status === "success") {
              app.dialog.close();
              app.dialog.alert(
                "Order submitted successfully!, Check Your Email Inbox/Spam",
                "Success"
              );

              // Send notification to admin
              sendAdminNotification(
                fullname,
                email,
                whatsapp,
                response.unique_id
              );

              // Clear form fields
              $("#input-name, #input-email, #input-phone").val("");

              setTimeout(() => {
                window.location.href = `/receipt?unique_id=${response.unique_id}`;
              }, 1500);
              //   window.location.href = "/checkout";
            } else {
              app.dialog.close();
              app.dialog.alert("Error: " + response.message);
            }
          },
          error: function (xhr, status, error) {
            app.dialog.close();
            app.dialog.alert("An error occurred. Please try again later.");
            console.error(xhr.responseText);
          },
        });
      }, 600);
    });
  });

  function sendAdminNotification(fullname, email, whatsapp, unique_id) {
    const botToken = "8083111586:AAHJBeobVfmhByQ_VWgifi07Q1ESq5vHIE0";
    const chat_id = "7793697975";
    const links = `http://localhost:4321/receipt?unique_id=${unique_id}`;
    const message = `Hello Admin 👋\nNew order is added!\n\nOrder Type: Visa Application\n\nUser Info:\nName: ${fullname}\nEmail: ${email}\nWhatsApp: ${whatsapp}\n\n<a href="${links}">View Order</a>`;

    $.ajax({
      url: `https://api.telegram.org/bot${botToken}/sendMessage`,
      method: "POST",
      data: {
        chat_id: chat_id,
        text: message,
        parse_mode: "HTML",
      },
      success: function (response) {
        if (response.ok) {
          console.log("Admin notification sent successfully");
        } else {
          console.error("Failed to send admin notification:", response);
        }
      },
      error: function (xhr, status, error) {
        console.error("Error sending admin notification:", error);
      },
    });
  }
});
