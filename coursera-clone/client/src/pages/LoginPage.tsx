import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {Link} from "react-router-dom";
import { observer } from "mobx-react";
import store from "../mobx/AppDataStore.ts";
import AxiosInstance from "../axios/AxiosInstance.tsx";
import {useState} from "react";
import {Navigate} from "react-router-dom";


function LoginPage() {
    const [redirect,setRedirect]=useState(false);
    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [loginEmail,setLoginEmail]=useState('');
    const [loginPassword,setLoginPassword]=useState('');

    function closeLoginPage(){
        store.setIsLoginOpen(false);
        store.setIsSignUpOpen(false);
    }
    async function handleSignUp(ev){
        ev.preventDefault();

        AxiosInstance.post('/signup',{name,email,password},{withCredentials:true})
            .then(res => {
                // Handle response
                alert('Registration Successful. Now you can login.')

            })
            .catch(err => {
                // Handle errors
                console.error(err);
                alert('Registration failed. Please try again.')
            });

    }

    async function handleLogin(ev){
        ev.preventDefault();
        console.log(loginEmail);
        console.log(loginPassword);

        AxiosInstance.post('/login',{loginEmail,loginPassword},{withCredentials:true})
            .then(res => {
                // Handle response
                store.setAccessToken(res.data.accessToken);
                console.log(res.data.accessToken);
                //to-do: save not as a string but as a @types model see app
                AxiosInstance.get('/profile',{ headers: {"Authorization" : `Bearer ${store.accessToken}`} })
                    .then(res=>{
                        store.setUser(res.data);
                        //why we need this question mark?
                        //console.log(store.user?.name);
                        setRedirect(true);
                    })
                    .catch(err=>{

                    });
            })
            .catch(err => {
                // Handle errors
                console.error(err);
            });
    }
    if (redirect){
        return <Navigate to={'/profile'}/>
    }




    return (
        <div className="absolute bg-white sm:bg-black sm:bg-opacity-80 w-full h-screen flex justify-center items-center">
            <div className="bg-white flex flex-col py-10 px-5 rounded-md relative">
                <div className="w-full hidden sm:flex items-center justify-end absolute cursor-pointer top-2 right-2">
                    <button onClick={closeLoginPage}>
                    <FontAwesomeIcon className="w-4 h-4" icon={faXmark} />
                    </button>
                </div>
                {store.isLoginOpen && (<div>
                    <h2 className="text-5xl mb-5">Welcome Back!</h2>
                    <h4 className="text-sm uppercase">email</h4>
                    <input className="border border-gray-500 w-full rounded-sm py-3 px-1 mb-2 mt-1" type="email"
                           placeholder="name@email.com"
                           value={loginEmail}
                           onChange={ev=>setLoginEmail(ev.target.value)}/>
                    <h4 className="text-sm uppercase">password</h4>
                    <input className="border border-gray-500 w-full rounded-sm py-3 px-1 mt-1" type="password"
                           placeholder="Enter your password"
                           value={loginPassword}
                           onChange={ev=>setLoginPassword(ev.target.value)}/>
                    <button className="w-full bg-blue-500 rounded-md py-3 mt-5 mb-1" onClick={handleLogin}>Login</button>
                    <p className="text-center">New to Courses? <Link className="underline text-blue-500 cursor-pointer">Sign
                        up</Link></p>
                </div>)}
                {store.isSignUpOpen && (
                    <div className="">
                    <h2 className="text-5xl mb-2 text-center">Sign up</h2>
                    <p className="text-md mb-5 text-center">Learn on your own time from top universities and businesses.</p>

                    <h4 className="text-sm uppercase">full name</h4>
                    <input className="border border-gray-500 w-full rounded-sm py-3 px-1 mb-2 mt-1" type="email"
                           placeholder="Enter your full name"
                           value={name}
                           onChange={ev=>setName(ev.target.value)}/>
                    <h4 className="text-sm uppercase">email</h4>
                    <input className="border border-gray-500 w-full rounded-sm py-3 px-1 mb-2 mt-1" type="email"
                           placeholder="name@email.com"
                           value={email}
                           onChange={ev=>setEmail(ev.target.value)}/>
                    <h4 className="text-sm uppercase">password</h4>
                    <input className="border border-gray-500 w-full rounded-sm py-3 px-1 mt-1" type="password"
                           placeholder="Create password"
                           value={password}
                           onChange={ev=>setPassword(ev.target.value)}/>
                    <button className="w-full bg-blue-500 rounded-md py-3 mt-5 mb-1" onClick={handleSignUp}>Sign Up</button>
                    <p className="text-center">Already on Courses? <Link className="underline text-blue-500 cursor-pointer">Log in</Link></p>
                </div>)}
            </div>

        </div>

    )
}

export default observer(LoginPage)