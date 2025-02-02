import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox"
import React from 'react';
import AboutHeading from "./AboutHeading";
import CountrySelect from "./CountrySelect";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import FormFooter from "../FormFooter";
import { Button } from "@/components/ui/Button";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep, handleBackButton, setVisitedSteps } from "../../store/stepsSlice";
import { store } from "../../store/store";

const AboutForm = () => {

    const storedData = JSON.parse(localStorage.getItem('formData')) || {};

  const {currentStep} = useSelector((state) => state.steps);  
  const dispatch = useDispatch();

  const methods = useForm({
    resolver: zodResolver(z.object({
      first_name: z.string().min(3, "First Name is required"),
      last_name: z.string().min(2, "Last Name is required"),
      country: z.string().min(2, "Country is required"),
      phone: z.string().optional(),
      github_profile: z.string().optional(),
      website: z.string().optional(),
      terms: z.boolean().refine((value) => value === true, { message: "You must agree to the terms and conditions" })
    })),
    defaultValues: {
      first_name: storedData.first_name ||"",
      last_name: storedData.last_name || "",
      country: storedData.country || "",
      phone: storedData.phone || "",
      github_profile: storedData.github_profile || "",
      website: storedData.website || "",
      terms: storedData.terms || false,
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    localStorage.setItem('formData', JSON.stringify(data));

    dispatch(setCurrentStep());
    dispatch(setVisitedSteps(currentStep));
  };

  const CountrySelectWrapper = React.forwardRef((props, ref) => (
    <div>
      <CountrySelect {...props} ref={ref} />
    </div>
  ));

  return (
    <> <AboutHeading />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} >
          <FormField
            name="first_name"
            control={methods.control}
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
            name="last_name"
            control={methods.control}
            render={({ field }) => {
              return (
                <FormItem className="mt-4">
                  <FormLabel>Last name</FormLabel>
                  <FormControl>
                    <Input placeholder="" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            name="country"
            control={methods.control}
            render={({ field }) => {
              return (
                <FormItem className="mt-4" >
                  <FormLabel>Country of birth</FormLabel>
                  <FormControl>
                    <CountrySelectWrapper {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name="phone"
            control={methods.control}
            className="mt-4"

            render={({ field }) => {
              return (
                <FormItem className="mt-4" >
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
              name="github_profile"
              control={methods.control}
              render={({ field }) => {
                return (
                  <FormItem className="mt-4">
                    <FormLabel>Github profile <span className="text-gray-500">(optional)</span></FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <FormField
              name="website"
              control={methods.control}
              render={({ field }) => {
                return (
                  <FormItem className="mt-4 flex-1 ">
                    <FormLabel>Website <span className="text-gray-500">(optional)</span></FormLabel>
                    <FormControl>
                      <Input placeholder="" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

          </div>
          <FormField
            name="terms"
            control={methods.control}
            render={({ field }) => (
              <FormItem className="mb-4 flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                <FormControl>
                  <Checkbox
                    checked={field.value || false}
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
          <FormFooter />
        </form>
      </FormProvider>
    </>
  );
};

export default AboutForm;
