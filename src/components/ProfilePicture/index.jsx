import React from 'react'
import ProfilePictureHeading from './ProfilePictureHeading'
import FormFooter from '../FormFooter';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/Form';
import { string, z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { setCurrentStep, setVisitedSteps } from '../../store/stepsSlice';
import { useSelector } from 'react-redux';

const ProfilePictureForm = () => {

  const imageData = localStorage.getItem('profile_picture_base64') || '';
  const storedData = JSON.parse(localStorage.getItem('formData')) || {};

  const fileUploadSchema = z.object({
    profile_picture: imageData
      ? z
        .string().min(1, { message: "Profile picture is required" })
      : z
        .instanceof(FileList, { message: "Profile picture is required" })
        .refine((files) => files.length > 0, { message: "Profile picture is required" }),
  });

  const methods = useForm({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: {
      profile_picture: imageData ? imageData : null
    },
    mode: 'onChange'
  });

  const dispatch = useDispatch();

  const first_name = storedData?.first_name || "";
  const last_name = storedData?.last_name || "";
  const country = storedData?.country || "";

  const [imagePreview, setImagePreview] = React.useState(imageData);


  const fileRef = methods.register("profile_picture");

  function handleChange(e) {
    console.log("handleChange called");
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      setImagePreview(reader.result);
      localStorage.setItem('profile_picture_base64', reader.result);
    }

    if (file) {
      reader.readAsDataURL(file);
      methods.setValue('profile_picture', e.target.files);
    }
  }

  const onSubmit = (data) => {
    console.log(data);
    dispatch(setCurrentStep());
    dispatch(setVisitedSteps(currentStep));
  };

  const { currentStep } = useSelector((state) => state.steps);
  return (
    <>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <ProfilePictureHeading />
          <hr />
          <div className="my-5 flex flex-row w-full">
            <div className='flex  items-center w-36 h-40'>
              {
                imagePreview && <img src={imagePreview} alt="profile picture" className="object-contain w-32 h-40" />
              }
            </div>
            <div className='flex text-left p-5'>
              <div className='flex flex-col'>
                <h1 className='text-2xl leading-relaxed font-semibold'>{first_name} {" "}{last_name.charAt(0)}. <img src={`https://www.worldometers.info//img/flags/small/tn_${country.toLowerCase()}-flag.gif`} className='w-6 h-5'></img></h1>
                <p>Lives in: {country} </p>

              </div>

            </div>
          </div>
          <hr />
          <div className="my-5 mb-10 flex flex-col items-center w-full">
            <input type="file" id="file-upload"
              accept="image/*" onChange={handleChange} name='profile_picture' className="hidden" />
            {/* <FormField
              name="profile_picture"
              control={methods.control}
              render={({ field, fieldState }) => {
                return (
                  <FormItem className="mt-4 hidden">
                    <FormLabel>Profile Picture</FormLabel>
                    <FormControl>
                      <Input
                        type="file"
                        id="file-upload"
                        accept="image/*"
                        onChange={(event) => {
                          field.onChange(evnt.target?.files?.[0] ?? undefined);
                        }}
                        placeholder="" {...fileRef} />
                    </FormControl>
                    {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
                  </FormItem>
                );
              }}
            /> */}

            <label
              htmlFor="file-upload"
              className="w-full bg-white border rounded-lg border-black hover:bg-slate-100 text-black text-center py-2 px-4 cursor-pointer"
            >
              Upload new photo
            </label>
            {methods.formState.errors.profile_picture?.message &&
              <FormMessage>{methods.formState.errors.profile_picture?.message}
              </FormMessage>}
          </div>
          <div>
            <h2 className='text-xl my-5'>What your photo needs  </h2>
            <ul className='font-light leading-10 text-sm space-y-1'  >
              <li>You should be facing forward</li>
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

            <FormFooter />
          </div>
        </form>
      </FormProvider>
    </>
  )
}

export default ProfilePictureForm