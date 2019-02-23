/* ========================================= INITIALISE ========================================= */

const orderDetailPartsInit = orderDetails => {
  orderDetailPartsStructure();
  orderDetailProcessParts(orderDetails);
};

/* ========================================= STRUCTURE ========================================== */

const orderDetailPartsStructure = () => {
  // PARTS HTML STRUCTURE
  html = "<div id='order_detail_parts_table_body'></div>";
  // INSERT PARTS HTML STRUCTURE
  document.querySelector("#order_detail_parts_body").innerHTML = html;
};

/* ============================================ PART ============================================ */

/* ---------------------------------- PART OBJECT CONSTRUCTOR ----------------------------------- */

class OrderDetailPartObject {
  constructor(
    id,
    name,
    materialGroup,
    process,
    material,
    quality,
    qualityDescription,
    strength,
    strengthDescription,
    color,
    orderedQuantity,
    producedQuantity,
    perUnitPrice
  ) {
    this.id = id;
    this.name = name;
    this.materialGroup = materialGroup;
    this.process = process;
    this.material = material;
    this.quality = quality;
    this.qualityDescription = qualityDescription;
    this.strength = strength;
    this.strengthDescription = strengthDescription;
    this.color = color;
    this.orderedQuantity = Number(orderedQuantity);
    this.producedQuantity = Number(producedQuantity);
    this.perUnitPrice = Number(perUnitPrice);
    this.totalPrice = Number(perUnitPrice) * Number(orderedQuantity);
  }

  totalPriceCalculation() {
    return (
      "$" +
      numberToTwoDecimalStringConverter(this.perUnitPrice) +
      " x " +
      this.orderedQuantity +
      " = $" +
      numberToTwoDecimalStringConverter(this.totalPrice)
    );
  }
}

/* ------------------------------------- PROCESS EACH PARTS ------------------------------------- */

const orderDetailProcessParts = orderDetails => {
  const fileIdArray = orderDetails.parts.map(part => part.fileId);

  getFileDetailsArrayByFileIdArray(fileIdArray)
    .then(fileDetailsArray => {
      orderDetails.parts.forEach(part => {
        const id = part.fileId;
        const name = part.fileName;
        const materialGroup = part.materialGroup;
        const process = part.process;
        const material = part.material;
        const quality = part.quality;
        const qualityDescription = printingQualityDescription(quality);
        const strength = part.strength;
        const strengthDescription = printingStrengthDescription(strength);
        const color = part.color;
        const orderedQuantity = part.orderQuantity;
        const producedQuantity = part.producedQuantity;
        const perUnitPrice = fileDetailsArray.filter(
          fileDetails => String(fileDetails._id) == String(id)
        )[0].metadata.price;

        const partObject = new OrderDetailPartObject(
          id,
          name,
          materialGroup,
          process,
          material,
          quality,
          qualityDescription,
          strength,
          strengthDescription,
          color,
          orderedQuantity,
          producedQuantity,
          perUnitPrice
        );

        orderDetailAddPart(partObject, orderDetails.orderStatus);
      });
    })
    .catch(error => console.log(error));
};

/* -------------------------------------- CREATE PART HTML -------------------------------------- */

const orderDetailAddPart = (part, orderStatus) => {
  let totalPrice;
  if (orderStatus == "Awaiting Quote") {
    totalPrice = "Pending";
  } else {
    totalPrice = "$" + numberToTwoDecimalStringConverter(part.totalPrice);
  }
  // PART HTML
  html =
    "<div class='order_detail_part_table_body'>" +
    "<div class='order_detail_part_table_cell order_detail_part_name_table_cell'>" +
    "<div class='order_detail_part_table_cell_heading_body'>" +
    "<div class='order_detail_part_table_cell_heading_text'>Part</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell_content_body'>" +
    "<a href='/file/download/" +
    part.id +
    "' class='order_detail_part_table_cell_content_text'>" +
    fileNameToNameFormatter(part.name, 20) +
    "</a>" +
    "</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell'>" +
    "<div class='order_detail_part_table_cell_heading_body'>" +
    "<div class='order_detail_part_table_cell_heading_text'>Quantity</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell_content_body'>" +
    "<div class='order_detail_part_table_cell_content_text'>" +
    part.producedQuantity +
    "/" +
    part.orderedQuantity +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell'>" +
    "<div class='order_detail_part_table_cell_heading_body'>" +
    "<div class='order_detail_part_table_cell_heading_text'>Price</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell_content_body'>" +
    "<div class='order_detail_part_table_cell_content_text'>" +
    totalPrice +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell'>" +
    "<div class='order_detail_part_table_cell_heading_body'>" +
    "<div class='order_detail_part_table_cell_heading_text'>Quality</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell_content_body'>" +
    "<div class='order_detail_part_table_cell_content_text'>" +
    part.quality +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell'>" +
    "<div class='order_detail_part_table_cell_heading_body'>" +
    "<div class='order_detail_part_table_cell_heading_text'>Strength</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell_content_body'>" +
    "<div class='order_detail_part_table_cell_content_text'>" +
    part.strength +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell'>" +
    "<div class='order_detail_part_table_cell_heading_body'>" +
    "<div class='order_detail_part_table_cell_heading_text'>Color</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell_content_body'>" +
    "<div class='order_detail_part_table_cell_content_text'>" +
    part.color +
    "</div>" +
    "</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell'>" +
    "<div class='order_detail_part_table_cell_heading_body'>" +
    "<div class='order_detail_part_table_cell_heading_text'>Material</div>" +
    "</div>" +
    "<div class='order_detail_part_table_cell_content_body'>" +
    "<div class='order_detail_part_table_cell_content_text'>" +
    part.material +
    "</div>" +
    "</div>" +
    "</div>" +
    "</div>";
  // INSERT PART HTML
  document
    .querySelector("#order_detail_parts_table_body")
    .insertAdjacentHTML("beforeend", html);
};

/* ============================== 3D PRINTING QUALITY DESCRIPTION =============================== */

const printingQualityDescription = quality => {
  let description;

  if (quality == "Normal") {
    description = "200 Micron";
  } else if (quality == "High") {
    description = "100 Micron";
  } else if (quality == "Very High") {
    description = "50 Micron";
  }

  return description;
};

/* ============================== 3D PRINTING STRENGTH DESCRIPTION ============================== */

const printingStrengthDescription = strength => {
  let description;

  if (strength == "Hollow") {
    description = "0%";
  } else if (strength == "Normal") {
    description = "25%";
  } else if (strength == "Strong") {
    description = "50%";
  } else if (strength == "Very Strong") {
    description = "75%";
  } else if (strength == "Solid") {
    description = "100%";
  }

  return description;
};

/* ============================================================================================== */
