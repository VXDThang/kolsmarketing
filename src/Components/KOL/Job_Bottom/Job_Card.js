import * as React from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Test_Card_Job from "./test_card_job";
import { DOMAIN_API } from '../../../config/const'
import { useNavigate } from 'react-router-dom';

//icon
import AddCircleIcon from '@mui/icons-material/AddCircle';

const Job_Card = ({ id,name }) => {
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const navigate = useNavigate();
    const [listPost, setListPost] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    let actoken = localStorage.access_token;

    const   handleSeeMorePostInCate=() =>{
        navigate(`/search/${id}/none/${name}/none`);
    }
  

    async function getAllCate() {
        setLoading(true);
        try {
            let url1 = "";
            url1 = DOMAIN_API + `posts/get-new-post-by-cate-more/${id}`;
            await fetch(url1, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                },
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        if (result.length > 15) {
                            setListPost(result.slice(0, 11));
                        }
                        else {
                            setListPost(result);
                        }
                        setLoading(false);
                    }
                )
        }
        catch (error) {
            console.log("error: ", error)
        }
        finally {
            setLoading(false);
        }
    }

    React.useEffect(() => {
        getAllCate();
    }, [id])


    return (
        <div >
            {loading ?
                <div>
                    Đang tải dữ liệu ...
                </div>
                :
                <Grid container spacing={2}>
                    {listPost.length > 0 && listPost.map((list, index) => (
                        <Grid item xs={6} key={list.id}   >
                            <Test_Card_Job id={list.id}
                                title={list.title} brandName={list.brand.name} time={list.write_time}
                                address={list.address} hot={list.hot} cast={list.max_cast ? list.max_cast : list.min_cast}
                                image_cover={list.image_cover} likePost={list.likePost} brand_id={list.brand.id}
                            />
                        </Grid>

                    ))}
                </Grid>

            }


            <div className="d-flex justify-content-center" style={{ marginBottom: "-15px", paddingTop: "10px" }}>
                <Button onClick={handleSeeMorePostInCate}
                 variant="text" style={{ textTransform: 'capitalize', color: "#00B14F", fontWeight: 600 }} startIcon={<AddCircleIcon />}>
                    Xem nhiều hơn
                </Button>
            </div>
        </div>


    );
};


export default Job_Card;