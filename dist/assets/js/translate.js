import { autoTranslate } from "https://cdn.jsdelivr.net/gh/Mr-vero/AutoTranslate@v.1.0.2/dist/autoTranslate.js";

let fromLanguage = "English"; // Variable to track the "from" language, initialized to English

if (document.readyState !== "loading") {
  console.log("document is already ready, just execute code here");
  console.log("hi");
  // translateAndUpdateElements ("Korean");
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("document was not ready, place code here");
  });
}

$('input[type="checkbox"]').click(async function () {
  app.popover.close();
  // If the checkbox is checked
  if ($(this).is(":checked")) {
    let selectedValue = $(this).val();
    console.log("Current selection: " + selectedValue);

    // Check if autoTranslate function is available globally
    if (typeof autoTranslate === "function") {
      const targetLanguage = selectedValue; // Replace with the target language code

      try {
        // Asynchronously translate content
        await translateContent(fromLanguage, targetLanguage);
        // Update the "from" language for subsequent translations
        fromLanguage = targetLanguage;
        console.log(fromLanguage, "-- from");
      } catch (error) {
        console.error("Error during translation:", error);
      }
    } else {
      console.error("autoTranslate function is not defined or accessible.");
    }
  } else {
    // Prevent the checkbox from being unchecked
    $(this).prop("checked", true);
  }
});

async function translateContent(from, targetLanguage) {
  await autoTranslate(from, targetLanguage);
}
