const validateForm = (newValues) => {
  let errors = {};

  if (!newValues.title || newValues.title == "") {
    errors.title = "Titulo es obligatorio.";
  }
  if (!newValues.title || newValues.title == "") {
    errors.base = "Base es obligatorio.";
  }

  return errors;
};

export default validateForm;