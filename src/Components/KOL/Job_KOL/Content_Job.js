import React from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import Tooltip from '@mui/material/Tooltip';
import { DOMAIN_API } from '../../../config/const'


//file
import Job_Post_Write from './Job_Post_Write'
import Mission_KOL from './Mission_KOL'
import Mission_KOL_HaveSubmitDraft from './Mission_KOL_HaveSubmitDraft'


//icon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArticleIcon from '@mui/icons-material/Article';


const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  min-height: 100vh;
  font-size: 14px; 
  border-radius: 10px;
`;

const FormStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

export default function Content_Job(props) {
  let actoken = localStorage.access_token;
  const { isGoBack, listPageFB, fbUserID, idJobClick } = props
  const [openListMember, setOpenListMember] = React.useState(false);
  const [haveCreate, setHaveCreate] = React.useState(false);
  const [listMission, setListMission] = React.useState([]);
  const [detailJob, setDetailJob] = React.useState(null);
  const [loadingDetail, setLoadingDetail] = React.useState(true);
  const [listMember, setListMember] = React.useState([]);
  const [listSubmitDraftPost, setListSubmitDraftPost] = React.useState([]);

  const [loadingWhenUpdateDraft, setLoadingWhenUpdateDraft] = React.useState(true);

  const handleClick = () => {
    setOpenListMember(!openListMember);
  };

  const handleClickGoBack = () => {
    isGoBack(true);
  };

  const handleClickGoBackReadJob = () => {
    setHaveCreate(false);
  };

  const handleLoadingWhenUpdate = () => {
    setLoadingWhenUpdateDraft(!loadingWhenUpdateDraft)
  }

  async function getDetailJob(id_post) {
    try {
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
            setDetailJob(result);

          }
        )
    }
    catch (error) {
      console.log("error: ", error)
    }
    finally {
      setLoadingDetail(false)
    }
  }

  async function getAllMember(id_post) {
    try {
      let url1 = "";
      url1 = DOMAIN_API + `jobs/get-all-member-of-post`;
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
            setListMember(result);
          }
        )
    }
    catch (error) {
      console.log("error: ", error)
    }
    finally {
    }
  }


  async function getAllMission(id_post) {
    try {
      let url1 = "";
      url1 = DOMAIN_API + `jobs/find-job-of-post`;
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
            setListMission(result);
          }
        )
    }
    catch (error) {
      console.log("error: ", error)
    }
    finally {
    }
  }

  async function getAllSubmitDraftPost(id_post) {
    try {
      let url1 = "";
      url1 = DOMAIN_API + `social/get-list-draft-of-1kol-in-post`;
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
            setListSubmitDraftPost(result);
          }
        )
    }
    catch (error) {
      console.log("error: ", error)
    }
    finally {
    }
  }

  React.useEffect(() => {
    if (idJobClick) {
      getDetailJob(idJobClick);
      getAllMember(idJobClick);
      getAllMission(idJobClick);
      getAllSubmitDraftPost(idJobClick);
    }
  }, [idJobClick, loadingWhenUpdateDraft])

  return (
    <SidebarStyled>
      <div style={{ padding: "10px" }}>
        {haveCreate ?
          <div>
            <div className="d-flex justify-content-between">
              <div style={{ cursor: "pointer" }}>
                <Tooltip title="Trở lại Trang chi tiết công việc">
                  <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#800080" } }}>
                    <ArrowBackIcon sx={{ fontSize: 18 }}
                      onClick={handleClickGoBackReadJob} />
                  </Avatar>
                </Tooltip>
              </div>
              <div>
                Bạn đang ở trang tạo bài viết
              </div>
            </div>
            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
              <Divider />
            </div>
            <Job_Post_Write listPageFB={listPageFB} fbUserID={fbUserID} id_post={idJobClick} />
          </div>
          :
          <div>
            <div className="d-flex justify-content-between">
              <div style={{ cursor: "pointer" }}>
                <Tooltip title="Trở lại Danh sách công việc">
                  <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#800080" } }}>
                    <ArrowBackIcon sx={{ fontSize: 18 }}
                      onClick={handleClickGoBack} />
                  </Avatar>
                </Tooltip>
              </div>

              <div style={{ cursor: "pointer" }}
                onClick={(event) => { setHaveCreate(true) }}>
                <Button
                  variant="contained" style={{ marginLeft: "10px", textTransform: 'capitalize', backgroundColor: "#00B14F", textTransform: 'none' }} startIcon={<ArticleIcon />}>
                  Tạo bài viết
                </Button>
              </div>

            </div>
            <div style={{ paddingTop: "10px" }}>
              <Divider />
            </div>
            {loadingDetail ?
              <div style={{ padding: "10px" }}>
                Đang tải dữ liệu ...
              </div>
              :
              <div style={{ paddingLeft: "50px", paddingRight: "50px", paddingTop: "10px" }}>
                <div style={{ fontSize: "18px", fontWeight: "700", paddingBottom: "10px" }}>
                  {detailJob?.title}
                </div>
                <div>
                  <Divider sx={{ color: "#00B14F" }} />
                </div>

                <div >

                  <div style={{ paddingTop: "10px" }}>
                    <div style={{ fontWeight: "600" }}>
                      Mô tả công việc
                    </div>
                    <div>
                      {detailJob?.content}
                    </div>
                  </div>

                  <div style={{ paddingTop: "10px" }}>
                    <div style={{ fontWeight: "600" }}>
                      Yêu cầu ứng viên
                    </div>
                    <div>
                      {detailJob?.requirement}
                    </div>
                  </div>

                  <div style={{ paddingTop: "10px" }}>
                    <div style={{ fontWeight: "600" }}>
                      Quyền lợi
                    </div>
                    <div>
                      {detailJob?.benefit}
                    </div>
                  </div>

                  <div style={{ paddingTop: "15px" }}>
                    <div style={{ fontWeight: "600" }}>
                      Sở hữu
                    </div>
                    <div>
                      <ListItemButton >
                        <ListItemIcon>
                          <Avatar alt="Remy Sharp"
                            src={detailJob?.brand.avatar ? detailJob.brand.avatar : "brand_ava.jpg"} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: '14px' }} primary={detailJob.brand.name} />
                      </ListItemButton>
                    </div>
                  </div>

                  <div>
                    <div className="d-flex justify-content-between">
                      <div style={{ fontWeight: "600", marginTop: "5px", cursor: "pointer" }} onClick={handleClick}>
                        Thành viên
                        {openListMember ? <ExpandLess sx={{ size: 15 }} /> : <ExpandMore sx={{ size: 15 }} />}
                      </div>
                    </div>
                    <div>
                      <List  >
                        <Collapse in={openListMember} timeout="auto" unmountOnExit>
                          <List component="div" disablePadding>
                            {listMember.length > 0 && listMember.map((list, index) => (
                              <ListItemButton key={index} >
                                <ListItemIcon>
                                  <Avatar alt={list.userInfo?.name ? list.userInfo?.name : "Influencer"}
                                    src={list.userInfo?.avatar ? list.userInfo?.avatar : ""} />
                                </ListItemIcon>
                                <ListItemText primaryTypographyProps={{ fontSize: '14px' }}
                                  primary={list.userInfo?.name ? list.userInfo?.name : "Influencer"} />
                              </ListItemButton>
                            ))}
                          </List>
                        </Collapse>
                      </List>
                    </div>
                  </div>


                  <div style={{ fontSize: "18px", fontWeight: "700" }}>
                    Thảo luận
                  </div>

                  <div style={{ paddingTop: "10px" }}>
                    <Divider sx={{ color: "#00B14F" }} />
                  </div>
                  {/* Danh sách nhiệm vụ đã đăng */}
                  <div style={{ paddingLeft: "40px" }}>
                    {listMission?.length > 0 && listMission.map((miss, index) => {
                      let temp = false;
                      let flag = 0;
                      for (let i = 0; i < listSubmitDraftPost.length; i++) {
                        if (miss.id == listSubmitDraftPost[i].id_job_describe) {
                          temp = true;
                          flag = i;
                          break;
                        }
                      }
                      if (temp)
                        return (
                          <Mission_KOL_HaveSubmitDraft
                            key={index}
                            detail_mision={miss}
                            review_detail={listSubmitDraftPost[flag]}
                            loadingToParent={(value) => handleLoadingWhenUpdate()} />
                        )
                      else
                        return (
                          <Mission_KOL 
                          key={index} 
                          detail_mision={miss}
                          loadingToParent={(value) => handleLoadingWhenUpdate()} />
                        )
                    })}
                  </div>

                </div>

              </div>
            }

          </div>}

      </div>


    </SidebarStyled>
  );
}