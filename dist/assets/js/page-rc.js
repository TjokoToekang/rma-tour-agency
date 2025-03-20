$(document).ready(function () {
  function getUrlParam(parameterName) {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());

    return params[parameterName];
  }

  function convertToRupiah(angka) {
    var reverse = angka.toString().split("").reverse().join("");
    var ribuan = reverse.match(/\d{1,3}/g);
    var formatted = ribuan.join(".").split("").reverse().join("");
    return "Rp " + formatted;
  }

  let unique_id = getUrlParam("unique_id");

  $.ajax({
    url: "https://rma-tour.com/cms/function/get-order-visa.php",
    method: "GET",
    data: { unique_id: unique_id },
    dataType: "json",
    success: function (response) {
      if (response.status === "success") {
        $(".nofound").hide();
        $(".order-id").text(response.data.unique_id);
        $(".order-fullname").text(response.data.fullname);
        $(".order-mail").text(response.data.email);
        $(".order-phone").text(response.data.whatsapp);
        $(".order-date").text(response.data.order_date);
        $(".order-country").text(response.data.country);
        $(".order-vtype").text(response.data.visa_type);
        $(".order-entry").text(response.data.entry);
        $(".order-remarks").text(response.data.remarks);
        $(".order-price").text(convertToRupiah(response.data.price));

        if (response.data.status == 0) {
          $(".order-stat").text("WAITING FOR ADMIN CONFIRMATION");
        } else if (response.data.status == 1) {
          $(".order-stat").text("PROCESSING YOUR ORDER");
        } else if (response.data.status == 2) {
          $(".order-stat").text("ORDER COMPLETED");
        } else {
          $(".order-stat").text("-");
        }

        $(".order-chat").attr(
          "href",
          `https://wa.me/6281291442273?text=Hello, can you check my order please?%0a%0aOrder ID: ${
            response.data.unique_id
          }%0aFull Name: ${response.data.fullname}%0aOrder Date: ${
            response.data.order_date
          }%0aVisa Type: ${response.data.visa_type}%0aCountry: ${
            response.data.country
          }%0aEntry: ${response.data.entry}%0aPrice: ${convertToRupiah(
            response.data.price
          )}%0a%0aView Order%0ahttp://localhost:4321/receipt?unique_id=${
            response.data.unique_id
          }`
        );

        $(".rc-content").fadeIn();
      } else {
        $(".nofound").fadeIn();
        console.log(response.message);
      }
    },
    error: function (xhr, status, error) {
      console.log(error);
    },
  });
});
