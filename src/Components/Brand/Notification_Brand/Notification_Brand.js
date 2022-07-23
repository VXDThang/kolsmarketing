import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

//file
import Content_Type1 from './Content_Noti_Type1/Content_Noti_Type1'
import Content_Type2 from './Content_Noti_Type2/Read_Notification'
import List_Noti from './List_Noti'



const SidebarStyled = styled.div`
  background: #f0f2f5;
  color: black;
  min-height: 100vh;
  font-size: 14px;
`;

export default function Notification_Brand({ listNotification }) {
    const [type, setType] = React.useState(0);
    //type=0: Chưa chọn thông báo
    //type=1: Thông báo ứng tuyển
    //type=2: Thông báo bình luận
    const [idJobDescribe, setIdJobDescribe] = React.useState(null);
    const [idPost, setIdPost] = React.useState(null);
    const [idUser, setIdUser] = React.useState(null);
    const [load, setLoad] = React.useState(false);



    let actoken = localStorage.access_token;

    const setLoadToContent_Type1 = () => {
        setLoad(!load)
    }

    React.useEffect(() => {

    }, [])

    return (
        <SidebarStyled>
            <div>
                <Grid container >

                    <Grid item xs={4.5} >
                        <List_Noti
                            listNotification={listNotification}
                            typeChoiceShow={(value) => { setType(value) }}
                            idJobDescribe={(value) => { setIdJobDescribe(value) }}
                            idPost={(value) => { setIdPost(value) }}
                            idUser={(value) => { setIdUser(value) }}
                            load={(value) => { setLoadToContent_Type1() }}
                        />
                    </Grid>

                    <Grid item xs={7.5} sx={{ paddingLeft: "30px", paddingRight: "20px"}}>
                        {type == 0 ?
                            <div style={{ padding: "10px", textAlign: "center", paddingTop: "100px" }}>
                                <div>
                                    <img src="gif_kol.gif" alt="this slowpoke moves" width="250" />
                                </div>
                                <div style={{ paddingTop: "15px", fontSize: "18px", fontWeight: 500 }}>
                                    Xem nội dung thông báo
                                </div>
                            </div>
                            : ""}

                        {type == 1 ?
                            <Content_Type1
                                idJobDescribe={idJobDescribe}
                                idPost={idPost}
                                load={load}
                            />
                            : ""}

                        {type == 2 ?
                            <Content_Type2
                                idJobDescribe={idJobDescribe}
                                idPost={idPost}
                                idUser={idUser}
                            />
                            : ""}

                    </Grid>



                </Grid>
            </div>
        </SidebarStyled>
    );
}