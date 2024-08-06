const validateCatalogo = (formValues) => {
  let errors = {};

  if (!formValues.user_name) {
    errors.user_name = "Nombre obligatorio.";
  }
  if (!formValues.user_direccion) {
    errors.user_direccion = "Dirección obligatoria.";
  }
  if (!formValues.user_telefono) {
    errors.user_telefono = "Campo obligatorio.";
  } else if (!/^\d+$/.test(formValues.user_telefono)) {
    errors.user_telefono = "Teléfono debe ser un número.";
  }
  if (!formValues.user_email) {
    errors.user_email = "El correo es obligatorio.";
  } else if (!/\S+@\S+\.\S+/.test(formValues.user_email)) {
    errors.user_email = "El correo no es válido.";
  }
  return errors;
};

export default validateCatalogo;