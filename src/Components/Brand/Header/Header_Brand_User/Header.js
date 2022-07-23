import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from "@material-ui/core/MenuItem";
import { DOMAIN_API, DOMAIN_FE } from '../../../../config/const'

import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { createTheme } from '@mui/material/styles';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@mui/material/Grid';
import Badge from '@mui/material/Badge';

//file
import Recruitment from '../../Recruitment/Recruitment';
import Setting from '../../Setting/SettingWindow';
import Proposal from '../../Proposal/Proposal';
import Job from '../../Job/Job';
import HeaderBrandLogin from '../Header_Brand_ForLogin/Header'
import Like_KOL from '../../Like_KOL/Like_KOL'
import Notification from '../../Notification_Brand/Notification_Brand'
import Homepage from '../../Homepage/Homepage_Brand'
import './Header.css'

//icon
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SmsIcon from '@mui/icons-material/Sms';
import NotificationsIcon from '@mui/icons-material/Notifications';
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SendIcon from '@mui/icons-material/Send';
import SettingsIcon from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';

const drawerWidth = 240;

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));

const useStyles = makeStyles((theme) => ({
    notification: {
        backgroundColor: "#FFFFFF",
        border: `1px solid #00B14F`,
        color: "#00B14F",
    },
}));

const theme = createTheme({
    palette: {
        primary: {
            main: '#FFFFFF',
        },
    },
});

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Header_Brand() {
    let actoken = localStorage.access_token;
    const navigate = useNavigate();
    const [menuAvatar, setMenuAvatar] = React.useState(null)
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const classes_icon = useStyles();
    const [menu, setMenu] = React.useState(0);
    const [profileBrand, setProfileBrand] = React.useState({});

    //notification
    const [listNotification, setListNotification] = React.useState([]);
    const [countNoti, setCountNoti] = React.useState(0);

    //0: Bảng tin
    //1: Đề xuất Influencers
    //2: Tin tuyển dụng
    //3: Cài đặt tài khoản
    //4: Thông báo hệ thống
    //5: Công việc
    async function GetAllNotif() {
        let url2 = "";
        url2 = DOMAIN_API + `notifications/get-all-noti`;
        await fetch(url2, {
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
    }

    React.useEffect(() => {
        fetch(DOMAIN_API + `brands/get-profile`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },

        })
            .then(res => res.json())
            .then(
                (result) => {
                    setProfileBrand(result);
                }
            )

        GetAllNotif();
    }, [menu])

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const ClickHomepage = (event, index) => {
        setMenu(index);
    };

    const ClickOfferInfluencers = (event, index) => {
        setMenu(index);
    };

    const ClickLikeInfluencer = (event, index) => {
        setMenu(index);
    };

    const ClickRecruitment = (event, index) => {
        setMenu(index);
    };

    const ClickSetting = (event, index) => {
        setMenu(index);
    };

    const ClickNotification = (event, index) => {
        setMenu(index);
        setCountNoti(0);
    };

    const handleOpenMenuAvatar = (event) => {
        if (menuAvatar !== event.currentTarget) {
            setMenuAvatar(event.currentTarget);
        }
    };

    function handleLogout() {
        navigate('/logout');
    }


    const ClickOpenMessage = () => {
        const url = DOMAIN_FE + 'message/0/0/0';
        window.open(url);
    };

    if (localStorage.access_token == null || localStorage.check_role =='1') {
        localStorage.setItem("beforeLink", window.location.pathname);
        return (
            <div sx={{ flexGrow: 1 }}  >
                <HeaderBrandLogin />
                <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "10px" }}>
                    Bạn cần đăng nhập để tiếp tục ...
                </div>


            </div>
        )
    }
    else {

        return (
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="fixed" open={open} sx={{ bgcolor: "#FFFFFF" }} >
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                                color: "#00B14F"
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div" sx={{ color: "#00B14F" }}>
                            KOLsMarketing Brand
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <Stack direction="row" spacing={1}>
                                {/* <Chip label="Công việc" sx={{ color: '#00B14F', fontWeight: "500" }} icon={<BusinessCenterIcon sx={{ fontSize: 20, paddingLeft: "5px", paddingBottom: "3px" }} />} />
                                <Chip label="Quan tâm" sx={{ color: '#00B14F', fontWeight: "500" }} icon={<FavoriteIcon sx={{ fontSize: 20, paddingLeft: "5px", paddingBottom: "1px" }} />} /> */}
                                <Chip
                                    onClick={ClickOpenMessage}
                                    label="Nhắn tin" sx={{ color: '#00B14F', fontWeight: "500" }} icon={<SmsIcon sx={{ fontSize: 20, paddingLeft: "5px" }} />}
                                />

                                {/* <Avatar sx={{ width: 30, height: 30, bgcolor: "#00B14F" }}>
                                    <NotificationsIcon sx={{ fontSize: 18 }} />
                                </Avatar> */}
                                {/* <Chip
                                    avatar={<Avatar alt="Natacha" src={profileBrand.avatar ? profileBrand.avatar : "avatar.jpg"} />}
                                    label={profileBrand.brand_name}
                                    variant="outlined"
                                    onClick={handleOpenMenuAvatar}
                                    onMouseOver={handleOpenMenuAvatar}
                                />
                                <Menu
                                    id="simple-menu"
                                    anchorEl={menuAvatar}
                                    open={Boolean(menuAvatar)}
                                    onClose={handleCloseMenuAvatar}
                                    MenuListProps={{ onMouseLeave: handleCloseMenuAvatar }}
                                    PaperProps={{
                                        style: {
                                            transform: 'translateX(10px) translateY(50px)',
                                        }
                                    }}
                                >


                                    <MenuItem onClick={handleCloseMenuAvatar}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Đăng xuất
                                    </MenuItem>
                                </Menu> */}

                                <div className="dropdown_kol" style={{}}>
                                    <Chip
                                        avatar={<Avatar alt="Natacha" src={profileBrand.avatar ? profileBrand.avatar : ""} />}
                                        label={profileBrand.brand_name}
                                        variant="outlined"
                                    />
                                    <div className="dropdown-content_kol" >
                                        <MenuItem onClick={handleLogout}>
                                            <ListItemIcon>
                                                <Logout fontSize="small" />
                                            </ListItemIcon>
                                            <span style={{ color: "black" }}>Đăng xuất</span>\
                                        </MenuItem>
                                    </div>
                                </div>


                            </Stack>
                        </Box>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <DrawerHeader  >
                        <Grid container spacing={2}>
                            <Grid item xs={3}>
                                <Avatar alt="..." src={profileBrand.avatar ? profileBrand.avatar : ""} />
                            </Grid>
                            <Grid item xs={9}>

                                <Typography noWrap variant="subtitle2">{profileBrand.brand_name}</Typography>

                                <Typography noWrap variant="body2">Employer</Typography>


                            </Grid>
                        </Grid>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        <ListItemButton
                            selected={menu === 0}
                            onClick={(event) => ClickHomepage(event, 0)}
                            sx={{
                                minHeight: 40,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}

                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    ...((menu == "0") && { color: "#00B14F" }),


                                }}

                            >
                                <HomeIcon sx={{ fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText primary="Bảng tin" sx={{ opacity: open ? 1 : 0, ...((menu == "0") && { color: "#00B14F" }) }} primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItemButton>

                        <ListItemButton
                            selected={menu === 1}
                            onClick={(event) => ClickOfferInfluencers(event, 1)}
                            sx={{
                                minHeight: 40,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}

                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    ...((menu == "1") && { color: "#00B14F" }),
                                }}

                            >
                                <PeopleAltIcon sx={{ fontSize: 20 }} onclick={ClickOfferInfluencers} />
                            </ListItemIcon>
                            <ListItemText primary="Đề xuất Kols" sx={{ opacity: open ? 1 : 0, ...((menu == "1") && { color: "#00B14F" }) }} primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItemButton>

                        <ListItemButton
                            selected={menu === 6}
                            onClick={(event) => ClickLikeInfluencer(event, 6)}
                            sx={{
                                minHeight: 40,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}

                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    ...((menu == "6") && { color: "#00B14F" }),
                                }}

                            >
                                <FavoriteIcon sx={{ fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText primary="Kols đang quan tâm" sx={{ opacity: open ? 1 : 0, ...((menu == "6") && { color: "#00B14F" }) }} primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItemButton>

                        <ListItemButton
                            selected={menu === 2}
                            onClick={(event) => ClickRecruitment(event, 2)}
                            sx={{
                                minHeight: 40,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    ...((menu == "2") && { color: "#00B14F" }),
                                }}
                            >
                                <SendIcon sx={{ fontSize: 18 }} />
                            </ListItemIcon>
                            <ListItemText primary="Tin tuyển dụng" sx={{ opacity: open ? 1 : 0, ...((menu == "2") && { color: "#00B14F" }) }} primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItemButton>

                        <ListItemButton
                            selected={menu === 3}
                            onClick={(event) => ClickSetting(event, 3)}
                            sx={{
                                minHeight: 40,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    ...((menu == "3") && { color: "#00B14F" }),
                                }}
                            >
                                <SettingsIcon sx={{ fontSize: 20 }} />
                            </ListItemIcon>
                            <ListItemText primary="Cài đặt tài khoản" sx={{ opacity: open ? 1 : 0, ...((menu == "3") && { color: "#00B14F" }) }} primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItemButton>

                        <ListItemButton
                            selected={menu === 4}
                            onClick={(event) => ClickNotification(event, 4)}
                            sx={{
                                minHeight: 40,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >

                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    ...((menu == "4") && { color: "#00B14F" }),
                                }}
                            >
                                {countNoti > 0 ?
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <NotificationsIcon sx={{ fontSize: 20 }} />
                                    </StyledBadge>
                                    :
                                    <NotificationsIcon sx={{ fontSize: 20 }} />
                                }
                            </ListItemIcon>



                            <ListItemText primary="Thông báo" sx={{ opacity: open ? 1 : 0, ...((menu == "4") && { color: "#00B14F" }) }} primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItemButton>

                        <ListItemButton
                            selected={menu === 5}
                            onClick={(event) => ClickNotification(event, 5)}
                            sx={{
                                minHeight: 40,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                    ...((menu == "5") && { color: "#00B14F" }),
                                }}
                            >
                                <BusinessCenterIcon sx={{ fontSize: 18 }} />
                            </ListItemIcon>
                            <ListItemText primary="Công việc" sx={{ opacity: open ? 1 : 0, ...((menu == "5") && { color: "#00B14F" }) }} primaryTypographyProps={{ fontSize: '14px' }} />
                        </ListItemButton>


                    </List>
                    <Divider />

                </Drawer>
                {/* p:3 */}
                <Box component="main" sx={{ flexGrow: 1, 
                    paddingTop:"20px", paddingLeft:"20px", paddingRight:"20px", paddingBottom:"20px",
                     bgcolor: "#f0f2f5" }}>
                    <DrawerHeader />
                    {(menu == "2") && <Recruitment idBrand={profileBrand.id} />}
                    {(menu == "3") && <Setting />}
                    {(menu == "1") && <Proposal  idBrand={profileBrand.id}/>}
                    {(menu == "5") && <Job />}
                    {(menu == "6") && <Like_KOL />}
                    {(menu == "4") && <Notification listNotification={listNotification} />}
                    {(menu == "0") && <Homepage />}
                    

                </Box>


            </Box >
        );
    }
}
