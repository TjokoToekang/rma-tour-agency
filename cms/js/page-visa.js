$(document).ready(function () {
  function convertToRupiahs(angka) {
    var reverse = angka.toString().split("").reverse().join("");
    var ribuan = reverse.match(/\d{1,3}/g);
    var formatted = ribuan.join(".").split("").reverse().join("");
    return "Rp " + formatted;
  }

  // Function to fetch and display products
  function fetchProductsVisa() {
    $.ajax({
      url: "function/get-all-visa.php",
      type: "GET",
      dataType: "json",
      success: function (response) {
        $("#listVisa").empty(); // Clear existing items

        // Check if the response has the expected structure
        if (response.success && Array.isArray(response.data)) {
          response.data.forEach(function (product, index) {
            var productItem = `
                            <tr class="color-text font-plusjkt-medium" data-id="${
                              product.id_visa
                            }">
                                <td>${index + 1}</td>
                                <td>${product.country}</td>
                                <td>${product.visa_type}</td>
                                <td>${product.entry}</td>
                                <td>${convertToRupiahs(product.price)}</td>
                                <td>${product.remarks}</td>
                                <td>
                                    <a href="#" class="text-color-blue font-plusjkt-semi btn-popup-edit" data-id="${
                                      product.id_visa
                                    }">Ubah</a>
                                    <a href="#" style="margin-left: 15px" class="text-color-red font-plusjkt-semi btn-popup-delete" data-id="${
                                      product.id_visa
                                    }">Hapus</a>
                                </td>
                            </tr>
                        `;
            $("#listVisa").append(productItem);
          });

          // Update total visa count
          $(".tproduct-visa").text(response.data.length);
        } else {
          console.error("Unexpected response format:", response);
          app.dialog.alert(
            "Unexpected data format received from server.",
            "Error"
          );
        }
      },
      error: function (xhr, status, error) {
        console.error("Error fetching visas:", error);
        app.dialog.alert("Failed to load visas. Please try again.", "Error");
      },
    });
  }

  // Initial fetch of products
  fetchProductsVisa();

  // Event delegation for edit and delete buttons
  $("#listVisa").on("click", ".btn-popup-edit", function (e) {
    e.preventDefault();
    var productId = $(this).data("id");

    window.location.href = `edit-product-visa.php?id_visa=${productId}`;
  });

  $("#listVisa").on("click", ".btn-popup-delete", function (e) {
    e.preventDefault();
    var productId = $(this).data("id");

    // Show a confirmation dialog
    app.dialog.confirm(
      "Are you sure you want to delete this product?",
      "Confirm Delete",
      function () {
        app.dialog.preloader();
        // User confirmed, proceed with deletion

        setTimeout(() => {
          $.ajax({
            url: "function/delete-product-visa.php",
            type: "POST", // or 'DELETE' if your server supports it
            data: {
              id_visa: productId,
            },
            dataType: "json",
            success: function (response) {
              if (response.message == "Product deleted successfully") {
                app.dialog.close();
                app.dialog.alert("Product deleted successfully", "Success");
                // Remove the deleted product from the table
                $(`#listVisa tr[data-id="${productId}"]`).remove();
                // Update the total product count
                var currentCount = parseInt($(".tproduct-visa").text());
                $(".tproduct-visa").text(currentCount - 1);
              } else {
                app.dialog.close();
                app.dialog.alert(
                  "Failed to delete product: " + response.message,
                  "Error"
                );
              }
            },
            error: function (xhr, status, error) {
              app.dialog.close();
              console.error("Error deleting product:", xhr.responseText);
              app.dialog.alert(
                "Failed to delete product. Please try again.",
                "Error"
              );
            },
          });
        }, 600);
      }
    );
  });
});
