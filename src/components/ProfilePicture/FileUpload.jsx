import React from 'react'
import { FormProvider, useController, useForm } from 'react-hook-form'

const fileUploadSchema = z.object({
  profile_picture: z.instanceof(FileList).refine(files => files.length === 1, "Please upload a single file").refine(files => {
    const file = files[0];
    return file && (file.type === 'image/jpeg' || file.type === 'image/png');
  }, "Only jpg and png formats are allowed")
});

const FileUpload = () => {

  const methods = useForm({
    resolver: zodResolver(fileUploadSchema), 
    defaultValues: {
      profile_picture: ''
    },
    mode: 'onChange'
  });

  const onSubmit = (data) => {
    console.log(data);
   
  };

  return (
    <div>
        <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField
          name="profile_picture"
          control={methods.control}
          render={({ field, fieldState }) => {
            return (
              <FormItem className="mt-4">
                <FormLabel>Profile Picture</FormLabel>
                <FormControl>
                  <Input type="file" name="profile_picture" placeholder="" {...field} />
                </FormControl>
                {fieldState.error && <FormMessage>{fieldState.error.message}</FormMessage>}
              </FormItem>
            );
          }}
        />
        <label
          htmlFor="file-upload"
          className="w-full bg-white border rounded-lg border-black hover:bg-slate-100 text-black text-center py-2 px-4 cursor-pointer"
        >
          Upload new photo
        </label>
        <FormFooter />
      </form>
      </FormProvider>
    </div>
  )
}

export default FileUpload