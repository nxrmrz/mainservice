/* ======================================= INITIALISATION ======================================= */

const adminProfileOrdersPrintsDiscountInit = () => {
  constructAdminProfileOrdersPrintsDiscountBaseHTML();
  adminProfileOrdersPrintsListDiscounts();
};

/* ======================= ADMIN DISCOUNT MANAGEMENT CONSTRUCT BASE HTML ======================== */

const constructAdminProfileOrdersPrintsDiscountBaseHTML = () => {
  // Create the Base HTML
  const adminProfilePrintsDiscountBaseHTML =
    "<div id='admin_profile_orders_prints_discount_body'>" +
    "<div id='admin_profile_orders_prints_discount_add_discount_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_text'>Name</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_body'>" +
    "<input type='text' id='admin_profile_orders_prints_discount_discount_name_input' class='admin_profile_orders_prints_discount_add_discount_input_text'>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_text'>Code</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_body'>" +
    "<input type='text' id='admin_profile_orders_prints_discount_discount_code_input' class='admin_profile_orders_prints_discount_add_discount_input_text'>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_text'>Rate</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_body'>" +
    "<input type='text' id='admin_profile_orders_prints_discount_discount_rate_input' class='admin_profile_orders_prints_discount_add_discount_input_text'>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_text'>Type</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_body'>" +
    "<select id='admin_profile_orders_prints_discount_discount_type_input' " +
    "class='admin_profile_orders_prints_discount_add_discount_input_select'>" +
    "<option value='limited'>Limited</option>" +
    "<option value='unlimited'>Unlimited</option>" +
    "</select>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_text'>Min Order Value</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_body'>" +
    "<input type='number' id='admin_profile_orders_prints_discount_discount_min_order_value_input' class='admin_profile_orders_prints_discount_add_discount_input_text'>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_text'>Max Order Value</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_body'>" +
    "<input type='number' id='admin_profile_orders_prints_discount_discount_max_order_value_input' class='admin_profile_orders_prints_discount_add_discount_input_text'>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_body admin_profile_orders_prints_discount_add_discount_date_input_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_text'>Start Date</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_body'>" +
    "<select id='admin_profile_orders_prints_discount_discount_start_date_input' " +
    "class='admin_profile_orders_prints_discount_add_discount_input_select admin_profile_orders_prints_discount_discount_date_input_select'></select>" +
    "<select id='admin_profile_orders_prints_discount_discount_start_month_input' " +
    "class='admin_profile_orders_prints_discount_add_discount_input_select admin_profile_orders_prints_discount_discount_month_input_select'></select>" +
    "<select id='admin_profile_orders_prints_discount_discount_start_year_input' " +
    "class='admin_profile_orders_prints_discount_add_discount_input_select admin_profile_orders_prints_discount_discount_year_input_select'></select>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_body admin_profile_orders_prints_discount_add_discount_date_input_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_field_header_text'>End Date</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_add_discount_input_body'>" +
    "<select id='admin_profile_orders_prints_discount_discount_end_date_input' " +
    "class='admin_profile_orders_prints_discount_add_discount_input_select admin_profile_orders_prints_discount_discount_date_input_select'></select>" +
    "<select id='admin_profile_orders_prints_discount_discount_end_month_input' " +
    "class='admin_profile_orders_prints_discount_add_discount_input_select admin_profile_orders_prints_discount_discount_month_input_select'></select>" +
    "<select id='admin_profile_orders_prints_discount_discount_end_year_input' " +
    "class='admin_profile_orders_prints_discount_add_discount_input_select admin_profile_orders_prints_discount_discount_year_input_select'></select>" +
    "</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_discount_add_discount_button_body'>" +
    "<div id='admin_profile_orders_prints_discount_add_discount_button'>" +
    "<div id='admin_profile_orders_prints_discount_add_discount_button_text'>Add Discount</div>" +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div id='admin_profile_orders_prints_discount_discount_list_body'></div>" +
    "</div>";

  // Insert the Base HTML
  document
    .querySelector("#admin_profile_orders_prints_body")
    .insertAdjacentHTML("afterbegin", adminProfilePrintsDiscountBaseHTML);

  // Populate Date Input Fields
  // Start Date
  populateDateMonthYearSelectFields(
    "admin_profile_orders_prints_discount_discount_start_date_input",
    "admin_profile_orders_prints_discount_discount_start_month_input",
    "admin_profile_orders_prints_discount_discount_start_year_input"
  );
  // End Date
  populateDateMonthYearSelectFields(
    "admin_profile_orders_prints_discount_discount_end_date_input",
    "admin_profile_orders_prints_discount_discount_end_month_input",
    "admin_profile_orders_prints_discount_discount_end_year_input"
  );

  // Add Event Listener for Add Discount Button
  document
    .querySelector("#admin_profile_orders_prints_discount_add_discount_button")
    .addEventListener("click", () => {
      adminProfileOrdersPrintsAddNewDiscount();
    });
};

