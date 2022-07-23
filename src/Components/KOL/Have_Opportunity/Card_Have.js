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

            <Card className="card-job" sx={{ display: 'flex', height: 120 }}>
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 120, height: 120, cursor: "pointer" }}
                        image={props.cover}
                        alt="img"
                        onClick={(e) => { handleClickReadOne() }}
                    />
                    <div style={{ fontSize: "16px", paddingLeft: "10px", paddingTop: "10px" }}>
                        <div >
                            <div className="title-card-save" style={{ fontWeight: "700", cursor: "pointer" }}
                                onClick={(e) => { handleClickReadOne() }} >
                                {props.title}
                            </div>
                            {/* <div className="card-heart" style={{ paddingRight: "0px" }}>
                            <Tooltip title="Xóa">
                                <Button sx={{ width: 18, height: 28, "&:hover": { bgcolor: "#gray" } }}>
                                    <CancelIcon sx={{ fontSize: 18, color:"#DD0000" }} />
                                </Button>
                                </Tooltip>
                            </div> */}
                        </div>

                        <div className="title-card" style={{ color: "#2C6975", fontWeight: "500", cursor: "pointer" }}
                            onClick={(event) => handleClickStalkBrand()}>
                            {props.brand_name}
                        </div>
                        <div >
                            {props.write_time}
                        </div>
                        <div style={{ paddingTop: "5px" }}>
                            <Stack direction="row" spacing={1}>
                                <Chip size="small" icon={<PaidIcon />} label={cast_Main} />
                                <Chip size="small" icon={<PlaceIcon />} label={props.address} />
                            </Stack>
                        </div>
                    </div>
                </Box>
            </Card>

        </div>

    );
};

export default Card_Have;