"use client";
import { useState } from "react";
import { FormInput } from "../_components/form-input";
const checkEmailHasSpecial = (string) => {
  return /[!#$%^&*()_+=?""{};:<>]/.test(string);
};
const checkPassword = (string) => {
  return /[!^()-+=:;""?/<>|%]/.test(string);
};
const checkIfInputHasCharacter = (string) => {
  return /^\d+$/.test(string);
};
const addStepOneValuesToLocalStorages = (values) => {
  localStorage.setItem("stepTwo", JSON.stringify(values));
};
const check = (string) => {
  return /[%]/.test(string);
};
export const StepTwo = (props) => {
  const { handleNextStep } = props;
  const { handleBackStep } = props;
  const getStepOneValuesFromLocalStorages = () => {
    const values = localStorage.getItem("stepTwo");
    if (values) {
      return JSON.parse(values);
    } else {
      return {
        Email: "",
        Phonenumber: "",
        Password: "",
        Confirmpassword: "",
      };
    }
  };
  const [formValues, setFormValues] = useState({
    getStepOneValuesFromLocalStorages,
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
    if (!formValues.Email) {
      errors.Email = "email";
    } else if (checkEmailHasSpecial(formValues.Email)) {
      errors.Email = "email";
    } else if (check(formValues.Email)) {
      errors.Email = "email";
    }

    if (!formValues.Phonenumber) {
      errors.Phonenumber = "phone number";
    } else if (!checkIfInputHasCharacter(formValues.Phonenumber)) {
      errors.Phonenumber = "please ";
    } else if (formValues.Phonenumber.length !== 8) {
      errors.Phonenumber = "at least 8 numbers";
    }

    if (!formValues.Password) {
      errors.Password = "password";
    } else if (checkPassword(formValues.Password)) {
      errors.Password = "password";
    }
    if (!formValues.Confirmpassword) {
      errors.Confirmpassword = "confirm";
    } else if (formValues.Confirmpassword !== formValues.Password) {
      errors.Confirmpassword = "passwords";
    }
    return errors;
  };
  const handleContinueButton = () => {
    const errors = validateInput();
    if (Object.keys(errors).length === 0) {
      setErrorState({});
      addStepOneValuesToLocalStorages(formValues);
      handleNextStep();
    } else {
      setErrorState(errors);
    }
  };
  const disabled = () => {
    return (
      formValues.Email === 0 ||
      formValues.Phonenumber === 0 ||
      formValues.Password === 0 ||
      formValues.Confirmpassword === 0
    );
  };
  return (
    <div className="class1">
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
          inputTag={"Email"}
          handleChange={handleInputChange}
          name={"Email"}
          value={formValues.Email}
          errors={errorState.Email}
          errorsMess={"Please provide a valid email address."}
          place={"Enter your email..."}
        />
        <FormInput
          inputTag={"Phone number"}
          handleChange={handleInputChange}
          name={"Phonenumber"}
          value={formValues.Phonenumber}
          errors={errorState.Phonenumber}
          errorsMess={"Please enter a valid phone number."}
          place={"Enter your phone number..."}
        />
        <FormInput
          inputTag={"Password"}
          handleChange={handleInputChange}
          name={"Password"}
          value={formValues.Password}
          errors={errorState.Password}
          errorsMess={"Password must include letters and numbers."}
          place={"Enter your password..."}
        />
        <FormInput
          inputTag={"Confirm password"}
          handleChange={handleInputChange}
          name={"Confirmpassword"}
          value={formValues.Confirmpassword}
          errors={errorState.Confirmpassword}
          errorsMess={"Passwords do not match. Please try again."}
          place={"Enter your confirm password..."}
        />
      </div>
      <div className="backbutton">
        <button onClick={handleBackStep} className="back">
          Back
        </button>
        <button
          className="buttons"
          onClick={handleContinueButton}
          disabled={disabled()}
        >
          Submit <span>3/3 </span> <img src="./logo.png" />
        </button>
      </div>
    </div>
  );
};
