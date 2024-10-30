import ThinLine from "../components/ThinLine.tsx";
import {useParams,Link} from "react-router-dom";
import store from "../mobx/AppDataStore.ts";
import Header from "../components/Header.tsx";
import CoursesPage from "./CoursesPage.tsx";
import ProfileNav from "../components/ProfileNav.tsx";

function ProfilePage() {
    let subpage=useParams();
    if(subpage.subpage===undefined){
        subpage.subpage='home';
    }
   // console.log(subpage);



    return (
        <div className="">
            <Header/>
            <ProfileNav/>
            <ThinLine/>
            {subpage.subpage==='home'&&(
                <div className="px-14 ">Welcome {store.user?.name}</div>
            )}
            {subpage.subpage==='mycourses'&&(
                <CoursesPage/>
            )}
        </div>

    )
}

export default ProfilePage