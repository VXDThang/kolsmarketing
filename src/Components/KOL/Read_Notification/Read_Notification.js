import * as React from 'react';
import Grid from '@mui/material/Grid';
import { useParams } from "react-router-dom";

//file
import Header from '../Header_KOL/Header';
import Header_Access from '../Header_KOL/Header_access';
import Content from './Content'
import Discussion from './Discussion'

import './Read_Notification.css'

export default function Read_Notification() {
    let { id_job,id_job_describe } = useParams();

    React.useEffect(() => {

    }, [])



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
            <div sx={{ flexGrow: 1 }}  >
                <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <Header_Access />
                </div>
                <div className="content_read_noti" style={{ paddingTop: "70px", backgroundColor: "#f0f2f5" }}>
                    <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <Content id_job={id_job} />
                            </Grid>
                            <Grid item xs={7}>
                                <Discussion id_job={id_job} id_job_describe={id_job_describe}/>
                            </Grid>

                        </Grid>
                    </div>
                </div>



            </div>
        );
    }
}