import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../config/const'
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
//icon
import FacebookIcon from '@mui/icons-material/Facebook';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
    display: 'none',
});


export default function AppointmentForDraft(props) {

    let today = new Date();
    let month = today.getMonth() + 1 < 10 ? '0' + (today.getMonth() + 1) : (today.getMonth() + 1);
    let day = today.getDate() < 10 ? '0' + today.getDate() : today.getDate();
    let dateCurent = today.getFullYear() + '-' + month + '-' + day;

    let timeCurent1Hours = today.getHours() + ":" + (today.getMinutes() + 20) + ":" + today.getSeconds();

    let actoken = localStorage.access_token;
    const { id, idKOL, changeSelectImageOrVideo, selectedImage, selectedVideo, content, isOpen, isClose, selectedPage } = props;
    const [dateChoice, setDateChoice] = React.useState(dateCurent);
    const [error, setError] = React.useState(false);
    const [timeChoice, setTimeChoice] = React.useState('07:30');
    const [isSaving, setIsSaving] = React.useState(false);
    const [afterSaving, setAfterSaving] = React.useState(false);


    const handleClose = () => {
        isClose(true);
        setDateChoice(dateCurent);
        setTimeChoice('07:30');
        setError(false);
    };

    const handleCloseAll = () => {
        isClose(true);
        setError(false);
        setAfterSaving(false)
    };

    async function handleSave(event) {
        setError(false);
        let today_new = new Date();
        let month_new = today_new.getMonth() + 1 < 10 ? '0' + (today_new.getMonth() + 1) : (today_new.getMonth() + 1);
        let day_new = today_new.getDate() < 10 ? '0' + today_new.getDate() : today_new.getDate();
        let day_new_plus1 = (today_new.getDate() + 1) < 10 ? '0' + (today_new.getDate() + 1) : (today_new.getDate() + 1);

        let timeCurent1Hours_new;
        let dateCurent_new

        if ((today_new.getHours() + 1) <= 23) {
            timeCurent1Hours_new = (today_new.getHours() + 1) + ":" + today_new.getMinutes() + ":" + today_new.getSeconds();
            dateCurent_new = today_new.getFullYear() + '-' + month_new + '-' + day_new;
        }
        else {
            timeCurent1Hours_new = "00" + ":" + today_new.getMinutes() + ":" + today_new.getSeconds();
            dateCurent_new = today.getFullYear() + '-' + month_new + '-' + day_new_plus1;
        }
        let date_timeChoice = dateChoice + " " + timeChoice + ":" + "00";
        let temp1 = new Date(date_timeChoice)
        let temp2 = new Date(dateCurent_new + " " + timeCurent1Hours_new);
        if (temp1 > temp2) {
            setIsSaving(true)
            //Case có ảnh
            if (props.selectedImage !== null) {
                if (changeSelectImageOrVideo) {
                    var formdata = new FormData();
                    var publich = `${new Date().getTime()}${Math.random()}`

                    formdata.append("file", selectedImage);
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

                    if (json) {
                        fetch(DOMAIN_API + `social/publish-a-draft-post-schedule`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                                "x-access-token": actoken
                            },
                            body: JSON.stringify({
                                postText: content,
                                id_page_social: selectedPage.id_page_social,
                                id_page: selectedPage.id,
                                image_url: json.secure_url,
                                id_kol: idKOL,
                                id: id,
                                video_url: null, time: temp1.getTime() / 1000
                            })
                        })
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    if (result) {
                                        setAfterSaving(true);
                                        setError(false);
                                        isClose(true);
                                        setIsSaving(false)
                                    }
                                })
                    }
                }
                else {
                    fetch(DOMAIN_API + `social/publish-a-draft-post-schedule`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            "x-access-token": actoken
                        },
                        body: JSON.stringify({
                            postText: content,
                            id_page_social: selectedPage.id_page_social,
                            id_page: selectedPage.id,
                            image_url: selectedImage,
                            video_url: null,
                            id_kol: idKOL,
                            id: id,
                            time: temp1.getTime() / 1000
                        })
                    })
                        .then(res => res.json())
                        .then(
                            (result) => {
                                if (result) {
                                    setAfterSaving(true);
                                    setError(false);
                                    isClose(true);
                                    setIsSaving(false)
                                }
                            })
                }
            }
            else {
                //case có video
                if (props.selectedVideo !== null) {
                    if (changeSelectImageOrVideo) {
                        var formdata = new FormData();
                        var publich = `${new Date().getTime()}${Math.random()}`

                        formdata.append("file", selectedVideo);
                        formdata.append("cloud_name", CLOUDINARY_NAME);
                        formdata.append("upload_preset", PRESET_NAME);
                        formdata.append("public_id", publich);

                        let res = await fetch(
                            "https://api.cloudinary.com/v1_1/kolcloudinary/video/upload",
                            {
                                method: "post",
                                mode: "cors",
                                body: formdata
                            }
                        );
                        let json = await res.json();

                        if (json) {
                            fetch(DOMAIN_API + `social/publish-a-draft-post-schedule`, {
                                method: "POST",
                                headers: {
                                    'Content-Type': 'application/json',
                                    "x-access-token": actoken
                                },
                                body: JSON.stringify({
                                    postText: content,
                                    id_page_social: selectedPage.id_page_social,
                                    id_page: selectedPage.id,
                                    video_url: json.secure_url,
                                    image_url: null,
                                    id_kol: idKOL,
                                    id: id,
                                    time: temp1.getTime() / 1000
                                })
                            })
                                .then(res => res.json())
                                .then(
                                    (result) => {
                                        if (result) {
                                            setAfterSaving(true);
                                            setError(false);
                                            isClose(true);
                                            setIsSaving(false)
                                        }
                                    })
                        }
                    }
                    else {
                        fetch(DOMAIN_API + `social/publish-a-draft-post-schedule`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                                "x-access-token": actoken
                            },
                            body: JSON.stringify({
                                postText: content,
                                id_page_social: selectedPage.id_page_social,
                                id_page: selectedPage.id,
                                video_url: selectedVideo,
                                image_url: null,
                                id_kol: idKOL,
                                id: id,
                                time: temp1.getTime() / 1000
                            })
                        })
                            .then(res => res.json())
                            .then(
                                (result) => {
                                    if (result) {
                                        setAfterSaving(true);
                                        setError(false);
                                        isClose(true);
                                        setIsSaving(false)
                                    }
                                })
                    }
                }
                else {
                    //Case ko có ảnh và video

                    fetch(DOMAIN_API + `social/publish-a-draft-post-schedule`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                            "x-access-token": actoken
                        },
                        body: JSON.stringify({
                            postText: content,
                            id_page_social: selectedPage.id_page_social,
                            id_page: selectedPage.id,
                            video_url: null,
                            image_url: null,
                            id_kol: idKOL,
                            id: id,
                            time: temp1.getTime() / 1000
                        })
                    })
                        .then(res => res.json())
                        .then(
                            (result) => {
                                if (result) {
                                    setAfterSaving(true);
                                    setError(false);
                                    isClose(true);
                                    setIsSaving(false)

                                }
                            })
                }
            }
        }

        else {
            setError(true);
            setIsSaving(false)
        }

    };


    return (
        <div>

            <Dialog
                fullWidth
                open={isOpen}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>Lên lịch đăng bài</DialogTitle>
                <DialogContent>
                    <div>
                        Lên lịch đăng bài viết vào thời gian phù hợp nhất để tương tác với nhiều khách hàng hơn. Bạn tự chọn ngày giờ đăng bài trong tương lai.
                    </div>
                    <div style={{ fontSize: "13px", paddingTop: "10px" }}>
                        *Lưu ý: Thời gian lên lịch cách thời điểm hiện tại ít nhất 1 tiếng.
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                        <FacebookIcon sx={{ color: "#0571ed", fontSize: "20px" }} /> Facebook
                    </div>
                    <div style={{ paddingTop: "15px" }}>
                        <Stack direction="row" spacing={1} noValidate>
                            <TextField
                                width="50%"
                                id="date"
                                label="Ngày (mm/dd/yyyy)"
                                type="date"
                                defaultValue={dateCurent}
                                sx={{ width: "50%" }}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                onChange={(e) => { setDateChoice(e.target.value) }}
                            />
                            <TextField
                                id="time"
                                label="Giờ"
                                type="time"
                                defaultValue='07:30'
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                inputProps={{
                                    step: 300, // 5 min
                                }}
                                sx={{ width: "50%" }}
                                onChange={(e) => { setTimeChoice(e.target.value) }}
                            />
                        </Stack>
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                        {error ?
                            <div style={{ color: "red" }}>
                                Ngày, giờ đăng lịch chưa đúng theo quy định.
                            </div>
                            : ""}
                    </div>
                </DialogContent>
                {isSaving ?
                    <div style={{ textAlign: "center", paddingBottom: "30px" }}>
                        <div style={{ marginTop: "20px" }}>
                            <CircularProgress size="2rem" />
                            <span style={{ paddingLeft: "20px", paddingBottom: "5px" }}>Đang lưu vào danh sách lên lịch ...</span>
                        </div>
                    </div>
                    :
                    <DialogActions>
                        <Button
                            sx={{ color: "#DD2D34" }}
                            autoFocus onClick={handleClose}>
                            Hủy
                        </Button>
                        <Button
                            onClick={handleSave}>
                            Xác nhận lên lịch
                        </Button>
                    </DialogActions>
                }

            </Dialog>


        </div>
    );
}
