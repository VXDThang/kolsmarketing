import React from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import InputBase from '@mui/material/InputBase';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import { DOMAIN_API } from '../../../../config/const';

//icon
import SendIcon from '@mui/icons-material/Send';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

//format time
import moment from 'moment';
const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  min-height: 100vh;
  font-size: 14px; 
  border-radius: 5px;
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

//type 1: Click chọn đọc thông báo liên quan đến nhiệm vụ này
//type 2: Thường

export default function Mission_KOL({ key, detail_mision, type }) {
    let actoken = localStorage.access_token;
    const [comment, setComment] = React.useState('');
    const [listComment, setListComment] = React.useState([]);
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    };
    const handleSubmitComment = () => {
        if (comment != '') {
            let url1 = "";
            url1 = DOMAIN_API + `jobs/create-comment`;
            fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_post: detail_mision.id_post, content: comment, files: null, id_job: detail_mision.id })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        listComment.push(result);
                        setComment("");
                    }
                )
        }
        else {
            window.alert("Bạn chưa nhập nội dung nhiệm vụ");
        }

    };

    async function getAllComment() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `jobs/find-comment-of-job`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_job: detail_mision.id })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setListComment(result);
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
        if (detail_mision?.id) {
            getAllComment();
        }
    }, [])
    return (
        <div>
            <div style={{ paddingTop: "20px" }}>
                <Card sx={{ Width: "45%", borderLeft: '0.2em solid #00B14F', borderTop: '0.2em solid #00B14F' }}>
                    <CardHeader
                        sx={{ bgcolor:  type== 1 ? "#eefff6" : ""}}
                    avatar={
                        <Avatar sx={{ bgcolor: "#00b14f" }} aria-label="recipe"
                            src="kol.jpg">
                        </Avatar>
                    }
                    title={<span style={{ fontWeight: 600 }}> {detail_mision?.userInfo?.name}</span>}
                    subheader={moment(detail_mision?.create_time).format("DD/MM/YYYY HH:mm")}
                    />

                    <CardContent sx={{  bgcolor:  type== 1 ? "#eefff6" : "",
                        marginTop: "-15px", marginBottom: "-15px" }}>
                        <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 400, fontSize: "15px",fontFamily: "Segoe UI" }}>
                            {detail_mision?.content}
                        </pre>
                    </CardContent>




                    {/* Phần danh sách cmt hiện có */}
                    <div style={{ paddingLeft: "15px" }}>
                        {listComment?.length > 0 ?
                            <div>
                                <div style={{ paddingTop: "20px", marginLeft:"-15px" }}>
                                    <Divider sx={{ color: "#00B14F" }} />
                                </div>

                                <div className="d-flex justify-content-between">
                                    <div style={{ paddingTop: "10px",fontSize: "15px" }}>
                                        <PeopleAltIcon sx={{ fontSize: "18px", marginBottom:"3px" }} /> Danh sách {listComment?.length} bình luận
                                    </div>
                                    <div style={{ paddingRight: "10px", paddingTop: "10px" }}>
                                        {expanded ?
                                            <Tooltip title="Thu gọn">
                                                <ExpandLessIcon
                                                    sx={{ cursor: "pointer" }}
                                                    onClick={handleExpandClick} />
                                            </Tooltip>
                                            :
                                            <Tooltip title="Xem bình luận">
                                                <ExpandMoreIcon
                                                    sx={{ cursor: "pointer" }}
                                                    onClick={handleExpandClick} />
                                            </Tooltip>
                                        }
                                    </div>
                                </div>
                            </div>
                            :
                            ""}

                        <Collapse in={expanded} timeout="auto" unmountOnExit>
                            {listComment?.length > 0 && listComment.map((cmt, index) => (
                                <div key={index} style={{ display: 'flex', flexDirection: 'row', paddingTop: "15px" }}>
                                    <div>
                                        <Avatar sx={{ width: 32, height: 32 }} alt="..."
                                            src={cmt?.userInfo?.avatar ? cmt.userInfo.avatar : "../../kol.jpg"} />
                                    </div>
                                    <div style={{ fontSize: "16px", paddingLeft: "10px", maxWidth: "90%" }}>
                                        <Card sx={{ bgcolor: "#f0f2f5",borderRadius:"20px",boxShadow: "none"   }}>
                                            <div style={{ paddingTop: "10px", paddingBottom: "10px", paddingRight: "15px", paddingLeft: "15px" }}>
                                                <div style={{ fontWeight: 300, fontSize: "15px", fontWeight: 500,fontFamily: "Segoe UI" }}>
                                                    {cmt?.userInfo?.name}
                                                </div>
                                                <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 400, fontSize: "15px",fontFamily: "Segoe UI" }}>
                                                    {cmt?.content}
                                                </pre>

                                                <div style={{color:"gray", fontWeight: 300, fontSize: "13px", marginTop: "-15px",fontFamily: "Segoe UI" }}>
                                                    {moment(cmt?.create_time).format("DD/MM/YYYY HH:mm")}
                                                </div>
                                            </div>
                                        </Card>

                                    </div>
                                </div>
                            ))}

                        </Collapse>

                    </div>


                    <div style={{ paddingTop: "15px" }} >
                        <Divider sx={{ color: "#00B14F" }} />
                    </div>


                    {/* Phần viết comment */}
                    <CardActions disableSpacing sx={{ marginTop: "-10px" }}>
                        <div style={{ paddingTop: "15px", paddingLeft: "5px", display: 'flex', flexDirection: 'row', width: "100%" }}>
                            <div style={{ paddingTop: "3px" }}>
                                <Avatar sx={{ width: 32, height: 32 }} alt="..." src="" />
                            </div>
                            <div style={{ fontSize: "16px", paddingLeft: "10px", width: "100%" }}>
                                <div >
                                    <FormStyled>
                                        <InputBase
                                            sx={{ ml: 1, flex: 1 }}
                                            placeholder="Thêm bình luận"
                                            multiline
                                            fullWidth
                                            maxRows={4}
                                            value={comment}
                                            onChange={(event) => {
                                                setComment(event.target.value);
                                            }}
                                            fontFamily= "Segoe UI"
                                        />
                                        <Button >
                                            <SendIcon sx={{ color: "#00B14F" }} onClick={handleSubmitComment} />
                                        </Button>
                                    </FormStyled>
                                </div>
                            </div>
                        </div>
                    </CardActions>

                </Card>

            </div>
        </div>

    );
}