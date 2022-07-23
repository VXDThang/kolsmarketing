import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import Button from '@mui/material/Button';
import InputBase from '@mui/material/InputBase';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

//file
import './Box_Meesage.css'

//icon
import TelegramIcon from '@mui/icons-material/Telegram';
import ClearIcon from '@mui/icons-material/Clear';

const ContentStyled = styled.div`
  height: 400px;
  width: 360px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #00B14F;
  border-left: 1px solid #00B14F;
  border-top: 1px solid #00B14F;
  padding: 11px;
  justify-content: flex-end;
  z-index:10;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  
`;

const HeaderStyled = styled.div`
display: flex;
height: 36px;
justify-content: space-between;

border-bottom: 1px solid #00B14F;
.username {
  color: black;
  margin-left: 10px;
}
`;

const FormStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 2px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const MessageListStyled = styled.div`
  max-height: 100%;
  overflow-y: auto;
`;

export default function ChatWindow() {

    const [inputValue, setInputValue] = useState('');
    const inputRef = useRef(null);
    const messageListRef = useRef(null);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };



    return (
        <div className="divBoxChat">
            <ContentStyled>
                <Grid item xs={12}>
                    <HeaderStyled>
                        <div>
                            <div className="d-flex justify-content-start">
                                <div>
                                    <Avatar sx={{ width: 26, height: 26 }} src="avatar.jpg">
                                        A
                                    </Avatar>
                                </div>

                                <div className='username'>Vo Xuan Duc Thang</div>

                            </div>
                        </div>

                        <Tooltip title="Thoát">
                            <Avatar sx={{ width: 28, height: 28}}>
                                <ClearIcon sx={{ fontSize: 18 ,color: "#CC0000" }} />
                            </Avatar>
                        </Tooltip>
                    </HeaderStyled >
                </Grid>
                <Grid item xs={12}>
                    <MessageListStyled>

                    </MessageListStyled>
                </Grid>

                <FormStyled>
                    <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Nhập tin nhắn"
                        multiline
                        maxRows={4}
                    />
                    <Button type='primary' sx={{ color: " #00B14F" }}>
                        <TelegramIcon />
                    </Button>
                </FormStyled>
            </ContentStyled>


        </div>
    );
}