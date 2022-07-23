import React from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { DOMAIN_API } from '../../../config/const';

//icon
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
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

export default function Content({ id_job }) {
    let actoken = localStorage.access_token;
    const [openListMember, setOpenListMember] = React.useState(false);
    const [detailJob, setDetailJob] = React.useState(null);
    const [loadingDetail, setLoadingDetail] = React.useState(true);
    const [listMember, setListMember] = React.useState([]);


    const handleClick = () => {
        setOpenListMember(!openListMember);
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




    React.useEffect(() => {
        if (id_job) {
            getDetailJob(id_job);
            getAllMember(id_job);
        }
    }, [id_job])

    return (
        <SidebarStyled>
            <div style={{ padding: "10px" }}>
                <div style={{paddingLeft:"10px",textAlign:"left", fontSize:"24px",fontWeight:500}}>
                    Công việc
                </div>
                <div>
                    {loadingDetail ?
                        <div style={{ }}>
                            Đang tải dữ liệu ...
                        </div>
                        :
                        <div style={{paddingLeft:"10px",paddingRight:"10px", paddingTop: "10px" }}>
                            <div>
                                <Divider sx={{ color: "#00B14F" }} />
                            </div>

                            <div >

                            <div style={{ paddingTop: "10px" }}>
                                    <div style={{ fontWeight: "600" }}>
                                       Tên công việc
                                    </div>
                                    <div>
                                        {detailJob?.title}
                                    </div>
                                </div>

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
                                                    src={detailJob?.brand?.avatar ? detailJob.brand.avatar : ""} />
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

                            </div>

                        </div>
                    }

                </div>

            </div>


        </SidebarStyled>
    );
}