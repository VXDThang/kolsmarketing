import * as React from 'react';
import Zoom from 'react-medium-image-zoom'
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { Avatar } from '@mui/material';
import moment from 'moment';

//icon
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertLinkIcon from '@mui/icons-material/InsertLink';

export default function PageKOL({ profileKOL }) {

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={4.5}>
                    <Card sx={{ borderColor: '#00B14F' }} >
                        <div style={{ padding: "10px" }}>
                            <div>
                                <div className='d-flex justify-content-center' style={{ paddingTop: "15px" }}>
                                    {profileKOL?.avatar ?
                                        <div >
                                            <img id='avatar_kol' src={profileKOL.avatar} />
                                        </div>
                                        :
                                        <div >
                                            <img id='avatar_kol' src="kol.jpg" />
                                        </div>
                                    }
                                </div>
                                <div className='d-flex justify-content-center' style={{ paddingTop: "5px" }}>
                                    <div style={{ fontWeight: "600", fontSize: "20px" }}>
                                        {profileKOL?.full_name ? profileKOL.full_name : "Không có tên"}
                                    </div>
                                    <div style={{ fontWeight: "400", fontSize: "20px" }}>
                                        {profileKOL?.nick_name ? "(" + profileKOL.nick_name + ")" : ""}
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
                                        <Grid item xs={2}>
                                            <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                                <EventNoteIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={10}>

                                            <div style={{ fontSize: "15px", marginTop: "4px" }}>
                                                {profileKOL?.birthday ? moment(profileKOL.birthday).format("DD/MM/YYYY") : "Chưa có thông tin"}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>

                                <div style={{ paddingTop: "10px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                                <AccountCircleIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={10}>

                                            <div style={{ fontSize: "15px", marginTop: "4px" }}>
                                                {profileKOL?.gender ? profileKOL.gender : "Chưa có thông tin"}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>

                                <div style={{ paddingTop: "10px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                                <PhoneIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={10}>

                                            <div style={{ fontSize: "15px", marginTop: "4px" }}>
                                                {profileKOL?.phone ? profileKOL.phone : "Chưa có thông tin"}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>

                                <div style={{ paddingTop: "10px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                                <AlternateEmailIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={10}>

                                            <div style={{ fontSize: "15px", marginTop: "4px" }}>
                                                {profileKOL?.email ? profileKOL.email : "Chưa có thông tin"}
                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>

                                <div style={{ paddingTop: "10px" }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={2}>
                                            <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                                <LocationOnIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                                            </Avatar>
                                        </Grid>
                                        <Grid item xs={10}>

                                            <div style={{ fontSize: "15px", marginTop: "4px" }}>
                                                {profileKOL?.address ? profileKOL.address : "Chưa có thông tin"}
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
                                    {profileKOL?.bio_url.length > 0 ?
                                        <div>
                                            {profileKOL.bio_url.map((data, index) => (
                                                <div key={index} style={{ paddingTop: "10px" }}>
                                                    <Grid container spacing={2}>
                                                        <Grid item xs={2}>
                                                            <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                                                <InsertLinkIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                                                            </Avatar>
                                                        </Grid>
                                                        <Grid item xs={10}>

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

                            </div >
                        </div>
                    </Card>
                </Grid>
                <Grid item xs={7.5}>



                    <div className='d-flex justify-content-between'>
                        <div style={{ fontWeight: "600", fontSize: "18px", paddingTop: "5px" }}>
                            Bạn đang xem Kol {profileKOL?.full_name ? 
                            <span style={{color:"#2c6975", fontWeight:600, fontSize:"20px"}}>{profileKOL.full_name}</span>
                             : ""}
                        </div>

                    </div>

                    <div style={{ paddingTop: "15px" }}>
                        <Card sx={{ borderColor: '#00B14F' }} >
                            <div style={{ padding: "10px" }}>
                                <div className='d-flex justify-content-between'>
                                    <div style={{ fontWeight: "bold", }}>
                                        Mô tả
                                    </div>
                                </div>
                                <div>
                                    <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 500, fontSize: "14px", fontFamily: "Arial" }}>
                                        {profileKOL?.introduce ? profileKOL.introduce : "Chưa có thông tin"}
                                    </pre>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div style={{ paddingTop: "15px" }}>
                        <Card sx={{ borderColor: '#00B14F' }} >
                            <div style={{ padding: "10px", height: "80vh", overflowY: "scroll" }}>
                                <div className='d-flex justify-content-between'>
                                    <div style={{ fontWeight: "bold", }}>
                                        Danh sách ảnh
                                    </div>
                                </div>
                                {profileKOL?.detail_images.length > 0 ?
                                    <div style={{ paddingTop: "10px" }}>
                                        <Grid container spacing={1}>
                                            {profileKOL.detail_images.map((item, index) => (
                                                <Grid item xs={12} textAlign="center">
                                                    <Zoom>
                                                        <div key={index}>
                                                            <img id="image_kol"
                                                                src={item}
                                                                srcSet={item}
                                                                alt={item}
                                                                loading="lazy"
                                                            />
                                                        </div>
                                                    </Zoom>
                                                </Grid>
                                            ))}

                                        </Grid>
                                    </div>
                                    : "Chưa có thông tin"}
                            </div>
                        </Card>
                    </div>
                </Grid >
            </Grid >
        </div >
    );
}
