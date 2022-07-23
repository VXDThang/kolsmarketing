import React from 'react';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Avatar from '@mui/material/Avatar';
import './Mess.css'

//icon
import SearchIcon from '@mui/icons-material/Search';
import { DOMAIN_API } from '../../config/const'

import { useNavigate } from 'react-router-dom';

export default function RoomList(props) {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  const [listRoom, setListRoom] = React.useState([]);
  const [values, setValues] = React.useState("");
  const [idPicker, setIdPicker] = React.useState("");
  let actoken = localStorage.access_token;

  //search
  const [loadingSearch, setLoadingSearch] = React.useState(false);
  const [listAllRoom, setListAllRoom] = React.useState([]);

  const choiceRoom = (e, id_room, userId, userRole, otherName, otherAvatar) => {
    setIdPicker(id_room);
    props.ChoiceDownToRoomList(id_room, userId, userRole, otherName, otherAvatar);
    navigate(`/message/${id_room}/${userId}/${userRole}`);
  }

  const handleSearch = () => {
    setLoadingSearch(true);
    if (values != "") {
      let listRoomSearch = [];
      for (let i = 0; i < listAllRoom.length; i++) {
        if (listAllRoom[i].userInfo.name.match(new RegExp(values, "gi")) != null) {
          listRoomSearch.push(listAllRoom[i])
        }
      }

      setLoadingSearch(false);
      setListRoom(listRoomSearch)
    }
    else {
      setLoadingSearch(false);
      setListRoom(listAllRoom)
    }
  }

  const handleSetSearchKey = (event) => {
    if (event.target.value != "") {
      setValues(event.target.value)
    }

    else {
      setValues(event.target.value)
      setListRoom(listAllRoom)
    }

  }

  React.useEffect(() => {
    fetch(DOMAIN_API + `message/get-all-room`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          setListRoom(result);
          setListAllRoom(result);
        }
      )
  }, [])
  props.socket?.on("pleaseResortRoom", (data) => {
    setListRoom(data);
    setListAllRoom(data);
  });
  const handleClick = () => {
    setOpen(!open);
  };


  return (

    <div>

      <div className='d-flex justify-content-center' style={{ paddingTop: "15px", marginLeft: "10px", marginRight: "10px" }}>
        <FormControl sx={{ width: '100%', backgroundColor: "white", borderRadius: "25px", fontFamily: "Segoe UI" }} variant="outlined">
          <InputLabel

            htmlFor="outlined-search"><span style={{ fontFamily: "Segoe UI" }}>Tìm kiếm</span></InputLabel>
          <OutlinedInput
            sx={{ borderRadius: "25px", fontFamily: "Segoe UI" }}
            height="50px"
            onChange={(event) => handleSetSearchKey(event)}
            endAdornment={
              <InputAdornment position="end" >

                <Button sx={{
                  backgroundColor: "#00B14F", textTransform: "none",
                  "&:hover": { bgcolor: "#A927B0" }, borderRadius: 20
                }}
                  variant="contained"
                  onClick={handleSearch} >
                  <SearchIcon />
                </Button>

              </InputAdornment>
            }
            label="Password"
          />

        </FormControl>

      </div>



      <List  >
        {/* <ListItemButton onClick={handleClick}>
          <ListItemIcon>
            <FormatListBulletedIcon sx={{ color: "#00B14F",fontSize:"30px" }} />
          </ListItemIcon>
          <ListItemText primaryTypographyProps={{ fontSize: '16px', fontWeight:500, fontFamily: "Segoe UI" }} primary="Danh sách nhắn tin" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton> */}


        <div className="room_list" style={{ overflowY: "auto" }}>
          {/* <Collapse in={open} timeout="auto" unmountOnExit> */}
          <List component="div" disablePadding>
            {listRoom.length > 0 && listRoom.map((list) => (
              <ListItemButton sx={{ borderRadius: "5px", marginLeft: "10px", marginRight: "10px", ...((idPicker == list.id_room) && { bgcolor: '#e4e6eb' }) }}
                key={list.id_room} >
                <ListItemIcon>
                  <Avatar sx={{ fontSize: "40px" }} src={list.userInfo?.avatar ? list.userInfo.avatar : ""}>
                  </Avatar>
                </ListItemIcon>

                {/* primaryTypographyProps={{ fontSize: '16px', fontWeight: 500 }} */}
                {/* primary={list.userInfo?.name ? list.userInfo.name : ""} */}
                <ListItemText
                  onClick={(e) => choiceRoom(e, list.id_room, list.userInfo.id, list.userInfo.role, list.userInfo.name, list.userInfo.avatar)}>

                  <div style={{ fontSize: '14px', fontWeight: 500, fontFamily: "Segoe UI" }}>
                    {list.userInfo?.name ? list.userInfo.name : ""}
                  </div>
                  <div style={{ fontSize: '13px', color: "gray", fontFamily: "Segoe UI" }} className="last_mess">
                    {list.last_message?.content ? list.last_message.content : ""}
                  </div>
                </ListItemText>
              </ListItemButton>
            ))}

          </List>
        </div>

        {/* <div className="d-flex justify-content-end" style={{ paddingRight: "20px", paddingTop: "10px" }}>
          <Button sx={{ textTransform: 'none', backgroundColor: "#00B14F", "&:hover": { bgcolor: "#800080" } }} variant="contained" startIcon={<AddBoxIcon />}>
            Tạo phòng
          </Button>
        </div> */}
      </List>
    </div>

  );
}