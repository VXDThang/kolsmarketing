import * as React from 'react';
import Grid from '@mui/material/Grid';
import { DOMAIN_API } from '../../../config/const'
import { useParams } from "react-router-dom";

//file
import Header from '../Header_KOL/Header';
import Header_Access from '../Header_KOL/Header_access';
import Content from './Content'
import Discussion from './Discussion'
import Dialog_Box from './Dialog_Box'

import './Read_Notification.css'

export default function Invite_Job() {
    let actoken = localStorage.access_token;
    let { id_post, linkcode } = useParams();

    const [isMemberInJob, setIsMemberInJob] = React.useState(false);



    async function isExistKolInJob(id_post) {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `jobs/is-exist-kol-in-job`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_post: id_post })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if(result)
                        setIsMemberInJob(true);
                        else
                        setIsMemberInJob(false);
                    }
                )
        }
        catch (error) {
            console.log("error: ", error)
        }
    }


    React.useEffect(() => {
        isExistKolInJob(id_post)
    }, [id_post, linkcode])


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
                                <Content id_job={id_post} />
                            </Grid>
                            <Grid item xs={7}>
                                {isMemberInJob?
                                <Discussion  id_job={id_post} />
                                :
                                 <Dialog_Box id_post={id_post}
                                 linkcode={linkcode}
                                 isMember={(value)=> setIsMemberInJob(value)} />
                                 }
                               
                            </Grid>

                        </Grid>
                    </div>
                </div>



            </div>
        );
    }
}