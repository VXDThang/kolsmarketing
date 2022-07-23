import * as React from 'react';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import { DOMAIN_API } from '../../../config/const'

//file
import "./Content_News.css"
import CardJob1 from "../Content_Homepage_KOL/test_card_job";

//icon
import PlaceIcon from '@mui/icons-material/Place';
import { Avatar } from '@mui/material';
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { useNavigate } from 'react-router-dom';

const commonStyles = {
    bgcolor: 'background.paper',
    border: 1,

};

const Brand_Info = (props) => {
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [listOppor, setListOppor] = useState([]);

    async function getListOpportunity() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `posts/kol-get-2active-post-of-brand`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                   
                },
                body: JSON.stringify({ id_brand: props.detailBrand.id, id_post:props.id_post })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setListOppor(result);
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
        getListOpportunity();
    }, [])

    function handleClickStalkBrand(e,id) {
        navigate(`/stalkbrand/${id}`);
      }
    

    return (
        <div>
            <Card sx={{ ...commonStyles, borderColor: '#00B14F' }}>
                <Box >
                    <div className="back-ground-content-job" style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "15px" }}>
                        <div style={{ fontWeight: "bold", color: "#00B14F", fontSize: "18px", paddingBottom: "15px" }}>Thông tin nhãn hàng</div>
                        <Divider />
                        <div style={{ paddingTop: "10px" }}>
                            <Grid container spacing={2}>
                                {/* ---- Infomation ---- */}
                                <Grid item xs={0.5}>
                                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                        <StoreMallDirectoryIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                                    </Avatar>
                                </Grid>
                                <Grid item xs={11.5}>
                                    <div className='d-flex justify-content-between'>
                                        <div style={{ fontWeight: "bold" }}>
                                            Giới thiệu
                                        </div>
                                        <div style={{ fontWeight: 500, fontSize: "14px", color: "#00B14F", cursor:"pointer"  }}
                                        onClick={(event)=>handleClickStalkBrand(event,props.detailBrand.id)}>
                                            Xem trang nhãn hàng
                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={0.5}>

                                </Grid>
                                {props.detailBrand.introduce ?
                                    <Grid item xs={11.5}>
                                        <div style={{ marginTop: "-10px" }} >
                                            <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 500, fontSize: "14px", fontFamily: "Arial" }}>
                                                {props.detailBrand.introduce}
                                            </pre>
                                        </div>
                                    </Grid>
                                    :
                                    <Grid item xs={11.5}>
                                        <div style={{ marginTop: "-10px" }} >
                                            Nhãn hàng chưa đề cập thông tin
                                        </div>
                                    </Grid>
                                }

                                {/* ---- Place ---- */}
                                <Grid item xs={0.5}>
                                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                        <PlaceIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                                    </Avatar>
                                </Grid>
                                <Grid item xs={11.5}>
                                    <div className='d-flex justify-content-between'>
                                        <div style={{ fontWeight: "bold" }}>
                                            Vị trí
                                        </div>
                                        {/* <div style={{ fontWeight: 500, fontSize: "14px", color: "#00B14F", cursor:"pointer"  }}>
                                            Xem trên bản đồ
                                        </div> */}
                                    </div>
                                </Grid>
                                <Grid item xs={0.5}>

                                </Grid>
                                {props.detailBrand.address ?
                                    <Grid item xs={11.5}>
                                        <div style={{ marginTop: "-10px" }} >
                                            {props.detailBrand.address}
                                        </div>
                                    </Grid>
                                    :
                                    <Grid item xs={11.5}>
                                        <div style={{ marginTop: "-10px" }} >
                                            Nhãn hàng chưa đề cập thông tin
                                        </div>
                                    </Grid>
                                }


                                {/* ---- Place ---- */}
                                <Grid item xs={0.5}>
                                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                        <LocalPhoneIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                                    </Avatar>
                                </Grid>
                                <Grid item xs={11.5}>
                                    <div className='d-flex justify-content-between'>
                                        <div style={{ fontWeight: "bold" }}>
                                            Điện thoại
                                        </div>
                                        <div style={{ fontWeight: 500, fontSize: "14px", color: "#00B14F" }}>

                                        </div>
                                    </div>
                                </Grid>
                                <Grid item xs={0.5}>

                                </Grid>
                                {props.detailBrand.phone ?
                                    <Grid item xs={11.5}>
                                        <div style={{ marginTop: "-10px" }} >
                                            {props.detailBrand.phone}
                                        </div>
                                        <div style={{ paddingTop: "15px" }}>
                                            <Divider />
                                        </div>
                                    </Grid>
                                    :
                                    <Grid item xs={11.5}>
                                        <div style={{ marginTop: "-10px" }} >
                                            Nhãn hàng chưa đề cập thông tin
                                        </div>
                                        <div style={{ paddingTop: "15px" }}>
                                            <Divider />
                                        </div>
                                    </Grid>
                                }


                                {/* ---- Opportunity ---- */}
                                <Grid item xs={0.5}>
                                    <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                        <BusinessCenterIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                                    </Avatar>
                                </Grid>
                                <Grid item xs={11.5}>
                                    <div className='d-flex justify-content-between'>
                                        <div style={{ fontWeight: "bold" }}>
                                            Cơ hội cùng nhãn hàng
                                        </div>
                                        <div style={{ fontWeight: 500, fontSize: "14px", color: "#00B14F", cursor:"pointer" }}
                                        onClick={(event)=>handleClickStalkBrand(event,props.detailBrand.id)}>
                                            Xem thêm
                                        </div>
                                    </div>
                                </Grid>

                                {error ?
                                    <div>
                                        Bị lỗi tải dữ liệu
                                    </div>
                                    :
                                    loading ?
                                        <div>
                                            Đang tải dữ liệu
                                        </div>
                                        :
                                        listOppor.length > 0 && listOppor.map((list) => (
                                                <Grid item xs={6} key={list.id}>
                                                    <CardJob1
                                                        id={list.id}
                                                        title={list.title} brandName={props.detailBrand.name} time={list.write_time}
                                                        address={list.address} hot={list.hot} cast={list.max_cast ? list.max_cast : list.min_cast}
                                                        image_cover={list.image_cover?list.image_cover:"../cover_image_post.jpg"} likePost={list.likePost} brand_id={props.detailBrand.id} />
                                                </Grid>
                                            ))
                                }

                                {/* <Grid item xs={6}>
                                    <CardJob1 />
                                </Grid>
                                <Grid item xs={6}>
                                    <CardJob1 />
                                </Grid> */}


                            </Grid>
                        </div>
                    </div>
                </Box>
            </Card>
        </div >
    )
}

export default Brand_Info;