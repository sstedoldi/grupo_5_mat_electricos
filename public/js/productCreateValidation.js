const productCreateForm = document.querySelector("#productCreateForm");

// const productCategory = document.getElementById("category");
const productCategory = document.querySelector("[name=category_id]");
const productSubCategory = document.querySelector("[name=subcategory_id]");
const productBrand = document.querySelector("[name=brand_id]");
const productNonVatPrice = document.querySelector("input[name=nonvatPrice]");
const productVat = document.querySelector("input[name=vat]");
const productDiscount = document.querySelector("input[name=discount]");
const productStock = document.querySelector("input[name=stock]");
const productStockMin = document.querySelector("input[name=stock_min]");
const productImage = document.querySelector("input[name=image]");
const productDescription = document.querySelector("textarea[name=description]");

const validateEmptyField = (e) => {
  const field = e.target;
  console.log(field);
  if (field.value.trim() === "") {
    const spanTagError = field.nextElementSibling;
    spanTagError.innerText = "El campo " + field.name + " es obligatorio";
    spanTagError.classList.add("errors");
  } else {
    const spanTagError = field.nextElementSibling;
    spanTagError.innerText = "";
    spanTagError.classList.remove("errors");
  }
};

productCategory.addEventListener("blur", validateEmptyField);
productSubCategory.addEventListener("blur", validateEmptyField);
productBrand.addEventListener("blur", validateEmptyField);
productNonVatPrice.addEventListener("blur", validateEmptyField);
productVat.addEventListener("blur", validateEmptyField);
productDiscount.addEventListener("blur", validateEmptyField);
productStock.addEventListener("blur", validateEmptyField);
productStockMin.addEventListener("blur", validateEmptyField);
productImage.addEventListener("blur", validateEmptyField);
productDescription.addEventListener("blur", validateEmptyField);

productCreateForm.addEventListener("submit", function (e) {
  let error = false;
  formFields = [...productCreateForm.elements];
  console.log(formFields);
  formFields.pop();

  formFields.forEach((oneField) => {
    if (oneField.value.trim() === "") {
      const spanTagError = oneField.nextElementSibling;
      spanTagError.innerText = "El campo " + oneField.name + " es obligatorio";
      spanTagError.classList.add("errors");
      error = true;
    } else {
      const spanTagError = oneField.nextElementSibling;
      spanTagError.innerText = "";
      spanTagError.classList.remove("errors");
    }
  });
  if (error) {
    e.preventDefault(); //Evito que se envie el form
    console.log("El formulario no se va enviar");
  }
});
