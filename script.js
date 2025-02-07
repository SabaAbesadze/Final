document.addEventListener('DOMContentLoaded', () => {
  // Splide - Hero სექცია
  new Splide('#hero-slider', {
    type      : 'loop',
    autoplay  : true,
    interval  : 5000,
    pauseOnHover: true,
    arrows    : false,
    pagination: false,
  }).mount();

  // Splide - ახალი ტრენდები
  new Splide('#trends-slider', {
    type       : 'loop',
    perPage    : 3,
    autoplay   : true,
    interval   : 7000,
    gap        : '16px',
    breakpoints: {
      1024: { perPage: 3 },
      768 : { perPage: 2 },
      480 : { perPage: 1 },
    },
  }).mount();

  // ნავიგაციის ლინკები რომ ისქროლებოდეს სექციაზე
  const navLinks = document.querySelectorAll('.nav-links a');
  navLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetSection = document.getElementById(targetId);
      targetSection.scrollIntoView({ behavior: 'smooth' });
      if (document.querySelector('.nav-links').classList.contains('nav-active')) {
        toggleBurger();
      }
    });
  });

  // ბურგერ მენიუ
  const burger = document.getElementById('burger');
  burger.addEventListener('click', toggleBurger);
  function toggleBurger() {
    const nav = document.getElementById('nav-links');
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
  }

  // Scroll to Top ღილაკი
  const scrollToTopBtn = document.getElementById('scrollToTop');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      scrollToTopBtn.style.display = 'block';
    } else {
      scrollToTopBtn.style.display = 'none';
    }
  });
  scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Cookie შეტყობინება
  const cookieNotification = document.getElementById('cookie-notification');
  const cookieAccept = document.getElementById('cookie-accept');
  if (localStorage.getItem('cookieAccepted')) {
    cookieNotification.style.display = 'none';
  }
  cookieAccept.addEventListener('click', () => {
    localStorage.setItem('cookieAccepted', 'true');
    cookieNotification.style.display = 'none';
  });

  // საკონტაქტო ფორმა
  const contactForm = document.getElementById('contact-form');
  const formError = document.getElementById('form-error');

  const togglePasswordBtn = document.getElementById('toggle-password');
  const passwordInput = document.getElementById('password');

  // show/hide ღილაკი
  togglePasswordBtn.addEventListener('click', () => {
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
      togglePasswordBtn.textContent = 'Hide';
    } else {
      passwordInput.type = 'password';
      togglePasswordBtn.textContent = 'Show';
    }
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    formError.textContent = '';

    const nameValue = document.getElementById('name').value.trim();
    const emailValue = document.getElementById('email').value.trim();
    const passwordValue = passwordInput.value.trim();
    const messageValue = document.getElementById('message').value.trim();

    // Regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Z]).{8,}$/;

    // ცარიელი ფორმა
    if (!nameValue && !emailValue && !passwordValue && !messageValue) {
      formError.textContent = 'Please fill out all fields.';
      return;
    }

    // ვალიდაცია
    if (!nameValue) {
      formError.textContent = 'Name is required.';
      return;
    } else if (nameValue.length < 6) {
      formError.textContent = 'Name must be at least 6 characters long.';
      return;
    }

    if (!emailValue) {
      formError.textContent = 'Email is required.';
      return;
    } else if (!emailRegex.test(emailValue)) {
      formError.textContent = 'Please enter a valid email address.';
      return;
    }

    if (!passwordValue) {
      formError.textContent = 'Password is required.';
      return;
    } else if (!passwordRegex.test(passwordValue)) {
      formError.textContent = 'Password must be at least 8 characters long and contain at least one uppercase letter.';
      return;
    }

    if (!messageValue) {
      formError.textContent = 'Message is required.';
      return;
    } else if (messageValue.length < 4) {
      formError.textContent = 'Message must be at least 4 characters long.';
      return;
    }

    // ინფორმაციის localStorage-ში შენახვა
    const formData = {
      name: nameValue,
      email: emailValue,
      password: passwordValue,
      message: messageValue,
    };
    localStorage.setItem('contactFormData', JSON.stringify(formData));

    alert('Form submitted successfully!');
    contactForm.reset();
    togglePasswordBtn.textContent = 'Show';
  });

  // Fetch
  async function loadCourses() {
    try {
      const response = await fetch('https://raw.githubusercontent.com/SabaAbesadze/courses-api/refs/heads/main/courses.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const courses = await response.json();
      const coursesContainer = document.getElementById('courses-container');
      courses.forEach(course => {
        const courseCard = document.createElement('div');
        courseCard.classList.add('course-card', 'animate__animated', 'animate__fadeInUp');
        courseCard.innerHTML = `
          <img src="${course.photo}" alt="${course.title} Photo">
          <div class="course-content">
            <h3>${course.title}</h3>
            <p>${course.description}</p>
            <p><strong>Instructor:</strong> ${course.instructor}</p>
            <p><strong>Price:</strong> ${course.price}</p>
            <p><strong>Duration:</strong> ${course.duration}</p>
          </div>
        `;
        coursesContainer.appendChild(courseCard);
      });
    } catch (error) {
      console.error('Error loading courses:', error);
    }
  }
  loadCourses();
});
