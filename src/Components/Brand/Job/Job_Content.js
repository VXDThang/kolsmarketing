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
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import { DOMAIN_API } from '../../../config/const';
import { keyframes } from "@emotion/react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

//file
import Modal_Invite from '../../Modals/Invite_Join_Job'
import Modal_Delete_Member from '../../Modals/Brand_Delete_Member'
import Mission from './Mission'

//icon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import MouseIcon from '@mui/icons-material/Mouse';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  min-height: calc(100vh - 75px);
  font-size: 14px; 
  border-radius: 5px;
  border: 1px solid rgb(230, 230, 230);
`;

const FormStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid #c4c4c4;
  border-radius: 5px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const pencilEdit = keyframes`
    0% {
        transform: rotate(0deg)
    }
    20% {
        transform: rotate(30deg)
    }
    30% {
        transform: rotate(0deg) translate(2px, 0);
    }    
    40% {
        transform: rotate(30deg) translate(0, 0);
    }
    50% {
        transform: rotate(0deg) translate(0, 0);
    }

    60% {
        transform: rotate(30deg) translate(1px, 0);
    }
    70% {
        transform: rotate(0deg) translate(2px, 0)
    }
    80% {
        transform: rotate(30deg) translate(3px, 0)
    }
    90% {
        transform: rotate(0deg) translate(3px, 0)
    }
    100% {
        transform: rotate(30deg)  translate(4px, 0)
    }
    `;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Job_Content({ idJobPicker }) {
  let actoken = localStorage.access_token;

  const [detailJob, setDetailJob] = React.useState(null);
  const [loadingDetail, setLoadingDetail] = React.useState(true);
  const [listMember, setListMember] = React.useState([]);
  const [listMission, setListMission] = React.useState([]);
  const [listSelectedFile, setListSelectedFile] = React.useState([]);
  const [haveShow, setHaveShow] = React.useState(false);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [openListMember, setOpenListMember] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [contentDialog, setContentDialog] = React.useState('');
  const [inviteModal, setInviteModal] = React.useState(false);

  const [deleteMember, setDeleteMember] = React.useState(false);
  const [idDeleteMember, setIdDeleteMember] = React.useState(null);
  const [nameDeleteMember, setNameDeleteMember] = React.useState(null);
  const [indexDeleteMember, setIndexDeleteMember] = React.useState(null);

  const [typeDis, setTypeDis] = React.useState(1);

  const [comment, setComment] = React.useState('');
  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

  const handleClick = () => {
    setOpenListMember(!openListMember);
  };
  const handleOpenInviteModal = () => setInviteModal(true);
  const handleCloseInviteModal = () => setInviteModal(false);

  const handleSelectTypeDis = (event) => {
    setTypeDis(event.target.value);

  };

  const handleCloseDeleteModal = (value) => {
    if (value) {
      //Xóa thành viên khỏi list dựa vào indexDeleteMember
      //....
      if (indexDeleteMember) {
        const listmem1 = listMember.slice(0, indexDeleteMember);
        const listmem2 = listMember.slice(indexDeleteMember + 1, listMember.length);
        const new_arr = listmem1.concat(listmem2);
        setListMember(new_arr);
      }

      setIdDeleteMember(null)
      setNameDeleteMember(null)
      setIndexDeleteMember(null)
      setDeleteMember(false);
    }
    else {
      setIdDeleteMember(null)
      setNameDeleteMember(null)
      setIndexDeleteMember(null)
      setDeleteMember(false);
    }
  }

  const handleOpenDeleteModal = () => {
    setDeleteMember(true);
  }

  const handleDeleteKol = (e, id_post, id_kol, name_kol, index) => {
    setIdDeleteMember(id_kol)
    setNameDeleteMember(name_kol)
    setIndexDeleteMember(index)
    handleOpenDeleteModal();
  }

  const handleSubmitMission = () => {
    if (inputValue != '') {
      let url1 = "";
      url1 = DOMAIN_API + `jobs/create-job`;
      fetch(url1, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": actoken
        },
        body: JSON.stringify({
          id_post: idJobPicker,
          content: inputValue,
          files: listSelectedFile,
          type: typeDis
        })
      })
        .then(res => res.json())
        .then(
          (result) => {
            setListMission(listMission => [result, ...listMission]);
            //listMission.push(result);
            setInputValue("");
            setContentDialog("Bạn đã thêm nhiệm vụ thành công!");
            setOpenAlertDialog(true);
          }
        )
    }
    else {
      setContentDialog("Bạn chưa nhập nội dung nhiệm vụ!");
      setOpenAlertDialog(true);
    }

  };

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

  React.useEffect(() => {
    if (idJobPicker) {
      setHaveShow(true);
      getDetailJob(idJobPicker);
      getAllMember(idJobPicker);
      getAllMission(idJobPicker)
    }
  }, [idJobPicker])


  return (
    <SidebarStyled>
      {haveShow ?
        <div>
          {loadingDetail ?
            <div style={{ padding: "10px" }}>
              Đang tải dữ liệu ...
            </div>
            :
            <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px" }}>
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
                    <div>
                      <Button sx={{ textTransform: 'none', backgroundColor: "#00B14F", "&:hover": { bgcolor: "#800080" } }}
                        variant="contained" startIcon={<PersonAddAlt1Icon />} onClick={handleOpenInviteModal}>
                        Mời
                      </Button>
                    </div>
                  </div>

                  <div >
                    {/* <AvatarGroup max={6} justifyContent="center" alignItems="center">
                                <Avatar alt="Remy Sharp" src="avatar.jpg" />
                                <Avatar alt="Travis Howard" src="post1.jpg" />
                                <Avatar alt="Cindy Baker" src="post3.jpg" />
                                <Avatar alt="Agnes Walker" src="post4.jpg" />
                                <Avatar alt="Trevor Henderson" src="profile.jpg" />
                                <Avatar alt="Travis Howard" src="post1.jpg" />
                                <Avatar alt="Cindy Baker" src="post3.jpg" />
                                <Avatar alt="Agnes Walker" src="post4.jpg" />
                            </AvatarGroup> */}

                    <List  >
                      <Collapse in={openListMember} timeout="auto" unmountOnExit>
                        <List component="div" disablePadding>
                          {listMember?.length > 0 && listMember.map((list, index) => {
                            if (list.role != 2 && list.id != detailJob.brand.id)
                              return (
                                <ListItemButton key={index} >
                                  <ListItemIcon>
                                    <Avatar alt={list.userInfo?.name ? list.userInfo?.name : "Influencer"}
                                      src={list.userInfo?.avatar ? list.userInfo?.avatar : ""} />
                                  </ListItemIcon>
                                  <ListItemText primaryTypographyProps={{ fontSize: '14px' }}
                                    primary={list.userInfo?.name ? list.userInfo?.name : "Influencer"} />

                                  <ListItemIcon >
                                    <Tooltip title="Xóa">
                                      <Avatar sx={{ width: 24, height: 24, "&:hover": { bgcolor: "#DD0000" } }}
                                        onClick={(event) => handleDeleteKol(event, idJobPicker, list.userInfo.id, list.userInfo.name, index)}>
                                        <HighlightOffIcon sx={{ fontSize: 18 }} />
                                      </Avatar>
                                    </Tooltip>
                                  </ListItemIcon>
                                </ListItemButton>
                              )
                          })}
                        </List>
                      </Collapse>
                    </List>
                  </div>
                </div>

                <div>
                  <div style={{ fontWeight: "600" }}>
                    Đăng nhiệm vụ
                  </div>
                  <div style={{ paddingTop: "10px" }} >
                    <div style={{ padding: "20px", paddingTop: "10px", border: '0.1em solid gray', borderRadius: "5px" }}>
                      <div>
                        <div style={{ fontWeight: "500" }}>
                          Nội dung
                        </div>
                        <div style={{ paddingTop: "10px" }}>
                          {/* <FormStyled>
                            <InputBase
                              sx={{ ml: 1, flex: 1 }}
                              placeholder="Nhập ..."
                              multiline
                              maxRows={6}
                              rows="4"
                              value={inputValue}
                              onChange={(event) => {
                                setInputValue(event.target.value);
                              }}
                            />
                          </FormStyled> */}

                          <FormStyled style={{ border: inputValue ? "1px solid #00B14F" : "1px solid #c4c4c4" }}>
                            <InputBase
                              sx={{ ml: "15px", flex: 1, fontSize: "15px", }}
                              placeholder="Nhập nội dung ..."
                              multiline
                              maxRows={6}
                              rows="4"
                              value={inputValue}
                              onChange={(event) => {
                                setInputValue(event.target.value);
                              }}
                            />
                          </FormStyled>
                        </div>
                        <div style={{ paddingTop: "20px", fontWeight: "500" }}>
                          Thể loại
                        </div>
                        <div style={{ paddingTop: "10px" }}>
                          <FormControl fullWidth>
                            <InputLabel size="small" id="demo-simple-select-label"
                              sx={{
                                fontSize: "14px",
                                color: typeDis ? "green" : "#c0c0c0",
                                fontWeight: typeDis ? 600 : 400,
                              }}>{typeDis ? <span>Type </span> : <span>Chọn thể loại </span>}</InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={typeDis}
                              label={typeDis ? <span>Type </span> : <span>Chọn thể loại </span>}
                              onChange={handleSelectTypeDis}
                              size="small"

                            >
                              <MenuItem value="1" key="1" >
                                <span style={{ fontSize: "14px" }}>
                                  Thông báo thường
                                </span>
                              </MenuItem>
                              <MenuItem value="2" key="2" >
                                <span style={{ fontSize: "14px" }}>
                                  Yêu cầu nộp sản phẩm
                                </span>
                              </MenuItem>

                            </Select>

                          </FormControl>
                        </div>
                        {/* <div style={{ paddingTop: "20px", fontWeight: "500" }}>
                          Đính kèm file
                        </div> */}

                      </div>
                    </div>

                  </div>
                  <div style={{ paddingTop: "10px" }}>

                    {/* <Tooltip title="Đính kèm file">
                                <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#00B14F" } }}>
                                    <AttachFileIcon sx={{ fontSize: 18 }} />
                                </Avatar>
                            </Tooltip> */}
                    <div style={{ paddingTop: "10px" }} className="d-flex justify-content-between">
                      <div>
                        {/* <Button sx={{ textTransform: 'none', backgroundColor: "#800080", "&:hover": { bgcolor: "#00B14F" } }} variant="contained" startIcon={<AttachFileIcon />}>
                          Đính kèm file
                        </Button> */}
                      </div>
                      <div>
                        <Button onClick={handleSubmitMission} sx={{ textTransform: 'none', backgroundColor: "#00B14F", "&:hover": { bgcolor: "#800080" } }} variant="contained">
                          Đăng 
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ fontSize: "18px", fontWeight: "700", paddingTop: "20px" }}>
                  Thảo luận
                </div>

                <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                  <Divider sx={{ color: "#00B14F" }} />
                </div>
                {/* Danh sách nhiệm vụ đã đăng */}
                <div style={{ paddingLeft: "15px", paddingRight: "0px" }}>

                  {listMission?.length > 0 && listMission.map((miss, index) => (
                    <Mission key={index} detail_mision={miss} />
                  ))}
                </div>

              </div>

            </div>
          }

        </div>
        :
        <div style={{ padding: "10px", textAlign: "center", paddingTop: "150px" }}>
          <div>
            <MouseIcon sx={{
              fontSize: "30px", transformOrigin: "center", color: "#00B14F",
              animation: `${pencilEdit} 1s ease infinite`
            }} />
          </div>
          <div style={{ paddingTop: "15px", fontSize: "18px", fontWeight: 500 }}>
            Chọn một công việc bất kì để xem chi tiết
          </div>
        </div>
      }


      <Modal_Invite
        id_post={idJobPicker}
        isOpen={inviteModal}
        isClose={(value) => handleCloseInviteModal(value)} />
      {/* Phần modal hiển thị xác nhận (Ví dụ: Đăng thành công, ...) */}
      <Dialog
        open={openAlertDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAlertDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{contentDialog}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseAlertDialog}>Tắt</Button>
        </DialogActions>
      </Dialog>

      {/* Xóa thành viên */}
      <Modal_Delete_Member
        id_post={idJobPicker}
        id_kol={idDeleteMember}
        name_delete={nameDeleteMember}
        isOpen={deleteMember}
        isClose={(value) => handleCloseDeleteModal(value)} />

    </SidebarStyled>
  );
}