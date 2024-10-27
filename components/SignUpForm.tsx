"use client";

import Image from "next/image";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import CustomInput from "./CustomInput";
import { formSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import DateSelector from "./DateSelector";

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = React.useState<Date>();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setTimeout(() => {
      const formData = { ...values, dob: date };
      console.log(formData);

      setIsLoading(false);
    }, 2000);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <div className="cursor-pointer flex items-center gap-1">
          <Image src={"/logo.svg"} width={34} height={34} alt="The Logo" />
          <h1 className="text-2xl font-black uppercase">
            Saf<span className="text-brand">e</span>lix
          </h1>
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-[16px] lg:text-xl font-bold text-gray-900">
            Create Your Account
          </h1>
          <p className="text-gray-600 text-sm">Please enter your details</p>
        </div>
      </header>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid md:grid-cols-2 md:gap-2 md:space-y-0 space-y-4">
            <CustomInput
              control={form.control}
              name="firstName"
              label="First Name"
              placeholder="Enter your first name"
            />
            <CustomInput
              control={form.control}
              name="lastName"
              label="Last Name"
              placeholder="Enter your last name"
            />
          </div>
          <CustomInput
            control={form.control}
            name="email"
            label="Email"
            placeholder="Enter your email"
          />

          <DateSelector date={date} setDate={setDate} />
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-brand"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" />
                Submitting...
              </>
            ) : (
              "Submit"
            )}
          </Button>
        </form>
      </Form>

      <footer className="flex justify-center gap-1">
        <p className="text-sm text-gray-600">
          Already registered? &nbsp;
          <Link href={"/report"} className="form-link">
            Click here
          </Link>
        </p>
      </footer>
    </section>
  );
};

export default SignUpForm;
