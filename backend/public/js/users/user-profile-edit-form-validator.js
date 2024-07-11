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

  function isValidImage(input) {
    // Obtén el primer archivo seleccionado (asumimos que solo se permite seleccionar un archivo)
    const file = input.files[0];
  
    if (!file) {
      console.error("No se seleccionó ningún archivo");
      return false; // No se seleccionó ningún archivo
    }
  
    // Verifica la extensión del archivo
    const validExtensions = ["jpg", "jpeg", "png", "gif"];
    const fileExtension = file.name.split(".").pop().toLowerCase();
    console.log("Extensión del archivo:", fileExtension);
  
    const hasValidExtension = validExtensions.includes(fileExtension);
    console.log("Extensión válida:", hasValidExtension);
  
    return hasValidExtension;
  }

const validations = [
    {
      field: "firstName",
      check: (input) => input.value.length >= 2,
      message: "Debe contener al menos dos caracteres"
    },

    {
        field: "lastName",
        check: (input) => input.value.length >= 2,
        message: "Debe contener al menos dos caracteres" 
    },
    
    {
      field: "address",
      check: (input) => input.value.length >= 5,
      message: "Debe contener al menos cinco caracteres" // Ver como validar correctamente una direccion
    },
    
    {
        field: "email",
        check: (input) => isValidEmail(input.value),
        message: "Debe ser una dirección de correo electrónico válida", 
    },

    {
      field: "phone",
      check: (input) => /^\d{8,15}$/.test(input.value),
      message: "Debe tener un mínimo de ocho y un máximo de quince caracteres numéricos, sin guiones", 
    },

    {
      field: "password",
      check: (input) => isValidPassword(input.value),
      message: "Debe tener un mínimo de ocho caracteres, una mayúscula, una minúscula, un número y caracteres especiales", 
    },

    {
      field: "avatar",
      check: (input) => isValidImage(input),
      message: "Debe seleccionar una imagen válida (jpg, jpeg, png, etc.)",
    },
  ];
  
  validations.forEach((validation) => {
    const inputId = validation.field;
    const input = document.getElementById(inputId);
      
    function validate() {
      const inputId = validation.field;
      const input = document.getElementById(inputId);
      const inputErrorMsg = document.getElementById(inputId + "Error");

  // Asegurarse de que inputErrorMsg se seleccione correctamente
       if (!inputErrorMsg) {
       console.error("No se pudo encontrar el elemento de error para", inputId);
       return;
      }
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