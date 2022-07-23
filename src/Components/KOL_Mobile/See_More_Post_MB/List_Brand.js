import React from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';

import { DOMAIN_API } from '../../../config/const'

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  min-height: 100vh;
  border-left: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
 
`;

export default function List_Brand({type}) {
    const navigate = useNavigate();
    const [idPicker, setIdPicker] = React.useState(0);
    const [listKol, setListKol] = React.useState([]);
    const [error, setError] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    let actoken = localStorage.access_token;
    async function getListKol() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `brands/list-brands-more`;
            await fetch(url1, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
    
                },
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setListKol(result);
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
        getListKol();
    }, [])

    function handleClickStalkBrand(idBrand) {
        navigate(`/stalkbrand/${idBrand}`);
    }



    return (
        <div style={{ marginLeft:"-5px", marginRight:"-5px",}}>
            <div style={{ paddingTop: "1px",paddingBottom: "10px", maxHeight: "300vh", height:"auto", overflowY: "scroll" }}>
                {loading ?
                    <div style={{ paddingTop: "5px" }}>
                        Đang tải dữ liệu
                    </div>
                    :
                    <div>
                        {listKol?.length > 0 && listKol.map((list, index) => (
                            <div key={list.id} style={{}}>
                                <Card
                                    className="card-job" 
                                    sx={{
                                       
                                        border: "none", boxShadow: "none",
                                        display: 'flex', height: 100,
                                        "&:hover": { bgcolor:  type==1? "#edf4fb": "#FFCCFF", cursor: "pointer" },
                                        ...((idPicker == list.id) && { bgcolor: '#edf4fb' })
                                    }}
                                    onClick={(event) => handleClickStalkBrand(list.id)}
                                     >

                                    <CardHeader
                                        avatar={
                                            <Avatar sx={{
                                                bgcolor: "red",
                                                width: "70px", height: "70px"
                                            }} aria-label="recipe"
                                                src={list?.avatar ? list.avatar : "brand.jpg"}>
                                            </Avatar>
                                        }
                                        title={
                                        <span style={{ fontWeight: 500, fontSize: "16px", color: type==1?"#00B14F":"#660066" }}>
                                            {list.brand_name}
                                        </span>}
                                        subheader="16 cơ hội đang ứng tuyển"
                                    />
                                </Card>
                                <div style={{ paddingTop: "5px" }}>
                                    <Divider sx={{ color: type==1? "#00B14F":"#660066" }} />
                                </div>
                            </div>
                        ))}
                    </div>
                }

            </div>
        </div>
    );
}