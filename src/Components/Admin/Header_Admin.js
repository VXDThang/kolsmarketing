import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { createTheme } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function Header_Admin() {
    const navigate = useNavigate();
    let actoken = localStorage.access_token;
    const theme = createTheme({
        palette: {
            primary: {
                main: '#FFFFFF',
            },
        },
    });



    function handleLogout() {
        navigate('/logout');
    }

    function handleClickJob() {
        navigate('/kols-job');
    }



    return (
        <div sx={{ flexGrow: 1 }}  >
            <AppBar position="static" theme={theme}>
                <Toolbar>

                    <div>
                        <Typography
                            variant="h4"
                            noWrap
                            component="div"
                            sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold', color: "#1b5e20" }}
                        >
                            KOLsMarketing Admin
                        </Typography>

                    </div>
                    <Box sx={{ flexGrow: 1 }} >

                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        <div style={{}}>
                            <Button
                                style={{
                                    textTransform: 'none', backgroundColor: "#00B14F", color: "white",
                                    borderRadius: "25px"
                                }}
                                variant="contained"
                                onClick={handleLogout}>
                                Đăng xuất </Button>
                        </div>
                    </Box>

                </Toolbar>
            </AppBar>
        </div >
    );
}