import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React from 'react';

const formSchema = z.object({
  first_name: z.string().min(3, "First Name is required"),
  last_name: z.string().min(2, "Last Name is required"),
  email: z.string().email("Invalid email address"),
  country: z.string().min(2, "Country is required"),
});

const defaultValues = {
  first_name: "",
  last_name: "",
  email: "",
  country: "",
};

const DescriptionForm = () => {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Form {...form} onSubmit={form.handleSubmit(onSubmit)}>
      <FormField
        name="first_name"
        render={({ field }) => {
          return (
            <FormItem>
              <FormLabel>First Name</FormLabel>
              <FormControl>
                <Input placeholder="" {...field} />
              </FormControl>
                <FormMessage />
            </FormItem>
          );
        }}
      />

      {/* <FormField
        name="last_name"
        render={({ field }) => {
          return (
            <FormControl>
              <FormLabel htmlFor={field.last_name}>Last Name</FormLabel>
              <Input placeholder="" {...field} />
              <FormMessage>{form.formState.errors.last_name?.message}</FormMessage>
            </FormControl>
          );
        }}
      />

      <FormField
        name="email"
        render={({ field }) => {
          return (
            <FormControl>
              <FormLabel htmlFor={field.email}>Email</FormLabel>
              <Input placeholder="" {...field} />
              <FormMessage>{form.formState.errors.email?.message}</FormMessage>
            </FormControl>
          );
        }}
      /> */}

      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default DescriptionForm;
