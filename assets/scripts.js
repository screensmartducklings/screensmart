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

