import React, { useState } from 'react';
//file
import General from './General';
import SettingList from './SettingList';
import Info from './Info';
import Security from './Security';
import Notification from './Notification';
import ImageSetting from './ImageSetting'
import Header from './../Header/Header_Brand_ForLogin/Header'

import Grid from '@mui/material/Grid';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'

export default function ChatRoom() {
    const [type, setType] = React.useState(0);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [detailProfile, setDetailProfile] = React.useState({});
    let actoken = localStorage.access_token;
    const HandleSetting = (value) => {
        setType(value);
    }
    async function getDetailProfile() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `brands/get-profile`;
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
    }, [])

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
    else
        if (localStorage.access_token == null) {
            localStorage.setItem("beforeLink", window.location.pathname);
            return (
                <div sx={{ flexGrow: 1 }}  >
                    <Header />
                    <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "10px" }}>
                        Bạn cần đăng nhập để tiếp tục ...
                    </div>


                </div>
            )
        }
        else
            return (
                <div>
                    <Grid container >
                        <Grid item xs={4.5}>
                            <SettingList ClickOption={HandleSetting} detailProfile={detailProfile} />
                        </Grid>

                        <Grid item xs={7.5}  sx={{paddingLeft: "30px", paddingRight: "20px"}}>
                            {(type == "0") && <General detailProfile={detailProfile} />}
                            {(type == "1") && <Info detailProfile={detailProfile} />}
                            {(type == "2") && <Security detailProfile={detailProfile} />}
                            {(type == "3") && <Notification detailProfile={detailProfile} />}
                            {(type == "4") && <ImageSetting detailProfile={detailProfile} />}

                        </Grid>


                    </Grid>
                </div>
            );
}