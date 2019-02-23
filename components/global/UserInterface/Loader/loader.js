// Create the Loader Element
const loadLoader = (elementArray, size) => {
  return new Promise((resolve, reject) => {
    let html;

    if (size == "small") {
      html =
        "<div class='loader_element_body'>" +
        "<div class='small_loader'></div>" +
        "</div>";
    } else if (size == "large") {
    } else {
      html =
        "<div class='loader_element_body'>" +
        "<div class='loader_element'></div>" +
        "</div>";
    }

    for (let i = 0; i < elementArray.length; i++) {
      elementArray[i].innerHTML = html;
    }

    resolve();
  });
};

const loaderElement =
  "<div class='loader_element_body'>" +
  "<div class='loader_element'></div>" +
  "</div>";
