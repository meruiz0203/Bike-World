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
  
  const hasValidExtension = validExtensions.includes(fileExtension);

  return hasValidExtension;
}

const validations = [
    {
      field: "modelName",
      check: (input) => input.value.length >= 3,
      message: "Debe contener al menos tres caracteres", 
    },

    {
      field: "price",
      check: (input) => input.value > 0,
      message: "Debe ser un valor númerico mayor a 0", //Tambien deberia ser un valor numerico y expresado en pesos argentinos
    },
    
    
    {
      field: "description",
      check: (input) => input.value.length > 20,
      message: "Debe tener minimo 20 caracteres", 
      },

    {
        field: "image",
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