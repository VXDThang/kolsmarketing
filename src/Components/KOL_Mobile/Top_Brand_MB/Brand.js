import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

import List_Brand_Page from './List_Brand_Page';
import Top_Brand_Page from './Top_Brand_Page';

//file
import Header from '../Header/Header_Guess';
import Header_Access from '../Header/Header_Login';
import Footer from '../Footer_MB/Footer';

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


export default function Brand_Page() {



    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    if (localStorage.access_token == null || localStorage.check_role =='2') {
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
                    <div style={{  paddingTop: "10px", paddingBottom: "10px" }}>
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
                                    <Tab label="Danh sách nhãn hàng" {...a11yProps(0)} />
                                    <Tab label="Top nhãn hàng" {...a11yProps(1)} />
                                </Tabs>
                            </Box>
                            <TabPanel value={value} index={0}>
                                <List_Brand_Page />
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Top_Brand_Page />
                            </TabPanel>
                        </Box>
                    </div>
                </div>

                <div>
                    <Footer />
                </div>

            </div>
        );
    }
}