
import './chat.scss'
import {useEffect, useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import AxiosInstance from "../../axios/AxiosInstance.tsx";
import store from "../../mobx/AppDataStore.ts";
import {RoomInfo} from "../../@types/RoomInfo.ts";


function ChatPage() {
    const [message,setMessage]=useState<string>("");
    const [messages,setMessages]=useState<string>("");
    const [chatId,setChatId]=useState('');
    const [isRoomJoined,setIsRoomJoined]=useState(false);
    const [rooms,setRooms]=useState<Array<RoomInfo>>([]);

    //create new room
    useEffect(() => {
        showRooms();
    }, []);

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
                console.log("data",res.data);
                setChatId(res.data);
                setRooms(res.data);
                console.log("current rooms",res.data);
            })
            .catch(err=>{

            });
    }

    function sendMessage(){

    }


    return (
        <div className="main">
            <div className="chatCont">
            {
                isRoomJoined?(
                    <>
                        <div className="messagesArea">

                            welcome to chat
                            <div className="chat">
                                <div className="message">
                                    here i am. how are you doing?how are you doing?how are you doing?how are you doing?
                                </div>
                                <div className="message" style={{alignSelf:"flex-end",backgroundColor:"green"}}>
                                    here i am. how are you doing?how are you doing?how are you doing?how are you doing?
                                </div>

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
                            <div className="btn">
                                join
                            </div>
                            <div className="btn delete">
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
