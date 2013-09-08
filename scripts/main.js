$(function() {

  var $navBar = $('nav');

  // Toggle the nav menu list when the user clicks the nav menu button
  $('.menu').on('click', function(event) {
    if ($navBar.css('overflow') !== 'visible') {
      $navBar.css('overflow', 'visible');  
    } else {
      $navBar.css('overflow', 'hidden');
    }
  });
});
