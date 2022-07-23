import * as React from 'react';

import { Navigate, Link, useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../../config/const'
import { useParams } from "react-router-dom";

//file
import Content from './Content'
import Discussion from './Discussion'

import './Read_Notification.css'

export default function Read_Notification({idJobDescribe,idPost,idUser}) {

    React.useEffect(() => {

    }, [])



    return (
        <div sx={{ flexGrow: 1 }}  >
            <div className="content_read_noti" style={{  backgroundColor: "#f0f2f5" }}>
                <div>
                    <Content id_job={idPost} />
                </div>
                <div style={{paddingTop:"10px"}}>
                    <Discussion id_job={idPost} id_job_describe={idJobDescribe} />
                </div>
            </div>



        </div >
    );
}
