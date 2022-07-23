import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
//file
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const';

const Input = styled('input')({
    display: 'none',
});

const InputCover = styled('input')({
    display: 'none',
});

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
   min-height: calc(100vh - 105px);
  font-size: 14px; 
  border-radius: 5px;
  border: 1px solid rgb(230, 230, 230);
`;

export default function ImageSetting({ detailProfile }) {
    let actoken = localStorage.access_token;

    const [selectedImageAvatar, setSelectedImageAvatar] = React.useState(null);
    const [imageShowAvatar, setImageShowAvatar] = React.useState(detailProfile.avatar);
    const [imageAvatarToData, setImageAvatarToData] = React.useState(null);

    const [selectedImageCover, setSelectedImageCover] = React.useState(null);
    const [imageShowCover, setImageShowCover] = React.useState(detailProfile.cover);
    const [imageCoverToData, setImageCoverToData] = React.useState(null);

    const [editAvatar, setEditAvatar] = React.useState(false);
    const [editCover, setEditCover] = React.useState(false);

    const [loadingAvatar, setLoadingAvatar] = React.useState(false);
    const [loadingCover, setLoadingCover] = React.useState(false);

    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);

    const handleClickOpenAlertDialog = () => {
        setOpenAlertDialog(true);
    };

    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
        setEditAvatar(false);
        setEditCover(false);

    };

    const handleDeleteImageAvatar = () => {
        setEditAvatar(false);
        setImageShowAvatar(detailProfile.avatar);
        setImageAvatarToData(null);
        setSelectedImageAvatar(null);
        setLoadingAvatar(false);
    };

    const handleDeleteImageCover = () => {
        setEditCover(false);
        setImageShowCover(detailProfile.cover);
        setImageCoverToData(null);
        setSelectedImageCover(null);
        setLoadingCover(false);
    };

    const fileSelectHandleToCover = (event) => {
        setImageShowCover(URL.createObjectURL(event.target.files[0]));
        setSelectedImageCover(event.target.files[0]);
        setEditCover(true);
    };

    async function handleEditCover() {

        setLoadingCover(true)
        var formdata = new FormData();
        var publich = `${new Date().getTime()}${Math.random()}`

        formdata.append("file", selectedImageCover);
        formdata.append("cloud_name", CLOUDINARY_NAME);
        formdata.append("upload_preset", PRESET_NAME);
        formdata.append("public_id", publich);

        let res = await fetch(
            "https://api.cloudinary.com/v1_1/kolcloudinary/image/upload",
            {
                method: "post",
                mode: "cors",
                body: formdata
            }
        );

        let json = await res.json();

        fetch(DOMAIN_API + `brands/update-cover`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ cover: json.secure_url })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        detailProfile.cover = json.secure_url;
                        handleClickOpenAlertDialog();
                        setLoadingCover(false);
                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
    }



    const fileSelectHandleToAvatar = (event) => {
        setImageShowAvatar(URL.createObjectURL(event.target.files[0]));
        setSelectedImageAvatar(event.target.files[0]);
        setEditAvatar(true);
    };

    async function handleEditAvatar() {

        setLoadingAvatar(true)
        var formdata = new FormData();
        var publich = `${new Date().getTime()}${Math.random()}`

        formdata.append("file", selectedImageAvatar);
        formdata.append("cloud_name", CLOUDINARY_NAME);
        formdata.append("upload_preset", PRESET_NAME);
        formdata.append("public_id", publich);

        let res = await fetch(
            "https://api.cloudinary.com/v1_1/kolcloudinary/image/upload",
            {
                method: "post",
                mode: "cors",
                body: formdata
            }
        );

        let json = await res.json();
        fetch(DOMAIN_API + `brands/update-avatar`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ avatar: json.secure_url })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        detailProfile.avatar = json.secure_url;
                        handleClickOpenAlertDialog();
                        setLoadingAvatar(false);
                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
    }


    return (
        <SidebarStyled>
            <div style={{ padding: "10px" }}>
                <div style={{ fontSize: "16px", fontWeight: "700", paddingBottom: "10px" }}>
                    Cài đặt hình ảnh
                </div>
                <div>
                    <Divider sx={{ color: "#00B14F" }} />
                </div>
                <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Grid container sx={{
                        paddingTop: "10px", paddingBottom: "10px", paddingLeft: "20px",
                        "&:hover": { bgcolor: "#F1F2F6" }
                    }}>
                        <Grid
                            display="flex"
                            justifyContent="left"
                            alignItems="center"
                            item xs={2}>
                            <span style={{ fontWeight: 500 }}>
                                Ảnh đại diện</span>
                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            item xs={8}>

                            <div>
                                {imageShowAvatar ?
                                    <div >
                                        <div>
                                            <img id='avatar_kol' src={imageShowAvatar} />
                                        </div>

                                        {loadingAvatar ?
                                            <div className="d-flex justify-content-center" style={{ paddingTop: "10px" }}>
                                                <CircularProgress />
                                            </div> : ""
                                        }
                                        {editAvatar ?
                                            <div className="d-flex justify-content-center" style={{ paddingTop: "10px" }}>
                                                <Button
                                                    variant="contained" color="success"
                                                    sx={{ backgroundColor: "#00B14F", marginTop: "15px" }}
                                                    onClick={handleEditAvatar}>
                                                    Cập nhật
                                                </Button>
                                            </div>
                                            : ""}


                                    </div>
                                    :
                                    <div style={{ fontSize: "14px" }}>
                                        Chưa có ảnh, nhấn chỉnh sửa để chọn ảnh từ thiết bị
                                    </div>
                                } </div>
                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            item xs={2}>

                            <div>
                                {editAvatar ?
                                    <div className="d-flex justify-content-between">
                                        <div style={{ cursor: "pointer", color: "#DD0000", fontWeight: "500", paddingRight: "40px" }}
                                            onClick={handleDeleteImageAvatar}>
                                            Hủy
                                        </div>
                                        <label htmlFor="avatar-image" >
                                            <Input accept="image/*" id="avatar-image" type="file"
                                                onChange={(event) => fileSelectHandleToAvatar(event)} />
                                            <div style={{ cursor: "pointer", color: "#00B14F", fontWeight: "500" }}>
                                                Đổi
                                            </div>
                                        </label>
                                    </div>
                                    :
                                    <label htmlFor="avatar-image" >
                                        <Input accept="image/*" id="avatar-image" type="file"
                                            onChange={(event) => fileSelectHandleToAvatar(event)} />
                                        <div style={{ cursor: "pointer", color: "#00B14F" }}>
                                            Chỉnh sửa
                                        </div>
                                    </label>
                                }
                            </div>

                        </Grid>
                    </Grid>
                </div>
                <Divider sx={{ color: "#00B14F" }} />

                <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Grid container sx={{
                        paddingTop: "10px", paddingBottom: "10px", paddingLeft: "20px",
                        "&:hover": { bgcolor: "#F1F2F6" }
                    }}>
                        <Grid
                            display="flex"
                            justifyContent="left"
                            alignItems="center"
                            item xs={2}>
                            <span style={{ fontWeight: 500 }}>
                                Ảnh bìa</span>
                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            item xs={8}>

                            <div>
                                {imageShowCover ?
                                    <div >
                                        <div>
                                            <img src={imageShowCover} width="100%" height="auto" />
                                        </div>

                                        {loadingCover ?
                                            <div className="d-flex justify-content-center" style={{ paddingTop: "10px" }}>
                                                <CircularProgress />
                                            </div> : ""
                                        }
                                        {editCover ?
                                            <div className="d-flex justify-content-center" style={{ paddingTop: "10px" }}>
                                                <Button
                                                    variant="contained" color="success"
                                                    sx={{ backgroundColor: "#00B14F", marginTop: "15px" }}
                                                    onClick={handleEditCover}>
                                                    Cập nhật
                                                </Button>
                                            </div>
                                            : ""}


                                    </div>
                                    :
                                    <div style={{ fontSize: "14px" }}>
                                        Chưa có ảnh, nhấn chỉnh sửa để chọn ảnh từ thiết bị
                                    </div>
                                } </div>
                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            item xs={2}>

                            <div>
                                {editCover ?
                                    <div className="d-flex justify-content-between">
                                        <div style={{ cursor: "pointer", color: "#DD0000", fontWeight: "500", paddingRight: "40px" }}
                                            onClick={handleDeleteImageCover}>
                                            Hủy
                                        </div>
                                        <label htmlFor="cover-image" >
                                            <Input accept="image/*" id="cover-image" type="file"
                                                onChange={(event) => fileSelectHandleToCover(event)} />
                                            <div style={{ cursor: "pointer", color: "#00B14F", fontWeight: "500" }}>
                                                Đổi
                                            </div>
                                        </label>
                                    </div>
                                    :
                                    <label htmlFor="cover-image" >
                                        <Input accept="image/*" id="cover-image" type="file"
                                            onChange={(event) => fileSelectHandleToCover(event)} />
                                        <div style={{ cursor: "pointer", color: "#00B14F" }}>
                                            Chỉnh sửa
                                        </div>
                                    </label>
                                }
                            </div>

                        </Grid>
                    </Grid>
                </div>
                <Divider sx={{ color: "#00B14F" }} />






            </div>

            <Dialog
                open={openAlertDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAlertDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Đã cập nhật thành công"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseAlertDialog}>Tắt</Button>
                </DialogActions>
            </Dialog>
        </SidebarStyled>
    );
}