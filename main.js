//Activating Mobile Menu

const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
        })
    }
}

showMenu('nav-toggle', 'nav-menu');

//Toggling Menu by clicking in mobile menu links

const navLink = document.querySelectorAll('.nav-link');

function linkAction() {
    navLink.forEach(n => n.classList.remove('active'));
    this.classList.add('active');

    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
}

navLink.forEach(n => n.addEventListener('click', linkAction));

// Changing Active Menu section while scrolling

const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', scrollActive);

function scrollActive() {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav-menu a[href*=' + sectionId + ']').classList.remove('active');
        }
    })
}

// Scroll Reveal Settings

const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})

sr.reveal('.home-title', {});
sr.reveal('.home-scroll', {delay: 200});
sr.reveal('.home-img', {origin: 'right', delay: 400 });

sr.reveal('.about-img', {delay: 500});
sr.reveal('.about-subtitle', {delay: 300});
sr.reveal('.about-profession', {delay: 400});
sr.reveal('.about-text', {delay: 500});
sr.reveal('.about-social-icon', {delay: 600, interval: 200});

sr.reveal('.skills-subtitle', {});
sr.reveal('.skills-name', {distance: '20px', delay: 50, interval: 100});
sr.reveal('.skills-img', {delay: 400});

sr.reveal('.portfolio-img', {interval: 200});

sr.reveal('.contact-subtitle', {});
sr.reveal('.contact-text', {interval: 200});
sr.reveal('.contact-input', {delay: 400});
sr.reveal('.contact-button', {delay: 600});








// ✅ Function to show notification
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;

    // Basic style
    Object.assign(notification.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        backgroundColor: type === 'success' ? '#4CAF50' : '#f44336',
        color: '#fff',
        padding: '12px 20px',
        borderRadius: '8px',
        fontSize: '15px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
        zIndex: 1000,
        opacity: 0,
        transition: 'opacity 0.3s ease-in-out',
    });

    document.body.appendChild(notification);

    // Fade in
    requestAnimationFrame(() => {
        notification.style.opacity = '1';
    });

    // Auto remove
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ✅ Form submission handler
document.querySelector('.contact-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.querySelector('.contact-input[placeholder="Name"]').value.trim();
    const email = document.querySelector('.contact-input[placeholder="Email"]').value.trim();
    const message = document.querySelector('textarea.contact-input').value.trim();

    if (!name || !email || !message) {
        showNotification('Please fill all fields.', 'error');
        return;
    }

    const botToken = '7566566457:AAEg0xyNSFz4AbRYQuEuePDprtK_6UgBzrM';         // <-- Replace with your actual bot token
    const chatId = '6149412506';             // <-- Replace with your actual chat ID
    const text = `📥 New Submission:\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: text })
    })
    .then(res => res.json())
    .then(data => {
        if (data.ok) {
            showNotification('Feedback sent successfully! Thank you!', 'success');

            document.querySelector('.contact-form').reset();
        } else {
            showNotification('❌ Failed to send. Please try again.', 'error');
        }
    })
    .catch(error => {
        console.error(error);
        showNotification('⚠️ Error connecting to Telegram.', 'error');
    });
});
