document.addEventListener("DOMContentLoaded", function () {
    if (typeof bootstrap === "undefined") {
        console.error("Bootstrap is not loaded! Check your HTML script order.");
    } else {
        console.log("Bootstrap loaded successfully!");
    }

    // Navbar Background Change on Scroll
    window.addEventListener("scroll", function () {
        let navbar = document.querySelector(".navbar");
        if (window.scrollY > 50) {
            navbar.classList.add("navbar-scrolled");
        } else {
            navbar.classList.remove("navbar-scrolled");
        }
    });

    // Fade-in Effect on Scroll
    let fadeInElements = document.querySelectorAll(".fade-in");
    let observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("fade-in-visible");
            }
        });
    }, { threshold: 0.3 });

    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    // Smooth Scroll for Navbar Links
    document.querySelectorAll('.navbar a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            let target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70,
                    behavior: "smooth"
                });
            }
        });
    });

    // ✅ Cek apakah Bootstrap tersedia sebelum menjalankan Carousel
    if (typeof bootstrap !== "undefined") {
        var myCarousel = new bootstrap.Carousel(document.querySelector('#heroCarousel'), {
            interval: 3000, // Slide otomatis setiap 3 detik
            ride: "carousel"
        });
    } else {
        console.error("Bootstrap is not loaded! Check your HTML script order.");
    }

}); // ✅ Akhiran yang benar, hanya satu `}` untuk `DOMContentLoaded`
