"use client"
// MultiStepForm.tsx
import React from "react";
import useStore from "@/store/store";
import stepsConfig from "./stepConfig";
import { useRouter } from "next/navigation";

const MultiStepForm: React.FC = () => {
  const currentStep = useStore((state) => state.currentStep);
  const setCurrentStep = useStore((state) => state.setCurrentStep);
  const currentStepConfig = stepsConfig[currentStep];
  const router = useRouter()


  const handleNext = (data?: any) => {
    if (currentStepConfig.onNext) {
      currentStepConfig.onNext(useStore, data);
    }
    if(currentStep === 1){
      router.push('/user')
    }else{
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="bg-black">
      <currentStepConfig.component onNext={handleNext} />
      <p className="text-white text-center">Step {currentStep + 1} of {stepsConfig.length}</p>
    </div>
  );
};

export default MultiStepForm;
