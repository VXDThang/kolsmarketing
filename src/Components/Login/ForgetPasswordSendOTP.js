import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { DOMAIN_API } from '../../config/const';
import Button from '@mui/material/Button';
//file
import Header from '../KOL/Header_KOL/Header';

export default function ForgetPasswordSendOTP() {
    const [otp, setOTP] = useState('');

    let navigate = useNavigate();
    const { state } = useLocation();

    if (state == null) {
        return (
            <Navigate to="/kols-login" />
        )
    }
    const email = state.email;

    function handleChangeOTP(event) {
        setOTP(event.target.value);
    }

    function resendOTP(event) {
        event.preventDefault();
        const url = DOMAIN_API + `get-otp`;
        const requestOptions = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        };
        fetch(url, requestOptions)
            .then(res => res.json())
            .then((result) => {
                if (result === false) {
                    window.alert("Không có tài khoản nào có email này!")
                }
                else {
                    window.alert('Đã gửi lại thanh công OTP!');
                }
            })
            .catch(error => console.log('Lỗi submit', error))
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (otp !== '') {
            const url = DOMAIN_API + `check-otp-kols`;
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ otp, email })
            };
            fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => {
                    if (result === false) {
                        window.alert("OTP không khớp với OTP đã gửi!")
                    }
                    else {
                        navigate("/kols-renew-password", { state: { email: email } });
                    }
                })
                .catch(error => console.log('Lỗi submit', error))
        }
        else {
            window.alert("OTP không được trống!");
        }
    }

    if (localStorage.getItem('access_token')) {
        return (
            <Navigate to="/" />
        )
    }

    return (
        <div className="App">
            <div>
                <Header />
            </div>

            <div className="container">
                <div style={{ paddingTop: "30px" }}>
                    <form>
                        <h3>Nhập OTP</h3>
                        <br />
                        <p>Nhập OTP trong thư vừa được gửi đến {email}</p>
                        <div className="form-group">
                            <label style={{ paddingBottom: "10px" }}>OTP</label>
                            <input type="text" name="otp" id="otp" className="form-control"
                                placeholder="Nhập OTP" value={otp} onChange={handleChangeOTP} />
                        </div>
                        <br />
                        <div className="d-flex justify-content-between">
                            <div>
                                <Button type="submit" variant="contained"
                                    sx={{ backgroundColor: "#00b14f","&:hover": { bgcolor: "green" } }}
                                    onClick={handleSubmit} name="otp_renew_pass" id="otp_renew_pass"
                                >Kiểm tra OTP</Button>
                            </div>
                            <div>
                                <Button variant="contained" onClick={resendOTP}> Gửi lại OTP </Button>
                            </div>
                        </div>

                    </form>
                </div>
            </div>
        </div>
    )
}