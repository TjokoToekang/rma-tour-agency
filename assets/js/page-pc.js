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

  function fetchProductsPc() {
    $.ajax({
      url: `${apiUrl}/function/get-all-products.php`,
      type: "GET",
      dataType: "json",
      cache: false,
      success: function (products) {
        console.log("Total products:", products.length);

        $(".packagez").empty();
        $("#toudemob").empty();

        products.forEach((product, ip) => {
          const formattedDescription = product.description.replace(
            /\n/g,
            "<br>"
          );

          const swiperSlides = product.images
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
                  ${product.name}
                </h2>
                <p class="description font-inter-regular">
                  ${formattedDescription}
                </p>
                <div class="price-section">
                  <div>
                    <p class="start-from font-inter-regular">Start from</p>
                    <p class="old-price">${convertToRupiah(product.mprice)}</p>
                    <p class="new-price">${convertToRupiah(product.rprice)}</p>
                  </div>
                  <a href="https://wa.me/6282120826662?text=Halo saya tertarik dengan paket tour berikut:%0a%0a${
                    product.name
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
                      ${product.name}
                    </h2>

                    <p class="description font-inter-regular">
                      ${formattedDescription}
                    </p>

                    <div class="price-section">
                      <div class="price-info">
                        <span class="label font-inter-regular">Start from</span>
                        <div class="price">
                          <span class="original font-inter-regular">${convertToRupiah(
                            product.mprice
                          )}</span>
                          <span class="discounted font-jakarta-bold">${convertToRupiah(
                            product.rprice
                          )}</span>
                        </div>
                      </div>

                      <a href="https://wa.me/6282120826662?text=Halo saya tertarik dengan paket tour berikut:%0a%0a${
                        product.name
                      }" class="details-button font-inter-regular external" target="_blank">Book Now</a>
                    </div>
                  </div>
                </div>
              </div>`;

          $(item).appendTo(".packagez");
          $(itemMobz).appendTo("#toudemob");
        });

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

  fetchProductsPc();
});
