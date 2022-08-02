import * as React from 'react';
import { useState } from "react";
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
        <div style={{ paddingTop: "10px" }}>
            <Card 
            className="card-job" sx={{ display: 'flex', height: 100,
             "&:hover": { bgcolor: "#edf4fb", cursor:"pointer" } }}
             >
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>

                    <CardMedia
                        component="img"
                        sx={{ minWidth: 100, maxWidth:100, height: 100 }}
                        image={infor.image_cover ? infor.image_cover : "cover_image_post.jpg"}
                        alt="img"
                    />
                    <div style={{ fontSize: "16px", paddingLeft: "10px", paddingTop: "10px" }}>
                        <div >
                            <div className='title-job' style={{ fontWeight: "700", fontSize: "15px" }}>
                                {infor.title}
                            </div>
                        </div>

                        <div style={{ fontSize: "14px", color: "#666666" }} >
                            {infor.write_time}
                        </div>
                        <div style={{ fontWeight: 500, color: "#00B14F", fontSize: "14px" }}>
                            Có {infor.count_member} thành viên
                        </div>
                    </div>


                </Box>
            </Card>
        </div>
    );
};

export default Card_Job;