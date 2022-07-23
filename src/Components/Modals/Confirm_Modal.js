import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { DOMAIN_API } from '../../config/const'
import DialogTitle from '@mui/material/DialogTitle';

const FormStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;


export default function Confirm({title, msg, callback}) {
    const [inputValueEmail, setInputValueEmail] = React.useState('');

    const [isCopyLink, setIsCopyLink] = React.useState(false);
    let actoken = localStorage.access_token;

    const handleClose = () => {
        isClose(false);
        setIsCopyLink(false);
    };
    const handleCopyLink = () => {
        setIsCopyLink(true);
    };
    const handleSendEmail = () => {
        fetch(DOMAIN_API + `jobs/send-invite-job`, {
            method: "POST",
            headers: new Headers({
                "x-access-token": actoken,
                'Content-Type': 'application/json'
            }),
            body: JSON.stringify({ id_post: id_post, email: inputValueEmail })
        })
            .then(res => res.json())
            .then(
                (result2) => {
                    if(result2){
                        isClose(false);
                        setIsCopyLink(false);
                        setInputValueEmail("");
                    }
                    
                },
                (error) => {
                    console.log("Error send email");
                    setInputValueEmail("");
                }
            )
    };
    return (
        <div>

            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>Mời vào công việc</DialogTitle>
                <Divider />
                <DialogContent style={{ cursor: 'move', paddingTop: "20px" }} id="draggable-dialog-title">

                    <div>
                        <div style={{ fontWeight: "600" }}>
                            Mời thành viên
                        </div>
                        <div style={{paddingTop:"10px"}}>
                            <FormStyled>
                                <InputBase
                                    sx={{ ml: 1, flex: 1 }}
                                    placeholder="Nhập địa chỉ email "
                                    multiline
                                    rows="1"
                                    value={inputValueEmail}
                                    onChange={(event) => {
                                        setInputValueEmail(event.target.value);
                                    }}
                                />
                            </FormStyled>
                        </div>
                        <div className='d-flex justify-content-between' style={{ paddingTop: "20px" }}>
                            <div style={{ fontWeight: "600" }}>
                                Mời bằng liên kết
                            </div>
                            <div style={{ color: "#2C6975", cursor: "pointer", fontWeight: 500 }}
                                onClick={handleCopyLink}>
                                Sao chép liên kết
                            </div>
                        </div>
                        <div>
                            {isCopyLink ? <span style={{ color: "#00B14F", fontSize: "14px" }}>Đã sao chép đường liên kết</span> : ""}
                        </div>

                        <div style={{ fontSize: "14px", paddingTop:"20px" }}>
                            Bất kỳ ai có liên kết đều có thể tham gia làm thành viên của công việc này.
                        </div>
                    </div>

                </DialogContent>

                <DialogActions>
                    <Button
                        sx={{ color: "#DD2D34" }}
                        autoFocus onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        sx={{ color: "#00B14F" }}
                        onClick={handleSendEmail}>Gửi</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
