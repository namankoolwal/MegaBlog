import React, { useEffect, useState } from "react";
import service from "../appwrite/conf";
import { Container, Loader, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    service
      .getPosts([])
      .then((posts) => {
        if (posts.documents.length > 0) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <>
      {authStatus ? (
        <div className="w-full py-8 ">
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
                  <h1 className="text-3xl my-5 font-bold">
                    No posts to display
                  </h1>
                  <p className="text-xl">Try Adding Some Posts</p>
                </div>
              )}
            </div>
          </Container>
        </div>
      ) : (
        <>
          <div className="relative isolate my-0.5 z-0 bg-white px-6 py-10 md:py-4 lg:px-8">
            <div className="relative mx-auto max-w-2xl py-24">
              <div className="absolute inset-x-0 -top-[4rem] -z-10 transform-gpu overflow-hidden blur-3xl md:-top-[10rem]">
                <svg
                  className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
                  viewBox="0 0 1155 678"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
                    fillOpacity=".3"
                    d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
                  />
                  <defs>
                    <linearGradient
                      id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
                      x1="1155.49"
                      x2="-78.208"
                      y1=".177"
                      y2="474.645"
                      gradientUnits="userSpaceOnUse"
                    >
                      <stop stopColor="#9089FC" />
                      <stop offset={1} stopColor="#FF80B5" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="text-center">
                <h1 className="md:text-4xl text-2xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Welcome to MegaBlog
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  Your platform for sharing your thoughts, stories, and
                  experiences <br />
                  MegaBlog allows you to express yourself freely through your
                  personal blog. Share your ideas, opinions, and stories with
                  the world.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-2">
                  <Link
                    to="/login"
                    className="rounded-md border border-black px-4 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:border-black/80 hover:shadow-md hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="rounded-md border border-black px-4 py-2 text-sm font-semibold text-black shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black hover:border-black/80 hover:shadow-md hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
