$(function () {
  $('[data-toggle="tooltip"]').tooltip()
})

$('#search-btn').click(function() {
  var searchTerm = $('#search-input').val().toLowerCase();
  $('.post-preview').hide(); // Hide all posts initially

  $('.post-preview').each(function() {
      var postTitle = $(this).find('.post-title').text().toLowerCase();
      var postSubtitle = $(this).find('.post-subtitle').text().toLowerCase();
      var postContent = $(this).text().toLowerCase(); // This includes title, subtitle, and other content

      if (postTitle.includes(searchTerm) || postSubtitle.includes(searchTerm) || postContent.includes(searchTerm)) {
          $(this).show(); // Show posts that match the search term in title, subtitle, or content
      }
  });
});
