import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Zoom from 'react-medium-image-zoom'
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { Grid } from '@mui/material';
import { DOMAIN_API } from '../../config/const'
import { Avatar } from '@mui/material';
import moment from 'moment';
import Tooltip from '@mui/material/Tooltip';
import DialogTitle from '@mui/material/DialogTitle';
//icon
import EventNoteIcon from '@mui/icons-material/EventNote';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import CloseIcon from '@mui/icons-material/Close';

export default function See_Profile_Kol(props) {
    const { isOpen, isClose, idKol } = props;
    let actoken = localStorage.access_token;

    const [open, setOpen] = React.useState(isOpen);

    const [profileKOL, setProfileKOL] = React.useState(null);
    const [loadingDetail, setLoadingDetail] = React.useState(true);

    async function getprofileKOL(id_kol) {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `kols/kol-info`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_kol: id_kol })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setProfileKOL(result);
                    }
                )
        }
        catch (error) {
            console.log("error: ", error)
        }
        finally {
            setLoadingDetail(false)
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        isClose(false);
    };

    useEffect(() => {
        getprofileKOL(idKol)
    }, [isOpen, idKol]);

    return (
        <div>
            <Dialog 
            fullWidth 
            maxWidth={'md'}
            open={isOpen} 
            onClose={handleClose}>               
                
                <DialogTitle>
                <div className='d-flex justify-content-between'>
                    <div>Xem trang cá nhân
                    </div>
                    <div>
                        <Tooltip title="Thoát">
                            <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#CCCCCC", cursor: "pointer" } }}
                                onClick={handleClose}>
                                <CloseIcon sx={{ fontSize: 18 }} />
                            </Avatar>
                        </Tooltip>
                    </div>
                </div>
                </DialogTitle>
                <div>
                    <Divider />
                </div>

                <DialogContent
                sx={{backgroundColor:"#f0f2f5"}}>

                    {/* ============================================ */}

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
                                        </div>

                                        <div className='d-flex justify-content-center' style={{ paddingTop: "5px" }}>
                                            <div style={{ fontSize: "14px" }}>
                                                {profileKOL?.count_followers ? <span>  <span style={{ fontWeight: "600" }}> {profileKOL.count_followers} </span> Nhãn hàng theo dõi </span> : ""}
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
                                            {profileKOL?.bio_url?.length > 0 ?
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



                            {/* <div className='d-flex justify-content-between'>
                        <div style={{ fontWeight: "600", fontSize: "18px", paddingTop: "5px" }}>
                            Bạn đang xem Kol {profileKOL?.full_name ?
                                <span style={{ color: "#00b14f", fontWeight: 600, fontSize: "20px" }}>{profileKOL.full_name}</span>
                                : ""}
                        </div>
                    </div> */}

                            <div style={{ paddingTop: "0px" }}>
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
                                    <div style={{ padding: "10px", height: "80vh", overflowY: "auto" }}>
                                        <div className='d-flex justify-content-between'>
                                            <div style={{ fontWeight: "bold", }}>
                                                Danh sách ảnh
                                            </div>
                                        </div>
                                        {profileKOL?.detail_images?.length > 0 ?
                                            <div style={{ paddingTop: "10px" }}>
                                                <Grid container spacing={1}>
                                                    {profileKOL.detail_images.map((item, index) => (
                                                        <Grid item xs={6} textAlign="center">
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



                </DialogContent>
                {/* <div style={{ paddingRight: "10px", paddingTop: "8px" }}>
                    <DialogActions>
                        <Button onClick={() => isClose(false)} variant="contained" color="secondary">Tắt</Button>
                    </DialogActions>
                </div> */}

            </Dialog>
        </div>
    );
}
