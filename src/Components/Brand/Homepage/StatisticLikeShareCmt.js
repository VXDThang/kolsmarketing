import * as React from 'react'
import './Style.css'
// lib

import Tooltip from '@mui/material/Tooltip';
import { useState, useEffect } from "react";
import { DOMAIN_API } from '../../../config/const';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';

export default function StatisticLikeShareCmt(props) {

    const [isLoading, setIsLoading] = React.useState(false);
    const [data, setData] = React.useState([]);

    let actoken = localStorage.getItem('access_token');


    const columns = [
        {
            field: 'post_title',
            headerName: 'Công việc/ Chiến dịch',
            flex: 5,
            maxWidth: 200,
            renderCell: (params) =>
            <>
                    <Tooltip title={params.row.post_title}>
                        <div>
                        {params.row.post_title}
                        </div>
                    </Tooltip>
                </>
        },

        {
            field: 'count_like',
            headerName: 'Like',
            align: 'center',
            flex: 1,
            headerAlign: 'center',
        },
        {
            field: 'count_comment',
            headerName: 'Comment',
            align: 'center',
            flex: 1,
            headerAlign: 'center',
        },
        {
            field: 'count_share',
            headerName: 'Share',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },


    ];

    async function getData() {
        await fetch(DOMAIN_API + `statistic/count-like-share-cmt-per-post`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {

                        let temp = [];
                        for (let i = 0; i < result2.length; i++) {
                            temp.push(
                                {
                                    id_riq: i,
                                    post_title: result2[i].post_title,
                                    count_like: result2[i].count_like,
                                    count_comment: result2[i].count_comment,
                                    count_share: result2[i].count_share,

                                }
                            )
                        }
                        setData(temp);
                    }
                },
                (error) => {
                    console.log("Error List draft post information");

                }
            )

    }


    useEffect(() => {
        getData();
    }, []);
    return (
        <div style={{}}>
            {data?.length > 0 ?
                <div style={{
                    backgroundColor: "white",
                    borderRadius: "10px", padding: "20px",
                }}>
                    <Box sx={{ height: 500, width: '100%' }}>
                        <DataGrid
                            columns={columns}
                            rows={data}

                            getRowId={(row) => row.id_riq} />
                    </Box>
                </div>
                :
                ""}

        </div>

    );
}

