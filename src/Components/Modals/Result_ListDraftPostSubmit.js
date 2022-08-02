import * as React from 'react';
import styled from 'styled-components';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import { DOMAIN_API} from '../../config/const';
import Slide from '@mui/material/Slide';

//icon
import CloseIcon from '@mui/icons-material/Close';
//file
import Content from './Result_ListDraftPostSubmitFile/Content'
import './Result_ListDraftPostSubmitFile/List.css'

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


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



export default function Result_ListDraftPostSubmit(props) {
    const { isOpen, isClose, id_job, id_post } = props;

    //copy from Job_Post_Write.js
    let actoken = localStorage.access_token;

    const [loading, setLoading] = React.useState(false);


    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);
    const [listResult, setListResult] = React.useState([]);
    const [isSaving, setIsSaving] = React.useState(false);

    const [idPicker, setIdPicker] = React.useState(null);
    const [indexChoice, setIndexChoice] = React.useState(null);

    const [loadingAfterEvaluate, setLoadingAfterEvaluate] = React.useState(false);


    const handleCloseListDraftPost = () => {
        setIdPicker(null);
        setIndexChoice(null);
        isClose(false);
    };

    const handleClickOne = (e, id, index) => {
        setIdPicker(id);
        setIndexChoice(index)
    }



    const UpdateList = (index, type, evaluate) => {
        let temp = listResult;
        temp[index].type_accept = type;
        temp[index].review = evaluate
        setListResult(temp);
        setLoadingAfterEvaluate(!loadingAfterEvaluate)
    }

    async function getAllResult() {
        setLoading(true);
        try {
            let url1 = "";
            url1 = DOMAIN_API + `social/get-list-draft-of-job`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_job: id_job })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setListResult(result);
                        setLoading(false);
                    }
                )
        }
        catch (error) {
            console.log("error: ", error)
        }
        finally {
            setLoading(false);
        }
    }




    React.useEffect(() => {
        getAllResult()
    }, [props])

    if (loading) {
        return (
            <div>
                <Dialog
                    maxWidth={'lg'}
                    fullWidth
                    open={isOpen}
                    onClose={handleCloseListDraftPost}
                    aria-labelledby="draggable-dialog-title"
                >
                    {/* Nội dung */}

                    <div>
                        Đang tải dữ liệu ...
                    </div >
                </Dialog>
            </div>
        )
    }
    else {
        return (
            <div>
                <Dialog
                    maxWidth={'xl'}
                    fullWidth
                    open={isOpen}
                    onClose={handleCloseListDraftPost}
                    aria-labelledby="draggable-dialog-title"
                >
                    {/* Nội dung */}

                    <div
                        className="d-flex justify-content-between" style={{ paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
                        <div style={{ fontWeight: 600, fontSize: "18px", color: "black", paddingLeft: "10px" }}>
                            Danh sách kết quả
                        </div>
                        <div style={{ cursor: "pointer" }}>
                            <Tooltip title="Thoát">
                                <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "gray" } }}>
                                    <CloseIcon sx={{ fontSize: 18 }}
                                        onClick={handleCloseListDraftPost} />
                                </Avatar>
                            </Tooltip>
                        </div>
                    </div>

                    <div style={{ paddingTop: "10px", paddingLeft: "20px", paddingRight: "20px" }} >
                        <Grid container sx={{ paddingLeft: "10px", paddingRight: "10px" }} >

                            <Grid item xs={7} sx={{}}>
                                {/* <List_Draft_Post
                                    listDraft={listResult}
                                /> */}
                                <div>
                                    <div style={{ paddingBottom: "3px" }}>
                                        <Grid container sx={{ fontWeight: 500 }} >
                                            <Grid item xs={0.7}>
                                                STT
                                            </Grid>
                                            <Grid item xs={2.5}>
                                                Thành viên
                                            </Grid>
                                            <Grid item xs={2}>
                                                Phương tiện
                                            </Grid>
                                            <Grid item xs={5.2}>
                                                Nội dung
                                            </Grid>
                                            <Grid item xs={1.6}>
                                                Trạng thái
                                            </Grid>
                                        </Grid>
                                    </div>
                                    <div style={{ maxHeight: "70vh", overflowY: "auto" }}>
                                        <div style={{ paddingRight: "5px" }}>
                                            {listResult?.length > 0 && listResult.map((list, index) => (
                                                <div key={index}>
                                                    <div className="hoverList"
                                                        style={{ padding: "10px", cursor: "pointer", borderRadius: "5px", backgroundColor: idPicker == list.id ? "#F0D218" : "" }}
                                                        onClick={(e) => handleClickOne(e, list.id, index)}>
                                                        <Grid container  >
                                                            <Grid item xs={0.7}>
                                                              {index+1}
                                                            </Grid>
                                                            <Grid item xs={2.5} sx={{ textAlign: "left" }}>
                                                                <Avatar sx={{ fontSize: "20px" }} src={list.kol_info?.avatar ? list.kol_info.avatar : ""}>
                                                                </Avatar>
                                                                <span style={{ fontSize: "14px" }}>
                                                                    {list.kol_info?.name}
                                                                </span>
                                                            </Grid>
                                                            <Grid item xs={2} sx={{ textAlign: "left" }}>

                                                                {list.url_image ?
                                                                    <img src={list.url_image} style={{ borderRadius: "5px" }}
                                                                        width="60%" height="60px" />
                                                                    :
                                                                    <div>
                                                                        {list.url_video ?
                                                                            <video src={list.url_video} style={{ borderRadius: "5px" }}
                                                                                width="60%" height="60px" controls="controls" autoPlay={false} />
                                                                            :
                                                                            <span style={{ fontSize: "14px", fontFamily: "Arial" }}>Không có</span>
                                                                        }

                                                                    </div>}
                                                            </Grid>
                                                            <Grid item xs={5}>
                                                                <div className="content_list">
                                                                    <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 400, fontSize: "14px", fontFamily: "Arial" }}>
                                                                        {list.content ? list.content : "Không có"}
                                                                    </pre>
                                                                </div>
                                                            </Grid>
                                                            <Grid item xs={1.8} sx={{ textAlign: "center" }}>
                                                                {list.type_accept == "0" ?
                                                                    <span style={{ fontSize: "14px", fontFamily: "Arial" }}>Chưa duyệt</span> : ""}
                                                                {list.type_accept == "1" ?
                                                                    <span style={{ fontSize: "14px", fontFamily: "Arial" }}>Chấp nhận</span> : ""}
                                                                {list.type_accept == "2" ?
                                                                    <span style={{ fontSize: "14px", fontFamily: "Arial" }}>Cần chỉnh sửa</span> : ""}

                                                            </Grid>
                                                        </Grid>
                                                    </div>
                                                    <div style={{ paddingTop: "3px", paddingBottom: "3px" }}>
                                                        <Divider sx={{ color: "#F0A318" }} />
                                                    </div>
                                                </div>
                                            ))}

                                            {listResult?.length == 0?
                                            <div style={{paddingBottom:"20px"}}>
                                                Chưa có bài nộp!
                                            </div>:""}
                                        </div>
                                    </div>
                                </div>

                            </Grid>

                            <Grid item xs={5} sx={{ paddingLeft: "10px", paddingBottom:"10px" }}>
                                <div style={{ fontWeight: 500, paddingBottom: "3px" }}>
                                    Xem chi tiết & Nhận xét
                                </div>
                                {indexChoice != null && idPicker != null &&
                                    <Content
                                        id_draft={idPicker}
                                        indexChoice={indexChoice}
                                        content={listResult}                                       
                                        type={(index, type, evaluate) => UpdateList(index, type, evaluate)} />
                                }
                            </Grid>



                        </Grid>
                    </div>


                </Dialog >
            </div >
        );
    }
};
