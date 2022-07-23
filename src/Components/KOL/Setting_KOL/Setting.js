import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';


import Header from '../Header_KOL/Header';
import Header_Access from '../Header_KOL/Header_access';
import Security from './Security';
import General from './General';
import Proposes from './Proposes';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

export default function SettingKOL() {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);

    };

    const navigate = useNavigate();
    if (localStorage.access_token == null || localStorage.check_role =='2') {
        localStorage.setItem("beforeLink", window.location.pathname);
        return (
            <div sx={{ flexGrow: 1 }}  >
                <Header />
                <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "10px" }}>
                    Bạn cần đăng nhập để tiếp tục ...
                </div>


            </div>
        )
    }
    else {
        return (
            <div>
                <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <Header_Access />
                </div>

                <div style={{ paddingTop: "70px" }}>
                    <div className="container"
                        style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px" }}>
                        <Box sx={{ width: '100%' }}>
                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"
                                    TabIndicatorProps={{
                                        style: {
                                            backgroundColor: "#00B14F",
                                            indicatorColor: "#00B14F"
                                        },

                                    }}
                                    textColor="secondary"
                                >
                                    <Tab label="Thông tin của bạn" {...a11yProps(0)} />
                                    <Tab label="Bảo mật & Liên kết" {...a11yProps(1)} />
                                    <Tab label="Đề xuất tài khoản" {...a11yProps(2)} />
                                </Tabs>
                            </Box>
                        </Box>
                    </div>
                </div>

                <div style={{ backgroundColor: "#F0F2F5", marginTop: "-1px" }} >
                    <div sx={{ flexGrow: 1 }}  >

                        <div className="container"
                            style={{ paddingLeft: "4.5%", paddingRight: "4.5%" }}>
                            <Box sx={{ width: '100%' }}>
                                <TabPanel sx={{ backgroundColor: "#F0F2F5" }} value={value} index={0}>
                                    <div style={{ backgroundColor: "#F0F2F5" }}>
                                        <General />
                                    </div>

                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    <Security />
                                </TabPanel>
                                <TabPanel value={value} index={2}>
                                    <Proposes />
                                </TabPanel>
                            </Box>
                        </div>

                    </div>

                </div>
            </div>

        )
    }

}


