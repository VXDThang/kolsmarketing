import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { styled, useTheme } from '@mui/material/styles';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../../config/const'
import DialogTitle from '@mui/material/DialogTitle';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import CircularProgress from '@mui/material/CircularProgress';

//icon
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';

const Input = styled('input')({
    display: 'none',
});

const commonStyles = {
    border: 1,
    width: 'full',
    height: '160px',
};

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function List_Image(props) {
    let actoken = localStorage.access_token;
    const { isCloseModal, imageList } = props;
    const [choiceImage, setChoiceImage] = React.useState(imageList);
    const [dataImage, setDataImage] = React.useState(imageList);
    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
    const [openAlertDialogFail, setOpenAlertDialogFail] = React.useState(false);
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

    const handleClickOpenAlertDialogFail = () => {
        setOpenAlertDialogFail(true);
    };

    const handleCloseAlertDialogFail = () => {
        setOpenAlertDialogFail(false);
    };

    const fileSelectHandler = async (event) => {
        var list = choiceImage.length ? [...choiceImage] : [];
        var dataList = choiceImage.length ? [...choiceImage] : [];
        for (let i = 0; i < event.target.files.length; i++) {
            list.push(URL.createObjectURL(event.target.files[i]));
            dataList.push(event.target.files[i]);
        }

        // setChoiceImage(URL.createObjectURL(event.target.files[0]))
        var list_main = [];
        var data_main = [];
        if (list.length <= 10) { setChoiceImage(list) }
        if (dataList.length <= 10) { setDataImage(dataList) }
        else {
            for (let i = 0; i <= 9; i++) {
                list_main.push(list[i]);
                data_main.push(dataList[i]);
            }
            setChoiceImage(list_main);
            setDataImage(data_main);
        }
    };

    const onImageRemove = (index) => {
        let tem_image = [];
        let tem_data = [];
        for (let i = 0; i < dataImage.length; i++) {
            if (i !== index) {
                tem_image.push(dataImage[i]);
                tem_data.push(dataImage[i]);
            }
        }
        setChoiceImage(tem_image);
        setDataImage(tem_data);

    }

    async function handleSubmit(event) {
        setLoading(true);
        let files = []
        event.preventDefault();
        for (var x = 0; x < dataImage.length; x++) {
            var formdata = new FormData();
            var publich = `${new Date().getTime()}${Math.random()}`

            formdata.append("file", dataImage[x]);
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
            files.push(json.secure_url);
        }

        fetch(DOMAIN_API + `kols/update-detail-images`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ detail_images: files })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result) {
                        setLoading(false)
                        handleClickOpenAlertDialog();
                    }
                    else {
                        setLoading(false)
                        handleClickOpenAlertDialogFail();
                    }
                }
            )

    };

    return (
        <div>

            <div style={{ fontWeight: "600" }}>Chỉnh sửa danh sách ảnh</div>
            <div style={{ minWidth: "430px", paddingTop: "20px" }}>
                <div style={{ border: "1px solid #AAAAAA", textAlign: "center", width: "100%" }}>
                    <div className="row" style={{ paddingLeft: "15px", paddingRight: "15px", maxWidth: "430px" }}>
                        {
                            choiceImage.map((image, index) => {
                                return (
                                    <div className="col-6 d-flex justify-content-center" style={{ marginTop: "15px", marginBottom: "15px" }} >
                                        <div key={index} className="image-item" >
                                            {/* style={{ width: "100px", height: "100px", position: "absolute", top: "15%", left: "18%" }} */}
                                            <div style={{ border: "1px solid #AAAAAA", width: "120px", height: "120px", position: "relative" }}>
                                                <Tooltip title="Xóa">
                                                    <IconButton aria-label="add an alarm" style={{ position: "absolute", right: "-20px", top: "-23px" }}
                                                        onClick={() => onImageRemove(index)}>
                                                        <RemoveCircleIcon sx={{ color: "#DD0000" }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <img src={image} alt="" style={{ maxWidth: "100px", maxHeight: "100px", alignItems: "center", marginTop: "10px" }} />
                                            </div>

                                        </div>
                                    </div>
                                )
                            })
                        }
                        {choiceImage.length < 10 ?
                            <div className="col-6 d-flex justify-content-center" style={{ marginTop: "15px", marginBottom: "15px" }}>
                                <label htmlFor="contained-button-file" >
                                    <Input accept="image/*" id="contained-button-file" multiple type="file"
                                        onChange={fileSelectHandler} />
                                    <div style={{ cursor: "pointer" }}>

                                        <Box sx={{ ...commonStyles, borderRadius: 1, flexDirection: "column", width: "120px", height: "120px", p: 2, border: '1px dashed grey' }}
                                            color="grey.400"
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"

                                        >
                                            <div style={{ color: "black" }}>
                                                <AddPhotoAlternateIcon />
                                            </div>
                                            <div style={{ color: "gray" }}> Thêm hình ảnh
                                                <br />
                                                <span style={{ fontSize: "13px" }}> (Tối đa 10)</span></div>
                                        </Box>
                                    </div>
                                </label>
                            </div>
                            :
                            <div className="col-6 d-flex justify-content-center" style={{ marginTop: "15px", marginBottom: "15px" }}>
                                <label htmlFor="contained-button-file" >
                                    <Input accept="image/*" id="contained-button-file" multiple type="file" />
                                    <div>

                                        <Box sx={{ ...commonStyles, borderRadius: 1, flexDirection: "column", width: "120px", height: "120px", p: 2, border: '1px dashed grey' }}
                                            color="grey.400"
                                            display="flex"
                                            justifyContent="center"
                                            alignItems="center"

                                        >
                                            <div style={{ color: "black" }}>
                                                <InsertEmoticonIcon />
                                            </div>
                                            <div style={{ color: "gray" }}> Bạn đã chọn đủ 10 tấm hình                            </div>
                                        </Box>
                                    </div>
                                </label>
                            </div>}

                    </div>
                </div>

                <div className='d-flex justify-content-center'  >
                    {loading ?
                        <div style={{ marginTop: "20px" }}>
                            <CircularProgress size="2rem" />
                        </div> : ""
                    }
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
                        onClick={handleSubmit}>Xác nhận</Button>

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

            <Dialog
                open={openAlertDialogFail}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAlertDialogFail}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Cập nhật thất bại"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseAlertDialogFail}>Tắt</Button>
                </DialogActions>
            </Dialog>
        </div >
    );
}
