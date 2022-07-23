
import { IconButton } from '@mui/material';
import * as React from 'react'
import './Style.css'
// lib
import Tooltip from '@mui/material/Tooltip';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { useState, useEffect } from "react";
import { DOMAIN_API } from '../../../../config/const';

//file
import DetailPost_Appointment from '../../../Modals/DetailPost_Appointment'

// project imports
import { DataGrid } from '@mui/x-data-grid';

export default function Job_Post_Show_Timer(props) {

    const [openDetail, setOpenDetail] = React.useState(false);
    const [dataDetail, setDataDetail] = React.useState([]);
    const [listSchedulePost, setListSchedulePost] = React.useState([]);
    let actoken = localStorage.getItem('access_token');

    const columns = [

        {
            field: 'page_name',
            headerName: 'Trang đăng bài',
            flex: 5,
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
            field: 'post_info',
            headerName: 'Công việc',
        },
        {
            field: 'brand_name',
            headerName: 'Nhãn hàng',
            flex: 5,
        },
        {
            field: 'schedule_time',
            headerName: 'Thời gian đăng',
            width: 130,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'actions',
            headerName: 'Tùy chọn',
            width: 90,
            align: 'center',
            headerAlign: 'center',
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
        await fetch(DOMAIN_API + `social/get-list-publish-post-wait-of-kol`, {
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
                        setListSchedulePost(result2);
                    }

                },
                (error) => {
                    console.log("Error List draft post information");

                }
            )
    }

    useEffect(() => {
        getData();
        // setListClassInfo(rows);
    }, []);
    return (
        <div style={{}}>

            <div  style={{ height: 500, width: '100%' }}>

                <DataGrid rows={listSchedulePost} columns={columns} />
                <DetailPost_Appointment
                    data={dataDetail}
                    isOpen={openDetail}
                    isClose={(value) => setOpenDetail(value)}
                />

            </div>

        </div>

    );
}

