import React from 'react'
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel, FormDescription } from "@/components/ui/form";
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import FormFooter from '../FormFooter';
import { useDispatch } from 'react-redux';
import { setCurrentStep, setVisitedSteps } from '../../store/stepsSlice';

const TellUsAbout = () => {

    const dispatch = useDispatch();

    const methods = useForm({
        resolver: zodResolver(z.object({
            description: z.string().nonempty('Description is required')
        })),
        defaultValues: {
            description: '',
        },
        mode: 'onBlur',

    });

    const onSubmit = (data) => {
        console.log(data);
        dispatch(setCurrentStep());
    }

    return (
        <>
            <div className='my-10'>
                <h1 className="text-4xl font-semibold my-5">Profile description</h1>
                <p className="text-gray-500 leading-relaxed tracking-wide ">This info will go on your public profile. Write it in the language you’ll be teaching and make sure to follow our guidelines to get approved</p>
            </div>

            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)}>
                    <FormField
                        name="description"
                        control={methods.control}
                        render={({ field }) => {
                            return (
                                <FormItem className="mt-4">
                                    <FormLabel>Tell Us About Yourself</FormLabel>
                                    <FormControl>
                                        <Input placeholder="" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            );
                        }}
                    />
                    <FormFooter />
                </form>
            </FormProvider>
        </>
    )
}

export default TellUsAbout