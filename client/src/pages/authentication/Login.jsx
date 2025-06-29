import React, { useEffect, useState } from "react";
import { MdAlternateEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUserThunk } from "../../store/slice/user/userThunk";
import WelcomeAnimation from "../home/WelcomeAnimation";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  useEffect(()=>{
    if(isAuthenticated) navigate("/")
  },[isAuthenticated])



  const handleInputChange = (e) => {
    setLoginData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleLogin = async () => {
    const response = await dispatch(loginUserThunk(loginData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-wrap justify-center items-center p-6 min-h-screen">
      <img src="images/Messages-pana.svg" className="hidden md:block md:w-[40%]" alt="image" />
      <div className="flex flex-col w-full max-w-[30rem]  gap-5 bg-base-200 p-6 rounded-sm">
        <h2 className="text-lg">Welcome back!</h2>
        <label className="input  w-full">
          <MdAlternateEmail className="text-2xl" />
          <input
            name="username"
            onChange={handleInputChange}
            type="text"
            placeholder="Username"
            required
          />
        </label>
        <label className="input  w-full">
          <PiPasswordFill className="text-2xl" />
          <input
            name="password"
            onChange={handleInputChange}
            type="password"
            placeholder="Password"
            required
          />
        </label>
        <button
          onClick={handleLogin}
         
          className="btn btn-active btn-primary"
        >
          Login
        </button>
        <p className="text-sm">
          Don't have an account? &nbsp;
          <Link
            to="/signup"
            className=" text-blue-400 underline underline-offset-2"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
