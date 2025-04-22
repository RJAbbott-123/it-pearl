document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  document.querySelectorAll('.toggle-article').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentElement.nextElementSibling.classList.toggle('article-content');
      this.parentElement.nextElementSibling.style.display = this.parentElement.nextElementSibling.style.display === 'none' ? 'block' : 'none';
    });
  });
  