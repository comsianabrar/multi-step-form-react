import React from 'react'
import ProfilePictureHeading from './ProfilePictureHeading'
import { Button } from '../ui/Button'

const ProfilePictureForm = () => {
  return (
   <>
   <ProfilePictureHeading/>
   <hr/>

    <div className="my-10 flex flex-col items-center w-full">
  <Button
    className="w-full bg-white border-black hover:bg-slate-100 text-black"
    size="lg"
  >
    Upload new photo
  </Button>
</div>

</>
  )
}

export default ProfilePictureForm