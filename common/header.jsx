// components/Header.js
import React from "react";
import Image from "next/image";
import logoImage from "../app/assets/images/logo.png";
import { LogoutOutlined } from "@ant-design/icons";
import styles from "../app/assets/css/header.module.css";

const Header = () => {
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
            />
            <span className={styles.appName}>Equivoyage</span>
          </div>
        </div>
        <div className={styles.headerRight}>
          <p className={styles.welcomeText}>Welcome, Username</p>
          <button className={styles.logoutButton}>
            <LogoutOutlined />
          </button>
        </div>
      </header>
    </div>
  );
};

export default Header;
