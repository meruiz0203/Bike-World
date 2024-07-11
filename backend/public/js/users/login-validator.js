function isValidEmail(email) {
    // Expresión regular para validar un correo electrónico básico.
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  function isValidPassword(password) {
    // Expresión regular para validar la contraseña
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%?&#.$($)$-$_])[A-Za-z\d$@$!%?&#.$($)$-$_]{8,15}$/;

    // Verifica la contraseña con la expresión regular
    const isValid = passwordRegex.test(password);

    return isValid;
  }

const validations = [
    {
        field: "email",
        check: (input) => isValidEmail(input.value),
        message: "Debe ser una dirección de correo electrónico válida", 
    },

    {
      field: "password",
      check: (input) => isValidPassword(input.value),
      message: "Recuerda que tu contraseña contiene, entre otras características, un mínimo de ocho caracteres", 
    },
  ];
  
  validations.forEach((validation) => {
    const inputId = validation.field;
    const input = document.getElementById(inputId);
    const inputErrorMsg = document.getElementById(inputId + "Error");
  
    function validate() {
      console.log("input.value", input.value);
      inputValidation(validation, input, inputErrorMsg);
    }
  
    input.addEventListener("blur", validate);
    input.addEventListener("input", validate);
  });
  
  const form = document.getElementById("form");
  
  form.addEventListener("submit", (event) => {
    event.preventDefault();
  
    const validationsResult = [];
  
    validations.forEach((validation) => {
      const inputId = validation.field;
      const input = document.getElementById(inputId);
      const inputErrorMsg = document.getElementById(inputId + "Error");
      const result = inputValidation(validation, input, inputErrorMsg);
      validationsResult.push(result);
    });
  
    if (validationsResult.every((val) => val == true)) {
      form.submit();
    }
  });
  
  function inputValidation(validation, input, inputErrorMsg) {
    if (!input.value) {
      inputErrorMsg.innerText = "El campo no debe estar vacío";
      inputErrorMsg.classList.add("display");
      return false;
    }
  
    if (!validation.check(input)) {
      inputErrorMsg.innerText = validation.message;
      inputErrorMsg.classList.add("display");
      return false;
    }
  
    inputErrorMsg.innerText = "";
    inputErrorMsg.classList.remove("display");
    return true;
  }