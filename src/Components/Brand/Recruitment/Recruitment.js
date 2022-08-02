import * as React from 'react';
import styled from 'styled-components';
import Box from '@mui/material/Box';

import { DOMAIN_API } from '../../../config/const'
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';

import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';


//file
import "./Write.css";
import Show_post from './Show_post'
import Write_post from './Write'


//icon
import CreateIcon from '@mui/icons-material/Create';
import SearchIcon from '@mui/icons-material/Search';

const commonStyles = {
    border: 1,
    width: 'full',
    height: '160px',
};

function formatDateTime(create_time) {
    const time = new Date(create_time)
    const result = time.getDate() + "/" + (time.getMonth()+1) + "/" + time.getFullYear() + " " + time.getHours() + ":" + time.getMinutes();
    return result
};

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


export default function Recruitment(props) {

    let actoken = localStorage.access_token;
    const [whatshow, setWhatshow] = React.useState(0);
    //0: Viết bài
    //1: Đọc các bài post


    const [id_post_picker, setId_post_picker] = React.useState(null);
    const [listActivePost, setListActivePost] = React.useState([]);
    const [listUnActivePost, setListUnActivePost] = React.useState([]);
    //const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    //id của bài post được chọn

    const [field, setField] = React.useState('');

    //loading Detail Post
    const [loadingDetail, setLoadingDetail] = React.useState(true);
    const [detailPost, setDetailPost] = React.useState(null);

    //search
    const [searchKey, setSearchKey] = React.useState("");
    const [listAllActivePost, setListAllActivePost] = React.useState([]);
    const [listAllUnActivePost, setListAllUnActivePost] = React.useState([]);

    //loading
    const [loadingAfterUn_Active, setLoadingAfterUn_Active] = React.useState(true);

    const handleChange = (event) => {
        setField(event.target.value);
    };
    const handleShowDetailPost = (even, index, id) => {
        setId_post_picker(id);
        getDetailPost(id);

    }

    const handleChoiceWrite = () => {
        setWhatshow(0);
        setId_post_picker(null);
    }

    async function getListActivePost() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `posts/get-active-post-of-brand`;
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
                        setListActivePost(result)
                        setListAllActivePost(result)
                    }
                )

            let url2 = "";
            url2 = DOMAIN_API + `posts/get-unactive-post-of-brand`;
            await fetch(url2, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setListUnActivePost(result)
                        setListAllUnActivePost(result)
                        setLoading(true);
                    }
                )
        }
        catch (error) {
            console.log("error in get list active post of brand: ", error);
        }
        finally {
            setLoading(false);
            //Lấy được dữ liệu rồi mới show detail
        }
    }

    //Lấy thông tin bài post
    async function getDetailPost(id_post) {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `posts/get-detail-post/${id_post}`;
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
                        setDetailPost(result);
                    }
                )
        }
        catch (error) {
            console.log("error: ", error)
        }
        finally {
            setLoadingDetail(false)
            setWhatshow(1);
        }
    }

    React.useEffect(() => {
        getListActivePost();
    }, [loadingAfterUn_Active])

    const handleSearch = () => {
        setLoading(true);
        if (searchKey != "") {
            let listAllActivePostSearch = [];
            for (let i = 0; i < listAllActivePost.length; i++) {
                if (listAllActivePost[i].title.match(new RegExp(searchKey, "gi")) != null) {
                    listAllActivePostSearch.push(listAllActivePost[i])
                }
            }
            let listAllUnActivePostSearch = [];
            for (let i = 0; i < listAllUnActivePost.length; i++) {
                if (listAllUnActivePost[i].title.match(new RegExp(searchKey, "gi")) != null) {
                    listAllUnActivePostSearch.push(listAllUnActivePost[i])
                }
            }

            setLoading(false);
            setListActivePost(listAllActivePostSearch)
            setListUnActivePost(listAllUnActivePostSearch)
        }
        else {
            setLoading(false);
            setListActivePost(listAllActivePost)
            setListUnActivePost(listAllUnActivePost)
        }
    }

    const handleSetSearchKey = (event) => {
        if (event.target.value != "") {
            setSearchKey(event.target.value)
        }

        else {
            setSearchKey(event.target.value)
            setListActivePost(listAllActivePost)
            setListUnActivePost(listAllUnActivePost)
        }
    }



    return (
        <div className="flex-container">
            <div style={{ flex: 2 }}>
                <SidebarStyled>
                    <div style={{ overflowY: "auto" }}>
                        <div style={{ padding: "10px" }}>
                            <div style={{ paddingTop: "10px", paddingBottom: "10px" }}>
                                <Button fullWidth style={{ fontSize: "15px", textTransform: 'capitalize', backgroundColor: "#00B14F" }} variant="contained"
                                    startIcon={<CreateIcon />} onClick={handleChoiceWrite}> Viết bài tuyển dụng </Button>
                            </div>

                            <div style={{ fontWeight: 700, color: "#666666", fontSize: "16px" }}>
                                Danh sách các bài viết
                            </div>

                            <div className='d-flex justify-content-center' style={{ paddingTop: "10px", paddingBottom: "10px" }}>
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
                            <div className="list_post" style={{ overflowY: "auto" }}>
                                {loading ?
                                    <div>
                                        Đang tải dữ liệu ...
                                    </div>
                                    :
                                    listActivePost.length > 0 && listActivePost.map((list) => (
                                        <div key={list.id} style={{ paddingTop: "10px", cursor: "pointer" }}>
                                            <Card className="card-job"
                                                sx={{
                                                    boxShadow: "none", bgcolor: "#EEEEEE",
                                                    display: 'flex', height: 100, "&:hover": { bgcolor: "#99FF99" },
                                                    ...((id_post_picker == list.id) && { bgcolor: '#99FF99' }),
                                                }} onClick={(event) => handleShowDetailPost(event, 1, list.id)} >
                                                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                    <CardMedia
                                                        component="img"
                                                        sx={{ minWidth: 100, maxWidth: 100, height: 100 }}
                                                        image={list.image_cover ? list.image_cover : "cover_image_post.jpg"}
                                                        alt="img"
                                                    />
                                                    <div style={{ fontSize: "16px", paddingLeft: "10px", paddingTop: "10px" }}>
                                                        <div >
                                                            <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                                                {list.title}
                                                            </div>
                                                        </div>

                                                        <div style={{ fontSize: "14px", color: "#666666" }} >
                                                            {formatDateTime(list.write_time)}
                                                        </div>
                                                        <div style={{ fontWeight: 500, color: "#00B14F", fontSize: "14px" }}>
                                                            {list.count_recruitment > 0 ?
                                                                <span> {list.count_recruitment} đơn ứng tuyển </span>
                                                                : "Chưa có đơn ứng tuyển"}
                                                        </div>
                                                    </div>
                                                </Box>
                                            </Card>
                                        </div>

                                    ))
                                }

                                {listUnActivePost.length > 0 && listUnActivePost.map((list) => (
                                    <div key={list.id} style={{ paddingTop: "10px", cursor: "pointer" }}>
                                        <Card className="card-job"
                                            sx={{
                                                display: 'flex', height: 100, bgcolor: "#EEEEEE",
                                                "&:hover": { bgcolor: "#99FF99" },
                                                ...((id_post_picker == "1") && { bgcolor: '#99FF99' }),
                                            }} onClick={(event) => handleShowDetailPost(event, 1, list.id)} >
                                            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                                                <CardMedia
                                                    component="img"
                                                    sx={{ minWidth: 100, maxWidth: 100, height: 100 }}
                                                    image={list.image_cover ? list.image_cover : "cover_image_post.jpg"}
                                                    alt="img"
                                                />
                                                <div style={{ fontSize: "16px", paddingLeft: "10px", paddingTop: "10px" }}>
                                                    <div >
                                                        <div style={{ fontWeight: "700", fontSize: "15px" }}>
                                                            {list.title}
                                                        </div>
                                                    </div>

                                                    <div style={{ fontSize: "14px", color: "#666666" }} >
                                                        {formatDateTime(list.write_time)}
                                                    </div>
                                                    <div style={{ fontWeight: 500, color: "#DD0000", fontSize: "14px" }}>
                                                        Đã đóng
                                                    </div>
                                                </div>
                                            </Box>
                                        </Card>
                                    </div>
                                ))
                                }
                            </div>
                        </div>
                    </div>
                </SidebarStyled>
            </div>

            <div className="flex-container_div"
                style={{ flex: 3, paddingLeft: "20px", paddingRight: "20px" }} >
                {(whatshow == "0") && <Write_post />}
                {(whatshow == "1") && <Show_post 
                detailPost={detailPost} 
                id={detailPost.id}
                loadingParent={(value)=> setLoadingAfterUn_Active(!loadingAfterUn_Active)} />}
            </div>


            {/* <div  className="flex-container_div" style={{ flexGrow: 3 }}>3
            </div>
            <div  className="flex-container_div" style={{ flexGrow: 1 }}>4 
            </div>*/}
        </div >
    );
}
