$(document).ready(function () {
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
  
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id_visa");
  
    function removeDots(price) {
      return price.replace(/\./g, "");
    }
  
    if (productId) {
      // Fetch the product data
      $.ajax({
        url: "function/get-product-visa.php",
        type: "GET",
        data: { id_visa: productId },
        dataType: "json",
        success: function (product) {
          // Populate the form with product data
          $("#input-country").val(product.country);
          $("#input-vtype").val(product.visa_type);
          $("#input-vprice").val(
            parseInt(product.price, 10).toLocaleString("id-ID")
          );
          // $("#dropdown-popular").val(product.popular == 1 ? "Yes" : "No");
          $("#input-entry").val(product.entry);
          $("#input-remarks").val(product.remarks);
        },
        error: function (xhr, status, error) {
          console.error("Error fetching product:", error);
          app.dialog.alert(
            "Failed to load product data. Please try again.",
            "Error"
          );
        },
      });
    } else {
      app.dialog.alert("Product ID is missing.", "Error");
    }
  
    // Handle form submission
    $(".submit-visa").on("click", function (e) {
      e.preventDefault();
  
      // Validate form fields
      const requiredFields = [
        { id: "#input-country", name: "Country" },
        { id: "#input-vtype", name: "Visa Type" },
        { id: "#input-entry", name: "Entry" },
        { id: "#input-vprice", name: "Price" },
        { id: "#input-remarks", name: "Remarks" },
      ];
  
      let isValid = true;
      let errorMessage = "";
  
      requiredFields.forEach((field) => {
        if ($(field.id).val().trim() === "") {
          isValid = false;
          errorMessage += `${field.name} is required.\n`;
        }
      });
  
      if (!isValid) {
        app.dialog.alert(errorMessage, "Validation Error");
        return;
      }
  
      app.dialog.confirm("Save Product?", "Confirm", function () {
        app.dialog.preloader();
        $(this).addClass("disabled");
        setTimeout(() => {
          const formData = {
            id_visa: productId,
            country: $("#input-country").val().trim(),
            visa_type: $("#input-vtype").val().trim(),
            entry: $("#input-entry").val().trim(),
            price: removeDots($("#input-vprice").val().trim()),
            remarks: $("#input-remarks").val().trim(),
          };
          console.log(formData);
  
          $.ajax({
            url: "function/get-product-visa.php",
            type: "POST",
            data: formData,
            dataType: "json",
            success: function (response) {
              if (response.success) {
                app.dialog.close();
                app.dialog.alert("Product updated successfully!", "Success");
                setTimeout(() => {
                  window.location.href = "products.php";
                }, 600);
              } else {
                app.dialog.close();
                app.dialog.alert(
                  "Failed to update product: " + response.message,
                  "Error"
                );
              }
            },
            error: function (xhr, status, error) {
              app.dialog.close();
              console.error("Error updating product:", xhr.responseText);
              app.dialog.alert(
                "Failed to update product. Please check the console for details.",
                "Error"
              );
            },
          });
        }, 600);
      });
    });
  });
  