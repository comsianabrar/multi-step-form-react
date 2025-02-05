import React, { useState } from 'react';
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, FormProvider, useFieldArray, set } from "react-hook-form";
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
import { Trash2 } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';

const educationSchema = z.object({
    university: z.string().min(3, "University is required"),
    degree: z.string().min(2, "Degree is required"),
    specialization: z.string().min(2, "Specialization is required"),
    study_from: z.number().min(1970, "Year of study from is required"),
    study_to: z.number().min(1970, "Year of study to is required"),
});

const EducationForm = () => {
    const [addMoreEducationLink, setAddMoreEducationLink] = useState(true);

    const storedData =
        // JSON.parse(localStorage.getItem('educationData')) ||
        [];

    const { currentStep } = useSelector((state) => state.steps);
    const dispatch = useDispatch();

    const methods = useForm({
        resolver: zodResolver(
            addMoreEducationLink ? z.object({
                education: z.array(educationSchema).nonempty(),
                no_education_check: z.boolean().optional(),
            }) : z.object({
                no_education_check: z.boolean().optional()
            })
        ),
        defaultValues: {
            education: storedData.length ? storedData : [{}],
            no_education_check: false,
        },
        mode: "onChange",
    });

    const { fields, append, remove } = useFieldArray({
        control: methods.control,
        name: "education"
    });

    const onSubmit = (data) => {
        localStorage.setItem('educationData', JSON.stringify(data.education));

        dispatch(setCurrentStep());
        dispatch(setVisitedSteps(currentStep));
    };

    const addEducationForm = () => {
        if (fields.length < 3) {
            append({});
        }
    };

    const handleRemoveForm = (index) => {
        if (fields.length > 1) {
            remove(index);
        }
    };

    const handleNoEducationCheckbox = (checked) => {
        if (checked) {
            methods.setValue("education", []);
            setAddMoreEducationLink(false)
        } else {
            methods.setValue("education", [{}]);
            setAddMoreEducationLink(true)
        }
    };

    return (
        <>
            <EducationFormHeading />
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <div className="flex items-center space-x-2 mb-5">
                        <FormField
                            control={methods.control}
                            name="no_education_check"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked);
                                                handleNoEducationCheckbox(checked);
                                            }}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormLabel>
                                            I don’t have a higher education degree
                                        </FormLabel>
                                    </div>
                                </FormItem>
                            )}
                        />
                    </div>
                    {fields.map((field, index) => (
                        <div key={field.id}>
                            {index > 0 && <hr className='my-5' />}

                            <div className='flex items-center'>
                                <FormField
                                    name={`education.${index}.university`}
                                    control={methods.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="flex-1">
                                                <FormLabel>University</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        );
                                    }}
                                />
                                {index > 0 && (
                                    <Trash2 className="ml-2 cursor-pointer self-center" onClick={() => handleRemoveForm(index)} />
                                )}
                            </div>

                            <FormField
                                name={`education.${index}.degree`}
                                control={methods.control}
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
                                name={`education.${index}.specialization`}
                                control={methods.control}
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
                                    name={`education.${index}.study_from`}
                                    control={methods.control}
                                    render={({ field }) => {
                                        return (
                                            <FormItem className="mt-4">
                                                <FormLabel>Years of Study From</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value}
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
                                    name={`education.${index}.study_to`}
                                    control={methods.control}
                                    render={({ field, fieldState }) => {
                                        return (
                                            <FormItem className="mt-4">
                                                <FormLabel>Years of Study To</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        value={field.value}
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
                        </div>
                    ))}
                    {(fields.length < 3 && addMoreEducationLink) && (
                        <a className='cursor-pointer mt-2 underline mb-10' onClick={addEducationForm}>Add Another Education</a>
                    )}
                    <FormFooter />
                </form>
            </FormProvider>
        </>
    );
};

export default EducationForm;
