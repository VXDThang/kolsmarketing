import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { DOMAIN_API } from '../../../config/const';
//icon
import SearchIcon from '@mui/icons-material/Search';
import DoNotDisturbOnIcon from '@mui/icons-material/DoNotDisturbOn';

import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  height: calc(100vh - 65px);
  border-right: 1px solid rgb(230, 230, 230);
  width:400px;
  margin-bottom: -40px;
  margin-top: -20px;
  margin-left: -20px;
  position: fixed;
 
`;

export default function List_LikeKOL(props) {

    const { idKolSelect } = props
    const [idPicker, setIdPicker] = React.useState(0);
    const [values, setValues] = React.useState("");
    const [listKol, setListKol] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    //search
    const [searchKey, setSearchKey] = React.useState("");
    const [listAllKol, setListAllKol] = React.useState([]);

    let actoken = localStorage.access_token;
    async function getListKolLike() {
        
        try {
            let url1 = "";
            url1 = DOMAIN_API + `brands/get-kol-user-like`;
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
                        setListKol(result);
                        setListAllKol(result);
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
        getListKolLike();
    }, [props])

    const handleShowProfileKol = (event, index, id) => {
        idKolSelect(id);
        setIdPicker(id);
    }


    async function handleUnLikeKOL(event, index, id) {
        let url1 = "";
        url1 = DOMAIN_API + `brands/unlike-kol`;
        await fetch(url1, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ id_kol: id })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const list1 = listKol.slice(0, index);
                    const list2 = listKol.slice(index + 1, listKol.length);
                    const new_arr = list1.concat(list2);
                    setListKol(new_arr);
                    setListAllKol(new_arr);
                    idKolSelect(null);
                }
            )
    }

    const handleSearch = () => {
        setLoading(true);
        if (searchKey != "") {
            let listKolSearch = [];
            for (let i = 0; i < listAllKol.length; i++) {
                if (listAllKol[i].full_name.match(new RegExp(searchKey, "gi")) != null) {
                    listKolSearch.push(listAllKol[i])
                }
            }

            setListKol(listKolSearch)
            setLoading(false);
        }
        else {
            setLoading(false);
            setListKol(listAllKol)
        }
    }

    const handleSetSearchKey = (event) => {
        if (event.target.value != "") {
            setSearchKey(event.target.value)
        }

        else {
            setSearchKey(event.target.value)
            setListKol(listAllKol)
        }
    }

    return (
        <SidebarStyled>
            <div style={{ padding: "10px", height: "100vh", overflowY: "auto" }}>
                <div style={{ fontSize: "16px", fontWeight: "600", paddingBottom: "10px" }}>
                    Danh sách Kol đang quan tâm
                </div>

                <div className='d-flex justify-content-center' style={{ paddingTop: "5px" }}>
                    <FormControl sx={{ width: '100%', backgroundColor: "white", borderRadius: "5px" }} variant="outlined">
                        <InputLabel
                            htmlFor="outlined-search">Tìm kiếm</InputLabel>
                        <OutlinedInput
                            height="50px"
                            // onChange={(event) => setSearchKey(event.target.value)}
                            onChange={(event) => handleSetSearchKey(event)}
                            endAdornment={
                                <InputAdornment position="end" >

                                    <Button sx={{
                                        backgroundColor: "#00B14F", textTransform: "none",
                                        "&:hover": { bgcolor: "#A927B0" }, borderRadius: 20
                                    }}
                                        variant="contained"
                                        onClick={handleSearch}>
                                        <SearchIcon />
                                    </Button>

                                </InputAdornment>
                            }
                            label="Tìm kiếm"
                        />

                    </FormControl>

                </div>

                <div style={{ paddingTop: "10px" }}>
                    <Divider sx={{ color: "#00B14F" }} />
                </div>
                {loading ?
                    <div style={{ paddingTop: "5px" }}>
                        Đang tải dữ liệu
                    </div>
                    :
                    <div>
                        <div style={{ paddingTop: "10px", fontWeight: 500, }}>
                            {listKol?.length} Kol
                        </div>
                        {listKol?.length > 0 && listKol.map((list, index) => (
                            <div key={list.id} style={{}}>
                                <Card
                                    className="card-job" sx={{
                                        border: "none", boxShadow: "none",
                                        display: 'flex', height: 100,
                                        "&:hover": { bgcolor: "#edf4fb", cursor: "pointer" },
                                        ...((idPicker == list.id) && { bgcolor: '#edf4fb' })
                                    }}
                                    onClick={(event) => handleShowProfileKol(event, index, list.id)} >

                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{
                                                bgcolor: "red",
                                                width: "70px", height: "70px"
                                            }} aria-label="recipe"
                                                src={list?.avatar ? list.avatar : "kol.jpg"}>
                                            </Avatar>
                                        }
                                        title={<span style={{ fontWeight: 500, fontSize: "16px" }}>
                                            {list.full_name}
                                        </span>}
                                        subheader="16 lượt quan tâm"
                                    />
                                </Card>
                                <CardContent sx={{}}>
                                    <div className="d-flex justify-content-between">
                                        {/* <div style={{ cursor: "pointer", textAlign: "center" }}>
                                            <Button

                                                variant="text"
                                                style={{ width: "100%", backgroundColor: "white", textTransform: 'none' }}
                                                startIcon={<RemoveRedEyeIcon sx={{ color: "black" }} />}>
                                                <span style={{ fontSize: "14px", color: "black", fontWeight: 400 }}>
                                                    Xem trang cá nhân</span>
                                            </Button>
                                        </div>

                                        <div style={{ cursor: "pointer", textAlign: "center", paddingLeft: "15px" }}>
                                            <Button


                                                variant="text"
                                                style={{ width: "100%", backgroundColor: "white", textTransform: 'none' }}
                                                startIcon={<DoNotDisturbOnIcon sx={{ color: "black" }} />}>
                                                <span style={{ fontSize: "14px", color: "black", fontWeight: 400 }}>
                                                    Bỏ quan tâm</span>
                                            </Button>
                                        </div> */}

                                        <div style={{
                                            cursor: "pointer",
                                            textAlign: "center",
                                            padding: "5px",
                                            fontWeight: "500", width: "auto",
                                            border: "1px solid gray", borderRadius: "25px"
                                        }}
                                            onClick={(event) => handleShowProfileKol(event, index, list.id)}
                                        >
                                            <RemoveRedEyeIcon sx={{ color: "#00b14f" }} />
                                            <span style={{ fontSize: "14px", color: "black", fontWeight: 500, paddingLeft: "2px" }}>
                                                Xem trang cá nhân</span>
                                        </div>

                                        <div style={{
                                            cursor: "pointer",
                                            textAlign: "center",
                                            padding: "5px",
                                            fontWeight: "500", width: "auto",
                                            border: "1px solid gray", borderRadius: "25px"
                                        }}
                                            onClick={(event) => handleUnLikeKOL(event, index, list.id)}
                                        >
                                            <DoNotDisturbOnIcon sx={{ color: "red" }} />
                                            <span style={{ fontSize: "14px", color: "black", fontWeight: 500, paddingLeft: "2px" }}>
                                                Bỏ quan tâm</span>
                                        </div>


                                    </div>
                                </CardContent>
                                <div style={{ paddingTop: "5px" }}>
                                    <Divider sx={{ color: "#00B14F" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                }

            </div>
        </SidebarStyled>
    );
}