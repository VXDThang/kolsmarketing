import { IconButton } from '@mui/material';
import * as React from 'react'

// lib
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from '@mui/icons-material/Add';

import { useState, useEffect } from "react";
import { DOMAIN_API } from '../../../config/const';
// project imports

import { DataGrid } from '@mui/x-data-grid';
//component
import AddNewAdmin from './AddNewAdmin'
import DetailAdmin from './DetailAdmin'

export default function ListAdmin() {
    const [openAddNewAdmin, setOpenAddNewAdmin] = React.useState(false);
    const [openDetailAdmin, setOpenDetailAdmin] = React.useState(false);
    const [isAdd, setIsAdd] = React.useState(false);
    const [dataDetail, setDataDetail] = React.useState([]);
    const [listAdminInfo, setListAdminInfo] = React.useState([]);
    let actoken = localStorage.getItem('access_token');
    
    const [isSuperAdmin, setIsSuperAdmin] = React.useState(null)
    const columns = [
        {
            field: 'full_name',
            headerName: 'Họ và tên',
            flex: 2,
        },
        {
            field: 'email',
            headerName: 'Email',
            flex: 2,
        },
        {
            field: 'create_time',
            headerName: 'Thời gian tạo',
            flex: 2,
        },

        {
            field: 'actions',
            headerName: 'Action',
            flex: 1,

            editable: false,
            sortable: false,
            renderCell: (params) =>
                <>
                    <Tooltip title="Xem chi tiết">
                        <IconButton aria-label="edit">
                            <InfoIcon
                                onClick={() => {
                                    setOpenDetailAdmin(true)
                                    setDataDetail(params.row)
                                }} />
                        </IconButton>
                    </Tooltip>


                </>
        },
    ];
    useEffect(() => {
        fetch(DOMAIN_API + `admins/get-list-admins`, {
            method: "GET",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if(result2){
                        setListAdminInfo(result2.list_admin);
                        setIsSuperAdmin(result2.is_super);
                    }
                },
                (error) => {
                    console.log("Error List admin information");
    
                }
            )
    }, [isAdd]);
    
    return (
        <div style={{ paddingTop: "10px" }}>

            <div className='container' style={{ height: "calc(100vh - 170px)", width: '100%' }}>
                {isSuperAdmin &&
                <div style={{ paddingBottom: "10px" }}>
                    <Button variant="contained" startIcon={<AddIcon />}
                        onClick={() => {
                            setOpenAddNewAdmin(true)
                        }} >Tạo tài khoản</Button>
                </div>}

                <DataGrid rows={listAdminInfo} columns={columns} />


            </div>

            <AddNewAdmin
                setIsAdd = {setIsAdd}
                isOpen={openAddNewAdmin}
                isClose={(value) => setOpenAddNewAdmin(value)}
            />

            <DetailAdmin
                data={dataDetail}
                isOpen={openDetailAdmin}
                isClose={(value) => setOpenDetailAdmin(value)}
            />
        </div>

    );
}
