/* =================================== ORDER DETAILS COMMENTS =================================== */

const constructOrderDetailsComments = (order, orderStatusId) => {
  const orderDetailsCommentsStructureHTML =
    "<div class='order_details_comments_header'>Comments:</div>" +
    "<div id='order_details_add_comment_body'>" +
    "<textarea id='order_details_add_comment_input'></textarea>" +
    "<div id='order_details_add_comment_post_button_body'>" +
    "<div id='order_details_add_comment_post_button'>Post</div>" +
    "</div>" +
    "</div>" +
    "<div id='order_details_comments_body'></div> ";

  document
    .querySelector("#" + orderStatusId + "_order_details_comments_body")
    .insertAdjacentHTML("beforeend", orderDetailsCommentsStructureHTML);

  loadOrderDetailsComments(order.ownerId, order.orderNumber);

  document
    .querySelector("#order_details_add_comment_post_button")
    .addEventListener("click", () => {
      postOrderDetailsComments(order);
    });
};

const postOrderDetailsComments = order => {
  const comment = document.querySelector("#order_details_add_comment_input")
    .value;
  if (!comment) {
    return;
  }

  $.ajax({
    type: "POST",
    url: "/Profile/order-comment",
    contentType: "application/json",
    data: JSON.stringify({ order: order, comment: comment }),
    success: data => {
      loadOrderDetailsComments(data.orderOwnerId, data.orderOrderNumber);
    },
    dataType: "json"
  });
};

const loadOrderDetailsComments = (ownerId, orderNumber) => {
  loadLoader(document.querySelector("#order_details_comments_body")).then(
    () => {
      $.ajax({
        type: "POST",
        url: "/Profile/order-comments",
        contentType: "application/json",
        data: JSON.stringify({ ownerId: ownerId, orderNumber: orderNumber }),
        success: data => {
          populateOrderDetailsComments(data);
        }
      });
    }
  );
};

const orderDetailsCompareDates = (a, b) => {
  if (a.date.year === b.date.year) {
    if (a.date.month[1] === b.date.month[1]) {
      if (a.date.date === b.date.date) {
        if (a.date.hour[1] === b.date.hour[1]) {
          if (a.date.minute === b.date.minute) {
            if (a.date.second === b.date.second) {
              return 0;
            } else if (a.date.second > b.date.second) {
              return -1;
            } else if (a.date.second < b.date.second) {
              return 1;
            }
          } else if (a.date.minute > b.date.minute) {
            return -1;
          } else if (a.date.minute < b.date.minute) {
            return 1;
          }
        } else if (a.date.hour[1] > b.date.hour[1]) {
          return -1;
        } else if (a.date.hour[1] < b.date.hour[1]) {
          return 1;
        }
      } else if (a.date.date > b.date.date) {
        return -1;
      } else if (a.date.date < b.date.date) {
        return 1;
      }
    } else if (a.date.month[1] > b.date.month[1]) {
      return -1;
    } else if (a.date.month[1] < b.date.month[1]) {
      return 1;
    }
  } else if (a.date.year > b.date.year) {
    return -1;
  } else if (a.date.year < b.date.year) {
    return 1;
  }
};

const populateOrderDetailsComments = data => {
  document.querySelector("#order_details_comments_body").innerHTML = "";

  let commentsObjectArray = [];

  class CommentObject {
    constructor(userName, comment, date, ownership) {
      this.userName = userName;
      this.comment = comment;
      this.date = date;
      this.ownership = ownership;
    }
  }
  for (i = 0; i < data.length; i++) {
    commentsObjectArray.push(
      new CommentObject(
        data[i].userName,
        data[i].comment,
        dateFormatter(data[i].dateCreated),
        data[i].ownership
      )
    );
  }
  commentsObjectArray.sort(orderDetailsCompareDates);

  commentsObjectArray.forEach(element => {
    addOrderDetailsComment(element);
  });
};

const addOrderDetailsComment = commentDetail => {
  let orderDetailsCommentHTML;
  if (commentDetail.ownership) {
    orderDetailsCommentHTML =
      "<div class='order_details_comment_body'>" +
      "<div class='order_details_comment'>" +
      "<div class='order_details_comment_date'>" +
      commentDetail.date.fromNow +
      "</div>" +
      "<div class='order_details_comment_text'>" +
      commentDetail.comment +
      "</div>" +
      "</div>" +
      "<div class='order_details_comment_author_details'>" +
      "<div class='order_details_comment_author_profile_picture'></div>" +
      "<div class='order_details_comment_author_profile_name'>" +
      commentDetail.userName +
      "</div>" +
      "</div>" +
      "</div>";
  } else {
    orderDetailsCommentHTML =
      "<div class='order_details_comment_body'>" +
      "<div class='order_details_comment_author_details'>" +
      "<div class='order_details_comment_author_profile_picture'></div>" +
      "<div class='order_details_comment_author_profile_name'>" +
      commentDetail.userName +
      "</div>" +
      "</div>" +
      "<div class='order_details_comment'>" +
      "<div class='order_details_comment_date'>" +
      commentDetail.date.fromNow +
      "</div>" +
      "<div class='order_details_comment_text'>" +
      commentDetail.comment +
      "</div>" +
      "</div>" +
      "</div>";
  }
  document
    .querySelector("#order_details_comments_body")
    .insertAdjacentHTML("beforeend", orderDetailsCommentHTML);
};

/* ============================================================================================== */
