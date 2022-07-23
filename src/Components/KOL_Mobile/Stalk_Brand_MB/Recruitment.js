import * as React from 'react';
import { useState } from "react";
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

//icon
import { DOMAIN_API } from '../../../config/const'

//file
import Card_Recruit from "../Content_Homepage_MB/test_card_job"
const commonStyles = {
    bgcolor: 'background.paper',
    border: 1,

};

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}


const Recruitment = ({ id_brand, brand_name }) => {

    let actoken = localStorage.access_token;

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [listActivePost, setListActivePost] = useState([]);

    async function getListPost() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `posts/kol-get-active-post-of-brand`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_brand: id_brand })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setListActivePost(result);
                        setLoading(false);
                        setError(null);
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
        getListPost();
    }, [id_brand])

    return (
        <div>
            <Card sx={{ ...commonStyles, borderColor: '#00B14F',boxShadow:"none" }}>
                <Box >
                    <div className="back-ground-content-job" style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "15px" }}>
                        <div style={{ fontWeight: "bold", color: "#00B14F", fontSize: "18px", paddingBottom: "0px" }}>
                            Tuyển dụng ({listActivePost.length})</div>
                        <Divider />

                        {loading ?
                            <div style={{ paddingTop: "10px" }}>
                                Đang tải dữ liệu ...
                            </div>
                            : ""

                        }
                        <div>
                            {listActivePost.length > 0 && listActivePost.map((list) => (
                                <div key={list.id} style={{ paddingTop: "10px" }}>
                                    <Card_Recruit id={list.id}
                                        title={list.title} brandName={brand_name} time={list.write_time}
                                        address={list.address} hot={list.hot} cast={list.max_cast ? list.max_cast : list.min_cast}
                                        image_cover={list.image_cover?list.image_cover: "../cover_image_post.jpg"} likePost={list.likePost} brand_id={id_brand} />
                                </div>
                            ))}
                        </div>
                        {/* <div style={{ paddingTop: "10px" }}>
                            <Card_Recruit />
                        </div>
                        <div style={{ paddingTop: "10px" }}>
                            <Card_Recruit />
                        </div>
                        <div style={{ paddingTop: "10px" }}>
                            <Card_Recruit />
                        </div> */}
                    </div>
                </Box>
            </Card>
        </div >
    )
}

export default Recruitment;