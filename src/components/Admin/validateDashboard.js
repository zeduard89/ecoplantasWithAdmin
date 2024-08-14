const validateForm = (newValues) => {
  let errors ='';

  if (!newValues.title || newValues.title == "") {
    errors = "Titulo es obligatorio.";
  }

  return errors;
};

export default validateForm;