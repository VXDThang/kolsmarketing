import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid } from '@mui/material';
import { DOMAIN_API } from '../../../config/const'
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import moment from 'moment';

export default function DetailPost(props) {
    let actoken = localStorage.access_token;
    const { isOpen, isClose, data, updateAfter } = props;
    const [open, setOpen] = React.useState(isOpen);
    const [checked, setChecked] = React.useState(data.hot);

    const [isHanldeSetPostToHotOrNot, setIsHanldeSetPostToHotOrNot] = React.useState(false);

    const handleAfterSetHotSuccess = () => {
        setIsHanldeSetPostToHotOrNot(true);
        setTimeout(() => {
            setIsHanldeSetPostToHotOrNot(false);
        }, 3000);
    }

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        isClose(false);
        if (checked == 0)
            updateAfter(0,data.id)
        else
            updateAfter(1,data.id)
    };

    const toggleChecked = () => {
        if (checked == 1) {
            setChecked(0);
            handleUpdateToNoHot();
        }
        else {
            setChecked(1);
            handleUpdateToHot();
        }
    };

    let cast_min_Draft = Number(data.min_cast);
    let cast_min_Main = cast_min_Draft.toLocaleString("vi");

    let cast_max_Draft = Number(data.max_cast);
    let cast_max_Main = cast_max_Draft.toLocaleString("vi");

    let cast_Main = cast_min_Main + " - " + cast_max_Main;

    async function handleUpdateToHot() {

        await fetch(DOMAIN_API + `admins/set-post-hot`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },

            body: JSON.stringify({ id_post: data.id })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result) {
                        handleAfterSetHotSuccess();
                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
    }

    async function handleUpdateToNoHot() {

        await fetch(DOMAIN_API + `admins/set-post-not-hot`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },

            body: JSON.stringify({ id_post: data.id })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result) {
                        handleAfterSetHotSuccess();
                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
    }

    React.useEffect(() => {
        setChecked(data.hot)
    }, [data])

    return (
        <div>
            <Dialog fullWidth open={isOpen} onClose={handleClose}>
                <DialogTitle style={{ fontSize: "20px" }}>Cài đặt HOT cho bài tuyển dụng</DialogTitle>

                <DialogContent>

                    <div className='d-flex justify-content-between' >
                        <div style={{ color: "black", fontSize: "16px", fontFamily: "Arial", fontWeight: 600, }} >
                            Trạng thái HOT của bài tuyển dụng:
                            {checked == 0 ?
                                <span style={{ color: "#DD0000", fontWeight: 600, paddingLeft: "5px" }}>
                                    False
                                </span>
                                :
                                <span style={{ color: "#00B14F", fontWeight: 600, paddingLeft: "5px" }}>
                                    True
                                </span>
                            }
                        </div>
                        <div >
                            <FormControlLabel size="small"
                                control={<Switch checked={checked == 0 ? false : true} onChange={toggleChecked} />}
                                label={checked == 0 ? 'False' : 'True'} />
                        </div>
                    </div>

                    {isHanldeSetPostToHotOrNot ?
                        <div className='d-flex justify-content-end' style={{ paddingTop: "10px", paddingBottom: "15px" }}>
                            <div style={{ color: "#00B14F" }}>
                                ... Xử lý thành công. Đã thay đổi trạng thái!
                            </div>
                        </div> :
                        ""
                    }

                    {/* ============================================ */}
                    <div style={{
                        color: "black", fontSize: "16px", fontFamily: "Arial", fontWeight: 600,
                        paddingBottom: "20px"
                    }}>
                        Thông tin bài đăng
                    </div>

                    <Grid item xs={12}>

                        <TextField
                            variant="standard"
                            sx={{ width: 550 }}
                            id="outlined-helperText"
                            name="tieude"
                            label="Tiêu đề"
                            type="text"
                            defaultValue={data.title}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <br />

                    {data.image_cover ?
                        <div>
                            <div style={{ color: "gray", fontSize: "13px", fontFamily: "Arial" }}>
                                Ảnh mô tả
                            </div>
                            <div>
                                <div style={{ paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }} >
                                    <img src={data.image_cover} width="auto" height="300px" />
                                </div>
                            </div>
                            <br />
                        </div>

                        : ""
                    }

                    <Grid item xs={12}>

                        <TextField
                            variant="standard"
                            sx={{ width: 550 }}
                            id="outlined-helperText"
                            name="noidung"
                            label="Nội dung"
                            multiline
                            maxRows={6}
                            type="text"
                            defaultValue={data.content}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <br />
                    <Grid item xs={12}>

                        <TextField
                            variant="standard"
                            sx={{ width: 550 }}
                            id="outlined-helperText"
                            name="yeucau"
                            label="Yêu cầu"
                            type="text"
                            multiline
                            maxRows={6}
                            defaultValue={data.requirement}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <br />
                    <Grid item xs={12}>

                        <TextField
                            variant="standard"
                            sx={{ width: 550 }}
                            id="outlined-helperText"
                            name="quyenloi"
                            label="Quyền lợi"
                            type="text"
                            multiline
                            maxRows={6}
                            defaultValue={data.benefit}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <br />
                    <Grid container>
                        <Grid item xs={6} sx={{ paddingRight: "15px" }}>

                            <Grid item xs={6} sx={{ paddingRight: "15px" }}>

                                <TextField
                                    variant="standard"
                                    sx={{ width: 260 }}
                                    id="outlined-helperText"
                                    name="id"
                                    label="ID Bài đăng"
                                    type="text"
                                    defaultValue={data.id}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>

                        </Grid>

                        <Grid item xs={6}>

                            <TextField
                                variant="standard"
                                sx={{ width: 275 }}
                                id="outlined-helperText"
                                name="gioitin"
                                label="Giới tính tuyển dụng"
                                type="text"
                                defaultValue={data.gender}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container>
                        <Grid item xs={6} sx={{ paddingRight: "15px" }}>

                            <TextField
                                variant="standard"
                                sx={{ width: 260 }}
                                id="outlined-helperText"
                                name="soluong"
                                label="Số lượng tuyển dụng"
                                type="text"
                                defaultValue={data.amount}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>


                        <Grid item xs={6}>

                            <TextField
                                variant="standard"
                                sx={{ width: 275 }}
                                id="outlined-helperText"
                                name="tienluong"
                                label="Tiền lương"
                                type="text"
                                defaultValue={cast_Main}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container>
                        <Grid item xs={6} sx={{ paddingRight: "15px" }}>

                            <TextField
                                variant="standard"
                                sx={{ width: 260 }}
                                id="outlined-helperText"
                                name="diadiem"
                                label="Địa điểm tuyển dụng"
                                type="text"
                                defaultValue={data.address}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>


                        <Grid item xs={6}>

                            <TextField
                                variant="standard"
                                sx={{ width: 275 }}
                                id="outlined-helperText"
                                name="write_time"
                                label="Đăng lúc"
                                type="text"
                                defaultValue={moment(data.write_time).format("DD/MM/YYYY HH:mm")}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <br />
                    <Grid container>
                        <Grid item xs={6} sx={{ paddingRight: "15px" }}>

                            <TextField
                                variant="standard"
                                sx={{ width: 260 }}
                                id="outlined-helperText"
                                name="hot"
                                label="Hot"
                                type="text"
                                defaultValue={data.hot == '0' ? "False" : "True"}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>


                        <Grid item xs={6}>

                            <TextField
                                variant="standard"
                                sx={{ width: 275 }}
                                id="outlined-helperText"
                                name="view"
                                label="Lượt xem Bài tuyển dụng"
                                type="text"
                                defaultValue={data.views}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Grid>
                    <br />




                </DialogContent>


                <div style={{ paddingRight: "10px", paddingTop: "8px" }}>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="secondary">Tắt</Button>
                    </DialogActions>
                </div>
            </Dialog>
        </div>
    );
}
