fetch('./assets/projects.json')
    .then(response => response.json())
    .then(projects => {
      const panel = document.querySelector("#section-projects .panel");

      projects.forEach((project, index) => {
        const card = document.createElement("div");
        card.classList.add("card");

        // Create image carousel container
        const carousel = document.createElement("div");
        carousel.classList.add("carousel");

        const imagesContainer = document.createElement("div");
        imagesContainer.classList.add("carousel-images");

        project.images.forEach(src => {
          const img = document.createElement("img");
          img.src = src;
          img.alt = `Screenshot of ${project.title}`;
          imagesContainer.appendChild(img);
        });

        carousel.appendChild(imagesContainer);
        card.appendChild(carousel);

        // Create content
        const content = document.createElement("div");
        content.classList.add("card-content");
        content.innerHTML = `
          <h2>${project.title}</h2>
          <p>${project.description}</p>
        `;
        card.appendChild(content);
        panel.appendChild(card);

        // Auto-swipe behavior
        let currentIndex = 0;
        const totalImages = project.images.length;

        if (totalImages > 1) {
          setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            imagesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;
          }, 3000); // Change image every 3s
        }
      });
    });

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, {
  threshold: 0.1
});

document.querySelectorAll('.fade-in').forEach(el => {
  observer.observe(el);
});

document.querySelectorAll('.slide-in').forEach(el => {
  observer.observe(el);
})

document.querySelectorAll('.fade-slide-in').forEach(el => {
  observer.observe(el);
});