import React from 'react'
import { useController } from 'react-hook-form'

const FileUpload = ({control, name, handleChange}) => {

    const {
        formState: { errors },
      } = useController({ control, name });    

  return (
    <div>
    <input
    type="file"
    name='proflilePictureForm.profile_picture'
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
  )
}

export default FileUpload