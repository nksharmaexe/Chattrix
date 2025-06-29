import { MdAlternateEmail } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { PiPasswordFill } from "react-icons/pi";
import { FaSign, FaUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  registerUserThunk,
} from "../../store/slice/user/userThunk";
import toast from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  const [signupData, setSignupData] = useState({
    fullname: "",
    gender: "",
    email: "",
    username: "",
    password: "",
    confirm_password: "",
  });

  useEffect( () => {
    
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const handleSignupData = (e) => {
    setSignupData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSignup = async () => {
    if (signupData.password !== signupData.confirm_password) {
      return toast.error("Password and confirm password do not match");
    }
    const response = await dispatch(registerUserThunk(signupData));
    if (response?.payload?.success) {
      navigate("/");
    }
  };
  return (
    <div className="flex flex-wrap justify-center items-center p-6 min-h-screen">
      <img src="images/Messages-pana.svg" className="hidden md:block md:w-[40%]" alt="image" />
      <div className="flex flex-col w-full max-w-[30rem]  gap-5 bg-base-200 p-6 rounded-sm">
        <h2 className="text-lg">Welcome!</h2>
        <label className="input w-full">
          <FaUserCircle className="text-2xl" />
          <input
            onChange={handleSignupData}
            type="text"
            name="fullname"
            required
            placeholder="Full name"
          />
        </label>
        <lable>
          Male{" "}
          <input
            onChange={handleSignupData}
            type="radio"
            name="gender"
            value="male"
            className="radio radio-sm"
          />{" "}
          &nbsp; Female{" "}
          <input
            onChange={handleSignupData}
            type="radio"
            name="gender"
            value="female"
            className="radio radio-sm"
          />
        </lable>
        <label className="input  w-full">
          <MdEmail className="text-2xl" />
          <input
            onChange={handleSignupData}
            name="email"
            type="email"
            placeholder="Email"
            required
          />
        </label>
        <label className="input  w-full">
          <MdAlternateEmail className="text-2xl" />
          <input
            onChange={handleSignupData}
            type="text"
            name="username"
            placeholder="username"
            required
          />
        </label>
        <label className="input  w-full">
          <PiPasswordFill className="text-2xl" />
          <input
            onChange={handleSignupData}
            type="password"
            name="password"
            placeholder="Password"
            required
          />
        </label>
        <label className="input  w-full">
          <PiPasswordFill className="text-2xl" />
          <input
            onChange={handleSignupData}
            type="password"
            name="confirm_password"
            placeholder="Confirm password"
            required
          />
        </label>
        <button onClick={handleSignup} className="btn btn-active btn-primary">
          Signup
        </button>
        <p className="text-sm">
          Already have an account? &nbsp;
          <Link
            to="/login"
            className=" text-blue-400 underline underline-offset-2"
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
