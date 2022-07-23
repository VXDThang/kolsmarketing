import { Alert, IconButton } from '@mui/material';
import * as React from 'react'

// lib
import Snackbar from '@mui/material/Snackbar';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';

import { useState, useEffect } from "react";
import { DOMAIN_API } from '../../../config/const';

import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import BlockIcon from '@mui/icons-material/Block';
import LockOpenIcon from '@mui/icons-material/LockOpen';

// project imports
import moment from 'moment';
import { DataGrid } from '@mui/x-data-grid';
//API

//file
import DetailPost from './DetailPost'
import SetHot from './SetHot';
//icon
import { red } from '@mui/material/colors';
import DoneIcon from '@mui/icons-material/Done';
import CloseIcon from '@mui/icons-material/Close';

export default function ListPost() {
    let actoken = localStorage.getItem('access_token');
    const [listCateInfo, setListCateInfo] = React.useState([]);
    const [cateSelected, setCateSelected] = React.useState('0');

    const [listPostShow, setListPostShow] = React.useState([]);

    //detail
    const [openDetailPost, setOpenDetailPost] = React.useState(false);
    const [dataDetail, setDataDetail] = React.useState([]);

    //Set Hot
    const [openSetHot, setOpenSetHot] = React.useState(false);
    const [sttToUpdateAfter, setSttToUpdateAfter] = React.useState('');

    //Lock/UnLock
    const [state, setState] = React.useState({
        openState: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const { vertical, horizontal, openState } = state;
    //Lock
    const [openLockPost, setOpenLockPost] = React.useState({
        id: '',
        open: false,
        dataLock: []
    });
    //UnLock
    const [openUnlockPost, setOpenUnlockPost] = React.useState({
        id: '',
        open: false,
        dataUnlock: []
    });

    const handleLockPost = async () => {
        await fetch(DOMAIN_API + `admins/block-post`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id_post: openLockPost.id
            })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                         //Chỉnh ở danh sách show ra
                         let temp = listPostShow;
                         //Vì sttToUpdateAfter đang lưu stt, mà stt lớn hơn 1 đơn vị so với vị trí
                         //Chỉnh ở nội dung detail
                         temp[sttToUpdateAfter - 1].all_detail.status = '0';
 
                         setListPostShow(temp)
                    }
                },
                (error) => {
                    console.log("Error lock user");

                }
            )
        setOpenLockPost({ id: '', open: false, dataLock: [] });
        setState({ ...state, openState: true });
    }
    const handleUnLockPost = async () => {

        await fetch(DOMAIN_API + `admins/unblock-post`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({
                id_post: openUnlockPost.id
            })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if (result2) {
                        
                        //Chỉnh ở danh sách show ra
                        let temp = listPostShow;
                        //Vì sttToUpdateAfter đang lưu stt, mà stt lớn hơn 1 đơn vị so với vị trí
                        //Chỉnh ở nội dung detail
                        temp[sttToUpdateAfter - 1].all_detail.status = '1';

                        setListPostShow(temp)
                    }
                },
                (error) => {
                    console.log("Error lock user");

                }
            )
        setOpenUnlockPost({ id: '', open: false, dataUnlock: [] });
        setState({ ...state, openState: true });
    }
    const actionLock = (
        <React.Fragment>
            <Button color="primary" fontWeight="bold" size="small" onClick={() => handleLockPost()}>
                Khóa
            </Button>
            <Button color="secondary" size="small" onClick={() => setOpenLockPost({ ...openLockPost, open: false, dataLock: [] })}>
                Thoát
            </Button>

        </React.Fragment>
    );
    const actionUnLock = (
        <React.Fragment>
            <Button color="primary" fontWeight="bold" size="small" onClick={() => handleUnLockPost()}>
                Mở khóa
            </Button>
            <Button color="secondary" size="small" onClick={() => setOpenUnlockPost({ ...openLockPost, open: false, dataUnlock: [] })}>
                Thoát
            </Button>

        </React.Fragment>
    );

    const handleClose = () => {
        setState({ ...state, openState: false });
    };


    const columns = [

        {
            field: 'stt',
            headerName: 'STT',
            flex: 1,
            minWidth: 60,
            align: 'center',
            headerAlign: 'center',
        },

        {
            field: 'title',
            headerName: 'Tiêu đề',
            minWidth: 300,
            flex: 1,
            renderCell: (params) =>
                <>
                    <Tooltip title={params.row.title}>
                        <div>
                            {
                                params.row.title
                            }
                        </div>
                    </Tooltip>


                </>
        },
        {
            field: 'image',
            headerName: 'Phương tiện',
            minWidth: 120,
            align: 'center',
            headerAlign: 'center',
            renderCell: (params) => {
                return (
                    <>
                        {params.row.image ?
                            <img src={params.row.image}
                                style={{ borderRadius: "5px" }}
                                width="50%" height="40px" />
                            : ""}
                    </>
                );
            }
        },
        {
            field: 'content',
            headerName: 'Nội dung',
            minWidth: 300,
            flex: 1,
            renderCell: (params) =>
                <>
                    <Tooltip title={params.row.content}>
                        <div>
                            {
                                params.row.content
                            }
                        </div>
                    </Tooltip>


                </>
        },
        {
            field: 'brand_name',
            headerName: 'Nhãn hàng',
            minWidth: 150,
            flex: 1,
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
            field: 'address',
            headerName: 'Vị trí',
            minWidth: 120,
            flex: 1,
            renderCell: (params) =>
                <>
                    <Tooltip title={params.row.address}>
                        <div>
                            {
                                params.row.address
                            }
                        </div>
                    </Tooltip>


                </>
        },
        {
            field: 'hot',
            headerName: 'HOT',
            minWidth: 70,
            flex: 1,
            headerAlign: 'center',
            align: 'center',
            renderCell: (params) =>
                <>
                    {params.row.hot == '1' ?
                        <div>
                            <DoneIcon sx={{ color: "green" }} />
                        </div>
                        :
                        <div>
                            <CloseIcon sx={{ color: red[500] }} />
                        </div>}


                </>
        },
        {
            field: 'write_time',
            headerName: 'Thời gian đăng',
            minWidth: 150,
            flex: 1,
            align: 'center',
            headerAlign: 'center',
        },
        {
            field: 'actions',
            headerName: 'Action',
            minWidth: 150,
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
                                setDataDetail(params.row.all_detail)
                                setOpenDetailPost(true)
                            }}
                            aria-label="view">
                            <InfoIcon />
                        </IconButton>

                    </Tooltip>

                    <Tooltip title="Cài đặt HOT">
                        <IconButton aria-label="edit">
                            <EditIcon
                                onClick={() => {
                                    setDataDetail(params.row.all_detail)
                                    setSttToUpdateAfter(params.row.stt)
                                    setOpenSetHot(true)
                                }} />
                        </IconButton>
                    </Tooltip>

                    {params.row.all_detail.status == 0 ?
                        <Tooltip title="Mở khóa Bài tuyển dụng">
                            <IconButton aria-label="edit">
                                <BlockIcon
                                    sx={{ color: red[500] }}
                                    onClick={() => {
                                        setSttToUpdateAfter(params.row.stt)
                                        setOpenUnlockPost({ id: params.row.all_detail.id, open: true, dataUnlock: params.row.all_detail });
                                        //setDataDetail(params.row)
                                        
                                    }} />
                            </IconButton>
                        </Tooltip>
                        :
                        <Tooltip title="Khóa Bài Tuyển dụng">
                            <IconButton aria-label="edit">
                                <LockOpenIcon
                                    color="success"
                                    onClick={() => {
                                        setSttToUpdateAfter(params.row.stt)
                                        setOpenLockPost({ id: params.row.all_detail.id, open: true, dataLock: params.row.all_detail })
                                        
                                    }} />
                            </IconButton>
                        </Tooltip>
                    }
                </>
        },

    ];

    const setUpdateAfterSetHot = (value, id) => {
        //Chỉnh ở danh sách show ra
        let temp = listPostShow;
        //Vì sttToUpdateAfter đang lưu stt, mà stt lớn hơn 1 đơn vị so với vị trí
        temp[sttToUpdateAfter - 1].hot = value;

        //Chỉnh ở nội dung detail
        temp[sttToUpdateAfter - 1].all_detail.hot = value;

        setListPostShow(temp)
    }

    async function getDataListPost() {
        if (cateSelected == '0') {
            await fetch(DOMAIN_API + `admins/get-all-post`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
            })
                .then(res => res.json())
                .then(
                    (result2) => {
                        if (result2) {
                            let temp = [];
                            for (let i = 0; i < result2.length; i++) {
                                temp.push({
                                    "id": result2[i].id,
                                    "stt": i + 1,
                                    "title": result2[i].title,
                                    "image": result2[i].image_cover,
                                    "content": result2[i].content,
                                    "brand_name": result2[i].brand_info.name,
                                    "hot": result2[i].hot,
                                    "address": result2[i].address,
                                    "write_time": moment(result2[i].write_time).format("DD/MM/YYYY HH:mm"),
                                    "all_detail": result2[i],
                                })
                            }
                            setListPostShow(temp)
                        }
                    }
                ).catch(error => {
                    console.log("Error: ", error);
                })
        }
        else {
            await fetch(DOMAIN_API + `admins/get-list-post-of-1cate/${cateSelected}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
            })
                .then(res => res.json())
                .then(
                    (result2) => {
                        if (result2) {
                            let temp = [];
                            for (let i = 0; i < result2.length; i++) {
                                temp.push({
                                    "id": result2[i].id,
                                    "stt": i + 1,
                                    "title": result2[i].title,
                                    "image": result2[i].image_cover,
                                    "content": result2[i].content,
                                    "brand_name": result2[i].brand_info.name,
                                    "hot": result2[i].hot,
                                    "address": result2[i].address,
                                    "write_time": moment(result2[i].write_time).format("DD/MM/YYYY HH:mm"),
                                    "all_detail": result2[i],
                                })
                            }
                            setListPostShow(temp)
                        }
                    }
                ).catch(error => {
                    console.log("Error: ", error);
                })

        }
    }

    useEffect(() => {
        fetch(DOMAIN_API + `categories/all-cate`, {
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
                        let temp = [];
                        temp.push({
                            "id": 0,
                            "name": "Tất cả",
                        })
                        for (let i = 0; i < result2.length; i++) {
                            temp.push({
                                "id": result2[i].id,
                                "name": result2[i].name,
                            })
                        }
                        setListCateInfo(temp);
                    }

                    //setIsLoaded(true);
                },
                (error) => {
                    console.log("Error List Categories information");

                }
            )

        getDataListPost()
    }, [cateSelected]);

    return (
        <div>
            <div style={{ paddingTop: "10px" }}>

                <div className='container' style={{ width: '100%' }}>

                    <div className='d-flex justify-content-between'>
                        <div>
                            <FormControl sx={{ width: "200px" }}>
                                <InputLabel size="small" id="demo-simple-select-label"
                                    sx={{
                                        fontSize: "14px",
                                        color: cateSelected ? "green" : "#c0c0c0",
                                        fontWeight: cateSelected ? 600 : 400,
                                    }}>{cateSelected ? <span>Lĩnh vực </span> : <span>Chọn Lĩnh vực </span>}</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={cateSelected}
                                    label={cateSelected ? <span>Lĩnh vực </span> : <span>Chọn Lĩnh vực </span>}
                                    onChange={(event) => setCateSelected(event.target.value)}
                                    size="small"

                                >

                                    {listCateInfo.length > 0 && listCateInfo.map((cate) => (
                                        <MenuItem value={cate.id} key={cate.id} >{cate.name}</MenuItem>
                                    ))}

                                </Select>

                            </FormControl>
                        </div>

                    </div>

                    <div style={{ paddingTop: "10px",  height:  "calc(100vh - 165px)", width: '100%' }}>
                        <DataGrid rows={listPostShow} columns={columns} />
                    </div>



                </div>


            </div>

            <DetailPost
                data={dataDetail}
                isOpen={openDetailPost}
                isClose={(value) => setOpenDetailPost(false)}
            />

            <SetHot
                updateAfter={(value, id) => setUpdateAfterSetHot(value, id)}
                data={dataDetail}
                isOpen={openSetHot}
                isClose={(value) => setOpenSetHot(false)}
            />

            {/* Lock Post */}

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openLockPost.open}
                onClose={() => setOpenLockPost(false)}
                message="Bạn muốn khóa Bài tuyển dụng này"
                action={actionLock}
            />

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={state.openState}
                autoHideDuration={1000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" variant='filled' sx={{ width: '100%' }}>
                    Thành công!
                </Alert>
            </Snackbar>

            {/* Unlock Post */}

            <Snackbar
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
                open={openUnlockPost.open}
                onClose={() => setOpenUnlockPost(false)}
                message="Bạn muốn mở khóa Bài tuyển dụng này"
                action={actionUnLock}
            />

            <Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={state.openState}
                autoHideDuration={1000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="success" variant='filled' sx={{ width: '100%' }}>
                    Thành công!
                </Alert>
            </Snackbar>

        </div>
    )
}
