import React from 'react'
import AboutForm from './components/About/AboutForm';
import ProfilePictureForm from './components/ProfilePicture/ProfilePictureForm';
import EducationInformationForm from './components/EducationInformationForm';
import DescriptionForm from './components/DescriptionForm';
import ThankYouPage from './components/ThankYouPage';
import { Button } from './components/ui/Button';
import FormNavigation from './components/FormNavigation';
import { useSelector } from 'react-redux';

import { useEffect } from 'react';

const EkycForm = () => {

  const { currentStep } = useSelector((state) => state.steps);
  // const handleFormBarClick = (index) => {
  //   // if(index < currentStep){
  //   //   return ()=> setCurrentStep(index)
  //   // }
  return (
    <div>
      <FormNavigation
      //  handleFormBarClick={handleFormBarClick}
      ></FormNavigation>

      <div className='max-w-md mx-auto p-4'>

        {currentStep === 0 &&

          <AboutForm />

        }

        {currentStep === 1 && <ProfilePictureForm></ProfilePictureForm>}
        {currentStep === 2 && <EducationInformationForm></EducationInformationForm>}
        {currentStep === 3 && <DescriptionForm></DescriptionForm>}
        {currentStep === 4 && <ThankYouPage></ThankYouPage>}

      </div>
    </div>

  )
}

export default EkycForm