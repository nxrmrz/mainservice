/* ======================================= INITIALISATION ======================================= */

const orderCommentsInit = order => {
  orderCommentsStructure(order);
};

/* ========================================= STRUCTURE ========================================== */

const orderCommentsStructure = order => {
  /* --------------------------------------- CREATE HTML ---------------------------------------- */
  const html =
    `<div class="order_details_comments_header">Comments:</div>` +
    `<div id="order_details_add_comment_body">` +
    `<textarea id="order_details_add_comment_input"></textarea>` +
    `<div id="order_details_add_comment_post_button_body">` +
    `<div id="order_details_add_comment_post_button">Post</div>` +
    `</div>` +
    `</div>` +
    `<div id="order_comments_loader"></div>` +
    `<div id="order_details_comments_body"></div>`;
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document.querySelector(`#order_comments_body`).innerHTML = html;
  /* ----------------------------------------- CONTENTS ----------------------------------------- */
  // LOAD COMMENTS
  orderCommentsLoad(order.orderNumber, order.ownerId);
  /* -------------------------------------- EVENT LISTENER -------------------------------------- */
  document
    .querySelector(`#order_details_add_comment_post_button`)
    .addEventListener(`click`, () => {
      orderCommentsPost(order);
    });
};

/* ======================================== POST COMMENT ======================================== */

const orderCommentsPost = order => {
  /* ------------------------------------- COLLECT COMMENT -------------------------------------- */
  const commentElement = document.querySelector(
    "#order_details_add_comment_input"
  );
  const comment = commentElement.value;
  /* ------------------------------------- VALIDATE COMMENT ------------------------------------- */
  if (!comment) {
    // IF NO COMMENT IS PROVIDED
    return;
  }
  /* -------------------------------------- CLEAR COMMENT --------------------------------------- */
  commentElement.value = "";
  /* -------------------------------------- SUBMIT COMMENT -------------------------------------- */
  $.ajax({
    type: "POST",
    url: "/order/comment",
    contentType: "application/json",
    data: JSON.stringify({ order, comment }),
    success: () => {
      orderCommentsLoad(order.orderNumber, order.ownerId);
    }
  });
};

/* ==================================== ORDER COMMENTS LOAD ===================================== */

const orderCommentsLoad = (orderNumber, ownerId) => {
  /* -------------------------------------- CLEAR COMMENTS -------------------------------------- */
  document.querySelector("#order_details_comments_body").innerHTML = "";
  /* ------------------------------------------ LOADER ------------------------------------------ */
  const element = document.querySelector("#order_comments_loader");
  const elements = [element];
  loadLoader(elements).then(() => {
    $.ajax({
      type: "POST",
      url: "/order/comments",
      contentType: "application/json",
      data: JSON.stringify({ ownerId, orderNumber }),
      success: data => {
        if (data.status == "success") {
          const commentDetailsObjects = data.content;
          /* -------------------------------- UPDATE DATE FORMAT -------------------------------- */
          for (i = 0; i < commentDetailsObjects.length; i++) {
            commentDetailsObjects[i].comment.date = dateFormatter(
              commentDetailsObjects[i].comment.date
            );
          }
          /* ----------------------- SORT ARRAY OF COMMENTS BASED ON DATE ----------------------- */
          commentDetailsObjects.sort(orderDetailsCompareDates);
          /* --------------------------------- DISPLAY COMMENTS --------------------------------- */
          for (i = 0; i < commentDetailsObjects.length; i++) {
            orderCommentsDisplayComment(commentDetailsObjects[i]);
          }
          /* ----------------------------------- CLEAR LOADER ----------------------------------- */
          document.querySelector("#order_comments_loader").innerHTML = "";
        } else {
          /* --------------------- UPDATED LOADER IF FAILED TO LOAD COMMENT --------------------- */
          document.querySelector("#order_comments_loader").innerHTML =
            "Failed to Load Comments";
        }
      }
    });
  });
};

