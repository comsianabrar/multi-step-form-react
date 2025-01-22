import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import React from 'react';
import AboutHeading from "./AboutHeading";
import CountrySelect from "./CountrySelect";
import { useFormContext , Controller } from "react-hook-form";


const AboutForm = () => {


  const CountrySelectWrapper = React.forwardRef((props, ref) => (
    <div>
      <CountrySelect {...props} ref={ref} />
    </div>
  ));

  const { control, formState: { errors }, getValues } = useFormContext();

  return (
   <> <AboutHeading/> 
   
   <FormField
      name="aboutForm.first_name"
      control={control}
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>First name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
                <FormMessage />
            </FormItem>
          );
        }}
      />

<FormField
name="aboutForm.last_name"
control={control}
        render={({ field }) => {
          return (
            <FormItem className="mt-4">
              <FormLabel>Last name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field}  />
              </FormControl>
                <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
      name="aboutForm.country"
      control={control}
        render={({ field }) => {
          return (
            <FormItem  className="mt-4" >
              <FormLabel>Country of birth</FormLabel>
              <FormControl>
              <CountrySelectWrapper {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          );
        }}
      />

<FormField
name="aboutForm.phone"
control={control}
className="mt-4"
       
        render={({ field }) => {
          return (
            <FormItem  className="mt-4" >
              <FormLabel>Phone number <span className="text-gray-500">(optional)</span></FormLabel>
              <FormControl>
                <Input placeholder=""  {...field} />
              </FormControl>
                <FormMessage />
            </FormItem>
          );
        }}
      />

      <div className="flex w-auto space-x-5 mb-4">
        
      <FormField
      name="aboutForm.github_profile"
      control={control}
render={({ field }) => {
  return (
    <FormItem className="mt-4">
      <FormLabel>Github profile <span className="text-gray-500">(optional)</span></FormLabel>
      <FormControl>
        <Input placeholder="" {...field}  />
      </FormControl>
        <FormMessage />
    </FormItem>
  );
}}
/>

<FormField
name="aboutForm.website"
control={control}
        render={({ field }) => {
          return (
            <FormItem className="mt-4 flex-1 ">
              <FormLabel>Website <span className="text-gray-500">(optional)</span></FormLabel>
              <FormControl>
                <Input placeholder=""   />
              </FormControl>
                <FormMessage />
            </FormItem>
          );
        }}
      />

        </div>
        <FormField
        name="aboutForm.terms"
        control={control}
          render={({ field }) => (
            <FormItem className="mb-4 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                Accept terms and conditions
                                </FormLabel>
                <FormDescription>
                You agree to our Terms of Service and Privacy Policy.
                                </FormDescription>
              </div>
            </FormItem>
          )}
        />

  
    </>
  );
};

export default AboutForm;
