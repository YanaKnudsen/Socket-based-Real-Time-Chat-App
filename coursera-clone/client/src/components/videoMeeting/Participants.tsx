import { observer } from "mobx-react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faPlus,
    faXmark,
} from "@fortawesome/free-solid-svg-icons";
import ThinLine from "../ThinLine.tsx";
import store from "../../mobx/AppDataStore.ts";
import {useState} from "react";
import AxiosInstance from "../../axios/AxiosInstance.tsx";



function Participants() {
    const [newParticipant,setNewParticipant]=useState('');
    const [participantList,setParticipantList]=useState([]);
    const [participantName,setParticipantName]=useState('');

//import from other screen
    function closeAddUserPopUp(){
        setParticipantsVisible(false);
    }

    function addNewParticipant(ev){
        ev.preventDefault();
        console.log('add participant',newParticipant);
        AxiosInstance.post('/addNewParticipant',{email:newParticipant},{ headers: {"Authorization" : `Bearer ${store.accessToken}`} })
            .then(res=>{
                console.log('corresponding user name');
                console.log(res.data);
                setParticipantName(res.data);
                participantList.push(res.data);

            })
            .catch(err=>{

            })
    }

    function connectToNewUser(userId,stream){
        //call user with userId and send our stream
        const call=myPeer.call(userId,stream);
        //they send us their stream back and we should accept it
        call.on('stream',(userVideoStream)=>{
            userVideo.current.srcObject=stream;
        });
        call.on('close',()=>{
            //remove video from user which is not connected anymore
            userVideo.current.srcObject=null;
        });
    }




    return (
                    <div className="w-1/2 h-full flex flex-col justify-between py-1 px-2">
                        <div className="flex flex-col">
                            <div className=" flex justify-between items-center mb-1">
                                <div></div>
                                <div className="text-sm text-gray-800">Participants()</div>
                                <FontAwesomeIcon onClick={closeAddUserPopUp} className="w-4 h-4 text-gray-800 cursor-pointer" icon={faXmark} />
                            </div>
                            <ThinLine/>
                            <div className="w-full">
                                <div className="flex flex-row py-2 px-1 items-center gap-2">
                                    <div className="bg-blue-800 text-white p-4 rounded-full w-5 h-5 flex justify-center items-center">{store.user?.name.substring(0, 1)}</div>
                                    <div>{store.user?.name}</div>
                                </div>
                                    { participantList.length>0 && participantList.map((item,idx)=>(
                                            <div key={idx} className="flex flex-row py-2 px-1 items-center gap-2">
                                                <div className="bg-blue-800 text-white p-4 rounded-full w-5 h-5 flex justify-center items-center">{item.substring(0, 1)}</div>
                                                <div>{item}</div>
                                            </div>)
                                    )}
                            </div>

                        </div>
                        <div className="w-full relative">
                            <div className="absolute h-full top-0 right-1 flex items-center">
                                <FontAwesomeIcon onClick={addNewParticipant} className="w-3 h-3 ml-10 border border-blue-800 rounded-full bg-blue-800 p-1 text-white cursor-pointer" icon={faPlus} />
                            </div>
                            <input placeholder="input email to invite..."
                                   value={newParticipant}
                                   onChange={ev=>setNewParticipant(ev.target.value)}
                                   className="w-full border border-gray-400 text-gray-600 py-1 px-2 rounded-xl "
                            />
                        </div>
                    </div>

    )
}

export default observer(Participants);