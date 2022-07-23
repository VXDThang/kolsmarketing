import * as React from 'react';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { DOMAIN_API } from '../../../../config/const'
import Divider from '@mui/material/Divider';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { useParams } from "react-router-dom";
//file

import List_Card from './List_Card';
import List_Brand from './List_Brand';




function handleClick(event) {
    event.preventDefault();
}

export default function Result_Search() {
    let { id_cate, id_province, mess_cate, mess_address } = useParams();
    const navigate = useNavigate();
    const divRef = useRef(null);

    const [value, setValue] = React.useState(0);
    let actoken = localStorage.access_token;
    const [error, setError] = React.useState(null);
    const [loadingSearchPost, setLoadingSearchPost] = React.useState(true);
    const [listSearchPost, setListSearchPost] = React.useState([]);

    const [stringSearchCate, setStringSearchCate] = React.useState("");
    const [stringSearchAddress, setStringSearchAddress] = React.useState("");

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const executeScroll = () => {
        if (divRef?.current) {
            divRef.current.scrollIntoView({ block: "center" })
        }
    }

    async function getListSearchPost() {
        let list_categories = [];
        let list_address = [];
        if (id_cate != "none") {
            list_categories = id_cate.split("-")
        }
        if (id_province != "none") {
            list_address = id_province.split("-")
        }

        try {
            let url2 = "";
            url2 = DOMAIN_API + `search/homepage`;
            await fetch(url2, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
    
                },
                body: JSON.stringify({ list_categories: list_categories, list_address: list_address })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setListSearchPost(result);
                    }
                )
        }
        catch (error) {
            setError(error)
        }
        finally {
            setLoadingSearchPost(false);
        }
    }



    React.useEffect(() => {
        getListSearchPost();
        executeScroll();
    }, [id_cate, id_province,loadingSearchPost])

    const handleClickSearchAddress = () => {
        navigate(`/search/none/${id_province}/none/${mess_address}`);
    }

    const handleClickSearchCate = () => {
        navigate(`/search/${id_cate}/none/${mess_cate}/none`);
    }
    return (
        <div sx={{ flexGrow: 1 }}  >
            <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>

                <div ref={divRef}
                 role="presentation" onClick={handleClick} style={{ paddingBottom: "10px" }}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
                        <Link underline="none" color="inherit" href="/" sx={{ "&:hover": { fontWeight: 500, color: "#00B14F" } }}
                            onClick={(event) => navigate(`/`)}>
                            <span >
                                Trang chủ
                            </span>
                        </Link>
                        {mess_cate != "none" ?
                            <Link
                                underline="none"
                                color="inherit"
                                onClick={handleClickSearchCate}
                                sx={{ "&:hover": { fontWeight: 500, color: "#00B14F", cursor: "pointer" } }}
                            >
                                <span  >
                                    <span style={{ fontWeight: 400, fontColor: "#212526" }}>Tìm kiếm cơ hội về lĩnh vực:</span>
                                    <span style={{ fontWeight: 600, fontColor: "#660066" }}> {mess_cate} </span>
                                </span>
                            </Link>
                            : ""
                        }

                        {mess_address != "none" ?
                            <Link
                                underline="none"
                                color="inherit"
                                onClick={handleClickSearchAddress}
                                sx={{ "&:hover": { fontWeight: 500, color: "#00B14F", cursor: "pointer" } }}
                            >
                                <span >
                                    <span style={{ fontWeight: 400, fontColor: "#212526" }}>Tìm kiếm cơ hội tại:</span>
                                    <span style={{ fontWeight: 600, fontColor: "#660066" }}> {mess_address} </span>
                                </span>
                            </Link>
                            : ""
                        }


                        <Typography color="text.primary">
                            <span style={{ fontSize: "15px" }}>
                                Kết quả tìm kiếm được
                            </span>
                        </Typography>
                    </Breadcrumbs>
                </div>
                <Card>
                    <div >
                        <div style={{ paddingTop: "15px", paddingBottom: "15px", paddingLeft: "20px", paddingRight: "10px" }}>
                            Tìm thấy {listSearchPost.length} cơ hội phù hợp
                        </div>
                        <div style={{}}>
                            <Divider sx={{ color: "#660066" }} />
                        </div>
                        <div  id="current">
                            <Grid container spacing={2}>
                                <Grid item xs={8}>
                                    {loadingSearchPost ?
                                        <div style={{ paddingTop: "10px", paddingLeft: "20px" }}>
                                            Đang tải dữ liệu ...
                                        </div>
                                        :
                                        <div>
                                            <List_Card type={1}
                                                listSearchPost={listSearchPost} />
                                        </div>}

                                </Grid>
                                <Grid item xs={4}>
                                    <div style={{ paddingTop: "20px", paddingRight: "20px" }}>
                                        <Card sx={{}}>
                                            <div style={{ paddingLeft: "10px", paddingRight: "10px" }}>
                                                <div style={{
                                                    fontSize: "18px", fontWeight: 600, paddingBottom: "10px", paddingTop: "10px",
                                                    color: "#00B14F", textAlign: "center"
                                                }}>
                                                    Có thể bạn quan tâm
                                                </div>
                                                <div style={{ paddingTop: "5px", paddingBottom: "5px" }}>
                                                    <Divider sx={{ color: "#00B14F" }} />
                                                </div>
                                                <div>
                                                    <List_Brand type={1} />
                                                </div>

                                            </div>
                                        </Card>
                                    </div>


                                </Grid>

                            </Grid>
                        </div>

                    </div>

                </Card>

            </div>


        </div>
    );
}
