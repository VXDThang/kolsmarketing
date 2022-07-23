import * as React from 'react';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Divider from '@mui/material/Divider';
//file
import Search_Area from '../Search_KOL_MB/Search';
import Header from '../Header/Header_Guess';
import Header_Access from '../Header/Header_Login';
import Content_News from './Content_News';

import Footer from '../Footer_MB/Footer'


export default function Read_One() {

    const navigate = useNavigate();
    const { id } = useParams();
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
        localStorage.setItem("beforeLink", window.location.pathname);
        return (
            <div sx={{ flexGrow: 1 }}  >

                <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <Header />
                    <div style={{}}>
                        <Divider sx={{ color: "#00B14F" }} />
                    </div>
                </div>

                {/* <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "10px" }}>
                    Bạn cần đăng nhập để tiếp tục ...
                </div> */}

                <div style={{ paddingTop: "70px" }}>
                    <Search_Area />
                </div>

                <div >
                    <Content_News idPost={id} />
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
            <Content_News idPost={id}/> */}

                <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <Header_Access />
                    <div style={{}}>
                        <Divider sx={{ color: "#00B14F" }} />
                    </div>
                </div>

                <div style={{ paddingTop: "70px" }}>
                    <Search_Area />
                </div>

                <div >
                    <Content_News idPost={id} />
                </div>

                <div>
                    <Footer />
                </div>

            </div>
        );
    }
}