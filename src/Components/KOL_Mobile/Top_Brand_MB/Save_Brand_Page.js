import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { DOMAIN_API } from '../../../config/const'
import Divider from '@mui/material/Divider';

//icon
import SearchIcon from '@mui/icons-material/Search';

//file
import "./Brand.css";
import Card_Brand from "./Card_Brand"
import Header from '../Header/Header_Guess';
import Header_Access from '../Header/Header_Login';
import Footer from '../Footer_MB/Footer'

export default function Save_Brand_Page() {
    let actoken = localStorage.access_token;
    const [error, setError] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [listSaveBrand, setListSaveBrand] = React.useState([]);

    //search
    const [values, setValues] = React.useState("");
    const [listBrands, setListBrands] = React.useState([]);

    async function getListSaveBrand() {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `kols/get-brand-user-like`;
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
                        setListSaveBrand(result);
                        setListBrands(result);
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

    React.useEffect(() => {
        getListSaveBrand();
    }, [])


    const handleSearch = () => {
        setLoading(true);
        if (values != "") {
            let listBrandSearch = [];
            for (let i = 0; i < listBrands.length; i++) {
                if (listBrands[i].brand_name.match(new RegExp(values, "gi")) != null) {
                    listBrandSearch.push(listBrands[i])
                }
            }

            setListSaveBrand(listBrandSearch);
            setLoading(false);
        }
        else {
            setLoading(false);
            setListSaveBrand(listBrands);
        }
    }


    const handleSetSearchKey = (event) => {
        if (event.target.value != "") {
            setValues(event.target.value)
        }
        else {
            setValues(event.target.value)
            setListSaveBrand(listBrands);
        }
    }



    if (localStorage.access_token == null || localStorage.check_role == '2') {
        localStorage.setItem("beforeLink", window.location.pathname);
        return (
            <div sx={{ flexGrow: 1 }}  >
                <Header />
                <div style={{}}>
                    <Divider sx={{ color: "#00B14F" }} />
                </div>
                <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "10px", paddingBottom: "10px" }}>
                    Bạn cần đăng nhập để tiếp tục ...
                </div>
                <div>
                    <Footer />
                </div>

            </div>
        )
    }
    else {
        return (
            <div sx={{ flexGrow: 1 }}  >
                <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
                    <Header_Access />
                    <div style={{}}>
                        <Divider sx={{ color: "#00B14F" }} />
                    </div>
                </div>

                <div style={{ paddingTop: "70px" }}>
                    <div  style={{ paddingLeft: "20px", paddingRight: "20px", paddingTop: "20px", paddingBottom: "20px" }}>
                        <div>

                            <div className="backGround_search" style={{ borderRadius: "5px" }}>
                                <div style={{ paddingLeft: "10px",paddingRight:"10px", paddingTop: "20px", paddingBottom: "15px" }}>
                                    <div style={{ fontSize: "24px", color: "#329D9C", fontWeight: 700, paddingBottom: "40px" }}>
                                        DANH SÁCH CÁC NHÃN HÀNG ĐÃ LƯU
                                    </div>

                                    <div style={{ paddingBottom: "15px" }}>
                                        Tra cứu tên nhãn hàng
                                    </div>


                                    <div>
                                        <FormControl sx={{ width: '100%', backgroundColor: "white", borderRadius: "5px" }} variant="outlined">
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

                            <div style={{ paddingTop: "15px" }}>
                                <Grid container spacing={2}>

                                    {listSaveBrand.length > 0 && listSaveBrand.map((list) => (
                                        <Grid key={list.id} item xs={12}>
                                            <Card_Brand info={list} />
                                        </Grid>
                                    ))}
                                </Grid>
                            </div >
                        </div>
                    </div>
                </div>

                <div>
                    <Footer />
                </div>

            </div>
        );
    }
}
