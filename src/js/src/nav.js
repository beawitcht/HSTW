document.addEventListener("DOMContentLoaded", () => {
    var burgerMenu = document.getElementById('burgerMenu');
    var overlay = document.getElementById('navMenu');

    burgerMenu.tabIndex = 0;
    burgerMenu.setAttribute('aria-label', 'Toggle navigation menu');

    function toggleMenu() {
        burgerMenu.classList.toggle("close");
        overlay.classList.toggle("overlay");
    }

    burgerMenu.addEventListener('click', toggleMenu);

    burgerMenu.addEventListener('keydown', function (event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleMenu();
        }
    });
});