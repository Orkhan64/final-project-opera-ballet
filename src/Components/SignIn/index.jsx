import { CiUser } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL;

const SignIn = () => {
  const [passwordState, setPasswordState] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [showModal, setShowModal] = useState(false);

  const userNameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const signInHandler = async (event) => {
    event.preventDefault();

    const userName = userNameRef.current.value.trim().toLowerCase();
    const password = passwordRef.current.value.trim();

    try {
      const response = await fetch(`${apiUrl}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userName, password }),
      });

      if (response.ok) {
        const data = await response.json();

        localStorage.setItem("userName", data.data.userName);
        localStorage.setItem("userId", data.data._id);
        localStorage.setItem("token", data.token);

        setShowModal(true);

        window.dispatchEvent(new Event("storage"));
        setTimeout(() => {
          setShowModal(false);
          navigate("/");
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrorMessage(errorData.message || "Invalid username or password.");
      }
    } catch (error) {
      setErrorMessage("An error occurred. Please try again later.");
      console.error("Login error: ", error);
    }
  };

  return (
    <div className="h-[600px] mx-auto w-1/4 min-w-60 flex items-center justify-center flex-col">
      <div className="text-center mb-5">
        <h1 className="text-3xl text-bold">Welcome Back</h1>
        <h5 className="text-xs text-neutral-500">Login in to your account</h5>
      </div>

      {errorMessage && (
        <div className="w-full p-3 bg-red-500 text-white text-center mb-4 rounded-lg">
          {errorMessage}
        </div>
      )}

      <form onSubmit={signInHandler} className="w-full space-y-5">
        <div className="w-full">
          <label className="text-gray-500 text-sm" htmlFor="userName">
            Username
          </label>
          <div className="relative h-10">
            <input
              type="userName"
              id="userName"
              ref={userNameRef}
              placeholder="elgngryv"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange "
            />
            <CiUser
              color="gray"
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-0"
            />
          </div>
        </div>

        <div className="w-full">
          <label className="text-gray-500 text-sm" htmlFor="password">
            Password
          </label>
          <div className="relative h-10">
            <input
              type={passwordState ? "password" : "text"}
              id="password"
              ref={passwordRef}
              placeholder="6+ strong characters"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange"
            />
            <span
              onClick={() => setPasswordState((s) => !s)}
              className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer">
              {passwordState ? (
                <FaRegEye color="gray" className="w-5 h-5" />
              ) : (
                <FaRegEyeSlash color="gray" className="w-5 h-5" />
              )}
            </span>
          </div>
        </div>

        <button className="w-full bg-red-500 text-white p-2 rounded-xl hover:scale-95 transition-all duration-200">
          Sign In
        </button>
        <p className="text-center text-xs">
          Don't you have an account?{" "}
          <Link className="text-lightOrange" to="/SignUpPage">
            Sign Up
          </Link>
        </p>
        <Link to="/ResetPassPage">
          <p className="text-center text-xs mt-2">Forgot Password?</p>
        </Link>
      </form>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-5 rounded-md text-center animate-fadeOut">
            <p className="text-lg text-green-500">Successfully Logged In!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignIn;
