import * as React from 'react';
import styled from 'styled-components';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
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

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  border-right: 1px solid rgb(230, 230, 230);

  width:400px;
  margin-bottom: -40px;
  margin-top: -20px;
  margin-left: -20px;
  position: fixed;
`;

export default function Notification({ listNotification, typeChoiceShow, idJobDescribe, idPost, idUser, load }) {
    const [haveReadAll, setHaveReadAll] = React.useState(false);
    const [readAll, setReadAll] = React.useState(true);

    //id của thông báo đang đọc
    const [idRead, setIdRead] = React.useState(null);

    let actoken = localStorage.access_token;
    const navigate = useNavigate();
    const [listAllNotification, setListAllNotification] = React.useState(listNotification);
    const [listNewNotification, setListNewNotification] = React.useState([]);

    const splitNotification = (list) => {
        let tmp1 = [];
        if (list?.length > 0) {
            for (let i = 0; i < list.length; i++) {
                if (list[i].status == 0)
                    tmp1.push(list[i]);
            }
            setListNewNotification(tmp1);
        }
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

    async function handleMarkHaveReadOne(id_job_describe, id_post, id, id_user, index, type) {
        setIdRead(id);
        //------ Xử lí read-one ------
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
        //----Xử lý show nội dung
        if (id_job_describe != null) {
            typeChoiceShow(2) // Show bình luận nhiệm vụ
            idPost(id_post);
            idUser(id_user);
            idJobDescribe(id_job_describe);
            load(true);
        }
        else {
            typeChoiceShow(1) // Show ứng tuyển
            idPost(id_post);
            idUser(id_user);
            idJobDescribe(id_job_describe);
            load(true);
        }


    }

    const handleClickReadNew = () => {
        setReadAll(false);
    }

    React.useEffect(() => {
        splitNotification(listNotification);
    }, [])



    React.useEffect(() => {
        //setState(isOpen)
    }, [])

    return (
        <SidebarStyled>
            <div style={{ overflowY: "auto" }} className="height_list"  >
                <div style={{ paddingTop: "10px", paddingBottom: "10px", paddingLeft: "10px", fontWeight: 600, fontSize: "16px" }}>
                    Thông báo
                </div>
                <div style={{ paddingBottom: "5px" }}>
                    <Divider />
                </div>

                <div className="d-flex justify-content-between" style={{ paddingBottom: "5px" }}>
                    <div style={{ paddingTop: "5px", paddingLeft: "10px" }}>
                        <Stack direction="row" spacing={1}>
                            <Chip
                                onClick={handleClickReadAll}
                                label="Tất cả"

                                sx={{ fontSize: "15px", color: readAll ? '#00B14F' : "black", fontWeight: readAll ? "500" : "500", cursor: "pointer" }}
                            />
                            {listNewNotification?.length > 0 ?
                                <Chip
                                    onClick={handleClickReadNew}
                                    label="Chưa đọc"
                                    sx={{ fontSize: "15px", color: readAll ? 'black' : "#00B14F", fontWeight: readAll ? "500" : "500", cursor: "pointer" }}
                                />
                                :
                                ""
                            }

                        </Stack>
                    </div>
                    <div style={{
                        paddingTop: "10px", paddingRight: "10px", textAlign: "right",
                        fontWeight: 600, color: "#660066",
                    }}>
                        <span style={{ cursor: "pointer" }} onClick={handleMarkHaveReadAll}>
                            Đánh dấu đã đọc tất cả
                        </span>
                    </div>
                </div>

                {readAll ?
                    <div style={{marginLeft: "-5px"}}   >
                        <List sx={{  }}>
                            {listAllNotification?.length > 0 && listAllNotification.map((list, index) => (
                                <div key={index} >
                                    <ListItem
                                        sx={{ marginTop: "-10px" }}
                                        onClick={(e) => { handleMarkHaveReadOne(list.id_job_describe, list.id_post, list.id, list.id_user, index, 1) }}>
                                        <ListItemButton sx={{ bgcolor: idRead == list.id ? "#edf4fb" : "", borderRadius: "5px" }}>
                                            <ListItemIcon sx={{marginLeft:"-5px"}}>
                                                <Avatar sx={{
                                                    width: "70px", height: "70px"
                                                }}
                                                    aria-label="recipe"
                                                    src={list.avatar}>
                                                </Avatar>
                                            </ListItemIcon>

                                            <ListItemText>
                                                <div style={{ marginLeft: "10px", marginRight: "-20px", }}>
                                                    <div className="notiTitle" style={{ fontSize: "14px", }}>
                                                        <span style={{ fontWeight: 600 }}>{list.name} </span>
                                                        {list.message}  (<span style={{ color: "gray" }}>{list.post_title}</span>)
                                                    </div>
                                                    {list.status == 0 ?
                                                        <div style={{ fontSize: "12px", fontWeight: 500, color: "#00B14F" }} >
                                                            {moment(list.create_time).format("DD/MM/YYYY HH:mm")}
                                                        </div>
                                                        :
                                                        <div style={{ fontSize: "12px", fontWeight: 400, color: "gray" }} >
                                                            {moment(list.create_time).format("DD/MM/YYYY HH:mm")}
                                                        </div>
                                                    }
                                                </div>
                                            </ListItemText>
                                            {haveReadAll ?
                                                <div>
                                                    <ListItemIcon sx={{ paddingLeft: "50px" }}>

                                                    </ListItemIcon>
                                                </div>
                                                :
                                                <div>
                                                    {list.status == 0 ?
                                                        <ListItemIcon sx={{ paddingLeft: "50px" }}>
                                                            <CircleIcon sx={{ color: "#00B14F", fontSize: "16px" }} />
                                                        </ListItemIcon>
                                                        :
                                                        <ListItemIcon sx={{ paddingLeft: "50px" }}>

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
                    <div style={{marginLeft: "-5px"}} >
                        <List sx={{ }}>
                            {listNewNotification?.length > 0 && listNewNotification.map((list, index) => (
                                <div key={index}>
                                    <ListItem
                                        sx={{ marginTop: "-10px" }}
                                        onClick={(e) => { handleMarkHaveReadOne(list.id_job_describe, list.id_post, list.id, list.id_user, index, 2) }}>
                                        <ListItemButton sx={{ bgcolor: idRead == list.id ? "#DDDDDD" : "", borderRadius: "5px" }}>
                                            <ListItemIcon  sx={{marginLeft:"-5px"}}>
                                                <Avatar sx={{
                                                    width: "70px", height: "70px"
                                                }}
                                                    aria-label="recipe"
                                                    src={list.avatar}>
                                                </Avatar>
                                            </ListItemIcon>

                                            <ListItemText>
                                                <div style={{ marginLeft: "10px", marginRight: "-20px", }}>
                                                    <div className="notiTitle" style={{ fontSize: "14px", }}>
                                                        <span style={{ fontWeight: 600 }}>{list.name} </span>
                                                        {list.message} (<span style={{ color: "gray" }}>{list.post_title}</span>)
                                                    </div>
                                                    {list.status == 0 ?
                                                        <div style={{ fontSize: "12px", fontWeight: 500, color: "#00B14F" }} >
                                                            {moment(list.create_time).format("DD/MM/YYYY HH:mm")}
                                                        </div>
                                                        :
                                                        <div style={{ fontSize: "12px", fontWeight: 400, color: "gray" }} >
                                                            {moment(list.create_time).format("DD/MM/YYYY HH:mm")}
                                                        </div>
                                                    }
                                                </div>
                                            </ListItemText>
                                            {list.status == 0 ?
                                                <ListItemIcon sx={{ paddingLeft: "50px" }}>
                                                    <CircleIcon sx={{ color: "#00B14F", fontSize: "16px" }} />
                                                </ListItemIcon>
                                                :
                                                <ListItemIcon sx={{ paddingLeft: "50px" }}>

                                                </ListItemIcon>
                                            }


                                        </ListItemButton>
                                    </ListItem>
                                </div>
                            ))}


                        </List>
                    </div>
                }


            </div>
        </SidebarStyled>
    );
}
