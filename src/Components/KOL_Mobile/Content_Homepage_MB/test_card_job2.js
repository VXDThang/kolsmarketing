import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState } from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'
import { Navigate, Link, useNavigate } from 'react-router-dom';

//file
import "./Content_Homepage.css"
import ToLogin from "../../Modals/ToLogin"

//icon
import { ThemeProvider, createTheme } from '@mui/material/styles';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';


const CardJob2 = ({ id, title, brandName, time, address, hot, cast, image_cover, likePost, brand_id }) => {
  const [openDialogToLogin, setOpenDialogToLogin] = useState(false);
  const navigate = useNavigate();
  let actoken = localStorage.access_token;
  const [isCheck, setIsCheck] = useState(likePost);
  let cast_Draft = Number(cast);
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

  function handleClickReadOne(e, id) {
    navigate(`/read-one/${id}`);
  }
  function handleClickStalkBrand(e, id) {
    navigate(`/stalkbrand/${id}`);
  }

  return (
    <div >
      <Card className="card-job" >
        <CardMedia
          component="img"
          height="140"
          image={image_cover ? image_cover : "cover_image_post.jpg"}
          alt="image"
          sx={{ cursor: "pointer" }}
          onClick={(e) => { handleClickReadOne(e, id) }}
        />
        <CardContent sx={{ marginLeft: "-10px", marginBottom: "-10px", marginTop: "-10px" }}>
          <div style={{ fontSize: "16px" }}>
            <div >
              <div className="titlenew" style={{ fontWeight: "700", color: "#2C6975", minHeight: "2.6rem", cursor: "pointer" }}
                onClick={(e) => { handleClickReadOne(e, id) }}>
                {title}
              </div>
              <div className="card-heart" style={{ paddingRight: "5px" }}>
                <Checkbox {...label}
                  defaultChecked={isCheck}
                  onChange={handleChangeCheckedBox}
                  color="success" sx={{ bgcolor: "#EEEEEE", height: 32, width: 32 }} icon={<FavoriteBorder />} checkedIcon={<Favorite />} />
              </div>
            </div>

            <div className="titlecardnew" style={{ fontWeight: "500", color: "#2C6975", cursor: "pointer" }}
              onClick={(event) => handleClickStalkBrand(event, brand_id)}>
              {brandName}
            </div>

            <div style={{ paddingTop: "5px" }} >
              <Stack direction="row" spacing={1}>
                <Chip size="small" color="primary" sx={{ bgcolor: "#DD2D34" }} label={cast_Main} />
                <Chip size="small" color="primary" sx={{ bgcolor: "#329D9C" }} label={address} />
              </Stack>
            </div>
          </div>
        </CardContent>
      </Card>
      <ToLogin
        isOpen={openDialogToLogin}
        isClose={(value) => setOpenDialogToLogin(false)}
      />
    </div>

  );
};

export default CardJob2;