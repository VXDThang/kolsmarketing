import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid } from '@mui/material';
import TextField from '@mui/material/TextField';


export default function DetailDraftPost(props) {
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
                <DialogTitle style={{ fontSize: "20px" }}>Chi tiết bài viết</DialogTitle>
                <form >
                    <DialogContent>

                        {/* ============================================ */}

                        <Grid item xs={12}>

                            <TextField
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="classname"
                                label="Classname"
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
                                name="description"
                                label="Description"
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
                                name="code"
                                label="Code"
                                type="text"
                                defaultValue={data.content}
                                InputProps={{
                                    readOnly: true,
                                  }}
                            />
                        </Grid>
                        <br/>
                        <Grid item xs={12}>

                            <TextField
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="createTime"
                                label="Create time"
                                type="text"
                                defaultValue={data.create_time}
                                InputProps={{
                                    readOnly: true,
                                  }}
                            />
                        </Grid>
                        <br />


                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => isClose(false)} variant="contained" color="secondary">Close</Button>
                       

                    </DialogActions>
                </form>
            </Dialog>
        </div>
    );
}
