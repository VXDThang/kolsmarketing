import { Alert, IconButton } from '@mui/material';
import * as React from 'react'

// lib
import Snackbar from '@mui/material/Snackbar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import BlockIcon from '@mui/icons-material/Block';
import { red } from '@mui/material/colors';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useState, useEffect } from "react";
import { DOMAIN_API } from '../../../config/const';

// project imports
import { DataGrid } from '@mui/x-data-grid';
import DetailBrand from './DetailBrand';

export default function ListBrand() {

    const [openDetailUser, setOpenDetailUser] = React.useState(false);
    const [dataDetail, setDataDetail] = React.useState([]);
    const [listUserInfo, setListUserInfo] = React.useState([]);
    let actoken = localStorage.getItem('access_token');
    const [state, setState] = React.useState({
        openState: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, openState } = state;
    //Lock
    const [openLockUser, setOpenLockUser] = React.useState({
        id: '',
        open: false,
        dataLock: []
    });
    //UnLock
    const [openUnlockUser, setOpenUnlockUser] = React.useState({
        id: '',
        open: false,
        dataUnlock: []
    });
    const handleLockUser = async () => {
        fetch(DOMAIN_API + `admins/updateotp`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                otp: -2,
                role: 2,
                id: openLockUser.id
            })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if(result2){
                        openLockUser.dataLock.otp = -2;
                    }
                },
                (error) => {
                    console.log("Error lock user");
    
                }
            )
        setOpenLockUser({ id: '', open: false, dataLock: []});
        setState({ ...state, openState: true });
    }
    const handleUnLockUser = async () => {
        
        fetch(DOMAIN_API + `admins/updateotp`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                otp: -1,
                role: 2,
                id: openUnlockUser.id
            })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if(result2){
                        openUnlockUser.dataUnlock.otp = -1;
                    }
                },
                (error) => {
                    console.log("Error lock user");
    
                }
            )
        setOpenUnlockUser({ id: '', open: false, dataUnlock: [] });
        setState({ ...state, openState: true });
    }
    const actionLock = (
        <React.Fragment>
            <Button color="primary" fontWeight="bold" size="small" onClick={() => handleLockUser()}>
                Khóa
            </Button>
            <Button color="secondary" size="small" onClick={() => setOpenLockUser({ ...openLockUser, open: false, dataLock: []})}>
                Thoát
            </Button>

        </React.Fragment>
    );
    const actionUnLock = (
        <React.Fragment>
            <Button color="primary" fontWeight="bold" size="small" onClick={() => handleUnLockUser()}>
                Mở khóa
            </Button>
            <Button color="secondary" size="small" onClick={() => setOpenUnlockUser({ ...openLockUser, open: false, dataUnlock:[] })}>
                Thoát
            </Button>

        </React.Fragment>
    );
    const handleClose = () => {
        setState({ ...state, openState: false });
    };

    const columns = [
        {
            field: 'full_name',
            headerName: 'Họ và tên',
            flex: 2,
        },

        {
            field: 'brand_name',
            headerName: 'Tên nhãn hàng',
            flex: 1,
            minWidth: 180,
            renderCell: (params) =>
            <>
                <Tooltip title={params.row.brand_name}>
                    <div>
                        {
                            params.row.brand_name
                        }
                    </div>
                </Tooltip>
            </>
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
            field: 'address',
            headerName: 'Địa chỉ',
            flex: 2,
        },
        {
            field: 'phone',
            headerName: 'Điện thoại',
            flex: 1,
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
                                    setOpenDetailUser(true)
                                    setDataDetail(params.row)
                                }} />
                        </IconButton>
                    </Tooltip>
                    {params.row.otp == -2 ?
                        <Tooltip title="Mở tài khoản">
                            <IconButton aria-label="edit">
                                <BlockIcon
                                    sx={{ color: red[500] }}
                                    onClick={() => {
                                        setOpenUnlockUser({ id: params.id, open: true, dataUnlock: params.row });
                                        setDataDetail(params.row)
                                    }} />
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Khóa tài khoản">
                            <IconButton aria-label="edit">
                                <LockOpenIcon
                                    color="success"
                                    onClick={() => setOpenLockUser({ id: params.id, open: true, dataLock: params.row})} />
                            </IconButton>
                        </Tooltip>
                    }
                </>
        },
    ];
    useEffect(() => {
        fetch(DOMAIN_API + `admins/get-list-brands`, {
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
                        setListUserInfo(result2);
                    }
                    
                    //setIsLoaded(true);
                },
                (error) => {
                    console.log("Error list brand information");
    
                }
            )
    }, []);
    return (
        <div style={{ paddingTop: "20px" }}>

            <div className='container' style={{ height:  "calc(100vh - 135px)", width: '100%' }}>
                <DataGrid rows={listUserInfo} columns={columns} />
            </div>
            <DetailBrand
                data={dataDetail}
                isOpen={openDetailUser}
                isClose={(value) => setOpenDetailUser(value)}
            />
            {/* Lock User */}

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openLockUser.open}
                onClose={() => setOpenLockUser(false)}
                message="Bạn muốn khóa tài khoản này"
                action={actionLock}
            />

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={state.openState}
                autoHideDuration={1000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" variant='filled' sx={{ width: '100%' }}>
                    Success!
                </Alert>
            </Snackbar>
            {/* Unlock User */}

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openUnlockUser.open}
                onClose={() => setOpenUnlockUser(false)}
                message="Bạn muốn mở khóa tài khoản này"
                action={actionUnLock}
            />

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={state.openState}
                autoHideDuration={1000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" variant='filled' sx={{ width: '100%' }}>
                    Success!
                </Alert>
            </Snackbar>
        </div>

    );
}
