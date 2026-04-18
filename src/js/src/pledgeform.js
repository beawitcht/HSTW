window.addEventListener("load", function () {
    const form = document.getElementById('pledgeForm');
    const loader = document.getElementById('loader');
    const button = form.querySelector('button');
    const message = document.getElementById('message');
    const successMessage = document.getElementById('successMessage');
    const title = document.getElementById('titleH');
    const pg = document.getElementById('titleP');

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = form.Name.value.trim();
        const email = form.Email.value.trim();
        const postcode = form.Postcode.value.trim();

        const errors = [];

        if (!name) {
            errors.push("Name is required.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            errors.push("Please enter a valid email address.");
        }

        const postcodeRegex = /^([A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}|GIR ?0A{2})$/i;
        if (!postcodeRegex.test(postcode)) {
            errors.push("Please enter a valid UK postcode.");
        }

        if (errors.length > 0) {
            message.innerHTML = errors.join('<br>');
            return;
        }

        form.Name.value = name;
        form.Email.value = email;
        form.Postcode.value = postcode;

        loader.classList.add('active');
        form.style.display = 'none';

        const data = new FormData(form);
        const action = e.target.action;

        fetch(action, {
            method: 'POST',
            body: data
        })
            .then(response => response.json())
            .then(json => {
                if (json.result === 'success') {
                    title.textContent = "You Said NO! to war";
                    pg.textContent = "";
                    successMessage.textContent = "Thank you for signing the pledge";
                    message.textContent = "";
                } else {
                    message.innerHTML = (json.errors || ["Something went wrong..."]).join('<br>');
                    form.style.display = 'flex';
                }
            })
            .catch((err) => {
                console.error(err);
                message.textContent = "Something went wrong...";
                form.style.display = 'flex';
            })
            .finally(() => {
                loader.classList.remove('active');
                form.style.display = 'hidden';
            });
    });
});