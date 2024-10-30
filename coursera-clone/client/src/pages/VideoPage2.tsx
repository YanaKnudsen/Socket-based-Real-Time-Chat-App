import {faMicrophone,faVideo,faMessage,faPhone} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Header from "../components/Header.tsx";
import ThinLine from "../components/ThinLine.tsx";



function VideoPage() {

    return (
        <div className="h-screen max-h-screen flex flex-col justify-between">
            <div>
                <Header/>
                <ThinLine/>
            </div>
            <div className="h-full bg-black grid grid-cols-1 md:grid-cols-2 py-12 px-7 gap-2">
                <div className="w-full bg-purple-300 flex justify-center items-center pb-1/2">me</div>
                <div className="w-full bg-purple-300 flex justify-center items-center pb-1/2">tutor</div>
            </div>

            <div className=" w-full flex flex-row justify-center items-center py-5 gap-2 bg-gray-700">
                <button className="bg-gray-200 border border-gray-300 text-gray-600 rounded-full p-2 w-10 h-10 flex justify-center items-center">
                    <FontAwesomeIcon className="w-6 h-6" icon={faMicrophone} />
                </button>
                <button className="bg-gray-200 border border-gray-300 text-gray-600 rounded-full p-2 w-10 h-10 flex justify-center items-center">
                    <FontAwesomeIcon className="w-6 h-6" icon={faVideo} />
                </button>
                <button className="bg-gray-200 border border-gray-300 text-gray-600 rounded-full p-2 w-10 h-10 flex justify-center items-center">
                    <FontAwesomeIcon className="w-5 h-5" icon={faMessage} />
                </button>
                <button className="bg-gray-200 border border-gray-300 text-red-600 rounded-full p-2 w-10 h-10 flex justify-center items-center">
                    <FontAwesomeIcon className="w-6 h-6" icon={faPhone} />
                </button>
            </div>



        </div>
    )
}

export default VideoPage;