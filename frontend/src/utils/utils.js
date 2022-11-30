function validateProfile(values) {
  const { name, about } = values;
  const errors = {};

  if (!name) {
    errors.name = 'Поле не может быть пустым';
  }

  if (name.length > 0 && name.length < 2) {
    errors.name = 'Минимальное количество символов: 2';
  }

  if (!about) {
    errors.about = 'Поле не может быть пустым';
  }

  if (about.length > 0 && about.length < 2) {
    errors.about = 'Минимальное количество символов: 2';
  }

  return errors;
}

function validateCard(values) {
  const { name, link } = values;
  const errors = {};

  if (!name) {
    errors.name = 'Поле не может быть пустым';
  }

  if (name.length > 0 && name.length < 2) {
    errors.name = 'Минимальное количество символов: 2';
  }

  if (!link) {
    errors.link = 'Поле не может быть пустым';
  }
  const url = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  if (link.length > 0 && !url.test(link)) {
    errors.link = 'Укажите url-адрес';
  }

  return errors;
}

function validateRegister(values) {
  const { email, password } = values;
  const errors = {};

  if (!email) {
    errors.email = 'Поле не может быть пустым';
  }
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (email.length > 0 && !re.test(email)) {
    errors.email = 'Укажите правильный email';
  }

  if (!password) {
    errors.password = 'Поле не может быть пустым';
  }

  if (password.length > 0 && password.length < 2) {
    errors.password = 'Минимальное количество символов: 2';
  }

  return errors;
}

export { validateProfile, validateCard, validateRegister };
