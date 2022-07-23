import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  min-height: calc(100vh - 105px);
  font-size: 14px; 
  border-radius: 5px;
  border: 1px solid rgb(230, 230, 230);
`;

export default function Security({detailProfile}) {

    const [editPassword, setEditPassword] = React.useState(false);
    const [showOldPassword, setShowOldPassWord] = React.useState(false);
    const [showNewPassword, setShowNewPassWord] = React.useState(false);
    const [oldPassword, setOldPassword] = React.useState("");
    const [newPassword, setNewPassword] = React.useState("");
    let actoken = localStorage.access_token;
    const handleOpenEditPassword = () => {
        setEditPassword(true);
    };

    const handleCloseEditPassword = () => {
        setEditPassword(false);
        setOldPassword("");
        setNewPassword("");
        setShowOldPassWord(false);
        setShowNewPassWord(false);
    };


    const handleClickShowOldPassword = () => {
        setShowOldPassWord(!showOldPassword);
    };

    const handleClickShowNewPassword = () => {
        setShowNewPassWord(!showNewPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleEditPassword = () => {
        fetch(DOMAIN_API + `brands/renew-password`, {
            method: "PATCH",
            headers: {
              'Content-Type': 'application/json',
              "x-access-token": actoken
            },
            body: JSON.stringify({ old_password: oldPassword, password: newPassword })
          })
            .then(res => res.json())
            .then(
              (result2) => {
                if (result2) {
                    if(result2.error){
                        window.alert("Password cũ không đúng");
                    }
                    else{
                        window.alert("Cập nhật mật khẩu thành công");
                        handleCloseEditPassword();
                    }
                }
              }
            ).catch(error => {
              console.log("Error: ", error);
            })
     }
    return (
        <SidebarStyled>
            <div style={{ padding: "10px" }}>
                <div style={{ fontSize: "16px", fontWeight: "700", paddingBottom: "10px" }}>
                    Cài đặt Bảo mật & Đăng nhập
                </div>
                <div>
                    <Divider sx={{ color: "#00B14F" }} />
                </div>
                <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Grid container sx={{
                        paddingTop: "10px", paddingBottom: "10px", paddingLeft: "20px",
                        "&:hover": { bgcolor: "#F1F2F6" }
                    }}>
                        <Grid 
                        display="flex"
                        justifyContent="left"
                        alignItems="center"
                        item xs={3}>
                            <span style={{ fontWeight: 500 }}>
                                Tên đăng nhập</span>
                        </Grid>
                        <Grid item xs={7}>
                            {detailProfile.email}
                        </Grid>
                       
                    </Grid>
                </div>
                <Divider sx={{ color: "#00B14F" }} />

                <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Grid container sx={{
                        paddingTop: "10px", paddingBottom: "10px", paddingLeft: "20px",
                        "&:hover": { bgcolor: "#F1F2F6" }
                    }}>
                        <Grid 
                        display="flex"
                        justifyContent="left"
                        alignItems="center"
                        item xs={3}>
                            <span style={{ fontWeight: 500 }}>
                                Mật khẩu</span>
                        </Grid>
                        <Grid item xs={7}>
                            <div>
                                ***********
                            </div>

                            {editPassword ?
                                <div style={{fontSize:"13px"}}>
                                    <div>
                                        <FormControl fullWidth variant="standard">
                                            <InputLabel htmlFor="standard-adornment-password"
                                            sx={{ fontSize:"14px"}}>Nhập mật khẩu cũ</InputLabel>
                                            <Input
                                                size='small'
                                                id="standard-adornment-password"
                                                type={showOldPassword ? 'text' : 'password'}
                                                value={oldPassword}
                                                onChange={(event) => { setOldPassword(event.target.value) }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowOldPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showOldPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                    <div style={{ marginTop: "10px" }}>
                                        <FormControl fullWidth variant="standard" >
                                            <InputLabel htmlFor="standard-adornment-password"
                                            sx={{ fontSize:"14px"}}>Nhập mật khẩu mới</InputLabel>
                                            <Input
                                                size='small'
                                                id="standard-adornment-password"
                                                type={showNewPassword ? 'text' : 'password'}
                                                value={newPassword}
                                                onChange={(event) => { setNewPassword(event.target.value) }}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowNewPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                        >
                                                            {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                            />
                                        </FormControl>
                                    </div>
                                    <div>
                                        <Button
                                            variant="contained" color="success"
                                            onClick={handleEditPassword}
                                            sx={{ backgroundColor: "#00B14F", marginTop: "15px" }}>
                                           Cập nhật
                                        </Button>
                                    </div>
                                </div>
                                : ""

                            }

                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            item xs={2}>

                            {editPassword ?
                                <div style={{ cursor: "pointer", color: "#DD0000" }}
                                    onClick={handleCloseEditPassword}>Hủy</div> :

                                <div style={{ cursor: "pointer", color: "#00B14F" }}
                                    onClick={handleOpenEditPassword}>Chỉnh sửa</div>
                            }
                        </Grid>
                    </Grid>
                </div>


                <Divider sx={{ color: "#00B14F" }} />

            


            </div>
        </SidebarStyled>
    );
}