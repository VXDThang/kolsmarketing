import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import { useParams, useNavigate } from 'react-router-dom';

//file
import Header from '../Header_KOL/Header';
import Header_Access from '../Header_KOL/Header_access';
import Footer from '../../Footer/Footer'
//icon
import StarsIcon from '@mui/icons-material/Stars';
import { Avatar } from '@mui/material';
import { DOMAIN_FE, DOMAIN_API} from '../../../config/const'

//file
import Information from './Information'
import Recruitment from './Recruitment'
import Share from './Share'
import './Stalk.css'

//icon
import LinkIcon from '@mui/icons-material/Link';
import CallIcon from '@mui/icons-material/Call';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ChatIcon from '@mui/icons-material/Chat';

const commonStyles = {
  bgcolor: 'background.paper',
  border: 1,

};

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


const StalkBrand = () => {
  const navigate = useNavigate();
  let actoken = localStorage.access_token;
  const { id } = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profileBrand, setProfileBrand] = useState(null);
  const [isSave, setIsSave] = useState(false);

  async function handleOpenRoomMessage() {
    await fetch(DOMAIN_API + `message/open-room`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },
      body: JSON.stringify({ iduser: id, role: 2 })
    })
      .then(res => res.json())
      .then(
        (result) => {
          const url = DOMAIN_FE + `message/${result.id}/${id}/2`;
          window.open(url);
        }
      )
  }

  const ClickOpenMessage = () => {
    handleOpenRoomMessage()
  }

  async function handleUnSaveBrand() {
    let url1 = "";
    url1 = DOMAIN_API + `kols/unlike-brand`;
    await fetch(url1, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },
      body: JSON.stringify({ id_brand: id })
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsSave(false)
        }
      )
  }

  async function handleSaveBrand() {
    let url1 = "";
    url1 = DOMAIN_API + `kols/like-brand`;
    await fetch(url1, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },
      body: JSON.stringify({ id_brand: id })
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsSave(true)
        }
      )
  }

  async function getProfileBrand() {
    try {
      let url1 = "";
      url1 = DOMAIN_API + `brands/brand-info`;
      await fetch(url1, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": actoken
        },
        body: JSON.stringify({ id_brand: id })
      })
        .then(res => res.json())
        .then(
          (result) => {
            setProfileBrand(result);
            setIsSave(result.likeBrand)
            setLoading(true);
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
    getProfileBrand();
  }, [])

  if (localStorage.access_token == null || localStorage.check_role =='2') {
    localStorage.setItem("beforeLink", window.location.pathname);
    return (
      <div sx={{ flexGrow: 1 }}  >
        <Header />
        <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "10px" }}>
          Bạn cần đăng nhập để tiếp tục ...
        </div>

        <div>
          <Footer />
        </div>
      </div>
    )
  }
  else {

    return (
      <div>

        <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
          <Header_Access />
        </div>

        <div style={{ paddingTop: "70px" }}>
          <div className="back-ground-content">
            <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>

              {loading ?
                <div>
                  Đang tải dữ liệu ...
                </div>
                :
                <div>
                  <div role="presentation" onClick={handleClick} style={{ paddingBottom: "10px" }}>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
                      <Link underline="none" color="inherit" href="/" sx={{ "&:hover": { fontWeight: 500, color: "#00B14F" } }}
                        onClick={(event) => navigate(`/list-brand`)}>
                        Danh sách nhãn hàng
                      </Link>

                      <Typography color="text.primary">Nhãn hàng {profileBrand.brand_name}</Typography>
                    </Breadcrumbs>
                  </div>
                  <div >
                    <div className="cov" style={{ borderRadius: "5px" }}>
                      <div>
                        <img id="cover" src={profileBrand.cover ? profileBrand.cover : "../cover1.jpg"}
                          style={{ borderRadius: "5px 5px 0px 0px" }} />
                      </div>
                      <div className="ava">
                        <img id='avatar' src={profileBrand.avatar ? profileBrand.avatar : "../brand_ava.jpg"} />
                      </div>

                      <div style={{ width: "700px" }}>
                        <div className="name_brand" style={{ fontSize: "20px", fontWeight: "600" }}>
                          {profileBrand.brand_name}
                        </div>
                        <div className="link" style={{ fontSize: "14px", fontWeight: "300", marginBottom: "3px" }}>
                          <Grid container spacing={2}>
                            {/* ---- Infomation ---- */}
                            <Grid item xs={0.7}>
                              <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                <LinkIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                              </Avatar>
                            </Grid>
                            <Grid item xs={5.3}>
                              <div style={{ fontSize: "14px", fontWeight: "400" }}>
                                {profileBrand.bio_url.length > 0 ? profileBrand.bio_url[0]
                                  : "Chưa có thông tin"}
                              </div>
                            </Grid>

                            <Grid item xs={0.7}>
                              <Avatar sx={{ width: 28, height: 28, bgcolor: "#d4f5d6" }}>
                                <CallIcon sx={{ fontSize: 18, color: "#00B14F" }} />
                              </Avatar>
                            </Grid>
                            <Grid item xs={5.3}>
                              <div style={{ fontSize: "14px", fontWeight: "400" }}>
                                {profileBrand.phone ? profileBrand.phone : "Chưa có thông tin"}
                              </div>
                            </Grid>
                          </Grid>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div style={{ paddingTop: "20px" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={7.5}>
                        <Information brand_introduce={profileBrand.introduce} />
                        <div style={{ paddingTop: "20px" }}>
                          <Recruitment id_brand={profileBrand.id} brand_name={profileBrand.brand_name} />
                        </div>

                      </Grid>
                      <Grid item xs={4.5}>
                        <div style={{ paddingBottom: "15px" }}>
                          <Card sx={{ ...commonStyles, borderColor: '#00B14F', boxShadow: "none" }} >
                            <div className="d-flex justify-content-between" style={{ padding: "10px" }}>
                              <div style={{ fontWeight: 700, paddingTop: "5px" }}>
                                {isSave ? "Đã lưu nhãn hàng" : "Lưu nhãn hàng"}
                              </div>
                              <div>
                                {isSave ?
                                  <Tooltip title="Bỏ lưu nhãn hàng">
                                    <Button sx={{ height: "40px", bgcolor: "#FFCCFF" }}
                                      onClick={handleUnSaveBrand} >
                                      <HighlightOffIcon sx={{ fontSize: 20, color: "#DD0000" }} />
                                    </Button>
                                  </Tooltip>
                                  :
                                  <Tooltip title="Lưu nhãn hàng">
                                    <Button sx={{ height: "40px", bgcolor: "#d3f4d6" }}
                                      onClick={handleSaveBrand} >
                                      <StarsIcon sx={{ fontSize: 20, color: "#00B14F" }} />
                                    </Button>
                                  </Tooltip>
                                }

                              </div>
                            </div>

                            <div className="d-flex justify-content-between" style={{ padding: "10px", paddingTop: "5px" }}>
                              <div style={{ fontWeight: 700, paddingTop: "5px" }}>
                                Nhắn tin
                              </div>
                              <div>
                                <Tooltip title="Nhắn tin">
                                  <Button sx={{ height: "40px", bgcolor: "#CCCCFF" }}
                                    onClick={ClickOpenMessage} >
                                    <ChatIcon sx={{ fontSize: 20, color: "#0571ED" }} />
                                  </Button>
                                </Tooltip>
                              </div>
                            </div>

                          </Card>
                        </div>
                        <Share />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              }
            </div>
          </div >
        </div>

        <div>
          <Footer />
        </div>

      </div>

    );

  }

};

export default StalkBrand;