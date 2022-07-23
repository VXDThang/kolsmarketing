
import React from 'react';
import styled from 'styled-components';
import { createTheme } from '@material-ui/core/styles';
import { DOMAIN_API } from '../../../config/const'
import { useInitFbSDK } from './fb-hook';
//icon
import FacebookIcon from '@mui/icons-material/Facebook';
import SignalWifiConnectedNoInternet4Icon from '@mui/icons-material/SignalWifiConnectedNoInternet4';

import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';

//file
import Content from './Job_Statistic/Content'


const muiTheme = createTheme({
  overrides: {
    MuiListItem: {
      root: {
        "&$selected": {
          backgroundColor: "#f44336",
          "&:hover": {
            backgroundColor: "orange",
          },
        },
      },
      button: {
        "&:hover": {
          backgroundColor: "yellow",
        },
      },
    },
  },
});

const SidebarStyled = styled.div`
  color: black;
  minHeight: 100vh;
 
`;

export default function Job_Statistic({ fbidDown, listpageDown, profile, fbid, listpage }) {
  let actoken = localStorage.access_token;
  const isFbSDKInitialized = useInitFbSDK();
  const [fbUserAccessToken, setFbUserAccessToken] = React.useState();
  const [listPageFB, setListPageFB] = React.useState([]);
  const [fbUserID, setFbUserID] = React.useState(fbidDown);

  // Logs out the current Facebook user
  const logOutOfFB = React.useCallback(() => {
    fetch(DOMAIN_API + `social/logout-social`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result) {
            setFbUserID('');
            fbid('');
            setListPageFB([]);
            listpage([]);
          }
        })

    window.FB.logout(() => {
      setFbUserID('');
      fbid('');
      setListPageFB([])
      listpage([]);
    });
  }, []);

  async function getListFbWhenConect() {
    await fetch(DOMAIN_API + `social/get-list-page-info`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        "x-access-token": actoken
      },
    })
      .then(res => res.json())
      .then(
        (result) => {
          if (result.length > 0) {
            setListPageFB(result);
            listpage(result);
          }
        }
      )
  }

  const responseFacebook = (response) => {
    setFbUserID(response.userID);
    fbid(response.userID);
    if (response.accessToken) {

      window.FB.api(
        `/oauth/access_token`,
        "GET",
        {
          grant_type: "fb_exchange_token",
          client_id: "612556533146975",
          client_secret: "43604dae4e3bb30040956e1e8aac1334",
          fb_exchange_token: response.accessToken,
          redirect_uri: "http://localhost:3001/"
        },
        (response2) => {
          fetch(DOMAIN_API + `social/save-user-info`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json',
              "x-access-token": actoken
            },
            body: JSON.stringify({ fbUser: response2.access_token, expired: response?.data_access_expiration_time })
          })
            .then(res => res.json())
            .then(
              (result) => {
              })
          setFbUserAccessToken(response2.access_token);

        }
      );
    }

  }
  React.useEffect(() => {
    if (fbidDown == null) {
      fetch(DOMAIN_API + `social/get-user-info`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": actoken
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (result.length > 0) {
              setFbUserID(result[0].id_user_social);
              fbid(result[0].id_user_social);
            }
          })
      fetch(DOMAIN_API + `social/get-list-page-info`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
          "x-access-token": actoken
        },
      })
        .then(res => res.json())
        .then(
          (result) => {
            if (result.length > 0) {
              setListPageFB(result);
              listpage(result);
            }
          }
        )
    }
  }, [fbUserAccessToken])


  return (
    <SidebarStyled>
      <div style={{}}>
        <div className="d-flex justify-content-between">

          <div style={{ paddingLeft: "20px", paddingRight: "20px", width: "75%", backgroundColor: "#f0f2f5", borderRadius: "5px" }}>
            <Content />
          </div>
          <div style={{ width: "35%", paddingRight: "20px" }}>
            <div style={{
              height: "auto",
              marginLeft: "20px", padding: "20px", backgroundColor: "white", borderRadius: "10px"
            }} >
              <div style={{ cursor: "pointer" }}>
                {fbidDown ? (
                  // <button onClick={logOutOfFB} className="btn confirm-btn">
                  //   Log out
                  // </button>
                  <div
                    onClick={logOutOfFB}
                    style={{
                      cursor: "pointer", padding: "5px",
                      fontWeight: "500",
                      border: "1px solid red", borderRadius: "10px"
                    }}>
                    <SignalWifiConnectedNoInternet4Icon sx={{ color: "#EE0000" }} />
                    <span style={{ paddingLeft: "5px", fontSize: "14px", color: "black", fontWeight: 500 }}> Ngắt kết nối với Facebook</span>
                  </div>
                ) : (
                  <FacebookLogin
                    appId="612556533146975"
                    autoLoad={true}
                    fields="name,email,picture"
                    scope="pages_manage_posts,user_posts,pages_show_list,pages_read_engagement,public_profile"
                    callback={responseFacebook}
                    render={renderProps => (
                      <div
                        onClick={renderProps.onClick}
                        style={{
                          cursor: "pointer", padding: "5px",
                          fontWeight: "500",
                          border: "1px solid blue", borderRadius: "10px"
                        }}>
                        <FacebookIcon sx={{ color: "#0571ED" }} />
                        <span style={{ fontSize: "14px", color: "black", fontWeight: 500 }}> Kết nối với Facebook</span>
                      </div>
                    )}
                  />
                )}
              </div>
              <div style={{ paddingTop: "10px" }}>
                Cần phải liên kết với facebook mới có thể đăng bài hoặc lên lịch trong chức năng tạo bài viết
              </div>
            </div>
          </div>
        </div>







        {/* <div style={{ paddingTop: "5px" }}>
          <Divider />
        </div> */}

      </div>
    </SidebarStyled>
  );
}