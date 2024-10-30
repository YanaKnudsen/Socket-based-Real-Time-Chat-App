import Woman from "../assets/woman.png";
import ThinLine from "../components/ThinLine.tsx";
import Header from "../components/Header.tsx";
import { observer } from "mobx-react";
import store from "../mobx/AppDataStore.ts";


import LoginPage from "./LoginPage.tsx";
import {useState} from "react";

function IndexPage() {
    //implement also for header
   function openLogInPage(){
        store.setIsLoginOpen(true);
    }

   function openSignUpPage(){
       store.setIsSignUpOpen(true);
   }
    return (
        <div className="flex-col flex relative">
            <Header/>
            <ThinLine/>
            <div className="flex flex-row max-h-screen lg:p-28 p-14 justify-center lg:items-center items-center align-middle" >
              <div className="flex flex-col justify-center  md:basis-3/5">
                <h1 className="text-7xl mb-3 font-bold">Learn without <br/> limits</h1>
                <p className="mb-3 text-xl">Start, switch, or advance your career with more than 7,000 courses, Professional Certificates, and degrees from world-class universities and companies.</p>
                <div className="flex gap-5">
                    <button className="border border-blue-800 bg-blue-800 text-white py-2 px-5 rounded-md" onClick={openSignUpPage}>Join for Free</button>
                    <button className="border-2 border-blue-800 text-blue-800 py-2 px-5 rounded-md" onClick={openLogInPage}>Log In</button>
                </div>

              </div>
              <div className="basis-0 hidden md:basis-2/5 md:flex justify-center items-start mb-20">
                  <img  className="sm:object-contain" src={Woman}  alt=""/>
              </div>

            </div>

            {(store.isLoginOpen||store.isSignUpOpen) &&
                (<LoginPage/>) }
        </div>

    )
}

export default observer(IndexPage)