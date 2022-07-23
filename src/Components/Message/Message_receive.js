import React from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';
import Avatar from '@mui/material/Avatar';

const WrapperStyled = styled.div`
  margin-bottom: 10px;
  .author {
    margin-left: 5px;
    font-weight: bold;
  }
  .date {
    margin-left: 10px;
    font-size: 11px;
    color: #a7a7a7;
    margin-bottom: -10px;
  }
  .content {
    margin-left: 30px;
  }
`;


export default function Message_Receive({ text, createdAt, photoURL }) {
    return (
        <WrapperStyled>
            <div style={{ paddingTop: "10px", paddingRight: "40px" }}>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                    <div>
                        <Avatar sx={{ width: 32, height: 32 }} alt="..." src={photoURL} />
                    </div>
                    <div style={{ fontSize: "16px", paddingLeft: "10px", maxWidth:"90%" }}>
                        <Card sx={{ bgcolor: "#e4e6eb", borderRadius:"25px",boxShadow: "none" }}>
                            <div style={{paddingTop: "10px",paddingBottom: "10px",paddingRight: "15px",paddingLeft: "15px" }}>

                                <pre style={{display:"block",whiteSpace:"pre-line", fontWeight: 400, fontSize: "14.5px", fontFamily: "Segoe UI" }}>
                                    {text}
                                </pre>

                                <div style={{color:"gray", fontWeight: 400, fontSize: "12.5px", marginTop: "-15px", fontFamily: "Segoe UI" }}>
                                    {createdAt}
                                </div>
                            </div>
                        </Card>

                    </div>
                </div>
            </div>
        </WrapperStyled>
    );
}