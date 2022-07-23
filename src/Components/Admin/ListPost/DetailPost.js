import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import moment from 'moment';

export default function DetailPost(props) {
    const { isOpen, isClose, data } = props;
    const [open, setOpen] = React.useState(isOpen);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        isClose(false);
    };

    let cast_min_Draft = Number(data.min_cast);
    let cast_min_Main = cast_min_Draft.toLocaleString("vi");

    let cast_max_Draft = Number(data.max_cast);
    let cast_max_Main = cast_max_Draft.toLocaleString("vi");

    let cast_Main = cast_min_Main + " - " + cast_max_Main;

    return (
        <div>
            <Dialog fullWidth open={isOpen} onClose={handleClose}>
                <DialogTitle style={{ fontSize: "20px" }}>Xem chi tiết bài tuyển dụng</DialogTitle>

                <DialogContent>

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

                    <div style={{
                        color: "black", fontSize: "16px", fontFamily: "Arial", fontWeight: 600,
                        paddingBottom: "20px", paddingTop: "20px"
                    }}>
                        Thông tin nhãn hàng
                    </div>
                    {data.brand_info ?
                        <div>
                            <Grid item xs={12}>

                                <TextField
                                    variant="standard"
                                    sx={{ width: 550 }}
                                    id="outlined-helperText"
                                    name="id_brand"
                                    label="ID Nhãn hàng"
                                    type="text"
                                    defaultValue={data?.brand_info.id ? data.brand_info.id : ""}
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
                                    name="name_brand"
                                    label="Tên Nhãn hàng"
                                    type="text"
                                    defaultValue={data?.brand_info.name}
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
                                    name="email_brand"
                                    label="Email Nhãn hàng"
                                    type="text"
                                    defaultValue={data?.brand_info.email}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <br />
                            {data?.brand_info.avatar ?
                                <div>
                                    <div style={{ color: "gray", fontSize: "13px", fontFamily: "Arial" }}>
                                        Ảnh đại diện
                                    </div>
                                    <div>
                                        <div style={{ paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }} >
                                            <img src={data.brand_info.avatar} width="auto" height="300px" />
                                        </div>
                                    </div>
                                </div>

                                : ""
                            }
                        </div>
                        : ""}



                </DialogContent>
                <DialogActions>
                    <Button onClick={() => isClose(false)} variant="contained" color="secondary">Tắt</Button>
                </DialogActions>

            </Dialog>
        </div>
    );
}
