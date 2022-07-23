import React, { useState } from 'react';
import styled from 'styled-components';
import { DOMAIN_API } from '../../../config/const'
//file
import CardProfile from './CardProfile';
import './test.css'

import Grid from '@mui/material/Grid';

const divPage = styled.div`

  background: #f0f2f5;
  height:calc(100vh - 65px);

`;


export default function NewsProposal({idBrand}) {
    let actoken = localStorage.access_token;
    const [openBoxChat, setOpenBoxChat] = React.useState(false);
    const [listCardKOL, setListCardKOL] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(false);


    const handleClickChat = (value) => {
        setOpenBoxChat(value)
    };

    async function getListCardKOL() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `cardkols/get-all-card`;
            await fetch(url1, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setLoading(true);
                        setListCardKOL(result);
                        setError(null);
                    }
                )
        }
        catch (error) {
            // setError(error)
        }
        finally {
            setLoading(false);
        }
    }
    React.useEffect(() => {
        getListCardKOL();
    }, [])

    if (loading)
        return (
            <div>
                Đang tải dữ liệu
            </div>
        )
    else {
        return (
            <divPage style={{backgroundColor: "#f0f2f5"}}> 
                <div>
                    <Grid container spacing={2}>
                        {listCardKOL?.length > 0 && listCardKOL.map((list, index) => (
                            <Grid key={index} item xs={6}>
                                <CardProfile infor={list} idBrand={idBrand}/>
                            </Grid>
                        ))}
                        {/* <Grid item xs={6}>
                            <CardProfile />
                        </Grid> */}

                        {/* <Grid item xs={6}>
                        <CardProfile />
                    </Grid>
                    <Grid item xs={6}>
                        <CardProfile />
                    </Grid>
                    <Grid item xs={6}>
                        <CardProfile />
                    </Grid>
                    <Grid item xs={6}>
                        <CardProfile />
                    </Grid>
                    <Grid item xs={6}>
                        <CardProfile />
                    </Grid>
                    <Grid item xs={6}>
                        <CardProfile />
                    </Grid>
                    <Grid item xs={6}>
                        <CardProfile />
                    </Grid> */}
                    </Grid>
                </div>
                {/* <div>
                {openBoxChat && <BoxChat/>}
            </div> */}
            </divPage>
        );
    }
}