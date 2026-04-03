document.addEventListener("DOMContentLoaded", () => {


    var burgerMenu = document.getElementById('burgerMenu');

    var overlay = document.getElementById('navMenu');

    burgerMenu.addEventListener('click', function () {
        this.classList.toggle("close");
        overlay.classList.toggle("overlay");
    });

});


