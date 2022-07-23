import React from 'react';
import { useState, useEffect } from "react";
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import { DOMAIN_API } from '../../../config/const'
//file
import Mission_KOL from './Mission'

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

export default function Content_Job({ id_job }) {
    let actoken = localStorage.access_token;
    //const divRef = useRef(null);

    const [listMission, setListMission] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    async function getAllMission(id_post) {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `jobs/find-job-of-post`;
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
                        setListMission(result);
                    }
                )
        }
        catch (error) {
            console.log("error: ", error)
        }
        finally {
            setLoading(false)
        }
    }



    React.useEffect(() => {
        if (id_job) {
            getAllMission(id_job)
        }

    }, [id_job, loading])

    return (
        <SidebarStyled>
            <div style={{ padding: "10px" }}>
                <div style={{ paddingLeft: "10px", textAlign: "left", fontSize: "24px", fontWeight: 500 }}>
                    Thảo luận
                </div>

                <div style={{ paddingTop: "10px", paddingLeft: "10px", paddingRight: "10px" }}>
                    <Divider sx={{ color: "#00B14F" }} />
                </div>

                <div style={{ paddingLeft: "10px", paddingRight: "10px", }}>
                    {loading ?
                        <div>
                            Đang tải dữ liệu ...
                        </div>
                        :
                        <div>
                            {listMission?.length > 0 && listMission.map((miss, index) => {
                                return (
                                    <div key={index}>
                                        <Mission_KOL key={index} detail_mision={miss} type="2" />
                                    </div>
                                )
                            })}
                        </div>
                    }

                </div>

            </div>
        </SidebarStyled >
    );
}