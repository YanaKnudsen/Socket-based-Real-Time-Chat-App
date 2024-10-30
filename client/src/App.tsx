import './App.css'
import {Routes,Route} from "react-router-dom";
import IndexPage from "./pages/IndexPage.tsx";
import ChatPage from "./pages/chat/ChatPage.tsx";





function App() {

    return (
        <Routes>
                <Route index element={<IndexPage/>}/>
                <Route path="/chat" element={<ChatPage/>}/>
        </Routes>

    )
}

export default App
