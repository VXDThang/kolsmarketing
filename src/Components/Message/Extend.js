import React from 'react'
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Extend(props) {
    const [open_member, setOpen_member] = React.useState(true);
    const [open_file, setOpen_file] = React.useState(true);

    const handleClick_OpenMember = () => {
        setOpen_member(!open_member);
    };
    const handleClick_OpenFile = () => {
        setOpen_file(!open_file);
    };
    return (
        <div >
            <div className="d-flex justify-content-center" style={{ paddingTop: "5px" }}>
                
                <Avatar alt="Remy Sharp" src=  {props.OtherAvatar?props.OtherAvatar:""}
                sx={{width:"100px", height:"100px"}} />
                
            </div>
            <div className="d-flex justify-content-center" style={{ paddingTop: "10px", fontWeight: 600, fontSize: "18px" }}>
                {props.OtherName}
            </div>

            <List>
                <ListItemButton onClick={handleClick_OpenFile}>
                    <ListItemText primary="File đã chia sẻ" />
                    {open_file ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>

            </List>
        </div>
    )
}
