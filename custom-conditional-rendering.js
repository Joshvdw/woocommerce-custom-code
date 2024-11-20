document.addEventListener("DOMContentLoaded", function () {
  // if statement to only have it run on pages with the variations table
  if (document.querySelector(".variations")) {
    let premiumSelectToggle = false;

    const table = document.querySelector(".variations");
    const variationWrap = document.querySelector(".single_variation_wrap");
    const addToCartDiv = document.querySelector(
      ".woocommerce-variation-add-to-cart"
    );

    const printTypeRow = table.rows[1];
    const frameColourRow = table.rows[2];
    const sizeRow = table.rows[3];

    const productTypeSelect = document.querySelector("#pa_product-type");
    const printTypeSelect = document.querySelector("#pa_print-type");
    const frameColourSelect = document.querySelector("#pa_frame-colour");
    const sizeSelect = document.querySelector("#pa_size");

    // Hide other inputs on start
    if (table.rows.length > 1) {
      hideAllRows();
    }

    // hide no colour value on start
    hideValues(frameColourSelect, ["frameless-no-colour"]);

    // re-order select options
    const customOrder = ["print", "standard-canvas", "premium-canvas"];
    reOrderOptions(productTypeSelect, customOrder);

    // Reset print type if item has been added to cart
    resetPrintTypeSelect();

    // PRODUCT TYPE SELECT LOGIC
    productTypeSelect.addEventListener("change", function () {
      hideRow(frameColourRow);
      hideRow(sizeRow);

      clearField(printTypeSelect);
      clearField(frameColourSelect);
      clearField(sizeSelect);

      const printValues = ["framed", "print-only"];
      const canvasValues = ["box-frame", "no-frame"];

      const printSizes = ["8x12", "a0", "a1", "a2", "a3", "other-size"];
      const canvasSizes = [
        "100x50",
        "60x30",
        "60x40",
        "90x30",
        "120x80",
        "45x30",
        "50x40",
        "60x90",
        "75x100",
        "75x50",
        "80x40",
        "120x40",
        "130x65",
        "135x45",
        "135x90",
        "100x100",
        "30x30",
        "40x40",
        "50x50",
        "60x60",
        "75x75",
        "90x90",
        "125x125",
        "other-size",
      ];

      switch (this.value) {
        case "print":
          showRow(printTypeRow);
          toggleValues("printType", printValues, showValues);
          toggleValues("printType", canvasValues, hideValues);
          toggleValues("size", canvasSizes, hideValues);
          toggleValues("size", printSizes, showValues);
          if (premiumSelectToggle) {
            variationWrap.removeChild(variationWrap.lastChild);
            premiumSelectToggle = false;
          }
          break;
        case "premium-canvas":
          hideRow(printTypeRow);
          hideRow(addToCartDiv);
          const message = document.createTextNode(
            "Please contact Lotje on 0402963443 or via email lotjemcd@bigpond.com for a quote."
          );
          variationWrap.appendChild(message);
          premiumSelectToggle = true;
          break;
        case "standard-canvas":
          showRow(printTypeRow);
          toggleValues("printType", canvasValues, showValues);
          toggleValues("printType", printValues, hideValues);
          toggleValues("size", printSizes, hideValues);
          toggleValues("size", canvasSizes, showValues);
          if (premiumSelectToggle) {
            variationWrap.removeChild(variationWrap.lastChild);
            premiumSelectToggle = false;
          }
          break;
        default:
          break;
      }
    });

    // PRINT TYPE SELECT LOGIC
    printTypeSelect.addEventListener("change", function () {
      showRow(sizeRow);
      showRow(frameColourRow);

      clearField(frameColourSelect);
      clearField(sizeSelect);

      const framedValues = ["black", "pine", "white", "walnut"];
      const boxFrameValues = ["black", "white", "dark-walnut"];
      const boxFrameOnly = [
        "60x40",
        "80x40",
        "120x40",
        "130x65",
        "135x45",
        "135x90",
        "50x50",
        "90x90",
        "125x125",
      ];

      switch (this.value) {
        case "framed":
          toggleValues("colour", framedValues, showValues);
          toggleValues("colour", ["dark-walnut"], hideValues);
          break;
        case "box-frame":
          toggleValues("colour", boxFrameValues, showValues);
          toggleValues("colour", ["pine", "walnut"], hideValues);
          toggleValues("size", boxFrameOnly, hideValues);
          break;
        case "print-only":
          hideRow(frameColourRow);
          frameColourSelect.value = "frameless-no-colour";
          break;
        case "no-frame":
          hideRow(frameColourRow);
          frameColourSelect.value = "frameless-no-colour";
          toggleValues("size", boxFrameOnly, showValues);
          break;
        default:
          break;
      }
    });

    // reset rows on 'clear' button click
    document
      .querySelector(".reset_variations")
      .addEventListener("click", function () {
        hideAllRows();
      });

    // SIZE TYPE SELECT LOGIC
    // Remove price text & add to cart option if 'other size' is selected
    const observer = new MutationObserver(function (mutationsList) {
      for (let mutation of mutationsList) {
        if (mutation.type === "childList") {
          const priceText = document.querySelector(
            ".woocommerce-variation-price"
          );
          if (priceText) {
            if (sizeSelect.value === "other-size") {
              hideRow(priceText);
              hideRow(addToCartDiv);
            }
            sizeSelect.addEventListener("change", function () {
              if (this.value === "other-size") {
                hideRow(priceText);
                hideRow(addToCartDiv);
              } else {
                showRow(priceText);
                showRow(addToCartDiv);
              }
            });
          }
        }
      }
    });

    const variationContainer = document.querySelector(".woocommerce-variation");
    observer.observe(variationContainer, { childList: true, subtree: true });

    // GLOBAL FUNCTIONS
    function hideAllRows() {
      hideRow(printTypeRow);
      hideRow(frameColourRow);
      hideRow(sizeRow);
    }

    function clearField(field) {
      field.selectedIndex = 0;
    }

    function hideRow(row) {
      row.style.display = "none";
    }

    function showRow(row) {
      row.style.display = "block";
    }

    // function to toggle dropdown values
    // have to do it this way, in order to capture node's late due to woocommerce refreshing dropdowns
    function toggleValues(selectString, valueFields, callbackFnc) {
      let selectField;
      setTimeout(() => {
        switch (selectString) {
          case "productType":
            selectField = document.querySelector("#pa_product-type");
            break;
          case "printType":
            selectField = document.querySelector("#pa_print-type");
            break;
          case "colour":
            selectField = document.querySelector("#pa_frame-colour");
            break;
          case "size":
            selectField = document.querySelector("#pa_size");
            break;
          default:
            break;
        }
        console.log(selectField);
        callbackFnc(selectField, valueFields);
      }, 100);
    }

    function hideValues(selectField, valueFields) {
      Array.from(selectField.options).forEach((option) => {
        if (valueFields.includes(option.value)) {
          option.style.display = "none";
        }
      });
    }

    function showValues(selectField, valueFields) {
      Array.from(selectField.options).forEach((option) => {
        if (valueFields.includes(option.value)) {
          option.style.display = "block";
        }
      });
    }

    function resetPrintTypeSelect() {
      const successElement = document.querySelector(".is-success");
      if (successElement) {
        productTypeSelect.selectedIndex = 0;
      }
    }

    // re-order product type select options
    function reOrderOptions(selectField, order) {
      const options = Array.from(selectField.options);
      options.sort(function (a, b) {
        return order.indexOf(a.value) - order.indexOf(b.value);
      });

      const defaultSelectedIndex = productTypeSelect.selectedIndex;

      while (selectField.options.length) {
        selectField.remove(0);
      }
      options.forEach(function (option) {
        selectField.add(option);
      });

      selectField.selectedIndex = defaultSelectedIndex;
    }
  }
});
