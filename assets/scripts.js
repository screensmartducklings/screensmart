$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

document.addEventListener('DOMContentLoaded', function() {
  // Fetch the index
  fetch('/search.json')
    .then(response => response.json())
    .then(data => {
      var index = lunr(function() {
        this.ref('id');
        this.field('title');
        this.field('content');

        data.forEach(function(doc) {
          this.add(doc);
        }, this);
      });

      // Search function
      document.getElementById('search-btn').addEventListener('click', function() {
        var query = document.getElementById('search-input').value;
        var results = index.search(query);
        displayResults(results, data, query);
      });
    });

  // Display results
  function displayResults(results, data, query) {
    var resultsDiv = document.getElementById('search-results');
    resultsDiv.innerHTML = '';

    results.forEach(function(result) {
      var item = data.find(doc => doc.id === result.ref);
      var contentPreview = item.content.substring(0, 200);
      contentPreview = contentPreview.replace(new RegExp(query, "gi"), `<span class="highlighted">${query}</span>`);

      resultsDiv.innerHTML += `<div class="search-result">
        <h3><a href="${item.id}">${item.title}</a></h3>
        <p>${contentPreview}...</p>
      </div>`;
    });
  }
});
document.addEventListener('DOMContentLoaded', function() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1 // Adjust as needed
  });

  const posts = document.querySelectorAll('.post-item');
  posts.forEach(post => observer.observe(post));
});
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('vision-link').addEventListener('click', function(event) {
      event.preventDefault();
      var visionContent = document.getElementById('vision-content');

      // Smooth scroll to the content
      visionContent.scrollIntoView({ behavior: 'smooth' });

      // Delay the display of content to sync with scrolling
      setTimeout(function() {
          visionContent.style.display = 'block';
          fadeIn(visionContent);
      }, 500); // Adjust the timing as needed
  });

  // Function to gradually fade in the content
  function fadeIn(element) {
      var opacity = 0;
      var interval = setInterval(function() {
          if (opacity < 1) {
              opacity += 0.05; // Adjust for speed
              element.style.opacity = opacity;
          } else {
              clearInterval(interval);
          }
      }, 50); // Adjust for speed
  }
});
document.addEventListener('DOMContentLoaded', function() {
  var visionLink = document.getElementById('vision-link');
  var visionContent = document.getElementById('vision-content');

  visionLink.addEventListener('click', function(event) {
      event.preventDefault();

      // Ensure the content is visible before scrolling
      visionContent.style.display = 'block';
      visionContent.style.opacity = 0;

      // Custom smooth scroll
      smoothScrollTo(visionContent.offsetTop, 600); // Adjust the duration as needed

      // Fade in the content after a slight delay
      setTimeout(function() {
          fadeIn(visionContent);
      }, 600); // Adjust timing to match the end of the scroll
  });

  function fadeIn(element) {
      var opacity = 0;
      var interval = setInterval(function() {
          if (opacity < 1) {
              opacity += 0.05;
              element.style.opacity = opacity;
          } else {
              clearInterval(interval);
          }
      }, 50);
  }

  function smoothScrollTo(endY, duration) {
      const startY = window.scrollY || window.pageYOffset;
      const distanceY = endY - startY;
      const startTime = new Date().getTime();

      function scroll() {
          const currentTime = new Date().getTime();
          const time = Math.min(1, ((currentTime - startTime) / duration));
          const easedT = easeInOutCubic(time);

          window.scrollTo(0, startY + (distanceY * easedT));

          if (time < 1) {
              requestAnimationFrame(scroll);
          }
      }

      function easeInOutCubic(time) {
          return time < 0.5 ? 4 * time * time * time : 1 - Math.pow(-2 * time + 2, 3) / 2;
      }

      scroll();
  }
});
setTimeout(function() {
  fadeIn(visionContent);
  visionContent.classList.add('visible');
}, 600);
