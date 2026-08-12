import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./layout.css";
import SplashScreens from "../../screens/SplashScreens";

const Layout = () => {
  return (
    <div className="layout">
         <SplashScreens />
           <Header />
      <main className="page-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;