import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { DOMAIN_FE, DOMAIN_API } from '../../../config/const'

import Grid from '@mui/material/Grid';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ChatIcon from '@mui/icons-material/Chat';
import Divider from '@mui/material/Divider';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

//file
import Modal_See_Profile_Kol from '../../Modals/Brand_See_Profile_Kol';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

function formatDateTime(create_time) {
    const time = new Date(create_time)
    const result = time.getHours() + ":" + time.getMinutes() + " " + (time.getDate()+1) + "/" + (time.getMonth()+1) + "/" + time.getFullYear();
    return result
};

export default function Show_post({ detailPost, id, loadingParent }) {
    const [expanded, setExpanded] = React.useState(false);
    let actoken = localStorage.access_token;
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [listRecruitment, setListRecruitment] = React.useState([]);
    const [listAcceptRecruitment, setListAcceptRecruitment] = React.useState([]);
    const [listRejectRecruitment, setListRejectRecruitment] = React.useState([]);

    const [loadingAfterUn_Active, setLoadingAfterUn_Active] = React.useState(true);

    const [openModalProfileKOL, setOpenModalProfileKOL] = React.useState(false);
    const [idKolToSeeProfile, setIdKolToSeeProfile] = React.useState('');

    const [isOpenRecruitment, setIsOpenRecruitment] = React.useState(detailPost.state == '1' ? true : false);

    const handleClickSeeProfile = (id_kol) => {
        setIdKolToSeeProfile(id_kol);
        setOpenModalProfileKOL(true)
    }

    const handleCloseSeeProfile = () => {
        setIdKolToSeeProfile('');
        setOpenModalProfileKOL(false)
    }


    async function handleClickOnOffRecruitment() {
        if (isOpenRecruitment) {
            try {
                let url1 = "";
                url1 = DOMAIN_API + `posts/unactive-post`;
                await fetch(url1, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        "x-access-token": actoken
                    },
                    body: JSON.stringify({ id_post: detailPost.id })
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setIsOpenRecruitment(false)
                            loadingParent(true);
                        }
                    )
            }
            catch (error) {
                console.log("error: ", error)
            }
        }
        else {
            try {
                let url1 = "";
                url1 = DOMAIN_API + `posts/active-post`;
                await fetch(url1, {
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        "x-access-token": actoken
                    },
                    body: JSON.stringify({ id_post: detailPost.id })
                })
                    .then(res => res.json())
                    .then(
                        (result) => {
                            setIsOpenRecruitment(true)
                            loadingParent(true);
                        }
                    )
            }
            catch (error) {
                console.log("error: ", error)
            }
        }
    }

    let cast = "";
    if (detailPost) {
        let min_cast_Draft = Number(detailPost.min_cast);
        let min_cast_Main = min_cast_Draft.toLocaleString("vi");
        let max_cast_Draft = Number(detailPost.max_cast);
        let max_cast_Main = max_cast_Draft.toLocaleString("vi");

        if (detailPost.min_cast < detailPost.max_cast) {
            cast = min_cast_Main + " - " + max_cast_Main;
        }
        else {
            cast = min_cast_Main;
        }
    }

    async function getRecruitment() {
        setListRecruitment([]);
        setListAcceptRecruitment([]);
        setListRejectRecruitment([]);
        try {
            let url1 = "";
            url1 = DOMAIN_API + `recruitments/find-recruitment-of-post`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_post: detailPost.id })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        handleDataToListRecruitment(result);
                        setError(null);
                    }
                )
        }
        catch (error) {
            setError(error)
        }
        finally {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        getRecruitment();
    }, [id])


    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    async function handleOpenRoomMessage(idKol) {
        await fetch(DOMAIN_API + `message/open-room`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ iduser: idKol, role: 1 })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const url = DOMAIN_FE + `message/${result.id}/${idKol}/1`;
                    window.open(url);
                }
            )
    }

    const goToMess = (idKol) => {
        handleOpenRoomMessage(idKol)
    };

    const handleDataToListRecruitment = (listData) => {
        // setListRecruitment([]);
        // setListAcceptRecruitment([]);
        // setListRejectRecruitment([]);
        const list = listData;
        for (let i = 0; i < listData.length; i++) {
            let temp = formatDateTime(list[i].create_time);
            list[i].create_time = temp;
            if (list[i].state == "1") {
                setListRecruitment(listRecruitment => [...listRecruitment, list[i]]);
            }
            if (list[i].state == "3") {
                setListAcceptRecruitment(listAcceptRecruitment => [...listAcceptRecruitment, list[i]]);
            }
            if (list[i].state == "2") {
                setListRejectRecruitment(listRejectRecruitment => [...listRejectRecruitment, list[i]]);
            }
        }
    };

    const handleAcceptRecruitment = (event, idRecruitment, index) => {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `recruitments/accept-recruitment-of-post`;
            fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_recruit: idRecruitment })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setListAcceptRecruitment(listAcceptRecruitment => [...listAcceptRecruitment, listRecruitment[index]]);
                        setListRecruitment(listRecruitment.filter(item => item.id !== idRecruitment))
                    }
                )
        }
        catch (error) {
            //setError(error)
        }
        finally {
            // setLoading(false);
        }

    };

    const handleRejectctRecruitment = (event, idRecruitment, index) => {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `recruitments/reject-recruitment-of-post`;
            fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_recruit: idRecruitment })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setListRejectRecruitment(listAcceptRecruitment => [...listAcceptRecruitment, listRecruitment[index]]);
                        setListRecruitment(listRecruitment.filter(item => item.id !== idRecruitment))
                    }
                )
        }
        catch (error) {
            //setError(error)
        }
        finally {
            // setLoading(false);
        }

    };


    if (detailPost)
        return (
            <div >
                <Card >
                    <div style={{ margin: "10px", marginBottom: "0px" }}>
                        <div className="d-flex justify-content-between">
                            <div style={{ paddingTop: "8px", fontWeight: 700, color: "#1b74e4", fontSize: "18px" }}>
                                Bài viết
                                {isOpenRecruitment ?
                                    <span style={{ fontSize: "14px", color: "green", fontWeight: 500 }}> (Đang mở tuyển dụng) </span>
                                    :
                                    <span style={{ fontSize: "14px", color: "red", fontWeight: 500 }}> (Đã đóng tuyển dụng) </span>
                                }
                            </div>
                            <div>
                                <div
                                    onClick={handleClickOnOffRecruitment}
                                    style={{
                                        cursor: "pointer", padding: "5px",
                                        fontWeight: "500",
                                        border: "1px solid black", borderRadius: "5px"
                                    }}>
                                    {isOpenRecruitment ?
                                        <DoNotDisturbOnIcon sx={{ color: "red" }} />
                                        :
                                        <CheckCircleIcon sx={{ color: "green" }} />
                                    }
                                    {isOpenRecruitment ?
                                        <span style={{ fontSize: "14px", color: "black", fontWeight: 500 }}> Đóng tuyển dụng</span>
                                        :
                                        <span style={{ fontSize: "14px", color: "black", fontWeight: 500 }}> Mở tuyển dụng</span>
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{ paddingTop: "10px" }}>
                            <Divider style={{ background: '#1b74e4' }} />
                        </div>
                        <div style={{ paddingTop: "5px" }}>
                            <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                Tiêu đề:
                            </div>
                            <div style={{ fontWeight: 400, fontSize: "14px" }}>
                                {detailPost.title}
                            </div>
                        </div>

                        <Grid container spacing={2}>
                            <Grid item xs={6}>

                                <div style={{ paddingTop: "5px" }}>
                                    <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                        Lượt xem:
                                    </div>
                                    <div style={{ fontWeight: 400, fontSize: "14px" }}>
                                        {detailPost.views}
                                    </div>
                                </div>

                                <div style={{ paddingTop: "5px" }}>
                                    <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                        Địa điểm:
                                    </div>
                                    <div style={{ fontWeight: 400, fontSize: "14px" }}>
                                        {detailPost.address}
                                    </div>
                                </div>

                                <div style={{ paddingTop: "5px" }}>
                                    <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                        Đăng lúc:
                                    </div>
                                    <div style={{ fontWeight: 400, fontSize: "14px" }}>
                                        {detailPost.write_time}
                                    </div>
                                </div>

                            </Grid>
                            <Grid item xs={6}>

                                <div style={{ paddingTop: "5px" }}>
                                    <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                        Số lượng:
                                    </div>
                                    <div style={{ fontWeight: 400, fontSize: "14px" }}>
                                        {detailPost.amount}
                                    </div>
                                </div>

                                <div style={{ paddingTop: "5px" }}>
                                    <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                        Giới tính:
                                    </div>
                                    <div style={{ fontWeight: 400, fontSize: "14px" }}>
                                        {detailPost.gender}
                                    </div>
                                </div>

                                <div style={{ paddingTop: "5px" }}>
                                    <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                        Mức lương:
                                    </div>
                                    <div style={{ fontWeight: 400, fontSize: "14px" }}>
                                        {cast}
                                    </div>
                                </div>

                            </Grid>
                        </Grid>

                        <div style={{ paddingTop: "5px" }}>
                            <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                Nội dung:
                            </div>
                            <div style={{ fontWeight: 400, fontSize: "14px" }}>
                                {detailPost.content}
                            </div>
                        </div>

                        <div style={{ paddingTop: "5px" }}>
                            <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                Yêu cầu:
                            </div>
                            <div style={{ fontWeight: 400, fontSize: "14px" }}>
                                {detailPost.requirement}
                            </div>
                        </div>

                        <div style={{ paddingTop: "5px" }}>
                            <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                Quyền lợi:
                            </div>
                            <div style={{ fontWeight: 400, fontSize: "14px" }}>
                                {detailPost.benefit}
                            </div>
                        </div>

                        <div style={{ paddingTop: "5px", paddingBottom: "10px" }}>
                            <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                Hình ảnh:
                            </div>
                            <div style={{ paddingTop: "10px" }} >


                                {detailPost.image_detail.length > 0 ?
                                    <Carousel showThumbs={false} style={{ maxHeight: "500px", width: "auto" }} >
                                        {detailPost.image_cover ?
                                            <div>
                                                <img src={detailPost.image_cover} />
                                            </div>
                                            : ""
                                        }
                                        {detailPost.image_detail.length > 0 && detailPost.image_detail.map((list, index) => (
                                            <div key={index}>
                                                <img src={list} />
                                            </div>
                                        ))}
                                    </Carousel>
                                    :
                                    <Carousel showThumbs={false} style={{ maxHeight: "500px", width: "auto" }} >
                                        {detailPost.image_cover ?
                                            <div>
                                                <img src={detailPost.image_cover} />
                                            </div>
                                            : ""
                                        }
                                    </Carousel>
                                }


                            </div>
                        </div>


                    </div>
                </Card>
                <div style={{ paddingTop: "20px" }}>
                    <Card >
                        <div style={{ margin: "10px" }}>
                            <div style={{ fontWeight: 700, color: "#800080", fontSize: "14px" }}>
                                Ứng tuyển: {listRecruitment.length}
                            </div>
                            <Divider style={{ background: '#800080' }} />

                            {listRecruitment.length > 0 && listRecruitment.map((list, index) => (
                                <div key={list.id}>
                                    <div style={{ paddingTop: "10px" }}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div>
                                                <Avatar sx={{ width: 32, height: 32 }} alt="..."
                                                    src={list.kols_info.avatar ? list.kols_info.avatar : "kol.jpg"} />
                                            </div>
                                            <div style={{ fontSize: "16px", paddingLeft: "10px" }}>
                                                <Card sx={{ bgcolor: "#f0f2f5", borderRadius: "20px", boxShadow: "none" }}>
                                                    <div style={{ padding: "10px" }}>
                                                        <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                                            {list.kols_info.name}
                                                        </div>
                                                        <div style={{ fontWeight: 300, fontSize: "13px" }}>
                                                            {list.create_time}
                                                        </div>
                                                        <div style={{ fontWeight: 400, fontSize: "14px", paddingTop: "5px", marginBottom: "-20px" }}>
                                                            <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 500, fontSize: "14px", fontFamily: "Arial" }}>
                                                                {list.content}
                                                            </pre>
                                                        </div>
                                                        {list.url ?
                                                            <div style={{ paddingTop: "10px" }}>
                                                                <img style={{ maxWidth: "300px", height: "auto", borderRadius: "20px" }} src={list.url} />
                                                            </div>
                                                            : ""}
                                                    </div>
                                                </Card>
                                                <div style={{ paddingTop: "5px", paddingLeft: "10px" }}>

                                                    <Stack direction="row" spacing={2}>

                                                        <Tooltip title="Chat">
                                                            <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#1b74e4", cursor: "pointer" } }}
                                                                onClick={(event) => goToMess(list.kols_info.id)}>
                                                                <ChatIcon sx={{ fontSize: 18 }} />
                                                            </Avatar>
                                                        </Tooltip>

                                                        <Tooltip title="Nhận">
                                                            <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#00B14F", cursor: "pointer" } }}
                                                                onClick={(event) => handleAcceptRecruitment(event, list.id, index)}>
                                                                <CheckCircleIcon sx={{ fontSize: 18 }} />
                                                            </Avatar>
                                                        </Tooltip>

                                                        <Tooltip title="Xem trang cá nhân">
                                                            <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#800080", cursor: "pointer" } }}
                                                                onClick={(event) => handleClickSeeProfile(list.kols_info.id)}>
                                                                <AccountCircleIcon sx={{ fontSize: 18 }} />
                                                            </Avatar>
                                                        </Tooltip>

                                                        <Tooltip title="Từ chối">
                                                            <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#DD0000", cursor: "pointer" } }}
                                                                onClick={(event) => handleRejectctRecruitment(event, list.id, index)}>
                                                                <HighlightOffIcon sx={{ fontSize: 18 }} />
                                                            </Avatar>
                                                        </Tooltip>
                                                    </Stack>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div style={{ paddingTop: "20px" }}>
                    <Card sx={{ borderColor: "#00B14F" }} >
                        <div style={{ margin: "10px" }}>
                            <div style={{ fontWeight: 700, color: "#00B14F", fontSize: "14px" }}>
                                Đã nhận: {listAcceptRecruitment.length}
                            </div>
                            <Divider style={{ background: '#00B14F' }} />
                            {listAcceptRecruitment.length > 0 && listAcceptRecruitment.map((list) => (
                                <div key={list.id}>
                                    <div style={{ paddingTop: "10px" }}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div>
                                                <Avatar sx={{ width: 32, height: 32 }} alt="..."
                                                    src={list.kols_info.avatar ? list.kols_info.avatar : "kol.jpg"} />
                                            </div>
                                            <div style={{ fontSize: "16px", paddingLeft: "10px" }}>
                                                <Card sx={{ bgcolor: "#f0f2f5", borderRadius: "20px", boxShadow: "none" }}>
                                                    <div style={{ padding: "10px" }}>
                                                        <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                                            {list.kols_info.name}
                                                        </div>
                                                        <div style={{ fontWeight: 300, fontSize: "13px" }}>
                                                            {list.create_time}
                                                        </div>
                                                        <div style={{ fontWeight: 400, fontSize: "14px", paddingTop: "5px", marginBottom: "-20px" }}>
                                                            <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 500, fontSize: "14px", fontFamily: "Arial" }}>
                                                                {list.content}
                                                            </pre>
                                                        </div>
                                                        {list.url ?
                                                            <div style={{ paddingTop: "10px" }}>
                                                                <img style={{ maxWidth: "300px", height: "auto", borderRadius: "20px" }} src={list.url} />
                                                            </div>
                                                            : ""}
                                                    </div>
                                                </Card>
                                                <div style={{ paddingTop: "5px", paddingLeft: "10px" }}>

                                                    <Stack direction="row" spacing={2}>
                                                        <Tooltip title="Chat">
                                                            <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#1b74e4", cursor: "pointer" } }}
                                                                onClick={(event) => goToMess(list.kols_info.id)}>
                                                                <ChatIcon sx={{ fontSize: 18 }} />
                                                            </Avatar>
                                                        </Tooltip>
                                                        <Tooltip title="Đã Nhận">
                                                            <Avatar sx={{ width: 28, height: 28, bgcolor: "#00B14F" }}>
                                                                <CheckCircleIcon sx={{ fontSize: 18 }} />
                                                            </Avatar>
                                                        </Tooltip>
                                                        <Tooltip title="Xem trang cá nhân">
                                                            <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#800080", cursor: "pointer" } }}
                                                                onClick={(event) => handleClickSeeProfile(list.kols_info.id)}>
                                                                <AccountCircleIcon sx={{ fontSize: 18 }} />
                                                            </Avatar>
                                                        </Tooltip>
                                                        {/* <Tooltip title="Từ chối">
                                                        <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#DD0000" } }}>
                                                            <HighlightOffIcon sx={{ fontSize: 18 }} />
                                                        </Avatar>
                                                    </Tooltip> */}
                                                    </Stack>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                <div style={{ paddingTop: "20px" }}>
                    <Card >
                        <div style={{ margin: "10px" }}>
                            <div style={{ fontWeight: 700, color: "#DD0000", fontSize: "14px" }}>
                                Từ chối: {listRejectRecruitment.length}
                            </div>
                            <Divider style={{ background: '#DD0000' }} />
                            {listRejectRecruitment.length > 0 && listRejectRecruitment.map((list) => (
                                <div key={list.id}>
                                    <div style={{ paddingTop: "10px" }}>
                                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                                            <div>
                                                <Avatar sx={{ width: 32, height: 32 }} alt="..." src="avatar.jpg" />
                                            </div>
                                            <div style={{ fontSize: "16px", paddingLeft: "10px" }}>
                                                <Card sx={{ bgcolor: "#f0f2f5", borderRadius: "20px", boxShadow: "none" }}>
                                                    <div style={{ padding: "10px" }}>
                                                        <div style={{ fontWeight: 500, fontSize: "14px" }}>
                                                            {list.kols_info.name}
                                                        </div>
                                                        <div style={{ fontWeight: 300, fontSize: "13px" }}>
                                                            {list.create_time}
                                                        </div>
                                                        <div style={{ fontWeight: 400, fontSize: "14px", paddingTop: "5px", marginBottom: "-20px" }}>
                                                            <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 500, fontSize: "14px", fontFamily: "Arial" }}>
                                                                {list.content}
                                                            </pre>
                                                        </div>
                                                        {list.url ?
                                                            <div style={{ paddingTop: "10px" }}>
                                                                <img style={{ maxWidth: "300px", height: "auto", borderRadius: "20px" }} src={list.url} />
                                                            </div>
                                                            : ""}
                                                    </div>
                                                </Card>
                                                <div style={{ paddingTop: "5px", paddingLeft: "10px" }}>

                                                    <Stack direction="row" spacing={2}>
                                                        <Tooltip title="Chat">
                                                            <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#1b74e4", cursor: "pointer" } }}
                                                                onClick={(event) => goToMess(list.kols_info.id)}>
                                                                <ChatIcon sx={{ fontSize: 18 }} />
                                                            </Avatar>
                                                        </Tooltip>
                                                        {/* <Tooltip title="Nhận">
                                                            <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#00B14F" } }}>
                                                                <CheckCircleIcon sx={{ fontSize: 18 }} />
                                                            </Avatar>
                                                        </Tooltip> */}
                                                        <Tooltip title="Xem trang cá nhân">
                                                            <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#800080", cursor: "pointer" } }}
                                                                onClick={(event) => handleClickSeeProfile(list.kols_info.id)}>
                                                                <AccountCircleIcon sx={{ fontSize: 18 }} />
                                                            </Avatar>
                                                        </Tooltip>
                                                        <Tooltip title="Đã Từ Chối">
                                                            <Avatar sx={{ width: 28, height: 28, bgcolor: "#DD0000" }}>
                                                                <HighlightOffIcon sx={{ fontSize: 18 }} />
                                                            </Avatar>
                                                        </Tooltip>
                                                    </Stack>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>
                <Modal_See_Profile_Kol
                    idKol={idKolToSeeProfile}
                    isOpen={openModalProfileKOL}
                    isClose={(value) => handleCloseSeeProfile()} />
            </div>
        );
    else {
        return (
            <div>
                Đang tải dữ liệu ...
            </div>
        )
    }
}
