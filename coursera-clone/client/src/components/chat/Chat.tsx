import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowUp, faXmark} from "@fortawesome/free-solid-svg-icons";
import store from "../../mobx/AppDataStore.ts";
import { observer } from "mobx-react";

function Chat() {

    return (
        <div className="absolute h-full w-1/3 bg-white right-0 flex flex-col justify-between py-2">
            <div className="flex flex-col justify-center  ">
                <div className="flex items-center justify-center mb-2 relative">
                    <h2>Chat</h2>
                    <button className="absolute flex items-center justify-center right-0 mr-2">
                        <FontAwesomeIcon className="w-3 h-3" icon={faXmark} />
                    </button>
                </div>
                <div className="flex flex-col gap-2 px-2  w-full">
                    { store.messages.length>0 && store.messages.map((item,idx) => (
                        <div className="">
                            {item.name === store.user?.name&&(
                                <div className="w-full flex items-center justify-start">
                                    <div className="border border-blue-300 bg-blue-200 rounded-md flex flex-col justify-center items-start px-2 py-1 w-1/2 " key={idx}>

                                        <div className="text-sm text-gray-500">Me to</div>
                                        <div>{item.message}</div>


                                    </div>
                                </div>
                            )}
                            {item.name !== store.user?.name&&(
                                <div className=" w-full flex items-center justify-end">
                                    <div className="border border-blue-300 bg-blue-200 rounded-md flex flex-col justify-center items-start px-2 py-1 w-1/2" key={idx}>

                                        <div className="text-sm text-gray-500">{item.name}</div>
                                        <div>{item.message}</div>


                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex w-full flex-col justify-center items-center px-4 gap-2">
                <div className="w-full flex ">
                    send message to
                </div>
                <div className="flex w-full flex-row justify-center items-center px-4 gap-2">
                    <input className="border border-gray-500 px-1 w-3/4 rounded-md" placeholder="Message..." value={message} onChange={ev=>setMessage(ev.target.value)}/>
                    <button className="border bg-blue-800 border-blue-800 rounded-full text-white p-1 flex items-center justify-center" onClick={sendMessage}>
                        <FontAwesomeIcon className="w-5 h-5" icon={faArrowUp} />
                    </button>
                </div>
            </div>
        </div>


    )
}

export default observer(Chat);