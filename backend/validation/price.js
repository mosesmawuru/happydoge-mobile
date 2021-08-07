const Validator = require("validator");
const isEmpty = require("../utils/is-Empty");

module.exports = function validatePrice(data) {
  let errors = {};

  data.price = !isEmpty(data.price) ? data.price : "";

  if (Validator.isEmpty(data.price)) {
    errors.price = "Price field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
