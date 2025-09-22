"use client";
import { useState } from "react";
const addStepOneValuesToLocalStorages = (values) => {
  localStorage.setItem("stepThree", JSON.stringify(values));
};
export const StepThree = (props) => {
  const { handleBackStep } = props;
  const { handleNextStep } = props;
  const getStepOneValuesFromLocalStorages = () => {
    const values = localStorage.getItem("stepTwo");
    if (values) {
      return JSON.parse(values);
    } else {
      return {
        Dateofbirth: "",
        Profileimage: "",
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
  const [imgUrl, setImgUrl] = useState(null);
  const handleInputChange = (event) => {
    const newOB = { ...formValues, [event.target.name]: event.target.value };
    setFormValues(newOB);
  };
  const validateInput = () => {
    const errors = {};
    if (formValues.Dateofbirth == 0) {
      errors.Dateofbirth = "please select a date";
    } else if (!formValues.Dateofbirth) {
      errors.Dateofbirth = "date";
    } else {
      const today = new Date();
      const todays = new Date(formValues.Dateofbirth);
      let age = today.getFullYear() - todays.getFullYear();
      const monthdiff = today.getMonth() - todays.getMonth();
      const todaydiff = today.getDate() - todays.getDate();
      if (monthdiff < 0 || (monthdiff == 0 && todaydiff < 0)) {
        age--;
      }
      if (age < 18) {
        errors.Dateofbirth = "error";
      }
    }
    if (formValues.Profileimage === null) {
      errors.Profileimage = "image cannot be blank";
    } else if (!formValues.Profileimage) {
      errors.Profileimage = "profile";
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

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const newOB = { ...formValues, [event.target.name]: event.target.value };
    setFormValues(newOB);
    if (file) {
      setImgUrl(URL.createObjectURL(file));
    }
  };
  const handleRemoveInput = () => {
    setImgUrl(null);
  };
  const disabled = () => {
    return formValues.Dateofbirth === 0 || formValues.Profileimage === null;
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
      <div className="head" style={{ display: "flex", gap: "30px" }}>
        <div className="logo3" style={{ display: "flex", gap: "20px" }}>
          <p className="firstname">
            Date of birth <span className="star">*</span>
          </p>
          <input
            className="box"
            placeholder="--/--/--"
            type="date"
            name="Dateofbirth"
            onChange={handleInputChange}
            style={{
              borderColor: errorState.Dateofbirth ? "#e14942" : "lightgray",
              color: errorState.Dateofbirth ? "#e14942" : "black",
            }}
          />
          {errorState.Dateofbirth && (
            <div style={{ color: "#e14942" }}>Please select a date</div>
          )}
        </div>
        <div
          className="logo3"
          style={{ display: "flex", gap: "20px", height: "208px" }}
        >
          <p className="firstname">
            Profile image <span className="star">*</span>
          </p>
          <div className="image" style={{ position: "relative" }}>
            {!imgUrl ? (
              <div className="image-upload">
                <label htmlFor="file-input" style={{ cursor: "pointer" }}>
                  <img src="./image.svg" alt="Upload icon" />
                </label>
                <label className="add">Add image</label>

                <input
                  id="file-input"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  name="Profileimage"
                  accept="image/*"
                />
              </div>
            ) : (
              <img
                style={{
                  width: "100%",
                  height: "200px",
                  borderRadius: "10px",
                  border: "none",
                  display: "block",
                }}
                src={imgUrl}
                alt="Uplouded"
              />
            )}
            <button
              onClick={handleRemoveInput}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                background: "rgba(0,0,0,0.5)",
                color: "white",
                border: "none",
                borderRadius: "100%",
                padding: "5px 10px",
                cursor: "pointer",
              }}
            >
              x
            </button>
          </div>
          {errorState.Profileimage && (
            <div style={{ color: "#e14942" }}>Image cannot be blank</div>
          )}
        </div>
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
