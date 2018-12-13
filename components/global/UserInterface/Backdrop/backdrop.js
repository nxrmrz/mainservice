let backdropClosing = false;

/* ======================================== ADD BACKDROP ======================================== */

const addBackdrop = (id, method) => {
  if (document.querySelector("#backdrop")) {
    return;
  }

  const backdropHTML =
    "<div id='" + id + "_backdrop' class='backdrop backdrop_initial'></div>";

  document.querySelector("body").insertAdjacentHTML("beforeend", backdropHTML);

  setTimeout(() => {
    document
      .querySelector("#" + id + "_backdrop")
      .classList.toggle("backdrop_final");
  }, 0);

  document
    .querySelector("#" + id + "_backdrop")
    .addEventListener("click", () => {
      if (backdropClosing) {
        return;
      }

      if (method) {
        method();
      }
      removeBackdrop(id);
    });
};

/* ====================================== REMOVE BACKDROP ======================================= */

const removeBackdrop = id => {
  backdropClosing = true;
  document
    .querySelector("#" + id + "_backdrop")
    .classList.toggle("backdrop_final");

  setTimeout(() => {
    backdropClosing = false;

    document
      .querySelector("body")
      .removeChild(document.querySelector("#" + id + "_backdrop"));
  }, 500);
};
