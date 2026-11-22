
/* =====================================
   AYANA AIKEN - PORTFOLIO INTERACTIVITY
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const body = document.body;
    const header = document.querySelector("header");

    // 1. CREATE NAVIGATION
    const nav = document.createElement("nav");
    nav.className = "main-nav";

    nav.innerHTML = `
        <a href="#about">About</a>
        <a href="#skills">Skills</a>
        <a href="#projects">Projects</a>
        <a href="#contact">Contact</a>
        <button class="theme-toggle" aria-label="Switch color theme">
            🌙
        </button>
    `;

    if (header) {
        header.insertAdjacentElement("afterend", nav);
    }

    // 2. DARK / LIGHT MODE
    const themeButton = nav.querySelector(".theme-toggle");

    const savedTheme = localStorage.getItem("portfolio-theme");

    if (savedTheme === "light") {
        body.classList.add("light-mode");
    }

    function updateThemeButton() {
        themeButton.textContent = body.classList.contains("light-mode")
            ? "🌙"
            : "☀️";

        themeButton.setAttribute(
            "aria-label",
            body.classList.contains("light-mode")
                ? "Switch to dark mode"
                : "Switch to light mode"
        );
    }

    updateThemeButton();

    themeButton.addEventListener("click", () => {
        body.classList.toggle("light-mode");

        const theme = body.classList.contains("light-mode")
            ? "light"
            : "dark";

        localStorage.setItem("portfolio-theme", theme);
        updateThemeButton();
    });

    // 3. SCROLL PROGRESS BAR
    const progressBar = document.createElement("div");
    progressBar.className = "scroll-progress";
    progressBar.setAttribute("aria-hidden", "true");
    body.appendChild(progressBar);

    // 4. BACK TO TOP BUTTON
    const topButton = document.createElement("button");
    topButton.className = "back-to-top";
    topButton.innerHTML = "↑";
    topButton.setAttribute("aria-label", "Back to top");
    body.appendChild(topButton);

    topButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // 5. SCROLL EFFECTS
    function handleScroll() {
        const scrollTop = window.scrollY;

        const scrollHeight =
            document.documentElement.scrollHeight -
            window.innerHeight;

        const progress = scrollHeight > 0
            ? (scrollTop / scrollHeight) * 100
            : 0;

        progressBar.style.width = `${progress}%`;

        if (scrollTop > 300) {
            topButton.classList.add("show");
        } else {
            topButton.classList.remove("show");
        }
    }

    window.addEventListener("scroll", handleScroll, {
        passive: true
    });

    handleScroll();

    // 6. SECTION REVEAL ANIMATIONS
    const animatedElements = document.querySelectorAll(
        "section, .project"
    );

    animatedElements.forEach(element => {
        element.classList.add("reveal");
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        animatedElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        animatedElements.forEach(element => {
            element.classList.add("visible");
        });
    }

    // 7. ACTIVE NAVIGATION LINK
    const navLinks = nav.querySelectorAll("a");

    const sections = document.querySelectorAll(
        "#about, #skills, #projects, #contact"
    );

    if ("IntersectionObserver" in window) {
        const navObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        navLinks.forEach(link => {
                            link.classList.toggle(
                                "active",
                                link.getAttribute("href") ===
                                `#${entry.target.id}`
                            );
                        });
                    }
                });
            },
            {
                rootMargin: "-30% 0px -60% 0px"
            }
        );

        sections.forEach(section => {
            navObserver.observe(section);
        });
    }

    // 8. EXTERNAL LINK SECURITY
    document.querySelectorAll('a[target="_blank"]').forEach(link => {
        link.setAttribute("rel", "noopener noreferrer");
    });

    // 9. UPDATE FOOTER COPYRIGHT YEAR
    const footerText = document.querySelector("footer p");

    if (footerText) {
        footerText.innerHTML =
            `&copy; ${new Date().getFullYear()} Ayana Aiken. All rights reserved.`;
    }

    console.log("Ayana Aiken Portfolio Loaded Successfully!");
});
