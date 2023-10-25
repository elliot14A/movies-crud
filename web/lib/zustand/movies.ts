import { create } from "zustand";

export interface MovieType {
  id: string;
  title: string;
  description: string;
  release: string;
  cast: string[];
  genre: string;
  imageUrl: string;
}
interface MoviesStore {
  movies: MovieType[];
  setMovies: (movies: MovieType[]) => void;
}

export const useMoviesStore = create<MoviesStore>((set) => ({
  movies: [],
  setMovies: (movies) => set({ movies: movies }),
}));
