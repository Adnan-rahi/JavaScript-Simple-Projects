const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const password2 = document.getElementById("password2");

// Show error/success message

const showError = (input, message) => {
  const formControl = input.parentElement;
  formControl.className = "form-control error";
  const small = formControl.querySelector("small");
  small.innerText = message;
};

const showSuccess = (input) => {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
};

//Email Validation

const validateEmail = (input) => {
  const regEx =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (regEx.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showError(input, `${getFieldName(input)} Is Not Valid`);
  }
};

const matchPassword = (input1, input2) => {
  if (input1.value !== input2.value) {
    showError(input2, "Password do not match");
  }
};

const getFieldName = (input) => {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
};

const inputLength = (input, min, max) => {
  if (input.value.length < min) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showError(
      input,
      `${getFieldName(input)} must be less than ${max} characters`
    );
  } else {
    showSuccess(input);
  }
};
const inputValidation = (inputArr) => {
  inputArr.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${getFieldName(input)} Is Required`);
    } else {
      showSuccess(input);
    }
  });
};

form.addEventListener("submit", (e) => {
  e.preventDefault();

  inputValidation([username, email, password, password2]);
  inputLength(username, 3, 15);
  inputLength(password, 6, 15);
  inputLength(password2, 6, 15);
  validateEmail(email);
  matchPassword(password, password2);
});
