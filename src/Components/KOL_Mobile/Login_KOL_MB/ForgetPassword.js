import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { DOMAIN_API } from '../../../config/const';

import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import Button from '@mui/material/Button';

//file
import Header from '../Header/Header_Guess';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    let navigate = useNavigate();

    const notify = (message) => { toast(message) };

    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }

    function handleSubmit(event) {
        event.preventDefault();
        if (email !== '') {

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
                        window.alert("Không có tài khoản nào có email này!");
                    }
                    else {
                        navigate("/kols-forget-password/send-otp", { state: { email: email } });
                    }
                })
                .catch(error => console.log('Lỗi submit', error))
        }
        else {
            window.alert("Email không được trống!");
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
                        <h3 >Quên mật khẩu</h3>
                        <br />
                        <div className="form-group">
                            <label style={{ paddingBottom: "10px" }}>Email nhận OTP</label>
                            <input type="text" name="email" id="email" className="form-control"
                                placeholder="Nhập Email" value={email} onChange={handleChangeEmail} />
                        </div>
                        <br />
                        <Button type="submit" variant="contained"
                            style={{ marginRight: "10px", backgroundColor: "#00b14f" }}
                            onClick={handleSubmit} name="otp_renew_pass" id="otp_renew_pass"
                        >Nhận OTP</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}
