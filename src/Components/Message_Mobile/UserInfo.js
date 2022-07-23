import React from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';

const WrapperStyled = styled.div`
  height: 56px;
  justify-content: space-between;
  padding: 12px 16px;
  border-bottom: 1px solid rgb(230, 230, 230);
  .username {
    color: black;
    margin-left: 10px;
  }
`;



export default function UserInfo(props) {
    const navigate = useNavigate();

    function handleClickToHomepage() {
        navigate('/');
    }

    return (
        <WrapperStyled>
            <div className="d-flex justify-content-between">
                <div>
                    <div className="d-flex justify-content-start">
                        <div  style={{paddingTop:"3px"}} >
                            <Avatar sx={{ width: 26, height: 26 }} src={props.avatar}>
                            </Avatar>
                        </div>

                        <div className='username' style={{paddingTop:"3px"}}>{props.name}</div>
                    </div>
                </div>

                <div style={{ fontWeight: 600, fontSize:"20px" }}
                onClick={handleClickToHomepage}>
                    KOLs<span style={{ color: "#00b14f" }}>Marketing</span>
                </div>
            </div>
        </WrapperStyled >
    );
}