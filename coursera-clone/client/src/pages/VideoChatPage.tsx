import AxiosInstance from "../axios/AxiosInstance.tsx";
import store from "../mobx/AppDataStore.ts";
import {useEffect, useState,useRef} from "react";
import {socket} from "../socket/socket.ts";
import Header from "../components/Header.tsx";
import ThinLine from "../components/ThinLine.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faMicrophone,
    faVideo,
    faMessage,
    faPhone,
    faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { observer } from "mobx-react";
import Chat from "../components/chat/Chat.tsx";
import Participants from "../components/videoMeeting/Participants.tsx";

import {Peer} from "peerjs";


function VideoChatPage() {
    //undefined generates new unique id
    const myPeer = new Peer(undefined,{});
    myPeer.on('call',call=>{
      call.answer(stream);
    })

    const [message,setMessage]=useState('');
    const [room,setRoom]=useState('');

    const [videoRoomId,setVideoRoomId]=useState('');


    const [stream,setStream]=useState();
    const [name,setName]=useState('');

    const myVideo=useRef<HTMLVideoElement|null>(null);
    const userVideo=useRef<HTMLVideoElement|null>(null);
    const connectionRef=useRef();

    //draggable pop up
    const [participantsVisible,setParticipantsVisible]=useState(false);
    const constraintsRef = useRef(null);



    function sendMessage(){
        store.messages.push({
            message: message,
            name:store.user?.name,
        });
        socket.emit("send_message",{message:message,user:store.user?.name});
       //socket.emit("send_message",{message,room})
        setMessage('');
    }

    function joinRoom(){
        console.log(room);
        //if (room!==""){
            socket.emit("join_room", room)
       // }
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



    function joinVideoRoom(room){
        //socket.emit("join_video_room", {room:room,user:store.user?.name});
        myPeer.on('open',id=>{
            socket.emit("join_video_room", {room:10,user:id});
            console.log(id);
        })

    }

    function openAddUserPopUp(){
       console.log('adding new user');
        setParticipantsVisible(true);
    }

    function closeAddUserPopUp(){
        setParticipantsVisible(false);
    }

    function addNewParticipant(ev){
        ev.preventDefault();
        console.log('add participant',newParticipant);
    }

    //will be updated everytime we receive message
    useEffect(() => {

        socket.on("receive_message",(data)=>{
            store.messages.push({
                message: data.message,
                name:data.user,
            });
            //setMessageReceived(data.message);
        })

        socket.on("user_connected",(data)=>{
            console.log('connected');
            console.log('connected',data);

        })
    }, [socket]);



    useEffect(() => {
       AxiosInstance.get('/chat',{ headers: {"Authorization" : `Bearer ${store.accessToken}`} })
           .then(res => {
               console.log(res.data);
               setVideoRoomId(res.data);
               joinVideoRoom(res.data);
               AxiosInstance.get(`/chat/${res.data}`)
                   .then(res=>{
                       //get user Media
                       console.log('setting stream');
                     navigator.mediaDevices.getUserMedia({video:true,audio:true})
                         .then((stream)=>{
                             console.log('setting stream')
                             setStream(stream);
                             console.log(stream);
                             console.log('myVideo.current before assignment');
                             console.log(myVideo.current);
                             myVideo.current.srcObject = stream;
                             //myVideo.current.srcObject=stream; // fix this: remove current and add then works
                             console.log('myVideo.current after assignment');
                             console.log(myVideo.current);
                             //allow to be connected by other users
                             socket.on("user_connected",(userId)=>{
                                 connectToNewUser(userId,stream);

                             })

                         });


                   })
                   .catch(err=>{

                   });
           })
           .catch(err => {
               // Handle errors
               console.error(err);
           });

    }, []);


    return (
        <div className="h-screen max-h-screen flex flex-col justify-between">
            <div>
            <Header/>
            <ThinLine/>
            </div>
            <div className="flex flex-row h-full w-full ">
            <div className="h-full bg-black grid grid-cols-2 md:grid-cols-2 py-12 px-7 gap-2 relative">
                <div className=" flex justify-center items-center pb-1/2">
                     <video playsInline muted ref={myVideo} autoPlay className=" h-full"/>
                </div>

                <div className=" bg-purple-300 flex justify-center items-center pb-1/2">
                     <video playsInline muted ref={userVideo} autoPlay className=" h-full "/>
                </div>
                <div className=" bg-purple-300 flex justify-center items-center pb-1/2">
                    <video playsInline muted ref={userVideo} autoPlay className=" h-full "/>
                </div>

            </div>
            {participantsVisible&&(<Participants/>)}
            </div>

            <div className=" w-full flex flex-row justify-center items-center py-5 gap-2 bg-gray-700">
                <button className="bg-gray-200 border border-gray-300 text-gray-600 rounded-full p-2 w-10 h-10 flex justify-center items-center">
                    <FontAwesomeIcon className="w-6 h-6" icon={faMicrophone} />
                </button>
                <button className="bg-gray-200 border border-gray-300 text-gray-600 rounded-full p-2 w-10 h-10 flex justify-center items-center">
                    <FontAwesomeIcon className="w-6 h-6" icon={faVideo} />
                </button>
                <button onClick={openAddUserPopUp} className="bg-gray-200 border border-gray-300 text-gray-600 rounded-full p-2 w-10 h-10 flex justify-center items-center">
                    <FontAwesomeIcon className="w-6 h-6" icon={faUserPlus} />
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

export default observer(VideoChatPage);