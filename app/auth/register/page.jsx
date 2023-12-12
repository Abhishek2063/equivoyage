"use client";
// pages/Registration.js

import Link from "next/link";
import Image from "next/image";
import logoImage from "../../assets/images/logo.png";
import "../../assets/css/registration.css";
import { LOGIN } from "@/routeConstant";
import RegisterationForm from "./registerationForm";
import { useState } from "react";

const Page = () => {
  const [registerDataState, setRegisterDataState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [registerErrState, setRegisterErrState] = useState([]);

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
            <span className="gradient-text">Create An Account</span>
          </h3>
        </div>

        <RegisterationForm
          registerDataState={registerDataState}
          setRegisterDataState={setRegisterDataState}
          registerErrState={registerErrState}
          setRegisterErrState={setRegisterErrState}
        />

        {/* Message above "Go to Login" button */}
        <p className="text-sm text-gray-500 mt-4">
          Already have an account?{" "}
          <Link href={LOGIN}>
            <span className="text-blue-500">Go to Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
