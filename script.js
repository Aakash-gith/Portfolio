// Initialize EmailJS
// IMPORTANT: Replace 'YOUR_PUBLIC_KEY' with your actual EmailJS public key
// You can get this from your EmailJS account dashboard: Account > General > Public Key
(function () {
    // Check if emailjs is loaded
    if (typeof emailjs !== 'undefined') {
        emailjs.init("294RHcNauHtG3rGKz");
    } else {
        console.error("EmailJS SDK not loaded!");
    }
})();

document.addEventListener('DOMContentLoaded', function () {
    // Theme Selector Palette Logic
    const themeBtn = document.getElementById('theme-toggle-btn');
    const themePalette = document.getElementById('theme-palette');
    const swatches = document.querySelectorAll('.theme-swatch');

    // Load saved theme
    const currentTheme = localStorage.getItem('portfolio-theme') || 'theme-aura';
    document.body.className = currentTheme;
    updateActiveSwatch(currentTheme);

    // Toggle Palette
    if (themeBtn && themePalette) {
        themeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            themePalette.classList.toggle('active');
        });

        // Close palette when clicking outside
        document.addEventListener('click', (e) => {
            if (!themePalette.contains(e.target) && e.target !== themeBtn) {
                themePalette.classList.remove('active');
            }
        });
    }

    // Swatch Selection
    swatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            const newTheme = swatch.getAttribute('data-theme');
            document.body.className = newTheme;
            localStorage.setItem('portfolio-theme', newTheme);
            updateActiveSwatch(newTheme);
            themePalette.classList.remove('active');
        });
    });

    function updateActiveSwatch(themeName) {
        swatches.forEach(s => {
            if (s.getAttribute('data-theme') === themeName) {
                s.classList.add('active');
            } else {
                s.classList.remove('active');
            }
        });
    }

    // EmailJS Contact Form Logic
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            const serviceID = 'service_c7umiyq';
            const templateID = 'template_luu8zvr';

            const messageBox = document.getElementById('form-message');

            emailjs.sendForm(serviceID, templateID, this)
                .then(function () {
                    contactForm.reset();
                    submitBtn.innerText = 'Message Sent';

                    // Show success message in UI
                    if (messageBox) {
                        messageBox.innerText = 'Message sent successfully!';
                        messageBox.className = 'form-message success';
                        messageBox.style.display = 'block';
                    }

                    setTimeout(() => {
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                        if (messageBox) {
                            messageBox.style.display = 'none';
                        }
                    }, 5000);
                }, function (error) {
                    console.log('FAILED...', error);
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;

                    // Show error message in UI
                    if (messageBox) {
                        messageBox.innerText = 'Failed to send message. Please try again.';
                        messageBox.className = 'form-message error';
                        messageBox.style.display = 'block';
                        setTimeout(() => {
                            messageBox.style.display = 'none';
                        }, 5000);
                    }
                });
        });
    }
});
