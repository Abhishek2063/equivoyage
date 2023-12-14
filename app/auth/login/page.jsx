"use client";
// pages/Registration.js

import Link from "next/link";
import Image from "next/image";
import logoImage from "../../assets/images/logo.png";
import "../../assets/css/login.css";
import { useState } from "react";
import LoginForm from "./loginForm";
import { REGISTRATION } from "@/routeConstant";
import { useRouter } from "next/navigation";

const Page = () => {
  const [loginDataState, setLoginDataState] = useState({
    email: "",
    password: "",
  });
  const [loginErrState, setLoginErrState] = useState([]);
  const router = useRouter()
  return (
    <div className="min-h-screen flex items-center justify-center bg-cover bg-blur registrationPage bg-blend-lighten hover:bg-blend-darken">
      <div className="formBox p-8 rounded-lg shadow-md w-96">
        <div className="mb-6 text-center">
          <Image
            src={logoImage}
            width={50}
            height={50}
            alt="Company Logo"
            className="mx-auto mb-2 logoImage"
          />
          <h1 className="text-lg font-bold companyTitle">
            <span className="gradient-text">Equiyoage</span>
          </h1>
          <h3 className="text-lg font-bold companyTitle">
            <span className="gradient-text">Sign In your account</span>
          </h3>
        </div>

        <LoginForm
          loginDataState={loginDataState}
          setLoginDataState={setLoginDataState}
          loginErrState={loginErrState}
          setLoginErrState={setLoginErrState}
          router={router}
        />

        {/* Message above "Go to Login" button */}
        <p className="text-sm text-gray-500 mt-4">
          If you do not have an account?{" "}
          <Link href={REGISTRATION}>
            <span className="text-blue-500">Go to Sign Up</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
