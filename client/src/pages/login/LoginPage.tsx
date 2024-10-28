
import "./loginPage.scss"
import { observer } from "mobx-react";
import store from "../../mobx/AppDataStore.ts";
import AxiosInstance from "../../axios/AxiosInstance.tsx";
import {useState} from "react";
import {Navigate} from "react-router-dom";
import {theme,desriptiontheme} from "../../themes/theme.tsx";
import {ThemeProvider, Typography} from "@mui/material";



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
       // console.log(loginEmail);
       // console.log(loginPassword);

        AxiosInstance.post('/login',{loginEmail,loginPassword},{withCredentials:true})
            .then(res => {
                store.setAccessToken(res.data.accessToken);
                console.log(res.data.accessToken);
                AxiosInstance.get('/profile',{ headers: {"Authorization" : `Bearer ${store.accessToken}`} })
                    .then(res=>{
                        store.setUser(res.data);
                        alert('Login Successful!');
                       // setRedirect(true);
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

            <div className="loginField">
                <div className="loginInner">
                    <div className="blur"/>
                    <div className="content">
                        <ThemeProvider theme={theme} >
                            <Typography variant="h4" >Welcome!</Typography>
                        </ThemeProvider>
                    <div className="inputName">
                        <ThemeProvider theme={desriptiontheme} >
                            <Typography variant="h6" >Email</Typography>
                        </ThemeProvider>
                    </div>
                    <input placeholder="Email" value={loginEmail}
                           onChange={e => setLoginEmail(e.target.value)}/>
                    <div className="inputName">
                        <ThemeProvider theme={desriptiontheme} >
                            <Typography variant="h6" >Password</Typography>
                        </ThemeProvider>
                    </div>
                    <input placeholder="Password" value={loginPassword}
                           onChange={e => setLoginPassword(e.target.value)}/>
                    <div className="btn" onClick={handleLogin}>
                        <ThemeProvider theme={desriptiontheme} >
                            <Typography variant="h6" >Log In</Typography>
                        </ThemeProvider>
                    </div>
                        <ThemeProvider theme={desriptiontheme} >
                            <Typography variant="h6" >Don't have an account yet? <span onClick={()=>{
                                store.setIsLoginOpen(!store.isLoginOpen);
                            }}>Sign Up</span></Typography>
                        </ThemeProvider>
                    </div>

                </div>

            </div>


    )
}

export default observer(LoginPage)