import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
export default function ToLoginDialog(props) {
    const navigate = useNavigate();
    const { isOpen, isClose } = props;

    const handleClose = () => {
        isClose(false);
    };

    function goToLogin() {
        navigate('/kols-login');
    }

    return (
        <div>

            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>Oops! Xảy ra lỗi</DialogTitle>
                <DialogContent style={{ cursor: 'move', paddingTop:"10px" }} id="draggable-dialog-title">
                    <div style={{ paddingTop: "20px", color:"#EE0000" }}>
                        Bạn cần đăng nhập để thực hiện thao tác này!
                    </div>

                    <div style={{ paddingTop: "20px",fontWeight:600, color:"#00B14F", cursor:"pointer" }}
                    onClick={goToLogin}>
                        Đi đến đăng nhập
                    </div>
                </DialogContent>

                <DialogActions>
                    <Button
                        sx={{ color: "#DD2D34" }}
                        autoFocus onClick={handleClose}>
                        Tắt
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
