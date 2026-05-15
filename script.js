/* CLOTHING BY XINON · CLEAN WEBSITE JS */

document.addEventListener("DOMContentLoaded", () => {
  const isMobile = window.innerWidth <= 760;

  /* Mobile menu */
  const menuButton = document.getElementById("menuButton");
  const mainNav = document.getElementById("mainNav");

  if (menuButton && mainNav) {
    menuButton.addEventListener("click", () => {
      mainNav.classList.toggle("open");
    });

    mainNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mainNav.classList.remove("open"));
    });
  }
//   document.querySelectorAll('.whatsapp-float').forEach(button => {
//   button.addEventListener('click', () => {
//     fbq('track', 'Contact');
//     // console.log('Button Connected With Pixel');
//   });
// });


  /* Lightweight background particles */
  const canvas = document.getElementById("backgroundParticles");

  if (canvas) {
    const context = canvas.getContext("2d");
    let particles = [];

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function createParticles() {
      const count = isMobile ? 24 : 70;

      particles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.8 + 0.5,
        velocityX: (Math.random() - 0.5) * 0.28,
        velocityY: (Math.random() - 0.5) * 0.28,
        alpha: Math.random() * 0.55 + 0.18
      }));
    }

    function animateParticles() {
      context.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;

        if (particle.x < 0 || particle.x > canvas.width) particle.velocityX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.velocityY *= -1;

        context.beginPath();
        context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        context.fillStyle = `rgba(227, 56, 41, ${particle.alpha})`;
        context.fill();

        if (!isMobile) {
          for (let j = index + 1; j < particles.length; j++) {
            const other = particles[j];
            const distance = Math.hypot(particle.x - other.x, particle.y - other.y);

            if (distance < 120) {
              context.beginPath();
              context.moveTo(particle.x, particle.y);
              context.lineTo(other.x, other.y);
              context.strokeStyle = `rgba(227, 56, 41, ${(120 - distance) / 900})`;
              context.lineWidth = 1;
              context.stroke();
            }
          }
        }
      });

      requestAnimationFrame(animateParticles);
    }

    resizeCanvas();
    createParticles();
    animateParticles();

    window.addEventListener("resize", () => {
      resizeCanvas();
      createParticles();
    });
  }

  /* Counter animation */
  const counters = document.querySelectorAll(".counter");

  function animateCounter(counter) {
    const target = Number(counter.dataset.target);
    const suffix = counter.dataset.suffix || "";
    const duration = 1400;
    const startTime = performance.now();

    function update(currentTime) {
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = `${Math.floor(eased * target)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        counter.textContent = `${target}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        entry.target.dataset.animated = "true";
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.55 });

  counters.forEach((counter) => counterObserver.observe(counter));

  /* Scroll reveal */
  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }, { threshold: 0.12 });

  revealElements.forEach((element) => revealObserver.observe(element));

  /* Top button */
  const topButton = document.getElementById("topButton");

  if (topButton) {
    window.addEventListener("scroll", () => {
      topButton.classList.toggle("show", window.scrollY > 600);
    });

    topButton.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
const quoteForm = document.getElementById("quoteForm");
const submitMessage = document.getElementById("submitMessage");

if (quoteForm) {
  quoteForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    

    try {
      const response = await fetch(quoteForm.action, {
        method: "POST",
        body: new FormData(quoteForm),
        headers: {Accept: "application/json"}
      });

      const result = await response.json();

      if (response.ok) {
          fbq('track', 'Lead');
        quoteForm.reset();

        submitMessage.innerHTML = "✅ Thanks For The Submission! We'll get back to you shortly.";
        submitMessage.classList.add("show");

        setTimeout(() => {
          submitMessage.classList.remove("show");
        }, 6000);
      } else {
        submitMessage.innerHTML = "❌ Form not sent. Please try again.";
        submitMessage.classList.add("show");
      }

      console.log(result);
    } catch (error) {
      submitMessage.innerHTML = "❌ Cloudflare API is unable to respond, Please reachout us on Whatsapp";
      submitMessage.classList.add("show");
      console.error(error);
    }
  });
}


/* Quote form demo handler */
// WHATSAPP BUTTON LINKED TO PIXEL
  // const quoteForm = document.getElementById("quoteForm");

  // if (quoteForm) {
  //   quoteForm.addEventListener("submit", (event) => {
  //     event.preventDefault();

  //     const formData = new FormData(quoteForm);
  //     const body = Array.from(formData.entries())
  //       .map(([key, value]) => `${key}: ${value}`)
  //       .join("%0A");

  //     window.location.href = `mailto:info@xinonindustry.com?subject=New Clothing By Xinon Quote Request&body=${body}`;
  //   });
  // }
});
