import * as React from 'react';
import Button from '@mui/material/Button';
import { useState, useRef } from "react";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import { DOMAIN_API } from '../../../config/const'
import { useNavigate } from 'react-router-dom';
//file
import "./Content_News.css";
import Opportunity_Info from "./Opportunity_Info";
import Brand_Info from "./Brand_Info";
import Opportunity_Other from "./Opportunity_Other";
import Apply_KOL from "../../Modals/Apply_KOL";
import ToLogin from "../../Modals/ToLogin";

//icon
import Favorite from '@mui/icons-material/Favorite';
import SendIcon from '@mui/icons-material/Send';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}


const Content_News = (props) => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [detailPost, setDetailPost] = React.useState({});
  const [isRecruitment, setIsRecruitment] = useState(detailPost.recruitment);
  const listImage = [];
  const [list, setList] = React.useState([]);

  const [openDialogToLogin, setOpenDialogToLogin] = useState(false);

  const [applyModal, setApplyModal] = React.useState(false);

  const loadingPageRef = useRef(null);

  const inforPostRef = useRef(null);
  const inforBrandRef = useRef(null);
  const suggestPostRef = useRef(null);

  const executeInforPostScroll = () => {
    inforPostRef.current.scrollIntoView()
  }
  const executeInforBrandScroll = () => {
    inforBrandRef.current.scrollIntoView()
  }
  const executeSuggestScroll = () => {
    suggestPostRef.current.scrollIntoView()
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

  const handleSetRecruitmentState = (value) => {
    //detailPost.recruitment = value;
    setIsRecruitment(value);
  }

  const handleCloseApplyModal = () => {
    //detailPost.recruitment=true;
    setApplyModal(false);
  }



  //Save Opportuniyu
  const [isSaveOpp, setIsSaveOpp] = useState(false);

  let actoken = localStorage.access_token;
  const id_post = props.idPost;

  async function getDetailPost() {
    try {
      if(localStorage.access_token !== null && localStorage.access_token !== undefined){
        let url1 = "";
        url1 = DOMAIN_API + `posts/get-detail-post/${id_post}`;
        await fetch(url1, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "x-access-token": actoken
          },
          body: JSON.stringify({ id_post: id_post })
        })
          .then(res => res.json())
          .then(
            (result) => {
              setLoading(true);
              setDetailPost(result);
              setIsSaveOpp(result.likePost);
              for (let i = 0; i < result.image_detail.length; i++) {
                listImage.push({ "image": result.image_detail[i] });
              }
              setList(listImage);
              setError(null);
              setIsRecruitment(result.recruitment);
            }
          )
      }
      else{
        let url1 = "";
        url1 = DOMAIN_API + `posts/get-detail-post/${id_post}`;
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
              setLoading(true);
              setDetailPost(result);
              setIsSaveOpp(result.likePost);
              for (let i = 0; i < result.image_detail.length; i++) {
                listImage.push({ "image": result.image_detail[i] });
              }
              setList(listImage);
              setError(null);
              setIsRecruitment(result.recruitment);
            }
          )
      }
      
    }
    catch (error) {
      setError(error)
    }
    finally {
      setLoading(false);
    }
  }
  React.useEffect(() => {
    getDetailPost();
    loadingPageRef.current?.scrollIntoView()
  }, [id_post])

  const handleSaveOpportunity = () => {
    if (localStorage.access_token == null) {
      localStorage.setItem("beforeLink", window.location.pathname);
      setOpenDialogToLogin(true);
    }
    else {
      fetch(DOMAIN_API + `posts/like-post`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": actoken
        },
        body: JSON.stringify({ id_post: detailPost.id })
      })
        .then(res => res.json())
        .then(
          (result2) => {
            if (result2) {
              setIsSaveOpp(true);
            }
          }
        ).catch(error => {
          console.log("Error: ", error);
        })
    }
  }

  if (error)
    return (
      <div>
        Bị lỗi tải dữ liệu
      </div>
    )
  if (loading)
    return (<div>
      Đang tải dữ liệu
    </div>
    )
  else {
    return (
      <div className="back-ground-content">
        <div ref={loadingPageRef}
          className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
          <div role="presentation" onClick={handleClick} style={{ paddingBottom: "10px" }}>
            <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "14px" }}>
              <Link underline="none" color="inherit" href="/" sx={{ "&:hover": { fontWeight: 500, color: "#00B14F", cursor: "pointer" } }}
                onClick={(event) => navigate(`/`)}>
                Trang chủ
              </Link>
              <Link
                underline="none"
                color="inherit"
                sx={{ "&:hover": { fontWeight: 500, color: "#00B14F", cursor: "pointer" } }}
                onClick={(event) => navigate(`/search/${detailPost.list_categories[0].id}/none/${detailPost.list_categories[0].name}/none`)}
              >
                {detailPost.list_categories[0].name}
              </Link>
              <Typography color="text.primary">{detailPost.title}</Typography>
            </Breadcrumbs>
          </div>
          <div style={{ paddingBottom: "30px" }}>
            <Card className="card-job" sx={{ display: 'flex', height: 120 }}>
              <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120 }}
                  image={detailPost?.image_cover?.length > 0 ? detailPost?.image_cover : "../cover_image_post.jpg"}
                  alt="img"
                />
                <div className="d-flex align-items-center">
                  <div style={{ fontSize: "16px", paddingLeft: "10px", paddingTop: "5px" }}>
                    <div >
                      <div style={{ fontWeight: "700", color: "#2C6975", fontSize: "18px", maxWidth: "600px" }}>
                        {detailPost.title}
                      </div>
                    </div>

                    <div style={{ fontWeight: "500" }}>
                      {detailPost.brand.name}
                    </div>
                    <div >
                      {detailPost.write_time}
                      <span style={{ marginLeft: "50px" }}> {detailPost.views} lượt xem</span>
                    </div>

                  </div>
                  <div className="card-choice" style={{ paddingRight: "20px" }} >
                    <Stack direction="column" spacing={2}>
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

                      {isSaveOpp ?
                        <Button variant="contained" style={{ marginLeft: "10px", textTransform: 'capitalize', backgroundColor: "#00B14F", }} startIcon={<CheckCircleIcon />}>
                          Đã lưu tin này
                        </Button>
                        :
                        <Button variant="contained" style={{ marginLeft: "10px", textTransform: 'capitalize', backgroundColor: "#00B14F", }}
                          startIcon={<Favorite />}
                          onClick={handleSaveOpportunity}>
                          Lưu tin
                        </Button>}

                    </Stack>
                  </div>
                </div>
              </Box>
            </Card>
          </div>
          <div style={{ marginBottom: "-10px" }} >

            <span style={{ fontWeight: 500, color: "#660066", cursor: "pointer" }}
              onClick={executeInforPostScroll}>Thông tin cơ hội</span>
            <span style={{ paddingLeft: "20px", fontWeight: 500, color: "#660066", cursor: "pointer" }}
              onClick={executeInforBrandScroll}>Thông tin nhãn hàng</span>
            <span style={{ paddingLeft: "20px", fontWeight: 500, color: "#660066", cursor: "pointer" }}
              onClick={executeSuggestScroll}>Những cơ hội khác</span>

          </div>
          <br ref={inforPostRef} />
          <div >
            <Opportunity_Info
              isApply={(value) => handleSetRecruitmentState(value)}
              id={detailPost.id} min_cast={detailPost.min_cast} max_cast={detailPost.max_cast} amount={detailPost.amount}
              address={detailPost.address} gender={detailPost.gender} content={detailPost.content}
              requirement={detailPost.requirement} benifit={detailPost.benifit}
              image_detail={list} image_cover={detailPost.image_cover} isSaveOpp={isSaveOpp}
              isRecruit={isRecruitment}
              id_brand={detailPost.brand.id} />
          </div>
          <br ref={inforBrandRef} />
          <div >
            <Brand_Info detailBrand={detailPost.brand} id_post={id_post} />
          </div>
          <br ref={suggestPostRef} />
          <div>
            <Opportunity_Other id_post={props.idPost} />
          </div>

          <Apply_KOL
            isApply={(value) => handleSetRecruitmentState(value)}
            isOpen={applyModal}
            isClose={(value) => handleCloseApplyModal(value)}
            idPost={detailPost.id}
            idBrand={detailPost.brand.id}
          />

          <ToLogin
            isOpen={openDialogToLogin}
            isClose={(value) => setOpenDialogToLogin(false)}
          />
        </div>
      </div >
    );
  }
};

export default Content_News;