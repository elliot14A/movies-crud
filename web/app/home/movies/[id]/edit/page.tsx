"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { UpdateMovieSchema, updateMovieSchema } from "@/lib/types/movie";
import updateMovieAction from "@/actions/movies/update";
import { MovieType } from "@/lib/zustand/movies";
import getMovieAction from "@/actions/movies/details";
import { Loader } from "lucide-react";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [movie, setMovie] = useState<MovieType | null>(null);
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<UpdateMovieSchema>({
    resolver: zodResolver(updateMovieSchema),
  });
  function formatDateToMMDDYYYY(inputDate: string) {
    const date = new Date(inputDate);

    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const year = date.getFullYear();

    return `${month}/${day}/${year}`;
  }
  useEffect(() => {
    async function getMovie() {
      const result = await getMovieAction(id);
      if (result.isOk) {
        setMovie(result.value);
        setValue("title", result.value.title);
        setValue("description", result.value.description);
        setValue("genre", result.value.genre);
        setValue("cast", result.value.cast.join(","));
        const date = formatDateToMMDDYYYY(result.value.release);
        setValue("release", date);
      } else {
        toast.error(result.error.message);
      }
    }
    getMovie();
  }, []);
  if (!movie) {
    return (
      <div className="mt-36 flex items-center justify-center">
        <Loader className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="mx-10 my-4 flex flex-col">
      <form
        onSubmit={handleSubmit(async (data) => {
          const date = new Date(data.release!);
          data.release = date.toISOString();
          const result = await updateMovieAction(id, data);
          if (result.isOk) {
            toast.success("Updated successfully");
            router.replace("/home/movies");
          } else {
            const message = result.error.message;
            toast.error(message);
          }
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
