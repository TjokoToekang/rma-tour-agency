$(document).ready(function () {
  function convertToRupiah(angka) {
    var reverse = angka.toString().split("").reverse().join("");
    var ribuan = reverse.match(/\d{1,3}/g);
    var formatted = ribuan.join(".").split("").reverse().join("");
    return "Rp " + formatted;
  }

  // Function to fetch and display products
  function fetchProducts() {
    $.ajax({
      url: "function/get-all-products.php",
      type: "GET",
      dataType: "json",
      success: function (products) {
        $("#listProduct").empty(); // Clear existing items
        products.forEach(function (product, index) {
          var productItem = `
                            <tr class="color-text font-plusjkt-medium" data-id="${
                              product.id_product
                            }">
                                <td>${index + 1}</td>
                                <td>${product.name}</td>
                                <td>${convertToRupiah(product.rprice)}</td>
                                <td>${
                                  product.is_popular == 1 ? "Yes" : "No"
                                }</td>
                                <td>
                                    <a href="#" class="text-color-blue font-plusjkt-semi btn-popup-edit" data-id="${
                                      product.id_product
                                    }">Ubah</a>
                                    <a href="#" style="margin-left: 15px" class="text-color-red font-plusjkt-semi btn-popup-delete" data-id="${
                                      product.id_product
                                    }">Hapus</a>
                                </td>
                            </tr>
                        `;
          $("#listProduct").append(productItem);
        });

        // Update total products count
        $(".tproduct").text(products.length);
      },
      error: function (xhr, status, error) {
        console.error("Error fetching products:", error);
        app.dialog.alert("Failed to load products. Please try again.", "Error");
      },
    });
  }

  // Initial fetch of products
  fetchProducts();

  // Event delegation for edit and delete buttons
  $("#listProduct").on("click", ".btn-popup-edit", function (e) {
    e.preventDefault();
    var productId = $(this).data("id");

    window.location.href = `edit-product.php?id_product=${productId}`;
  });

  $("#listProduct").on("click", ".btn-popup-delete", function (e) {
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
            url: "function/delete-product.php",
            type: "POST", // or 'DELETE' if your server supports it
            data: {
              id: productId,
            },
            dataType: "json",
            success: function (response) {
              if (response.message == "Product deleted successfully") {
                app.dialog.close();
                app.dialog.alert("Product deleted successfully", "Success");
                // Remove the deleted product from the table
                $(`#listProduct tr[data-id="${productId}"]`).remove();
                // Update the total product count
                var currentCount = parseInt($(".tproduct").text());
                $(".tproduct").text(currentCount - 1);
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
