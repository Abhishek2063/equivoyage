// pages/Registration.js

import Link from "next/link";
import Image from "next/image";
import logoImage from "../../assets/images/logo.png";
import "../../assets/css/registration.css";
import TextInput from "@/components/textInput";
import { LOGIN } from "@/routeConstant";
import SubmitButton from "@/components/submitButton";
import EmailInput from "@/components/emailInput";

const Registration = () => {
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
        </div>

        <form>
          {/* Form fields */}

          <TextInput
            name="firstName"
            isRequired={true}
            // value="firstName"
            placeholder="Enter first name."
            label="First Name"
            maxLength={20}
          />
           <TextInput
            name="lastName"
            isRequired={false}
            // value="firstName"
            placeholder="Enter last name."
            label="Last Name"
            maxLength={20}
          />
            <EmailInput
            name="email"
            isRequired={true}
            // value="firstName"
            placeholder="Enter email."
            label="Email"
            maxLength={255}
          />
          {/* Register button */}
          <SubmitButton buttonName="Sign Up" />
        </form>

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

export default Registration;
