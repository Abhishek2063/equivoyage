"use client";
// components/dashboard/DashboardLayout.js
import Footer from '@/common/footer';
import Header from '@/common/header';
import "../assets/css/header.module.css"
import "../assets/css/footer.module.css"
import Starfield from 'react-starfield';
import { message } from 'antd';
const DashboardLayout = ({ children }) => {
  message.config({
    maxCount: 1,
  });
  return (
    <div className="dashboard-layout">
      {/* Header */}
     <Header/>
     <Starfield
        starCount={10000}
        starColor={[255, 255, 255]}
        speedFactor={0.05}
        backgroundColor="black"
      />
      {/* Body */}
      <main className="main-content">{children}</main>

      {/* Footer */}
     <Footer/>

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        .main-content {
          flex: 1;
          display: flex;
          color:white;
          margin-top:100px
        }

       
      `}</style>
    </div>
  );
};

export default DashboardLayout;
