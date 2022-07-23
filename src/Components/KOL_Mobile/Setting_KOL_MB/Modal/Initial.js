import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../../config/const'

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';

//icon
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const Input = styled('input')({
    display: 'none',
});

export default function Initial(props) {
    let actoken = localStorage.access_token;
    const { isCloseModal, profile } = props;
    const [canSee, setCanSee] = React.useState(false);
    const [name, setName] = React.useState(profile.full_name);
    const [selectedImage, setSelectedImage] = React.useState(null);
    const [imageShow, setImageShow] = React.useState(profile.avatar);
    const [imageToData, setImageToData] = React.useState(null);

    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const handleClose = () => {
        isCloseModal(true);
    };

    const handleClickOpenAlertDialog = () => {
        setOpenAlertDialog(true);
    };

    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
    };

    async function handleEdit() {
        setLoading(true)
        // handleSubmitImage(selectedImage);

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


        fetch(DOMAIN_API + `kols/edit-fullname`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ fullname: name })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                }
            ).catch(error => {
                console.log("Error: ", error);
            })

        fetch(DOMAIN_API + `kols/update-avatar`, {
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
                        setLoading(false);
                        handleClickOpenAlertDialog();
                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })


    }

    const fileSelectHandler = async (event) => {
        setImageShow(URL.createObjectURL(event.target.files[0]));
        setSelectedImage(event.target.files[0]);
    };

    async function handleSubmitImage(file) {

        let files = []
        var formdata = new FormData();
        var publich = `${new Date().getTime()}${Math.random()}`

        formdata.append("file", file);
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
                        setImageToData(result.secure_url);
                    }
                }
            )
            ;
    };

    return (
        <div>

            <div style={{ fontWeight: "600" }}>Chỉnh sửa hồ sơ</div>
            <div style={{ maxWidth: "320px", paddingTop: "10px" }}>


                <div style={{ paddingTop: "5px" }} >
                    <div style={{ paddingTop: "5px" }} >
                        <TextField
                            size="small"
                            fullWidth
                            id="outlined-multiline-static"
                            label="Họ và tên"
                            multiline
                            rows={1}
                            value={name}
                            onChange={(event) => { setName(event.target.value) }}
                        />
                    </div>
                </div>

                <div style={{ paddingTop: "25px" }} >


                    <div className='d-flex justify-content-between'>
                        <div style={{ fontWeight: "400", fontSize: "15px" }}>
                            Ảnh đại diện
                        </div>
                        <div style={{ cursor: "pointer", color: "#00B14F" }} >
                            <label htmlFor="contained-button-file" >
                                <Input accept="image/*" id="contained-button-file" type="file"
                                    onChange={fileSelectHandler} />
                                <div style={{ cursor: "pointer" }}>
                                    Chỉnh sửa
                                </div>
                            </label>
                        </div>
                    </div>
                    <div className='d-flex justify-content-center' style={{ paddingTop: "15px" }}>
                        {loading ?
                            <div>
                                <CircularProgress />
                            </div> :
                            imageShow ? <div >
                                <img id='avatar_kol' src={imageShow} />
                            </div> :
                                <div style={{ fontSize: "14px" }}>
                                    Chưa có ảnh đại diện, nhấn chỉnh sửa để chọn ảnh từ thiết bị
                                </div>
                        }
                    </div>
                </div>


                <div className='d-flex justify-content-center' style={{ marginTop: "20px" }}>
                    <Button
                        variant="outlined"
                        sx={{ color: "#DD2D34" }}
                        autoFocus onClick={handleClose}>
                        Thoát
                    </Button>
                    <Button
                        variant="contained" color="success"
                        sx={{ backgroundColor: "#00B14F", marginLeft: "15px" }}
                        onClick={handleEdit}>Xác nhận</Button>
                </div>
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
        </div>
    );
}
