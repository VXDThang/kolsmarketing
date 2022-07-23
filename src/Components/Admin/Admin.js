import * as React from 'react';
import { useState, useEffect } from "react";
import { useNavigate, Navigate, BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

//-----
import ListAdmin from './ListAdmin/ListAdmin';
import ListBrand from './ListBrands/ListBrand';
import ListKol from './ListKols/ListKol';
import ListCate from './ListCate/ListCate';
import ListPost from './ListPost/ListPost';


//file
import Header_Admin from './Header_Admin';

export default function Admin() {
    const [value, setValue] = React.useState("0");
    const navigate = useNavigate();

    const [isAdmin, setIsAdmin] = React.useState(localStorage.getItem('check_admin'))
    const handleChange = (event, newValue) => {

        setValue(newValue);
    };

    useEffect(() => {

        handleChange()
    }, []);

    //Nếu không phải admin thì không được vào trang admin
    if (isAdmin == null) {
        if (localStorage.getItem("check_role") == '2') {
            return (
                <Navigate to="/brand-user" />
            )
        }
        return (
            <Navigate to="/" />
        )
    }
    if (isAdmin == 'false') {
        if (localStorage.getItem("check_role") == '2') {
            return (
                <Navigate to="/brand-user" />
            )
        }
        return (
            <Navigate to="/" />
        )
    }
    else {
        return (
          
            <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
                <div>
                <Header_Admin/>
                </div>
                <Tabs value={value} onChange={handleChange} centered>
                    <Tab active label="Danh sách Admin" />
                    <Tab label="Danh sách KOLs" />
                    <Tab label="Danh sách nhãn hàng" />
                    <Tab label="Danh sách lĩnh vực" />
                    <Tab label="Danh sách bài đăng" />
                </Tabs>
                <div>
                    {value == "0" && < ListAdmin />}
                    {value == "1" && < ListKol />}
                    {value == "2" && < ListBrand />}
                    {value == "3" && < ListCate />}
                    {value == "4" && < ListPost />}

                    

                </div>
            </Box>
        );
    }

}