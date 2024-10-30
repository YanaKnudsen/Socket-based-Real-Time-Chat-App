import Woman from "../assets/woman.png";
import ThinLine from "../components/ThinLine.tsx";
import Header from "../components/Header.tsx";
import { observer } from "mobx-react";
import store from "../mobx/AppDataStore.ts";
import LoginPage from "./login/LoginPage.tsx";


import {useEffect, useState} from "react";
import SignUpPage from "./login/SignUpPage.tsx";

function IndexPage() {

    useEffect(() => {
        store.setIsLoginOpen(true);
    }, []);

    return (
        <div className="main">

            {store.isLoginOpen?
                (<LoginPage/>):(<SignUpPage/>)}
        </div>

    )
}

export default observer(IndexPage)