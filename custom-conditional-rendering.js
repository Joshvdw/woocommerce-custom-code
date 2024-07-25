document.addEventListener("DOMContentLoaded", function () {
  // remove if statement below to launch changes live
  if (window.location.pathname === "/product/test-2/") {
    const table = document.querySelector(".variations");

    const frameTypeRow = table.rows[1];
    const frameColourRow = table.rows[2];
    const sizeRow = table.rows[3];

    const printTypeSelect = document.querySelector("#pa_print-type");
    const frameTypeSelect = document.querySelector("#pa_frame-type");
    const frameColourSelect = document.querySelector("#pa_frame-colour");
    const sizeSelect = document.querySelector("#pa_size");

    // Hide other inputs on start
    if (table.rows.length > 1) {
      hideRow(frameTypeRow);
      hideRow(frameColourRow);
      hideRow(sizeRow);
    }

    // hide no colour value on start
    hideValues(frameColourSelect, ["frameless-no-colour"]);

    // re-order select options
    const customOrder = ["print", "standard-canvas", "premium-canvas"];
    reOrderOptions(printTypeSelect, customOrder);

    // Reset print type if item has been added to cart
    resetFrameTypeSelect();

    // PRINT TYPE SELECT LOGIC
    printTypeSelect.addEventListener("change", function () {
      showRow(frameTypeRow);
      hideRow(frameColourRow);
      hideRow(sizeRow);

      clearField(frameTypeSelect);
      clearField(frameColourSelect);
      clearField(sizeSelect);

      const printValues = ["framed", "print-only"];
      const canvasValues = ["box-frame", "no-frame"];

      const printSizes = ["8x12", "a0", "a1", "a2", "a3", "other-size"];
      const canvasSizes = [
        "100x50",
        "60x30",
        "90x30",
        "120x80",
        "45x30",
        "50x40",
        "60x90",
        "75x100",
        "75x50",
        "100x100",
        "30x30",
        "40x40",
        "60x60",
        "75x75",
        "other-size",
      ];

      switch (this.value) {
        case "print":
          showValues(frameTypeSelect, printValues);
          hideValues(frameTypeSelect, canvasValues);
          hideValues(sizeSelect, canvasSizes);
          showValues(sizeSelect, printSizes);
          break;
        case "premium-canvas":
        case "standard-canvas":
          showValues(frameTypeSelect, canvasValues);
          hideValues(frameTypeSelect, printValues);
          hideValues(sizeSelect, printSizes);
          showValues(sizeSelect, canvasSizes);
          break;
        default:
          break;
      }
    });

    // FRAME TYPE SELECT LOGIC
    frameTypeSelect.addEventListener("change", function () {
      showRow(sizeRow);
      showRow(frameColourRow);

      clearField(frameColourSelect);
      clearField(sizeSelect);

      const framedValues = ["black", "pine", "white", "walnut"];
      const boxFrameValues = ["black", "white", "dark-walnut"];

      switch (this.value) {
        case "framed":
          showValues(frameColourSelect, framedValues);
          hideValues(frameColourSelect, ["dark-walnut"]);
          break;
        case "box-frame":
          showValues(frameColourSelect, boxFrameValues);
          hideValues(frameColourSelect, ["pine", "walnut"]);
          break;
        case "print-only":
        case "no-frame":
          hideRow(frameColourRow);
          frameColourSelect.value = "frameless-no-colour";
          break;
        default:
          break;
      }
    });

    sizeSelect.addEventListener("change", function () {});

    // SIZE TYPE SELECT LOGIC

    // GLOBAL FUNCTIONS
    function clearField(field) {
      field.selectedIndex = 0;
    }

    function hideRow(row) {
      row.style.display = "none";
    }

    function showRow(row) {
      row.style.display = "block";
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

    function resetFrameTypeSelect() {
      const successElement = document.querySelector(".is-success");
      if (successElement) {
        printTypeSelect.selectedIndex = 0;
      }
    }

    // re-order print type select options
    function reOrderOptions(selectField, order) {
      const options = Array.from(selectField.options);
      options.sort(function (a, b) {
        return order.indexOf(a.value) - order.indexOf(b.value);
      });

      const defaultSelectedIndex = printTypeSelect.selectedIndex;

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
