import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Message_receive from './Message_receive';
import Message_send from './Message_send';
import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Avatar from '@mui/material/Avatar';

import { DOMAIN_API } from '../../config/const'

import SendIcon from '@mui/icons-material/Send';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';

const HeaderStyled = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
  padding: 0 16px;
  align-items: center;
  border-bottom: 1px solid rgb(230, 230, 230);
  border-right: 1px solid rgb(230, 230, 230);
  border-left: 1px solid rgb(230, 230, 230);
  .header {
    &__info {
      display: flex;
      flex-direction: column;
      justify-content: center;
    }
    &__title {
      margin: 0;
      font-weight: bold;
    }
    &__description {
      font-size: 12px;
    }
  }
`;

const ButtonGroupStyled = styled.div`
  display: flex;
  align-items: center;
`;

const WrapperStyled = styled.div`
  height: 100vh;
`;

const ContentStyled = styled.div`
  height: calc(100% - 56px);
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(230, 230, 230);
  border-left: 1px solid rgb(230, 230, 230);
  padding: 10px;
  padding-right: 0px;
  justify-content: flex-end;
`;

const FormStyled = styled.div`
  display: flex;
  margin-right:10px;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 15px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;




export default function ChatWindow({ socket, IdRoom, IdOther, RoleOther, IdCurrentUser, RoleCurrentUser, OtherName, OtherAvatar, backToSideBar }) {
  const [inputValue, setInputValue] = useState('');
  const [listMess, setListMess] = useState([]);
  const inputRef = useRef(null);
  const messageListRef = useRef(null);
  const [room, setRoom] = useState(IdRoom);
  const [otherName, setOtherName] = useState(OtherName);
  let actoken = localStorage.access_token;
  const sendMessage = async () => {
    if (inputValue !== "") {
      const messageData = {
        access_token: actoken,
        idroom: IdRoom,
        iduser: IdOther,
        role: RoleOther,
        content: inputValue,
        // time:
        //   new Date(Date.now()).getHours() +
        //   ":" +
        //   new Date(Date.now()).getMinutes(),
        // access_token, iduser, role, content
      };

      await socket.emit("sendChat", messageData);

      const MessageToList = {
        content: inputValue,
        create_time: "",
        id_room: IdRoom,
        id_user: IdCurrentUser,
        role: RoleCurrentUser,
      }
      // Đang sai là vì định dạng của listMess khác mesageData
      setListMess((listMess) => [...listMess, MessageToList]);
      setInputValue("");
    }
  };

  React.useEffect(() => {
    //getProfileBrand();
    fetch(DOMAIN_API + `message/open-room`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },
      // người nhận
      body: JSON.stringify({ iduser: IdOther, role: RoleOther })
    })
      .then(res => res.json())
      .then(
        (result) => {
          fetch(DOMAIN_API + `message/get-all-message-in-room`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "x-access-token": actoken
            },
            body: JSON.stringify({ room_id: IdRoom })
          })
            .then(res => res.json())
            .then(
              (result2) => {
                setListMess(result2);
              }
            )
        }
      )
  }, [IdRoom])

  React.useEffect(() => {

    socket?.on("getNewMessage", (data) => {
      //setListMess((list) => [...list, data]);
      fetch(DOMAIN_API + `message/get-all-message-in-room`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": actoken
        },
        body: JSON.stringify({ room_id: IdRoom })
      })
        .then(res => res.json())
        .then(
          (result2) => {
            setListMess(result2);
          }
        )
    });
  }, [listMess, socket]);


  useEffect(() => {
    // scroll to bottom after message changed
    if (messageListRef?.current) {
      messageListRef.current.scrollTop =
        messageListRef.current.scrollHeight + 50;
    }
  }, [listMess, socket]);

  const handleBackToSideBar = () => {
    backToSideBar(0);
  }



  return (
    <WrapperStyled>

      <HeaderStyled>
        <Grid container >
          <Grid item xs={1}>
            <div style={{ paddingTop: "5px" }}
              onClick={handleBackToSideBar}>
              <ChevronLeftIcon />
            </div>
          </Grid>
          <Grid item xs={1.5}>
            <div style={{paddingTop:"5px"}}>
              <Avatar sx={{ width: 32, height: 32 }} alt="..." src={OtherAvatar} />
            </div>
          </Grid>
          <Grid item xs={9.5}>
            <div className='header__info'>
              <p className='header__title'>{OtherName}</p>
              <span className='header__description'>
                {RoleOther == "1" ? "Influencer" : "Brand"}
              </span>
            </div>
          </Grid>
        </Grid>

        {/* <Button sx={{ textTransform: 'none', backgroundColor: "#00B14F", "&:hover": { bgcolor: "#800080" } }} variant="contained" startIcon={<PersonAddAlt1Icon />}>
          Mời
        </Button> */}
      </HeaderStyled>
      <ContentStyled>
        <MessageListStyled ref={messageListRef} >
          {listMess.length > 0 && listMess.map((mes) => {
            if ((mes.id_user == IdCurrentUser) && (mes.role == RoleCurrentUser)) return (
              <Message_send
                key={mes.id}
                text={mes.content}
                photoURL=""
                createdAt={mes.create_time}
              />)
            else return (
              <Message_receive
                key={mes.id}
                text={mes.content}
                photoURL={mes.userInfo.avatar ? mes.userInfo.avatar : ""}
                createdAt={mes.create_time}
              />
            )
          })}


        </MessageListStyled>
        <FormStyled >
          <InputBase
            sx={{ ml: 1, flex: 1, fontFamily: "Segoe UI", fontSize: "14px" }}
            placeholder="Nhập tin nhắn"
            multiline
            maxRows={4}
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
          <Button type='primary'
            onClick={sendMessage}
          >
            <SendIcon sx={{ color: "#00B14F" }} />
          </Button>
        </FormStyled>
      </ContentStyled>


    </WrapperStyled>
  );
}