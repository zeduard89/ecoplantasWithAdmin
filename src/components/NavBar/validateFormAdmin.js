const validateFormAdmin = (formValues) => {
  let errors = {};

  if (!formValues.email) {
    errors.email = "El correo electrónico es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(formValues.email)) {
    errors.email = "El correo electrónico no es válido.";
  }
  if (!formValues.password) {
    errors.password = "El password es incorrecto.";
  }
  if (!formValues.password) {
    errors.password = "El password es incorrecto.";
  }

  return errors;
};

export default validateFormAdmin;