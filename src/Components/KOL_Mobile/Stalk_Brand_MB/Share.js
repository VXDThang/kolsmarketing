import * as React from 'react';
import Button from '@mui/material/Button';
import { useState } from "react";
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';

import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import {
    FacebookShareButton,
    TwitterShareButton,
    LinkedinShareButton
} from "react-share";

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

const commonStyles = {
    bgcolor: 'background.paper',
    border: 1,

};

const Share = () => {
    const [isCopyLink, setIsCopyLink] = React.useState(false);
    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href)
        setIsCopyLink(true);
        setTimeout(() => {
            setIsCopyLink(false);
        }, 3000);
    };

    return (
        <Card sx={{ ...commonStyles, borderColor: '#00B14F',boxShadow:"none" }} >
            <div style={{ padding: "10px" }}>
                <div style={{ fontWeight: 700 }}>
                    Chia sẻ thông tin nhãn hàng
                </div>
                <div>
                    Sao chép đường dẫn
                </div>
                <div className="d-flex justify-content-between" style={{ paddingTop: "15px", paddingBottom: "10px" }}>

                    <TextField
                        id="outlined-read-only-input"
                        label="Link"
                        size="small"
                        defaultValue={window.location.href}
                        InputProps={{
                            readOnly: true,
                        }}
                        sx={{ width: "80%" }}

                    />
                    <div style={{paddingLeft:"10px"}}>
                        <Tooltip title="Sao chép">
                            <Button sx={{ height: "40px", bgcolor: "#d3f4d6" }}
                                onClick={handleCopyLink} >
                                <ContentCopyIcon sx={{ fontSize: 20, color: "#00B14F" }} />
                            </Button>
                        </Tooltip>

                    </div>
                </div>

                <div>
                    Chia sẻ tin qua mạng xã hội
                </div>
                <Stack
                    direction="row"
                    spacing={1}
                    sx={{ marginLeft: "-2px" }}
                >
                    <FacebookShareButton
                        url={window.location.href}
                        quote={"KolsMarketing"}
                        className="Demo__some-network__share-button"
                    >
                        <FacebookIcon sx={{ fontSize: 40, color: "#1976D2" }} />
                    </FacebookShareButton>
                    <TwitterShareButton
                        url={window.location.href}
                        quote={"KolsMarketing"}
                        className="Demo__some-network__share-button"
                    >
                        <TwitterIcon sx={{ fontSize: 40, color: "#1976D2" }} />
                    </TwitterShareButton>

                    <LinkedinShareButton
                        url={window.location.href}
                        quote={"KolsMarketing"}
                        className="Demo__some-network__share-button"
                    >
                        <LinkedInIcon sx={{ fontSize: 40, color: "#1976D2" }} />
                    </LinkedinShareButton>

                </Stack>

            </div>
            {isCopyLink ? <Alert severity="success">Đã sao chép</Alert> : ""}


        </Card>
    )
}

export default Share;