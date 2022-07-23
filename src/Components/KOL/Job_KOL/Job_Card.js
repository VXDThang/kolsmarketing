import * as React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Box from '@mui/material/Box';

//file
import "./Job.css"

//icon
import { createTheme } from '@mui/material/styles';

const Card_Job = ({ infor }) => {

    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const theme = createTheme({
        components: {
            MuiChip: {
                styleOverrides: {
                    colorPrimary: {
                        backgroundColor: 'yellow',
                    },
                    colorSecondary: {
                        backgroundColor: 'brown',
                    },
                },
            },
        },
    });

    return (
        <div style={{ paddingTop: "20px" }}>
            <Card className="card-job" sx={{
                display: 'flex', height: 160, "&:hover": { bgcolor: "#edf4fb" },
                border: "0.5px solid #CCCCCC", boxShadow: "none", borderRadius:"10px"
            }} >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                    <CardMedia
                        component="img"
                        sx={{ width: 160, height: 160 }}
                        image={infor?.image_cover ? infor.image_cover : "cover_image_post.jpg"}
                        alt="img"
                    />
                    <div style={{ fontSize: "16px", paddingLeft: "10px", paddingTop: "10px" }}>
                        <div >
                            <div className='title-job' style={{ fontWeight: "700", fontSize: "15px", color: "#2C6975" }}>
                                {infor?.title}
                            </div>
                        </div>

                        <div style={{ fontWeight: 500, fontSize: "14px" }} >
                            Sở hữu: <span style={{ paddingRight: "10px", color: "#329D9C" }}>
                                {infor?.brand_name}</span>
                        </div>
                        <div style={{ fontWeight: 500, fontSize: "14px" }}>
                            Mô tả
                        </div>
                        <div className='summary-job'>
                            {infor?.content}
                        </div>
                    </div>


                </Box>
            </Card>
        </div>
    );
};

export default Card_Job;