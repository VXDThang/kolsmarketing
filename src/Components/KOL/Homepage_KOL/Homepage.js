import * as React from 'react';
import { useState, useEffect } from "react";
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

import Search_Area from '../Search_KOL/Search';
import Header from '../Header_KOL/Header';
import Header_Access from '../Header_KOL/Header_access';
import Content_Homepage from '../Content_Homepage_KOL/Content_Homepage';

import Footer from '../../Footer/Footer'


export default function Homepage() {

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FFFFFF',
      },
    },
  });

  function handleClickLogin() {
    navigate('/kols-login');
  }
  function handleClickRegister() {
    navigate('/kols-register');
  }
  function handleClickToChooseRoleBrand() {
    navigate('/brand');
  }


  if (localStorage.access_token == null || localStorage.check_role =='2') {
    return (
      <div sx={{ flexGrow: 1 }}  >
        {/* <Header />
        <Search_Area />
        <Content_Homepage /> */}

        <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
          <Header />
        </div>

        <div style={{ paddingTop: "70px" }}>
          <Search_Area />
        </div>

        <div >
          <Content_Homepage />
        </div>

        <div>
          <Footer />
        </div>
      </div>
    )
  }
  else {
    return (
      <div sx={{ flexGrow: 1 }}  >
        {/* <Header_Access />
        <Search_Area />
        <Content_Homepage /> */}

        <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 10 }}>
          <Header_Access />
        </div>

        <div style={{ paddingTop: "70px" }}>
          <Search_Area />
        </div>

        <div >
          <Content_Homepage />
        </div>

        <div>
          <Footer />
        </div>
      </div>

    )
  }

}


