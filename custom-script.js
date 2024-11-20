document.addEventListener("DOMContentLoaded", function () {
  // Get all link elements on the page
  var links = document.querySelectorAll(
    'a[href*="/product-category/jigsaw-puzzles/"]'
  );

  // Loop through each link and set it to open in a new tab
  links.forEach(function (link) {
    link.setAttribute("target", "_blank");
  });

  // REMOVE ADDRESS IF LOCAL PICK UP WAS SELECTED
  if (window.location.pathname.includes("checkout/order-received")) {
    const spanElements = document.querySelectorAll(
      ".wc-block-order-confirmation-summary-list-item__value"
    );
    spanElements.forEach(function (spanElement) {
      if (spanElement.textContent.includes("Cash")) {
        const divElement = document.querySelector(
          ".woocommerce-order-confirmation-address-wrapper"
        );
        if (divElement) {
          divElement.style.display = "none";
        }
      }
    });
  }

  // On Shop page, make jigsaw open in new tab
  if (window.location.pathname === "/shop/") {
    const puzzleLinks = document.querySelectorAll(
      'a[href="https://jigsawgallery.com.au/collections/lotje-mcdonald?fbclid=IwAR1cNAywAyebL0l1Jz5NP9lEZ2a5ES6uSzLfif9jlzo2Qto-URgDHDYi-Nc"]'
    );
    puzzleLinks.forEach(function (link) {
      link.setAttribute("target", "_blank");
      link.setAttribute("rel", "noopener noreferrer");
    });
  }
});
