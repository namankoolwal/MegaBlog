import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input, Loader, Logo } from "../components";
import { login as authLogin } from "../store/authSlice";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setLoading(true);
    document.body.style.cursor = "wait";
    setError("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) {
          dispatch(authLogin(userData));
          localStorage.removeItem("user")
          localStorage.setItem("user", JSON.stringify(userData));
        }
        setLoading(false);
        document.body.style.cursor = "default";
        navigate("/");
      }
    } catch (error) {
      setLoading(false);
      document.body.style.cursor = "default";
      setError(error.message);
    }
  };
  return (
    <section className="rounded-md mx-3 lg:w-1/3 mt-10 lg:mx-auto bg-black/20 p-0.5 relative">
      <div className="flex rounded-md items-center justify-center bg-white w-full px-4 py-5 sm:px-6 sm:py-8 lg:px-4">
        <div className="xl:mx-0 xl:max-w-sm 2xl:max-w-md p-4 w-full ">
          <div className="mb-2">
            <Logo width="70px" />
          </div>
          <h2 className="text-2xl font-bold leading-tight text-black">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-gray-600 ">
            Don&apos;t have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-black transition-all duration-200 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

          <form onSubmit={handleSubmit(login)} className="mt-8">
            <div className="space-y-5">
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
                Sign In
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Login;
