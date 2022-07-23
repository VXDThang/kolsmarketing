
import React from 'react';
import styled from 'styled-components';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { createTheme } from '@material-ui/core/styles';

//icon
import AssessmentIcon from '@mui/icons-material/Assessment';
import ArticleIcon from '@mui/icons-material/Article';
import ListAltIcon from '@mui/icons-material/ListAlt';



const muiTheme = createTheme({
    overrides: {
        MuiListItem: {
            root: {
                "&$selected": {
                    backgroundColor: "#f44336",
                    "&:hover": {
                        backgroundColor: "orange",
                    },
                },
            },
            button: {
                "&:hover": {
                    backgroundColor: "yellow",
                },
            },
        },
    },
});

const SidebarStyled = styled.div`
  background: #ffffff;
  color: black;
  height: auto;
  border-radius: 0px 10px 10px 0px;
 
`;

export default function Job_Option(props) {
    const [menu, setMenu] = React.useState(0);
    const Click = (event, index) => {
        props.ClickOption(index);
        setMenu(index);
    }

    return (
        <SidebarStyled>
            <div style={{ padding: "10px" }}>
                <div className="d-flex justify-content-center" style={{ fontSize: "18px", fontWeight: "600", paddingBottom: "11px", color:"#800080" }}>
                    Công việc
                </div>
                <div>
                    <Divider />
                </div>
                <List >
                    <ListItemButton
                        sx={{ marginTop: "-0px" }}
                        selected={menu === 0}
                        onClick={(event) => Click(event, 0)}>
                        <ListItemIcon>
                            <AssessmentIcon sx={{ color: "#00B14F", width: 26, height: 26 }} />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ fontSize: '14px', ...(menu == "0" && { fontWeight: 600, color: "#00B14F" }) }} primary="Bảng tin" />
                    </ListItemButton>

                    <ListItemButton
                        selected={menu === 1}
                        onClick={(event) => Click(event, 1)}>
                        <ListItemIcon>
                            <ArticleIcon sx={{ color: "#00B14F", width: 26, height: 26 }} />
                        </ListItemIcon>
                        <ListItemText
                            primaryTypographyProps={{ fontSize: '14px', ...(menu == "1" && { fontWeight: 600, color: "#00B14F" }) }} primary="Danh sách bài viết" />
                    </ListItemButton>

                    <ListItemButton
                        selected={menu === 2}
                        onClick={(event) => Click(event, 2)}>
                        <ListItemIcon>
                            <ListAltIcon sx={{ color: "#00B14F", width: 26, height: 26 }} />
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ fontSize: '14px', ...(menu == "2" && { fontWeight: 600, color: "#00B14F" }) }} primary="Danh sách công việc" />
                    </ListItemButton>
                </List>
            </div>
        </SidebarStyled>
    );
}