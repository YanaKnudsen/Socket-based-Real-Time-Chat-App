import Header from "../components/Header.tsx";
import ThinLine from "../components/ThinLine.tsx";
import ProfileNav from "../components/ProfileNav.tsx";
import {faBrain,faServer,faPenToSquare, faCode,faMobileScreenButton,faCloud,faChevronDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


function NewCourse() {

    return (
        <div>
            <Header/>
            <ProfileNav/>
            <ThinLine/>
            <div className="flex flex-col px-10 py-5">
                Course here
                <form className="mt-7">

                    <h2 className="text-xl">Title</h2>
                    <p className="text-gray-400 text-sm mb-1 mt-1">Add title here.</p>
                    <input className="border p-4 rounded-2xl gap-2 items-center flex w-full mb-5" type="text" placeholder="title"/>

                    <h2 className="text-xl">Description</h2>
                    <p className="text-gray-400 text-sm mb-1 mt-1">Add decr.</p>
                    <input className="border p-4 rounded-2xl gap-2 items-center flex w-full mb-5" type="text" placeholder="title"/>

                    <h2 className="text-xl">Languages</h2>
                    <p className="text-gray-400 text-sm mb-1 mt-1">Add title here.</p>
                    <div className=" flex items-center justify-start">
                        <div className="border p-4 flex items-center gap-2 rounded-2xl text-gray-400">
                            Select Languages
                            <FontAwesomeIcon className="w-4 h-4" icon={faChevronDown} />
                        </div>
                    </div>


                    <h2 className="text-xl">Level</h2>
                    <p className="text-gray-400 text-sm mb-1 mt-1">Please select the level of difficulty.</p>
                    <div className="grid gap-2 grid-cols-3 mb-5">
                        <label className="flex gap-2 border p-4 rounded-2xl items-center cursor-pointer">
                            <input type="radio" name="level" value="beginner" />
                            Beginner
                        </label>
                        <label className="flex gap-2 border p-4 rounded-2xl items-center cursor-pointer">
                            <input type="radio" name="level" value="intermediate" />
                            Intermediate
                        </label>
                        <label className="flex gap-2 border p-4 rounded-2xl items-center cursor-pointer">
                            <input type="radio" name="level" value="advanced" />
                            Advanced
                        </label>
                    </div>

                    <h2 className="text-xl">Skills</h2>
                    <p className="text-gray-400 text-sm mb-1 mt-1">Please select relevant skills.</p>
                    <div className="grid w-full grid-cols1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-5">
                    <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                        <input type="checkbox" name="radio"/>
                        <FontAwesomeIcon className="w-4 h-4" icon={faBrain} />
                        <span>Machine Learning</span>
                    </label>

                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox" name="ml"/>
                            <FontAwesomeIcon className="w-4 h-4" icon={faCode} />
                            <span>Frontend Development</span>
                        </label>

                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox" name="backend"/>
                            <FontAwesomeIcon className="w-4 h-4" icon={faServer} />
                            <span>Backend Development</span>
                        </label>

                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox" name="backend"/>
                            <FontAwesomeIcon className="w-4 h-4" icon={faMobileScreenButton} />
                            <span>Mobile Development</span>
                        </label>

                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox" name="backend"/>
                            <FontAwesomeIcon className="w-4 h-4" icon={faPenToSquare} />
                            <span>UI/UX Design</span>
                        </label>
                        <label className="border p-4 flex rounded-2xl gap-2 items-center cursor-pointer">
                            <input type="checkbox" name="backend"/>
                            <FontAwesomeIcon className="w-4 h-4" icon={faCloud} />
                            <span>Cloud Computing</span>
                        </label>
                    </div>

                    <h2 className="text-xl">Cover Photo</h2>
                    <p className="text-gray-400 text-sm mb-1 mt-1">Add title here.</p>
                    <input className="border border-gray-500 rounded-md mb-5" type="text" placeholder="title"/>

                    <h2 className="text-xl">Languages</h2>
                    <p className="text-gray-400 text-sm mb-1 mt-1">Add title here.</p>
                    <input className="border border-gray-500 rounded-md mb-5" type="text" placeholder="title"/>

                    <h2 className="text-xl">Additional Info</h2>
                    <p className="text-gray-400 text-sm mb-1 mt-1">Add title here.</p>
                    <input className="border border-gray-500 rounded-md mb-5" type="text" placeholder="title"/>

                    <h2 className="text-xl">Start Date</h2>
                    <p className="text-gray-400 text-sm mb-1 mt-1">Add title here.</p>
                    <input className="border border-gray-500 rounded-md mb-5" type="text" placeholder="title"/>

                    <h2 className="text-xl">certificate avaliable</h2>
                    <p className="text-gray-400 text-sm mb-1 mt-1">Add title here.</p>
                    <input className="border border-gray-500 rounded-md mb-5" type="text" placeholder="title"/>

                </form>
            </div>

        </div>

    )
}

export default NewCourse