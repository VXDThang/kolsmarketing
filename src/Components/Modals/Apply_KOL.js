import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../config/const'
import { styled } from '@mui/material/styles';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';
//icon
import AttachmentIcon from '@mui/icons-material/Attachment';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
    display: 'none',
});


export default function Apply_KOL(props) {
    let actoken = localStorage.access_token;
    const { isApply, isOpen, isClose, idPost, idBrand } = props;
    const [content, setContent] = React.useState('');
    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageShow, setImageShow] = React.useState(null);
    const [imageToData, setImageToData] = React.useState(null);
    const [loading, setLoading] = React.useState(false);

    const [err, setErr] = React.useState(false);

    const handleWriteContent = (value) => {
        setErr(false);
        setContent(value);
    }

    const handleClose = () => {
        setErr(false);
        isClose(false);
        setContent('');
        setSelectedImage(null);
        setImageShow(null);
        setImageToData(null);
        setLoading(false);
    };


    async function handleSubmit() {
        if (content == '') {
            setErr(true)
        }
        else {
            setLoading(true);
            let json;
            if (selectedImage) {
                var formdata = new FormData();
                var publich = `${new Date().getTime()}${Math.random()}`

                formdata.append("file", selectedImage);
                formdata.append("cloud_name", CLOUDINARY_NAME);
                formdata.append("upload_preset", PRESET_NAME);
                formdata.append("public_id", publich);

                await fetch(
                    "https://api.cloudinary.com/v1_1/kolcloudinary/image/upload",
                    {
                        method: "post",
                        mode: "cors",
                        body: formdata
                    }
                ).then(res => res.json())
                    .then(
                        (result) => {
                            if (result) {
                                json = result.secure_url;
                            }
                        }
                    ).catch(error => {
                        console.log("Error: ", error);
                    })
                    ;
            }

            await fetch(DOMAIN_API + `recruitments/create-recruitment`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ files: json ? json : null, content: content, id_post: idPost, id_brands: idBrand })
            })
                .then(res => res.json())
                .then(
                    (result2) => {
                        if (result2) {
                            setLoading(false);
                            isApply(true)
                            handleClose();
                            handleClickOpenAlertDialog();
                        }
                    }
                ).catch(error => {
                    console.log("Error: ", error);
                })
        }
    }

    const handleClickOpenAlertDialog = () => {
        setOpenAlertDialog(true);
    };

    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
        isApply(true);
    };

    const fileSelectHandler = async (event) => {
        setImageShow(URL.createObjectURL(event.target.files[0]));
        setSelectedImage(event.target.files[0]);
        //handleSubmitImage(event.target.files[0])
    };

    return (
        <div>

            <Dialog
                fullWidth
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>Đăng ký ứng tuyển</DialogTitle>

                <DialogContent style={{ cursor: 'move', }} id="draggable-dialog-title">
                    {
                        err ?
                            <div style={{ fontWeight: 600, color: "red" }}>
                                Cần điền thông tin mục Lời nhắn
                            </div>
                            : ""
                    }
                    <div style={{ paddingTop: "20px" }} >
                        <TextField
                            fullWidth
                            id="outlined-multiline-static"
                            label="Lời nhắn *"
                            multiline
                            rows={4}
                            value={content}
                            onChange={(event) => { handleWriteContent(event.target.value) }}
                        />
                    </div>
                    {imageShow ?
                        <div style={{ paddingTop: "20px", color: "#00B14F" }}>
                            <label htmlFor="contained-button-file" >
                                <Input accept="image/*" id="contained-button-file" type="file"
                                    onChange={fileSelectHandler} />
                                <div style={{ cursor: "pointer", fontWeight: "600" }}>
                                    Chọn file ảnh khác <AttachmentIcon />
                                </div>
                            </label>
                        </div>
                        :
                        <div style={{ paddingTop: "20px", color: "#00B14F" }}>
                            <label htmlFor="contained-button-file" >
                                <Input accept="image/*" id="contained-button-file" type="file"
                                    onChange={fileSelectHandler} />
                                <div style={{ cursor: "pointer", fontWeight: "600" }}>
                                    Đính kèm 1 file ảnh <AttachmentIcon />
                                </div>
                            </label>
                        </div>}


                    <div style={{ color: "#333333", fontSize: "13px" }}>
                        Không bắt buộc! Gửi ảnh giúp nhãn hàng hiểu hơn về bạn.
                    </div>

                    {imageShow ?
                        <div style={{ paddingTop: "20px" }} >
                            <img src={imageShow} width="100%" height="auto" />
                        </div>
                        : ""}

                </DialogContent>

                <div className='d-flex justify-content-center'  >
                    {loading ?
                        <div style={{ marginTop: "20px" }}>
                            <CircularProgress size="2rem" />
                        </div> : ""
                    }
                </div>

                <DialogActions>
                    <Button
                        sx={{ color: "#DD2D34" }}
                        autoFocus onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        sx={{ color: "#00B14F" }}
                        onClick={handleSubmit}>Gửi</Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openAlertDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAlertDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Đã gửi thành công"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseAlertDialog}>Tắt</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
