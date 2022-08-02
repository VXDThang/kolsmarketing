import React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';
//format time
import moment from 'moment';
import { DOMAIN_API } from '../../../config/const'

//file
import './Job.css'

//icon
import SearchIcon from '@mui/icons-material/Search';

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  border-right: 1px solid rgb(230, 230, 230);
  width:400px;
  margin-bottom: -40px;
  margin-top: -20px;
  margin-left: -20px;
  position: fixed;
 
`;

export default function RoomList(props) {

    const { id_job_picker } = props
    const [idPicker, setIdPicker] = React.useState(0);
    const [values, setValues] = React.useState("");
    const [searchKey, setSearchKey] = React.useState("");
    const [listJob, setListJob] = React.useState([]);
    const [listAllJob, setListAllJob] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    let actoken = localStorage.access_token;
    async function getListJob() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `jobs/get-all-post-of-brand`;
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
                        setListJob(result);
                        setListAllJob(result);
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
        getListJob();
    }, [])

    const handleShowDetailPost = (even, index, id) => {
        id_job_picker(id);
        setIdPicker(id);
    }
    const handleSearch = () => {
        setLoading(true);
        if (searchKey != "") {
            let listJobSearch = [];
            for (let i = 0; i < listAllJob.length; i++) {
                if (listAllJob[i].title.match(new RegExp(searchKey, "gi")) != null) {
                    listJobSearch.push(listAllJob[i])
                }
            }

            setLoading(false);
            setListJob(listJobSearch)
        }
        else {
            setLoading(false);
            setListJob(listAllJob)
        }
    }

    const handleSetSearchKey = (event) => {
        if (event.target.value != "") {
            setSearchKey(event.target.value)
        }

        else {
            setSearchKey(event.target.value)
            setListJob(listAllJob)
        }
    }


    return (
        <SidebarStyled>
            <div className="search_listjob"  style={{ padding: "10px",overflowY: "auto" }} >
                <div style={{ fontSize: "16px", fontWeight: "600", paddingBottom: "10px" }}>
                    Danh sách công việc
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
                {loading ?
                    <div style={{ paddingTop: "5px" }}>
                        Đang tải dữ liệu
                    </div>
                    :
                    <div style={{ paddingTop:"10px" }}>
                    <div className="list_job" style={{  overflowY: "auto" }}>
                        {listJob?.length > 0 && listJob.map((list, index) => (
                            <div key={list.id} style={{ paddingTop: "5px",paddingBottom:"5px" }}>
                                <Card
                                    className="card-job" sx={{  boxShadow: "none",
                                        display: 'flex', height: 100,bgcolor:"#EEEEEE",
                                        "&:hover": { bgcolor: "#99FF99", cursor: "pointer" },
                                        ...((idPicker == list.id) && { bgcolor: '#99FF99' })
                                    }}
                                    onClick={(event) => handleShowDetailPost(event, 1, list.id)} >
                                    <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                                        <CardMedia
                                            component="img"
                                            sx={{ minWidth: 100, maxWidth:100, height: 100 }}
                                            image={list.image_cover ? list.image_cover : "cover_image_post.jpg"}
                                            alt="img"
                                        />
                                        <div style={{ fontSize: "16px", paddingLeft: "10px", paddingTop: "5px", paddingBottom:"5px" }}>
                                            <div >
                                                <div className='title-job' style={{ fontWeight: "700", fontSize: "15px" }}>
                                                    {list.title}
                                                </div>
                                            </div>

                                            <div style={{ fontSize: "14px", color: "#666666" }} >
                                                {moment(list.write_time).format("DD/MM/YYYY HH:mm")}
                                            </div>
                                            <div style={{ fontWeight: 500, color: "#00B14F", fontSize: "14px" }}>
                                                Có {list.count_member} thành viên
                                            </div>
                                        </div>


                                    </Box>
                                </Card>
                            </div>
                        ))}
                    </div>
                    </div>
                }

            </div>
        </SidebarStyled>
    );
}