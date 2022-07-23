import React from 'react'
import Grid from '@mui/material/Grid';

import Stack from '@mui/material/Stack';

//icon
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

export default function Footer() {
    return (
        <div style={{ backgroundColor: "#f3f2f0", paddingLeft: "20px", paddingRight: "20px", fontSize: "14px" , paddingBottom:"10px"}}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <div style={{fontSize:"18px", fontWeight:600}}>
                        KOLs<span style={{ color: "#00b14f" }}>Marketing</span>
                    </div>
                </Grid>
                <Grid item xs={6}>
                    <div style={{ fontWeight: 600 }}>
                        Cơ hội
                    </div>
                    <div style={{ fontWeight: 600, color: "gray" }}>
                        Các cơ hội dành cho bạn
                    </div>
                    <div style={{ fontWeight: 600, color: "gray" }}>
                        Các cơ hội hấp dẫn
                    </div>
                    <div style={{ fontWeight: 600, color: "gray" }}>
                        Tất cả cơ hội
                    </div>

                </Grid>

                <Grid item xs={6}>
                    <div style={{ fontWeight: 600 }}>
                        Nhãn hàng
                    </div>
                    <div style={{ fontWeight: 600, color: "gray" }}>
                        Danh sách nhãn hàng
                    </div>
                    <div style={{ fontWeight: 600, color: "gray" }}>
                        Top nhãn hàng nổi bật
                    </div>
                </Grid>

                <Grid item xs={12}>
                    <div style={{ fontWeight: 600 }}>
                        Liên hệ
                    </div>
                    <div>
                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ marginLeft: "-2px" }}
                        >
                            <FacebookIcon sx={{ fontSize: 36, color: "#1976D2" }} />
                            <InstagramIcon sx={{ fontSize: 36, color: "#FF6699" }} />
                            <LinkedInIcon sx={{ fontSize: 36, color: "#1976D2" }} />
                        </Stack>
                    </div>
                </Grid>
            </Grid>

        </div>
    )
}
