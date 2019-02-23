/* =========================================== EMAIL ============================================ */

const validateEmail = email => {
  const re = /^(?:[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&amp;'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/;

  return re.test(email);
};

const validatePassword = password => {
  const re = /^(?=^[A-Z])(?=.*\d)(?!.*\W).{8,}$/;

  return re.test(password);
};

const valiateFirstStringCapital = string => {
  const re = /^(?=^[A-Z])/;

  return re.test(string);
};

const validateDigit = string => {
  const re = /(?=.*\d)/;

  return re.test(string);
};

const validateMinimumEightStringLength = string => {
  const re = /.{8,}/;

  return re.test(string);
};

const valiateSpecialCharacter = string => {
  const re = /(?=.*\W)/;

  return re.test(string);
};

const validateUsername = username => {
  const re = /^(?!.*\W).{4,}$/;

  return re.test(username);
};

/* ============================================================================================== */
