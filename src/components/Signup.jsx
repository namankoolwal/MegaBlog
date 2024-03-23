import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { login } from "../store/authSlice";
import { useForm } from "react-hook-form";
import { Input, Button, Logo } from "../components";

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { register, handleSubmit } = useForm();

  const create = async (data) => {
    setLoading(true);
    setError("");
    try {
      const session = await authService.createAccount(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(login(userData));
          localStorage.removeItem("user")
          localStorage.setItem("user", JSON.stringify(userData));
        }
        setLoading(false);
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <section className="rounded-md mx-3 lg:w-1/3 mt-10 lg:mx-auto bg-black/20 p-0.5">
      <div className="flex rounded-md items-center justify-center bg-white w-full px-4 py-5 sm:px-6 sm:py-8 lg:px-4">
        <div className="xl:mx-0 xl:max-w-sm 2xl:max-w-md p-4 w-full ">
          <div className="mb-2">
            <Logo width="70px" />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black">
            Sign up to create account
          </h2>
          <p className="mt-2 text-sm text-gray-600 ">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Sign In
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(create)} className="mt-8">
            <div className="space-y-5">
              <Input
                label="Name: "
                type="text"
                placeholder="Name"
                {...register("name", {
                  required: true,
                })}
              />

              <Input
                label="Email: "
                type="email"
                placeholder="Email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                        value
                      ) || "Email address must be a valid address",
                  },
                })}
              />

              <Input
                label="Password: "
                type="password"
                placeholder="password"
                {...register("password", {
                  required: true,
                })}
              />

              <Button
                type="submit"
                className={`inline-flex w-full items-center justify-center rounded-md bg-black px-3.5 py-2.5 font-semibold leading-7 text-white ${
                  loading ? "bg-black/50" : "hover:bg-black/80"
                }`}
                disabled={loading}
              >
                Create Account
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Signup;
