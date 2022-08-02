import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import ListItemIcon from '@mui/material/ListItemIcon';
import { DOMAIN_FE, DOMAIN_API } from '../../../config/const'

//file
import "./Header.css"
import Notification from './Notification'

//icon
import FavoriteIcon from '@mui/icons-material/Favorite';
import WorkIcon from '@mui/icons-material/Work';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import StarsIcon from '@mui/icons-material/Stars';
import ListAltIcon from '@mui/icons-material/ListAlt';
import Logout from '@mui/icons-material/Logout';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SmsIcon from '@mui/icons-material/Sms';
import PersonIcon from '@mui/icons-material/Person';

export default function Header_Access() {
    const [menuAvatar, setMenuAvatar] = React.useState(false)

    const [listNotification, setListNotification] = React.useState([]);
    const [countNoti, setCountNoti] = React.useState(0);
    const [profile, setProfile] = React.useState("");


    const navigate = useNavigate();
    let actoken = localStorage.access_token;
    const theme = createTheme({
        palette: {
            primary: {
                main: '#FFFFFF',
            },
        },
    });

    const handleOpenMenuAvatar = (event) => {
        setCountNoti(0);
        setMenuAvatar(true);
    };


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

    function handleCloseMenuAvatar(value) {
        setMenuAvatar(false);
    }

    function handleClickLogin() {
        navigate('/kols-login');
    }
    function handleClickRegister() {
        navigate('/kols-register');
    }
    function handleClickToChooseRoleBrand() {
        navigate('/brand');
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

    const ClickOpenMessage = () => {
        const url = DOMAIN_FE + 'message/0/0/0';
        window.open(url);
    };

    function handleClickSaveOpportunity() {
        navigate('/save-opportunity');
    }

    function handleClickHaveOpportunity() {
        navigate('/have-opportunity');
    }

    function handleClickListBrand() {
        navigate('/list-brand');
    }

    function handleClickSaveBrand() {
        navigate('/save-brand');
    }


    return (
        <div sx={{ flexGrow: 1 }}  >
            <AppBar position="static" theme={theme}>
                <Toolbar>
                    <a href="/" style={{ textDecoration: "none" }}>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', color: "#00b14f" }}
                        >
                            KOLs<span style={{ color: "#B0097F" }}>Marketing</span>
                        </Typography>
                    </a>

                    <div className="dropdown_kol" style={{ paddingLeft: "30px" }}>
                        <button className="button button_cat1">Cơ hội</button>
                        <div className="dropdown-content_kol"  >
                            <a href="/">  <TravelExploreIcon sx={{ fontSize: 35, paddingBottom: 1, color: "#00B14F", paddingRight: "15px" }} /> Tìm cơ hội mới</a>
                            <a onClick={handleClickSaveOpportunity}>  <FavoriteIcon sx={{ fontSize: 35, paddingBottom: 1, color: "#00B14F", paddingRight: "15px" }} /> Cơ hội đã lưu</a>
                            <a onClick={handleClickHaveOpportunity}>  <WorkIcon sx={{ fontSize: 35, paddingBottom: 1, color: "#00B14F", paddingRight: "15px" }} /> Cơ hội đã ứng tuyển</a>
                        </div>
                    </div>

                    <div className="dropdown_kol" style={{ paddingLeft: "30px" }}>
                        <button className="button button_cat1">Nhãn hàng</button>
                        <div className="dropdown-content_kol" >
                            <a onClick={handleClickListBrand}>  <ListAltIcon sx={{ fontSize: 35, paddingBottom: 1, color: "#00B14F", paddingRight: "15px" }} /> Danh sách nhãn hàng</a>
                            <a onClick={handleClickSaveBrand}>  <StarsIcon sx={{ fontSize: 35, paddingBottom: 1, color: "#00B14F", paddingRight: "15px" }} />Nhãn hàng đã lưu</a>

                        </div>
                    </div>


                    <Box sx={{ flexGrow: 1 }} />
                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <Stack direction="row" spacing={1}>
                            <Chip
                                onClick={handleClickJob}
                                label="Công việc"
                                sx={{ color: '#00B14F', fontWeight: "500", cursor: "pointer" }}
                                icon={<BusinessCenterIcon sx={{ fontSize: 20, paddingLeft: "5px", paddingBottom: "3px" }} />} />
                            {/* <Chip label="Quan tâm" sx={{ color: '#00B14F', fontWeight: "500" }} icon={<FavoriteIcon sx={{ fontSize: 20, paddingLeft: "5px", paddingBottom: "1px" }} />}  /> */}
                            <Chip
                                onClick={ClickOpenMessage}
                                label="Nhắn tin" sx={{ color: '#00B14F', fontWeight: "500", cursor: "pointer" }}
                                icon={<SmsIcon sx={{ fontSize: 20, paddingLeft: "5px" }} />}
                            />

                            {countNoti > 0 ?
                                <Badge badgeContent={countNoti}
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            color: "white",
                                            backgroundColor: "#EE0000"
                                        }
                                    }} >
                                    <Avatar sx={{ width: 30, height: 30, bgcolor: "#00B14F", cursor: "pointer" }}
                                        onClick={handleOpenMenuAvatar}>
                                        <NotificationsIcon sx={{ fontSize: 18 }} />
                                    </Avatar>
                                </Badge>
                                :

                                <Avatar sx={{ width: 30, height: 30, bgcolor: "#00B14F", cursor: "pointer" }}
                                    onClick={handleOpenMenuAvatar}>
                                    <NotificationsIcon sx={{ fontSize: 18 }} />
                                </Avatar>
                            }


                            {menuAvatar ?
                                <div >
                                    <Notification
                                        isOpen={menuAvatar}
                                        isClose={(value) => { handleCloseMenuAvatar(value) }}
                                        listNoti={listNotification}
                                    />
                                </div>
                                : ""
                            }

                            <div className="dropdown_kol" style={{}}>
                                <Chip
                                    avatar={<Avatar alt="Natacha"
                                        src={profile?.avatar ? profile.avatar : ""} />}
                                    label={profile?.full_name ? profile.full_name : "Influencer"}
                                    variant="outlined"

                                />
                                <div className="dropdown-user_kol " >
                                    <a>
                                        <MenuItem onClick={goToAccount}>
                                            <ListItemIcon>
                                                <PersonIcon fontSize="small" />
                                            </ListItemIcon>
                                            Tài khoản
                                        </MenuItem>
                                    </a>
                                    <a>
                                        <MenuItem onClick={handleLogout}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            Đăng xuất
                                        </MenuItem>
                                    </a>
                                </div>
                            </div>


                        </Stack>
                    </Box>
                </Toolbar>
            </AppBar>
        </div>
    );
}