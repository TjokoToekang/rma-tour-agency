$(document).ready(function () {
  function removeDots(price) {
    return price.replace(/\./g, "");
  }

  $("#input-rprice").on("input", function () {
    // Remove non-digit characters
    let value = $(this).val().replace(/\D/g, "");

    // Format the number
    if (value !== "") {
      value = parseInt(value, 10).toLocaleString("id-ID");
    }

    // Set the formatted value back to the input
    $(this).val(value);
  });

  $("#input-mprice").on("input", function () {
    // Remove non-digit characters
    let value = $(this).val().replace(/\D/g, "");

    // Format the number
    if (value !== "") {
      value = parseInt(value, 10).toLocaleString("id-ID");
    }

    // Set the formatted value back to the input
    $(this).val(value);
  });

  $("#input-vprice").on("input", function () {
    // Remove non-digit characters
    let value = $(this).val().replace(/\D/g, "");

    // Format the number
    if (value !== "") {
      value = parseInt(value, 10).toLocaleString("id-ID");
    }

    // Set the formatted value back to the input
    $(this).val(value);
  });

  // Add this new code for the dropdown
  $(".dropdown-type").on("change", function () {
    let selectedValue = $(this).val();

    if (selectedValue == "visa") {
      $(".form-visa").removeClass("fadeout");
      $(".form-tr").addClass("fadeout");

      setTimeout(() => {
        $(".form-tr").hide();
        $(".form-visa").fadeIn();
      }, 150);
    } else {
      $(".form-tr").removeClass("fadeout");
      $(".form-visa").addClass("fadeout");

      setTimeout(() => {
        $(".form-visa").hide();
        $(".form-tr").fadeIn();
      }, 150);
    }

    // You can perform any action with the selected value here
    // For example, you might want to send it to the server or update other elements
  });

  const maxFileSize = 1024 * 1024; // 1MB in bytes
  const allowedTypes = ["image/png", "image/jpeg"];
  const maxFiles = 4;

  $("#upload-trigger").on("click", function (e) {
    e.preventDefault();
    $("#product-images").click();
  });

  $("#product-images").on("change", function () {
    const files = this.files;
    $("#image-preview").empty();

    if (files.length > maxFiles) {
      app.dialog.alert(
        `You can only upload a maximum of ${maxFiles} files.`,
        "Oops"
      );
      this.value = ""; // Clear the file input
      return;
    }

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (file.size > maxFileSize) {
        app.dialog.alert(
          `File ${file.name} is larger than 1MB. Please choose a smaller file.`,
          "Oops"
        );
        continue;
      }
      if (!allowedTypes.includes(file.type)) {
        app.dialog.alert(
          `File ${file.name} is not a PNG or JPG. Please choose a valid file type.`,
          "Oops"
        );
        continue;
      }

      const reader = new FileReader();
      reader.onload = function (e) {
        $("#image-preview").append(
          `<img src="${e.target.result}" alt="Preview" style="max-width: 100px; max-height: 100px; margin: 5px; border-radius: 5px">`
        );
      };
      reader.readAsDataURL(file);
    }
  });

  $(".submit-tour").on("click", function (e) {
    e.preventDefault();
    let prd_type = "tour";
    let prd_name = $("#input-name").val();
    let prd_rprice = removeDots($("#input-rprice").val());
    let prd_mprice = removeDots($("#input-mprice").val());
    let prd_hg = $("#input-hg").val();
    let prd_policy = $("#input-bp").val();
    let prd_desc = $("#input-desc").val();
    let prd_iti = $("#input-iti").val();
    let is_popular = $("#dropdown-popular").val() == "Yes" ? 1 : 0;
    let files = $("#product-images")[0].files;

    if (
      prd_name === "" ||
      prd_rprice === "" ||
      prd_mprice === "" ||
      prd_hg === "" ||
      prd_policy === "" ||
      prd_desc === "" ||
      prd_iti === "" ||
      is_popular === "" ||
      files.length === 0
    ) {
      app.dialog.alert("Please fill in all fields", "Oops");
      return;
    }

    if (files.length > maxFiles) {
      app.dialog.alert(
        `You can only upload a maximum of ${maxFiles} files.`,
        "Oops"
      );
      return;
    }

    app.dialog.confirm("Submit Product?", "Confirm", function () {
      app.dialog.preloader();
      $(this).addClass("disabled");
      setTimeout(() => {
        const formData = new FormData();
        formData.append("product_type", prd_type);
        formData.append("product_name", prd_name);
        formData.append("rprice", prd_rprice);
        formData.append("mprice", prd_mprice);
        formData.append("highlights", prd_hg);
        formData.append("policy", prd_policy);
        formData.append("product_desc", prd_desc);
        formData.append("product_iti", prd_iti);
        formData.append("is_popular", is_popular);

        for (let i = 0; i < files.length; i++) {
          if (
            files[i].size <= maxFileSize &&
            allowedTypes.includes(files[i].type)
          ) {
            formData.append("product-images[]", files[i]);
          }
        }

        $.ajax({
          url: "function/upload-product.php",
          type: "POST",
          data: formData,
          processData: false,
          contentType: false,
          success: function (response) {
            let result = JSON.parse(response);
            if (result.success) {
              app.dialog.close();
              app.dialog.alert("Product added successfully!", "Success");

              setTimeout(() => {
                window.location.href = "products.php";
              }, 600);
              // Optionally, reset the form or redirect
            } else {
              app.dialog.close();
              app.dialog.alert(result.message, "Error");
            }
          },
          error: function () {
            app.dialog.close();
            app.dialog.alert(
              "Error adding product. Please try again.",
              "Error"
            );
          },
        });
      }, 600);
    });
  });

  $(".submit-visa").on("click", function (e) {
    e.preventDefault();
    let prd_country = $("#input-country").val();
    let prd_vtype = $("#input-vtype").val();
    let prd_entry = $("#input-entry").val();
    let prd_vprice = removeDots($("#input-vprice").val());
    let prd_remarks = $("#input-remarks").val();

    if (
      prd_country === "" ||
      prd_vtype === "" ||
      prd_entry === "" ||
      prd_vprice === "" ||
      prd_remarks === ""
    ) {
      app.dialog.alert("Please fill in all fields", "Oops");
      return;
    }

    app.dialog.confirm("Submit Product?", "Confirm", function () {
      app.dialog.preloader();
      $(this).addClass("disabled");
      setTimeout(() => {
        const formData = new FormData();
        formData.append("country", prd_country);
        formData.append("visa_type", prd_vtype);
        formData.append("entry", prd_entry);
        formData.append("price", prd_vprice);
        formData.append("remarks", prd_remarks);

        $.ajax({
          url: "function/upload-product-visa.php",
          type: "POST",
          data: formData,
          processData: false,
          contentType: false,
          success: function (response) {
            let result = JSON.parse(response);
            if (result.success) {
              app.dialog.close();
              app.dialog.alert("Product added successfully!", "Success");

              setTimeout(() => {
                window.location.href = "products.php";
              }, 600);
              // Optionally, reset the form or redirect
            } else {
              app.dialog.close();
              app.dialog.alert(result.message, "Error");
            }
          },
          error: function () {
            app.dialog.close();
            app.dialog.alert(
              "Error adding product. Please try again.",
              "Error"
            );
          },
        });
      }, 600);
    });
  });

  // // Add confirmation alert for page reload/refresh
  // window.onbeforeunload = function () {
  //   return "Are you sure you want to leave this page? Your changes may not be saved.";
  // };
});
