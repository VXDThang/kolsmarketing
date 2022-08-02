import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import "./Header.css"

import TravelExploreIcon from '@mui/icons-material/TravelExplore';

//file
import To_Login_Modal from "../../Modals/ToLogin";

export default function PrimarySearchAppBar() {
  const [toLoginModal, setToLoginModal] = React.useState(false);
  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
      },
    },
  });

  const handleOpenToLoginModal = () => setToLoginModal(true);
  const handleCloseToLoginModal = () => setToLoginModal(false);

  function handleClickLogin() {
    navigate('/kols-login');
  }
  function handleClickRegister() {
    navigate('/kols-register');
  }
  function handleClickToChooseRoleBrand() {
    navigate('/brand-login');
  }




  return (
    <div sx={{ flexGrow: 1 }}  >
      <AppBar position="static" theme={theme}>
        <Toolbar>
          <Typography
            variant="h4"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', color: "#1b5e20" }}
          >
            KOLs<span style={{color:"#B0097F"}}>Marketing</span>
          </Typography>        

          <div className="dropdown_kol" style={{ paddingLeft: "30px" }}>
          <button className="button button_cat1">Cơ hội</button>
            <div className="dropdown-content_kol"  >
              <a href="/">  <TravelExploreIcon  sx={{ fontSize: 35, paddingBottom: 1 , color: "#00B14F", paddingRight:"15px"}} /> Tìm cơ hội mới</a>
            </div>
          </div>       

          <Box sx={{ flexGrow: 1 }} >

          </Box>
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <Button style={{ textTransform: 'capitalize', backgroundColor: "#00B14F" }} variant="contained" onClick={handleClickLogin}>
              Đăng nhập </Button>
            <Button style={{ marginLeft: "10px", textTransform: 'capitalize', color: "#00B14F",}} variant="outlined"
              onClick={handleClickRegister}>Đăng ký</Button>
            <Button style={{ marginLeft: "10px", textTransform: 'capitalize', backgroundColor: "#00B14F" }} variant="contained" color="success"
              onClick={handleClickToChooseRoleBrand}>Đăng tin & Tìm KOLs</Button>
          </Box>
        </Toolbar>
      </AppBar>

      <To_Login_Modal
          isOpen={toLoginModal}
          isClose={(value) => handleCloseToLoginModal(value)}
        />
    </div>
  );
}
