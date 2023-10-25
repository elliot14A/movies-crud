"use client";
import Button from "@/components/ui/Button";
import { FC, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginCredentials, loginCredentialsSchema } from "@/lib/validators";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { basePath } from "@/lib/constants";
import loginAction from "@/actions/auth/login";
import { useCookies } from "next-client-cookies";

interface PageProps { }

const Page: FC<PageProps> = () => {
  const [isLoading, setIsLoading] = useState<boolean>();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginCredentials>({
    resolver: zodResolver(loginCredentialsSchema),
  });
  const cookies = useCookies();
  const router = useRouter();
  const login: SubmitHandler<LoginCredentials> = async (data) => {
    setIsLoading(true);
    const result = await loginAction(data);
    if (result.isOk) {
      const { accessToken, refreshToken } = result.value;
      cookies.set("accessToken", accessToken, {});
      cookies.set("refreshToken", refreshToken, {});
      toast.success("Logged in successfully");
      router.replace("/home/movies");
    } else {
      toast.error(result.error.message);
    }
    setIsLoading(false);
  };
  return (
    <div className="container flex flex-col items-center justify-center">
      <div className="m-12 flex items-center justify-center">
        <p className="text-3xl text-red-600">Movies</p>
        <p className="text-2xl font-semibold mt-[0.3rem]">Crud</p>
      </div>
      <div className="w-full">
        <form
          className="container w-full max-w-sm mx-auto mt-8"
          onSubmit={handleSubmit(login)}
        >
          <div className="mb-8 font-bold text-3xl ">Welcome Back!</div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-black focus:border-black"
              {...register("email")}
            />
            {errors.email && (
              <p className="text-red-500 text-xs italic">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:ring-black focus:border-black"
              {...register("password")}
            />
            {errors.password && (
              <p className="text-red-500 text-xs italic">
                {errors.password.message}
              </p>
            )}
          </div>
          <div className="flex items-center justify-between">
            <Button isLoading={isLoading} className="w-full">
              Login
            </Button>
          </div>
          <p className="text-sm text-gray-500 text-center m-10">
            Not Registered?
            <a
              href={basePath + "/auth/register"}
              className="pl-1 text-blue-600"
            >
              Create an account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Page;
