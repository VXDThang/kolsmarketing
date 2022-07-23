
import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


//icon
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ReplyOutlinedIcon from '@mui/icons-material/ReplyOutlined';
import PublicIcon from '@mui/icons-material/Public';
import CircularProgress from '@mui/material/CircularProgress';


//file
import Appointment from '../../Modals/Appointment'

const Input = styled('input')({
  display: 'none',
});

//Select
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const page = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function Job_Post_Write(props) {

  let actoken = localStorage.access_token;
  const [listPageFB, setListPageFB] = React.useState(props.listPageFB);
  const [fbUserID, setFbUserID] = React.useState(props.fbUserID);
  const [error, setError] = React.useState(null);
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [selectedPage, setSelectedPage] = React.useState('');

  const [pageList, setPageList] = React.useState([]);
  const [content, setContent] = React.useState("");
  const [isAppointment, setIsAppointment] = React.useState(false);
  const [dateAppointment, setDateAppointment] = React.useState("");
  const [timeAppointment, setTimeAppointment] = React.useState("");

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageShow, setImageShow] = React.useState(null);

  const [selectedVideo, setSelectedVideo] = React.useState(null);
  const [videoShow, setVideoShow] = React.useState(null);

  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [isSaving, setIsSaving] = React.useState(false);

  const handleClickOpenAlertDialog = () => {
    setOpenAlertDialog(true);
  };

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
    setIsSaving(false);
  };

  async function handleSubmitPostImmediately(event) {
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
        fetch(DOMAIN_API + `social/post-social-immediately`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "x-access-token": actoken
          },
          body: JSON.stringify({ postText: content, id_page_social: selectedPage.id_page_social, id_page: selectedPage.id, image_url: json.secure_url, video_url: null, id_post: props.id_post, id_job: null })
        })
          .then(res => res.json())
          .then(
            (result) => {
              if (result) {
                setContent("");
                setSelectedPage('');
                setImageShow(null);
                setSelectedImage(null);
                setSuccess(true);
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
          fetch(DOMAIN_API + `social/post-social-immediately`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "x-access-token": actoken
            },
            body: JSON.stringify({ postText: content, id_page_social: selectedPage.id_page_social, id_page: selectedPage.id, video_url: json.secure_url, image_url: null, id_post: props.id_post })
          })
            .then(res => res.json())
            .then(
              (result) => {
                if (result) {
                  setContent("");
                  setSelectedPage('');
                  setVideoShow(null);
                  setSelectedVideo(null);
                  setSuccess(true);
                  setOpenAlertDialog(true);
                  setIsSaving(false);
                }
              })
        }
      }
      else {
        //Case ko có ảnh và video

        fetch(DOMAIN_API + `social/post-social-immediately`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            "x-access-token": actoken
          },
          body: JSON.stringify({ postText: content, id_page_social: selectedPage.id_page_social, id_page: selectedPage.id, video_url: null, image_url: null, id_post: props.id_post, id_job: null })
        })
          .then(res => res.json())
          .then(
            (result) => {
              if (result) {
                setContent("");
                setSelectedPage('');
                setSuccess(true);
                setOpenAlertDialog(true);
              }
            })
      }
    }
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
          body: JSON.stringify({ postText: content, image_url: json.secure_url, video_url: null, id_post: props.id_post, id_job: null })
        })
          .then(res => res.json())
          .then(
            (result) => {
              if (result) {
                setContent("");
                setSelectedPage('');
                setImageShow(null);
                setSelectedImage(null);
                setSuccess(true);
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
            body: JSON.stringify({ postText: content, video_url: json.secure_url, image_url: null, id_post: props.id_post, id_job: null })
          })
            .then(res => res.json())
            .then(
              (result) => {
                if (result) {
                  setContent("");
                  setSelectedPage('');
                  setVideoShow(null);
                  setSelectedVideo(null);
                  setSuccess(true);
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
          body: JSON.stringify({ postText: content, video_url: null, image_url: null, id_post: props.id_post, id_job: null })
        })
          .then(res => res.json())
          .then(
            (result) => {
              if (result) {
                setContent("");
                setSelectedPage('');
                setSuccess(true);
                setOpenAlertDialog(true);
              }
            })
      }
    }
  };

  const handleChange = (event) => {
    setSelectedPage(event.target.value);
  };

  const handleOpenAppointment = () => {
    setIsAppointment(true);
  }

  const handleCloseAppointment = (value) => {
    if (value) {
      setContent("");
      setSelectedPage('');
      setVideoShow(null);
      setSelectedVideo(null);
      setImageShow(null);
      setSelectedImage(null);
    }
    setIsAppointment(false);
  }

  const handlePickDate = (value) => {
    setDateAppointment(value);
  }

  const handlePickTime = (value) => {
    setTimeAppointment(value);
  }

  const fileVideoSelectHandler = async (event) => {
    setVideoShow(URL.createObjectURL(event.target.files[0]));
    setSelectedVideo(event.target.files[0]);
  };

  const handleDeleteVideo = async (event) => {
    setVideoShow(null);
    setSelectedVideo(null);
  };

  const fileImageSelectHandler = async (event) => {
    setImageShow(URL.createObjectURL(event.target.files[0]));
    setSelectedImage(event.target.files[0]);
  };

  const handleDeleteImage = async (event) => {
    setImageShow(null);
    setSelectedImage(null);
  };


  React.useEffect(() => {

  }, [])

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
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Card >
              <div style={{ backgroundColor: "#FFFFFF" }} >
                <div style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "20px" }}>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>
                    Viết bài
                  </div>
                  <Divider sx={{ color: "#00B14F", paddingTop: "5px" }} />

                  {fbUserID ? "" :
                    <div style={{ paddingTop: "15px" }}>
                      <span style={{ fontWeight: 500 }}>Chú ý:  Chưa kết nối Facebook</span>
                      <br />
                      Bạn cần kết nối với Facebook mới có thể sử dụng chức năng đăng ngay hoặc lên lịch.
                      <br />
                      Nếu không kết nối Facebook, bạn chỉ sử dụng được chức năng viết nháp.
                      <br />
                      Kết nối Facebook bằng cách: Trong trang Công việc - Bảng tin - Kết nối Facebook
                    </div>}

                  {listPageFB.length > 0 &&
                    <div style={{ paddingTop: "20px" }}>
                      <div style={{ fontWeight: 600 }}>
                        Đăng lên
                      </div>
                      <div style={{ fontWeight: 400, fontSize: "12px" }}>
                        (Chọn để sử dụng chức năng
                        <span style={{ fontWeight: 600, }}> Đăng ngay </span>
                        hoặc
                        <span style={{ fontWeight: 600, }}> Lên lịch</span>)
                      </div>
                      <div style={{ paddingTop: "10px" }}>
                        <FormControl fullWidth >
                          <InputLabel id="demo-multiple-checkbox-label">Trang</InputLabel>
                          <Select
                            labelId="demo-simple-select-helper-label"
                            id="demo-simple-select-helper"
                            value={selectedPage}
                            label="Trang"
                            onChange={handleChange}
                          >
                            {listPageFB.map((page) => (
                              <MenuItem key={page.id} value={page}>{page.page_name} </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  }

                  <div style={{ paddingTop: "20px" }}>
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

                      <div className="d-flex justify-content-between">
                        <div style={{ paddingTop: "10px", }}>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "gray", textTransform: 'none', cursor: "not-allowed" }} >
                            <span style={{ fontSize: "14px" }}>Đăng ngay</span>
                          </Button>
                        </div>

                        <div style={{ paddingTop: "10px", }}>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "gray", textTransform: 'none', cursor: "not-allowed" }} >
                            <span style={{ fontSize: "14px" }}>Hẹn lịch đăng</span>
                          </Button>
                        </div>

                        <div style={{ paddingTop: "10px", }}>
                          <Button
                            variant="contained"
                            style={{ backgroundColor: "gray", textTransform: 'none', cursor: "not-allowed" }} >
                            <span style={{ fontSize: "14px" }}>Lưu vào nháp</span>
                          </Button>
                        </div>
                      </div>

                    </div>
                    :
                    <div>
                      <div style={{ paddingTop: "20px" }}>
                        <div style={{ fontWeight: 600 }}>
                          Lựa chọn
                        </div>
                        {selectedPage ?
                          <div className="d-flex justify-content-between">
                            <div style={{ cursor: "pointer", paddingTop: "10px" }}>
                              <Button
                                onClick={handleSubmitPostImmediately}
                                variant="contained"
                                style={{ backgroundColor: "#00B14F", textTransform: 'none' }} >
                                <span style={{ fontSize: "14px" }}>Đăng ngay</span>
                              </Button>
                            </div>

                            <div style={{ cursor: "pointer", paddingTop: "10px" }}>
                              <Button
                                onClick={handleOpenAppointment}
                                variant="contained"
                                style={{ backgroundColor: "Purple", textTransform: 'none' }} >
                                <span style={{ fontSize: "14px" }}>Hẹn lịch đăng</span>
                              </Button>
                            </div>

                            <div style={{ cursor: "pointer", paddingTop: "10px" }}>
                              <Tooltip title="Chỉ lưu Nội dung và File phương tiện">
                                <Button
                                  onClick={handleSubmitDraft}
                                  variant="contained"
                                  style={{ backgroundColor: "#000099", textTransform: 'none' }} >
                                  <span style={{ fontSize: "14px" }}>Lưu vào nháp</span>
                                </Button>
                              </Tooltip>
                            </div>
                          </div>
                          :
                          <div className="d-flex justify-content-between">
                            <div style={{ paddingTop: "10px", }}>
                              <Button
                                variant="contained"
                                style={{ backgroundColor: "gray", textTransform: 'none', cursor: "not-allowed" }} >
                                <span style={{ fontSize: "14px" }}>Đăng ngay</span>
                              </Button>
                            </div>

                            <div style={{ paddingTop: "10px", }}>
                              <Button
                                variant="contained"
                                style={{ backgroundColor: "gray", textTransform: 'none', cursor: "not-allowed" }} >
                                <span style={{ fontSize: "14px" }}>Hẹn lịch đăng</span>
                              </Button>
                            </div>

                            <div style={{ cursor: "pointer", paddingTop: "10px" }}>
                              <Tooltip title="Chỉ lưu Nội dung và File phương tiện">
                                <Button
                                  onClick={handleSubmitDraft}
                                  variant="contained"
                                  style={{ backgroundColor: "#000099", textTransform: 'none' }} >
                                  <span style={{ fontSize: "14px" }}>Lưu vào nháp</span>
                                </Button>
                              </Tooltip>
                            </div>
                          </div>
                        }
                      </div>
                    </div>

                  }

                </div>
              </div>
            </Card >
          </Grid>
          <Grid item xs={6}>
            <Card >
              <div style={{ backgroundColor: "#FFFFFF" }} >
                <div style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "20px" }}>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>
                    Hiển thị bảng tin trên Facebook
                  </div>
                  <Divider sx={{ color: "#00B14F", paddingTop: "5px" }} />
                  <div style={{ paddingTop: "20px" }}>
                    <Card sx={{ Width: "45%" }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe"
                            src="kol.jpg">
                          </Avatar>
                        }
                        title={selectedPage?.page_name ? selectedPage.page_name : "Chưa có thông tin"}
                        subheader={dateAppointment ?
                          <span>  {dateAppointment} lúc {timeAppointment}</span>
                          :
                          <span>Vừa xong . <PublicIcon sx={{ fontSize: "14px" }} /></span>}
                      />

                      <CardContent sx={{ marginTop: "-15px", marginBottom: "-15px" }}>
                        <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 500, fontSize: "14px", fontFamily: "Arial" }}>
                          {content}
                        </pre>
                      </CardContent>
                      {imageShow ?
                        <div style={{ paddingBottom: "15px" }}>
                          <CardMedia
                            component="img"
                            height="360"
                            image={imageShow}
                            alt="image"
                          />
                        </div>
                        :
                        <div>
                          {videoShow ?
                            <div style={{ paddingTop: "-15px" }}>
                              <CardMedia
                                component="video"
                                height="360"
                                image={videoShow}
                              />
                            </div>
                            :
                            <CardMedia
                              component="img"
                              height="360"
                              image="cardkol.jpg"
                              alt="image"
                            />
                          }
                        </div>
                      }

                      <CardActions disableSpacing sx={{ marginTop: "-10px" }}>
                        <div className="d-flex justify-content-between">
                          <div style={{ cursor: "pointer" }}>
                            <Button
                              variant="text"
                              style={{ width: "150px", backgroundColor: "white", textTransform: 'none' }}
                              startIcon={<ThumbUpOffAltIcon sx={{ color: "black" }} />}>
                              <span style={{ fontSize: "14px", color: "black", fontWeight: 400 }}> Thích</span>
                            </Button>
                          </div>

                          <div style={{ cursor: "pointer" }}>
                            <Button
                              variant="text"
                              style={{ width: "150px", backgroundColor: "white", textTransform: 'none' }}
                              startIcon={<ChatBubbleOutlineIcon sx={{ color: "black" }} />}>
                              <span style={{ fontSize: "14px", color: "black", fontWeight: 400 }}> Bình luận</span>
                            </Button>
                          </div>

                          <div style={{ cursor: "pointer" }}>
                            <Button
                              variant="text"
                              style={{ width: "150px", backgroundColor: "white", textTransform: 'none' }}
                              startIcon={<ReplyOutlinedIcon sx={{ color: "black" }} />}>
                              <span style={{ fontSize: "14px", color: "black", fontWeight: 400 }}> Chia sẻ</span>
                            </Button>
                          </div>

                        </div>
                      </CardActions>

                    </Card>
                  </div>
                </div>
              </div>
            </Card >
          </Grid>
        </Grid>

        <Appointment
          selectedImage={selectedImage}
          selectedVideo={selectedVideo}
          content={content}
          isOpen={isAppointment}
          isClose={(value) => handleCloseAppointment(value)}
          // datePicker={(value) => handlePickDate(value)}
          // timePicker={(value) => handlePickTime(value)}
          selectedPage={selectedPage}
        />
        {/* Phần modal hiển thị xác nhận (Ví dụ: Đăng thành công, ...) */}
        <Dialog
          open={openAlertDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseAlertDialog}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Xử lí thành công"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseAlertDialog}>Tắt</Button>
          </DialogActions>
        </Dialog>

      </div >

    );
  }

}