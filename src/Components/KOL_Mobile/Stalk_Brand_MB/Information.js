import * as React from 'react';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

const commonStyles = {
    bgcolor: 'background.paper',
    border: 1,

};

function handleClick(event) {
    event.preventDefault();
    console.info('You clicked a breadcrumb.');
}


const Brand_Info = ({ brand_introduce }) => {

    return (
        <div>
            <Card sx={{ ...commonStyles, borderColor: '#00B14F',boxShadow:"none",borderRadius:"5px" }}>
                <Box >
                    <div className="back-ground-content-job" style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "10px", paddingBottom: "15px" }}>
                        <div style={{ fontWeight: "bold", color: "#00B14F", fontSize: "18px", paddingBottom: "0px" }}>Giới thiệu nhãn hàng</div>
                        <Divider />
                        <div style={{ paddingTop: "10px" }}>
                            <div style={{ marginTop: "-5px" }} >
                                <pre style={{
                                    display: "block", whiteSpace: "pre-line",
                                    fontWeight: 500, fontSize: "15px", fontFamily: "Arial",
                                    marginBottom: "-10px"
                                }}>
                                    {brand_introduce ? brand_introduce : "Chưa có thông tin"}
                                </pre>

                            </div>
                        </div>
                    </div>
                </Box>
            </Card>
        </div >
    )
}

export default Brand_Info;