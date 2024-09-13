import React from "react";
import signupImg from "../assets/signup.jpg";
import SignIn from "../components/Signin";
import SignUp from "../components/SignupComponent";
function Signup() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-black text-white flex flex-col-reverse md:flex-row md:h-screen w-screen">
      <div className="md:flex-1">
        <img
          src={signupImg}
          alt="signup image"
          className="object-cover h-screen shadow-white shadow-lg"
        />
      </div>
      <div className="md:flex-1 flex justify-center items-center h-screen">
        <SignUp />
      </div>
    </div>
  );
}

export default Signup;
