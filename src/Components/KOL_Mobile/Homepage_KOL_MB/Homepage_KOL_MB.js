import * as React from 'react';
import { useState, useEffect } from "react";
import { createTheme } from '@mui/material/styles';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import Divider from '@mui/material/Divider';

import Header from '../Header/Header_Guess';
import Header_Access from '../Header/Header_Login';

import Search_Area from '../Search_KOL_MB/Search'

import Ads1 from '../Ads_MB/Ads_KOL_1';
import Content_Homepage from '../Content_Homepage_MB/Content_Homepage';
import Footer from '../Footer_MB/Footer'

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

  if (localStorage.access_token == null || localStorage.check_role == '2') {
    return (
      <div sx={{ flexGrow: 1 }}  >
        {/* <Header />
        <Search_Area />
        <Content_Homepage /> */}

        <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
          <Header />
          <div style={{}}>
            <Divider sx={{ color: "#00B14F" }} />
          </div>
        </div>

        <div style={{ paddingTop: "70px" }}>
          <Search_Area />
        </div>

        <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "20px" }}>
          <Ads1 />
        </div>
        <div style={{ paddingBottom: "10px" }}>
          <Content_Homepage />
        </div>
        <div >
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
          <div style={{}}>
            <Divider sx={{ color: "#00B14F" }} />
          </div>
        </div>

        <div style={{ paddingTop: "70px" }}>
          <Search_Area />
        </div>

        <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
          <Ads1 />
        </div>
        <div style={{ paddingBottom: "10px" }} >
          <Content_Homepage />
        </div>
        <div>
          <Footer />
        </div>

      </div>

    )
  }

}


