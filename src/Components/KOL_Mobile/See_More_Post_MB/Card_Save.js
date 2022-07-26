import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
//file
import "./Card.css"

import { DOMAIN_API } from '../../../config/const'
import { useNavigate } from 'react-router-dom';
import ToLogin from "../../Modals/ToLogin"

//icon
import { createTheme } from '@mui/material/styles';
import PaidIcon from '@mui/icons-material/Paid';
import PlaceIcon from '@mui/icons-material/Place';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ReportIcon from '@mui/icons-material/Report';

const CardSave = ({ id, idBrand, title, brandName, time, address, hot, cast, image_cover, likePost }) => {
    const [openDialogToLogin, setOpenDialogToLogin] = useState(false);

    let actoken = localStorage.access_token;
    const navigate = useNavigate();
    let cast_Draft = Number(cast);
    let cast_Main = cast_Draft.toLocaleString("vi");
    const [isCheck, setIsCheck] = React.useState(likePost);
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


    function handleClickReadOne() {
        navigate(`/read-one/${id}`);
    }
    function handleClickStalkBrand() {
        navigate(`/stalkbrand/${idBrand}`);
    }

    const handleChangeCheckedBox = () => {
        if (localStorage.access_token == null) {
          localStorage.setItem("beforeLink", window.location.pathname);
          setIsCheck(false);
          setOpenDialogToLogin(true);
        }
        else {
          if (isCheck) {
            fetch(DOMAIN_API + `posts/unlike-post`, {
              method: "DELETE",
              headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
              },
              body: JSON.stringify({ id_post: id })
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
              body: JSON.stringify({ id_post: id })
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
    
    
      }

    return (
        <div style={{ paddingBottom: "10px" }} >

            <Card className="card-job" sx={{ display: 'flex', flexDirection: 'column', height: 140 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardMedia
                        component="img"
                        sx={{ minWidth: 100, maxWidth: 100, height: 100, cursor: "pointer", borderRadius: "5px" }}
                        image={image_cover?.length > 0 ? image_cover : "cover_image_post.jpg"}
                        alt="img"
                        onClick={(e) => { handleClickReadOne() }}
                    />
                    <div style={{ fontSize: "16px", paddingLeft: "10px", paddingTop: "10px" }}>
                        <div >
                            <div className="titleCardSave" 
                            style={{ fontWeight: "700", cursor: "pointer", maxWidth: "73%"  }}
                                onClick={(e) => { handleClickReadOne() }}>
                                {title}
                            </div>
                            <div className="card-delete" style={{ paddingRight: "0px", paddingTop: "20px" }}>
                                <Checkbox {...label}
                                    defaultChecked={isCheck}
                                    onChange={handleChangeCheckedBox} color="success" icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
                            </div>
                        </div>

                        <div className="title-card" style={{ color: "#2C6975", fontWeight: "500", cursor: "pointer" }}
                            onClick={(event) => handleClickStalkBrand()}>
                            {brandName}
                        </div>
                        <div >
                            {time}
                        </div>
                       
                    </div>
                </Box>
                <div style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                            <Stack direction="row" spacing={1}>
                                <Chip size="small" icon={<PaidIcon />} label={cast_Main} />
                                <Chip size="small" icon={<PlaceIcon />} label={address} />
                                {hot == "1" ? <Chip size="small" color="primary" sx={{ bgcolor: "#DD0000" }} icon={<ReportIcon />} label="HOT" /> : ""}
                            </Stack>
                        </div>
            </Card>
            <ToLogin
        isOpen={openDialogToLogin}
        isClose={(value) => setOpenDialogToLogin(false)}
      />
        </div>

    );
};

export default CardSave;