import React from 'react';
import styled from 'styled-components';
import Grid from '@mui/material/Grid';

//file
import List_LikeKOL from './List_LikeKOL';
import Profile_KOL from './Profile_KOL';



const SidebarStyled = styled.div`
  background: #f0f2f5;
  color: black;
  min-height:calc(100vh - 105px);
  font-size: 14px;
 
`;

export default function Like_KOL() {
    const [idKolChoice, setIdKolChoice] = React.useState(0);



    return (
        <SidebarStyled>
            <div>
                <Grid container >

                    <Grid item xs={4.5}>
                        <List_LikeKOL
                            idKolSelect={(value) => setIdKolChoice(value)}
                        />
                    </Grid>

                    <Grid item xs={7.5} sx={{ paddingRight: "20px" }}>
                        <Profile_KOL
                            idKolChoice={idKolChoice}
                        />
                    </Grid>



                </Grid>
            </div>
        </SidebarStyled>
    );
}