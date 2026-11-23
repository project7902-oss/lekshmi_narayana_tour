const WHATSAPP_NUMBER = "918921734449";

const modal = document.getElementById("bookingModal");
const closeModalBtn = document.getElementById("closeModal");
const bookingForm = document.getElementById("bookingForm");
const selectedItemText = document.getElementById("selectedItemText");
const travelDateInput = document.getElementById("travelDate");
const yearSpan = document.getElementById("year");

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

let currentSelectedItem = "Trip";

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        const isOpen = navMenu.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.textContent = isOpen ? "X" : "Menu";
    });

    const navLinks = navMenu.querySelectorAll("a");
    for (let i = 0; i < navLinks.length; i++) {
        navLinks[i].addEventListener("click", function () {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "Menu";
        });
    }
}

if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
}

if (travelDateInput) {
    const today = new Date().toISOString().split("T")[0];
    travelDateInput.min = today;
}

const bookingButtons = document.querySelectorAll(".open-booking-btn");
for (let i = 0; i < bookingButtons.length; i++) {
    bookingButtons[i].addEventListener("click", function () {
        currentSelectedItem = bookingButtons[i].getAttribute("data-item") || "Trip";
        if (selectedItemText) {
            selectedItemText.textContent = currentSelectedItem;
        }
        if (modal) {
            modal.classList.add("active");
            modal.setAttribute("aria-hidden", "false");
        }
    });
}

function closeBookingModal() {
    if (modal) {
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
    }
}

if (closeModalBtn) {
    closeModalBtn.addEventListener("click", closeBookingModal);
}

if (modal) {
    modal.addEventListener("click", function (event) {
        if (event.target === modal) {
            closeBookingModal();
        }
    });
}

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && modal && modal.classList.contains("active")) {
        closeBookingModal();
    }
});

if (bookingForm) {
    bookingForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.getElementById("customerName");
        const phoneInput = document.getElementById("customerPhone");
        const dateInput = document.getElementById("travelDate");
        const notesInput = document.getElementById("tripNotes");

        const name = nameInput ? nameInput.value.trim() : "";
        const phone = phoneInput ? phoneInput.value.trim() : "";
        const date = dateInput ? dateInput.value : "";
        const notes = notesInput ? notesInput.value.trim() : "";

        let message =
            "Hello Lekshmi Narayana Tours and Travels (Chengannur)\n" +
            "Booking: " + currentSelectedItem + "\n" +
            "Name: " + name + "\n" +
            "Phone: " + phone + "\n" +
            "Travel Date: " + date;

        if (notes) {
            message += "\nDetails: " + notes;
        }

        const whatsappUrl = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
        window.open(whatsappUrl, "_blank", "noopener,noreferrer");

        bookingForm.reset();
        closeBookingModal();
    });
}

function revealOnScroll() {
    const elements = document.querySelectorAll(".reveal");
    const triggerHeight = window.innerHeight * 0.92;

    for (let i = 0; i < elements.length; i++) {
        const rect = elements[i].getBoundingClientRect();
        if (rect.top < triggerHeight) {
            elements[i].classList.add("is-visible");
        }
    }
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);
document.addEventListener("DOMContentLoaded", revealOnScroll);
