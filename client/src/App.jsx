import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from "./components/Home"
import Settings from "./components/Settings"
import Navbar from "./components/Navbar"
import About from "./components/About"
import Login from "./components/Login"
import VideoDetail from "./components/VideoDetail"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { setToken } from "./redux/slice"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import ChannelList from "./components/ChannelList"
import Playlist from "./components/Playlist"
const App=()=>{
  const dispatch=useDispatch()
  useEffect(()=>{
    const token=localStorage.getItem("token")
    if(token){
      dispatch(setToken(token))
    }
},[])
  return (

       <Router>
          <Navbar />
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />}></Route>
            <Route path="/settings" element={<Settings />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/video/:videoId" element={<VideoDetail />} />
            <Route path="/video/:videoId/channel/:channel" element={<ChannelList />} />
            <Route path="/playlist" element={<Playlist />}></Route>
          </Routes>
        </Router>
       
  )
}
export default App