import React from 'react'
import { DOMAIN_FE, DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'
import { Navigate, Link, useNavigate } from 'react-router-dom';
import './Header_Guess.css'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Badge from '@mui/material/Badge';

//file
import Notification from './Notification'

//icon
import CloseIcon from '@mui/icons-material/Close';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';

import PersonIcon from '@mui/icons-material/Person';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkIcon from '@mui/icons-material/Work';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FavoriteIcon from '@mui/icons-material/Favorite';

import StoreIcon from '@mui/icons-material/Store';
import StarsIcon from '@mui/icons-material/Stars';
import ListAltIcon from '@mui/icons-material/ListAlt';

export default function Header_Guess_MB() {

    const [listNotification, setListNotification] = React.useState([]);
    const [countNoti, setCountNoti] = React.useState(0);
    const [profile, setProfile] = React.useState("");


    const navigate = useNavigate();
    let actoken = localStorage.access_token;


    const [openMenu, setOpenMenu] = React.useState(false);
    const [openNotification, setOpenNotification] = React.useState(false);
    const [openMenuUser, setOpenMenuUser] = React.useState(false);
    const [openMenuOpportunity, setOpenMenuOpportunity] = React.useState(false);
    const [openMenuListBrand, setOpenMenuListBrand] = React.useState(false);


    const handleOpenMenu = () => {
        setOpenMenu(true);

        setOpenMenuUser(false);
        setOpenMenuOpportunity(false);
        setOpenMenuListBrand(false);

        setOpenNotification(false);
    }

    const handleCloseMenu = () => {
        setOpenMenu(false);

        setOpenMenuUser(false);
        setOpenMenuOpportunity(false);
        setOpenMenuListBrand(false);

        setOpenNotification(false);
    }

    const handleOpenMenuUser = () => {
        setOpenMenuUser(true);

        setOpenMenuOpportunity(false);
        setOpenMenuListBrand(false);
    }

    const handleCloseMenuUser = () => {
        setOpenMenuUser(false);
    }

    const handleOpenMenuOpportunity = () => {
        setOpenMenuOpportunity(true);

        setOpenMenuUser(false);
        setOpenMenuListBrand(false);
    }

    const handleCloseMenuOpportunity = () => {
        setOpenMenuOpportunity(false);
    }

    const handleOpenMenuListBrand = () => {
        setOpenMenuListBrand(true);

        setOpenMenuUser(false);
        setOpenMenuOpportunity(false);
    }

    const handleCloseMenuListBrand = () => {
        setOpenMenuListBrand(false);
    }

    const handleOpenNotification = () => {
        setOpenNotification(true);

        setOpenMenu(false);
    }

    const handleCloseNotification = () => {
        setOpenNotification(false);

        setOpenMenu(false);
    }


    React.useEffect(() => {
        let url1 = "";
        url1 = DOMAIN_API + 'kols/get-profile';
        fetch(url1, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setProfile(result);
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
        let url2 = "";
        url2 = DOMAIN_API + `notifications/get-all-noti`;
        fetch(url2, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setListNotification(result);
                    let temp = 0;
                    for (let i = 0; i < result.length; i++) {
                        if (result[i].status == 0)
                            temp++;
                    }
                    setCountNoti(temp);
                }
            )

    }, [])




    function goToAccount() {
        navigate('/setting');
    }

    function handleLogout() {
        navigate('/logout');
    }

    function handleClickJob() {
        navigate('/kols-job');
    }

    const ClickOpenMessage = () => {
        // const url = DOMAIN_FE + 'message/0/0/0';
        // window.open(url);
        navigate('/message/0/0/0');
    };

    function handleClickToHomepage() {
        navigate('/');
    }


    function handleClickToSaveOpportunity() {
        navigate('/save-opportunity');
    }

    function handleClickToHaveOportunity() {
        navigate('/have-opportunity');
    }

    function handleClickToListBrand() {
        navigate('/list-brand');
    }

    function handleClickToSaveBrand() {
        navigate('/save-brand');
    }

    return (
        <div style={{ backgroundColor: "#ffffff" }}>
            <div className='headerMb' style={{ marginLeft: "20px", paddingTop: "25px", paddingBottom: "25px" }}>
                <a className='logo' onClick={handleClickToHomepage} >
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
                                onClick={handleOpenMenu}
                                src={profile?.avatar ? profile.avatar : ""}>
                            </Avatar>
                        </a>
                    </div>
                }

                <div className='headerMb-right'
                    style={{ marginTop: "-5px", marginRight: "20px" }}>
                    <a>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}
                            onClick={ClickOpenMessage}>
                            <SmsIcon sx={{ fontSize: 16, color: "#00b14f" }} />
                        </Avatar>
                    </a>
                </div>

                <div className='headerMb-right'
                    style={{ marginTop: "-5px", marginRight: "20px" }}>
                    <a>
                        {/* <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}
                            onClick={handleOpenNotification}>
                            <NotificationsIcon sx={{ fontSize: 18, color: "#00b14f" }} />
                        </Avatar> */}

                        {countNoti > 0 ?
                            <Badge badgeContent={countNoti}
                                sx={{
                                    "& .MuiBadge-badge": {
                                        color: "white",
                                        backgroundColor: "#EE0000"
                                    }, marginBottom: "3px"
                                }} >
                                <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6", }}
                                    onClick={handleOpenNotification}>
                                    <NotificationsIcon sx={{ fontSize: 18, color: "#00b14f" }} />
                                </Avatar>
                            </Badge>
                            :

                            <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}
                                onClick={handleOpenNotification}>
                                <NotificationsIcon sx={{ fontSize: 18, color: "#00b14f" }} />
                            </Avatar>
                        }
                    </a>
                </div>

                {openNotification ?
                    <div >
                        <Notification
                            isOpen={openNotification}
                            isClose={(value) => { handleCloseNotification() }}
                            listNoti={listNotification}
                        />
                    </div>
                    : ""
                }

            </div>

            {
                openMenu ?
                    <div style={{ backgroundColor: "#f3f2f0" }}>

                        <div style={{ paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px", paddingTop: "10px" }}>
                            <Box style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "5px" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2.5}>
                                        <div style={{ paddingLeft: "10px" }}>
                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}
                                                src={profile?.avatar ? profile.avatar : ""}>
                                            </Avatar>
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}  >
                                        <div style={{
                                            paddingTop: "5px", fontWeight: 700,
                                            color: openMenuUser ? "#00b14f" : "black"
                                        }}>
                                            {profile?.full_name ? profile.full_name : "Influencer"}
                                        </div>
                                    </Grid>
                                    {openMenuUser ?
                                        <Grid item xs={1.5}
                                            onClick={handleCloseMenuUser}>
                                            <div style={{ paddingRight: "10px", paddingTop: "5px" }}>
                                                <KeyboardArrowUpIcon />
                                            </div>
                                        </Grid>
                                        :
                                        <Grid item xs={1.5}
                                            onClick={handleOpenMenuUser}>
                                            <div style={{ paddingRight: "10px", paddingTop: "5px" }}>
                                                <KeyboardArrowDownIcon />
                                            </div>
                                        </Grid>
                                    }

                                </Grid>
                                {openMenuUser ?
                                    <div>
                                        <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                            <Divider sx={{ color: "#00B14F" }} />
                                        </div>
                                        <div style={{ paddingBottom: "10px" }}>
                                            <Box style={{ backgroundColor: "#DDDDDD", padding: "10px", borderRadius: "5px" }}>
                                                <Grid container spacing={2}
                                                    onClick={goToAccount}>
                                                    <Grid item xs={2.5}>
                                                        <div style={{ paddingLeft: "10px" }}>
                                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                                <PersonIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                                            </Avatar>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={9.5}  >
                                                        <div style={{ paddingTop: "5px", fontWeight: 700 }}>
                                                            Tài khoản
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>

                                        <div style={{}}>
                                            <Box style={{ backgroundColor: "#DDDDDD", padding: "10px", borderRadius: "5px" }}>
                                                <Grid container spacing={2}
                                                    onClick={handleLogout}>
                                                    <Grid item xs={2.5}>
                                                        <div style={{ paddingLeft: "10px" }}>
                                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                                <LogoutIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                                            </Avatar>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={9.5}  >
                                                        <div style={{ paddingTop: "5px", fontWeight: 700 }}>
                                                            Đăng xuất
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>

                                    </div>
                                    : ""}
                            </Box>
                        </div>

                        <div style={{ paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px" }}>
                            <Box style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "5px" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2.5}>
                                        <div style={{ paddingLeft: "10px" }}>
                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                <BusinessCenterIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                            </Avatar>
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}  >
                                        <div style={{
                                            paddingTop: "5px", fontWeight: 700,
                                            color: openMenuOpportunity ? "#00b14f" : "black"
                                        }}>
                                            Cơ hội
                                        </div>
                                    </Grid>
                                    {openMenuOpportunity ?
                                        <Grid item xs={1.5}
                                            onClick={handleCloseMenuOpportunity}>
                                            <div style={{ paddingRight: "10px", paddingTop: "5px" }}>
                                                <KeyboardArrowUpIcon />
                                            </div>
                                        </Grid>
                                        :
                                        <Grid item xs={1.5}
                                            onClick={handleOpenMenuOpportunity}>
                                            <div style={{ paddingRight: "10px", paddingTop: "5px" }}>
                                                <KeyboardArrowDownIcon />
                                            </div>
                                        </Grid>
                                    }

                                </Grid>
                                {openMenuOpportunity ?
                                    <div>
                                        <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                            <Divider sx={{ color: "#00B14F" }} />
                                        </div>
                                        <div style={{ paddingBottom: "10px" }}>
                                            <Box style={{ backgroundColor: "#DDDDDD", padding: "10px", borderRadius: "5px" }}>
                                                <Grid container spacing={2}
                                                    onClick={handleClickToHomepage}>
                                                    <Grid item xs={2.5}>
                                                        <div style={{ paddingLeft: "10px" }}>
                                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                                <TravelExploreIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                                            </Avatar>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={9.5}  >
                                                        <div style={{ paddingTop: "5px", fontWeight: 700 }}>
                                                            Tìm cơ hội mới
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>

                                        <div style={{ paddingBottom: "10px" }}>
                                            <Box style={{ backgroundColor: "#DDDDDD", padding: "10px", borderRadius: "5px" }}>
                                                <Grid container spacing={2}
                                                    onClick={handleClickToSaveOpportunity}>
                                                    <Grid item xs={2.5}>
                                                        <div style={{ paddingLeft: "10px" }}>
                                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                                <FavoriteIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                                            </Avatar>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={9.5}  >
                                                        <div style={{ paddingTop: "5px", fontWeight: 700 }}>
                                                            Cơ hội đã lưu
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>

                                        <div style={{}}>
                                            <Box style={{ backgroundColor: "#DDDDDD", padding: "10px", borderRadius: "5px" }}>
                                                <Grid container spacing={2}
                                                    onClick={handleClickToHaveOportunity}>
                                                    <Grid item xs={2.5}>
                                                        <div style={{ paddingLeft: "10px" }}>
                                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                                <WorkIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                                            </Avatar>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={9.5}  >
                                                        <div style={{ paddingTop: "5px", fontWeight: 700 }}>
                                                            Cơ hội đã ứng tuyển
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>

                                    </div>
                                    : ""}
                            </Box>
                        </div>

                        <div style={{ paddingLeft: "10px", paddingRight: "10px", paddingBottom: "10px" }}>
                            <Box style={{ backgroundColor: "#ffffff", padding: "10px", borderRadius: "5px" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={2.5}>
                                        <div style={{ paddingLeft: "10px" }}>
                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                <StoreIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                            </Avatar>
                                        </div>
                                    </Grid>
                                    <Grid item xs={8}  >
                                        <div style={{
                                            paddingTop: "5px", fontWeight: 700,
                                            color: openMenuListBrand ? "#00b14f" : "black"
                                        }}>
                                            Nhãn hàng
                                        </div>
                                    </Grid>
                                    {openMenuListBrand ?
                                        <Grid item xs={1.5}
                                            onClick={handleCloseMenuListBrand}>
                                            <div style={{ paddingRight: "10px", paddingTop: "5px" }}>
                                                <KeyboardArrowUpIcon />
                                            </div>
                                        </Grid>
                                        :
                                        <Grid item xs={1.5}
                                            onClick={handleOpenMenuListBrand}>
                                            <div style={{ paddingRight: "10px", paddingTop: "5px" }}>
                                                <KeyboardArrowDownIcon />
                                            </div>
                                        </Grid>
                                    }

                                </Grid>
                                {openMenuListBrand ?
                                    <div>
                                        <div style={{ paddingBottom: "10px", paddingTop: "10px" }}>
                                            <Divider sx={{ color: "#00B14F" }} />
                                        </div>
                                        <div style={{ paddingBottom: "10px" }}>
                                            <Box style={{ backgroundColor: "#DDDDDD", padding: "10px", borderRadius: "5px" }}>
                                                <Grid container spacing={2}
                                                    onClick={handleClickToListBrand}>
                                                    <Grid item xs={2.5}>
                                                        <div style={{ paddingLeft: "10px" }}>
                                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                                <ListAltIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                                            </Avatar>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={9.5}  >
                                                        <div style={{ paddingTop: "5px", fontWeight: 700 }}>
                                                            Danh sách nhãn hàng
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>

                                        <div style={{}}>
                                            <Box style={{ backgroundColor: "#DDDDDD", padding: "10px", borderRadius: "5px" }}>
                                                <Grid container spacing={2}
                                                    onClick={handleClickToSaveBrand}>
                                                    <Grid item xs={2.5}>
                                                        <div style={{ paddingLeft: "10px" }}>
                                                            <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                                                <StarsIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                                                            </Avatar>
                                                        </div>
                                                    </Grid>
                                                    <Grid item xs={9.5}  >
                                                        <div style={{ paddingTop: "5px", fontWeight: 700 }}>
                                                            Nhãn hàng đã lưu
                                                        </div>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        </div>

                                    </div>
                                    : ""}
                            </Box>
                        </div>

                    </div>
                    : ""
            }
        </div>
    )
}
