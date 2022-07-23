import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
//file
import Edit_Info from './Edit_Info'
import Bio_Link from './Bio_Link'
import Describe from './Describe'
import Initial from './Initial'
import List_Image from './List_Image'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
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
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}


export default function Edit_Profile(props) {
    const { profile, isOpen, isClose } = props;
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const handleClose = (value) => {
        isClose(value);
    };


    return (
        <div>
            <Dialog
                fullWidth
                open={isOpen}
                onClose={handleClose}
                aria-labelledby="draggable-dialog-title"
            >
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 600 }}
                >
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Hồ sơ" {...a11yProps(0)} />
                        <Tab label="Giới thiệu" {...a11yProps(1)} />
                        <Tab label="Bio link" {...a11yProps(2)} />
                        <Tab label="Mô tả" {...a11yProps(3)} />
                        <Tab label="Ảnh" {...a11yProps(4)} />
                       
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <Initial
                        isCloseModal={(value) => handleClose(value)}
                        profile={profile} />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <Edit_Info 
                        isCloseModal={(value) => handleClose(value)}
                        profile={profile} />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <Bio_Link
                        isCloseModal={(value) => handleClose(value)} 
                        profile={profile.bio_url} />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <Describe
                        isCloseModal={(value) => handleClose(value)}
                        describeProfile={profile.introduce} />
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <List_Image
                         isCloseModal={(value) => handleClose(value)}
                         imageList={profile.detail_images} />
                    </TabPanel>
                    
                </Box>
            </Dialog>
        </div>
    );
}
