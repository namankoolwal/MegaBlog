import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import service from "../appwrite/conf";
import { Button, Container, Loader } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;


  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  const [image, setImage] = useState("");
  useEffect(() => {
    if (post) {
      service.getFilePreview(post.featuredImage).then((image) => {
        setImage(image);
      });
    }
  }, [post]);

  return post ? (
    <div className="w-full py-8 ">
      <Container>
        <div className="flex flex-col p-1 rounded-md border md:flex-row relative">
          <div className="h-full w-full md:h-[400px] md:w-[500px]">
            <img
              src={image}
              alt={post.title}
              className="h-full w-full rounded-md object-fill md:h-[400px] md:w-[500px]"
            />
          </div>
          <div>
            <div className="p-4">
              <div className="flex items-center">
                <h1 className="inline-flex items-center text-2xl font-semibold">
                  {post.title}
                </h1>
                <span
                  className={`mb-2 mt-4 mx-2 inline-block rounded-full ${
                    post.status === "active" ? "bg-green-300" : "bg-red-300"
                  } px-3 py-1 text-center text-xs font-semibold text-black`}
                >
                  {post.status}
                </span>
               
              </div>
             
              <div className="flex gap-1 mb-4 flex-col">
                <p className="text-sm text-gray-600">
                  Created on: {new Date(post.$createdAt).toLocaleString()}
                </p>
                <p className="text-sm text-gray-600">
                  Last updated: {new Date(post.$updatedAt).toLocaleString()}
                </p>
                
              </div>

              <p className="md:mt-10 text-md text-gray-900">
                {parse(post.content)}
              </p>
            </div>
            {isAuthor && (
              <div className="mt-3 flex items-center space-x-2 px-4 pb-4 md:pb-0 md:px-0 md:absolute md:right-4 md:top-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button
                    bgColor="bg-green-500"
                    className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  >
                    Edit
                  </Button>
                </Link>
                <Button
                  bgColor="bg-red-500"
                  className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                  onClick={deletePost}
                >
                  Delete
                </Button>
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <Container>
      <h1 className="font-bold text-2xl text-center my-16">
        <Loader />
      </h1>
    </Container>
  );
}
