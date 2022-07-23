import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';

import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
//file
import "./Card.css"

//icon
import PlaceIcon from '@mui/icons-material/Place';
import PaidIcon from '@mui/icons-material/Paid';



const Card_Have = (props) => {
    const idBrand = props.idBrand;
    const idPost = props.idPost;

    const navigate = useNavigate();
    let cast_Draft = Number(props.cast);
    let cast_Main = cast_Draft.toLocaleString("vi");


    function handleClickReadOne() {
        navigate(`/read-one/${idPost}`);
    }
    function handleClickStalkBrand() {
        navigate(`/stalkbrand/${idBrand}`);
    }

    return (
        <div style={{ paddingBottom: "10px" }} >

            <Card className="card-job" sx={{ display: 'flex',flexDirection: 'column', height: 140 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardMedia
                        component="img"
                        sx={{ minWidth: 100, maxWidth: 100, height: 100, cursor: "pointer", borderRadius: "5px" }}
                        image={props.cover}
                        alt="img"
                        onClick={(e) => { handleClickReadOne() }}
                    />
                    <div style={{ fontSize: "16px", paddingLeft: "10px", paddingTop: "10px", }}>
                        <div >
                            <div className="title0new_HaveCardMB"
                                style={{ fontWeight: "700", cursor: "pointer", maxWidth: "75%" }}
                                onClick={(e) => { handleClickReadOne() }} >
                                {props.title}
                            </div>
                        </div>

                        <div className="title-card" style={{ color: "#2C6975", fontWeight: "500", cursor: "pointer" }}
                            onClick={(event) => handleClickStalkBrand()}>
                            {props.brand_name}
                        </div>
                        <div >
                            {props.write_time}
                        </div>

                    </div>
                </Box>
                <div style={{ paddingTop: "10px", paddingLeft: "10px" }}>
                    <Stack direction="row" spacing={1}>
                        <Chip size="small" icon={<PaidIcon />} label={cast_Main} />
                        <Chip size="small" icon={<PlaceIcon />} label={props.address} />
                    </Stack>
                </div>
            </Card>

        </div>

    );
};

export default Card_Have;