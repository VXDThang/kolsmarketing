import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import './Noti.css'
import CircleIcon from '@mui/icons-material/Circle';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import moment from 'moment';
import { DOMAIN_API } from '../../../config/const'
import { useNavigate } from 'react-router-dom';

export default function Notification({ isOpen, isClose, listNoti }) {
    const [state, setState] = React.useState(isOpen);
    const [haveReadAll, setHaveReadAll] = React.useState(false);
    const [readAll, setReadAll] = React.useState(true);
   
    let actoken = localStorage.access_token;
    const navigate = useNavigate();
    const [listAllNotification, setListAllNotification] = React.useState(listNoti);
    const [listNewNotification, setListNewNotification] = React.useState([]);

    const splitNotification = (list) => {
        let tmp1 = [];
        if (list.length > 0) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].status == 0)
                    tmp1.push(list[i]);
            }
            setListNewNotification(tmp1);
        }
    }

    const handleClose = () => {
        isClose(true);
        setState(false);
    }

    const handleClickReadAll = () => {
        setReadAll(true);
    }

    async function handleMarkHaveReadAll() {
        let url2 = "";
        url2 = DOMAIN_API + `notifications/mark-read-all-noti`;
        await fetch(url2, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result) {
                        setHaveReadAll(true);
                        setListNewNotification([]);
                        let tmp = listAllNotification;
                        for (let i = 0; i < tmp.length; i++) {
                            tmp[i].status = 1;
                        }
                        setListAllNotification(tmp);
                    }

                }
            )
    }

    async function handleMarkHaveReadOne(id_job_describe, id_post, id, index, type) {
        //type =1: Nó thuộc phần các thông báo tất cả
        //type =2: Nó thuộc phần các thông báo chưa đọc
        let url2 = "";
        url2 = DOMAIN_API + `notifications/mark-read-1noti`;
        await fetch(url2, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ id_noti: id })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result) {

                        if (type == 1) {
                            let tem = listAllNotification;
                            tem[index].status = 1;
                            setListAllNotification(tem);

                            let tmp2 = listNewNotification;
                            let flag = 0;
                            let toDelete = false;
                            for (let i = 0; i < tmp2.length; i++) {
                                if (tmp2[i].id == id) {
                                    flag = i;
                                    toDelete = true;
                                    return;
                                }
                            }
                            if (toDelete) {
                              
                                let list1 = tmp2.slice(0, flag);
                                let list2 = tmp2.slice(flag + 1, tmp2.length);
                                let new_arr = list1.concat(list2);
                                setListNewNotification(new_arr);
                            }
                        }
                        if (type == 2) {
                          
                            const list1 = listNewNotification.slice(0, index);
                            const list2 = listNewNotification.slice(index + 1, listNewNotification.length);
                            const new_arr = list1.concat(list2);
                            setListNewNotification(new_arr);

                            let tmp = listAllNotification;
                            for (let i = 0; i < tmp.length; i++) {
                                if (tmp[i].id == id) {
                                    tmp[i].status = 1;
                                }
                            }
                            setListAllNotification(tmp);
                        }
                    }

                }
            )
        if (id_job_describe != null)
            navigate(`/read-noti/${id_post}/${id_job_describe}`);
        else
            navigate(`/read-noti/${id_post}/none`);
    }

    const handleClickReadNew = () => {
        setReadAll(false);
    }

    React.useEffect(() => {
        //setListAllNotification(listNoti);
        splitNotification(listNoti);
    }, [])

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 450, overflow: "auto", fontFamily: "Segoe UI" }}
            role="presentation"
        // onClick={toggleDrawer(anchor, false)}
        // onKeyDown={toggleDrawer(anchor, false)}
        >
            <div style={{ paddingTop: "5px", paddingBottom: "5px", paddingLeft: "20px", fontWeight: 600, fontSize: "20px", color: "#00B14F" }}>
                Thông báo
            </div>
            <div className="d-flex justify-content-between">
                <div style={{ paddingTop: "5px", paddingLeft: "20px" }}>
                    <Stack direction="row" spacing={1}>
                        <Chip
                            onClick={handleClickReadAll}
                            label="Tất cả"

                            sx={{ fontFamily: "Segoe UI", fontSize: "15px", color: readAll ? '#00B14F' : "black", fontWeight: readAll ? "500" : "500", cursor: "pointer" }}
                        />

                        <Chip
                            onClick={handleClickReadNew}
                            label="Chưa đọc"
                            sx={{ fontFamily: "Segoe UI", fontSize: "15px", color: readAll ? 'black' : "#00B14F", fontWeight: readAll ? "500" : "500", cursor: "pointer" }}
                        />
                    </Stack>
                </div>
                <div style={{
                    paddingTop: "10px", paddingRight: "20px", textAlign: "right",
                    fontWeight: 600, color: "#660066", fontFamily: "Segoe UI"
                }}>
                    <span style={{ cursor: "pointer" }} onClick={handleMarkHaveReadAll}>
                        Đánh dấu đã đọc tất cả
                    </span>
                </div>
            </div>

            {readAll ?
                <div>

                    <List>
                        {listAllNotification.length > 0 && listAllNotification.map((list, index) => (
                            <div key={index}>

                                <ListItem disablePadding
                                    onClick={(e) => { handleMarkHaveReadOne(list.id_job_describe, list.id_post, list.id, index, 1) }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Avatar sx={{
                                                width: "70px", height: "70px"
                                            }}
                                                aria-label="recipe"
                                                src={list.avatar}>
                                            </Avatar>
                                        </ListItemIcon>

                                        <ListItemText>
                                            <div style={{ marginLeft: "10px", marginRight: "-15px", fontFamily: "Segoe UI" }}>
                                                <div className="notiTitle">
                                                    <span style={{ fontWeight: 600 }}>{list.name} </span>
                                                    {list.message} (công việc {list.post_title})
                                                </div>
                                                {list.status == 0 ?
                                                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#00B14F" }} >
                                                        {moment(list.create_time).format("DD/MM/YYYY HH:mm")}
                                                    </div>
                                                    :
                                                    <div style={{ fontSize: "14px", fontWeight: 400, color: "gray" }} >
                                                        {moment(list.create_time).format("DD/MM/YYYY HH:mm")}
                                                    </div>
                                                }
                                            </div>
                                        </ListItemText>
                                        {haveReadAll ?
                                            <div>
                                                <ListItemIcon sx={{ paddingLeft: "30px" }}>

                                                </ListItemIcon>
                                            </div>
                                            :
                                            <div>
                                                {list.status == 0 ?
                                                    <ListItemIcon sx={{ paddingLeft: "30px" }}>
                                                        <CircleIcon sx={{ color: "#00B14F", fontSize: "16px" }} />
                                                    </ListItemIcon>
                                                    :
                                                    <ListItemIcon sx={{ paddingLeft: "30px" }}>

                                                    </ListItemIcon>
                                                }
                                            </div>
                                        }

                                    </ListItemButton>
                                </ListItem>
                            </div>
                        ))}


                    </List>
                </div>
                :
                <div>
                    {/* <div style={{
                        paddingTop: "10px", paddingRight: "20px", textAlign: "right",
                        fontWeight: 600, color: "#660066", fontFamily: "Segoe UI"
                    }}>
                        <span style={{ cursor: "pointer" }}>
                            Đánh dấu đã đọc tất cả
                        </span>
                    </div> */}
                    <List>

                        {listNewNotification.length > 0 && listNewNotification.map((list, index) => (
                            <div key={index}>

                                <ListItem disablePadding
                                    onClick={(e) => { handleMarkHaveReadOne(list.id, index, 2) }}>
                                    <ListItemButton>
                                        <ListItemIcon>
                                            <Avatar sx={{
                                                width: "70px", height: "70px"
                                            }}
                                                aria-label="recipe"
                                                src={list.avatar}>
                                            </Avatar>
                                        </ListItemIcon>

                                        <ListItemText>
                                            <div style={{ marginLeft: "10px", marginRight: "-15px", fontFamily: "Segoe UI" }}>
                                                <div className="notiTitle">
                                                    <span style={{ fontWeight: 600 }}>{list.name} </span>
                                                    {list.message} (công việc {list.post_title})
                                                </div>
                                                {list.status == 0 ?
                                                    <div style={{ fontSize: "14px", fontWeight: 500, color: "#00B14F" }} >
                                                        {moment(list.create_time).format("DD/MM/YYYY HH:mm")}
                                                    </div>
                                                    :
                                                    <div style={{ fontSize: "14px", fontWeight: 400, color: "gray" }} >
                                                        {moment(list.create_time).format("DD/MM/YYYY HH:mm")}
                                                    </div>
                                                }
                                            </div>
                                        </ListItemText>
                                        {list.status == 0 ?
                                            <ListItemIcon sx={{ paddingLeft: "30px" }}>
                                                <CircleIcon sx={{ color: "#00B14F", fontSize: "16px" }} />
                                            </ListItemIcon>
                                            :
                                            <ListItemIcon sx={{ paddingLeft: "30px" }}>

                                            </ListItemIcon>
                                        }


                                    </ListItemButton>
                                </ListItem>
                            </div>
                        ))}


                    </List>
                </div>
            }


        </Box>
    );

    React.useEffect(() => {
        //setState(isOpen)
    }, [])

    return (
        <div >

            <React.Fragment >
                <Drawer
                    anchor={"right"}
                    open={isOpen}
                    //onClose={toggleDrawer("right", false)}
                    onClose={handleClose}
                    sx={{ zIndex: "1300 !important" }}
                >
                    {list("right")}
                </Drawer>
            </React.Fragment>
        </div>
    );
}
