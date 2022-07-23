
import { IconButton } from '@mui/material';
import * as React from 'react'
import './Style.css'
// lib
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from "react";
import { DOMAIN_API } from '../../../../config/const';
import DetailPost_Draft from '../../../Modals/DetailPost_Draft'

//Modal Edit
import EditPostDraft from '../../../Modals/EditPostDraft'
// project imports

import { DataGrid } from '@mui/x-data-grid';

export default function Job_Post_Show_Draft(props) {
    const { fbUserID, listPageFB } = props;
    const [openDetailDraft, setOpenDetailDraft] = React.useState(false);
    const [dataDetail, setDataDetail] = React.useState([]);
    const [listDraftPost, setListDraftPost] = React.useState([]);
    let actoken = localStorage.getItem('access_token');

    //Edit Draft Post
    const [openEditDraftPost, setOpenEditDraftPost] = React.useState(false);
    const [loadingAfterClose, setLoadingAfterClose] = React.useState(false);

    const handleUpdateAfterClose=()=>{
        setOpenEditDraftPost(false)
        setLoadingAfterClose(!loadingAfterClose);
    }


    const columns = [
        {
            field: 'stt',
            headerName: 'STT',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },

        {
            field: 'content',
            headerName: 'Nội dung',
            flex: 10,
        },
        {
            field: 'url_image',
            headerName: 'Phương tiện',
            width: 120,
            align: 'center',
            headerAlign: 'center',
            editable: true,
            renderCell: (params) => {
                if(params.row.url_video)
                return (
                    <>
                    <img src={params.row.url_video} 
                    style={{ borderRadius: "5px" }}
                    width="60%" height="40px" controls="controls" autoPlay={false}/>
                
                  </>
                )
                if(params.row.url_image)
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
            field: 'brand_name',
            headerName: 'Nhãn hàng',
            flex: 5,
        },
        {
            field: 'post_info',
            headerName: 'Công việc',
            flex: 5,
        },
        {
            field: 'create_time',
            headerName: 'Thời gian tạo',
            width: 150,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'actions',
            headerName: 'Tùy chọn',
            width: 120,
            align: 'center',
            headerAlign: 'center',
            editable: false,
            sortable: false,
            renderCell: (params) =>
                <>
                    <Tooltip title="Chỉnh sửa">
                        <IconButton
                            onClick={() => {
                                setDataDetail(params.row)
                                setOpenEditDraftPost(true)
                            }}
                            aria-label="edit">
                            <EditIcon />
                        </IconButton>

                    </Tooltip>
                    <Tooltip title="Xem chi tiết">
                        <IconButton
                            onClick={() => {
                                setDataDetail(params.row)
                                setOpenDetailDraft(true)
                            }}
                            aria-label="view">
                            <VisibilityIcon />
                        </IconButton>

                    </Tooltip>
                    <Tooltip title="Xóa">
                        <IconButton
                            onClick={() => {
                                setDataDetail(params.row)
                                setOpenDetailDraft(true)
                            }}
                            aria-label="delete">
                            <DeleteIcon />
                        </IconButton>

                    </Tooltip>

                </>
        },
    ];

    async function getData() {
        await fetch(DOMAIN_API + `social/get-list-draft-of-kol`, {
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
                        setListDraftPost(result2);
                    }

                },
                (error) => {
                    console.log("Error List draft post information");

                }
            )
    }

    useEffect(() => {
        getData()
        // setListClassInfo(rows);
    }, [loadingAfterClose]);
    return (
        <div style={{}}>

            <div  style={{ height: 500, width: '100%' }}>

                <DataGrid rows={listDraftPost} columns={columns} />
                <DetailPost_Draft
                    data={dataDetail}
                    isOpen={openDetailDraft}
                    isClose={(value) => setOpenDetailDraft(value)}
                />

                <EditPostDraft
                    dataDraftPost={dataDetail}
                    isOpen={openEditDraftPost}
                    isClose={(value) => handleUpdateAfterClose() }
                    fbUserIDProps={fbUserID}
                    listPageFBProps={listPageFB}
                />

            </div>

        </div>

    );
}

