import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { DOMAIN_API } from '../../../config/const'
import Divider from '@mui/material/Divider';

//file
import Header from '../Header/Header_Guess';
import Header_Access from '../Header/Header_Login';
import Footer from '../Footer_MB/Footer';

import List_Card from './List_Card';
import Offer_Card from './Offer_Card';


export default function Save_Opportunity() {
    const [value, setValue] = React.useState(0);
    let actoken = localStorage.access_token;
    const [error, setError] = React.useState(null);
    const [loadingSuggestPost, setLoadingSuggestPost] = React.useState(true);
    const [listSuggestPost, setListSuggestPost] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    async function getListSuggestPost() {
        try {
            let url2 = "";
            url2 = DOMAIN_API + `posts/get-suggest-post-not-dup-save-recruit`;
            await fetch(url2, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.length > 5)
                            setListSuggestPost(result.slice(0, 5));
                        else
                            setListSuggestPost(result)
                        setLoadingSuggestPost(false);
                        setError(null);
                    }
                )
        }
        catch (error) {
            setError(error)
        }
        finally {
            setLoadingSuggestPost(false);
        }
    }
    React.useEffect(() => {
        getListSuggestPost();
    }, [])



    if (localStorage.access_token == null || localStorage.check_role == '2') {
        localStorage.setItem("beforeLink", window.location.pathname);
        return (
            <div sx={{ flexGrow: 1 }}  >
                <Header />
                <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "10px" }}>
                    Bạn cần đăng nhập để tiếp tục ...
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
                    <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <List_Card />
                            </Grid>
                            <Grid item xs={12}>
                                <Card sx={{}}>
                                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                                        <div style={{ fontSize: "18px", fontWeight: 600, paddingBottom: "10px", paddingTop: "10px" }}>
                                            Có thể bạn quan tâm
                                        </div>
                                        {loadingSuggestPost ?
                                            <div>
                                                Đang tải dữ liệu ...
                                            </div>
                                            :
                                            <div>
                                                {listSuggestPost.length > 0 && listSuggestPost.map((list, index) => (
                                                    <div key={index}>
                                                        <Offer_Card detail={list} />
                                                    </div>
                                                ))}
                                            </div>
                                        }
                                    </div>
                                </Card>

                            </Grid>

                        </Grid>
                    </div>
                </div>

                <div style={{paddingTop:"10px"}}>
                    <Footer />
                </div>

            </div>
        );
    }
}