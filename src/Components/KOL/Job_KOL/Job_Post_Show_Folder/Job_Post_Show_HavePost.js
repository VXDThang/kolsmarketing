
import { IconButton } from '@mui/material';
import * as React from 'react'
import './Style.css'
// lib

import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from "react";
import { DOMAIN_API } from '../../../../config/const';
import moment from "moment"
import Box from '@mui/material/Box';
//file
import DetailPost_HavePost from '../../../Modals/DetailPost_HavePost'

// project imports
import { DataGrid } from '@mui/x-data-grid';

//icon
import CachedIcon from '@mui/icons-material/Cached';

export default function Job_Post_Show_HavePost(props) {

    const [openDetail, setOpenDetail] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [dataDetail, setDataDetail] = React.useState([]);
    const [listDonePost, setListDonePost] = React.useState([]);
    const [contentButton, setContentButton] = React.useState('Cập nhật');
    let actoken = localStorage.getItem('access_token');

    const columns = [

        {
            field: 'page_name',
            headerName: 'Trang đăng bài',
            minWidth: 150,
            flex: 1,
        },

        {
            field: 'content',
            headerName: 'Nội dung',
            minWidth: 300,
            flex: 1,
        },
        {
            field: 'url_image',
            headerName: 'Phương tiện',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                if (params.row.url_video)
                    return (
                        <>
                            <img src={params.row.url_video}
                                style={{ borderRadius: "5px" }}
                                width="60%" height="40px" controls="controls" autoPlay={false} />

                        </>
                    )
                if (params.row.url_image)
                    return (
                        <>
                            <img src={params.row.url_image}
                                style={{ borderRadius: "5px" }}
                                width="60%" height="40px" />

                        </>
                    );
            }
        },
        {
            field: 'post_info',
            headerName: 'Công việc',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'brand_name',
            headerName: 'Nhãn hàng',
            minWidth: 150,
            flex: 1,
        },
        {
            field: 'schedule_time',
            headerName: 'Thời gian đăng',
            minWidth: 150,
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'count_like',
            headerName: 'Like',
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'count_comment',
            headerName: 'Comment',
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'count_share',
            headerName: 'Share',

            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'actions',
            headerName: 'Tùy chọn',
            minWidth: 100,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            editable: false,
            sortable: false,
            renderCell: (params) =>
                <>
                    <Tooltip title="Xem chi tiết">
                        <IconButton
                            onClick={() => {
                                setOpenDetail(true)
                                setDataDetail(params.row)
                            }}
                            aria-label="view">
                            <VisibilityIcon />
                        </IconButton>

                    </Tooltip>
                </>
        },

    ];

    async function getData() {
        await fetch(DOMAIN_API + `social/get-list-publish-post-done-of-kol`, {
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
                        setListDonePost(result2);
                        if (result2.length > 0) {
                            let timeformat = 'Cập nhật '
                            if (result2[0].update_time != null) {
                                timeformat = timeformat + `lúc ${moment(result2[0].update_time).format("HH:mm DD/MM/YYYY")}`
                            }
                            setContentButton(timeformat)
                        }
                    }
                },
                (error) => {
                    console.log("Error List draft post information");

                }
            )

    }

    async function updateCountLikeShare() {
        setIsLoading(true);
        await fetch(DOMAIN_API + `social/update-count-like-share-comment`, {
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
                        setListDonePost(result2);
                        setContentButton('Đã cập nhật')
                        setIsLoading(false);
                    }

                },
                (error) => {
                    console.log("Error List done post information");

                }
            )

    }

    useEffect(() => {
        getData();
        // setListClassInfo(rows);
    }, []);
    return (
        <div style={{}}>
            {listDonePost?.length > 0 ?
                <div style={{ textAlign: "right", paddingBottom: "10px", marginTop: "-10px", marginLeft: "-10px" }}>
                    <Button
                        variant="contained" style={{
                            marginLeft: "10px", textTransform: 'none',
                            backgroundColor: "#00B14F", textTransform: 'none'
                        }}
                        onClick={() => { updateCountLikeShare() }}
                        startIcon={<CachedIcon />}>
                        {isLoading ? "Đang cập nhật" : contentButton}

                    </Button>
                </div>
                : ""}

            {/* <div style={{ height: 500, width: '100%', overflowX: "auto" }}>

                <DataGrid autoWidth
                    // sx={{ minWidth: '100%', overflowX:"auto"}}
                    rows={listDonePost} columns={columns} />

            </div> */}

            <Box sx={{ height: 500, width: '100%' }}>
                <DataGrid 
                    rows={listDonePost} columns={columns} />
            </Box>

            <DetailPost_HavePost
                data={dataDetail}
                isOpen={openDetail}
                isClose={(value) => setOpenDetail(value)}
            />

        </div>

    );
}

