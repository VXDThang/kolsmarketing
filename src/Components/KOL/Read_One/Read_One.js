import * as React from 'react';
import { useParams } from 'react-router-dom';

//file
import Search_Area from '../Search_KOL/Search';
import Header from '../Header_KOL/Header';
import Header_Access from '../Header_KOL/Header_access';
import Content_News from './Content_News';

import Footer from '../../Footer/Footer'


export default function Read_One() {

    const { id } = useParams();

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
                <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <Header_Access />
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