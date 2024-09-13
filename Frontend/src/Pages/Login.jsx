import React from "react";
import loginImg from "../assets/loginPage.jpg";
import SignIn from "../components/Signin";
function Login() {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-black text-white flex  flex-col-reverse md:flex-row md:h-screen w-screen">
      <div className="md:flex-1">
        <img
          src={loginImg}
          alt="login image"
          className="object-cover h-screen shadow-white shadow-lg"
        />
      </div>
      <div className=" flex justify-center md:flex-1 items-center bg-black h-screen">
        <SignIn />
      </div>
    </div>
  );
}

export default Login;
