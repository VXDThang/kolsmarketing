import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

//file
import "./Card.css"

//icon
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'
import { Navigate, Link, useNavigate } from 'react-router-dom';




const Offer_Card = ({ detail }) => {
    const navigate = useNavigate();
    let actoken = localStorage.access_token;
    let cast_Draft = Number(detail?.max_cast);
    let cast_Main = cast_Draft.toLocaleString("vi");
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const theme = createTheme({
        components: {
            MuiChip: {
                styleOverrides: {
                    colorPrimary: {
                        backgroundColor: 'yellow',
                    },
                    colorSecondary: {
                        backgroundColor: 'brown',
                    },
                },
            },
        },
    });

    const [isCheck, setIsCheck] = useState(detail?.likePost);

    const handleChangeCheckedBox = () => {
        if (isCheck) {
            fetch(DOMAIN_API + `posts/unlike-post`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_post: detail?.id })
            })
                .then(res => res.json())
                .then(
                    (result2) => {
                        if (result2) {
                            setIsCheck(false);
                        }
                    }
                ).catch(error => {
                    console.log("Error: ", error);
                })
        }
        else {
            fetch(DOMAIN_API + `posts/like-post`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_post: detail?.id })
            })
                .then(res => res.json())
                .then(
                    (result2) => {
                        if (result2) {
                            setIsCheck(true);
                        }
                    }
                ).catch(error => {
                    console.log("Error: ", error);
                })
        }

    }

    function handleClickReadOne(e, id) {
        navigate(`/read-one/${id}`);
    }
    function handleClickStalkBrand(e, id) {
        navigate(`/stalkbrand/${id}`);
    }

    return (
        <div style={{ paddingBottom: "15px" }} >
            <Card className="card-job">
                <CardMedia
                    component="img"
                    height="140"
                    image={detail?.image_cover ? detail.image_cover : "cover_image_post.jpg"}
                    alt="image jpb"
                    sx={{ cursor: "pointer" }}
                    onClick={(e) => { handleClickReadOne(e, detail?.id) }}
                />
                <CardContent sx={{ marginLeft: "-10px", marginBottom: "-10px", marginTop: "-10px" }}>
                    <div style={{ fontSize: "16px" }}>
                        <div >
                            <div style={{ fontWeight: "700", color: "#2C6975", cursor: "pointer" }}
                                onClick={(e) => { handleClickReadOne(e, detail?.id) }}>
                                {detail?.title}
                            </div>
                            <div className="card-heart" style={{ paddingRight: "5px" }}>
                                <Checkbox {...label}
                                    defaultChecked={isCheck}
                                    onChange={handleChangeCheckedBox}
                                    color="success" sx={{ bgcolor: "#EEEEEE", height: 32, width: 32 }} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                            </div>
                        </div>
                        <div style={{ fontWeight: "500", color: "#2C6975", cursor: "pointer" }}
                            onClick={(event) => handleClickStalkBrand(event, detail?.id_writer)}>
                            {detail?.brand_name}
                        </div>

                        <div style={{ paddingTop: "5px" }} >
                            <Stack direction="row" spacing={1}>
                                <Chip size="small" color="primary" sx={{ bgcolor: "#DD2D34" }} label={cast_Main} />
                                <Chip size="small" color="primary" sx={{ bgcolor: "#329D9C" }} label={detail?.address} />
                            </Stack>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>

    );
};

export default Offer_Card;