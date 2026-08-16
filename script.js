/* ==================================================
   ACTIVE NAVBAR
================================================== */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".navbar a");


function updateActiveNav() {

    let currentSection = "home";

    sections.forEach((section) => {

        const sectionTop = section.offsetTop - 150;
        const sectionBottom =
            sectionTop + section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionBottom
        ) {
            currentSection = section.id;
        }

    });


    navLinks.forEach((link) => {

        link.classList.remove("active");

        const linkTarget =
            link.getAttribute("href").replace("#", "");

        if (linkTarget === currentSection) {
            link.classList.add("active");
        }

    });

}


window.addEventListener("scroll", updateActiveNav);

window.addEventListener("load", updateActiveNav);


/* ==================================================
   NAVBAR CLICK
================================================== */

navLinks.forEach((link) => {

    link.addEventListener("click", () => {

        navLinks.forEach((item) => {
            item.classList.remove("active");
        });

        link.classList.add("active");

    });

});