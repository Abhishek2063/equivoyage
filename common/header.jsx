// components/Header.js
import React from "react";
import Image from "next/image";
import logoImage from "../app/assets/images/logo.png";
import { LogoutOutlined } from "@ant-design/icons";
import styles from "../app/assets/css/header.module.css";
import { clearUserDetails, getUserDetails } from "@/storage/user";
import { put } from "./api";
import { API_LOGOUT, DASHBOARD, LOGIN } from "@/routeConstant";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { removeLocalData } from "@/storage/token";

const Header = () => {
  const userData = getUserDetails();
  const router = useRouter();
  const handleLogout = async () => {
    const logoutUser = await put(`${API_LOGOUT}/${userData.id}`, null, true);
    if (logoutUser.success) {
      message.success(logoutUser.message);
      router.push(LOGIN);
      removeLocalData();
      clearUserDetails();
    } else {
      message.error(logoutUser.message);
    }
  };
  return (
    <div>
      <header className={styles.header}>
        <div className={styles.headerLeft}>
          <div className={styles.logoContainer}>
            <Image
              src={logoImage}
              width={50}
              height={50}
              alt="Company Logo"
              className="mx-auto mb-2 mr-4 logoImage"
              onClick={() =>  router.push(DASHBOARD)}
            />
            <span className={styles.appName}>Equivoyage</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.welcomeText}>
            Welcome, {userData?.firstName + " " + userData?.lastName}
          </p>
          <button
            className={styles.logoutButton}
            onClick={() => handleLogout()}
          >
            <LogoutOutlined />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
