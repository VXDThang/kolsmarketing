import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { DOMAIN_API } from '../../../../config/const'

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Describe(props) {
    let actoken = localStorage.access_token;
    const { isCloseModal,describeProfile } = props;
    
    const [describe, setDescribe] = React.useState(describeProfile);
    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);

    const handleClose = () => {
        isCloseModal(true);
        
    };
    const handleEditDescripbe = () => {
        fetch(DOMAIN_API + `kols//edit-description`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "x-access-token": actoken
            },
            body: JSON.stringify({ describe: describe })
          })
            .then(res => res.json())
            .then(
              (result2) => {
                if (result2) {
                  handleClickOpenAlertDialog();
                }
              }
            ).catch(error => {
              console.log("Error: ", error);
            })
        }

        const handleClickOpenAlertDialog = () => {
            setOpenAlertDialog(true);
        };
    
        const handleCloseAlertDialog = () => {
            setOpenAlertDialog(false);
        };

    return (
        <div>

            <div style={{ fontWeight: "600" }}>Chỉnh sửa mô tả</div>
            <div style={{ minWidth: "430px", paddingTop: "20px" }}>
                <div >
                    <TextField
                        fullWidth
                        id="outlined-multiline-static"
                        label="Mô tả"
                        multiline
                        rows={10}
                        value={describe}
                        onChange={(event) => { setDescribe(event.target.value) }}
                    />
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
                        onClick={handleEditDescripbe}>Xác nhận</Button>
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
