import React, { useState } from 'react';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider } from "react-hook-form";
import { z } from "zod";
import FormFooter from "../FormFooter";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentStep, handleBackButton, setVisitedSteps } from "../../store/stepsSlice";
import EducationFormHeading from "./EducationFormHeading";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

const educationSchema = z.object({
    university: z.string().min(3, "University is required"),
    degree: z.string().min(2, "Degree is required"),
    specialization: z.string().min(2, "Specialization is required"),
    study_from: z.string().min(4, "Year of study from is required"),
    study_to: z.string().min(4, "Year of study to is required"),
});

const optionalEducationSchema = z.object({
    university: z.string().min(3, "University is required").optional(),
    degree: z.string().min(2, "Degree is required").optional(),
    specialization: z.string().min(2, "Specialization is required").optional(),
    study_from: z.string().min(4, "Year of study from is required").optional(),
    study_to: z.string().min(4, "Year of study to is required").optional(),
});

const EducationForm = () => {
    const storedData = JSON.parse(localStorage.getItem('educationData')) || [];

    const { currentStep } = useSelector((state) => state.steps);
    const dispatch = useDispatch();

    const [educationForms, setEducationForms] = useState(storedData.length ? storedData : [{}]);

    const methodsArray = educationForms.map((_, index) => useForm({
        resolver: zodResolver(index === 0 ? educationSchema : optionalEducationSchema),
        defaultValues: {
            university: "",
            degree: "",
            specialization: "",
            study_from: "",
            study_to: "",
        },
        mode: "onChange",
    }));

    const onSubmit = (data) => {
        localStorage.setItem('educationData', JSON.stringify(data));

        dispatch(setCurrentStep());
        dispatch(setVisitedSteps(currentStep));
    };

    const addEducationForm = () => {
        if (educationForms.length < 3) {
            setEducationForms([...educationForms, {}]);
        }   
    };

    return (
        <>
            <EducationFormHeading />
            {educationForms.map((_, index) => (
                <FormProvider key={index} {...methodsArray[index]}>
                    <form onSubmit={methodsArray[index].handleSubmit(onSubmit)}>
                        <FormField
                            name="university"
                            control={methodsArray[index].control}
                            render={({ field }) => {
                                return (
                                    <FormItem>
                                        <FormLabel>University</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            name="degree"
                            control={methodsArray[index].control}
                            render={({ field }) => {
                                return (
                                    <FormItem className="mt-4">
                                        <FormLabel>Degree</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <FormField
                            name="specialization"
                            control={methodsArray[index].control}
                            render={({ field }) => {
                                return (
                                    <FormItem className="mt-4">
                                        <FormLabel>Specialization</FormLabel>
                                        <FormControl>
                                            <Input placeholder="" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                );
                            }}
                        />

                        <div className="flex w-auto space-x-5 mb-4">
                            <FormField
                                name="study_from"
                                control={methodsArray[index].control}
                                render={({ field }) => {
                                    return (
                                        <FormItem className="mt-4">
                                            <FormLabel>Years of Study From</FormLabel>
                                            <FormControl>
                                                <Select 
                                                  key={field.value}
                                                  value={field.value}
                                                  defaultValue={field.value}
                                                  onValueChange={field.onChange}
                                                  >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="From" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Array.from({ length: 50 }, (_, i) => (
                                                            <SelectItem key={i} value={1970 + i}>{1970 + i}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />

                            <FormField
                                name="study_to"
                                control={methodsArray[index].control}
                                render={({ field , fieldState}) => {
                                    return (
                                        <FormItem className="mt-4">
                                            <FormLabel>Years of Study To</FormLabel>
                                            <FormControl>
                                                <Select 
                                                 key={field.value}
                                                 value={field.value}
                                                 defaultValue={field.value}
                                                 onValueChange={field.onChange}
                                                 >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="To" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Array.from({ length: 50 }, (_, i) => (
                                                            <SelectItem key={i} value={1970 + i}>{1970 + i}</SelectItem>
                                                        ))}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    );
                                }}
                            />
                        </div>
                    </form>
                </FormProvider>
            ))}
            {educationForms.length < 3 && (
                <a className='cursor-pointer mt-2 underline mb-10' onClick={addEducationForm}>Add Another Education</a>
            )}
            <FormFooter />
        </>
    );
};

export default EducationForm;
