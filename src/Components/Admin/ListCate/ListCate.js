import { IconButton } from '@mui/material';
import * as React from 'react'

// lib
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';

import { useState, useEffect } from "react";
import { DOMAIN_API } from '../../../config/const';


// project imports

import { DataGrid } from '@mui/x-data-grid';
//component
import AddNewCate from './AddNewCate'
import EditCate from './EditCate'

export default function ListCate() {
    const [openAddNewCate, setOpenAddNewCate] = React.useState(false);

    const [isAdd, setIsAdd] = React.useState(false);
    const [dataCate, setDataCate] = React.useState(null);
    const [listCateInfo, setListCateInfo] = React.useState([]);
    let actoken = localStorage.getItem('access_token');

    const [isSuperAdmin, setIsSuperAdmin] = React.useState(null)
    const [openEditNameCate, setOpenEditNameCate] = React.useState(false);

    const ChangeDataCate = (value) => {
        //setDataCate(value);

        let tempCate = []
        for (let i = 0; i < value.length; i++) {
            tempCate.push({
                "stt": i + 1,
                "id": value[i].id,
                "name": value[i].name,
            })
        }
        setListCateInfo(tempCate);
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
            field: 'id',
            headerName: 'ID',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'name',
            headerName: 'Tên lĩnh vực',
            flex: 4,
        },
        {
            field: 'count_posts',
            headerName: 'Số bài tuyển dụng',
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },


        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,

            editable: false,
            sortable: false,
            renderCell: (params) =>
                <>
                    <Tooltip title="Chỉnh sửa tên">
                        <IconButton aria-label="edit">
                            <EditIcon
                                onClick={() => {
                                    setOpenEditNameCate(true)
                                    setDataCate(params.row)
                                }} />
                        </IconButton>
                    </Tooltip>


                </>
        },
    ];
    useEffect(() => {
        fetch(DOMAIN_API + `admins/get-list-cate`, {
            method: "GET",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        let tempCate = []
                        for (let i = 0; i < result2.length; i++) {
                            tempCate.push({
                                "stt": i + 1,
                                "id": result2[i].id,
                                "name": result2[i].name,
                                "count_posts":  result2[i].count_posts,
                            })
                        }
                        setListCateInfo(tempCate);
                    }

                    //setIsLoaded(true);
                },
                (error) => {
                    console.log("Error List Categories information");

                }
            )
    }, [isAdd]);

    return (
        <div style={{ paddingTop: "10px" }}>

            <div className='container' style={{ height:  "calc(100vh - 170px)", width: '100%' }}>

                <div style={{ paddingBottom: "10px" }}>
                    <Button variant="contained" startIcon={<AddIcon />}
                        onClick={() => {
                            setOpenAddNewCate(true)
                        }} >Tạo lĩnh vực mới</Button>
                </div>



                <DataGrid rows={listCateInfo} columns={columns} />


            </div>

            <AddNewCate
                dataCateNew={(value) => ChangeDataCate(value)}
                listCate={listCateInfo}
                isOpen={openAddNewCate}
                isClose={(value) => setOpenAddNewCate(value)}
            />

            <EditCate
                dataCateNew={(value) => ChangeDataCate(value)}
                listCate={listCateInfo}
                dataCate={dataCate}
                isOpen={openEditNameCate}
                isClose={(value) => setOpenEditNameCate(false)}
            />


        </div>

    );
}
