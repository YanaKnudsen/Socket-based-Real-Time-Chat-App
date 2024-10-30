
import './chat.scss'
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import AxiosInstance from "../../axios/AxiosInstance.tsx";
import store from "../../mobx/AppDataStore.ts";
import {RoomInfo} from "../../@types/RoomInfo.ts";
import {socket} from "../../socket/socket.ts";


function ChatPage() {
    const [message,setMessage]=useState<string>("");
    const [messages,setMessages]=useState<string[]>([]);
    const [chatId,setChatId]=useState('');
    const [isRoomJoined,setIsRoomJoined]=useState(false);
    const [rooms,setRooms]=useState<Array<RoomInfo>>([]);


    useEffect(() => {
        showRooms();
    }, []);
    useEffect(() => {
        console.log(messages);
    }, [messages]);

    useEffect(() => {
        socket.on("user_connected",(room)=>{
            console.log("here")
            alert(`connected to the room ${room}`);
        })
        socket.on("receive_message",(recMessage:string)=>{
            console.log("recMessage",recMessage)
            setMessages(messages => [...messages, recMessage]);
        })
    }, [socket]);

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
        socket.emit("join_room", {room:room})
         }
    }
    function leaveRoom(room){
        setIsRoomJoined(false);
    }

    function sendMessage(){
        console.log("init message",message)
        setMessages(messages => [...messages, message]);
        socket.emit("send_message",{message:message,roomId:chatId});
        setMessage('');
    }


    return (
        <div className="main">
            <div className="chatCont">
            {
                isRoomJoined?(
                    <>
                        <div className="messagesArea">

                            welcome to chat
                            <div className="btn" onClick={leaveRoom}>
                                leave
                            </div>
                            <div className="chat">
                                {messages.map((mes,idx)=>{
                                    return(
                                        <div key={idx} className="message">
                                            {mes}
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
                                {store.user?.name[0]}
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
