import React from 'react'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { DOMAIN_API } from '../../../config/const'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  font-size: 14px; 
  border-radius: 5px;
`;

export default function Dialog_Box ({id_post,linkcode,isMember}) {
    const navigate = useNavigate();
    let actoken = localStorage.access_token;
    const [openAlertDialog, setOpenAlertDialog] = React.useState(false);

    async function handleClickAccept ()
    {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `jobs/join-job-by-email`;
            await fetch(url1, {
              method: "POST",
              headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
              },
              body: JSON.stringify({ id_post: id_post, linkcode:linkcode })
            })
              .then(res => res.json())
              .then(
                (result) => {
                  if(result)
                  {
                    isMember(true);
                    setOpenAlertDialog(true);
                  }
                }
              )
          }
          catch (error) {
            console.log("error: ", error)
          }
    }

    const handleClickRefuse =() =>{
        navigate('/');
    }

    const handleCloseAlertDialog = () => {
        setOpenAlertDialog(false);
    };


    return (
        <SidebarStyled>
            <div style={{ textAlign: "center", padding:"20px" }}>
                <div style={{ fontSize: "20px", fontWeight: 500 }}>
                    Bạn được mời tham gia công việc này
                </div>
                <div style={{ paddingTop: "20px" }}>
                    <Grid container spacing={3}>
                        <Grid item xs={6}>
                            <div style={{ marginBottom: "0px" }}>
                                <Button fullWidth variant="contained"
                                    sx={{ width:"150px",
                                        textTransform: 'capitalize', backgroundColor: "#00B14F",
                                        fontFamily: "Segoe UI", fontSize: "15px",boxShadow: "none",
                                        "&:hover": { bgcolor: "green" }
                                    }}
                                    onClick={handleClickAccept}>
                                    Đồng ý
                                </Button>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div style={{ marginBottom: "0px" }}>
                                <Button fullWidth variant="contained"
                                    sx={{width:"150px",
                                        textTransform: 'capitalize', backgroundColor: "#e4e6eb",
                                        fontFamily: "Segoe UI", fontSize: "15px",boxShadow: "none", color:"black",
                                        "&:hover": { bgcolor: "#DDDDDD" }
                                    }}
                                    onClick={handleClickRefuse}>
                                    Từ chối
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </div>

            <Dialog
                open={openAlertDialog}
                keepMounted
                onClose={handleCloseAlertDialog}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Đã đồng ý tham gia công việc"}</DialogTitle>
                <DialogActions>
                    <Button onClick={handleCloseAlertDialog}>Tắt</Button>
                </DialogActions>
            </Dialog>

        </SidebarStyled>
    )
}
