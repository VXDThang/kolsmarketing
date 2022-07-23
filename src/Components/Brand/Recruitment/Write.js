import * as React from 'react';
import styled from 'styled-components';

import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Tooltip from '@mui/material/Tooltip';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';


//file
import "./Write.css";

//icon
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'
import CircularProgress from '@mui/material/CircularProgress';

const commonStyles = {
  border: 1,
  width: 'full',
  height: '160px',
};

const Input = styled('input')({
  display: 'none',
});

const FormStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border-radius: 5px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const useStyles = makeStyles({
  select: {
    '&:before': {
      borderColor: '#c4c4c4',
    },
    '&:selected': {
      borderColor: '#00B14F',
    },
    '&:not(.Mui-disabled):hover::before': {
      borderColor: 'gray',
    },
  },
  icon: {
    fill: 'white',
  },
  root: {
    color: 'white',
  },
});

let actoken = localStorage.access_token;

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function Write() {
  const classes = useStyles();
  const navigate = useNavigate();
  const [field, setField] = React.useState('');
  const [choiceImage, setChoiceImage] = React.useState([]);
  const [dataImage, setDataImage] = React.useState([]);
  const [haveImage, setHaveImage] = React.useState(false);
  const [cateFull, setCateFull] = React.useState([]);
  const [selectedCate, setSelectedCate] = React.useState('');
  const [errorCate, setErrorCate] = React.useState(false);
  const [selectedAddress, setSelectedAddress] = React.useState('');
  const [errorAddress, setErrorAddress] = React.useState(false);
  const [amount, setAmount] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [content, setContent] = React.useState('');
  const [requirement, setRequirement] = React.useState('');
  const [benefit, setBenefit] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [min_cast, setMinCast] = React.useState('');
  const [max_cast, setMaxCast] = React.useState('');
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
  const [isPosting, setIsPosting] = React.useState(false);
  const [allProvince, setAllProvince] = React.useState([]);

  const [postError, setPostError] = React.useState(false);

  const handleClickOpenAlertDialogError = () => {
    setPostError(true);
  };

  const handleCloseAlertDialogError = () => {
    setPostError(false);
    setDataImage([]);
    setChoiceImage([]);
    setSelectedCate('');
    setAmount('');
    setGender('');
    setContent('');
    setRequirement('');
    setBenefit('');
    setTitle('');
    setMinCast('');
    setMaxCast('');
    setSelectedAddress('');
    setIsPosting(false);
  };



  const handleClickOpenAlertDialog = () => {
    setIsPosting(false);
    setOpenAlertDialog(true);
  };

  const handleCloseAlertDialog = () => {
    setDataImage([]);
    setChoiceImage([]);
    setSelectedCate('');
    setAmount('');
    setGender('');
    setContent('');
    setRequirement('');
    setBenefit('');
    setTitle('');
    setMinCast('');
    setMaxCast('');
    setSelectedAddress('');
    setOpenAlertDialog(false);
    setIsPosting(false);
  };

  const handleChangeCate = (event) => {
    setSelectedCate(event.target.value);
    setErrorCate(false);

  };
  const handleChangeAddress = (event) => {
    setSelectedAddress(event.target.value);
  };

  const fileSelectHandler = async (event) => {
    var list = choiceImage.length ? [...choiceImage] : [];
    var dataList = dataImage.length ? [...dataImage] : [];
    for (let i = 0; i < event.target.files.length; i++) {
      list.push(URL.createObjectURL(event.target.files[i]));
      dataList.push(event.target.files[i]);
    }

    var list_main = [];
    var data_main = [];
    if (list.length <= 10) { setChoiceImage(list) }
    if (dataList.length <= 10) { setDataImage(dataList) }
    else {
      for (let i = 0; i <= 9; i++) {
        list_main.push(list[i]);
        data_main.push(dataList[i]);
      }
      setChoiceImage(list_main);
      setDataImage(data_main);
    }
  };
  const onImageRemove = (index) => {
    let tem_image = [];
    let tem_data = [];
    for (let i = 0; i < choiceImage.length; i++) {
      if (i !== index) {
        tem_image.push(choiceImage[i]);
        tem_data.push(dataImage[i]);
      }
    }
    setChoiceImage(tem_image);
    setDataImage(tem_data);

  }
  React.useEffect(() => {
    fetch(DOMAIN_API + `categories/all-cate`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.length > 0) {
            setCateFull(result);
          }
        }
      )

    fetch(DOMAIN_API + `list-province-vn`, {
      method: "GET",
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.length > 0) {
            setAllProvince(result);
          }
        }
      )

  }, [])

  async function handleSubmit(event) {
    setIsPosting(true);
    let files = []
    event.preventDefault();
    for (var x = 0; x < dataImage.length; x++) {
      var formdata = new FormData();
      var publich = `${new Date().getTime()}${Math.random()}`

      formdata.append("file", dataImage[x]);
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
      files.push(json.secure_url);
    }

    fetch(DOMAIN_API + `posts/create-post`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },
      body: JSON.stringify({ files, title, selectedAddress, amount, gender, content, requirement, benefit, min_cast, max_cast, selectedCate })
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result)
            handleClickOpenAlertDialog();
          else
            handleClickOpenAlertDialogError();
        }
      )


  };

  function compareMinMaxCast() {
    if (Number(min_cast) <= Number(max_cast))
      return true
    else return false
  };


  return (
    <div style={{ }}>
      <Card sx={{ padding: "20px" }}>
        <div style={{ fontWeight: 500 }}>
          Viết bài tuyển dụng
        </div>
        <form >
          <div style={{ paddingTop: "15px" }}>

            {/* <TextField
              InputLabelProps={{ style: { fontSize: "15px", color: "black" } }}
              fullWidth
              id="outlined-basic"
              label="Tiêu đề"
              value={title}
              variant="outlined"
              size="small"

              onChange={(event) => { setTitle(event.target.value) }}

            /> */}
            <div style={{ fontSize: "15px", color: "black", paddingBottom: "5px" }}>
              Tiêu đề *
            </div>
            <div  >
              <FormStyled style={{ border: title ? "1px solid #00B14F" : "1px solid #c4c4c4" }}>
                <InputBase
                  sx={{ ml: 1, flex: 1, fontSize: "15px", }}
                  placeholder="Nhập tiêu đề"
                  multiline
                  maxRows={2}
                  value={title}
                  onChange={(event) => {
                    setTitle(event.target.value);
                  }}
                />
              </FormStyled>
            </div>

            <div>
              {title != '' ?
                ""
                :
                <div style={{ fontWeight: 500, fontSize: "12px", color: "red", paddingTop: "2px", textAlign: "left" }}>
                  Không được để trống
                </div>

              }
            </div>
          </div>

          <div style={{ paddingTop: "15px" }}>
            <div style={{ fontSize: "15px", color: "black", paddingBottom: "5px" }}>
              Lĩnh vực *
            </div>
            <FormControl fullWidth error={errorCate}>
              <InputLabel size="small" id="demo-simple-select-label"
                sx={{
                  fontSize: "14px",
                  color: selectedCate ? "green" : "#c0c0c0",
                  fontWeight: selectedCate ? 600 : 400,
                }}>{selectedCate ? <span>Ok </span> : <span>Chọn lĩnh vực </span>}</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedCate}
                label={selectedCate ? <span>Ok </span> : <span>Chọn lĩnh vực </span>}
                onChange={handleChangeCate}
                size="small"

              >

                {cateFull.length > 0 && cateFull.map((cate) => (
                  <MenuItem value={cate.id} key={cate.id} >{cate.name}</MenuItem>
                ))}


              </Select>

            </FormControl>
            <div>
              {selectedCate ?
                ""
                :
                <div style={{ fontWeight: 500, fontSize: "12px", color: "red", paddingTop: "2px", textAlign: "left" }}>
                  Phải chọn lĩnh vực
                </div>

              }
            </div>

          </div>



          <div style={{ paddingTop: "15px" }}>
            <div style={{ fontSize: "15px", color: "black", paddingBottom: "5px" }}>
              Địa điểm *
            </div>
            <FormControl fullWidth error={errorAddress}>
              <InputLabel size="small" id="demo-simple-select-label"
                sx={{
                  fontSize: "14px",
                  color: selectedAddress ? "green" : "#c0c0c0",
                  fontWeight: selectedAddress ? 600 : 400,
                }}>{selectedAddress ? <span>Ok </span> : <span style={{ fontSize: "14px" }}>Chọn địa điểm </span>}</InputLabel>
              <Select
                // className={classes.select}
                // inputProps={{
                //   classes: {
                //     icon: classes.icon,
                //     root: classes.root
                //   }
                // }}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedAddress}
                label={selectedAddress ? <span>Ok </span> : <span>Chọn địa điểm </span>}
                onChange={handleChangeAddress}
                size="small"

              >
                {allProvince.length > 0 && allProvince.map((province) => (
                  <MenuItem value={province.id} key={province.id} >{province.name}</MenuItem>
                ))}
              </Select>

            </FormControl>
            <div>
              {selectedAddress ?
                ""
                :
                <div style={{ fontWeight: 500, fontSize: "12px", color: "red", paddingTop: "2px", textAlign: "left" }}>
                  Phải chọn địa điểm
                </div>

              }
            </div>

          </div>

          <div style={{ paddingTop: "15px" }}>
            {/* <TextField
              InputLabelProps={{ style: { fontSize: "15px", color: "black" } }}
              fullWidth
              id="outlined-basic"
              label="Số lượng"
              variant="outlined"
              size="small"
              value={amount}
              onChange={(event) => { setAmount(event.target.value) }}
            /> */}

            <div style={{ fontSize: "15px", color: "black", paddingBottom: "5px" }}>
              Số lượng
            </div>
            <div  >
              <FormStyled style={{ border: amount ? "1px solid #00B14F" : "1px solid #c4c4c4" }}>
                <InputBase
                  sx={{ ml: "15px", flex: 1, fontSize: "15px", }}
                  placeholder="Nhập số lượng"
                  maxRows={1}
                  value={amount}
                  onChange={(event) => {
                    setAmount(event.target.value);
                  }}
                />
              </FormStyled>
            </div>
          </div>


          <div style={{ paddingTop: "15px" }}>
            {/* <TextField
              InputLabelProps={{ style: { fontSize: "15px", color: "black" } }}
              fullWidth
              id="outlined-basic"
              label="Giới tính"
              variant="outlined"
              size="small"
              value={gender}
              onChange={(event) => { setGender(event.target.value) }}
            /> */}

            <div style={{ fontSize: "15px", color: "black", paddingBottom: "5px" }}>
              Giới tính
            </div>
            <div  >
              <FormStyled style={{ border: gender ? "1px solid #00B14F" : "1px solid #c4c4c4" }}>
                <InputBase
                  sx={{ ml: "15px", flex: 1, fontSize: "15px", }}
                  placeholder="Nhập giới tính"
                  maxRows={1}
                  value={gender}
                  onChange={(event) => {
                    setGender(event.target.value);
                  }}
                />
              </FormStyled>
            </div>

          </div>

          <div style={{ paddingTop: "15px" }}>
            {/* <TextField
              InputLabelProps={{ style: { fontSize: "15px", color: "black" } }}
              fullWidth
              id="outlined-multiline-static"
              label="Mô tả công việc"
              multiline
              rows={4}
              value={content}

              onChange={(event) => { setContent(event.target.value) }}
            /> */}

            <div style={{ fontSize: "15px", color: "black", paddingBottom: "5px" }}>
              Mô tả công việc *
            </div>
            <div  >
              <FormStyled style={{ border: content ? "1px solid #00B14F" : "1px solid #c4c4c4" }}>
                <InputBase
                  sx={{ ml: "15px", flex: 1, fontSize: "15px", }}
                  placeholder="Nhập mô tả công việc"
                  multiline
                  rows={4}
                  maxRows={4}
                  value={content}
                  onChange={(event) => {
                    setContent(event.target.value);
                  }}
                />
              </FormStyled>
            </div>

            <div>
              {content != '' ?
                ""
                :
                <div style={{ fontWeight: 500, fontSize: "12px", color: "red", paddingTop: "2px", textAlign: "left" }}>
                  Không được để trống
                </div>

              }
            </div>

            <div style={{ paddingTop: "15px" }}>
              {/* <TextField
                InputLabelProps={{ style: { fontSize: "15px", color: "black" } }}
                fullWidth
                id="outlined-multiline-static"
                label="Yêu cầu ứng viên"
                multiline
                rows={4}
                value={requirement}

                onChange={(event) => { setRequirement(event.target.value) }}
              /> */}

              <div style={{ fontSize: "15px", color: "black", paddingBottom: "5px" }}>
                Yêu cầu ứng viên *
              </div>
              <div  >
                <FormStyled style={{ border: requirement ? "1px solid #00B14F" : "1px solid #c4c4c4" }}>
                  <InputBase
                    sx={{ ml: "15px", flex: 1, fontSize: "15px", }}
                    placeholder="Nhập yêu cầu ứng viên"
                    multiline
                    rows={4}
                    maxRows={4}
                    value={requirement}
                    onChange={(event) => {
                      setRequirement(event.target.value);
                    }}
                  />
                </FormStyled>
              </div>

              <div>
                {requirement != '' ?
                  ""
                  :
                  <div style={{ fontWeight: 500, fontSize: "12px", color: "red", paddingTop: "2px", textAlign: "left" }}>
                    Không được để trống
                  </div>

                }
              </div>
            </div>

            <div style={{ paddingTop: "15px" }}>
              {/* <TextField
                InputLabelProps={{ style: { fontSize: "15px", color: "black" } }}
                fullWidth
                id="outlined-multiline-static"
                label="Quyền lợi"
                multiline
                rows={4}
                value={benefit}
                onChange={(event) => { setBenefit(event.target.value) }}
              /> */}

              <div style={{ fontSize: "15px", color: "black", paddingBottom: "5px" }}>
                Quyền lợi
              </div>
              <div  >
                <FormStyled style={{ border: benefit ? "1px solid #00B14F" : "1px solid #c4c4c4" }}>
                  <InputBase
                    sx={{ ml: "15px", flex: 1, fontSize: "15px", }}
                    placeholder="Nhập quyền lợi"
                    multiline
                    rows={4}
                    maxRows={4}
                    value={benefit}
                    onChange={(event) => {
                      setBenefit(event.target.value);
                    }}
                  />
                </FormStyled>
              </div>

            </div>

            <div style={{ paddingTop: "15px" }}>
              {/* <TextField
                InputLabelProps={{ style: { fontSize: "15px", color: "black" } }}
                fullWidth
                id="outlined-basic"
                label="Lương tối thiểu"
                variant="outlined"
                size="small"
                value={min_cast}

                onChange={(event) => { setMinCast(event.target.value) }}
              /> */}

              <div style={{ fontSize: "15px", color: "black", paddingBottom: "5px" }}>
                Lương tối thiểu (VND)*
                <span style={{ fontSize: "14px", paddingLeft: "10px" }}>{min_cast ? (Number(min_cast)).toLocaleString("vi") : ""}</span>
              </div>
              <div  >
                <FormStyled style={{ border: min_cast ? "1px solid #00B14F" : "1px solid #c4c4c4" }}>
                  <InputBase
                    sx={{ ml: "15px", flex: 1, fontSize: "15px", }}
                    placeholder="Nhập lương tối thiểu"
                    rows={1}
                    value={min_cast}
                    onChange={(event) => {
                      setMinCast(event.target.value);
                    }}
                  />
                </FormStyled>
              </div>

              <div>
                {min_cast != '' ?
                  ""
                  :
                  <div style={{ fontWeight: 500, fontSize: "12px", color: "red", paddingTop: "2px", textAlign: "left" }}>
                    Không được để trống
                  </div>

                }
              </div>
            </div>

            <div style={{ paddingTop: "15px" }}>
              {/* <TextField
                InputLabelProps={{ style: { fontSize: "15px", color: "black" } }}
                fullWidth
                id="outlined-basic"
                label="Lương tối đa"
                variant="outlined"
                size="small"
                value={max_cast}

                onChange={(event) => { setMaxCast(event.target.value) }}
              /> */}

              <div style={{ fontSize: "15px", color: "black", paddingBottom: "5px" }}>
                Lương tối đa (VND)*
                <span style={{ fontSize: "14px", paddingLeft: "10px" }}>{max_cast ? (Number(max_cast)).toLocaleString("vi") : ""}</span>
              </div>
              <div  >
                <FormStyled style={{ border: (max_cast != '') && (compareMinMaxCast()) ? "1px solid #00B14F" : "1px solid #c4c4c4" }}>
                  <InputBase
                    sx={{ ml: "15px", flex: 1, fontSize: "15px", }}
                    placeholder="Nhập lương tối đa"
                    rows={1}
                    value={max_cast}
                    onChange={(event) => {
                      setMaxCast(event.target.value);
                    }}
                  />
                </FormStyled>
              </div>

              <div>
                {(max_cast != '') && (compareMinMaxCast()) ?
                  ""
                  :
                  <div style={{ fontWeight: 500, fontSize: "12px", color: "red", paddingTop: "2px", textAlign: "left" }}>
                    Không được để trống, lớn hơn hoặc bằng lương tối thiểu
                  </div>

                }
              </div>
            </div>

            <div style={{ paddingTop: "15px" }}>
              <div style={{ fontSize: "15px", color: "black", paddingBottom: "5px" }}>
                Hình ảnh
              </div>
            </div>

            <div style={{ border: "1px solid #AAAAAA", textAlign: "center", width: "100%", marginTop: "5px" }}>
              <div className="row" style={{ paddingLeft: "15px", paddingRight: "15px" }}>
                {
                  choiceImage.map((image, index) => {
                    return (
                      <div className="col-3 d-flex justify-content-center" style={{ marginTop: "15px", marginBottom: "15px" }} >
                        <div key={index} className="image-item" >
                          {/* style={{ width: "100px", height: "100px", position: "absolute", top: "15%", left: "18%" }} */}
                          <div style={{ border: "1px solid #AAAAAA", width: "120px", height: "120px", position: "relative" }}>
                            <Tooltip title="Xóa">
                              <IconButton aria-label="add an alarm" style={{ position: "absolute", right: "-20px", top: "-23px" }}
                                onClick={() => onImageRemove(index)}>
                                <RemoveCircleIcon sx={{ color: "#DD0000" }} />
                              </IconButton>
                            </Tooltip>
                            <img src={image} alt="" style={{ maxWidth: "100px", maxHeight: "100px", alignItems: "center", marginTop: "10px" }} />
                          </div>

                        </div>
                      </div>
                    )
                  })
                }
                {choiceImage.length < 10 ?
                  <div className="col-3 d-flex justify-content-center" style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <label htmlFor="contained-button-file" >
                      <Input accept="image/*" id="contained-button-file" multiple type="file"
                        onChange={fileSelectHandler} />
                      <div style={{ cursor: "pointer" }}>

                        <Box sx={{ ...commonStyles, borderRadius: 1, flexDirection: "column", width: "120px", height: "120px", p: 2, border: '1px dashed grey' }}
                          color="grey.400"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"

                        >
                          <div style={{ color: "black" }}>
                            <AddPhotoAlternateIcon />
                          </div>
                          <div style={{ color: "gray" }}> Thêm hình ảnh
                            <br />
                            <span style={{ fontSize: "13px" }}> (Tối đa 10)</span></div>
                        </Box>
                      </div>
                    </label>
                  </div>
                  :
                  <div className="col-3 d-flex justify-content-center" style={{ marginTop: "15px", marginBottom: "15px" }}>
                    <label htmlFor="contained-button-file" >
                      <Input accept="image/*" id="contained-button-file" multiple type="file" />
                      <div>

                        <Box sx={{ ...commonStyles, borderRadius: 1, flexDirection: "column", width: "120px", height: "120px", p: 2, border: '1px dashed grey' }}
                          color="grey.400"
                          display="flex"
                          justifyContent="center"
                          alignItems="center"

                        >
                          <div style={{ color: "black" }}>
                            <InsertEmoticonIcon />
                          </div>
                          <div style={{ color: "gray" }}> Bạn đã chọn đủ 10 tấm hình                            </div>
                        </Box>
                      </div>
                    </label>
                  </div>}

              </div>
            </div>


            <div style={{ fontSize: "14px", color: "gray", paddingTop: "15px" }}>
              Chú ý: Cần nhập đủ các nội dung cần thiết mới được phép đăng bài
            </div>
            {((title == '')
              || (selectedCate == '')
              || (selectedAddress.length == '')
              || (content == '')
              || (requirement == '')
              || (min_cast == '')
              || (max_cast == '')
              || (!compareMinMaxCast())
            )
              ?
              <div style={{ paddingTop: "15px" }}>
                <Button fullWidth
                  style={{ fontSize: "15px", textTransform: 'capitalize', backgroundColor: "gray", cursor: "not-allowed" }}
                  variant="contained">
                  Đăng
                </Button>
              </div>
              :
              <div>
                {isPosting ?
                  <div style={{ marginTop: "20px", textAlign: "center" }}>
                    <CircularProgress size="2rem" /> Đang đăng ...
                  </div> : ""}

                {isPosting ?
                  <div style={{ paddingTop: "20px" }}>
                    <Button fullWidth style={{ fontSize: "15px", textTransform: 'capitalize', backgroundColor: "gray" }} variant="contained">
                      Đăng
                    </Button>
                  </div>
                  :
                  <div style={{ paddingTop: "15px" }}>
                    <Button type="submit" fullWidth
                      style={{ fontSize: "15px", textTransform: 'capitalize', backgroundColor: "#00B14F" }} variant="contained"
                      onClick={handleSubmit}>
                      Đăng
                    </Button>
                  </div>
                }
              </div>
            }


          </div>
        </form>

      </Card>
      <Dialog
        open={openAlertDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAlertDialog}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Đã đăng thành công"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseAlertDialog}>Tắt</Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={postError}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseAlertDialogError}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Có vấn đề xảy ra. Đăng không thành công"}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseAlertDialogError}>Tắt</Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
