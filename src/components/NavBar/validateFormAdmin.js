const validateFormAdmin = (formValues) => {
  let errors = {};

  if (!formValues.username) {
    errors.username = "Usuario obligatorio.";
  }
  if (!formValues.password) {
    errors.password = "El password es incorrecto.";
  }

  return errors;
};

export default validateFormAdmin;