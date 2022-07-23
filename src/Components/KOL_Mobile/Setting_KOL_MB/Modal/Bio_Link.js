import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import { DOMAIN_API } from '../../../../config/const'
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});


export default function Bio_Link(props) {
    let actoken = localStorage.access_token;
    const { isCloseModal, profile } = props;
    const [bio, setBio] = React.useState("");
    const [list_Bio, setList_Bio] = React.useState(profile); // [] thường
    const handleClose = () => {
        isCloseModal(true);
    };
    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);

    const handleDeleteBio = (e, index) => {
        const bio1 = list_Bio.slice(0, index.index);
        const bio2 = list_Bio.slice(index.index + 1, list_Bio.length);
        const new_arr = bio1.concat(bio2);
        setList_Bio(new_arr);

    };


    const handleAddBio = () => {
        setList_Bio((list_Bio) => [...list_Bio, bio]);
        setBio('');
    }

     const handleEditBio = () => {
        fetch(DOMAIN_API + `kols/update-bio-link`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "x-access-token": actoken
            },
            body: JSON.stringify({ bio_link: list_Bio })
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
            <div style={{ fontWeight: "600" }}>Bio Link</div>

            <div className='d-flex justify-content-between' style={{ maxWidth: "320px", paddingTop: "20px" }}>
                <div style={{ maxWidth: "280px" }} >
                    <TextField
                        placeholder="Nhập Link"
                        variant="standard"
                        size='small'
                        fullWidth
                        value={bio}
                        onChange={(event) => { setBio(event.target.value) }} />
                </div>
                <div style={{paddingLeft:"10px"}}>
                    <Button
                        style={{ textTransform: 'capitalize', backgroundColor: "#00B14F", color: "#ffffff" }}
                        variant="outlined" onClick={handleAddBio} >OK</Button>
                </div>
            </div>

            <div style={{ fontWeight: "600", paddingTop: "30px" }}> Danh sách Bio Link</div>
            {list_Bio.length > 0 && list_Bio.map((data, index) => {
                return (

                    <div key={index} style={{ marginTop: "5px", marginBottom: "5px",  maxWidth: "300px" }}>
                        <Divider sx={{ color: "#00B14F" }} />
                        <Grid container sx={{
                            paddingTop: "10px", paddingBottom: "10px",
                            "&:hover": { bgcolor: "#F1F2F6" }
                        }}>
                            <Grid item xs={10} sx={{ wordWrap: "break-word" }}>
                                {data}
                            </Grid>
                            <Grid
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                item xs={2}>
                                <div style={{ cursor: "pointer", color: "#DD0000" }}
                                    onClick={(e) => handleDeleteBio(e, { index })}>Xóa</div>
                            </Grid>
                        </Grid>

                    </div>
                )

            })}

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
                    onClick={handleEditBio}>Xác nhận</Button>

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
