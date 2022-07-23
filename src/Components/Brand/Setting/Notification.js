import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  min-height: calc(100vh - 105px);
  border-radius: 5px;
  border: 1px solid rgb(230, 230, 230);
 
`;

export default function General() {
  return (
    <SidebarStyled>
     <div>
         Notification
     </div>
    </SidebarStyled>
  );
}