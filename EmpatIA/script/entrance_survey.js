document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".section-card");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target); // Stop watching so it doesn't happen again
        }
    });
    }, { threshold: 0.15 }); // Activated when 15% of the element is visible

    cards.forEach(card => observer.observe(card));
});
