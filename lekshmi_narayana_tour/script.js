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

// Mobile hamburger menu toggle
if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        const isOpen = navMenu.classList.toggle("open");
        menuToggle.setAttribute("aria-expanded", isOpen);
        menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    navMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            navMenu.classList.remove("open");
            menuToggle.setAttribute("aria-expanded", "false");
            menuToggle.textContent = "☰";
        });
    });
}

// Set current year in footer
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// Prevent selecting past dates in calendar
if (travelDateInput) {
    const today = new Date().toISOString().split("T")[0];
    travelDateInput.min = today;
}

// Open booking modal for clicked vehicle or package
document.querySelectorAll(".open-booking-btn").forEach((button) => {
    button.addEventListener("click", () => {
        currentSelectedItem = button.getAttribute("data-item") || "Trip";
        selectedItemText.textContent = currentSelectedItem;
        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
    });
});

// Close booking modal helper
function closeBookingModal() {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
}

closeModalBtn.addEventListener("click", closeBookingModal);

// Close when clicking outside the popup box
modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeBookingModal();
    }
});

// Close when pressing Escape key
document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("active")) {
        closeBookingModal();
    }
});

// Build WhatsApp message and open WhatsApp
bookingForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("customerName").value.trim();
    const phone = document.getElementById("customerPhone").value.trim();
    const date = document.getElementById("travelDate").value;
    const notes = document.getElementById("tripNotes").value.trim();

    let message =
        `Hello Lekshmi Narayan Tours and Travels (Chengannur),\n` +
        `I would like to book: *${currentSelectedItem}*\n` +
        `Name: ${name}\n` +
        `Phone: ${phone}\n` +
        `Travel Date: ${date}`;

    if (notes) {
        message += `\nDetails: ${notes}`;
    }

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");

    bookingForm.reset();
    closeBookingModal();
});