/* =============================== ORDER COMMENTS DISPLAY COMMENT =============================== */

const orderCommentsDisplayComment = commentDetails => {
  /* -------------------------------------- SET IMAGE HTML -------------------------------------- */
  let imageHTML;
  if (commentDetails.profilePicture.availability) {
    // CHECK IF ACCOUNT HAS PROFILE PICTURE
    imageHTML = `<img src='/profile-picture/${
      commentDetails.profilePicture.id
    }' alt='' class='order_details_comment_author_profile_picture'>`;
  } else {
    // IF NO ACCOUNT HAS NO PROFILE PICTURE
    imageHTML = `<div class='order_details_comment_author_profile_picture'></div>`;
  }
  /* ------------------------------------- SET COMMENT HTML ------------------------------------- */
  let html;
  if (commentDetails.comment.ownership) {
    // CHECK IF THE COMMENT IS OWNED BY THE LOGGED IN USER
    html =
      `<div class='order_details_comment_body'>` +
      `<div class='order_details_comment'>` +
      `<div class='order_details_comment_date'>${
        commentDetails.comment.date.fromNow
      }</div>` +
      `<div class='order_details_comment_text'>${
        commentDetails.comment.text
      }</div>` +
      `</div>` +
      `<div class='order_details_comment_author_details'>` +
      imageHTML +
      `<div class='order_details_comment_author_profile_name'>${
        commentDetails.user.firstname
      }</div>` +
      `</div>` +
      `</div>`;
  } else {
    // IF THE COMMENT IS NOT OWNED BY LOGGED IN USER
    html =
      `<div class='order_details_comment_body'>` +
      `<div class='order_details_comment_author_details'>` +
      imageHTML +
      `<div class='order_details_comment_author_profile_name'>${
        commentDetails.user.firstname
      }</div>` +
      `</div>` +
      `<div class='order_details_comment'>` +
      `<div class='order_details_comment_date'>${
        commentDetails.comment.date.fromNow
      }</div>` +
      `<div class='order_details_comment_text'>${
        commentDetails.comment.text
      }</div>` +
      `</div>` +
      `</div>`;
  }
  /* --------------------------------------- INSERT HTML ---------------------------------------- */
  document
    .querySelector("#order_details_comments_body")
    .insertAdjacentHTML("beforeend", html);

  return;
};

/* =================================== ORDER DETAILS COMMENTS =================================== */

const orderDetailsCompareDates = (a, b) => {
  if (a.comment.date.year === b.comment.date.year) {
    if (a.comment.date.month[1] === b.comment.date.month[1]) {
      if (a.comment.date.date === b.comment.date.date) {
        if (a.comment.date.hour[1] === b.comment.date.hour[1]) {
          if (a.comment.date.minute === b.comment.date.minute) {
            if (a.comment.date.second === b.comment.date.second) {
              return 0;
            } else if (a.comment.date.second > b.comment.date.second) {
              return -1;
            } else if (a.comment.date.second < b.comment.date.second) {
              return 1;
            }
          } else if (a.comment.date.minute > b.comment.date.minute) {
            return -1;
          } else if (a.comment.date.minute < b.comment.date.minute) {
            return 1;
          }
        } else if (a.comment.date.hour[1] > b.comment.date.hour[1]) {
          return -1;
        } else if (a.comment.date.hour[1] < b.comment.date.hour[1]) {
          return 1;
        }
      } else if (a.comment.date.date > b.comment.date.date) {
        return -1;
      } else if (a.comment.date.date < b.comment.date.date) {
        return 1;
      }
    } else if (a.comment.date.month[1] > b.comment.date.month[1]) {
      return -1;
    } else if (a.comment.date.month[1] < b.comment.date.month[1]) {
      return 1;
    }
  } else if (a.comment.date.year > b.comment.date.year) {
    return -1;
  } else if (a.comment.date.year < b.comment.date.year) {
    return 1;
  }
};

/* ============================================================================================== */
