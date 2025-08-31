document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".section-card");

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
            obs.unobserve(entry.target); // deja de observar para que no se repita
        }
    });
    }, { threshold: 0.15 }); // se activa cuando 15% del elemento es visible

    cards.forEach(card => observer.observe(card));
});
