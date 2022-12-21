const registerForm = document.querySelector("#registerForm");

const userName = document.querySelector("input[name=name]");
const userlastName = document.querySelector("input[name=lastName]");
const useraddress = document.querySelector("input[name=address]");
const userbirthDate = document.querySelector("input[name=birthDate]");
const userEmail = document.querySelector("input[name=email]");
const userPassword = document.querySelector("input[name=password]");

const validateEmptyField = (e) => {
  const field = e.target;
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

userName.addEventListener("blur", validateEmptyField);
userlastName.addEventListener("blur", validateEmptyField);
useraddress.addEventListener("blur", validateEmptyField);
userbirthDate.addEventListener("blur", validateEmptyField);
userEmail.addEventListener("blur", validateEmptyField);
userPassword.addEventListener("blur", validateEmptyField);

registerForm.addEventListener("submit", function (e) {
  let error = false;
  formFields = [...registerForm.elements];
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
