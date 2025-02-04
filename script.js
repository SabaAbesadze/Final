document.addEventListener('DOMContentLoaded', () => {
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
  

    const burger = document.getElementById('burger');
    burger.addEventListener('click', toggleBurger);
    function toggleBurger() {
      const nav = document.getElementById('nav-links');
      nav.classList.toggle('nav-active');
      burger.classList.toggle('toggle');
    }
  

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
  

    const cookieNotification = document.getElementById('cookie-notification');
    const cookieAccept = document.getElementById('cookie-accept');
    if (localStorage.getItem('cookieAccepted')) {
      cookieNotification.style.display = 'none';
    }
    cookieAccept.addEventListener('click', () => {
      localStorage.setItem('cookieAccepted', 'true');
      cookieNotification.style.display = 'none';
    });
  

    const contactForm = document.getElementById('contact-form');
    const formError = document.getElementById('form-error');
  
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      formError.textContent = '';
  
      const nameValue = document.getElementById('name').value.trim();
      const emailValue = document.getElementById('email').value.trim();
      const messageValue = document.getElementById('message').value.trim();
  
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
      if (!nameValue || !emailValue || !messageValue) {
        formError.textContent = 'Please fill out all fields.';
        return;
      }
      if (!emailRegex.test(emailValue)) {
        formError.textContent = 'Please enter a valid email address.';
        return;
      }
      alert('Form submitted successfully!');
      contactForm.reset();
    });
  

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
  