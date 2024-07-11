document.addEventListener("DOMContentLoaded", function () {
  // Get all link elements on the page
  var links = document.querySelectorAll(
    'a[href*="/product-category/jigsaw-puzzles/"]'
  );

  // Loop through each link and set it to open in a new tab
  links.forEach(function (link) {
    link.setAttribute("target", "_blank");
  });
});
