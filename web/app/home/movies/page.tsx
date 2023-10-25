"use client";
import Button from "@/components/ui/Button";
import { basePath } from "@/lib/constants";
import { useEffect, useState } from "react";
import listMoviesAction from "@/actions/movies/list";
import { useMoviesStore } from "@/lib/zustand/movies";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import Moviecard from "@/components/ui/Moviecard";

const Page = () => {
  const { movies, setMovies } = useMoviesStore();
  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    async function getMovies() {
      setLoading(true);
      const result = await listMoviesAction();
      if (result.isOk) {
        setMovies(result.value);
      } else {
        toast.error(result.error.message);
      }
      setLoading(false);
    }
    getMovies();
  }, []);
  if (movies.length === 0 && loading) {
    return (
      <div className="mt-36 flex items-center justify-center">
        <Loader className="mr-2 h-10 w-10 animate-spin" />
      </div>
    );
  }
  return (
    <div className="m-10">
      <a href={basePath + "/home/movies/new"}>
        <div className="m-4 flex items-center justify-between">
          <div></div>
          <Button size="lg">Add</Button>
        </div>
      </a>
      {movies.map((movie, index) => (
        <div className="m-4" key={index}>
          <Moviecard movie={movie} />
        </div>
      ))}
    </div>
  );
};

export default Page;
