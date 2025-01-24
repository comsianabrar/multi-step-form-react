import React from 'react'
import ProfilePictureHeading from './ProfilePictureHeading'

import { useEffect } from 'react'

const ProfilePictureForm = () => {
    
  const storedData = JSON.parse(localStorage.getItem('formData')) ||{};

  const first_name = storedData?.aboutForm?.first_name || "";
  const last_name = storedData?.aboutForm?.last_name  || "";
  const country = storedData?.aboutForm?.country || "";

  const [file, setFile] = React.useState(null);
  const [imagePreview, setImagePreview] = React.useState(null);

  function handleChange(e) {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = ()=> {
      setImagePreview(reader.result);
    }

    if(file){
      reader.readAsDataURL(file);
    }
}
useEffect(() => {
  console.log("Updated imagePreview:", imagePreview);
}, [imagePreview]);

    return (
   <>
   <ProfilePictureHeading/>
   <hr/>
   <div className="my-5 flex flex-row w-full">
  <div className='flex  items-center w-36 h-40'>
  {
    imagePreview && <img src={imagePreview} alt="profile picture" className="object-contain w-32 h-40"/>
  }
  </div>
  <div className='flex text-left p-5'>
    <div className='flex flex-col'>
    <h1 className='text-2xl leading-relaxed font-semibold'>{first_name} {" "}{last_name.charAt(0)}. <img src={`https://www.worldometers.info//img/flags/small/tn_${country.toLowerCase()}-flag.gif`} className='w-6 h-5'></img></h1>
  <p>Lives in: {country} </p>

    </div>
  
  </div>
    </div>
   <hr/>
    <div className="my-5 mb-10 flex flex-col items-center w-full">
  <input
    type="file"
    id="file-upload"
    onChange={handleChange}
    className="hidden"
  />
  <label
    htmlFor="file-upload"
    className="w-full bg-white border rounded-lg border-black hover:bg-slate-100 text-black text-center py-2 px-4 cursor-pointer"
  >
    Upload new photo
  </label>
</div>
<div>
  <h2 className='text-xl my-5'>What your photo needs  </h2>
  <ul className='font-light leading-10 text-sm space-y-1'  >
    <li>You should be facing forward</li>
    <li>Frame your head and shouldersn</li>
    <li>You should be centered and upright</li>
    <li>Your face and eyes should be visible (except for religious reasons)</li>
    <li>You should be the only person in the photo</li>
    <li>
    Use a color photo with high resolution and no filters
    </li>
    <li>
    Avoid logos or contact information
    </li>
  </ul>
 
</div>
</>
  )
}

export default ProfilePictureForm