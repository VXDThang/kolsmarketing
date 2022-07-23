import * as React from 'react';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { Avatar } from '@mui/material';
import moment from 'moment'
//file
import './General.css';

//icon
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

export default function General_Info({ detail }) {

    const [editInfo, setEditInfo] = React.useState(false);
    const [listBio, setListBio] = React.useState(detail?.bio_url);

    const handleOpenEditInfoModal = () => setEditInfo(true);
    const handleCloseEditInfoModal = () => setEditInfo(false);
    return (
        <div>
            <div className='d-flex justify-content-center' style={{ paddingTop: "15px" }}>
                {detail.avatar ?
                    <div >
                        <img id='avatar_kol' src={detail.avatar} />
                    </div>
                    :
                    <div >
                        <img id='avatar_kol' src="kol.jpg" />
                    </div>
                }
            </div>
            <div className='d-flex justify-content-center' style={{ paddingTop: "5px" }}>
                <div style={{ fontWeight: "600", fontSize: "20px" }}>
                    {detail.full_name ? detail.full_name : "Bạn chưa điền tên cho mình"}
                </div>
                <div style={{ fontWeight: "400", fontSize: "20px" }}>
                    {detail.nick_name ? "(" + detail.nick_name + ")" : ""}
                </div>
            </div>
            <div style={{ paddingTop: "15px" }}>
                <Divider style={{ margin: "-10px" }} />
            </div>

            <div className='d-flex justify-content-between' style={{ paddingTop: "15px" }}>
                <div style={{ fontWeight: "bold", }}>
                    Giới thiệu
                </div>

            </div>

            <div style={{ paddingTop: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={1.5}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                            <EventNoteIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs={10.5}>

                        <div style={{ fontSize: "15px", marginTop: "4px" }}>
                            {detail.birthday ? moment(detail.birthday).add(12, 'hours').format("DD/MM/YYYY") : "Chưa có thông tin"}
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div style={{ paddingTop: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={1.5}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                            <AccountCircleIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs={10.5}>

                        <div style={{ fontSize: "15px", marginTop: "4px" }}>
                            {detail.gender ? detail.gender : "Chưa có thông tin"}
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div style={{ paddingTop: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={1.5}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                            <PhoneIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs={10.5}>

                        <div style={{ fontSize: "15px", marginTop: "4px" }}>
                            {detail.phone ? detail.phone : "Chưa có thông tin"}
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div style={{ paddingTop: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={1.5}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                            <AlternateEmailIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs={10.5}>

                        <div style={{ fontSize: "15px", marginTop: "4px" }}>
                            {detail.email ? detail.email : "Chưa có thông tin"}
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div style={{ paddingTop: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={1.5}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                            <LocationOnIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs={10.5}>

                        <div style={{ fontSize: "15px", marginTop: "4px" }}>
                            {detail.address ? detail.address : "Chưa có thông tin"}
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div style={{ paddingTop: "25px" }}>
                <Divider style={{ margin: "-10px" }} />
            </div>

            <div className='d-flex justify-content-between' style={{ paddingTop: "10px" }}>
                <div style={{ fontWeight: "bold", }}>
                    Bio Link
                </div>
            </div>

            <div>
                {detail.bio_url.length > 0 ?
                <div>
                    {detail.bio_url.map((data, index) => (
                        <div key={index} style={{ paddingTop: "10px" }}>
                            <Grid container spacing={2}>
                                <Grid item xs={1.5}>
                                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                        <InsertLinkIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                                    </Avatar>
                                </Grid>
                                <Grid item xs={10.5}>

                                    <div style={{ fontSize: "15px", marginTop: "4px", wordWrap: "break-word" }}>
                                        {data}
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    ))}
                </div>
                    : "Chưa có thông tin"}
            </div>
            {/* <div style={{ paddingTop: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={1.5}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                            <FacebookIcon sx={{ fontSize: 18, color: "#036EE4" }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs={10.5}>

                        <div style={{ fontSize: "15px", marginTop: "4px", wordWrap: "break-word" }}>
                            https://www.facebook.com/DucThangVoXuan/
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div style={{ paddingTop: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={1.5}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                            <InstagramIcon sx={{ fontSize: 18, color: "#E84A37" }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs={10.5}>

                        <div style={{ fontSize: "15px", marginTop: "4px", wordWrap: "break-word" }}>
                            https://www.instagram.com/voxuanducthang/
                        </div>
                    </Grid>
                </Grid>
            </div>

            <div style={{ paddingTop: "10px" }}>
                <Grid container spacing={2}>
                    <Grid item xs={1.5}>
                        <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                            <InsertLinkIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                        </Avatar>
                    </Grid>
                    <Grid item xs={10.5}>

                        <div style={{ fontSize: "15px", marginTop: "4px", wordWrap: "break-word" }}>
                            https://www.tiktok.com/@tom12344321
                        </div>
                    </Grid>
                </Grid>
            </div> */}

        </div >

    );
}
