"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { CreateMovieSchema, createMovieSchema } from "@/lib/types/movie";
import createMovieAction from "@/actions/movies/create";

const Page: FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<CreateMovieSchema>({
    resolver: zodResolver(createMovieSchema),
  });
  return (
    <div className="mx-10 my-4 flex flex-col">
      <form
        onSubmit={handleSubmit(async (data) => {
          setIsLoading(true);
          const validDate = new Date(data.release);
          data.release = validDate.toISOString();
          if (data.release === "Invalid Date") {
            toast.error("Invalid date");
            return;
          }
          const result = await createMovieAction(data);
          if (result.isOk) {
            toast.success("Movie created");
            router.push("/home/movies");
          } else {
            toast.error(result.error.message);
          }
          setIsLoading(false);
        })}
        className="mt-5 w-full mx-auto p-4 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-semibold mb-4">Add new movie</h2>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium">
            Title
          </label>
          <input
            type="text"
            {...register("title")}
            id="title"
            name="title"
            className="w-full px-3 py-2 border rounded-md  focus:ring-black focus:border-black"
            required
          />
          {errors.title && (
            <p className="text-red-500 text-xs italic">
              {errors.title.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block mb-2 font-medium">
            Description
          </label>
          <textarea
            id="description"
            {...register("description")}
            name="description"
            className="w-full px-3 py-2 border rounded-md  focus:ring-black focus:border-black"
            rows={2}
            required
          />
          {errors.description && (
            <p className="text-red-500 text-xs italic">
              {errors.description.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="genre" className="block mb-2 font-medium">
            Genre
          </label>
          <input
            type="text"
            {...register("genre")}
            id="genre"
            name="genre"
            className="w-full px-3 py-2 border rounded-md  focus:ring-black focus:border-black"
            required
          />
          {errors.genre && (
            <p className="text-red-500 text-xs italic">
              {errors.genre.message}
            </p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="cast" className="block mb-2 font-medium">
            Cast
          </label>
          <input
            type="text"
            {...register("cast")}
            id="cast"
            name="cast"
            className="w-full px-3 py-2 border rounded-md  focus:ring-black focus:border-black"
            placeholder="Separate by comma"
            required
          />
          {errors.cast && (
            <p className="text-red-500 text-xs italic">{errors.cast.message}</p>
          )}
        </div>
        <div className="mb-4">
          <label htmlFor="release" className="block mb-2 font-medium">
            Release Date
          </label>
          <input
            type="text"
            {...register("release")}
            id="release"
            name="release"
            className="w-full px-3 py-2 border rounded-md  focus:ring-black focus:border-black"
            placeholder="DD/MM/YYYY"
            required
          />
          {errors.genre && (
            <p className="text-red-500 text-xs italic">
              {errors.genre.message}
            </p>
          )}
        </div>
        <Button isLoading={isLoading} className="w-full" type="submit">
          Create Blog
        </Button>
      </form>
    </div>
  );
};
export default Page;
