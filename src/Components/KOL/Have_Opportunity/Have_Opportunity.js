import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { DOMAIN_API } from '../../../config/const'


//file
import Header from '../Header_KOL/Header';
import Header_Access from '../Header_KOL/Header_access';
import List_Card from './List_Card';
import Offer_Card from './Offer_Card';
import Footer from '../../Footer/Footer'



export default function Have_Opportunity() {

  let actoken = localStorage.access_token;
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [listRecruitment, setListRecruitment] = React.useState([]);

  const [loadingSuggestPost, setLoadingSuggestPost] = React.useState(true);
  const [listSuggestPost, setListSuggestPost] = React.useState([]);
  //3 đồng ý
  //2 từ chối
  //1 đang chờ
  //4 đã đóng
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  async function getListRecruitmentOfUser() {
    try {
      let url1 = "";
      url1 = DOMAIN_API + `posts/get-post-user-recruitment`;
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
            setListRecruitment(result);
            setLoading(false);
            setError(null);
          }
        )

      let url2 = "";
      url2 = DOMAIN_API + `posts/get-suggest-post-not-dup-save-recruit`;
      await fetch(url2, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": actoken
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (result.length > 5)
              setListSuggestPost(result.slice(0, 5));
            else
              setListSuggestPost(result)
            setLoadingSuggestPost(false);
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
    getListRecruitmentOfUser();
  }, [])


  if (localStorage.access_token == null || localStorage.check_role =='2') {
    localStorage.setItem("beforeLink", window.location.pathname);
    return (
      <div sx={{ flexGrow: 1 }}  >
        <Header />
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
        </div>

        <div style={{ paddingTop: "70px" }}>
          <div className="container" style={{ paddingLeft: "5%", paddingRight: "5%", paddingTop: "20px", paddingBottom: "20px" }}>
            {loading ?
              <div>
                Đang tải dữ liệu ...
              </div>
              :
              <Grid container spacing={2}>
                <Grid item xs={8}>
                  <List_Card listRe={listRecruitment} />
                </Grid>
                <Grid item xs={4}>
                  <Card sx={{ marginLeft: "10px" }}>
                    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                      <div style={{ fontSize: "18px", fontWeight: 600, paddingBottom: "10px", paddingTop: "10px" }}>
                        Có thể bạn quan tâm
                      </div>
                      <div>
                        {loadingSuggestPost ?
                          <div>
                            Đang tải dữ liệu ...
                          </div>
                          :
                          <div>
                            {listSuggestPost.length > 0 && listSuggestPost.map((list, index) => (
                              <div key={index}>
                                <Offer_Card detail={list} />
                              </div>
                            ))}
                          </div>
                        }
                      </div>

                    </div>
                  </Card>

                </Grid>

              </Grid>
            }

          </div>
        </div>


        <div>
          <Footer />
        </div>

      </div>
    );
  }
}