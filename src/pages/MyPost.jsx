import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Container, PostCard, Loader } from "../components";

const MyPost = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const userData = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
 
  useEffect(() => {
      service
      .getPosts([])
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents.filter((post) => {
            if (post.userId === userData.$id) {
              return post;
            }
        }));
    }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap flex-col lg:flex-row">
          {loading ? (
            <div className="text-center p-2 w-full my-16">
              <Loader />
            </div>
          ) : posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.$id} className="p-2 lg:w-1/4 mx-auto lg:mx-0">
                <PostCard {...post} />
              </div>
            ))
          ) : (
            <div className="text-center p-2 w-full my-12">
              <h1 className="text-3xl my-5 font-bold">No posts to display</h1>
              <p className="text-xl">Try Adding Some Posts</p>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
};

export default MyPost;