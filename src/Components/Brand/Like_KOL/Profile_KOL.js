import React from 'react';
import styled from 'styled-components';
import { DOMAIN_API } from '../../../config/const';
import { keyframes } from "@emotion/react";
//file
import PageKOL from './PageKOL';

const SidebarStyled = styled.div`
  background: #f0f2f5;
  color: black;
  min-height: 100vh;
  font-size: 14px; 
  border-radius: 5px;
`;

const FormStyled = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2px 2px 2px 0;
  border: 1px solid rgb(230, 230, 230);
  border-radius: 5px;
  .ant-form-item {
    flex: 1;
    margin-bottom: 0;
  }
`;

const pencilEdit = keyframes`
    0% {
        transform: rotate(0deg)
    }
    20% {
        transform: rotate(30deg)
    }
    30% {
        transform: rotate(0deg) translate(2px, 0);
    }    
    40% {
        transform: rotate(30deg) translate(0, 0);
    }
    50% {
        transform: rotate(0deg) translate(0, 0);
    }

    60% {
        transform: rotate(30deg) translate(1px, 0);
    }
    70% {
        transform: rotate(0deg) translate(2px, 0)
    }
    80% {
        transform: rotate(30deg) translate(3px, 0)
    }
    90% {
        transform: rotate(0deg) translate(3px, 0)
    }
    100% {
        transform: rotate(30deg)  translate(4px, 0)
    }
    `;


export default function Profile_KOL({ idKolChoice }) {
    let actoken = localStorage.access_token;

    const [profileKOL, setProfileKOL] = React.useState(null);
    const [loadingDetail, setLoadingDetail] = React.useState(true);

    const [haveShow, setHaveShow] = React.useState(false);

    async function getprofileKOL(id_kol) {
        try {
            let url1 = "";
            url1 = DOMAIN_API + `kols/kol-info`;
            await fetch(url1, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    "x-access-token": actoken
                },
                body: JSON.stringify({ id_kol: id_kol })
            })
                .then(res => res.json())
                .then(
                    (result) => {
                        setProfileKOL(result);
                    }
                )
        }
        catch (error) {
            console.log("error: ", error)
        }
        finally {
            setLoadingDetail(false)
        }
    }


    React.useEffect(() => {
        if (idKolChoice) {
            setHaveShow(true);
            getprofileKOL(idKolChoice);
        }
        else
        {
            setHaveShow(false);
        }
    }, [idKolChoice])


    return (
        <SidebarStyled>
            <div>
            {haveShow ?
                <div>
                    {loadingDetail ?
                        <div style={{ padding: "10px" }}>
                            Đang tải dữ liệu ...
                        </div>
                        :
                        <div>
                            <PageKOL
                            profileKOL={profileKOL}/>
                        </div>
                    }

                </div>
                :
                <div style={{ padding: "10px", textAlign: "center", paddingTop: "100px" }}>

                    <div>
                        <img src="gif_kol.gif" alt="this slowpoke moves" width="250" />
                    </div>
                    <div style={{ paddingTop: "15px", fontSize: "18px", fontWeight: 500 }}>
                        Chọn tên của Kol mà bạn muốn xem trang cá nhân.
                    </div>
                </div>
            }
            </div>


        </SidebarStyled>
    );
}