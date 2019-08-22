export function validateForm(values, formType){
  let errors = {};
  if (!values.email) {
    errors.email = 'Введите email';
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
  ) {
    errors.email = 'Неправильный email';
  }
  if (!values.password) {
    errors.password = 'Введите пароль';
  }
  if (!values.name&&formType=='registration') {
    errors.name = 'Введите имя';
  }
  if (!values.surname&&formType=='registration') {
    errors.surname = 'Введите фамилию';
  }
  return errors;
}