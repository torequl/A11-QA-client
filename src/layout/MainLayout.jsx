import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import NewNavbar from "../components/navbar/NewNavbar";

const MainLayout = () => {
    return (
        <>
        <NewNavbar/>
        {/* <Navbar/> */}
        <Outlet/>
        <Footer/>
        </>
    );
};

export default MainLayout;