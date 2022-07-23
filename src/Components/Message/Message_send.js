import React from 'react';
import styled from 'styled-components';
import Card from '@mui/material/Card';

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


export default function Message_Send({ text, createdAt, photoURL }) {
  return (
    <WrapperStyled>
      <div className="d-flex justify-content-end" style={{ paddingTop: "10px", marginRight:"10px" }}>
        <div style={{ fontSize: "16px", paddingLeft: "40px", maxWidth: "90%" }}>
          <Card sx={{ bgcolor: "#00B14F", borderRadius: "25px", boxShadow: "none" }}>
            <div style={{
              paddingTop: "10px", paddingBottom: "10px", paddingRight: "15px", paddingLeft: "15px"
            }}>
              <pre style={{
                display: "block", whiteSpace: "pre-line", color: "white",
                fontWeight: 400, fontSize: "14.5px", fontFamily: "Segoe UI"
              }}>
                {text}
              </pre>

              <div style={{ color: "white", fontWeight: 300, fontSize: "12.5px", fontFamily: "Segoe UI", marginTop: "-15px", }}>
                {createdAt}
              </div>
            </div>
          </Card>
        </div>
      </div>
    </WrapperStyled>
  );
}