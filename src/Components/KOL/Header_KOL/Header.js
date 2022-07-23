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
            KOLsMarketing
          </Typography>
          {/* <Typography
            noWrap
            component="div"
            sx={{ fontWeight: 'bold', marginLeft: "30px", color: "#212121" }}>
            Cơ hội
          </Typography>
          <Typography
            noWrap
            component="div"
            sx={{ fontWeight: 'bold', marginLeft: "30px", color: "#212121" }}>
            Nhãn hàng
          </Typography> */}

          {/* <div className="dropdown" style={{ paddingLeft: "30px" }}>
            <div className="category">
              Dropdown
            </div>
            <div className="dropdown-content">
              <a href="#">Link 1</a>
              <a href="#">Link 2</a>
              <a href="#">Link 3</a>
            </div>
          </div> */}


          <div className="dropdown_kol" style={{ paddingLeft: "30px" }}>
          <button className="button button_cat1">Cơ hội</button>
            <div className="dropdown-content_kol"  >
              <a href="/">  <TravelExploreIcon  sx={{ fontSize: 35, paddingBottom: 1 , color: "#00B14F", paddingRight:"15px"}} /> Tìm cơ hội mới</a>
              {/* <a onClick={handleOpenToLoginModal} style={{cursor:"pointer"}}>  <FavoriteIcon  sx={{ fontSize: 35, paddingBottom: 1 , color: "#00B14F" , paddingRight:"15px"}} /> Cơ hội đã lưu</a>
              <a onClick={handleOpenToLoginModal}  style={{cursor:"pointer"}}>   <WorkIcon  sx={{ fontSize: 35, paddingBottom: 1 , color: "#00B14F" , paddingRight:"15px"}} /> Cơ hội đã ứng tuyển</a> */}
            </div>
          </div>

          {/* <div className="dropdown_kol" style={{ paddingLeft: "30px" }}>
          <button className="button button_cat1">Nhãn hàng</button>
            <div className="dropdown-content_kol" >
              <a onClick={handleOpenToLoginModal}  style={{cursor:"pointer"}}>  <ListAltIcon  sx={{ fontSize: 35, paddingBottom: 1 , color: "#00B14F", paddingRight:"15px"}}/> Danh sách nhãn hàng</a>
              <a onClick={handleOpenToLoginModal} style={{cursor:"pointer"}}>  <StarsIcon  sx={{ fontSize: 35, paddingBottom: 1 , color: "#00B14F" , paddingRight:"15px"}} />Top nhãn hàng</a>
             
            </div>
          </div> */}


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
