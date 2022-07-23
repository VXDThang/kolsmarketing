import React from 'react';
import UserInfo from './UserInfo';
import RoomList from './RoomList';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  height: 100vh;
 
`;

export default function Sidebar(props) {
  const ChoiceFromRoomList = (valueIdRoom, valueIdUser, valueRole, otherName, otherAvatar) => {
    props.ChoiceDownToSidebar(valueIdRoom, valueIdUser, valueRole, otherName, otherAvatar)
  }
  return (
    <SidebarStyled>
      <Grid>
        <Grid item xs={12}>
          <UserInfo name={props.name} avatar={props.avatar} />
        </Grid>
        <Grid item xs={12}>
          <RoomList ChoiceDownToRoomList={ChoiceFromRoomList} socket={props.socket} />
        </Grid>
      </Grid>
    </SidebarStyled>
  );
}