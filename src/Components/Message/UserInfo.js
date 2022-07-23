import React from 'react';

import styled from 'styled-components';
import Avatar from '@mui/material/Avatar';

const WrapperStyled = styled.div`
  display: flex;
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
    return (
        <WrapperStyled>
            <div>
                <div className="d-flex justify-content-start">
                    <div>
                        <Avatar sx={{ width: 26, height: 26 }} src={props.avatar}>
                        </Avatar>
                    </div>

                    <div className='username'>{props.name}</div>

                </div>
            </div>
        </WrapperStyled >
    );
}