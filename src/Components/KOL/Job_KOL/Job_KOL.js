import React from 'react';
import Grid from '@mui/material/Grid';

//file
import List_Job_KOL from './List_Job_KOL';
import Job_Option from './Job_Option';
import Job_Statistic from './Job_Statistic';
import Job_Post from './Job_Post';
import Header from '../Header_KOL/Header';
import Header_Access from '../Header_KOL/Header_access';
import { DOMAIN_API } from '../../../config/const';
import './Job_KOL.css'

export default function Job_KOL() {
    const [type, setType] = React.useState(0);

    let actoken = localStorage.access_token;
    const [loading, setLoading] = React.useState(true);
    const [profileKOL, setProfileKOL] = React.useState(null);
    const [listPageFB, setListPageFB] = React.useState([]);
    const [fbUserID, setFbUserID] = React.useState('');

    const HandleSetting = (value) => {
        setType(value);
        getFbId();
    }

    const handleLoading =(value) =>{
      
        setListPageFB(value);
        setLoading(!loading)
    }
    async function getProfile() {
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
                        setProfileKOL(result.state);
                    }
                )
        }
        catch (error) {
        }
        finally {
        }
    }

    async function getFbId() {
        await fetch(DOMAIN_API + `social/get-user-info`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.length > 0) {
                        setFbUserID(result[0].id_user_social);
                    }
                })
        await fetch(DOMAIN_API + `social/get-list-page-info`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.length > 0) {
                        setListPageFB(result);
                    }
                }
            )
    }

    React.useEffect(() => {
        getProfile();
        getFbId();
    }, [loading,fbUserID])


    if (localStorage.access_token == null || localStorage.check_role =='2') {
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
    else {
        return (
            <div className="job_room" style={{ backgroundColor: "#f0f2f5"  }}>
                <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <Header_Access />
                </div>
                <div style={{ paddingTop: "70px" }}>
                    <div style={{ paddingRight: "10px", paddingTop: "20px" }}>

                        <Grid container >

                            <Grid item xs={2.5} sx={{ paddingRight: "20px" }}>
                                <div >
                                    <Job_Option ClickOption={HandleSetting} />
                                </div>
                            </Grid>

                            <Grid item xs={9.5}>
                                <div style={{ border: ' white' ,borderRadius: "5px" }}>
                                    {type == "0" && <Job_Statistic
                                        fbidDown={fbUserID}
                                        listpageDown={listPageFB}

                                        profile={profileKOL}
                                        fbid={(value) => { setFbUserID(value) }}
                                        listpage={(value) => {handleLoading(value)}} />}
                                    {type == "1" && <Job_Post
                                        listPageFB={listPageFB}
                                        fbUserID={fbUserID} />}

                                    {type == "2" && <List_Job_KOL
                                        listPageFB={listPageFB}
                                        fbUserID={fbUserID} />}
                                </div>

                            </Grid>

                        </Grid>
                    </div>
                </div>

            </div>
        );
    }
}