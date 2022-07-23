import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';
import moment from "moment"

export default function DetailKol(props) {
    const { isOpen, isClose, data } = props;
    const [open, setOpen] = React.useState(isOpen);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        isClose(false);
    };

    return (
        <div>
            <Dialog fullWidth open={isOpen} onClose={handleClose}>
                <DialogTitle style={{ fontSize: "20px" }}>Xem chi tiết Kol </DialogTitle>
                <DialogContent>

                    {/* ============================================ */}

                    <Grid item xs={12}>

                        <TextField
                            variant="standard"
                            sx={{ width: 550 }}
                            id="outlined-helperText"
                            name="full_name"
                            label="Họ và tên"
                            type="text"
                            defaultValue={data.full_name}
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
                            name="id"
                            label="ID Kol"
                            type="text"
                            defaultValue={data.id}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>
                    <br />

                    {data.avatar ?
                        <div>
                            <div style={{ color: "gray", fontSize: "13px", fontFamily: "Arial" }}>
                                Ảnh đại diện
                            </div>
                            <div>
                                <div style={{ paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }} >
                                    <img src={data.avatar} width="auto" height="300px" />
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
                            name="studentID"
                            label="Giới thiệu"
                            type="text"
                            defaultValue={data.introduce}
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
                            name="email"
                            label="Email"
                            type="text"
                            defaultValue={data.email}
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
                            name="createTime"
                            label="Thời gian tạo"
                            type="text"
                            defaultValue={data.create_time}
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
                            name="address"
                            label="Địa chỉ"
                            type="text"
                            defaultValue={data.address}
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
                            name="phone"
                            label="Điện thoại"
                            type="text"
                            defaultValue={data.phone}
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
                            name="birth"
                            label="Ngày sinh"
                            type="text"
                            defaultValue={moment(data.birthday).format("DD/MM/YYYY")}
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
                            name="gender"
                            label="Giới tính"
                            type="text"
                            defaultValue={data.gender}
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>


                </DialogContent>
                <DialogActions>
                    <Button onClick={() => isClose(false)} variant="contained" color="secondary">Tắt</Button>


                </DialogActions>

            </Dialog>
        </div>
    );
}
