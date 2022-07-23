import * as React from 'react';
import Divider from '@mui/material/Divider';
import Card from '@mui/material/Card';

//file
import Card_have from './Card_Have'


export default function List_Card_have({ listRe }) {
    const [listWait, setListWait] = React.useState([]);
    const [listWork, setListWork] = React.useState([]);
    const [listNope, setListNope] = React.useState([]);
    const [listDone, setListDone] = React.useState([]);
    let Wait = [];
    let Work = [];
    let Nope = [];
    let Done = [];
    React.useEffect(() => {
        if (listRe.length > 0) {
            for (let i = 0; i < listRe.length; i++) {
                if (listRe[i].state_recruitment == "1")
                    Wait.push(listRe[i]);
                if (listRe[i].state_recruitment == "2")
                    Nope.push(listRe[i]);
                if (listRe[i].state_recruitment == "3")
                    Work.push(listRe[i]);
                if (listRe[i].state_recruitment == "4")
                    Done.push(listRe[i]);
            }
            setListWait(Wait);
            setListWork(Work);
            setListNope(Nope);
            setListDone(Done);
        }
    }, [])

    return (
        <div>
            <Card>
                <div style={{ backgroundColor: "#00B14F" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "40px", paddingBottom: "40px", color: "white" }}>
                        <div style={{ fontSize: "24px", fontWeight: 600 }}>
                            Cơ hội đã ứng tuyển
                        </div>
                        <div>
                            Xem lại danh sách những cơ hội mà bạn đã ứng tuyển.
                        </div>
                    </div>
                </div>
                <div >
                    <div style={{ borderRight: '0.2em solid #0000FF' }}>
                        <div style={{
                            paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px",
                            color: "#0000FF", fontWeight: 600
                        }}>
                            Danh sách <span style={{ fontWeight: 800 }}>{listWait.length}</span> cơ hội đang chờ phản hồi
                        </div>

                        <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingBottom: "10px" }}>
                            {listWait.length > 0 && listWait.map((list) => (
                                <div key={list.id}>
                                    <Card_have
                                        idPost={list.id}
                                        idBrand={list.id_writer}
                                        title={list.title}
                                        cover={list.image_cover ? list.image_cover : "cover_image_post.jpg"}
                                        brand_name={list.brand.name}
                                        write_time={list.write_time}
                                        cast={list.min_cast == list.max_cast ? list.min_cast : list.max_cast}
                                        address={list.address}
                                    />
                                </div>
                            ))}
                        </div>
                        {/* <Divider orientation="vertical" /> */}

                    </div>

                    <Divider />

                    <div style={{ borderLeft: '0.2em solid #00B14F' }}>
                        <div style={{
                            paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px",
                            color: "#00B14F", fontWeight: 600
                        }}>
                            Danh sách <span style={{ fontWeight: 800 }}>{listWork.length}</span> cơ hội đang làm việc
                        </div>

                        <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingBottom: "10px" }}>
                            {listWork.length > 0 && listWork.map((list) => (
                                <div key={list.id}>
                                    <Card_have
                                        idPost={list.id}
                                        idBrand={list.id_writer}
                                        title={list.title}
                                        cover={list.image_cover ? list.image_cover : "cover_image_post.jpg"}
                                        brand_name={list.brand.name}
                                        write_time={list.write_time}
                                        cast={list.min_cast == list.max_cast ? list.min_cast : list.max_cast}
                                        address={list.address} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Divider />

                    <div style={{ borderRight: '0.2em solid #DD0000' }}>
                        <div style={{
                            paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px",
                            color: "#DD0000", fontWeight: 600
                        }}>
                            Danh sách <span style={{ fontWeight: 800 }}>{listNope.length}</span> cơ hội bị từ chối
                        </div>

                        <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingBottom: "10px" }}>
                            {listNope.length > 0 && listNope.map((list) => (
                                <div key={list.id}>
                                    <Card_have
                                        idPost={list.id}
                                        idBrand={list.id_writer}
                                        title={list.title}
                                        cover={list.image_cover ? list.image_cover : "cover_image_post.jpg"}
                                        brand_name={list.brand.name}
                                        write_time={list.write_time}
                                        cast={list.min_cast == list.max_cast ? list.min_cast : list.max_cast}
                                        address={list.address} />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Divider />

                    <div style={{ borderLeft: '0.2em solid #800080' }}>
                        <div style={{
                            paddingLeft: "20px", paddingRight: "20px", paddingTop: "10px", paddingBottom: "10px",
                            color: "#800080", fontWeight: 600
                        }}>
                            Danh sách <span style={{ fontWeight: 800 }}>{listDone.length}</span> cơ hội đã kết thúc
                        </div>

                        <div style={{ paddingLeft: "20px", paddingRight: "20px", paddingBottom: "10px" }}>
                            {listDone.length > 0 && listDone.map((list) => (
                                <div key={list.id}>
                                    <Card_have
                                        idPost={list.id}
                                        idBrand={list.id_writer}
                                        title={list.title}
                                        cover={list.image_cover ? list.image_cover : "cover_image_post.jpg"}
                                        brand_name={list.brand.name}
                                        write_time={list.write_time}
                                        cast={list.min_cast == list.max_cast ? list.min_cast : list.max_cast}
                                        address={list.address} />
                                </div>
                            ))}
                        </div>
                    </div>


                </div>
            </Card>
        </div>
    );
}
