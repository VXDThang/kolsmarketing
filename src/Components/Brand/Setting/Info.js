import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DOMAIN_API } from '../../../config/const'

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  min-height: calc(100vh - 105px);
  font-size: 14px; 
  border-radius: 5px;
  border: 1px solid rgb(230, 230, 230);
`;

export default function Info({ detailProfile }) {

    const [editNameBrand, setEditNameBrand] = React.useState(false);
    const [newNameBrand, setNewNameBrand] = React.useState("");
    const [oldState, setOldState] = React.useState({
        brand_name: detailProfile.brand_name,
        phone: detailProfile.phone,
        email: detailProfile.email,
        address: detailProfile.address,
        bio_url: detailProfile.bio_url[0],
        introduce: detailProfile.introduce
    });
    const [editPhoneBrand, setEditPhoneBrand] = React.useState(false);
    const [newPhoneBrand, setNewPhoneBrand] = React.useState("");
    const [editMailBrand, setEditMailBrand] = React.useState(false);
    const [newMailBrand, setNewMailBrand] = React.useState("");
    const [editAddressBrand, setEditAddressBrand] = React.useState(false);
    const [newAddressBrand, setNewAddressBrand] = React.useState("");
    const [editIntroduceBrand, setEditIntroduceBrand] = React.useState(false);
    const [newIntroduceBrand, setNewIntroduceBrand] = React.useState("");
    const [editLinkBrand, seEditLinkBrand] = React.useState(false);
    const [newLinkBrand, setNewLinkBrand] = React.useState("");

    const handleOpenEditNameBrand = () => {
        setEditNameBrand(true);
    };
    const handleCloseEditNameBrand = () => {
        setEditNameBrand(false);
    };

    const handleOpenEditMailBrand = () => {
        setEditMailBrand(true);
    };

    const handleCloseEditMailBrand = () => {
        setEditMailBrand(false);
    };

    const handleOpenEditPhoneBrand = () => {
        setEditPhoneBrand(true);
    };

    const handleCloseEditPhoneBrand = () => {
        setEditPhoneBrand(false);
    };

    const handleOpenEditAddressBrand = () => {
        setEditAddressBrand(true);
    };

    const handleCloseEditAddressBrand = () => {
        setEditAddressBrand(false);
    };

    const handleOpenEditIntroduceBrand = () => {
        setEditIntroduceBrand(true);
    };

    const handleCloseEditIntroduceBrand = () => {
        setEditIntroduceBrand(false);
    };

    const handleOpenEditLinkBrand = () => {
        seEditLinkBrand(true);
    };

    const handleCloseEditLinkBrand = () => {
        seEditLinkBrand(false);
    };
    let actoken = localStorage.access_token;

    const handleEditBrandName = () => {
        fetch(DOMAIN_API + `brands/edit-brandname`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ brandname: newNameBrand })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        setNewNameBrand(result2);
                        detailProfile.brand_name = result2;
                        handleCloseEditNameBrand();
                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
    }

    const handleEditPhone = () => {
        fetch(DOMAIN_API + `brands/edit-phone`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ phone: newPhoneBrand })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        setNewPhoneBrand(result2);
                        detailProfile.phone = result2;
                        handleCloseEditPhoneBrand();
                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
    }

    const handleEditBrandMail = () => {
        fetch(DOMAIN_API + `brands/edit-email`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ mail: newMailBrand })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        if (result2.error) {
                            window.alert("Email không khả dụng");
                        }
                        else {
                            setNewMailBrand(result2);
                            detailProfile.email = result2;
                            handleCloseEditMailBrand();
                        }
                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
    }
    const handleEditBrandAddress = () => {
        fetch(DOMAIN_API + `brands/edit-address`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ address: newAddressBrand })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        setNewAddressBrand(result2);
                        detailProfile.address = result2;
                        handleCloseEditAddressBrand();
                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
    }

    const handleEditBrandBioLink = () => {
        fetch(DOMAIN_API + `brands/update-bio-link`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ bio_link: [newLinkBrand] })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        setNewLinkBrand(result2);
                        detailProfile.bio_url = result2;
                        handleCloseEditLinkBrand();
                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
    }

    const handleEditBrandIntroduce = () => {
        fetch(DOMAIN_API + `brands/edit-description`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ describe: newIntroduceBrand })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        setNewIntroduceBrand(result2);
                        detailProfile.introduce = result2;
                        handleCloseEditIntroduceBrand();
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
                    Cài đặt thông tin nhãn hàng
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
                                Tên nhãn hàng</span>
                        </Grid>
                        <Grid item xs={7}>
                            <div>
                                {detailProfile.brand_name}
                            </div>
                            {editNameBrand ?
                                <div style={{ paddingTop: "10px" }}>
                                    <TextField
                                        id="standard-basic" fullWidth
                                        label={<span style={{ fontSize: "14px" }} >Nhập tên nhãn hàng</span>} variant="standard"
                                        onChange={(event) => { setNewNameBrand(event.target.value) }} />
                                    <Button
                                        variant="contained" color="success"
                                        onClick={handleEditBrandName}
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
                            {editNameBrand ?
                                <div style={{ cursor: "pointer", color: "#DD0000" }}
                                    onClick={handleCloseEditNameBrand}>Hủy</div>
                                :
                                <div style={{ cursor: "pointer", color: "#00B14F" }}
                                    onClick={handleOpenEditNameBrand}>Chỉnh sửa</div>}

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
                                Số điện thoại </span>
                        </Grid>
                        <Grid item xs={7}>
                            <div>
                                {detailProfile.phone}
                            </div>
                            {editPhoneBrand ?
                                <div style={{ paddingTop: "10px" }}>
                                    <TextField
                                        id="standard-basic" fullWidth
                                        label={<span style={{ fontSize: "14px" }} >Nhập số điện thoại</span>} variant="standard"
                                        onChange={(event) => { setNewPhoneBrand(event.target.value) }} />
                                    <Button
                                        variant="contained" color="success"
                                        onClick={handleEditPhone}
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
                            {editPhoneBrand ?
                                <div style={{ cursor: "pointer", color: "#DD0000" }}
                                    onClick={handleCloseEditPhoneBrand}>Hủy</div>
                                :
                                <div style={{ cursor: "pointer", color: "#00B14F" }}
                                    onClick={handleOpenEditPhoneBrand}>Chỉnh sửa</div>}

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
                                Mail liên hệ</span>
                        </Grid>
                        <Grid item xs={7}>
                            <div>
                                {detailProfile.email}
                            </div>
                            {editMailBrand ?
                                <div style={{ paddingTop: "10px" }}>
                                    <TextField
                                        id="standard-basic" fullWidth
                                        label={<span style={{ fontSize: "14px" }} >Nhập mail liên hệ</span>} variant="standard"
                                        onChange={(event) => { setNewMailBrand(event.target.value) }} />
                                    <Button
                                        variant="contained" color="success"
                                        onClick={handleEditBrandMail}
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
                            {editMailBrand ?
                                <div style={{ cursor: "pointer", color: "#DD0000" }}
                                    onClick={handleCloseEditMailBrand}>Hủy</div>
                                :
                                <div style={{ cursor: "pointer", color: "#00B14F" }}
                                    onClick={handleOpenEditMailBrand}>Chỉnh sửa</div>}

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
                                Địa chỉ</span>
                        </Grid>
                        <Grid item xs={7}>
                            <div>
                                {detailProfile.address}
                            </div>
                            {editAddressBrand ?
                                <div style={{ paddingTop: "10px" }}>
                                    <TextField
                                        id="standard-basic" fullWidth
                                        label={<span style={{ fontSize: "14px" }} >Nhập địa chỉ</span>} variant="standard"
                                        onChange={(event) => { setNewAddressBrand(event.target.value) }} />
                                    <Button
                                        variant="contained" color="success"
                                        onClick={handleEditBrandAddress}
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
                            {editAddressBrand ?
                                <div style={{ cursor: "pointer", color: "#DD0000" }}
                                    onClick={handleCloseEditAddressBrand}>Hủy</div>
                                :
                                <div style={{ cursor: "pointer", color: "#00B14F" }}
                                    onClick={handleOpenEditAddressBrand}>Chỉnh sửa</div>}

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
                                Liên kết</span>
                        </Grid>
                        <Grid item xs={7}>
                            <div>
                                {detailProfile?.bio_url[0]}
                            </div>
                            {editLinkBrand ?
                                <div style={{ paddingTop: "10px" }}>
                                    <TextField
                                        id="standard-basic" fullWidth
                                        label={<span style={{ fontSize: "14px" }} >Nhập đường liên kết mới</span>} variant="standard"
                                        onChange={(event) => { setNewLinkBrand(event.target.value) }} />
                                    <Button
                                        variant="contained" color="success"
                                        onClick={handleEditBrandBioLink}
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
                            {editLinkBrand ?
                                <div style={{ cursor: "pointer", color: "#DD0000" }}
                                    onClick={handleCloseEditLinkBrand}>Hủy</div>
                                :
                                <div style={{ cursor: "pointer", color: "#00B14F" }}
                                    onClick={handleOpenEditLinkBrand}>Chỉnh sửa</div>}

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
                                Giới thiệu</span>
                        </Grid>
                        <Grid
                            display="flex"
                            item xs={7}
                            className="d-flex flex-column ">
                            <div className="d-flex align-items-start">
                                <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 500, fontSize: "14px",
                                marginBottom:"-5px", fontFamily: "Arial" }}>
                                    {detailProfile.introduce}
                                </pre>
                            </div>
                            {editIntroduceBrand ?
                                <div style={{ paddingTop: "10px" }}>
                                    
                                    <TextField
                                        fullWidth
                                        id="outlined-multiline-static"
                                        label={<span style={{ fontSize: "14px" }} >Giới thiệu</span>}
                                        multiline
                                        rows={10}
                                        onChange={(event) => { setNewIntroduceBrand(event.target.value) }}
                                    />
                                    <Button
                                        variant="contained" color="success"
                                        onClick={handleEditBrandIntroduce}
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
                            {editIntroduceBrand ?
                                <div style={{ cursor: "pointer", color: "#DD0000" }}
                                    onClick={handleCloseEditIntroduceBrand}>Hủy</div>
                                :
                                <div style={{ cursor: "pointer", color: "#00B14F" }}
                                    onClick={handleOpenEditIntroduceBrand}>Chỉnh sửa</div>}

                        </Grid>
                    </Grid>
                </div>
                <Divider sx={{ color: "#00B14F" }} />
            </div>
        </SidebarStyled>
    );
}