import React from 'react'
import { Button } from '../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { handleBackButton } from '../store/stepsSlice'

const FormFooter = () => {

    const { currentStep, steps } = useSelector((state) => state.steps);

    const dispatch = useDispatch();

    const totalSteps = steps.length;

  return (
    <div className='float-end my-5 space-x-5'>
    {
      (currentStep > 0 && currentStep < totalSteps) &&

      <Button className='bg-white border-gray-900 hover:bg-slate-100 text-black' size='lg' onClick={() => dispatch(handleBackButton())}>Back</Button>
    }
    {
      currentStep < totalSteps &&
      // <button className='bg-green-500 text-white px-3 py-2 mx-3' onClick={() => setCurrentStep(currentStep + 1)}>Next</button>
      <Button type={'submit'} size={'lg'}>Save and Continue</Button>
    }
    {
      currentStep == totalSteps - 1 && <Button size={'lg'} type='submit'>Submit</Button>
    }
  </div>
  )
}

export default FormFooter