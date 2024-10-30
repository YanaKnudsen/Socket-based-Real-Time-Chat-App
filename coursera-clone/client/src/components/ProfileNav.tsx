import {Link, useParams,} from "react-router-dom";
import {useEffect} from "react";
import store from "../mobx/AppDataStore.ts";

function ProfileNav() {

    //fix it!!

    let subpage=useParams();
    if(subpage.subpage===undefined){
        subpage.subpage='home';
    }
    store.setCurrentLink(subpage.subpage);

    function LinkClasses(type){
        //why is not working if I add to classes?
        let classes=''
        if(type===store.currentLink ){
            classes = classes + 'hover:text-blue-800 duration-100 text-blue-800 px-3'
        }
        else{
            classes = classes + 'hover:text-blue-500 duration-100 px-3'
        }
        return classes;
    }
    function Underline(type){
        //why is not working if I add to classes?
        let classes=''
        if(type===store.currentLink ){
            classes = classes + 'flex h-2 w-full bg-blue-800'
        }
        else{
            classes = classes + 'hidden'
        }
        return classes;
    }
    return (
        <div className="flex px-14 py-5 gap-10">
            <div className="flex flex-col gap-2 ">
                <Link className={LinkClasses('home')} to={"/profile/"}>Home</Link>
                <div className={Underline('home')}/>
            </div>
            <div className="flex flex-col gap-2">
                <Link className={LinkClasses('learning')} to={"/profile/learning"}>My Learning</Link>
                <div className={Underline('learning')}/>
            </div>
            <div className="flex flex-col gap-2">
                <Link className={LinkClasses('mycourses')} to={"/profile/mycourses"}>My Courses</Link>
                <div className={Underline('mycourses')}/>
            </div>
        </div>

    )
}

export default ProfileNav;