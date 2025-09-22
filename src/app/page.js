"use client";
import { StepOne } from "./_features/stepOne";
import { useState } from "react";
import { StepTwo } from "./_features/stepTwo";
import { StepThree } from "./_features/stepThree";
import { StepFour } from "./_features/stepFour";
import "./index.css";
export default function Home() {
  const [step, setStep] = useState(1);
  const handleNextStep = () => {
    setStep(step + 1);
  };
  const handleBackStep = () => {
    if (step === 1) {
      return;
    } else {
      setStep(step - 1);
    }
  };
  return (
    <>
      {step === 1 && <StepOne handleNextStep={handleNextStep} />}
      {step === 2 && (
        <StepTwo
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 3 && (
        <StepThree
          handleBackStep={handleBackStep}
          handleNextStep={handleNextStep}
        />
      )}
      {step === 4 && <StepFour />}
    </>
  );
}
