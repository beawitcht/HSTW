document.addEventListener("DOMContentLoaded", () => {
    var burgerMenu = document.getElementById('burgerMenu');
    var overlay = document.getElementById('navMenu');

    burgerMenu.tabIndex = 0;
    burgerMenu.setAttribute('role', 'button');
    burgerMenu.setAttribute('aria-label', 'Toggle navigation menu');
    burgerMenu.setAttribute('aria-expanded', 'false');
    burgerMenu.setAttribute('aria-controls', 'navMenu');

    function toggleMenu() {
        burgerMenu.classList.toggle("close");
        overlay.classList.toggle("overlay");
        const isExpanded = overlay.classList.contains("overlay");
        burgerMenu.setAttribute('aria-expanded', isExpanded.toString());
    }

    burgerMenu.addEventListener('click', toggleMenu);

    burgerMenu.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });
});