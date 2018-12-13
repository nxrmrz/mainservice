// Create the Loader Element
const loadLoader = element => {
  return new Promise((resolve, reject) => {
    const html =
      "<div class='loader_element_body'>" +
      "<div class='loader_element'></div>" +
      "</div>";

    element.innerHTML = html;

    resolve();
  });
};

const loaderElement =
  "<div class='loader_element_body'>" +
  "<div class='loader_element'></div>" +
  "</div>";
