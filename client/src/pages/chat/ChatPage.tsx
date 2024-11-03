
import './chat.scss'
import {useEffect, useRef, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import AxiosInstance from "../../axios/AxiosInstance.tsx";
import store from "../../mobx/AppDataStore.ts";
import {RoomInfo} from "../../@types/RoomInfo.ts";
import {socket} from "../../socket/socket.ts";
import {MessageInfo} from "../../@types/MessageInfo.ts";
import {MediaConnection, Peer} from "peerjs";


function ChatPage() {


    const [message,setMessage]=useState<string>("");
    const [messages,setMessages]=useState<Array<MessageInfo>>([]);
    const [chatId,setChatId]=useState('');
    const [isRoomJoined,setIsRoomJoined]=useState(false);
    const [rooms,setRooms]=useState<Array<RoomInfo>>([]);
    const [stream,setStream]=useState<MediaStream>();
    const [connectedUsers,setConnectedUsers]=useState<string[]>([]);
    const [remoteId,setRemoteId]=useState<string>();
    const [peer,setPeer]=useState<Peer>();
    const [remoteStream,setRemoteStream]=useState<MediaStream>();
    const [call,setCall]=useState<MediaConnection>();
    const [isAnswered,setIsAnswered]=useState<boolean>(false);
    const peerInstance = useRef<Peer>();

    const localVideo=useRef<HTMLVideoElement>();
    const userVideo=useRef<HTMLVideoElement>();

    useEffect(() => {
        showRooms();
        // Set up the local media stream
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                if (localVideo.current) {
                    localVideo.current.srcObject = stream;
                }
            })
            .catch((error) => console.error("Failed to access local media", error));
        //set up peer for the user
        if (store.user?._id){
            const newPeer = new Peer(store.user?._id);

                 newPeer.on('call',call=>{
                     call.answer(stream);
                     call.on('stream', function(remoteStream) {
                         setRemoteStream(remoteStream);
                         console.log("remote stream",remoteStream)
                         userVideo.current.srcObject = remoteStream;
                         socket.emit("call_answered",{roomId:roomId})
                     });
                 })
                                                                                                 


            newPeer.on('open', (id) => {
                console.log("Peer connection open with ID:", id);
            });
                setPeer(newPeer)


        }





    }, []);
    useEffect(() => {
        console.log(messages);
    }, [messages]);

    useEffect(() => {
        socket.on("user_connected",(room)=>{
            console.log("here")
            alert(`connected to the room ${room}`);
        })
        socket.on("receive_message",(recMessage:MessageInfo)=>{
            console.log("recMessage",recMessage);
            setMessages(messages => [...messages, recMessage]);
        })
        socket.on("receive_id",(userId:string)=>{
            setRemoteId(userId);
        })
        socket.on("answer_call",(roomId:string)=>{
            console.log("answeringp peer",peer);
            /* if (peer){
                peer.on('call',call=>{
                    call.answer(stream);
                    call.on('stream', function(remoteStream) {
                        setRemoteStream(remoteStream);
                        console.log("remote stream",remoteStream)
                        userVideo.current.srcObject = remoteStream;
                        socket.emit("call_answered",{roomId:roomId})
                    });
                })
            }    */


        })


    }, [socket,peer]);


    useEffect(() => {
        console.log("remote stream changed")
        if (remoteStream){
          //  userVideo.current.srcObject = remoteStream;
        }

    }, [remoteStream]);



   /*
 if(peer){
      peer.on('call',call=>{
          call.answer(stream);
          call.on('stream', function(remoteStream) {
              setRemoteStream(remoteStream);
              console.log("remote stream",remoteStream)
              userVideo.current.srcObject = remoteStream;
              //socket.emit("call_answered",{roomId:roomId})
          });
      })

 }
        */

 function callPeer () {
        if(peer){

            const newCall=peer.call(remoteId,stream);
                 newCall.on('stream', function(remoteStream2) {
                userVideo.current.srcObject = remoteStream2;                       
                console.log("stream user")                                         
              });                                                                  





            // socket.emit("call",{roomId:chatId});
            // setCall(newCall);
        }

    };



    function showRooms(){
        AxiosInstance.get('/getRooms',{ headers: {"Authorization" : `Bearer ${store.accessToken}`} })
            .then(res => {
                console.log("showrooms",res.data)
                setRooms(res.data);
            })
            .catch(err=>{

            });
    }

    function createRoom(){
        AxiosInstance.get('/createRoom',{ headers: {"Authorization" : `Bearer ${store.accessToken}`} })
            .then(res => {
                setRooms(res.data)
            })
            .catch(err=>{

            });
    }

    function deleteRoom(room:RoomInfo){
        AxiosInstance.post('/deleteRoom',{room},{ headers: {"Authorization" : `Bearer ${store.accessToken}`} })
            .then(res => {
                setRooms(res.data)
            })
            .catch(err=>{

            });
    }

    function joinRoom(room){
        setIsRoomJoined(true);
        setChatId(room.id);
        console.log(room);

        if (room){
            socket.emit("join_room", {room:room,user_id:store.user?._id});
            navigator.mediaDevices.getUserMedia({video:true,audio:true})
                .then((stream)=>{
                    console.log("connecting video")
                    setStream(stream);
                    if (localVideo.current) {
                        localVideo.current.srcObject = stream;
                    }
                })
                .catch((error) => console.error("Failed to access local media", error));

         }
    }




    function leaveRoom(room){
        setIsRoomJoined(false);
    }

    function sendMessage(){
        if (message!==""){
            console.log("init message",message)
            let newMessage:MessageInfo={message:message,sender:store.user?.name};
            setMessages(messages => [...messages, newMessage]);
            socket.emit("send_message",{messageInfo:newMessage,roomId:chatId});
            setMessage('');
        }

    }





    return (
        <div className="main">
            <div className="chatCont">
            {
                isRoomJoined?(
                    <>
                        <div className="messagesArea">

                            room {chatId}
                            <div className="btn delete" onClick={leaveRoom}>
                                leave
                            </div>
                            <div onClick={()=> {
                                  callPeer();
                            }}>call peer</div>
                            <div style={{width:"250px",height:"300px"}}>
                                <video playsInline muted ref={localVideo} autoPlay className=" h-full"/>
                            </div>
                            <div style={{width:"250px",height:"300px",marginTop:"5px"}}>
                                <video playsInline muted ref={userVideo} autoPlay className=" h-full"/>
                            </div>

                            <div className="chat scrollable">
                                {messages.map((mes,idx)=>{
                                    return(
                                        <div key={idx} className="message" style={{background:store.user?.name===mes.sender?"#ACE1AF":"#6CB4EE",alignSelf:store.user?.name===mes.sender?"flex-end":"flex-start"}}>
                                            {mes.message}
                                        </div>
                                    )
                                })}
                            </div>


                        </div>
                        <div className="inputArea">
                            <div className="send">
                                <div className="iconCont" onClick={sendMessage}>
                                    <FontAwesomeIcon icon={faArrowUp} className="icon"/>
                                </div>
                            </div>
                            <textarea className="textinput" placeholder="Message"
                                      value={message}
                                      onChange={e => setMessage(e.target.value)}/>
                        </div>
                    </>
                ):(<div className="connect">
                    <div>
                        <h1>Welcome, {store.user?.name}</h1>
                    </div>
                    Currently available rooms:
                    {rooms.map((room,idx)=>{
                        return(<div key={idx} className="room">
                            <div className="userandroom">
                                <div className="user">
                                {room.owner[0]}
                                </div>
                                {room.id}
                            </div>
                            <div className="btns">
                            <div className="btn" onClick={()=>joinRoom(room)}>
                                join
                            </div>
                            <div className="btn delete" onClick={()=>deleteRoom(room)}>
                                delete
                            </div>
                            </div>
                        </div>)
                    })}


                        <div className="btnField">
                            <div className="btn" onClick={createRoom}>
                                Create new room
                            </div>
                        </div>

                </div>)
            }
                    </div>

        </div>

    )
}

export default ChatPage
