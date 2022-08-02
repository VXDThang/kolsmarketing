import * as React from 'react';
import { useState } from "react";
import { useRef } from "react";
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Test_Card_Job from "./test_card_job"
import Test_Card_Job2 from "./test_card_job2"
import Pagination from '@mui/material/Pagination';
import { styled } from '@mui/material/styles';

//file
import "./Content_Homepage.css"
import Ads1 from '../Ads/Ads_KOL_1';
import Ads2 from '../Ads/Ads_KOL_2';
import Job_Bottom from '../Job_Bottom/Job';

//icon
import StarsIcon from '@mui/icons-material/Stars';
import { DOMAIN_API } from '../../../config/const'
import { useNavigate } from 'react-router-dom';

const Content_Homepage = () => {

  let actoken = localStorage.access_token;
  const navigate = useNavigate();

  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
  const [page, setPage] = React.useState(1); //pagination
  const [listNewestPost, setListNewestPost] = React.useState([]);
  const [listHighCastPost, setListHighCastPost] = React.useState([]);
  const postNew = useRef(null);

  //Loading
  const [loading1, setLoading1] = React.useState(true);
  const [loading2, setLoading2] = React.useState(true);

  //Pagination - Phân trang
  const [maxPage, setMaxPage] = React.useState(5);
  const [currentPage, setCurrentPage] = React.useState(1);
  const newsPerPage = 12; //tin tức mỗi trang
  const indexOfLastNews = currentPage * newsPerPage; //index(vị trí) tin tức cuối cùng của trang hiện tại trong mảng dữ liệu newsList
  const indexOfFirstNews = indexOfLastNews - newsPerPage; //index(vị trí) tin tức đầu tiên của trang hiện tại trong mảng dữ liệu newsList
  let currentTodos = [];
  //*cắt* dữ liệu ban đầu, lấy ra 1 mảng dữ liệu mới cho trang hiện tại
  if (listNewestPost.length > 0) {
    if (listNewestPost != '400')
      currentTodos = listNewestPost.slice(indexOfFirstNews, indexOfLastNews);
  }
  else {
    currentTodos = [];
  }

  React.useEffect(() => {
    let url1 = "";
    url1 = DOMAIN_API + 'posts/get-newest-post';
    let url2 = "";
    url2 = DOMAIN_API + 'posts/get-high-cast-post';
    if (actoken) {
      fetch(url1, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': actoken
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            setListNewestPost(result)
            setLoading1(false)
            setMaxPage(Math.ceil(result.length / newsPerPage))
          }
        ).catch(error => {
          console.log("Error: ", error);
        })

      fetch(url2, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': actoken
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            if(result!= '400')
            {
              setListHighCastPost(result);
              setLoading2(false)
            }
          }
        ).catch(error => {
          console.log("Error: ", error);
        })
    }
    else {
      fetch(url1, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            setListNewestPost(result)
            setLoading1(false)
            setMaxPage(Math.ceil(result.length / newsPerPage))
          }
        ).catch(error => {
          console.log("Error: ", error);
        })

      fetch(url2, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',

        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            if(result!= '400')
            {
              setListHighCastPost(result);
              setLoading2(false)
            }            
          }
        ).catch(error => {
          console.log("Error: ", error);
        })
    }
  }, [])



  //pagination
  const handleChange = (event, value) => {
    postNew.current.scrollIntoView()
    setPage(value);
    setCurrentPage(value);
  };
  //tag
  const ListItem = styled('li')(({ theme }) => ({
    margin: theme.spacing(0.5),
  }));

  const handleClickSeeMorePostForYou = () => {
    navigate(`/see-more-post-for-you`);
  }

  const handleClickSeeMorePostInteresting = () => {
    navigate(`/see-more-post-interesting`);
  }



  return (
    <div className="back-ground-content" ref={postNew}>
      <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
        <Card >
          <div className="back-ground-content-title" style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px", marginBottom: "0px" }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <div className='d-flex justify-content-between'>
                  <div style={{ fontSize: 18, fontWeight: "700" }}>
                    <StarsIcon sx={{ fontSize: 28, fontWeight: "900", paddingBottom: 1, color: "#00B14F" }} />CƠ HỘI DÀNH CHO BẠN
                  </div>
                  <div style={{ fontWeight: 600, fontSize: "14px", color: "#00B14F", paddingRight: "5px", cursor: "pointer" }}
                    onClick={handleClickSeeMorePostForYou}>
                    Xem thêm
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          {loading1 ?
            <div className="back-ground-content-job" style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "10px" }}>
              Đang tải dữ liệu ....
            </div>
            :
            <div>
              <div className="back-ground-content-job" style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "10px" }}>

                <Grid container spacing={2}>
                  {currentTodos?.length > 0 ?
                    currentTodos.map((list) => (
                      <Grid item xs={6} key={list.id}   >
                        <Test_Card_Job id={list.id}
                          title={list.title} brandName={list.brand_info.name} time={list.write_time}
                          address={list.address} hot={list.hot} cast={list.max_cast ? list.max_cast : list.min_cast}
                          image_cover={list.image_cover} likePost={list.likePost} brand_id={list.brand_info.id}
                        />
                      </Grid>
                    ))
                    : ""}
                </Grid>

              </div>

              <div className="d-flex justify-content-center" style={{ paddingBottom: "5px" }}>
                <Stack spacing={2}>
                  <Pagination count={maxPage} color="success" size="small" page={page} onChange={handleChange} />
                </Stack>
              </div>
            </div>
          }



        </Card>
      </div>
      <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "20px" }}>
        <Ads1 />
      </div>
      <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "20px" }}>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 2 }}>
            <Card sx={{ maxHeight: "600px" }} >
              <div className="back-ground-content-title" style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px", marginBottom: "0px" }}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                    <div className='d-flex justify-content-between'>
                      <div style={{ fontSize: 18, fontWeight: "700" }}>
                        <StarsIcon sx={{ fontSize: 28, fontWeight: "900", paddingBottom: 1, color: "#00B14F" }} />CƠ HỘI HẤP DẪN
                      </div>
                      <div style={{ fontWeight: 600, fontSize: "14px", color: "#00B14F", paddingRight: "5px", cursor: "pointer" }}
                        onClick={handleClickSeeMorePostInteresting}>
                        Xem thêm
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </div>

              <div className="back-ground-content-job" style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "25px", paddingBottom: "25px" }}>
                {loading2 ? <div>Đang tải dữ liệu ....</div>
                  :
                  <Grid container spacing={1} >
                    {listHighCastPost?.length > 0 && listHighCastPost.map((list) => (
                      <Grid item xs={4} key={list.id}>
                        <Test_Card_Job2
                          id={list.id}
                          title={list.title} brandName={list.brand_info.name} time={list.write_time}
                          address={list.address} hot={list.hot} cast={list.max_cast ? list.max_cast : list.min_cast}
                          image_cover={list.image_cover} likePost={list.likePost} brand_id={list.brand_info.id}
                        />
                      </Grid>
                    ))}
                  </Grid>
                }
              </div>

            </Card>

          </div>
          <div style={{ flex: 1, paddingLeft: "15px" }}>
            <Ads2 />
          </div>
        </div>
      </div >
      <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "20px" }}>
        <Card>
          <div className="back-ground-content-title" style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "10px", marginBottom: "0px" }}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <div className='d-flex justify-content-between'>
                  <div style={{ fontSize: 18, fontWeight: "700" }}>
                    <StarsIcon sx={{ fontSize: 28, fontWeight: "900", paddingBottom: 1, color: "#00B14F" }} />CƠ HỘI THEO LĨNH VỰC
                  </div>
                  <div>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
          <Job_Bottom />
        </Card>
      </div>

    </div >
  );
};

export default Content_Homepage;