$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$('#search-btn').click(function() {
  var searchTerm = $('#search-input').val().toLowerCase();
  var regex = new RegExp(`(${searchTerm})`, 'gi'); // Regular expression for case-insensitive search

  $('.post-preview').hide(); // Hide all posts initially

  $('.post-preview').each(function() {
    var postContent = $(this).text().toLowerCase(); // This includes title, subtitle, and other content

    if (postContent.includes(searchTerm)) {
      $(this).show(); // Show posts that match the search term

      // Highlight the searched term in the content
      var highlightedContent = $(this).html().replace(regex, '<span class="highlight">$1</span>');
      $(this).html(highlightedContent);
    }
  });
});
