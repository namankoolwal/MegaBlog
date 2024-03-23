import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const PostCard = ({ $id, $updatedAt, title, featuredImage }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    service.getFilePreview(featuredImage).then((image) => {
      setImage(image);
    });
  }, []);

  return (
    <article className="block w-[300px] shadow-md rounded-md border p-1 overflow-hidden">
      <img
        src={image}
        alt={title}
        className="h-48 w-full rounded-md shadow-sm object-cover"
      />
      <div className="p-4 pl-2">
        <h1 className="text-lg font-semibold mb-2">{title}</h1>

        <p className="text-sm text-gray-600 mb-4">
          Last updated: {new Date($updatedAt).toLocaleString()}
        </p>
        <Link
          to={`/post/${$id}`}
          className="mt-4 rounded-md bg-black px-2.5 py-1.5 text-[12px] font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
        >
          Read More &#8594;
        </Link>
      </div>
    </article>
  );
};

export default PostCard;
