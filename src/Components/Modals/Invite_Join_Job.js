import * as React from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import TextField from '@mui/material/TextField';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../config/const'
import DialogTitle from '@mui/material/DialogTitle';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Alert from '@mui/material/Alert';

//icon
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CircularProgress from '@mui/material/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';


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


export default function Invite_Join_Job(props) {
    const { isOpen, isClose, id_post } = props;
    const [inputValueEmail, setInputValueEmail] = React.useState('');

    const [loadingSend, setLoadingSend] = React.useState(false);
    const [alert, setAlert] = React.useState(false);

    const [linkInviteJob, setLinkInviteJob] = React.useState("");
    const [isCopyLink, setIsCopyLink] = React.useState(false);

    let actoken = localStorage.access_token;

    const handleClose = () => {
        isClose(false);
        setIsCopyLink(false);
    };
    const handleCopyLink = () => {
        navigator.clipboard.writeText(linkInviteJob)
        setIsCopyLink(true);
        setTimeout(() => {
            setIsCopyLink(false);
        }, 3000);
    };

    const handleAfterSendSuccess = () => {
        setAlert(true);
        setTimeout(() => {
            setAlert(false);
        }, 3000);
    }


    const handleSendEmail = () => {
        setLoadingSend(true)
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
                    console.log("Check is send success", result2);
                    if (result2) {
                        setLoadingSend(false)
                        handleAfterSendSuccess();
                        setInputValueEmail("");
                        // setOpenSendSuccessDialog(true)
                        // isClose(false);
                    }

                },
                (error) => {
                    console.log("Error send email");
                    setInputValueEmail("");
                }
            )
    };

    async function getLink() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `jobs/generate-link-join-job`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_post: id_post })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        console.log("Link invite job is:", result)
                        setLinkInviteJob(result)
                    }
                )
        }
        catch (error) {

        }
        finally {
        }
    }
    React.useEffect(() => {
        getLink();
    }, [id_post])

    return (
        <div>

            <Dialog
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <DialogTitle>
                    <div className='d-flex justify-content-between'>
                        <div>Mời vào công việc
                        </div>
                        <div>
                            <Tooltip title="Thoát">
                                <Avatar sx={{ width: 28, height: 28, "&:hover": { bgcolor: "#CCCCCC", cursor: "pointer" } }}
                                    onClick={handleClose}>
                                    <CloseIcon sx={{ fontSize: 18 }} />
                                </Avatar>
                            </Tooltip>
                        </div>
                    </div>

                </DialogTitle>
                <Divider />
                <DialogContent style={{ cursor: 'move', paddingTop: "20px" }} id="draggable-dialog-title">

                    <div>
                        <div style={{ fontWeight: "600" }}>
                            Mời bằng email
                        </div>
                        <div className='d-flex justify-content-between'>
                            <div style={{ paddingTop: "10px", width: "380px" }}>
                                <FormStyled>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder="Nhập địa chỉ email "
                                        rows="1"
                                        value={inputValueEmail}
                                        onChange={(event) => {
                                            setInputValueEmail(event.target.value);
                                        }}
                                    />
                                </FormStyled>
                            </div>
                            <div style={{ paddingTop: "10px" }}>
                                <Button fullWidth variant="contained"
                                    sx={{
                                        width: "50px",
                                        textTransform: 'capitalize', backgroundColor: "#00B14F",
                                        fontFamily: "Segoe UI", fontSize: "15px", boxShadow: "none",
                                        "&:hover": { bgcolor: "green" }
                                    }}
                                    onClick={handleSendEmail}>
                                    Gửi
                                </Button>
                            </div>
                        </div>
                        {loadingSend ?
                            <div className='d-flex justify-content-center' style={{ paddingTop: "15px" }}>
                                <div>
                                    <CircularProgress />
                                </div>
                            </div> :
                            ""
                        }
                        {alert ?
                            <div className='d-flex justify-content-center' style={{ paddingTop: "10px" }}>
                                <div style={{ color: "#00B14F" }}>
                                    Đã gửi thành công ...
                                </div>
                            </div> :
                            ""
                        }
                        <div className='d-flex justify-content-between' style={{ paddingTop: "20px" }}>
                            <div style={{ fontWeight: "600" }}>
                                Mời bằng liên kết
                            </div>
                            {/* <div style={{ color: "#2C6975", cursor: "pointer", fontWeight: 500, fontSize: "15px" }}
                                onClick={handleCopyLink}>
                                Sao chép liên kết
                            </div> */}
                        </div>

                        <div className='d-flex justify-content-between'>
                            <div style={{ paddingTop: "10px", width: "380px" }}>
                                <FormStyled>
                                    <InputBase
                                        sx={{ ml: 1, flex: 1 }}
                                        placeholder=""
                                        rows="1"
                                        value={linkInviteJob}

                                    />
                                </FormStyled>
                            </div>
                            <div style={{ paddingTop: "10px" }}>
                                <Tooltip title="Sao chép">
                                    <Button sx={{ height: "40px", bgcolor: "#d3f4d6", width: "50px" }}
                                        onClick={handleCopyLink} >
                                        <ContentCopyIcon sx={{ fontSize: 20, color: "#00B14F" }} />
                                    </Button>
                                </Tooltip>
                            </div>
                        </div>

                        <div>
                            {isCopyLink ? <span style={{ color: "#00B14F", fontSize: "14px" }}>Đã sao chép đường liên kết ...</span> : ""}
                        </div>

                        <div style={{ fontSize: "14px", paddingTop: "10px", maxWidth: "480px" }}>
                            Bất kỳ ai có liên kết đều có thể tham gia làm thành viên của công việc này.
                        </div>


                    </div>

                </DialogContent>


            </Dialog>



        </div>
    );
}