/* ============================== ADMIN DISCOUNT ADD NEW DISCOUNT =============================== */

const adminProfileOrdersPrintsAddNewDiscount = () => {
  // Declare Object for New Discount
  let newDiscount = {};

  // Collect Input
  newDiscount = adminProfileOrdersPrintsCollectNewDiscount();

  // Submit to Backend
  adminProfileOrdersPrintsSubmitNewDiscount(
    newDiscount.name,
    newDiscount.code,
    newDiscount.rate,
    newDiscount.type,
    newDiscount.minOrderValue,
    newDiscount.maxOrderValue,
    newDiscount.startDate,
    newDiscount.endDate
  );
};

/* ---------------------------------- COLLECT DISCOUNT INPUTS ----------------------------------- */

const adminProfileOrdersPrintsCollectNewDiscount = () => {
  const name = document.querySelector(
    "#admin_profile_orders_prints_discount_discount_name_input"
  ).value;
  const code = document.querySelector(
    "#admin_profile_orders_prints_discount_discount_code_input"
  ).value;
  const rate = document.querySelector(
    "#admin_profile_orders_prints_discount_discount_rate_input"
  ).value;
  const type = document.querySelector(
    "#admin_profile_orders_prints_discount_discount_type_input"
  ).value;
  const minOrderValue = document.querySelector(
    "#admin_profile_orders_prints_discount_discount_min_order_value_input"
  ).value;
  const maxOrderValue = document.querySelector(
    "#admin_profile_orders_prints_discount_discount_max_order_value_input"
  ).value;
  const startDate = document.querySelector(
    "#admin_profile_orders_prints_discount_discount_start_date_input"
  ).value;
  const startMonth = monthNameToNumberConversion(
    document.querySelector(
      "#admin_profile_orders_prints_discount_discount_start_month_input"
    ).value
  );
  const startYear = document.querySelector(
    "#admin_profile_orders_prints_discount_discount_start_year_input"
  ).value;
  const endDate = document.querySelector(
    "#admin_profile_orders_prints_discount_discount_end_date_input"
  ).value;
  const endMonth = monthNameToNumberConversion(
    document.querySelector(
      "#admin_profile_orders_prints_discount_discount_end_month_input"
    ).value
  );
  const endYear = document.querySelector(
    "#admin_profile_orders_prints_discount_discount_end_year_input"
  ).value;

  let startDateFormatted;
  let endDateFormatted;

  if (!startDate || !startMonth || !startYear) {
    startDateFormatted = "";
  } else {
    startDateFormatted = new Date(startYear, startMonth - 1, startDate);
  }

  if (!endDate || !endMonth || !endYear) {
    endDateFormatted = "";
  } else {
    endDateFormatted = new Date(endYear, endMonth - 1, endDate);
  }

  return {
    name,
    code,
    rate,
    type,
    minOrderValue,
    maxOrderValue,
    startDate: startDateFormatted,
    endDate: endDateFormatted
  };
};

/* ------------------------------------ SUBMIT NEW DISCOUNT ------------------------------------- */

