"use client";
import { useState } from "react";
import { FormInput } from "../_components/form-input";
const checkIfInputHasSpecial = (string) => {
  return /[!@#$%^&*(),.?":{}|<>"]/.test(string);
};
const checkIfInputHasNumber = (string) => {
  return /\d/.test(string);
};
const addStepOneValuesToLocalStorage = (values) => {
  localStorage.setItem("stepOne", JSON.stringify(values));
};
export const StepOne = (props) => {
  const { handleNextStep } = props;
  const getStepOneValuesFromLocalStorage = () => {
    const values = localStorage.getItem("stepOne");
    if (values) {
      return JSON.parse(values);
    } else {
      return {
        firstName: "",
        lastName: "",
        userName: "",
      };
    }
  };
  const [formValues, setFormValues] = useState({
    getStepOneValuesFromLocalStorage,
  });
  const [errorState, setErrorState] = useState({});
  const stringObject = JSON.stringify(formValues);
  console.log("stringObject", stringObject);
  console.log(typeof stringObject);
  const object = JSON.parse(stringObject);
  console.log("object", object);
  console.log(typeof object);
  const handleInputChange = (e) => {
    const inputName = e.target.name;
    const inputValue = e.target.value;
    setFormValues({ ...formValues, [inputName]: inputValue });
  };
  const validateInput = () => {
    const errors = {};
    if (!formValues.firstName) {
      errors.firstName = "first name";
    } else if (checkIfInputHasSpecial(formValues.firstName)) {
      errors.firstName = "firstname";
    } else if (checkIfInputHasNumber(formValues.firstNameName)) {
      errors.firstName = "first name ";
    }
    if (!formValues.lastName) {
      errors.lastName = "first name";
    } else if (checkIfInputHasSpecial(formValues.lastName)) {
      errors.lastName = "firstname";
    } else if (checkIfInputHasNumber(formValues.lastName)) {
      errors.lastName = "first name ";
    }
    if (!formValues.userName) {
      errors.userName = "first name";
    } else if (checkIfInputHasSpecial(formValues.userName)) {
      errors.userNameNameName = "firstname";
    } else if (checkIfInputHasNumber(formValues.userName)) {
      errors.userName = "first name ";
    }
    return errors;
  };
  const handleContinueButton = () => {
    const errors = validateInput();
    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addStepOneValuesToLocalStorage(formValues);
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };
  const disabled = () => {
    return (
      formValues.firstName === 0 ||
      formValues.lastName === 0 ||
      formValues.userName === 0
    );
  };
  return (
    <div className="class">
      <div className="logo">
        <img src="./Main1.jpg" />
      </div>
      <div className="logo1">
        <img src="./title.png" />
      </div>
      <div className="logo2">
        <p className="text2">
          Please provide all current information accurately.
        </p>
      </div>
      <div className="head">
        <FormInput
          inputTag={"First name"}
          handleChange={handleInputChange}
          name={"firstName"}
          value={formValues.firstName}
          errors={errorState.firstName}
          errorsMess={"First name cannot contain special characters or numbers"}
          place={"Enter your first name..."}
        />
        <FormInput
          inputTag={"Last name"}
          handleChange={handleInputChange}
          name={"lastName"}
          value={formValues.lastName}
          errors={errorState.lastName}
          errorsMess={"Last name cannot contain special characters or numbers"}
          place={"Enter your last name..."}
        />
        <FormInput
          inputTag={"User name"}
          handleChange={handleInputChange}
          name={"userName"}
          value={formValues.userName}
          errors={errorState.userName}
          errorsMess={
            "This username is already taken. Please choose another one"
          }
          place={"Enter your username..."}
        />
      </div>
      <div className="butt">
        <button
          disabled={disabled()}
          className="button"
          onClick={handleContinueButton}
        >
          Continue
          <span> 1/3 </span>
          <img src="./logo.png" />
        </button>
      </div>
    </div>
  );
};
