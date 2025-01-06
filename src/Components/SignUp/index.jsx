import { CiUser } from "react-icons/ci";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useRef, useState, useEffect } from "react";

const SignUp = () => {
  const fullNameRef = useRef();
  const userNameRef = useRef();
  const passwordRef = useRef();
  const confirmRef = useRef();
  const emailRef = useRef();

  const navigate = useNavigate();

  const [passwordState, setPasswordState] = useState(true);
  const [errors, setErrors] = useState({});

  const togglePasswordState = () => setPasswordState((s) => !s);

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    const storedUserName = localStorage.getItem("userName");
    const storedEmail = localStorage.getItem("email");

    if (storedFullName) fullNameRef.current.value = storedFullName;
    if (storedUserName) userNameRef.current.value = storedUserName;
    if (storedEmail) emailRef.current.value = storedEmail;
  }, []);

  const submitFormHandler = async (event) => {
    event.preventDefault();
    setErrors({});

    const fullName = fullNameRef.current.value.trim();
    const userName = userNameRef.current.value.trim().toLowerCase();
    const password = passwordRef.current.value.trim();
    const confirmPassword = confirmRef.current.value.trim();
    const email = emailRef.current.value.trim();

    let hasError = false;
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = "Full Name is required.";
      hasError = true;
    }

    if (!userName) {
      newErrors.userName = "Username is required.";
      hasError = true;
    }

    if (!email) {
      newErrors.email = "Email is required.";
      hasError = true;
    }

    if (password.length < 6) {
      newErrors.password = "Password should be at least 6 characters long.";
      hasError = true;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    const profilePicURL = `https://avatar.iran.liara.run/username?username=${fullName.replace(
      " ",
      "+"
    )}`;

    const newUser = {
      userName,
      password,
      fullName,
      confirmPassword,
      email,
      profilePic: profilePicURL,
      photo: profilePicURL,
    };

    try {
      const response = await fetch(`${apiUrl}/auth/sign-up`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(newUser),
      });

      const data = await response.json();

      if (response.ok) {
        sessionStorage.setItem("userName", data.data.userName);
        sessionStorage.setItem("email", data.data.email);
        sessionStorage.setItem("token", data.token);
        navigate("/SignInPage");
      } else {
        setErrors({
          userName:
            data.responseMessage || "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      setErrors({ general: "Failed to connect to the server." });
    }
  };

  const handleInputChange = () => {
    localStorage.setItem("fullName", fullNameRef.current.value);
    localStorage.setItem("userName", userNameRef.current.value);
    localStorage.setItem("email", emailRef.current.value);
  };

  return (
    <div className="h-[600px] mx-auto w-1/4 min-w-60 flex items-center justify-center flex-col">
      <div className="text-center mb-5">
        <h1 className="text-3xl text-bold">Welcome</h1>
        <h5 className="text-xs text-neutral-500">Create your account</h5>
      </div>
      <form onSubmit={submitFormHandler} className="w-full space-y-5">
        <div className="w-full">
          <label className="text-gray-500 text-sm" htmlFor="fullName">
            Full Name
          </label>
          <div className="relative h-10">
            <input
              ref={fullNameRef}
              type="text"
              id="fullName"
              placeholder="Elgun Garayev"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange"
              onChange={handleInputChange}
            />
            <CiUser
              color="gray"
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-0"
            />
          </div>
          {errors.fullName && (
            <p className="text-red-600 text-xs mt-1">{errors.fullName}</p>
          )}
        </div>

        <div className="w-full">
          <label className="text-gray-500 text-sm" htmlFor="username">
            Username
          </label>
          <div className="relative h-10">
            <input
              ref={userNameRef}
              type="text"
              id="username"
              placeholder="elgngryv"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange"
              onChange={handleInputChange}
            />
            <CiUser
              color="gray"
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-0"
            />
          </div>
          {errors.userName && (
            <p className="text-red-600 text-xs mt-1">{errors.userName}</p>
          )}
        </div>

        <div className="w-full">
          <label className="text-gray-500 text-sm" htmlFor="email">
            Email
          </label>
          <div className="relative h-10">
            <input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="yourname@example.com"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange"
              onChange={handleInputChange}
            />
            <CiUser
              color="gray"
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-0"
            />
          </div>
          {errors.email && (
            <p className="text-red-600 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div className="w-full">
          <label className="text-gray-500 text-sm" htmlFor="password">
            Password
          </label>
          <div className="relative h-10">
            <input
              ref={passwordRef}
              type={passwordState ? "password" : "text"}
              id="password"
              placeholder="6+ strong character"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange"
            />
            <span
              onClick={togglePasswordState}
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer">
              {passwordState ? (
                <FaRegEye color="gray" className="w-5 h-5" />
              ) : (
                <FaRegEyeSlash color="gray" className="w-5 h-5" />
              )}
            </span>
          </div>
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">{errors.password}</p>
          )}
        </div>

        <div className="w-full">
          <label className="text-gray-500 text-sm" htmlFor="confirmPassword">
            Confirm Password
          </label>
          <div className="relative h-10">
            <input
              ref={confirmRef}
              type={passwordState ? "password" : "text"}
              id="confirmPassword"
              placeholder="Confirm your password"
              className="absolute w-full h-full text-sm py-3 top-0 left-0 focus:outline-none bg-transparent border-b-2 border-gray-300 focus:border-lightOrange"
            />
            <span
              onClick={togglePasswordState}
              className="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer">
              {passwordState ? (
                <FaRegEye color="gray" className="w-5 h-5" />
              ) : (
                <FaRegEyeSlash color="gray" className="w-5 h-5" />
              )}
            </span>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-600 text-xs mt-1">
              {errors.confirmPassword}
            </p>
          )}
        </div>

        {errors.general && (
          <p className="text-red-600 text-sm text-center py-2 px-4 bg-red-100 rounded-lg shadow-md">
            {errors.general}
          </p>
        )}

        <button className="w-full bg-red-500 text-white p-2 rounded-xl hover:scale-95 transition-all duration-200">
          Sign Up
        </button>
        <p className="text-center text-xs">
          Do you have an account?{" "}
          <Link className="text-lightOrange" to="/SignInPage">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
