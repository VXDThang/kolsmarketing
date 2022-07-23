import * as React from 'react';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

//file
import "./Content_News.css"
import CardJob2 from "../Content_Homepage_MB/test_card_job2"

//icon
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'


const commonStyles = {
    bgcolor: 'background.paper',
    border: 1,

};

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}


const Opportunity_Other = ({ id_post }) => {
    let actoken = localStorage.access_token;

    const [listSuggestPost, setListSuggestPost] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    async function getSuggestPost() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `posts/get-suggest-post`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                   
                },
                body: JSON.stringify({ id_post: id_post })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setListSuggestPost(result)
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
        getSuggestPost();
    }, [id_post])

    return (
        <div>
            <Card sx={{ ...commonStyles, borderColor: '#00B14F' }}>
                <Box >
                    <div className="back-ground-content-job" style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "15px" }}>
                        <div style={{ fontWeight: "bold", color: "#00B14F", fontSize: "18px", paddingBottom: "15px" }}>Những cơ hội khác</div>
                        <Divider />
                        {loading ?
                            <div style={{ paddingTop: "10px" }}>
                                Đang tải dữ liệu ...
                            </div>
                            : ""
                        }
                        <div style={{ paddingTop: "10px" }}>
                            <Grid container spacing={2}>
                                {listSuggestPost.length > 0 && listSuggestPost.map((list) => (
                                    <Grid key={list.id} item xs={12}>
                                        <CardJob2 id={list.id}
                                            title={list.title} brandName={list.brand_name} time={list.write_time}
                                            address={list.address} hot={list.hot} cast={list.max_cast ? list.max_cast : list.min_cast}
                                            image_cover={list.image_cover ? list.image_cover : "../cover_image_post.jpg"} likePost={list.likePost} brand_id={list.id_writer} />
                                    </Grid>
                                ))
                                }
                            </Grid>
                        </div>

                        <div style={{ paddingTop: "10px" }}>
                            <Grid container spacing={2}>
                                {/* <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid>
                                <Grid item xs={3}>
                                    <CardJob2 />
                                </Grid> */}
                            </Grid>
                        </div>
                    </div>
                </Box>
            </Card>
        </div >
    )
}

export default Opportunity_Other;