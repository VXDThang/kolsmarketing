import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import CardHeader from '@mui/material/CardHeader';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import Divider from '@mui/material/Divider';
import { Carousel } from 'react-responsive-carousel';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton
} from "react-share";

//file
import "./Content_News.css"
import Apply_KOL from "../../Modals/Apply_KOL";
import ToLogin from "../../Modals/ToLogin";
//icon
import PaidIcon from '@mui/icons-material/Paid';
import PlaceIcon from '@mui/icons-material/Place';
import { Avatar } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WcIcon from '@mui/icons-material/Wc';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

const commonStyles = {
  bgcolor: 'background.paper',
  border: 1,

};

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


const Opportunity_Info = (props) => {

  const [isRecruitment, setIsRecruitment] = useState(props.isRecruit);
  const [isCopyLink, setIsCopyLink] = React.useState(false);
  const [openDialogToLogin, setOpenDialogToLogin] = useState(false);

  let min_cast_Draft = Number(props.min_cast);
  let min_cast_Main = min_cast_Draft.toLocaleString("vi");
  let max_cast_Draft = Number(props.max_cast);
  let max_cast_Main = max_cast_Draft.toLocaleString("vi");
  let cast = "";
  if (props.min_cast < props.max_cast) {
    cast = min_cast_Main + " - " + max_cast_Main;
  }
  else {
    cast = min_cast_Main;
  }
  const list_detail_image = props.image_detail;
  const image_cover = props?.image_cover?.length > 0 ? props?.image_cover : "../cover_image_post.jpg";

  const [applyModal, setApplyModal] = React.useState(false);

  React.useEffect(() => {
    setIsRecruitment(props.isRecruit);
  });

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href)
    setIsCopyLink(true);
    setTimeout(() => {
      setIsCopyLink(false);
    }, 3000);
  };

  const handleSetRecruitmentState = (value) => {
    setIsRecruitment(value);
    if (value)
      props.isApply(true);
    else
      props.isApply(false);
  }

  const handleOpenApplyModal = () => {
    if (localStorage.access_token == null) {
      localStorage.setItem("beforeLink", window.location.pathname);
      setOpenDialogToLogin(true);
    }
    else {

      setApplyModal(true);
    }
  }
  const handleCloseApplyModal = () => setApplyModal(false);


  return (
    <div>
      <Card sx={{ ...commonStyles, borderColor: '#00B14F' }}>
        <Box >
          <div className="back-ground-content-job" style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "10px" }}>
            <div style={{ fontWeight: "bold", color: "#00B14F", fontSize: "18px", paddingBottom: "15px" }}>Thông tin cơ hội</div>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <div style={{ paddingBottom: "15px", paddingTop: "15px" }}>
                  <Box style={{ backgroundColor: "#f5f6f9", padding: "0px", borderRadius: "5px" }}>
                    <div style={{ fontWeight: 700, padding:"10px 0px 0px 20px" }}> Thông tin cơ bản</div>
                    <div >
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <CardHeader
                            avatar={
                              <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                <PaidIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                              </Avatar>
                            }
                            title="Mức lương"
                            subheader={cast}
                          />
                        </Grid>
                        <Grid item xs={6} >
                          <CardHeader
                            avatar={
                              <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                <PeopleAltIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                              </Avatar>
                            }
                            title="Số lượng"
                            subheader={props.amount}
                          />
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "-20px" }}>
                          <CardHeader
                            avatar={
                              <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                <PlaceIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                              </Avatar>
                            }
                            title="Địa điểm"
                            subheader={props.address}
                          />
                        </Grid>
                        <Grid item xs={6} sx={{ marginTop: "-20px" }}>
                          <CardHeader
                            avatar={
                              <Avatar sx={{ width: 36, height: 36, bgcolor: "#d3f4d6" }}>
                                <WcIcon sx={{ fontSize: 24, color: "#00B14F" }} />
                              </Avatar>
                            }
                            title="Giới tính"
                            subheader={props.gender}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </Box>
                </div>

                <div>
                  <div style={{ paddingBottom: "15px" }}>
                    <div style={{ fontWeight: 700 }}>
                      Mô tả công việc
                    </div>
                    <div>
                      {props.content}
                    </div>
                  </div>
                  <div style={{ paddingBottom: "15px" }}>
                    <div style={{ fontWeight: 700 }}>
                      Yêu cầu ứng viên
                    </div>
                    <div>
                      {props.requirement}
                    </div>
                  </div>
                  <div style={{ paddingBottom: "15px" }}>
                    <div style={{ fontWeight: 700 }}>
                      Quyền lợi
                    </div>
                    <div>
                      {props.benefit}
                    </div>
                  </div>

                  <div style={{ paddingBottom: "15px" }}>
                    <div style={{ fontWeight: 700 }}>
                      Cách thức ứng tuyển
                    </div>
                    <div>
                      Ứng viên nộp hồ sơ trực tuyến bằng cách bấm Ứng tuyển ngay dưới đây
                    </div>
                    <div style={{ paddingTop: "10px" }}>
                      <Stack sx={{ marginLeft: "-8px" }} direction="row" spacing={2}>
                        {isRecruitment ?
                          <Button
                            variant="outlined" style={{ marginLeft: "10px", textTransform: 'capitalize', color: "#00B14F", }} startIcon={<LibraryAddCheckIcon />}>
                            Đã ứng tuyển
                          </Button> :
                          <Button onClick={handleOpenApplyModal}
                            variant="outlined" style={{ marginLeft: "10px", textTransform: 'capitalize', color: "#00B14F", }} startIcon={<SendIcon />}>
                            Ứng tuyển ngay
                          </Button>
                        }
                      </Stack>
                    </div>
                  </div>

                </div>

              </Grid>
              <Grid item xs={12}>
                <Box sx={{ ...commonStyles, borderColor: '#00B14F',  borderRadius: "5px" }} >
                  <div style={{ padding: "10px" }}>
                    <div style={{ fontWeight: 700 }}>
                      Chia sẻ tin tuyển dụng
                    </div>
                    <div>
                      Sao chép đường dẫn
                    </div>
                    <div className="d-flex justify-content-between" style={{ paddingTop: "15px", paddingBottom: "10px" }}>

                      <TextField
                        id="outlined-read-only-input"
                        label="Link"
                        size="small"
                        defaultValue={window.location.href}
                        InputProps={{
                          readOnly: true,
                        }}
                        sx={{ width: "75%" }}

                      />
                      <div >
                        <Tooltip title="Sao chép">
                          <Button sx={{ height: "40px", bgcolor: "#d3f4d6" }}
                            onClick={handleCopyLink} >
                            <ContentCopyIcon sx={{ fontSize: 20, color: "#00B14F" }} />
                          </Button>
                        </Tooltip>

                      </div>
                    </div>

                    <div>
                      Chia sẻ tin qua mạng xã hội
                    </div>
                    <Stack
                      direction="row"
                      spacing={1}
                      sx={{ marginLeft: "-2px" }}
                    >
                      <FacebookShareButton
                        url={window.location.href}
                        quote={"KolsMarketing"}
                        className="Demo__some-network__share-button"
                      >
                        <FacebookIcon sx={{ fontSize: 40, color: "#1976D2" }} />
                      </FacebookShareButton>
                      <TwitterShareButton
                        url={window.location.href}
                        quote={"KolsMarketing"}
                        className="Demo__some-network__share-button"
                      >
                        <TwitterIcon sx={{ fontSize: 40, color: "#1976D2" }} />
                      </TwitterShareButton>

                      <LinkedinShareButton
                        url={window.location.href}
                        quote={"KolsMarketing"}
                        className="Demo__some-network__share-button"
                      >
                        <LinkedInIcon sx={{ fontSize: 40, color: "#1976D2" }} />
                      </LinkedinShareButton>
                    </Stack>

                  </div>
                  {isCopyLink ? <Alert severity="success">Đã sao chép</Alert> : ""}
                </Box>

                <Box sx={{ ...commonStyles, borderColor: '#00B14F', marginTop: "15px", borderRadius: "5px" }} >
                  <div style={{ padding: "10px" }}>
                    <div style={{ fontWeight: 700 }}>
                      Một số hình ảnh minh họa
                    </div>

                    <div className="d-flex justify-content-center" style={{ paddingTop: "15px", paddingBottom: "10px" }}>
                      {list_detail_image.length > 0 ?
                        <Carousel showThumbs={false} style={{ maxHeight: "500px", width: "auto" }} >
                          <div className="d-flex justify-content-center" >
                            <img src={image_cover} />
                          </div>
                          {list_detail_image.length > 0 && list_detail_image.map((list, index) => (
                            <div key={index} className="d-flex justify-content-center" >
                              <img src={list.image} />
                            </div>
                          ))}
                        </Carousel>
                        :
                        <Carousel showThumbs={false} style={{ maxHeight: "500px", width: "auto" }} >
                          <div className="d-flex justify-content-center" >
                            <img src={image_cover} />
                          </div>
                        </Carousel>
                      }
                    </div>



                  </div>

                </Box>
              </Grid>
            </Grid>
          </div>
        </Box>
      </Card>
      <Apply_KOL
        isApply={(value) => handleSetRecruitmentState(value)}
        isOpen={applyModal}
        isClose={(value) => handleCloseApplyModal(value)}
        idPost={props.id}
        idBrand={props.id_brand}
      />

      <ToLogin
        isOpen={openDialogToLogin}
        isClose={(value) => setOpenDialogToLogin(false)}
      />
    </div >
  )
}

export default Opportunity_Info;