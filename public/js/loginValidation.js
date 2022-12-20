const loginForm = document.querySelector("#loginForm");

const userEmail = document.querySelector("input[name=email]");
const userPassword = document.querySelector("input[name=password]");

const validateEmptyField = (e) => {
    const field = e.target;
    if (field.value.trim() === "") {
        const spanTagError = field.nextElementSibling;
        spanTagError.innerText = "El campo " + field.name + " es obligatorio"
        spanTagError.classList.add("errors");
    } else {
        const spanTagError = field.nextElementSibling;
        spanTagError.innerText = ""
        spanTagError.classList.remove("errors");
    }
};

userEmail.addEventListener("blur", validateEmptyField);
userPassword.addEventListener("blur", validateEmptyField);

loginForm.addEventListener("submit", function (e) {
    let error = false;
    formFields = [...loginForm.elements];
    console.log(formFields);
    formFields.pop();

    formFields.forEach(oneField => {
        if (oneField.value.trim() === "") {
            const spanTagError = oneField.nextElementSibling;
            spanTagError.innerText = "El campo " + oneField.name + " es obligatorio"
            spanTagError.classList.add("errors");
            error = true;
        } else {
            const spanTagError = oneField.nextElementSibling;
            spanTagError.innerText = ""
            spanTagError.classList.remove("errors");
        }
    })
    if (error) {
        e.preventDefault(); //Evito que se envie el form
        console.log("El formulario no se va enviar")

    }
})