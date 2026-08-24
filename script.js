/* ==================================================
   PORTFOLIO INTERACTIONS
================================================== */

const root = document.documentElement;

const themeToggle = document.getElementById("themeToggle");
const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navbar = document.getElementById("navbar");
const scrollProgress = document.getElementById("scrollProgress");
const backToTop = document.getElementById("backToTop");

const navLinks = document.querySelectorAll(".navbar a");
const sections = document.querySelectorAll("main section[id]");

// ==================================================
// DARK / LIGHT THEME
// ==================================================

const savedTheme = localStorage.getItem("portfolio-theme");

// Apply saved theme
if (savedTheme === "dark") {
    root.classList.add("dark-theme");
} else {
    root.classList.remove("dark-theme");
}


// Update theme button
function updateThemeButton() {

    if (!themeToggle) return;

    const isDark =
        root.classList.contains("dark-theme");

    if (isDark) {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-sun"></i>';

        themeToggle.setAttribute(
            "aria-label",
            "Switch to light mode"
        );

        themeToggle.setAttribute(
            "title",
            "Light Mode"
        );

    } else {

        themeToggle.innerHTML =
            '<i class="fa-solid fa-moon"></i>';

        themeToggle.setAttribute(
            "aria-label",
            "Switch to dark mode"
        );

        themeToggle.setAttribute(
            "title",
            "Dark Mode"
        );
    }
}


// Set initial icon
updateThemeButton();


// Toggle theme
if (themeToggle) {

    themeToggle.addEventListener("click", function () {

        root.classList.toggle("dark-theme");

        const isDark =
            root.classList.contains("dark-theme");

        localStorage.setItem(
            "portfolio-theme",
            isDark ? "dark" : "light"
        );

        updateThemeButton();

    });

}

// ==================================================
// MOBILE MENU
// ==================================================

mobileMenuBtn?.addEventListener("click", () => {

    const isOpen =
        navbar.classList.toggle("open");

    mobileMenuBtn.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    mobileMenuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});


// Close mobile menu after clicking a link
navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navbar?.classList.remove("open");

        if (mobileMenuBtn) {

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }

    });

});


// ==================================================
// ACTIVE NAVIGATION ON SCROLL
// ==================================================

const sectionObserver =
    new IntersectionObserver(

        (entries) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                navLinks.forEach((link) => {
                    link.classList.remove("active");
                });

                const activeLink =
                    document.querySelector(
                        `.navbar a[href="#${entry.target.id}"]`
                    );

                activeLink?.classList.add("active");

            });

        },

        {
            rootMargin: "-35% 0px -55% 0px",
            threshold: 0
        }

    );


// Observe all sections
sections.forEach((section) => {

    sectionObserver.observe(section);

});


// ==================================================
// SCROLL PROGRESS BAR
// ==================================================

function updateScrollProgress() {

    const scrollTop =
        window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const progress =
        pageHeight > 0
            ? (scrollTop / pageHeight) * 100
            : 0;

    if (scrollProgress) {

        scrollProgress.style.width =
            `${progress}%`;

    }

}


// ==================================================
// BACK TO TOP BUTTON
// ==================================================

function updateBackToTop() {

    if (!backToTop) return;

    if (window.scrollY > 500) {

        backToTop.classList.add("show");

    } else {

        backToTop.classList.remove("show");

    }

}


// Run both functions on scroll
window.addEventListener(
    "scroll",
    () => {

        updateScrollProgress();
        updateBackToTop();

    },
    {
        passive: true
    }
);


// Initial state
updateScrollProgress();
updateBackToTop();


// Back to top click
backToTop?.addEventListener(
    "click",
    () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    }
);


// ==================================================
// SCROLL REVEAL ANIMATION
// ==================================================

const revealItems =
    document.querySelectorAll(
        ".reveal-section"
    );


const revealObserver =
    new IntersectionObserver(

        (entries, observer) => {

            entries.forEach((entry) => {

                if (!entry.isIntersecting) return;

                entry.target.classList.add(
                    "visible"
                );

                observer.unobserve(
                    entry.target
                );

            });

        },

        {
            threshold: 0.12
        }

    );


// Observe sections
revealItems.forEach((item) => {

    revealObserver.observe(item);

});


// ==================================================
// CLOSE MOBILE MENU WHEN RESIZING
// ==================================================

window.addEventListener("resize", () => {

    if (window.innerWidth > 950) {

        navbar?.classList.remove("open");

        if (mobileMenuBtn) {

            mobileMenuBtn.setAttribute(
                "aria-expanded",
                "false"
            );

            mobileMenuBtn.innerHTML =
                '<i class="fa-solid fa-bars"></i>';
        }

    }

});


// ==================================================
// KEYBOARD ACCESSIBILITY
// ==================================================

document.addEventListener(
    "keydown",
    (event) => {

        // Escape closes mobile menu
        if (event.key === "Escape") {

            navbar?.classList.remove("open");

            if (mobileMenuBtn) {

                mobileMenuBtn.setAttribute(
                    "aria-expanded",
                    "false"
                );

                mobileMenuBtn.innerHTML =
                    '<i class="fa-solid fa-bars"></i>';
            }

        }

    }
);