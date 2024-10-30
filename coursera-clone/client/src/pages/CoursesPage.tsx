import {faPlus, faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classImg from "../assets/class.png";
import {Navigate} from "react-router-dom";
import {useState} from "react";

function CoursesPage() {
    const[redirectToNew,setRedirectToNew]=useState(false);
    function addNewCourse(ev){
        setRedirectToNew(true);
    }
    if(redirectToNew){
        return <Navigate to={"/profile/mycourses/new"}/>
    }
    return (
        <div >
            <div className = "relative flex justify-center items-center">
                    <img className="w-screen h-screen opacity-30 relative" src={classImg} alt=""/>
                <div className="absolute top-2 ">
                    <div className="flex justify-center flex-col items-center gap-7 mt-10">
                        <div className="px-14 text-black text-2xl">There are currently no published courses</div>
                        <button onClick={addNewCourse}>
                        <div className="bg-blue-800 opacity-90 w-32 h-32 rounded-full relative ">
                            <div className="bg-blue-400 w-16 h-16 rounded-full flex items-center justify-center opacity-100 absolute right-1/4 top-1/4">
                                    <FontAwesomeIcon className="w-6 h-6 text-white" icon={faPlus} />
                            </div>
                        </div>
                        </button>
                    </div>
                </div>
            </div>



        </div>

    )
}

export default CoursesPage