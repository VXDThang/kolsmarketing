
import React from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import { createTheme } from '@material-ui/core/styles';
import { DOMAIN_API } from '../../../config/const';
//file
import Job_Card from './Job_Card'
import Content_Job from './Content_Job'



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

export default function List_Job_KOL(props) {
    let actoken = localStorage.access_token;

    const [menu, setMenu] = React.useState(0);
    const [haveReadJob, setHaveReadJob] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [listJob, setListJob] = React.useState([]);
    const [idJobClick, setIdJobClick] = React.useState(null);
    async function getListJob() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `jobs/get-all-job-of-kol`;
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
                        setListJob(result);
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
        getListJob();
    }, [props])


    const handleClickReadJob = (e, id) => {
        setHaveReadJob(true)
        setIdJobClick(id);
    }

    const handleGoBack = (value) => {
        setHaveReadJob(false)
        setIdJobClick(null);
    }

    return (
        <SidebarStyled>
            <div style={{  }} >
                {haveReadJob ?
                    <div>
                        <Content_Job
                            isGoBack={(value) => { handleGoBack(value) }}
                            listPageFB={props.listPageFB}
                            fbUserID={props.fbUserID}
                            idJobClick={idJobClick}
                        />
                    </div>
                    :
                    <div style={{ padding: "10px" }}>
                        <div>
                            <div style={{ fontSize: "18px", fontWeight: "600" }}>
                                Danh sách công việc
                            </div>
                        </div>
                        <div style={{ paddingTop: "10px" }}>
                            <Divider />
                        </div>

                        <div>
                            {loading ?
                                <div>
                                    Đang tải dữ liệu ...
                                </div>
                                :
                                <div>
                                    {listJob.length > 0 && listJob.map((list, index) => (
                                        <div key={index} style={{ cursor: "pointer" }}
                                            onClick={(e) => handleClickReadJob(e, list.id)} >
                                            <Job_Card infor={list} />
                                        </div>
                                    ))}
                                    {listJob.length == 0 ?
                                        <div>
                                            Chưa có công việc nào
                                        </div> : ""}
                                </div>
                            }

                            {/* <div style={{ cursor: "pointer" }} onClick={() => setHaveReadJob(true)} >
                                <Job_Card />
                            </div>
                            <div style={{ cursor: "pointer" }} onClick={() => setHaveReadJob(true)} >
                                <Job_Card />
                            </div> */}
                        </div>
                    </div>
                }

            </div>
        </SidebarStyled>
    );
}