import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { DOMAIN_API } from '../../../config/const'
const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  min-height: calc(100vh - 105px);
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid rgb(230, 230, 230);
`;

export default function General({ detailProfile }) {
    const [editNameUser, setEditNameUser] = React.useState(false);
    const [newNameUser, setNewNameUser] = React.useState(detailProfile?.full_name);

    const [editGender, setEditGender] = React.useState(false);
    const [newGender, setNewGender] = React.useState(detailProfile?.gender);

    let actoken = localStorage.access_token;

    const handleOpenEditNameUser = () => {
        setEditNameUser(true);
    };
    const handleCloseEditNameUser = () => {
        
        setEditNameUser(false);
        
    };

    const handleOpenEditGender = () => {
        setEditGender(true);
    };
    const handleCloseEditGender = () => {
        setNewGender(detailProfile?.gender)
        setEditGender(false);
    };

    const handleChangeGender = (event) => {
        setNewGender(event.target.value);
    }

    const handleEditName = () => {
        fetch(DOMAIN_API + `brands/edit-fullname`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ fullname: newNameUser })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        setNewNameUser(result2);
                        detailProfile.full_name = result2;
                        handleCloseEditNameUser();
                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
    }

    const handleEditGender = () => {
        fetch(DOMAIN_API + `brands/edit-gender`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ gender: newGender })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        detailProfile.gender = newGender;
                        handleCloseEditGender();
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
                    Cài đặt thông tin người dùng
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
                                Tên đầy đủ</span>
                        </Grid>
                        <Grid item xs={7}>
                            <div>
                                {detailProfile.full_name}
                            </div>
                            {editNameUser ?
                                <div style={{ paddingTop: "10px" }}>
                                    <TextField
                                        id="standard-basic" fullWidth
                                        label={<span style={{ fontSize: "14px" }} >Nhập họ và tên</span>} variant="standard"
                                        onChange={(event) => { setNewNameUser(event.target.value) }} />
                                    <Button
                                        variant="contained" color="success"
                                        onClick={handleEditName}
                                        sx={{ backgroundColor: "#00B14F", marginTop: "15px" }}>
                                        Cập nhật
                                    </Button>
                                </div>
                                :
                                ""}

                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            item xs={2}>
                            {editNameUser ?
                                <div style={{ cursor: "pointer", color: "#DD0000" }}
                                    onClick={handleCloseEditNameUser}>Hủy</div>
                                :
                                <div style={{ cursor: "pointer", color: "#00B14F" }}
                                    onClick={handleOpenEditNameUser}>Chỉnh sửa</div>}

                        </Grid>
                    </Grid>
                </div>
                <Divider sx={{ color: "#00B14F" }} />

                <div style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Grid container sx={{
                        paddingTop: "10px", paddingBottom: "10px", paddingLeft: "20px",
                        "&:hover": { bgcolor: "#F1F2F6" }
                    }}>
                        <Grid item xs={3}>
                            <span style={{ fontWeight: 500 }}>
                                Giới tính</span>
                        </Grid>
                        <Grid item xs={7}>
                            <div>
                                {detailProfile.gender == "1" ? "Nam" : ""}
                                {detailProfile.gender == "2" ? "Nữ" : ""}
                                {detailProfile.gender == "3" ? "Khác" : ""}
                            </div>
                            {editGender ?
                                <div style={{ paddingTop: "10px" }}>
                                    <TextField
                                        fullWidth
                                        id="standard-select-currency"
                                        select
                                        label="Giới tính"
                                        value={newGender}
                                        onChange={(event) => handleChangeGender(event)}
                                        variant="standard"
                                    >

                                        <MenuItem value="1" key="1" >
                                            <span style={{ fontSize: "14px" }}>
                                                Nam
                                            </span>
                                        </MenuItem>
                                        <MenuItem value="2" key="2" >
                                            <span style={{ fontSize: "14px" }}>
                                                Nữ
                                            </span>
                                        </MenuItem>
                                        <MenuItem value="3" key="3" >
                                            <span style={{ fontSize: "14px" }}>
                                                Khác
                                            </span>
                                        </MenuItem>

                                    </TextField>
                                    <Button
                                        variant="contained" color="success"
                                        onClick={handleEditGender}
                                        sx={{ backgroundColor: "#00B14F", marginTop: "15px" }}>
                                        Cập nhật
                                    </Button>
                                </div>
                                :
                                ""}

                        </Grid>
                        <Grid
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            item xs={2}>
                            {editGender ?
                                <div style={{ cursor: "pointer", color: "#DD0000" }}
                                    onClick={handleCloseEditGender}>Hủy</div>
                                :
                                <div style={{ cursor: "pointer", color: "#00B14F" }}
                                    onClick={handleOpenEditGender}>Chỉnh sửa</div>}

                        </Grid>

                    </Grid>
                </div>
                <Divider sx={{ color: "#00B14F" }} />
            </div>
        </SidebarStyled >
    );
}