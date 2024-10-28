// initialize project: https://www.digitalocean.com/community/tutorials/how-to-set-up-a-react-project-with-vite
// https://tailwindcss.com/docs/guides/vite
//remove everything from app.css
// yarn add tailwindcss postcss autoprefixer
// npx tailwindcss init -p
//npm i react-router-dom axios
//FontAwesome https://dev.to/davidemaye/how-to-set-up-font-awesome-in-react-5a8d
import './App.css'
import {Routes,Route} from "react-router-dom";
import IndexPage from "./pages/IndexPage.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import NewCourse from "./pages/NewCourse.tsx";
import VideoChatPage from "./pages/VideoChatPage.tsx";
import VideoPage from "./pages/VideoPage2.tsx";



function App() {

    return (
        <Routes>

                <Route index element={<IndexPage/>}/>



        </Routes>

    )
}

export default App
