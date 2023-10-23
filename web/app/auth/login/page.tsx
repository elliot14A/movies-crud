"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CreateUserSchema, createUserSchema } from "@/lib/zod/schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC } from "react";
import { useForm } from "react-hook-form";

const Page: FC = () => {
  const form = useForm<CreateUserSchema>({
    resolver: zodResolver(createUserSchema),
  });
  const onSubmit = (data: CreateUserSchema) => {
    console.log(data);
  };
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  return (
    <div className="flex h-screen flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      <div className="-mt-10 sm:mx-auto sm:w-full sm:max-w-md">
        <h1
          className="
          text-center
          text-2xl
          font-bold
          tracking-tight
          sm:text-left
          sm:m-4
          "
        >
          Login to your account
        </h1>
        <div className="mt-10 m-4 rounded-lg shadow-lg  p-6">
          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Email</FormLabel>
                    <FormControl>
                      <Input placeholder="abc@email.com" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-md">Password</FormLabel>
                    <FormControl>
                      <Input placeholder="******" type="password" {...field} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="w-full">Submit</Button>
            </form>
          </Form>
        </div>
        <a href={basePath + "/auth/register"}>
          <div className="text-right mr-4 underline">or register here</div>
        </a>
      </div>
    </div>
  );
};

export default Page;
