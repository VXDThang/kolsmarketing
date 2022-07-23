import * as React from 'react';
import Button from '@mui/material/Button';
import "./Search.css"
import { useState } from "react";
import { MultiSelect } from "react-multi-select-component";
import Grid from '@mui/material/Grid';
import { DOMAIN_API } from '../../../config/const'
import { useNavigate } from 'react-router-dom';

//icon
import SearchIcon from '@mui/icons-material/Search';
import ApartmentIcon from '@mui/icons-material/Apartment';
import Box from '@mui/material/Box';
import GpsFixedIcon from '@mui/icons-material/GpsFixed';


const StringOverride = {
  "allItemsAreSelected": "Đã chọn tất cả ...",
  "clearSearch": "Clear Search",
  "clearSelected": "Clear Selected",
  "noOptions": "No options",
  "search": "Tìm kiếm",
  "selectAll": "Chọn tất cả",
  "selectAllFiltered": "Chọn tất cả",
  "selectSomeItems": "Tìm kiếm ...",
  "create": "Create",
}



const Search_Area = () => {
  let actoken = localStorage.access_token;
  const navigate = useNavigate();
  const [selectedCate, setSelectedCate] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState([]);
  const [categories, setCategories] = useState([]);
  const [provinces, setProvince] = useState([]);


  const handleSearch = () => {

    let messageSearchCate = ""
    let searchCate = "";
    if (selectedCate.length > 0) {
      for (let i = 0; i < selectedCate.length; i++) {
        if (i == 0) {
          searchCate = selectedCate[i].value;
        }
        else {
          searchCate = searchCate + "-" + selectedCate[i].value;
        }

        if (messageSearchCate.length > 0) {
          messageSearchCate = messageSearchCate + ", " + selectedCate[i].label
        }
        else {
          messageSearchCate = selectedCate[i].label
        }
      }

    }
    else {
      searchCate = "none";
      messageSearchCate = "none";
    }


    let messageSearchAddress = ""
    let searchProvince = "";
    if (selectedProvince.length > 0) {
      for (let i = 0; i < selectedProvince.length; i++) {
        if (i == 0) {
          searchProvince = selectedProvince[i].value;
        }
        else {
          searchProvince = searchProvince + "-" + selectedProvince[i].value;
        }

        if (messageSearchAddress.length > 0) {
          messageSearchAddress = messageSearchAddress + ", " + selectedProvince[i].label
        }
        else {
          messageSearchAddress = selectedProvince[i].label
        }

      }
    }
    else {
      messageSearchAddress = "none"
      searchProvince = "none"
    }
    navigate(`/search/${searchCate}/${searchProvince}/${messageSearchCate}/${messageSearchAddress}`);
  }

  async function getAllCate() {
    try {
      let url1 = "";
      url1 = DOMAIN_API + `categories/all-cate`;
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
            let list = [];
            for (let i = 0; i < result.length; i++) {
              list.push({ "label": result[i].name, "value": result[i].id })
            }
            setCategories(list);
          }
        )
    }
    catch (error) {
      console.log("error: ", error)
    }
    finally {
    }
  }

  async function getAllProvince() {
    try {
      let url1 = "";
      url1 = DOMAIN_API + `list-province-vn`;
      await fetch(url1, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            let list = [];
            for (let i = 0; i < result.length; i++) {
              list.push({ "label": result[i].name, "value": result[i].id })
            }
            setProvince(list);
          }
        )
    }
    catch (error) {
      console.log("error: ", error)
    }
    finally {
    }
  }

  React.useEffect(() => {
    getAllCate();
    getAllProvince();
  }, [])

  return (
    <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
      <Box >

        <Grid container spacing={3}>
          <Grid item xs={5}>
            <h6>Lĩnh vực <GpsFixedIcon sx={{ fontSize: 28, paddingBottom: 1, color: "#00B14F" }} /></h6>
          </Grid>
          <Grid item xs={4}>
            <div>
              <h6>Thành phố <ApartmentIcon sx={{ fontSize: 30, paddingBottom: 1, color: "#00B14F" }} /></h6>

            </div>
          </Grid>
          <Grid item xs={2}>
          </Grid>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={5}>
            <div>
              <div style={{ width: "95%", color: "succsess" }}>
                <MultiSelect
                  overrideStrings={StringOverride}
                  options={categories}
                  value={selectedCate}
                  onChange={setSelectedCate}
                  labelledBy="XXXX"
                />
              </div>
            </div>

          </Grid>
          <Grid item xs={5}>
            <div>
              <div style={{ width: "95%", color: "succsess" }}>
                <MultiSelect
                  //hasSelectAll={("hasSelectAll", false)}
                  overrideStrings={StringOverride}
                  options={provinces}
                  value={selectedProvince}
                  onChange={setSelectedProvince}
                  labelledBy="XXXX"
                />
              </div>
            </div>
          </Grid>

          <Grid item xs={2}>
            <div style={{ marginBottom: "0px" }}>
              <Button fullWidth variant="contained" style={{ textTransform: 'capitalize', backgroundColor: "#00B14F", fontFamily: "Segoe UI", fontSize: "15px" }} startIcon={<SearchIcon />}
                onClick={handleSearch}>
                Tìm kiếm
              </Button>
            </div>
          </Grid>

        </Grid>

      </Box>
    </div>
  );
};

export default Search_Area;