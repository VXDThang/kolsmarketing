import * as React from 'react';
import { useState, useEffect } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import { Grid} from '@mui/material';

export default function DetailPost_HavePost(props) {
    const { isOpen, isClose, data } = props;
    const [open, setOpen] = React.useState(isOpen);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
        isClose(false);
    };
    useEffect(() => {
        
    }, [isOpen]);

    return (
        <div>
            <Dialog fullWidth open={isOpen} onClose={handleClose}>
                <div style={{ paddingTop: "20px", textAlign: "center" }}>
                    <div style={{ fontWeight: 600, fontSize: "18px", color: "#00B14F" }}>
                        Xem chi tiết bài viết
                    </div>

                </div>


                <DialogContent>

                    {/* ============================================ */}

                    <Grid item xs={12}>
                        <div style={{ fontWeight: 600, color: "#00B14F" }}>
                            Nội dung:
                        </div>
                        <div>
                            {data?.content ?
                                data.content : ""
                            }
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ fontWeight: 600, color: "#00B14F" }}>
                            Trang đăng:
                        </div>
                        <div>
                            {data?.page_name ?
                                data.page_name : ""
                            }
                        </div>

                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ fontWeight: 600, color: "#00B14F" }}>
                            Đăng lúc:
                        </div>
                        <div>
                            {data?.schedule_time ?
                                data.schedule_time : ""
                            }
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <div style={{ fontWeight: 600, color: "#00B14F" }}>
                            File phương tiện
                        </div>
                        <div>
                            {data?.url_image ?
                                <div style={{ paddingTop: "10px", paddingBottom: "10px", textAlign: "center" }} >
                                    <img src={data.url_image} width="auto" height="300px" />
                                </div>
                                : ""}
                            {data?.url_video ?
                                <video src={data.url_video} width="100%" height="300" controls="controls" autoPlay={true} />
                                : ""}
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ fontWeight: 600, color: "#00B14F" }}>
                            Lượt thích: <span  style={{ fontWeight: 500, color: "black" }}>
                                <span>
                                    {data.count_like}
                                </span>
                            </span>
                        </div>

                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ fontWeight: 600, color: "#00B14F" }}>
                            Lượt bình luận:  <span  style={{ fontWeight: 500, color: "black" }}>
                                <span>
                                    {data.count_comment}
                                </span>
                            </span>
                        </div>

                    </Grid>
                    <Grid item xs={12}>
                        <div style={{ fontWeight: 600, color: "#00B14F" }}>
                            Lượt chia sẻ:  <span style={{ fontWeight: 500, color: "black" }}>
                                <span>
                                    {data.count_share}
                                </span>
                            </span>
                        </div>

                    </Grid>
                    <br />


                </DialogContent>
                <div style={{ paddingRight: "10px", paddingTop: "8px" }}>
                    <DialogActions>
                        <Button onClick={() => isClose(false)} variant="contained" color="secondary">Tắt</Button>
                    </DialogActions>
                </div>

            </Dialog>
        </div>
    );
}
