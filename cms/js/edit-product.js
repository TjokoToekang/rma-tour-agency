$(document).ready(function () {
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
  
    // Get the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id_product");
  
    function removeDots(price) {
      return price.replace(/\./g, "");
    }
  
    if (productId) {
      // Fetch the product data
      $.ajax({
        url: "function/get-product.php",
        type: "GET",
        data: { id_product: productId },
        dataType: "json",
        success: function (product) {
          // Create a temporary div to decode HTML entities and convert <br> to newlines
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = product.description;
          const decodedDesc = tempDiv.innerText
            .replace(/<br\s*\/?>/gi, "\n") // Replace <br> tags with newlines
            .replace(/\n\n+/g, "\n\n"); // Normalize multiple newlines to max 2
  
          // Populate the form with product data
          $("#input-desc").val(decodedDesc);
          $("#input-name").val(product.name);
          $("#input-rprice").val(
            parseInt(product.rprice, 10).toLocaleString("id-ID")
          );
          $("#input-mprice").val(
            parseInt(product.mprice, 10).toLocaleString("id-ID")
          );
          $("#dropdown-popular").val(product.is_popular == 1 ? "Yes" : "No");
  
          // Display images
          const imagesContainer = $("#product-images-container");
          imagesContainer.empty(); // Clear existing images
  
          if (product.images && product.images.length > 0) {
            product.images.forEach((imagePath) => {
              const imageDiv = $(`
                <div class="image-item" style="margin-bottom: 15px;">
                  <img src="function/${imagePath}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
                  <button class="delete-image-btn button" data-image="${imagePath}" 
                    style="margin-top: 5px; width: 100%; color: #FF0000;">
                    Delete Image
                  </button>
                </div>
              `);
              imagesContainer.append(imageDiv);
            });
          } else {
            imagesContainer.append("<p>No images available</p>");
          }
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
  
    // Update the delete image handler
    $(document).on("click", ".delete-image-btn", function (e) {
      e.preventDefault();
      const imagePath = $(this).data("image");
      const imageItem = $(this).closest(".image-item");
  
      // Check if this is the last image
      const currentImageCount = $("#product-images-container .image-item").length;
      if (currentImageCount <= 1) {
        app.dialog.alert(
          "Cannot delete the last image. Minimum 1 image required.",
          "Warning"
        );
        return;
      }
  
      app.dialog.confirm(
        "Are you sure you want to delete this image?",
        "Confirm Delete",
        function () {
          $.ajax({
            url: "function/delete-image.php",
            type: "POST",
            data: {
              product_id: productId,
              image_path: imagePath,
            },
            dataType: "json",
            success: function (response) {
              if (response.success) {
                imageItem.remove();
                app.dialog.alert("Image deleted successfully");
              } else {
                app.dialog.alert(response.message || "Failed to delete image");
              }
            },
            error: function (xhr, status, error) {
              console.error("Delete error:", error);
              app.dialog.alert("Error occurred while deleting image");
            },
          });
        }
      );
    });
  
    // Handle form submission
    $(".submit-tour").on("click", function (e) {
      e.preventDefault();
  
      $("#dropdown-popular").val();
  
      // Validate form fields
      const requiredFields = [
        { id: "#input-name", name: "Name" },
        { id: "#input-rprice", name: "Regular Price" },
        { id: "#input-mprice", name: "Member Price" },
        { id: "#input-desc", name: "Description" },
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
            id_product: productId,
            name: $("#input-name").val().trim(),
            rprice: removeDots($("#input-rprice").val().trim()),
            mprice: removeDots($("#input-mprice").val().trim()),
            popular: $("#dropdown-popular").val() == "Yes" ? 1 : 0,
            description: $("#input-desc").val().trim(),
          };
          console.log(formData);
  
          $.ajax({
            url: "function/get-product.php",
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
  
    // Add these constants at the top of your file
    const MAX_FILES = 3;
    const MAX_FILE_SIZE = 1024 * 1024; // 1MB
    const ALLOWED_TYPES = ["image/jpeg", "image/png"];
  
    // Update the file input change handler
    $("#new-images").on("change", function (e) {
      const files = e.target.files;
      const preview = $("#selected-files-preview");
      preview.empty();
  
      // Get current image count
      const currentImageCount = $("#product-images-container .image-item").length;
      const remainingSlots = MAX_FILES - currentImageCount;
  
      if (files.length > remainingSlots) {
        app.dialog.alert(
          `You can only upload ${remainingSlots} more image${
            remainingSlots !== 1 ? "s" : ""
          }. Please delete existing image first`,
          "Too Many Files"
        );
        $(this).val(""); // Clear selection
        $("#upload-images-btn").hide();
        return;
      }
  
      let hasErrors = false;
      let errorMessage = "";
  
      if (files.length > 0) {
        Array.from(files).forEach((file) => {
          // Validate file size
          if (file.size > MAX_FILE_SIZE) {
            hasErrors = true;
            errorMessage += `${file.name} is too large (max 1MB)\n`;
            return;
          }
  
          // Validate file type
          if (!ALLOWED_TYPES.includes(file.type)) {
            hasErrors = true;
            errorMessage += `${file.name} has invalid type (only JPG and PNG allowed)\n`;
            return;
          }
  
          const reader = new FileReader();
          reader.onload = function (e) {
            const previewDiv = $(`
                      <div class="image-preview" style="margin-bottom: 15px;">
                          <img src="${e.target.result}" style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px;">
                          <div style="margin-top: 5px; font-size: 12px;">${file.name}</div>
                      </div>
                  `);
            preview.append(previewDiv);
          };
          reader.readAsDataURL(file);
        });
  
        if (hasErrors) {
          app.dialog.alert(errorMessage, "Validation Error");
          $(this).val(""); // Clear selection
          preview.empty();
          $("#upload-images-btn").hide();
        } else {
          $("#upload-images-btn").show();
        }
      } else {
        $("#upload-images-btn").hide();
      }
    });
  
    // Update the upload button click handler
    $("#upload-images-btn").on("click", function () {
      const files = $("#new-images")[0].files;
      if (files.length === 0) return;
  
      const currentImageCount = $("#product-images-container .image-item").length;
      if (currentImageCount + files.length > MAX_FILES) {
        app.dialog.alert(
          `Maximum ${MAX_FILES} images allowed. You can upload ${
            MAX_FILES - currentImageCount
          } more images.`,
          "Too Many Files"
        );
        return;
      }
  
      const formData = new FormData();
      formData.append("product_id", productId);
      formData.append("product_type", "tour");
  
      // Append each file to formData
      for (let i = 0; i < files.length; i++) {
        formData.append("product-images[]", files[i]);
      }
  
      app.dialog.preloader("Uploading images...");
  
      $.ajax({
        url: "function/upload-images.php",
        type: "POST",
        data: formData,
        processData: false,
        contentType: false,
        dataType: "json",
        success: function (response) {
          app.dialog.close();
          if (response.success) {
            app.dialog.alert(
              "Images uploaded successfully",
              "Success",
              function () {
                // Refresh the images display
                location.reload();
              }
            );
          } else {
            app.dialog.alert(response.message || "Failed to upload images");
          }
        },
        error: function (xhr, status, error) {
          app.dialog.close();
          console.error("Upload error:", error);
          app.dialog.alert("Error occurred while uploading images");
        },
      });
    });
  });