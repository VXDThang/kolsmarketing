import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';

//file
import Card_Save from './Card_Save'
import { DOMAIN_API } from '../../../config/const'


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function List_Card_Save() {

    let actoken = localStorage.access_token;
    const [listSave, setListSave] = React.useState([]);



    React.useEffect(() => {
        let url1 = "";
        url1 = DOMAIN_API + 'posts/get-post-user-like';
        fetch(url1, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                "x-access-token": actoken
            },
        })
            .then(res => res.json())
            .then(
                (result) => {
                    setListSave(result);
                }
            ).catch(error => {
                console.log("Error: ", error);
            })

    }, [])

    const handleDeleteCard = (value) => {
        const listC1 = listSave.slice(0, value);
        const listC2 = listSave.slice(value + 1, listSave.length);
        const new_list = listC1.concat(listC2);
        setListSave(new_list);
    };

    return (
        <div>
            <Card>
                <div style={{ backgroundColor: "#00B14F" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "40px", paddingBottom: "40px", color: "white" }}>
                        <div style={{ fontSize: "24px", fontWeight: 600 }}>
                            Cơ hội đã lưu
                        </div>
                        <div>
                            Xem lại danh sách những cơ hội mà bạn đã lưu trước đó. Ứng tuyển ngay để không bỏ lỡ cơ hội dành cho bạn.
                        </div>
                    </div>
                </div>
                <div >
                    <div div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px" }}>
                        Danh sách <span style={{ fontWeight: 600 }}>{listSave.length}</span> cơ hội đã lưu
                    </div>
                    <Divider />
                    <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px", paddingBottom: "10px" }}>
                        {listSave.length > 0 && listSave.map((list, index) => (
                            <div key={list.id}>
                            <Card_Save id={list.id} idBrand={list.id_writer}
                             title={list.title} brandName={list.brand.name} time={list.write_time}
                             address={list.address} hot={list.hot} cast={list.max_cast ? list.max_cast : list.min_cast}
                             image_cover={list.image_cover} 
                             index={index} isDeleteCard={(value) => handleDeleteCard(value)} />
                            </div>
                        ))}
                    </div>

                </div>
            </Card >
        </div >
    );
}
