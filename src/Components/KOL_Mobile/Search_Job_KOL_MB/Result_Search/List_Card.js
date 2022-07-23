import * as React from 'react';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
//file
import Card_Save from './Card_Save';


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function List_Card({ type,listSearchPost }) {

    let actoken = localStorage.access_token;
    const [listCard, setListCard] = React.useState(listSearchPost);
    const [loading, setLoading] = React.useState(true);



    React.useEffect(() => {
        setListCard(listSearchPost)

    }, [listSearchPost])



    return ( 
        <div >
                <div >
                    
                    {/* <div div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px" }}>
                        Danh sách <span style={{ fontWeight: 600 }}>{listSave.length}</span> cơ hội đã lưu
                    </div>
                    <Divider /> */}
                    <div style={{ paddingLeft: "15px", paddingRight: "15px", paddingTop: "20px", paddingBottom: "10px" }}>
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
        </div >
    );
}
