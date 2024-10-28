import {Outlet} from "react-router-dom";
import Header from "../components/Header.tsx";

function Layout() {

    return (
        <div className="py-2 flex flex-col min-h-screen relative">
            <Header/>
            <Outlet/>
        </div>

    )
}

export default Layout