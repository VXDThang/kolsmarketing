
import React from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createTheme } from '@material-ui/core/styles';

//icon
import SettingsIcon from '@mui/icons-material/Settings';
import SecurityIcon from '@mui/icons-material/Security';
import InfoIcon from '@mui/icons-material/Info';
import PhotoIcon from '@mui/icons-material/Photo';

const muiTheme = createTheme({
  overrides: {
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#f44336",
          "&:hover": {
            backgroundColor: "orange",
          },
        },
      },
      button: {
        "&:hover": {
          backgroundColor: "yellow",
        },
      },
    },
  },
});

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  height: calc(100vh - 65px);
  border-right: 1px solid rgb(230, 230, 230);
  width:400px;
  margin-bottom: -40px;
  margin-top: -20px;
  margin-left: -20px;
  position: fixed;
 
`;

export default function SettingList(props) {
  const [menu, setMenu] = React.useState(0);
  const Click = (event, index) => {
    props.ClickOption(index);
    setMenu(index);
  }

  return (
    <SidebarStyled>
      <div style={{ padding: "10px", overflowY: "auto" }}>
        <div style={{ fontSize: "16px", fontWeight: "600", paddingBottom: "10px" }}>
          Cài đặt
        </div>
        <div>
          <Divider />
        </div>
        <List>
          <ListItemButton

            selected={menu === 0}
            onClick={(event) => Click(event, 0)}>
            <ListItemIcon>
              <SettingsIcon sx={{ color: "#00B14F", width: 20, height: 20 }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Tài khoản" />
          </ListItemButton>

          <ListItemButton
            selected={menu === 1}
            onClick={(event) => Click(event, 1)}>
            <ListItemIcon>
              <InfoIcon sx={{ color: "#00B14F", width: 20, height: 20 }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Thông tin nhãn hàng" />
          </ListItemButton>

          <ListItemButton
            selected={menu === 2}
            onClick={(event) => Click(event, 2)}>
            <ListItemIcon>
              <SecurityIcon sx={{ color: "#00B14F", width: 20, height: 20 }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Bảo mật & Đăng nhập" />
          </ListItemButton>

          <ListItemButton
            selected={menu === 4}
            onClick={(event) => Click(event, 4)}>
            <ListItemIcon>
              <PhotoIcon sx={{ color: "#00B14F", width: 20, height: 20 }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Hình ảnh" />
          </ListItemButton>

          <div style={{paddingTop:"10px", paddingBottom:"10px"}}>
            <Divider />
          </div>


          {/* <ListItemButton
            selected={menu === 3}
            onClick={(event) => Click(event, 3)}>
            <ListItemIcon>
              <NotificationsActiveIcon sx={{ color: "#00B14F", width: 20, height: 20 }} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary="Thông báo" />
          </ListItemButton> */}

        </List>
      </div>
    </SidebarStyled>
  );
}