const adminProfileOrdersPrintsSubmitNewDiscount = (
  name,
  code,
  rate,
  type,
  minOrderValue,
  maxOrderValue,
  startDate,
  endDate
) => {
  $.ajax({
    type: "POST",
    url: "/discount/create",
    data: {
      name,
      code,
      rate,
      type,
      minOrderValue,
      maxOrderValue,
      startDate,
      endDate
    },
    success: data => {
      if (data === "success") {
        adminProfileOrdersPrintsListDiscounts();
      }
    }
  });
};

/* ================================= DISPLAY LIST OF DISCOUNTS ================================== */

const adminProfileOrdersPrintsListDiscounts = () => {
  // Loader
  loadLoader(
    document.querySelector(
      "#admin_profile_orders_prints_discount_discount_list_body"
    )
  ).then(() => {
    let discounts = adminProfileOrdersPrintsCollectDiscounts();

    document.querySelector(
      "#admin_profile_orders_prints_discount_discount_list_body"
    ).innerHTML = "";

    discounts.forEach(discount => {
      adminProfileOrdersPrintsDisplayDiscount(discount);
    });
  });
};

/* ------------------------------ COLLECT DISCOUNTS FROM DATABASE ------------------------------- */

const adminProfileOrdersPrintsCollectDiscounts = () => {
  let discount;

  $.ajax({
    type: "GET",
    async: false,
    url: "/discounts",
    success: data => {
      if (!data) {
        discount = "failed to fetch data";
      } else if (data === "error") {
        discount = "error found when fetching data";
      } else if (data === "no discount found") {
        discount = data;
      } else {
        discount = data;
      }
    }
  });

  return discount;
};

/* -------------------------------------- DISPLAY DISCOUNT -------------------------------------- */

const adminProfileOrdersPrintsDisplayDiscount = discount => {
  // Format the Start and End Date
  let startDate;
  let endDate;

  if (discount.startDate === "") {
    startDate = "";
  } else {
    startDate = dayDateMonthYearFormat(discount.startDate);
  }

  if (discount.endDate === "") {
    endDate = "";
  } else {
    endDate = dayDateMonthYearFormat(discount.endDate);
  }

  // Create the Discount HTML
  const adminProfileOrdersPrintsDiscountHTML =
    "<div class='admin_profile_orders_prints_discount_discount_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_text'>Name</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_text'>" +
    discount.name +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_text'>Code</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_text'>" +
    discount.code +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_text'>Rate</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_text'>" +
    discount.rate +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_text'>Type</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_text'>" +
    discount.type +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_text'>Min Order Value</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_text'>" +
    discount.minOrderValue +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_text'>Max Order Value</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_text'>" +
    discount.maxOrderValue +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_text'>Start Date</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_text'>" +
    startDate +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_field_header_text'>End Date</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_body'>" +
    "<div class='admin_profile_orders_prints_discount_discount_input_text'>" +
    endDate +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='admin_profile_orders_prints_discount_delete_discount_button_body'>" +
    "<div id='admin_profile_orders_prints_discount_delete_" +
    discount._id +
    "_discount_button' class='admin_profile_orders_prints_discount_delete_discount_button'>" +
    "<div class='admin_profile_orders_prints_discount_delete_discount_button_text'>Delete Discount</div>" +
    "</div>" +
    "</div>" +
    "</div>";

  // Insert the Discount HTML
  document
    .querySelector("#admin_profile_orders_prints_discount_discount_list_body")
    .insertAdjacentHTML("beforeend", adminProfileOrdersPrintsDiscountHTML);

  // Add Delete Button Click Listener
  document
    .querySelector(
      "#admin_profile_orders_prints_discount_delete_" +
        discount._id +
        "_discount_button"
    )
    .addEventListener("click", () => {
      adminProfileOrdersPrintsDeleteDiscount(discount._id);
      adminProfileOrdersPrintsListDiscounts();
    });

  return;
};

/* -------------------------------------- DELETE DISCOUNT --------------------------------------- */

const adminProfileOrdersPrintsDeleteDiscount = id => {
  $.ajax({
    type: "POST",
    async: false,
    url: "/discount/delete",
    data: { id },
    success: data => {
      console.log(data);
    }
  });
};

/* ============================================================================================== */
