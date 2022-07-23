import * as React from 'react';
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
//file
import Job_Post_Show_Draft from './Job_Post_Show_Folder/Job_Post_Show_Draft'
import Job_Post_Show_Timer from './Job_Post_Show_Folder/Job_Post_Show_Timer'
import Job_Post_Show_HavePost from './Job_Post_Show_Folder/Job_Post_Show_HavePost'


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

export default function Job_Post_Show(props) {
    const { fbUserID, listPageFB } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);

    };

    return (
        <div>
            <div style={{}}>
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
                            <Tab label="Đã đăng" {...a11yProps(0)} />
                            <Tab label="Đã lên lịch" {...a11yProps(1)} />
                            <Tab label="Bản nháp" {...a11yProps(2)} />
                        </Tabs>
                    </Box>
                </Box>
            </div>
            <div style={{ marginTop: "-1px" }} >
                <div>
                    <div style={{ width: '100%' }}>

                        <TabPanel value={value} index={0}>
                            <Job_Post_Show_HavePost />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Job_Post_Show_Timer />
                        </TabPanel>

                        <TabPanel value={value} index={2}>
                            <Job_Post_Show_Draft
                                listPageFB={listPageFB} fbUserID={fbUserID} />
                        </TabPanel>
                    </div>
                </div>
            </div>
        </div>

    )

}


