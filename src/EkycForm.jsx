import React from 'react'
import AboutForm from './components/About';
import ProfilePictureForm from './components/ProfilePicture';
import DescriptionForm from './components/DescriptionForm';
import ThankYouPage from './components/ThankYouPage';
import { Button } from './components/ui/Button';
import FormNavigation from './components/FormNavigation';
import { useSelector } from 'react-redux';

import { useEffect } from 'react';
import EducationForm from './components/EducationForm';
import WorkExperience from './components/WorkExperience';
import IntroductionForm from './components/IntroductionForm';

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

        {currentStep === 0 && <AboutForm />}
        {currentStep === 1 && <ProfilePictureForm />}
        {currentStep === 2 && <EducationForm />}
        {currentStep === 3 && <WorkExperience />}
        {currentStep === 4 && <IntroductionForm />}
        {currentStep === 5 && <ThankYouPage />}

      </div>
    </div>

  )
}

export default EkycForm