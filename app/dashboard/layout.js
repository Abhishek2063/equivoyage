"use client";
// components/dashboard/DashboardLayout.js
import Footer from '@/common/footer';
import Header from '@/common/header';
import "../assets/css/header.module.css"
import "../assets/css/footer.module.css"
const DashboardLayout = ({ children }) => {
  return (
    <div className="dashboard-layout">
      {/* Header */}
     <Header/>

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
          justify-content: center;
          align-items: center;
        }

       
      `}</style>
    </div>
  );
};

export default DashboardLayout;
