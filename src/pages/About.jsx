import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../components";

const About = () => {
  return (
    <Container>
    <div className="bg-gray-100 flex flex-col my-5 items-center justify-center">
      <div className="container mx-auto">
        <header className="text-center mb-8">
          <h1 className="md:text-4xl text-2xl font-bold"> We're just getting started</h1>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-md rounded-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Express Yourself</h2>
            <p className="text-gray-600">
              MegaBlog allows you to express yourself freely through your
              personal blog. Share your ideas, opinions, and stories with the
              world.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Stay Connected</h2>
            <p className="text-gray-600">
              Connect with like-minded individuals and expand your network.
              Follow other bloggers, engage with their content, and build
              meaningful connections.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
          <div className="bg-white shadow-md rounded-md p-8">
            <h2 className="text-2xl font-semibold mb-4">
              Create and Update Posts
            </h2>
            <p className="text-gray-600">
              With MegaBlog, you can easily create and update your posts.
              Whether you're sharing a new story or updating your readers on
              recent events, our platform makes it simple and intuitive.
            </p>
          </div>
          <div className="bg-white shadow-md rounded-md p-8">
            <h2 className="text-2xl font-semibold mb-4">Join MegaBlog Today</h2>
            <p className="text-gray-600">
              Ready to start your blogging journey? Sign up for MegaBlog today
              and join our community of passionate bloggers. Share your voice,
              connect with others, and inspire the world.
            </p>
            <div className="flex ">
              <Link
                to="/signup"
                className="bg-blue-500 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-blue-600 transition duration-300 mt-4 mr-4"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="bg-gray-500 text-white font-semibold py-2 px-6 rounded-md shadow-md hover:bg-gray-600 transition duration-300 mt-4"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
    </Container>
  );
};

export default About;
