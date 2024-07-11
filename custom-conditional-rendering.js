document.addEventListener("DOMContentLoaded", function () {
  const table = document.querySelector(".variations");

  const frameTypeRow = table.rows[1];
  const frameColourRow = table.rows[2];
  const sizeRow = table.rows[3];

  const printTypeSelect = document.querySelector("#pa_print-type");
  const frameTypeSelect = document.querySelector("#pa_frame-type");
  const frameColourSelect = document.querySelector("#pa_frame-colour");
  const sizeSelect = document.querySelector("#pa_size");

  // Hide other inputs at the start
  if (table.rows.length > 1) {
    hideRow(frameTypeRow);
    hideRow(frameColourRow);
    hideRow(sizeRow);
  }

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

    switch (this.value) {
      case "print":
        showValues(frameTypeSelect, printValues);
        hideValues(frameTypeSelect, canvasValues);
        break;
      case "premium-canvas":
      case "standard-canvas":
        showValues(frameTypeSelect, canvasValues);
        hideValues(frameTypeSelect, printValues);
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

    const framelessText = "Frameless (no colour)";
    const framelessValue = "frameless-no-colour";

    switch (this.value) {
      case "framed":
        showValues(frameColourSelect, framedValues);
        hideValues(frameColourSelect, ["dark-walnut"]);
        removeColourlessOption(frameColourSelect, framelessValue);
        break;
      case "box-frame":
        showValues(frameColourSelect, boxFrameValues);
        hideValues(frameColourSelect, ["pine", "walnut"]);
        removeColourlessOption(frameColourSelect, framelessValue);
        break;
      case "print-only":
      case "no-frame":
        hideRow(frameColourRow);
        addColourlessOption(frameColourSelect, framelessValue, framelessText);
        break;
      default:
        break;
    }
  });

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

  // remove new colour option if it was added
  function removeColourlessOption(select, value) {
    const framelessOption = Array.from(select.options).find(
      (option) => option.value === value
    );
    console.log(framelessOption);
    if (framelessOption) {
      framelessOption.remove();
    }
  }

  // create new colour option to bypass required form field
  function addColourlessOption(select, value, text) {
    const hasNoFrame = new Option(text, value);
    select.add(hasNoFrame);
    select.selectedIndex = select.options.length - 1;
  }
});
