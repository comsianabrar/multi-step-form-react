import React from 'react'
import AboutForm from './components/About/AboutForm';
import ProfilePictureForm from './components/ProfilePicture/ProfilePictureForm';
import EducationInformationForm from './components/EducationInformationForm';
import DescriptionForm from './components/DescriptionForm';
import ThankYouPage from './components/ThankYouPage';
import {Button} from './components/ui/Button';
import FormNavigation from './components/FormNavigation';

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { data } from 'autoprefixer';
import { useEffect } from 'react';

const EkycForm = () => {

  // get localstorage data

  const storedData = JSON.parse(localStorage.getItem('formData')) ||{};
  console.log('storedData'  , storedData);

  const steps = [ 'About','Photo','Certification','Education', 'Description', 'Pricing' ]
  const totalSteps = steps.length;
  const [currentStep, setCurrentStep] = React.useState(0);


  const formSchema = z.object({
    aboutForm: z.object({ 
      first_name: z.string().min(3, "First Name is required"),
      last_name: z.string().min(2, "Last Name is required"),
      country: z.string().min(2, "Country is required"),
      phone: z.string().optional(),
      github_profile: z.string().optional(),
      website: z.string().optional(),
      terms: z.boolean().refine((value) => value === true, {  message: "You must agree to the terms and conditions" }),
    }),
  });
  
  const defaultValues = {
    aboutForm: {
      first_name: "",
      last_name: "",
      country: "",
      phone: "",
      github_profile: "",
      website: "",
      terms: false,
    },
  };

  const methods = useForm({
    resolver: zodResolver(formSchema),
    defaultValues : {
      aboutForm: storedData.aboutForm || defaultValues.aboutForm
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const handleFormBarClick = (index)=> {
    if(index < currentStep){
      return ()=> setCurrentStep(index)
    }
  }

  const handleSaveAndContinue = () => {      
    setCurrentStep(currentStep + 1)
  }
  
  const { watch } = methods;

  useEffect(() => {
    const subscription = watch((data) => {
      console.log('watching', data);
      localStorage.setItem('formData', JSON.stringify(data));
    });
    return () => subscription.unsubscribe(); // Cleanup on unmount
  }, [watch]);

  return (
    <div>
      <FormNavigation steps={steps} currentStep={currentStep} handleFormBarClick={handleFormBarClick}></FormNavigation>
 <FormProvider {...methods}>
      <div className='max-w-md mx-auto p-4'>
        <form onSubmit={methods.handleSubmit(onSubmit)} >
      {currentStep === 0 && <AboutForm></AboutForm>}
      {currentStep === 1 && <ProfilePictureForm></ProfilePictureForm>}
      {currentStep === 2 && <EducationInformationForm></EducationInformationForm>}
      {currentStep === 3 && <DescriptionForm></DescriptionForm>}
      {currentStep === 4 && <ThankYouPage></ThankYouPage>}
     
     <div className='float-end my-5 space-x-5'>
     {
        (currentStep > 0 && currentStep < totalSteps ) &&       
        
        <Button  className='bg-white border-gray-900 hover:bg-slate-100 text-black'  size='lg'  onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
      }
      {
        currentStep < totalSteps &&       
        // <button className='bg-green-500 text-white px-3 py-2 mx-3' onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
      <Button  size={'lg'} onClick={methods.handleSubmit(handleSaveAndContinue)}>Save and Continue</Button>
      }
      {
              currentStep == totalSteps - 1 && <Button  size={'lg'} type='submit'>Submit</Button>
      }
     </div>
     </form>
      </div>

  </FormProvider>
     
     
    </div>
    
  )
}

export default EkycForm