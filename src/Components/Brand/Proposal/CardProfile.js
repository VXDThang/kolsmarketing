import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChatIcon from '@mui/icons-material/Chat';
import Tooltip from '@mui/material/Tooltip';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { DOMAIN_API, DOMAIN_FE } from '../../../config/const'

//file
import Modal_See_Profile_Kol from '../../Modals/Brand_See_Profile_Kol';

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));



export default function CardProfile({ infor, idBrand }) {
    let actoken = localStorage.access_token;
    const [expanded, setExpanded] = React.useState(false);
    const [isLike, setIsLike] = React.useState(infor.likeKol ? infor.likeKol : false);

    const [openModalProfileKOL, setOpenModalProfileKOL] = React.useState(false);
    const [idKolToSeeProfile, setIdKolToSeeProfile] = React.useState('');

    const handleClickSeeProfile = (id_kol) => {
        setIdKolToSeeProfile(id_kol);
        setOpenModalProfileKOL(true)
    }

    const handleCloseSeeProfile = () => {
        setIdKolToSeeProfile('');
        setOpenModalProfileKOL(false)
    }

    async function handleOpenRoomMessage() {
        await fetch(DOMAIN_API + `message/open-room`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ iduser: infor.id_kol, role: 1 })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    const url = DOMAIN_FE + `message/${result.id}/${infor.id_kol}/1`;
                    window.open(url);
                }
            )
    }

    async function handleUnLikeKOL() {
        let url1 = "";
        url1 = DOMAIN_API + `brands/unlike-kol`;
        await fetch(url1, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ id_kol: infor.id_kol })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLike(false)
                }
            )
    }

    async function handleLikeKOL() {
        let url1 = "";
        url1 = DOMAIN_API + `brands/like-kol`;
        await fetch(url1, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
            body: JSON.stringify({ id_kol: infor.id_kol })
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLike(true)
                }
            )
    }

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    return (
        <Card sx={{ minwidth: "45%", maxwidth: "45%" }}>
            <CardHeader
                avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe"
                        src={infor.avatar ? infor.avatar : "kol.jpg"}>
                    </Avatar>
                }
                title={infor.full_name ? <span style={{ fontWeight: 500 }}> {infor.full_name} </span> : <span>Influencer </span>}
                subheader={<span>Influencer
                    <span style={{ paddingLeft: "20px", fontWeight: 600 }}>
                        {infor.count_followers} Nhãn hàng theo dõi
                    </span> </span>}
            />
            <CardMedia
                component="img"
                height="360"
                image={infor.image ? infor.image : "kol_propose.jpg"}
                alt="profile"
            />

            <CardActions disableSpacing sx={{}}>
                {isLike ?
                    <Tooltip title="Bỏ quan tâm">
                        <IconButton aria-label="add to favorites" sx={{ width: 36, height: 36, "&:hover": { bgcolor: "#EEEEEE" } }}
                            onClick={handleUnLikeKOL}>
                            <FavoriteIcon sx={{ fontSize: 22, color: "#00B14F" }} />
                        </IconButton>
                    </Tooltip>
                    :
                    <Tooltip title="Quan tâm">
                        <IconButton aria-label="add to favorites" sx={{ width: 36, height: 36, "&:hover": { bgcolor: "#EEEEEE" } }}
                            onClick={handleLikeKOL}>
                            <FavoriteIcon sx={{ fontSize: 22 }} />
                        </IconButton>
                    </Tooltip>
                }

                <Tooltip title="Chat">
                    <IconButton
                        onClick={handleOpenRoomMessage}
                        aria-label="chat"
                        sx={{ width: 36, height: 36, "&:hover": { bgcolor: "#EEEEEE" } }}>
                        <ChatIcon sx={{ fontSize: 22, "&:hover": { color: "#1b74e4" } }} />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Xem trang cá nhân">
                    <IconButton
                        onClick={(event) => handleClickSeeProfile(infor.id_kol)}
                        aria-label="chat"
                        sx={{ width: 36, height: 36, "&:hover": { bgcolor: "#EEEEEE" } }}>
                        <AccountCircleIcon sx={{ fontSize: 22, "&:hover": { color: "#AD5AE0" } }} />
                    </IconButton>
                </Tooltip>

                <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent sx={{ marginTop: "-15px", marginBottom: "-15px" }}>
                    <div style={{ fontSize: "14px", fontWeight: 500 }}>Thông tin chung</div>
                    <Typography variant="body2" color="text.secondary">
                        {infor?.gender ? <span>Giới tính: {infor.gender}</span> : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {infor?.phone ? <span>Điện thoại: {infor.phone}</span> : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {infor?.email ? <span>Email: {infor.email}</span> : ""}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {infor?.address ? <span>Địa chỉ: {infor.address}</span> : ""}
                    </Typography>
                    <div style={{ fontSize: "14px", fontWeight: 500, paddingTop: "10px" }}>Mô tả</div>
                    <Typography paragraph>
                        <pre style={{ display: "block", whiteSpace: "pre-line", fontWeight: 500, fontSize: "14px", fontFamily: "Arial" }}>
                            <Typography variant="body2" color="text.secondary">
                                {infor?.describe ? infor.describe : "Không có thông tin"}
                            </Typography>
                        </pre>
                    </Typography>
                </CardContent>
            </Collapse>

            <Modal_See_Profile_Kol
                idKol={idKolToSeeProfile}
                isOpen={openModalProfileKOL}
                isClose={(value) => handleCloseSeeProfile()} />

        </Card>
    );
}
