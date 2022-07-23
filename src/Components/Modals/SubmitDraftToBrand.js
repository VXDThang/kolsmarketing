import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../config/const'
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

//icon
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';

const Input = styled('input')({
  display: 'none',
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function EditPostDraft(props) {
  const { isOpen, isClose, id_job, id_post,loadingToParent } = props;
  //copy from Job_Post_Write.js
  let actoken = localStorage.access_token;


  const [loading, setLoading] = React.useState(false);


  const [content, setContent] = React.useState(null);


  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageShow, setImageShow] = React.useState(null);

  const [changeSelectImageOrVideo, setChangeSelectImageOrVideo] = React.useState(false);

  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [videoShow, setVideoShow] = React.useState(null);

  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleCloseSubmitDraft = () => {
    setContent("");

    setImageShow(null);
    setSelectedImage(null);

    setSelectedVideo(null);
    setVideoShow(null);
    loadingToParent(true);
    isClose(false);
  };


  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
    setIsSaving(false);
    handleCloseSubmitDraft();
  };


  async function handleSubmitDraft(event) {
    setIsSaving(true)
    //Case có ảnh
    if (selectedImage !== null) {
      var formdata = new FormData();
      var publich = `${new Date().getTime()}${Math.random()}`

      formdata.append("file", selectedImage);
      formdata.append("cloud_name", CLOUDINARY_NAME);
      formdata.append("upload_preset", PRESET_NAME);
      formdata.append("public_id", publich);

      let res = await fetch(
        "https://api.cloudinary.com/v1_1/kolcloudinary/image/upload",
        {
          method: "post",
          mode: "cors",
          body: formdata
        }
      );
      let json = await res.json();

      if (json) {
        fetch(DOMAIN_API + `social/create-draft-post`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "x-access-token": actoken
          },
          body: JSON.stringify({ postText: content, image_url: json.secure_url, video_url: null, id_post: id_post, id_job: id_job })
        })
          .then(res => res.json())
          .then(
            (result) => {
              if (result) {
                setContent("");
                setImageShow(null);
                setSelectedImage(null);
                setOpenAlertDialog(true);
                setIsSaving(false);
              }
            })
      }
    }
    else {
      //case có video
      if (selectedVideo !== null) {
        var formdata = new FormData();
        var publich = `${new Date().getTime()}${Math.random()}`

        formdata.append("file", selectedVideo);
        formdata.append("cloud_name", CLOUDINARY_NAME);
        formdata.append("upload_preset", PRESET_NAME);
        formdata.append("public_id", publich);

        let res = await fetch(
          "https://api.cloudinary.com/v1_1/kolcloudinary/video/upload",
          {
            method: "post",
            mode: "cors",
            body: formdata
          }
        );
        let json = await res.json();

        if (json) {
          fetch(DOMAIN_API + `social/create-draft-post`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "x-access-token": actoken
            },
            body: JSON.stringify({ postText: content, video_url: json.secure_url, image_url: null, id_post: id_post, id_job: id_job })
          })
            .then(res => res.json())
            .then(
              (result) => {
                if (result) {
                  setContent("");
                  setVideoShow(null);
                  setSelectedVideo(null);
                  setOpenAlertDialog(true);
                  setIsSaving(false);
                }
              })
        }
      }
      else {
        //Case ko có ảnh và video

        fetch(DOMAIN_API + `social/create-draft-post`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "x-access-token": actoken
          },
          body: JSON.stringify({ postText: content, video_url: null, image_url: null, id_post: id_post, id_job: id_job })
        })
          .then(res => res.json())
          .then(
            (result) => {
              if (result) {
                setContent("");
                setIsSaving(false);
                setOpenAlertDialog(true);
              }
            })
      }
    }
  };

  const fileVideoSelectHandler = async (event) => {
    setVideoShow(URL.createObjectURL(event.target.files[0]));
    setSelectedVideo(event.target.files[0]);
    setChangeSelectImageOrVideo(true);
  };

  const handleDeleteVideo = async (event) => {
    setVideoShow(null);
    setSelectedVideo(null);
    setChangeSelectImageOrVideo(true);
  };

  const fileImageSelectHandler = async (event) => {
    setImageShow(URL.createObjectURL(event.target.files[0]));
    setSelectedImage(event.target.files[0]);
    setChangeSelectImageOrVideo(true);
  };

  const handleDeleteImage = async (event) => {
    setImageShow(null);
    setSelectedImage(null);
    setChangeSelectImageOrVideo(true);
  };


  React.useEffect(() => {

  }, [props])

  if (loading) {
    return (
      <div>
        Đang tải dữ liệu
      </div>
    )
  }
  else {
    return (
      <div>

        <Dialog
          maxWidth={'sm'}
          fullWidth
          open={isOpen}
          onClose={handleCloseSubmitDraft}
          aria-labelledby="draggable-dialog-title"
        >
          {/* Nội dung */}

          <div
            className="d-flex justify-content-between" style={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}>
            <div style={{ fontWeight: 600, fontSize: "18px", color: "#F0A318" }}>
              Viết bài
            </div>
            <div style={{ cursor: "pointer" }}>
              <Tooltip title="Thoát">
                <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#DDDDDD" } }}>
                  <CloseIcon sx={{ fontSize: 18 }}
                    onClick={handleCloseSubmitDraft} />
                </Avatar>
              </Tooltip>
            </div>
          </div>
          <div style={{ paddingTop: "20px", paddingBottom: "30px", paddingLeft: "20px", paddingRight: "20px" }}>



            <div style={{}}>

              <Divider sx={{ color: "#F0A318", paddingTop: "5px" }} />
              <div style={{ paddingTop: "5px" }}>
                <div style={{ fontWeight: 600 }}>
                  Văn bản
                </div>
                <div style={{ paddingTop: "10px" }}>
                  <TextField
                    fullWidth
                    id="outlined-multiline-static"
                    label="Nội dung"
                    multiline
                    rows={10}
                    value={content}
                    onChange={(event) => { setContent(event.target.value) }}
                  />
                </div>
              </div>

              <div style={{ paddingTop: "20px" }}>
                <div style={{ fontWeight: 600 }}>
                  File phương tiện
                </div>
                <div style={{}}>
                  {videoShow ?
                    <div style={{ paddingTop: "10px" }}>
                      <div style={{
                        padding: "5px",
                        fontWeight: "500", width: "120px",
                        border: "1px solid gray", borderRadius: "5px"
                      }}>
                        <InsertPhotoIcon sx={{ color: "gray" }} />
                        <span style={{ fontSize: "14px", color: "gray", fontWeight: 400 }}> Thêm ảnh</span>
                      </div>

                    </div>
                    :
                    <div className="d-flex justify-content-between" style={{ paddingTop: "10px" }}>
                      <label htmlFor="contained-button-file-upload-image" >
                        <Input accept="image/*" id="contained-button-file-upload-image" type="file"
                          onChange={fileImageSelectHandler}
                          onClick={(event) => { event.target.value = null }} />
                        <div style={{
                          cursor: "pointer", padding: "5px",
                          fontWeight: "500", width: "120px",
                          border: "1px solid black", borderRadius: "5px"
                        }}>
                          <InsertPhotoIcon sx={{ color: "black" }} />
                          {imageShow ?
                            <span style={{ fontSize: "14px", color: "black", fontWeight: 500 }}> Đổi ảnh</span>
                            :
                            <span style={{ fontSize: "14px", color: "black", fontWeight: 500 }}> Thêm ảnh</span>
                          }
                        </div>
                      </label>

                      {imageShow ?
                        <div style={{ cursor: "pointer", color: "red", fontWeight: 600 }}
                          onClick={handleDeleteImage} >
                          Xóa ảnh
                        </div>
                        : ""}
                    </div>
                  }



                  {imageShow ?
                    <div style={{ paddingTop: "10px", textAlign: "center" }} >
                      <img src={imageShow} width="auto" height="300px" />
                    </div>
                    : ""}


                  {imageShow ?
                    <div style={{ paddingTop: "10px" }}>
                      <div style={{
                        padding: "5px",
                        fontWeight: "500", width: "120px",
                        border: "1px solid gray", borderRadius: "5px"
                      }}>
                        <VideoLibraryIcon sx={{ color: "gray" }} />
                        <span style={{ fontSize: "14px", color: "gray", fontWeight: 400 }}> Thêm video</span>
                      </div>
                    </div>
                    :
                    <div className="d-flex justify-content-between" style={{ paddingTop: "10px" }}>
                      <label htmlFor="contained-button-file-upload-video" >
                        <Input accept="video/*" id="contained-button-file-upload-video" type="file"
                          onChange={fileVideoSelectHandler}
                          onClick={(event) => { event.target.value = null }} />
                        <div style={{
                          cursor: "pointer", padding: "5px",
                          fontWeight: "500", width: "120px",
                          border: "1px solid black", borderRadius: "5px"
                        }}>
                          <VideoLibraryIcon sx={{ color: "black" }} />
                          {videoShow ?
                            <span style={{ fontSize: "14px", color: "black", fontWeight: 500 }}> Đổi video</span>
                            :
                            <span style={{ fontSize: "14px", color: "black", fontWeight: 500 }}> Thêm video</span>
                          }

                        </div>
                      </label>
                      {videoShow ?
                        <div style={{ cursor: "pointer", color: "red", fontWeight: 600 }}
                          onClick={handleDeleteVideo} >
                          Xóa video
                        </div>
                        : ""}
                    </div>
                  }

                  {videoShow ?
                    <div >
                      <video src={videoShow} width="100%" height="300" controls="controls" autoPlay={true} />
                    </div>
                    : ""}
                </div>
              </div>

              {isSaving ?
                <div>
                  <div style={{ textAlign: "center", paddingBottom: "30px" }}>
                    <div style={{ marginTop: "20px" }}>
                      <CircularProgress size="2rem" />
                      <span style={{ paddingLeft: "20px", paddingBottom: "5px" }}>Đang xử lí ...</span>
                    </div>
                  </div>

                  <div className="d-flex justify-content-between"
                  style={{paddingTop: "20px", paddingLeft: "60px", paddingRight: "60px"}}>
                    <div>
                      <Button fullWidth variant="contained"
                        sx={{
                          width: "150px",
                          textTransform: 'capitalize', backgroundColor: "gray",
                          fontFamily: "Segoe UI", fontSize: "15px", boxShadow: "none", color: "black",
                          cursor: "not-allowed"
                        }}
                      >
                        Nộp sản phẩm
                      </Button>
                    </div>
                    <div>
                      <Button fullWidth variant="contained"
                        sx={{
                          width: "150px",
                          textTransform: 'capitalize', backgroundColor: "gray",
                          fontFamily: "Segoe UI", fontSize: "15px", boxShadow: "none", color: "black",
                          cursor: "not-allowed"
                        }}
                      >
                        Hủy
                      </Button>
                    </div>
                  </div>


                </div>
                :
                <div>
                  <div className="d-flex justify-content-between"
                    style={{ paddingTop: "20px", paddingLeft: "60px", paddingRight: "60px" }}>

                    <div style={{ marginBottom: "0px" }}>
                      <Button fullWidth variant="contained"
                        sx={{
                          width: "150px",
                          textTransform: 'capitalize', backgroundColor: "#F0C01D",
                          fontFamily: "Segoe UI", fontSize: "15px", boxShadow: "none",
                          "&:hover": { bgcolor: "#F0A318" }
                        }}
                        onClick={handleSubmitDraft}
                      >
                        Nộp sản phẩm
                      </Button>
                    </div>

                    <div style={{ marginBottom: "0px" }}>
                      <Button fullWidth variant="contained"
                        sx={{
                          width: "150px",
                          textTransform: 'capitalize', backgroundColor: "#e4e6eb",
                          fontFamily: "Segoe UI", fontSize: "15px", boxShadow: "none", color: "black",
                          "&:hover": { bgcolor: "#DDDDDD" }
                        }}
                        onClick={handleCloseSubmitDraft}>
                        Hủy
                      </Button>
                    </div>

                  </div>
                </div>
              }

            </div>





            {/* Phần modal hiển thị xác nhận (Ví dụ: Đăng thành công, ...) */}
            <Dialog
              open={openAlertDialog}
              TransitionComponent={Transition}
              keepMounted
              onClose={handleCloseAlertDialog}
              aria-describedby="alert-dialog-slide-description"
            >
              <DialogTitle>{"Nộp sản phẩm thành công"}</DialogTitle>
              <DialogActions>
                <Button onClick={handleCloseAlertDialog}>Tắt</Button>
              </DialogActions>
            </Dialog>



          </div >

          {/* <div style={{ paddingRight: "60px" }}>
            <DialogActions>
              <Button
                sx={{ color: "#DD2D34" }}
                autoFocus onClick={handleCloseSubmitDraft}>
                Thoát
              </Button>
            </DialogActions>
          </div> */}
        </Dialog>
      </div>
    );
  }
};
