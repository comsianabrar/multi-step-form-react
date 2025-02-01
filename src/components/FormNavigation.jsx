import React from 'react'
import { FaCheck } from "react-icons/fa";
import { useSelector } from 'react-redux';

const FormNavigation = () => {
  const { steps, currentStep } = useSelector((state) => state.steps);

  const totalSteps = steps.length;
  return (
    <div>
      <div className="bg-gray-200 h-10 w-auto  font-light sm:text-center text-sm flex sm:items-center sm:justify-center cursor-pointer">
        {steps.map((value, index) => (
          <span className="px-3 flex items-center" key={index} onClick={()=> {}}>
            {index < currentStep && (
              <button className=" bg-slate-800 rounded-md py-2 px-2 text-xs flex items-center justify-center">
                <FaCheck className='text-white' />
              </button>
            )}
            {index >= currentStep && (
              <button
                className={`mr-2 ${currentStep === index
                    ? 'bg-slate-800 text-white p-1 px-3 rounded-md text-sm'
                    : ''
                  } flex items-center justify-center`}
              >
                {index + 1}
              </button>
            )}
            <span className="ml-1 hidden sm:block">{value}
              {
                index < totalSteps - 1 && <span className='mx-2'>{'>'}</span>
              }
            </span>


          </span>
        ))}
      </div>
    </div>
  )
}

export default FormNavigation