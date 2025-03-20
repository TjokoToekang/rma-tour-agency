$(document).ready(function () {
  $(".submit-email").on("click", function (e) {
    e.preventDefault();

    var subject = $("#input-subject").val();
    var body = $("#input-body").val();

    if (!subject || !body) {
      app.dialog.alert("Please fill in both subject and body fields.", "Error");
      return;
    }

    app.dialog.confirm("Send Email?", "Confirm", function () {
      app.dialog.preloader("Sending newsletter...");

      setTimeout(() => {
        $.ajax({
          url: "function/send-newsletter.php",
          method: "POST",
          data: {
            subject: subject,
            body: body,
          },
          dataType: "json",
          success: function (response) {
            app.dialog.close();
            if (response.success) {
              app.dialog.alert(response.message, "Success");
              // Clear form fields after successful send
              $("#input-subject").val("");
              $("#input-body").val("");
            } else {
              app.dialog.alert(response.message, "Error");
            }
          },
          error: function () {
            app.dialog.close();
            app.dialog.alert(
              "An error occurred while sending the newsletter.",
              "Error"
            );
          },
        });
      }, 600);
    });
  });

  function fetchSubscribers() {
    $.ajax({
      url: "function/user.php",
      type: "GET",
      dataType: "json",
      success: function (data) {
        let tableBody = "";
        $.each(data, function (index, subscriber) {
          tableBody += `
          <tr>
            <td>${index + 1}</td>
            <td>${subscriber.user_email}</td>
            <td>${moment(subscriber.subs_date).format("MMMM D, YYYY")}</td>
          </tr>
        `;
        });
        $("#listUser").html(tableBody);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching subscribers:", error);
      },
    });
  }

  fetchSubscribers();
});
