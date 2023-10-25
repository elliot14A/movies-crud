import React, { FC } from "react";
import Link from "next/link";
import DeleteModal from "./DeleteModal";
import toast from "react-hot-toast";
import { Edit, Trash } from "lucide-react";
import { MovieType } from "@/lib/zustand/movies";

const Moviecard: FC<{ movie: MovieType }> = ({
  movie: { title, imageUrl, id, release, description, cast, genre },
}) => {
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const date = new Date(release);
  return (
    <div>
      <div className="border border-black w-full bg-white rounded-lg p-6 md:p-8 lg:p-10">
        <div className="flex flex-col justify-between">
          <div className="flex flex-col md:flex-row md:items-center mb-4">
            <div className="text-xl font-bold md:mr-4">{title}</div>
          </div>
          <div>
            <div className="my-3 flex items-center justify-between">
              <div></div>
              <div className="flex items-center gap-4">
                <Trash
                  onClick={() => {
                    setShowDeleteModal(showDeleteModal ? false : true);
                  }}
                  className="h-6 w-6"
                />
                <Link href={`/home/movies/${id}/edit`}>
                  <Edit className="h-6 w-6" />
                </Link>
              </div>
            </div>
          </div>

          <img className="rounded-lg h-56 w-full" src={imageUrl} alt="" />
          <p className="mt-2 text-gray-700">{description}</p>
          <div className="text-sm text-gray-500">Genre: {genre}</div>
          <div className="text-sm text-gray-500">Cast: {cast.join(",")}</div>
          <div className="text-sm text-gray-500">
            Release: {date.toDateString()}
          </div>
        </div>
      </div>
      {showDeleteModal ? (
        <DeleteModal
          id={id}
          handleState={() => setShowDeleteModal(!showDeleteModal)}
          navigate={() => {
            toast.success("deleted successfully");
          }}
        />
      ) : null}
    </div>
  );
};

export default Moviecard;
