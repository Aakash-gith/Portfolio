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
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalBtnText = submitBtn.innerText;
            submitBtn.innerText = 'Sending...';
            submitBtn.disabled = true;

            // Generate these IDs in the EmailJS dashboard
            const serviceID = 'service_c7umiyq'; // e.g., 'service_xyz'
            const templateID = 'template_luu8zvr'; // e.g., 'template_abc'

            // Send the form
            // 'this' refers to the form element
            emailjs.sendForm(serviceID, templateID, this)
                .then(function () {
                    console.log('SUCCESS!');
                    alert('Message sent successfully!');
                    contactForm.reset();
                    submitBtn.innerText = 'Message Sent';
                    setTimeout(() => {
                        submitBtn.innerText = originalBtnText;
                        submitBtn.disabled = false;
                    }, 3000);
                }, function (error) {
                    console.log('FAILED...', error);
                    alert('Failed to send message. Please try again or contact directly via email.');
                    submitBtn.innerText = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
});
