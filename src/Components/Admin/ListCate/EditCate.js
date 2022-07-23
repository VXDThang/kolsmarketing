import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid} from '@mui/material';
import TextField from '@mui/material/TextField';
import { DOMAIN_API } from '../../../config/const';
import { useState, useEffect } from "react";

import Snackbar from '@mui/material/Snackbar';
import { Alert } from '@mui/material';

export default function EditCate(props) {
    const { isOpen, isClose, dataCate, listCate, dataCateNew } = props;

    const [open, setOpen] = React.useState(isOpen);
    const [nameCate, setNameCate] = useState('');

    const [openAlert, setOpenAlert] = React.useState(false);

    const [errorNameNewCate, setErrorNameNewCate] = React.useState(false);

    //alert
    const [state, setState] = React.useState({
        openState: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, openState } = state;


    let actoken = localStorage.getItem('access_token');

    const handleClose = () => {
        setNameCate('');
        setErrorNameNewCate(false);
        setOpen(false);
        isClose(false);

    };

    const handleCloseSnakBar =()=> {
        handleClose()
        setOpenAlert(false)
    }

    function handleChangeNameCate(event) {
        setErrorNameNewCate(false);
        setNameCate(event.target.value)
    }


    async function handleSubmit(event) {
        let err = false;
        if (nameCate == '') {
            setErrorNameNewCate(true);
            err = true;
        }
        else {
            for (let i = 0; i < listCate.length; i++) {
                if (nameCate.toLowerCase() == listCate[i].name.toLowerCase()) {
                    setErrorNameNewCate(true);
                    err = true;
                    break;
                }
            }
        }
        if (!err) {
            await fetch(DOMAIN_API + `admins/edit-category-name`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_cate: dataCate.id, cate_name: nameCate })
            })
                .then(res => res.json())
                .then(
                    (result2) => {
                        if (result2) {
                            dataCateNew(result2);
                            setOpenAlert(true);
                        }
                    }
                ).catch(error => {
                    console.log("Error: ", error);
                })
        }

    };
    return (
        <div>
            <Dialog fullWidth open={isOpen} onClose={handleClose}>
                <DialogTitle style={{ fontSize: "20px" }}>Thay đổi tên lĩnh vực</DialogTitle>
                <form >
                    <DialogContent>

                        {/* ============================================ */}

                        <Grid item xs={12}>

                            <TextField
                                value={dataCate?.name}
                                variant="standard"
                                sx={{ width: 550 }}
                                id="outlined-helperText"
                                name="name"
                                label="Tên lĩnh vực cũ"
                                type="text"
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <br />

                        <Grid item xs={12}>


                            {errorNameNewCate ?
                                <TextField
                                    error
                                    sx={{ width: 550 }}
                                    onChange={handleChangeNameCate}
                                    id="standard-error-helper-text"
                                    label="Tên lĩnh vực mới"
                                    value={nameCate}
                                    helperText="Tên lĩnh vực mới bị trùng với các tên đã có hoặc không có giá trị."
                                    variant="standard"
                                />
                                :
                                <TextField
                                    value={nameCate} onChange={handleChangeNameCate}
                                    variant="standard"
                                    sx={{ width: 550 }}
                                    id="outlined-helperText"
                                    name="name"
                                    label="Tên lĩnh vực mới"
                                    type="text"
                                />
                            }


                        </Grid>
                        <br />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant="contained" color="secondary">Hủy</Button>
                        <Button onClick={handleSubmit} variant="contained" color="success">Xác nhận</Button>

                    </DialogActions>
                </form>
            </Dialog>

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={openAlert}
                autoHideDuration={1000}
                onClose={handleCloseSnakBar}
            >
                <Alert onClose={handleCloseSnakBar} severity="success" variant='filled' sx={{ width: '100%' }}>
                    Thay đổi thành công!
                </Alert>
            </Snackbar>
        </div>
    );
}
