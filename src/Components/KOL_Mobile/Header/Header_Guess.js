import React from 'react'
import './Header_Guess.css'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { Navigate, Link, useNavigate } from 'react-router-dom';
//icon
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import LoginIcon from '@mui/icons-material/Login';
import WorkIcon from '@mui/icons-material/Work';

export default function Header_Guess_MB() {
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = React.useState(false);


    const handleOpenMenu = () => {
        setOpenMenu(true);
    }

    const handleCloseMenu = () => {
        setOpenMenu(false);
    }

    function handleClickLogin() {
        navigate('/kols-login');
    }
    function handleClickRegister() {
        navigate('/kols-register');
    }
    function handleClickToChooseRoleBrand() {
        navigate('/brand-login');
    }

    function goToAccount() {
        navigate('/setting');
    }

    function handleLogout() {
        navigate('/logout');
    }

    function handleClickJob() {
        navigate('/kols-job');
    }

    function handleClickHomepage() {
        navigate('/');
    }

    return (
        <div style={{ backgroundColor: "#ffffff" }}>
            <div className='headerMb' style={{ marginLeft: "20px", paddingTop: "25px", paddingBottom: "25px" }}>
                <a className='logo' onClick={handleClickHomepage} >
                    KOLs<span style={{ color: "#00b14f" }}>Marketing</span>
                </a>
                {openMenu ?

                    <div className='headerMb-right'
                        style={{ marginTop: "-5px", marginRight: "20px" }}>
                        <a>
                            <Avatar sx={{ width: 28, height: 28, bgcolor: "#CFCFCF" }}
                                onClick={handleCloseMenu}>
                                <CloseIcon sx={{ fontSize: 18 }} />
                            </Avatar>
                        </a>
                    </div>
                    :
                    <div className='headerMb-right'
                        style={{ marginTop: "-5px", marginRight: "20px" }}>
                        <a>
                            <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}
                                onClick={handleOpenMenu}>
                                <MenuIcon sx={{ fontSize: 18, color: "#00b14f" }} />
                            </Avatar>
                        </a>
                    </div>
                }

            </div>

            {
                openMenu ?
                    <div style={{backgroundColor: "#f3f2f0"}}>
                        <div style={{ padding:"10px 0px 10px 10px" }}>
                            Đối với Kols/Influencers
                        </div>
                        <div style={{paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px" }}>
                            <Box style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "5px" }}>
                                <Grid container spacing={2}
                                onClick={handleClickRegister}>
                                    <Grid item xs={2.5}>
                                        <div style={{ paddingLeft: "10px" }}>
                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                <AccountCircleIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                            </Avatar>
                                        </div>
                                    </Grid>
                                    <Grid item xs={9.5}  >
                                        <div style={{ paddingTop: "5px", fontWeight: 700 }}>
                                            Đăng ký tài khoản mới
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>

                        <div style={{ paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px" }}>
                            <Box style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "5px" }}>
                                <Grid container spacing={2}
                                onClick={handleClickLogin}>
                                    <Grid item xs={2.5}>
                                        <div style={{ paddingLeft: "10px" }}>
                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                <LoginIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                            </Avatar>
                                        </div>
                                    </Grid>
                                    <Grid item xs={9.5}  >
                                        <div style={{ paddingTop: "5px", fontWeight: 700 }}>
                                            Đăng nhập
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>

                        <div style={{  paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px" }}>
                            <Box style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "5px" }}>
                                <Grid container spacing={2}
                                onClick={handleClickHomepage}>
                                    <Grid item xs={2.5}>
                                        <div style={{ paddingLeft: "10px" }}>
                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                <TravelExploreIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                            </Avatar>
                                        </div>
                                    </Grid>
                                    <Grid item xs={9.5}  >
                                        <div style={{ paddingTop: "5px", fontWeight: 700 }}>
                                            Cơ hội
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>

                        <div style={{ padding:"10px 0px 10px 10px" }}>
                            Đối với Nhãn hàng
                        </div>
                        <div style={{paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px" }}>
                            <Box style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "5px" }}>
                                <Grid container spacing={2}
                                onClick={handleClickToChooseRoleBrand}>
                                    <Grid item xs={2.5}>
                                        <div style={{ paddingLeft: "10px" }}>
                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                <WorkIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                            </Avatar>
                                        </div>
                                    </Grid>
                                    <Grid item xs={9.5}  >
                                        <div style={{ paddingTop: "5px", fontWeight: 700 }}>
                                            Đăng tin & Tìm Kols
                                        </div>
                                    </Grid>
                                </Grid>
                            </Box>
                        </div>
                    </div>
                    : ""
            }
        </div>
    )
}
