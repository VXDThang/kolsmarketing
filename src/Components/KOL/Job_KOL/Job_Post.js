
import React from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import { createTheme } from '@material-ui/core/styles';
import { useInitFbSDK } from './fb-hook';
//file
import Job_Post_Show from './Job_Post_Show';

const muiTheme = createTheme({
    overrides: {
        MuiListItem: {
            root: {
                "&$selected": {
                    backgroundColor: "#f44336",
                    "&:hover": {
                        backgroundColor: "orange",
                    },
                },
            },
            button: {
                "&:hover": {
                    backgroundColor: "yellow",
                },
            },
        },
    },
});

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  border-radius: 10px;
  margin-left: 20px;
  margin-right:20px

`;

export default function Job_Post(props) {
    let actoken = localStorage.access_token;
    const isFbSDKInitialized = useInitFbSDK();

    const [haveWrite, setHaveWrite] = React.useState(false);

    const { fbUserID, listPageFB } = props;

    React.useEffect(() => {

    }, [])


    return (
        <SidebarStyled>
            <div style={{ padding: "10px" }}>
                <div className="d-flex justify-content-between">
                    <div style={{
                        fontSize: "18px", fontWeight: "600", paddingBottom: "10px"
                    }}>
                        Danh sách bài viết
                    </div>
                    {/* {haveWrite ?
                        <div style={{
                            fontSize: "18px", fontWeight: "600", paddingBottom: "10px",
                            paddingTop: "5px"
                        }}>
                            Tạo bài viết
                        </div>
                        :
                        <div style={{
                            fontSize: "18px", fontWeight: "600", paddingBottom: "10px",
                            paddingTop: "5px"
                        }}>
                            Danh sách bài viết
                        </div>
                    } */}

                    {/* {haveWrite ?
                        <div style={{ cursor: "pointer" }}
                            onClick={(event) => { setHaveWrite(false) }}>
                            <Button
                                variant="outlined" style={{ marginLeft: "10px", textTransform: 'capitalize', color: "#00B14F", textTransform: 'none' }} startIcon={<ArrowBackIcon />}>
                                Quay lại
                            </Button>
                        </div>
                        :
                        <div className="d-flex justify-content-between">
                            <div style={{ cursor: "pointer" }}
                                onClick={(event) => { setHaveWrite(true) }}>
                                <Button
                                    variant="contained" style={{ marginLeft: "10px", textTransform: 'capitalize', backgroundColor: "#00B14F", textTransform: 'none' }} startIcon={<ArticleIcon />}>
                                    Tạo bài viết
                                </Button>
                            </div>
                        </div>
                    } */}

                </div>
                {/* <div style={{}}>
                    Cần phải liên kết với facebook mới có thể đăng bài hoặc lên lịch trong chức năng tạo bài viết
                </div> */}
                <div style={{}}>
                    <Divider />
                </div>
                <div style={{ }}>
                    {/* {haveWrite ?
                        <div>
                            <Job_Post_Write listPageFB={[]} fbUserID={''} />
                        </div>
                        :
                        <div>
                            <Job_Post_Show listPageFB={listPageFB} fbUserID={fbUserID} />
                        </div>
                    } */}
                    <div>
                        <Job_Post_Show listPageFB={listPageFB} fbUserID={fbUserID} />
                    </div>
                </div>

            </div>
        </SidebarStyled>
    );
}