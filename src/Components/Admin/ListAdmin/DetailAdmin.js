import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid} from '@mui/material';
import TextField from '@mui/material/TextField';


export default function DetailAdmin(props) {
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
                <DialogTitle style={{ fontSize: "20px" }}>Xem chi tiết Admin</DialogTitle>

                    <DialogContent>

                        {/* ============================================ */}
                        {
                            data.is_super == '1' ?
                                <div style={{fontSize:"16px",fontFamily: "Arial", paddingBottom:"20px" }}>
                                    Là Super Admin
                                </div>:""
                        }


                        <Grid item xs={12}>

                            <TextField
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="fullName"
                                label="Họ và têm"
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

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => isClose(false)} variant="contained" color="secondary">Tắt</Button>
                    </DialogActions>
  
            </Dialog>
        </div>
    );
}
