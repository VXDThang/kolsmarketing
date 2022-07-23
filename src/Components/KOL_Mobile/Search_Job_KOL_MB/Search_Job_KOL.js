import * as React from 'react';
import { createTheme } from '@mui/material/styles';

import Search_Area from '../Search_KOL_MB/Search';
import Result_Search from './Result_Search/Result_Search';
import Divider from '@mui/material/Divider';

import Header from '../Header/Header_Guess';
import Header_Access from '../Header/Header_Login';
import Footer from '../Footer_MB/Footer'


export default function Search_Jon_KOL() {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#FFFFFF',
            },
        },
    });

    React.useEffect(() => {
    }, [])



    if (localStorage.access_token == null || localStorage.check_role =='2') {
        localStorage.setItem("beforeLink", window.location.pathname);
        return (
            <div sx={{ flexGrow: 1 }}  >
                <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <Header />
                    <div style={{}}>
                        <Divider sx={{ color: "#00B14F" }} />
                    </div>
                </div>
                <div style={{ paddingTop: "70px" }}>
                    <Search_Area />
                </div>

                <div style={{ backgroundColor: "#eefff6" }}>
                    <Result_Search />
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
                <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <Header_Access />
                    <div style={{}}>
                        <Divider sx={{ color: "#00B14F" }} />
                    </div>
                </div>
                <div style={{ paddingTop: "70px" }}>
                    <Search_Area />
                </div>

                <div style={{ backgroundColor: "#eefff6" }}>
                    <Result_Search />
                </div>

                <div>
                    <Footer />
                </div>

            </div>

        )
    }

}


