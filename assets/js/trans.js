import translations from "./translations.js";

// Helper function to update language UI elements
function updateLanguageUI(lang) {
  const btnLang = $(".btn-lang");
  btnLang.attr("data-lang", lang);

  // Update main language button
  if (lang === "ID") {
    $(".btn-lang").html(
      `ID <img src="assets/image/vector/chevron-down.svg" alt="">`
    );
  } else {
    $(".btn-lang").html(
      `EN <img src="assets/image/vector/chevron-down.svg" alt="">`
    );
  }

  // Update check icons in popover
  $(".lang-check").hide();
  if (lang === "ID") {
    $(".id-check").show();

    //Navbar
    $(".ct-menu").attr("src", "/assets/image/vector/ct-indo.svg");

    //Overview
    $(".ovr-menu").attr("src", "/assets/image/vector/ovr-indo.svg");
    $(".ov-mob").attr("src", "/assets/image/vector/ov-mob-indo.svg");

    //About
    $(".ab-menu").attr("src", "/assets/image/about-indo.svg");
    $(".ab-mob").attr("src", "/assets/image/about-mob-indo.svg");

    //Service
    $(".sv-menu").attr("src", "/assets/image/sv-indo.svg");
    $(".sv-mob").attr("src", "/assets/image/sv-mob-indo.svg");

    //Document
    $(".dc-menu").attr("src", "/assets/image/dc-indo.svg");
    $(".vs-menu").attr("src", "/assets/image/visa-indo.svg");
    $(".ps-menu").attr("src", "/assets/image/pas-indo.svg");
  } else {
    $(".en-check").show();
    $(".ct-menu").attr("src", "/assets/image/vector/btn-contact.svg");
    $(".ovr-menu").attr("src", "/assets/image/vector/overview.svg");
    $(".ov-mob").attr("src", "/assets/image/vector/overview-mob.svg");
    $(".ab-menu").attr("src", "/assets/image/about.svg");
    $(".ab-mob").attr("src", "/assets/image/mobile/about.svg");
    $(".sv-menu").attr("src", "/assets/image/service.svg");
    $(".sv-mob").attr("src", "/assets/image/mobile/service.svg");
    $(".dc-menu").attr("src", "/assets/image/dc-eng.svg");
    $(".vs-menu").attr("src", "/assets/image/visa-eng.svg");
    $(".ps-menu").attr("src", "/assets/image/pas-eng.svg");
  }
}

// Update the translation click handler
$(".btn-translate").on("click", function () {
  let newLang = $(this).attr("data-lang");

  // Save selected language to localStorage
  localStorage.setItem("selectedLanguage", newLang);

  // Update UI
  updateLanguageUI(newLang);

  // Update content
  updateContent(newLang);
});

// Initialize language on page load
$(document).ready(function () {
  const savedLang = localStorage.getItem("selectedLanguage") || "EN";

  // Update UI to match saved language
  updateLanguageUI(savedLang);
  // Update content to match saved language
  updateContent(savedLang);

  // Set initial data-lang attributes
  $('.btn-translate[data-lang="EN"]').attr("data-lang", "EN");
  $('.btn-translate[data-lang="ID"]').attr("data-lang", "ID");
});

function updateContent(lang) {
  // Navigation
  $(".about-menu").text(translations[lang].menuAbout);
  $(".tour-menu").text(translations[lang].menuTour);
  $(".visa-menu").text(translations[lang].menuVisa);

  // Hero section
  $(".hero .content h1").text(translations[lang].exploreWorld);
  $(".hero-mob .content h1").text(translations[lang].exploreWorld);
  $(".hero .content p").text(translations[lang].trustedPartner);
  $(".hero-mob .content p").text(translations[lang].trustedPartner);

  // Main content
  $(".packages p").text(translations[lang].tourPackages);
  $(".tour-mob p").text(translations[lang].tourPackages);
  $(".packages h1").text(translations[lang].explorePopular);
  $(".tour-mob h1").text(translations[lang].explorePopular);
  $(".passport p").text(translations[lang].travelDocs);
  $(".passport-mob p").text(translations[lang].travelDocs);
  $(".passport h1").text(translations[lang].visaPassport);
  $(".passport-mob h1").text(translations[lang].visaPassport);
  $(".testi p").text(translations[lang].testimonial);
  $(".testi-mob p").text(translations[lang].testimonial);
  $(".testi h1").text(translations[lang].testimonialTitle);
  $(".testi-mob h1").text(translations[lang].testimonialTitle);
  $(".banner p").text(translations[lang].readyText);
  $(".banner-mob p").text(translations[lang].readyText);
  $(".banner h1").text(translations[lang].planTrip);
  $(".banner-mob h1").text(translations[lang].planTrip);
  $(".btn-see").text(translations[lang].btnSee);

  // Footer
  $(".footer .sub h2.font-jakarta-bold")
    .first()
    .text(translations[lang].subscribe);
  $("#inputEmail").attr("placeholder", translations[lang].emailPlaceholder);
  $(".btn-subs").text(translations[lang].subscribeButton);
  $(".footer .copy h2.font-jakarta-bold")
    .last()
    .text(translations[lang].copyright);

  // Mobile menu
  $(".about-mobmenu").text(translations[lang].menuAbout);
  $(".tour-mobmenu").text(translations[lang].menuTour);
  $(".visa-mobmenu").text(translations[lang].menuVisa);
}
