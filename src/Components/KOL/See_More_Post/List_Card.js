import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';

//file
import Card_Save from './Card_Save'
import { DOMAIN_API, CLOUDINARY_NAME, PRESET_NAME } from '../../../config/const'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function List_Card({ type }) {

    let actoken = localStorage.access_token;
    const [listCard, setListCard] = React.useState([]);
    const [loading, setLoading] = React.useState(true);



    React.useEffect(() => {
        let url1 = "";
        url1 = DOMAIN_API + 'posts/get-newest-post-more';
        fetch(url1, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',

            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setListCard(result);
                    setLoading(false);
                }
            ).catch(error => {
                console.log("Error: ", error);
            })

    }, [])



    return ( 
        <div >
            <Card sx={{boxShadow:"none"}}>
                <div style={{ backgroundColor: type==1?"#00B14F":"#660066"  }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "40px", paddingBottom: "40px", color: "white" }}>
                        {type == 1 ?
                            <div >
                                <div style={{ fontSize: "24px", fontWeight: 600 }}>
                                    Xem nhiều hơn các cơ hội dành cho bạn
                                </div>
                                <div>
                                    Khám phá nhiều cơ hội hơn giúp bạn có những việc làm ứng ý.
                                </div>
                            </div> : ""}
                        {type == 2 ?
                            <div>
                                <div style={{ fontSize: "24px", fontWeight: 600 }}>
                                    Xem nhiều hơn các cơ hội hấp dẫn
                                </div>
                                <div>
                                    Khám phá nhiều cơ hội hơn giúp bạn có những việc làm ứng ý.
                                </div>
                            </div> : ""}


                    </div>
                </div>
                <div style={{ border: type==1? '0.1em solid #00B14F' : '0.1em solid #660066'  }} >
                    {loading ?
                        <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px", paddingBottom: "-10px" }}>
                            Đang tải dữ liệu ...
                        </div>
                        : ""}
                    {/* <div div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px" }}>
                        Danh sách <span style={{ fontWeight: 600 }}>{listSave.length}</span> cơ hội đã lưu
                    </div>
                    <Divider /> */}
                    <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px", paddingBottom: "10px" }}>
                        {listCard.length > 0 && listCard.map((list, index) => (
                            <div key={list.id}>
                                <Card_Save id={list.id} idBrand={list.id_writer}
                                    title={list.title} brandName={list.brand_info.name} time={list.write_time}
                                    address={list.address} hot={list.hot} cast={list.max_cast ? list.max_cast : list.min_cast}
                                    image_cover={list.image_cover}
                                    likePost={list.likePost} />
                            </div>
                        ))}
                    </div>

                </div>
            </Card >
        </div >
    );
}
