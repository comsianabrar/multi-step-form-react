import React from 'react'
import AboutForm from './components/About';
import ProfilePictureForm from './components/ProfilePicture';
import ThankYouPage from './components/ThankYou';
import FormNavigation from './components/FormNavigation';
import { useSelector } from 'react-redux';
import EducationForm from './components/EducationForm';
import TellUsAbout from './components/TellUsAbout';

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
        {currentStep === 3 && <TellUsAbout />}
        {currentStep === 4 && <ThankYouPage />}

      </div>
    </div>

  )
}

export default EkycForm