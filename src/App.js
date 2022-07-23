import React from 'react'
import RouterURL from './Components/RouterURL/RouterURL';
import { DOMAIN_API, DOMAIN_SOCKET } from './config/const';
import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
  const [isLogined, setIsLogined] = useState(localStorage.getItem('access_token')!='undefined');
  //const [socket, setSocket] = useState(null);
  const [socket, setSocket] = useState(null);
  const logout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("check_role");
    localStorage.removeItem("check_admin");
    window.location.reload();
  }
  let navigate = useNavigate();
    useEffect(() => {
      setSocket(io(DOMAIN_API + "", {
        auth: {
            token: localStorage.getItem("access_token"),
        },
        transports: ["websocket"],
    }));
    }, []);
  
    useEffect(() => {
      socket?.emit("newUser", localStorage.getItem('access_token'));
    }, [socket]);
    useEffect(() => {
      socket?.on("expireddate", logout );
    }, [socket]);
    return (
        <div>
          <RouterURL socket={socket} setIsLogined={setIsLogined} navigate={navigate}/>
        </div>
    )
}
