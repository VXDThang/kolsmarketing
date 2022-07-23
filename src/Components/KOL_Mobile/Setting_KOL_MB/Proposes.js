import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';

//file
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'
import Proposes_Write from './Proposes_Write'



const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function Proposes() {

    let actoken = localStorage.access_token;
    const [checked, setChecked] = React.useState(0);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);
    const [profile, setProfile] = React.useState(null);



    const toggleChecked = () => {
        if (checked) {
            setChecked(0);
            handleUpdateState(0);
        }
        else {
            setChecked(1);
            handleUpdateState(1);
        }
    };

    async function handleUpdateState(value) {

        await fetch(DOMAIN_API + `cardkols/update-state-publish`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },

            body: JSON.stringify({ state: value })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result){

                    }
                }
            ).catch(error => {
                console.log("Error: ", error);
            })
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
                        setProfile(result);
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
    async function getDetailCardKOL() {
        try {
          let url1 = "";
          url1 = DOMAIN_API + `cardkols/get-detail-card`;
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
                setChecked(result.state);
              }
            )
        }
        catch (error) {
          setError(error)
        }
        finally {
          setLoading(false);
        }
      }
    React.useEffect(() => {
        getDetailProfile();
        getDetailCardKOL();
    }, [])


    if (loading)
        return (
            <div style={{ backgroundColor: "#F0F2F5", minHeight: "100vh" }}>
                Đang tải dữ liệu ...
            </div>
        )
    else {
        return (
            <div style={{ backgroundColor: "#F0F2F5", minHeight: "100vh" }}>
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Card >
                                <div style={{ backgroundColor: "#00B14F", minHeight: "200px" }} >
                                    <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "50px", paddingBottom: "40px", color: "white" }}>
                                        <div style={{ fontSize: "24px", fontWeight: 600 }}>
                                            Đề xuất tài khoản
                                        </div>
                                        <div>
                                            Giúp bạn tiếp cận nhiều hơn tới nhiều nhãn hàng.
                                        </div>
                                        <div>
                                            Hãy chuẩn bị một bức ảnh thể hiện bản thân và dòng giới thiệu tuyệt vời!
                                        </div>
                                    </div>
                                </div>
                            </Card >
                        </Grid>
                        <Grid item xs={12}>
                            <Card >
                                <div style={{
                                    backgroundColor: "#FFFFFF", minHeight: "200px", paddingLeft: "20px",
                                    paddingRight: "20px", paddingTop: "20px", paddingBottom: "20px", color: "black"
                                }}>
                                    <div >
                                        <div style={{ fontWeight: "500", fontSize: "16px" }} className='d-flex justify-content-center'>
                                            Trạng thái đề xuất tài khoản:
                                            {checked == 0 ?
                                                <span style={{ color: "#DD0000", fontWeight: 600, paddingLeft: "5px" }}>
                                                    Đang tắt
                                                </span>
                                                :
                                                <span style={{ color: "#00B14F", fontWeight: 600, paddingLeft: "5px" }}>
                                                    Đã bật
                                                </span>
                                            }
                                        </div>
                                        <div className='d-flex justify-content-center'>
                                            <FormControlLabel size="small"
                                                control={<Switch checked={checked == 1 ? true : false} onChange={toggleChecked} />}
                                                label={checked ? 'Bật' : 'Tắt'} />
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center'
                                        style={{ fontWeight: "500", fontSize: "16px", paddingTop: "10px" }}>
                                        Số lượt nhãn hàng quan tâm đến bạn
                                    </div>
                                    <div className='d-flex justify-content-center' style={{ paddingTop: "5px" }} >
                                        <Avatar
                                            alt=""
                                            sx={{ width: 56, height: 56, backgroundColor: "#00B14F" }}>
                                            {profile?.follows ? profile.follows : "0"}
                                        </Avatar>
                                    </div>

                                </div>
                            </Card >
                        </Grid>
                    </Grid>
                </div>

                <div style={{ paddingTop: "20px" }}>
                    <Proposes_Write profile={profile} />
                </div>
            </div >
        );
    }
}
