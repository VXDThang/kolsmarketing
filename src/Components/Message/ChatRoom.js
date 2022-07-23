import React, { useContext, useEffect, useRef, useState } from 'react';
import Sidebar from './Sidebar';
import ChatWindow from './ChatWindow';
import Extend from './Extend'
import Grid from '@mui/material/Grid';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../config/const'
import { useParams } from "react-router-dom";

import Header from '../KOL/Header_KOL/Header';
import Header_Brand from '../Brand/Header/Header_Brand_ForLogin/Header'

export default function ChatRoom({ socket, setIsLogined, navigate }) {
  let actoken = localStorage.access_token;
  //let CurrentUserRole = localStorage.check_role;


  let { id_room, id_user, user_role } = useParams();

  const [room, setRoom] = React.useState(id_room);
  const [idUser, setIdUser] = React.useState(id_user);
  const [role, setRole] = React.useState(user_role);
  const [idCurrentUser, setIdCurrentUser] = React.useState('');
  const [roleCurrentUser, setRoleCurrentUser] = React.useState('');
  const [name, setName] = useState('');
  const [avatarCurrentUser, setAvatarCurrentUser] = useState('');

  const [otherName, setOtherName] = useState('');
  const [otherAvatar, setOtherAvatar] = useState('');

  async function getProfileOtherIsBrand() {
    let url1 = "";
    url1 = DOMAIN_API + `brands/brand-info`;
    await fetch(url1, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },
      body: JSON.stringify({ id_brand: id_user })
    })
      .then(res => res.json())
      .then(
        (result) => {
          setOtherName(result.brand_name);
          setOtherAvatar(result.avatar)
        }
      )
  }

  async function getProfileOtherIsKOL() {
    let url1 = "";
    url1 = DOMAIN_API + `kols/kol-info`;
    await fetch(url1, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },
      body: JSON.stringify({ id_kol: id_user })
    })
      .then(res => res.json())
      .then(
        (result) => {
          setOtherName(result.full_name);
          setOtherAvatar(result.avatar)
        }
      )
  }

  React.useEffect(() => {
    let url = "";
    //lấy thông tin user
    if (localStorage.check_role == "1") {
      url = DOMAIN_API + `kols/get-profile`;
    }
    else {
      url = DOMAIN_API + `brands/get-profile`;
    }

    fetch(url, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIdCurrentUser(result.id)
          setRoleCurrentUser(result.role)
          setName(result.brand_name ? result.brand_name : result.full_name)
          setAvatarCurrentUser(result.avatar)
        }
      )

    if (user_role == "2") {
      getProfileOtherIsBrand();
    }
    if (user_role == "1") {
      getProfileOtherIsKOL();
    }


  }, [])

  // Của người được chat 
  const ChoiceUser = (valueIdRoom, valueIdUser, valueRole, otherName, otherAvatar) => {
    setRoom(valueIdRoom);
    setIdUser(valueIdUser);
    setRole(valueRole);
    setOtherName(otherName);
    setOtherAvatar(otherAvatar);
  }

  if (localStorage.access_token == null) {
    localStorage.setItem("beforeLink", window.location.pathname);
    return (
      <div sx={{ flexGrow: 1 }}  >
        <Header />
        <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "10px" }}>
          Bạn cần đăng nhập để tiếp tục ...
        </div>


      </div>
    )
  }
  else {

    return (
      <div>

        {idUser != 0 &&
          <div>
            <Grid container >
              <Grid item xs={3.3}>
                <Sidebar ChoiceDownToSidebar={ChoiceUser} socket={socket} name={name} avatar={avatarCurrentUser} />
              </Grid>
              <Grid item xs={5.7}>
                <ChatWindow socket={socket} IdRoom={room} IdOther={idUser} RoleOther={role} IdCurrentUser={idCurrentUser} RoleCurrentUser={roleCurrentUser} OtherName={otherName} />
              </Grid>
              <Grid item xs={3}>
                <Extend OtherName={otherName} OtherAvatar={otherAvatar} />
              </Grid>
            </Grid>
          </div>
        }
        {idUser == 0 &&
          <div>
            <Grid container >
              <Grid item xs={3}>
                <Sidebar ChoiceDownToSidebar={ChoiceUser} socket={socket} name={name} avatar={avatarCurrentUser} />
              </Grid>
              <Grid item xs={9}>
                <img src="../../../chat.jpg" style={{ objectFit: "contain", width: "100%", height: "100vh" }} />
              </Grid>
            </Grid>

          </div>
        }


      </div>
    );
  }
}