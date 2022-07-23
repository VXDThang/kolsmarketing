import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { DOMAIN_API } from '../../../../config/const'
import Slide from '@mui/material/Slide';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

import DialogTitle from '@mui/material/DialogTitle';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function Edit_Info(props) {
    let actoken = localStorage.access_token;
    const { isCloseModal, profile } = props;
    const [birth, setBirth] = React.useState(profile.birthday);
    const [gender, setGender] = React.useState(profile.gender);
    const [phone, setPhone] = React.useState(profile.phone);
    const [mail, setMail] = React.useState(profile.email);
    //const [address, setAddress] = React.useState(profile.address);
    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
    const [allProvince, setAllProvince] = React.useState([]);
    const [selectedAddress, setSelectedAddress] = React.useState('');
    const handleClose = () => {
        isCloseModal(true);
    };

    const handleClickOpenAlertDialog = () => {
        setOpenAlertDialog(true);
    };

    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
    };

    const handleEdit = () => {
        fetch(DOMAIN_API + `kols/edit-info`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ birth: birth, gender: gender, phone: phone, mail: mail, address: selectedAddress })
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


    React.useEffect(() => {

        fetch(DOMAIN_API + `list-province-vn`, {
            method: "GET",
            headers: { 'Content-Type': 'application/json' }
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.length > 0) {
                        setAllProvince(result);
                        if(profile.address !== null){
                            for (let i = 0; i < result.length; i++) {
                                if (result[i].name = profile.address) {
                                    setSelectedAddress(result[i].id)
                                    break;
                                }
                            }
                        }
                        
                    }
                }
            )

    }, [])

    return (
        <div>

            <div style={{ fontWeight: "600" }}>Chỉnh sửa thông tin</div>
            <div style={{ minWidth: "430px", paddingTop: "20px" }}>
                <div >
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker

                            label="Ngày sinh"
                            value={birth}
                            onChange={(newValue) => {
                                setBirth(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} fullWidth size="small" />}
                        />
                    </LocalizationProvider>
                </div>


                <div style={{ paddingTop: "15px" }}>
                    <TextField
                        size="small"
                        fullWidth
                        id="outlined-multiline-static"
                        label="Giới tính"
                        multiline
                        rows={1}
                        value={gender}
                        onChange={(event) => { setGender(event.target.value) }}
                    />
                </div>

                <div style={{ paddingTop: "15px" }}>
                    <TextField
                        size="small"
                        fullWidth
                        id="outlined-multiline-static"
                        label="Số điện thoại"
                        multiline
                        rows={1}
                        value={phone}
                        onChange={(event) => { setPhone(event.target.value) }}
                    />
                </div>

                <div style={{ paddingTop: "15px" }} >
                    <TextField
                        size="small"
                        fullWidth
                        id="outlined-multiline-static"
                        label="Mail"
                        multiline
                        rows={1}
                        value={mail}
                        onChange={(event) => { setMail(event.target.value) }}
                    />
                </div>

                {/* <div style={{ paddingTop: "15px" }} >
                    <TextField
                        size="small"
                        fullWidth
                        id="outlined-multiline-static"
                        label="Địa chỉ"
                        multiline
                        rows={1}
                        value={address}
                        onChange={(event) => { setAddress(event.target.value) }}
                    />
                </div> */}

                <div style={{ paddingTop: "15px" }}>
                    <FormControl fullWidth>
                        <InputLabel size="small" id="demo-simple-select-label">Địa chỉ</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={selectedAddress}
                            label="Address"
                            onChange={(event) => { setSelectedAddress(event.target.value) }}
                            size="small"
                            required
                        >
                            {allProvince.length > 0 && allProvince.map((province) => (
                                <MenuItem value={province.id} key={province.id} >{province.name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
                        onClick={handleEdit}>Xác nhận</Button>
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
