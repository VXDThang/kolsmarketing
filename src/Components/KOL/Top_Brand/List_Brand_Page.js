import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DOMAIN_API} from '../../../config/const'
import { useNavigate } from 'react-router-dom';

//icon
import SearchIcon from '@mui/icons-material/Search';

//file
import "./Brand.css";
import Card_Brand from "./Card_Brand"

export default function List_Brand_Page() {
    const navigate = useNavigate();
    let actoken = localStorage.access_token;
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    
    const [list15Brands, setList15Brands] = React.useState([]);
    const [listBrandsMore, setListBrandsMore] = React.useState([]);
    const [loadMore, setLoadMore] = React.useState(false);
    const [haveSearch, setHaveSearch] = React.useState(false);

    //search
    const [values, setValues] = React.useState("");
    const [listBrands, setListBrands] = React.useState([]);

    const handleSeeMore = () => {
        setLoadMore(true);
    }

    const handleShortcut = () => {
        setLoadMore(false);
    }

    async function getListBrand() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `brands/list-brands-more`;
            await fetch(url1, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setListBrands(result);
                        if (result.length > 15) {
                            setList15Brands(result.slice(0, 14));
                            setListBrandsMore(result.slice(15, result.length - 1))
                        }
                        else {
                            setList15Brands(result);
                            setListBrandsMore([]);
                        }
                        setLoading(false);
                        setError(null);
                    }
                )
        }
        catch (error) {
            setError(error)
        }
        finally {
            setLoading(false);
        }
    }

    const handleSearch = () => {
        setLoading(true);
        if (values != "") {
            let listBrandSearch = [];
            for (let i = 0; i < listBrands.length; i++) {
                if (listBrands[i].brand_name.match(new RegExp(values,"gi")) != null) {
                    listBrandSearch.push(listBrands[i])
                }
            }
            if (listBrandSearch.length > 15) {
                setList15Brands(listBrandSearch.slice(0, 14));
                setListBrandsMore(listBrandSearch.slice(15, listBrandSearch.length - 1))
            }
            else {
                setList15Brands(listBrandSearch);
            }
            setLoading(false);
        }
        else {
            setLoading(false);
            if (listBrands.length > 15) {
                setList15Brands(listBrands.slice(0, 14));
                setListBrandsMore(listBrands.slice(15, listBrands.length - 1))
            }
            else {
                setList15Brands(listBrands);
                setListBrandsMore([]);
            }
        }
    }

    const handleSetSearchKey = (event) => {
        if (event.target.value != "") {
            setValues(event.target.value)
        }
        else {
            setValues(event.target.value)
            if (listBrands.length > 15) {
                setList15Brands(listBrands.slice(0, 14));
                setListBrandsMore(listBrands.slice(15, listBrands.length - 1))
            }
            else {
                setList15Brands(listBrands);
                setListBrandsMore([]);
            }
        }
    }


    React.useEffect(() => {
        getListBrand();
    }, [])


    return (
        <div>
            <div className="backGround_search" style={{borderRadius: "5px"}}>
                <div style={{ paddingLeft: "30px", paddingTop: "20px", paddingBottom: "15px",  }}>
                    <div style={{ fontSize: "24px", color: "#329D9C", fontWeight: 600, paddingBottom: "40px" }}>
                        Khám phá 1.000+ Nhãn hàng nổi bật
                    </div>

                    <div style={{ paddingBottom: "15px" }}>
                        Tra cứu thông tin nhãn hàng và tìm kiếm cơ hội làm việc tốt nhất dành cho bạn
                    </div>


                    <div>
                        <FormControl sx={{ width: '400px', backgroundColor: "white", borderRadius: "5px" }} variant="outlined">
                            <InputLabel
                                htmlFor="outlined-search">Tìm kiếm</InputLabel>
                            <OutlinedInput
                                id="outlined-search"
                                type='text'
                                value={values.password}
                                onChange={(event) => { handleSetSearchKey(event) }}

                                endAdornment={
                                    <InputAdornment position="end" >

                                        <Button sx={{
                                            backgroundColor: "#00B14F", textTransform: "none",
                                            "&:hover": { bgcolor: "#A927B0" }, borderRadius: 20
                                        }}
                                            variant="contained"
                                            onClick={handleSearch} >
                                            <SearchIcon />
                                        </Button>

                                    </InputAdornment>
                                }
                                label="Tìm kiếm"
                            />

                        </FormControl>

                    </div>
                </div>
            </div>
            <div className="d-flex justify-content-center" style={{ fontWeight: 600, fontSize: "24px", paddingTop: "20px" }}>
                DANH SÁCH CÁC NHÃN HÀNG 
            </div>
            {loading ?
                <div style={{ paddingTop: "15px" }}>
                    Đang tải dữ liệu ...
                </div>
                : ""}

            <div style={{ paddingTop: "15px" }}>
                <Grid container spacing={2}>

                    {list15Brands.length > 0 && list15Brands.map((list) => (
                        <Grid key={list.id} item xs={4}>
                            <Card_Brand info={list} />
                        </Grid>
                    ))}

                    {loadMore ?
                        listBrandsMore.length > 0 && listBrandsMore.map((list) => (
                            <Grid key={list.id} item xs={4}>
                                <Card_Brand info={list} />
                            </Grid>
                        ))
                        :
                        ""
                    }


                </Grid>
            </div >
            {listBrandsMore.length > 0 ?
                <div>
                    {
                        loadMore ?
                            <div className="d-flex justify-content-center" style={{ paddingTop: "15px", color: "#00B14F", fontWeight: 600, cursor: "pointer" }}
                                onClick={handleShortcut}>
                                Thu gọn ---
                            </div>
                            :
                            <div className="d-flex justify-content-center" style={{ paddingTop: "15px", color: "#00B14F", fontWeight: 600, cursor: "pointer" }}
                                onClick={handleSeeMore}>
                                Xem nhiều hơn ...
                            </div>
                    }
                </div>
                : ""}


        </div >

    );
}
