import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';

//file
import General_Info from './General_Infor'
import General_Introduce from './General_Introduce'
import ImageList from './ImageList'
import Edit_Profile from './Modal/EditProfile'
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'

export default function General() {
    const [editProfile, setEditProfile] = React.useState(false);
    const [isEditProfile, setIsEditProfile] = React.useState(false);


    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [detailProfile, setDetailProfile] = React.useState({});
    const listImage = [];
    const [listImageDetail, setListImageDetail] = React.useState([]);
    let actoken = localStorage.access_token;
    const handleOpenEditProfileModal = () => setEditProfile(true);
    const handleCloseEditProfileModal = () => {
        setEditProfile(false);
        setIsEditProfile(!isEditProfile);
    }

    async function getDetailProfile() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `kols/get-profile`;
            await fetch(url1, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setLoading(true);
                        setDetailProfile(result);
                        setError(null);
                    }
                )
        }
        catch (error) {
            // setError(error)
        }
        finally {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        getDetailProfile();
    }, [isEditProfile])

    if (error)
        return (
            <div>
                Bị lỗi tải dữ liệu
            </div>
        )
    if (loading)
        return (<div>
            Đang tải dữ liệu
        </div>
        )
    else {
        return (
            <div>

                <Edit_Profile
                    profile={detailProfile}
                    isOpen={editProfile}
                    isClose={(value) => handleCloseEditProfileModal(value)}
                />

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Card sx={{ borderColor: '#00B14F' }} >
                            <div style={{ padding: "10px" }}>
                                <General_Info
                                    detail={detailProfile} />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12}>

                        <div style={{ width: "100%" }}>
                            <Button
                                fullWidth
                                style={{ marginRight: "0px", textTransform: 'capitalize', backgroundColor: "#00B14F", color: "#ffffff" }}
                                variant="outlined" onClick={handleOpenEditProfileModal}>Chỉnh sửa thông tin</Button>
                        </div>

                        <div className='d-flex justify-content-between' style={{paddingTop:"10px"}}>
                            <div style={{ fontWeight: "600", fontSize: "18px", paddingTop: "5px" }}>
                                Thông tin khác
                            </div>

                        </div>

                        <div style={{ paddingTop: "15px" }}>
                            <Card sx={{ borderColor: '#00B14F' }} >
                                <div style={{ padding: "10px" }}>
                                    <General_Introduce
                                        introduce={detailProfile.introduce} />
                                </div>
                            </Card>
                        </div>

                        <div style={{ paddingTop: "15px" }}>
                            <Card sx={{ borderColor: '#00B14F' }} >
                                <div style={{ padding: "10px" }}>
                                    <ImageList listImage={detailProfile.detail_images} />
                                </div>
                            </Card>
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}
