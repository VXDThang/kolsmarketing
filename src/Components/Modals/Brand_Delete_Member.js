import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { DOMAIN_API} from '../../config/const'
import DialogTitle from '@mui/material/DialogTitle';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
//icon
import CircularProgress from '@mui/material/CircularProgress';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Brand_Delete_Member(props) {
    const { id_post, id_kol, name_delete, isOpen, isClose } = props;

    const [loadingDelete, setLoadingDelete] = React.useState(false);
    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);


    let actoken = localStorage.access_token;

    const handleClose = () => {
        isClose(false);
    };

    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
        isClose(true);
    };

    const handleDeleteMember = () => {
        setLoadingDelete(true)
        fetch(DOMAIN_API + `jobs/delete-member-of-post`, {
            method: "DELETE",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ id_post: id_post, id_kol: id_kol })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        setLoadingDelete(false)
                        setOpenAlertDialog(true)
                        isClose(true);
                    }
                },
                (error) => {
                    console.log("Error dekete member");
                }
            )
    };
    return (
        <div>

            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >

                <DialogContent style={{ cursor: 'move', paddingTop: "20px" }} id="draggable-dialog-title">

                    <div style={{ textAlign: "center", padding: "20px" }}>
                        <div style={{ fontSize: "20px", fontWeight: 500 }}>
                            Chắc chắn xóa thành viên {name_delete}
                        </div>
                        {loadingDelete ?
                            <div>
                                <CircularProgress />
                            </div> :
                            ""
                        }
                        <div style={{ paddingTop: "40px" }}>
                            <Grid container spacing={3}>
                                <Grid item xs={6}>
                                    <div style={{ marginBottom: "0px" }}>
                                        <Button fullWidth variant="contained"
                                            sx={{
                                                width: "150px",
                                                textTransform: 'capitalize', backgroundColor: "#DD0000",
                                                fontFamily: "Segoe UI", fontSize: "15px", boxShadow: "none",
                                                "&:hover": { bgcolor: "#CC0000" }
                                            }}
                                            onClick={handleDeleteMember}>
                                            Xóa
                                        </Button>
                                    </div>
                                </Grid>
                                <Grid item xs={6}>
                                    <div style={{ marginBottom: "0px" }}>
                                        <Button fullWidth variant="contained"
                                            sx={{
                                                width: "150px",
                                                textTransform: 'capitalize', backgroundColor: "#e4e6eb",
                                                fontFamily: "Segoe UI", fontSize: "15px", boxShadow: "none", color: "black",
                                                "&:hover": { bgcolor: "#DDDDDD" }
                                            }}
                                            onClick={handleClose}>
                                            Hủy
                                        </Button>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>
                    </div>

                </DialogContent>

            </Dialog>

            <Dialog
                open={openAlertDialog}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleCloseAlertDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Đã xóa thành công"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseAlertDialog}>Tắt</Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
