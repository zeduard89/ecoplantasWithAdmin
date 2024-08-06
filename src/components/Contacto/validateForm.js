const validateForm = (formValues) => {
  let errors = {};

  if (!formValues.user_name) {
    errors.user_name = "El nombre completo es obligatorio.";
  }
  if (!formValues.user_direccion) {
    errors.user_direccion = "La dirección es obligatoria.";
  }
  if (!formValues.user_ciudad) {
    errors.user_ciudad = "La ciudad es obligatoria.";
  }
  if (!formValues.user_codigoPostal) {
    errors.user_codigoPostal = "El código postal es obligatorio.";
  }
  if (!formValues.user_telefono) {
    errors.user_telefono = "El teléfono es obligatorio.";
  } else if (!/^\d+$/.test(formValues.user_telefono)) {
    errors.user_telefono = "El teléfono debe ser un número.";
  }
  if (!formValues.user_email) {
    errors.user_email = "El correo electrónico es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(formValues.user_email)) {
    errors.user_email = "El correo electrónico no es válido.";
  }
  if (!formValues.message) {
    errors.message = "El mensaje es obligatorio.";
  }

  return errors;
};

export default validateForm;