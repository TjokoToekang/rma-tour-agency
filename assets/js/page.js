$(document).ready(function () {
  function convertToRupiah(angka) {
    var rupiah = "";
    var angkarev = angka.toString().split("").reverse().join("");
    for (var i = 0; i < angkarev.length; i++)
      if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
    return (
      "Rp " +
      rupiah
        .split("", rupiah.length - 1)
        .reverse()
        .join("")
    );
  }

  // let apiUrl = "http://localhost/rma-api";
  let apiUrl = "https://rma-tour.com/cms";

  function fetchProducts() {
    $.ajax({
      url: `${apiUrl}/function/get-all-products.php`,
      type: "GET",
      dataType: "json",
      success: function (products) {
        const popularProducts = products.filter(
          (product) => product.is_popular === "1"
        );

        $(".packagez").empty();
        $(".toudemob").empty();

        for (let ip = 0; ip < Math.min(3, popularProducts.length); ip++) {
          // Format description to handle line breaks
          const formattedDescription = popularProducts[ip].description.replace(
            /\n/g,
            "<br>"
          );

          // Create swiper slides HTML for all images
          const swiperSlides = popularProducts[ip].images
            .map(
              (img) => `
              <swiper-slide>
                <img src="${apiUrl}/function/${img}" alt="RMA Tour Organizer" class="package-image"/>
              </swiper-slide>
            `
            )
            .join("");

          let item = `<div class="grid grid-cols-2 grid-gap" style="margin-bottom: 80px">
              <div>
                <swiper-container class="product-swiper" pagination="true" pagination-clickable="true" navigation="true">
                  ${swiperSlides}
                </swiper-container>
              </div>
              <div class="package-content">
                <h2 class="title font-jakarta-bold">
                  ${popularProducts[ip].name}
                </h2>
                <p class="description font-inter-regular">
                  ${formattedDescription}
                </p>
                <div class="price-section">
                  <div>
                    <p class="start-from font-inter-regular">Start from</p>
                    <p class="old-price">${convertToRupiah(
                      popularProducts[ip].mprice
                    )}</p>
                    <p class="new-price">${convertToRupiah(
                      popularProducts[ip].rprice
                    )}</p>
                  </div>
                  <a href="https://wa.me/6282120826662?text=Halo saya tertarik dengan paket tour berikut:%0a%0a${
                    popularProducts[ip].name
                  }" class="see-details external" target="_blank">Book Now</a>
                </div>
              </div>
            </div>`;

          let itemMobz = `<div class="tour-package-mob">
                <div class="package-card">
                  <swiper-container class="product-swiper-mob" pagination="true" pagination-clickable="true">
                    ${swiperSlides}
                  </swiper-container>

                  <div class="package-content">
                    <h2 class="title font-jakarta-bold">
                      ${popularProducts[ip].name}
                    </h2>

                    <p class="description font-inter-regular">
                      ${formattedDescription}
                    </p>

                    <div class="price-section">
                      <div class="price-info">
                        <span class="label font-inter-regular">Start from</span>
                        <div class="price">
                          <span class="original font-inter-regular">${convertToRupiah(
                            popularProducts[ip].mprice
                          )}</span>
                          <span class="discounted font-jakarta-bold">${convertToRupiah(
                            popularProducts[ip].rprice
                          )}</span>
                        </div>
                      </div>

                      <a href="https://wa.me/6282120826662?text=Halo saya tertarik dengan paket tour berikut:%0a%0a${
                        popularProducts[ip].name
                      }" class="details-button font-inter-regular external" target="_blank">Book Now</a>
                    </div>
                  </div>
                </div>
              </div>`;

          $(item).appendTo(".packagez");
          $(itemMobz).appendTo("#toudemob");
        }

        // Initialize all swipers after adding to DOM
        const swipers = document.querySelectorAll("swiper-container");
        swipers.forEach((swiper) => {
          Object.assign(swiper, {
            spaceBetween: 10,
            autoplay: {
              delay: 3000,
              disableOnInteraction: false,
            },
          });
        });
      },
      error: function (xhr, status, error) {
        console.error("Error fetching products:", error);
        app.dialog.alert("Failed to load products. Please try again.", "Error");
      },
    });
  }

  fetchProducts();

  $(".btn-subs").click(function () {
    var email = $("#inputEmail").val();
    var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    if (!emailRegex.test(email)) {
      app.dialog.alert("Please enter a valid email address.", "Oops");
      return false;
    }

    app.dialog.preloader();

    setTimeout(() => {
      $.ajax({
        url: "https://rma-tour.com/cms/function/subscribe.php",
        type: "POST",
        data: { email: email },
        dataType: "json",
        success: function (response) {
          app.dialog.close();
          app.dialog.alert("Thanks for subscribing", "Success");
          $("#inputEmail").val("");
        },
        error: function (xhr, status, error) {
          app.dialog.close();
          app.dialog.alert("An error occurred");
          console.log(error);
          // You can replace this with a more user-friendly error handling
        },
      });
    }, 600);
  });

  $(".about-menu").on("click", function () {
    $(".page-content").animate(
      {
        scrollTop: "800",
      },
      1000
    ); // Adjust the duration as needed
  });

  $(".tour-menu").on("click", function () {
    $(".page-content").animate(
      {
        scrollTop: "2700",
      },
      1000
    ); // Adjust the duration as needed
  });

  $(".visa-menu").on("click", function () {
    $(".page-content").animate(
      {
        scrollTop: "5300",
      },
      1000
    ); // Adjust the duration as needed
  });

  //mobile scroll
  $(".about-mobmenu").on("click", function () {
    app.panel.close();
    $(".page-content").animate(
      {
        scrollTop: "380",
      },
      1000
    ); // Adjust the duration as needed
  });

  $(".tour-mobmenu").on("click", function () {
    app.panel.close();
    $(".page-content").animate(
      {
        scrollTop: "2000",
      },
      1000
    ); // Adjust the duration as needed
  });

  $(".visa-mobmenu").on("click", function () {
    app.panel.close();
    $(".page-content").animate(
      {
        scrollTop: "3290",
      },
      1000
    ); // Adjust the duration as needed
  });
});
