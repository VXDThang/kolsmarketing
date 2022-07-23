import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@mui/material/Tooltip';
import Slide from '@mui/material/Slide';
import CircularProgress from '@mui/material/CircularProgress';

//file
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'


const Input = styled('input')({
  display: 'none',
});

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));



const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});



export default function Proposes_Write(props) {

  let today = new Date();
  let date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();
  let actoken = localStorage.access_token;
  const [checkedGender, setCheckedGender] = React.useState(0);
  const [checkedPhone, setCheckedPhone] = React.useState(0);
  const [checkedMail, setCheckedMail] = React.useState(0);
  const [checkedAddress, setCheckedAdress] = React.useState(0);
  const [showCard, setShowCard] = React.useState(0);

  const [describe, setDescribe] = React.useState("");
  const [imageToData, setImageToData] = React.useState(null);

  const [selectedImage, setSelectedImage] = React.useState(null);
  const [imageShow, setImageShow] = React.useState(null);


  const [cardKOL, setCardKOL] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  //Hiển thị ở brand
  const [expanded, setExpanded] = React.useState(true);

  const [loadingToSaveCard, setLoadingToSaveCard] = React.useState(false);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const handleClickOpenAlertDialog = () => {
    setOpenAlertDialog(true);
  };

  const handleCloseAlertDialog = () => {
    setOpenAlertDialog(false);
  };

  async function handleSubmitImage(file) {

    if (file) {
      var formdata = new FormData();
      var publich = `${new Date().getTime()}${Math.random()}`

      formdata.append("file", file);
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
      return (json.secure_url);
    }
    else
      return (imageToData)
  };

  async function getDetailCardKOL() {
    try {
      let url1 = "";
      url1 = DOMAIN_API + `cardkols/get-detail-card`;
      await fetch(url1, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": actoken
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            setCardKOL(result);

            setCheckedAdress(result.address)
            setCheckedMail(result.email)
            setCheckedGender(result.gender)
            setCheckedPhone(result.phone)

            setDescribe(result.describe)
            setImageShow(result.image)
            setImageToData(result.image)

            setShowCard(result.state);
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
    getDetailCardKOL();
  }, [])


  async function handleSaveCardKOL() {
    setLoadingToSaveCard(true);
    let imageSave = await handleSubmitImage(selectedImage)

    fetch(DOMAIN_API + `cardkols/update-detail-card`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },

      body: JSON.stringify({
        email: checkedMail, address: checkedAddress, phone: checkedPhone,
        gender: checkedGender, image: imageSave, describe: describe
      })
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result) {

          }
          setLoadingToSaveCard(false)
          handleClickOpenAlertDialog()
        }
      ).catch(error => {
        console.log("Error: ", error);
      })
  }



  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const toggleCheckedGender = () => {
    if (checkedGender)
      setCheckedGender(0);
    else
      setCheckedGender(1);
  };

  const toggleCheckedPhone = () => {
    if (checkedPhone)
      setCheckedPhone(0);
    else
      setCheckedPhone(1);
  };

  const toggleCheckedMail = () => {
    if (checkedMail)
      setCheckedMail(0);
    else
      setCheckedMail(1);
  };

  const toggleCheckedAddress = () => {
    if (checkedAddress)
      setCheckedAdress(0);
    else
      setCheckedAdress(1);
  };

  const handleDeleteImage = () => {
    setImageShow(null);
    setImageToData(null);
    setSelectedImage(null);

  };

  const fileSelectHandler = async (event) => {
    setImageShow(URL.createObjectURL(event.target.files[0]));
    setSelectedImage(event.target.files[0]);
  };



  if (loading)
    return (
      <div>
        Đang tải dữ liệu
      </div>
    )
  else {
    return (
      <div>
        <Grid container spacing={2}>

          <Grid item xs={12}>
            <Card >
              <div style={{ backgroundColor: "#FFFFFF" }} >
                <div style={{ paddingLeft: "20px", paddingTop: "10px", paddingBottom: "10px" }}>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>
                    Cài đặt thông tin hiển thị
                  </div>
                  <div style={{ paddingRight: "15px" }}>
                    <Divider sx={{ color: "#00B14F", paddingTop: "5px" }} />
                  </div>
                  <div style={{ fontSize: "14px" }}>
                    <div className="d-flex justify-content-between" style={{ paddingTop: "13px" }}>
                      <div style={{ marginTop: "7px" }}>
                        Hiển thị
                        <span style={{ fontWeight: "500", color: "#00B14F" }}> giới tính </span>
                        của bạn
                      </div>
                      <div >
                        <FormControlLabel size="small"
                          control={<Switch checked={checkedGender == 1 ? true : false} onChange={toggleCheckedGender} />}
                          label={checkedGender == 1 ?
                            <span style={{ fontSize: '14px', color: "#00B14F", fontWeight: "500" }}>Bật</span>
                            : <span style={{ fontSize: '14px', color: "#DD0000", fontWeight: "500" }}>Tắt</span>} />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between" style={{ paddingTop: "13px" }}>
                      <div style={{ marginTop: "7px" }}>
                        Hiển thị
                        <span style={{ fontWeight: "500", color: "#00B14F" }}> số điện thoại </span>
                        của bạn
                      </div>
                      <div >
                        <FormControlLabel size="small"
                          control={<Switch checked={checkedPhone == 1 ? true : false} onChange={toggleCheckedPhone} />}
                          label={checkedPhone == 1 ?
                            <span style={{ fontSize: '14px', color: "#00B14F", fontWeight: "500" }}>Bật</span>
                            : <span style={{ fontSize: '14px', color: "#DD0000", fontWeight: "500" }}>Tắt</span>} />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between" style={{ paddingTop: "13px" }}>
                      <div style={{ marginTop: "7px" }}>
                        Hiển thị
                        <span style={{ fontWeight: "500", color: "#00B14F" }}> mail </span>
                        của bạn
                      </div>
                      <div >
                        <FormControlLabel size="small"
                          control={<Switch checked={checkedMail == 1 ? true : false} onChange={toggleCheckedMail} />}
                          label={checkedMail == 1 ?
                            <span style={{ fontSize: '14px', color: "#00B14F", fontWeight: "500" }}>Bật</span>
                            : <span style={{ fontSize: '14px', color: "#DD0000", fontWeight: "500" }}>Tắt</span>} />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between" style={{ paddingTop: "13px" }}>
                      <div style={{ marginTop: "7px" }}>
                        Hiển thị
                        <span style={{ fontWeight: "500", color: "#00B14F" }}> địa chỉ </span>
                        của bạn
                      </div>
                      <div >
                        <FormControlLabel size="small"
                          control={<Switch checked={checkedAddress == 1 ? true : false} onChange={toggleCheckedAddress} />}
                          label={checkedAddress == 1 ?
                            <span style={{ fontSize: '14px', color: "#00B14F", fontWeight: "500" }}>Bật</span>
                            : <span style={{ fontSize: '14px', color: "#DD0000", fontWeight: "500" }}>Tắt</span>} />
                      </div>
                    </div>
                    <div style={{ paddingRight: "15px" }}>
                      <Divider sx={{ color: "#00B14F" }} />
                    </div>
                    <div className="d-flex justify-content-between" style={{ paddingTop: "10px", paddingBottom: "10px", paddingRight: "15px" }}>
                      <div style={{ fontWeight: "600" }}>
                        Hình ảnh giới thiệu
                      </div>
                      <div >
                        {imageShow ?
                          <div className="d-flex justify-content-between">
                            <div style={{ cursor: "pointer", color: "#DD0000", fontWeight: "500", paddingRight: "40px" }}
                              onClick={handleDeleteImage}>
                              Xóa
                            </div>
                            <label htmlFor="contained-button-file" >
                              <Input accept="image/*" id="contained-button-file" type="file"
                                onChange={fileSelectHandler} />
                              <div style={{ cursor: "pointer", color: "#00B14F", fontWeight: "500" }}>
                                Thay đổi
                              </div>
                            </label>
                          </div>


                          :

                          <label htmlFor="contained-button-file" >
                            <Input accept="image/*" id="contained-button-file" type="file"
                              onChange={fileSelectHandler} />
                            <div style={{ cursor: "pointer", color: "#00B14F", fontWeight: "500" }}>
                              Thêm
                            </div>
                          </label>
                        }
                      </div>
                    </div>

                    {imageShow ?
                      <div style={{ paddingTop: "5px", paddingRight: "20px", paddingBottom: "15px" }} >
                        <img src={imageShow} width="100%" height="auto" />
                      </div>
                      : ""}

                    <div style={{ paddingRight: "15px" }}>
                      <Divider sx={{ color: "#00B14F" }} />
                    </div>

                    <div style={{ paddingTop: "10px", paddingRight: "15px" }}>

                      <div style={{ marginTop: "5px" }} >
                        <TextField
                          fullWidth
                          id="outlined-multiline-static"
                          label="Mô tả"
                          multiline
                          rows={10}
                          value={describe}
                          onChange={(event) => { setDescribe(event.target.value) }}
                        />
                      </div>
                    </div>
                    {loadingToSaveCard ?
                      <div className='d-flex justify-content-center' style={{ marginTop: "20px" }}>
                        <CircularProgress />
                      </div>
                      : ""
                    }
                    <div className='d-flex justify-content-center' style={{ marginTop: "20px" }}>
                      <Button
                        variant="contained" color="success"
                        sx={{ backgroundColor: "#00B14F", marginLeft: "15px" }}
                        onClick={handleSaveCardKOL}
                      >
                        Lưu</Button>
                    </div>

                  </div>
                </div>
              </div>
            </Card >
          </Grid>

          <Grid item xs={12}>
            <Card >
              <div style={{ backgroundColor: "#FFFFFF" }} >
                <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "20px" }}>
                  <div style={{ fontSize: "16px", fontWeight: 600 }}>
                    Hiển thị phía nhãn hàng
                  </div>
                  <Divider sx={{ color: "#00B14F", paddingTop: "5px" }} />
                  <div style={{ paddingTop: "20px" }}>
                    <Card sx={{ Width: "45%" }}>
                      <CardHeader
                        avatar={
                          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
                            src={props.profile?.avatar ? props.profile.avatar : "kol.jpg"}>
                          </Avatar>
                        }
                        title={props.profile?.full_name ? props.profile.full_name : "Chưa có thông tin"}
                        subheader="Influencers"
                      />
                      {imageShow ? <CardMedia
                        component="img"
                        height="360"
                        image={imageShow}
                        alt="image"
                      />
                        :
                        <CardMedia
                          component="img"
                          height="360"
                          image="cardkol.jpg"
                          alt="image"
                        />
                      }
                      <CardActions disableSpacing sx={{}}>
                        <Tooltip title="Quan tâm">
                          <IconButton aria-label="add to favorites" sx={{ width: 36, height: 36, "&:hover": { bgcolor: "#EEEEEE" } }}>
                            <FavoriteIcon sx={{ fontSize: 22, "&:hover": { color: "#00B14F" } }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Chat">
                          <IconButton
                            aria-label="chat" sx={{ width: 36, height: 36, "&:hover": { bgcolor: "#EEEEEE" } }}>
                            <ChatIcon sx={{ fontSize: 22, "&:hover": { color: "#1b74e4" } }} />
                          </IconButton>
                        </Tooltip>
                        <ExpandMore
                          expand={expanded}
                          onClick={handleExpandClick}
                          aria-expanded={expanded}
                          aria-label="show more"
                        >
                          <ExpandMoreIcon />
                        </ExpandMore>
                      </CardActions>
                      <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent sx={{ marginTop: "-15px", marginBottom: "-15px" }}>
                          <div style={{ fontSize: "14px", fontWeight: 500 }}>Thông tin chung</div>
                          <Typography variant="body2" color="text.secondary">
                            {checkedGender == 1 ? `Giới tính: ${props.profile?.gender ? props.profile.gender : 'Chưa có thông tin'}` : ""}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {checkedPhone == 1 ? `Số điện thoại:  ${props.profile?.phone ? props.profile.phone : 'Chưa có thông tin'}` : ""}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {checkedMail == 1 ? `Mail:  ${props.profile?.email ? props.profile.email : 'Chưa có thông tin'}` : ""}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {checkedAddress == 1 ? `Địa chỉ:  ${props.profile?.address ? props.profile.address : 'Chưa có thông tin'}` : ""}
                          </Typography>
                          <div style={{ fontSize: "14px", fontWeight: 500, paddingTop: "10px" }}>Mô tả</div>
                          <Typography paragraph>
                            <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 500, fontSize: "14px", fontFamily: "Arial" }}>
                              {describe}
                            </pre>
                          </Typography>
                        </CardContent>
                      </Collapse>
                    </Card>
                  </div>
                </div>
              </div>
            </Card >
          </Grid>



        </Grid>

        <Dialog
          open={openAlertDialog}
          TransitionComponent={Transition}
          keepMounted
          onClose={handleCloseAlertDialog}
          aria-describedby="alert-dialog-slide-description"
        >
          <DialogTitle>{"Đã lưu thành công"}</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseAlertDialog}>Tắt</Button>
          </DialogActions>
        </Dialog>

      </div >

    );
  }
}
