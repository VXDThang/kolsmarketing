import * as React from 'react';
import { createTheme } from '@mui/material/styles';

import Search_Area from '../Search_KOL/Search';
import Header from '../Header_KOL/Header';
import Header_Access from '../Header_KOL/Header_access';
import Result_Search from './Result_Search/Result_Search';
import Footer from '../../Footer/Footer'


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


