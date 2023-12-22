"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoImage from "../assets/images/logo.png";
import "../assets/css/login.css";
import Link from "next/link";
import { LOGIN, DASHBOARD, API_VERIFY_TOKEN } from "@/routeConstant";
import { post } from "@/common/api";
import { useRouter, useSearchParams } from "next/navigation";

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const search = searchParams.get("token");
  const [verificationStatus, setVerificationStatus] = useState(null);

  useEffect(() => {
    // Extract the token from the URL
    const urlToken = search;

    // Check if the token is present
    if (urlToken) {
      // Send token to the API for verification
      const verifyToken = async () => {
        try {
          const response = await post(
            API_VERIFY_TOKEN,
            { token: urlToken },
            false
          );

          if (response.success) {
            // Verification successful, redirect to dashboard
            router.push(DASHBOARD);
          } else {
            // Verification failed, update the verification status
            setVerificationStatus(
              "Two-factor verification failed. Please try again."
            );
          }
        } catch (error) {
          console.error("Error during token verification:", error);
          setVerificationStatus(
            "An error occurred during verification. Please try again."
          );
        }
      };

      // Call the verification function
      verifyToken();
    } else {
      // Token is not present in the URL
      setVerificationStatus("Token not found in the URL.");
    }
  }, []);

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

          <h3 className="text-lg font-bold companyTitle">
            <span className="gradient-text">Verification</span>
          </h3>
        </div>

        {/* Display verification status */}
        {verificationStatus && (
          <p className="text-sm text-red-500 mt-4">{verificationStatus}</p>
        )}

        {/* Message above "Go to Login" button */}
        <p className="text-sm text-gray-500 mt-4">
          <Link href={LOGIN}>
            <span className="text-blue-500">Go to Sign IN</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Page;
