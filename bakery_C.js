// North Star Bakery - Touchstone 4

// Product data
const bakeryProducts = [
    {
        id: "bread",
        name: "Artisan Bread"
    },
    {
        id: "pastries",
        name: "Fresh Pastries"
    },
    {
        id: "cakes",
        name: "Custom Cakes"
    }
];

// Load favorite products from localStorage
function getFavorites() {
    const savedFavorites = localStorage.getItem("bakeryFavorites");

    if (savedFavorites) {
        return JSON.parse(savedFavorites);
    }

    return [];
}


// Save favorites
function saveFavorites(favorites) {
    localStorage.setItem(
        "bakeryFavorites",
        JSON.stringify(favorites)
    );
}


// Add or remove a favorite
function toggleFavorite(productId) {

    let favorites = getFavorites();

    if (favorites.includes(productId)) {
        favorites = favorites.filter(function (id) {
            return id !== productId;
        });
    } else {
        favorites.push(productId);
    }

    saveFavorites(favorites);
    displayFavorites();
}


// Display favorites on Products page
function displayFavorites() {

    const favoritesList =
        document.getElementById("favoritesList");

    if (!favoritesList) {
        return;
    }

    const favorites = getFavorites();

    favoritesList.innerHTML = "";

    if (favorites.length === 0) {
        favoritesList.innerHTML =
            "<li>No favorite products selected yet.</li>";
        return;
    }

    favorites.forEach(function (productId) {

        const product = bakeryProducts.find(function (item) {
            return item.id === productId;
        });

        if (product) {
            const listItem =
                document.createElement("li");

            listItem.textContent = product.name;

            favoritesList.appendChild(listItem);
        }
    });
}


// Contact form validation
function validateContactForm(event) {

    event.preventDefault();

    const name =
        document.getElementById("name");

    const email =
        document.getElementById("email");

    const message =
        document.getElementById("message");

    const nameError =
        document.getElementById("nameError");

    const emailError =
        document.getElementById("emailError");

    const messageError =
        document.getElementById("messageError");

    let isValid = true;

    // Clear old messages
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";

    // Required name check
    if (name.value.trim() === "") {
        nameError.textContent =
            "Please enter your name.";

        isValid = false;
    }

    // Email validation
    if (
        email.value.trim() === "" ||
        !email.value.includes("@")
    ) {
        emailError.textContent =
            "Please enter a valid email address.";

        isValid = false;
    }

    // Message minimum length
    if (message.value.trim().length < 10) {
        messageError.textContent =
            "Please enter at least 10 characters.";

        isValid = false;
    }

    if (isValid) {

        // Remember customer name
        localStorage.setItem(
            "bakeryCustomerName",
            name.value
        );

        document.getElementById(
            "formSuccess"
        ).textContent =
            "Thank you! Your message is ready to send.";

        event.target.reset();
    }
}


// Restore saved customer name
function loadCustomerName() {

    const name =
        document.getElementById("name");

    const savedName =
        localStorage.getItem("bakeryCustomerName");

    if (name && savedName) {
        name.value = savedName;
    }
}


// Page setup
document.addEventListener(
    "DOMContentLoaded",
    function () {

        displayFavorites();
        loadCustomerName();

        const favoriteButtons =
            document.querySelectorAll(".favorite-button");

        favoriteButtons.forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    toggleFavorite(
                        button.dataset.product
                    );
                }
            );
        });

        const contactForm =
            document.getElementById("contactForm");

        if (contactForm) {

            contactForm.addEventListener(
                "submit",
                validateContactForm
            );
        }
    }
);