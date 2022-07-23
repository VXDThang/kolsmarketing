import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css"
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { DOMAIN_API } from '../../config/const';
import LoginByGoogle from './GoogleLogin/GoogleLogin';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function Login({ socket, setIsLogined, navigate }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailErrorFormat, setEmailErrorFormat] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [canLogin, setCanLogin] = useState('');
    function invalidEmail(email) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if (email.match(mailformat)) {
            setEmailErrorFormat('');
            return true;
        } else {
            return false;
        }
    }
    function invalidPassword(password) {
        if (password === '') {
            setErrorPassword("Bạn chưa nhập password");
            setCanLogin('Đăng nhập không thành công');
            return 0;
        }
        else {
            if (password.length < 6) {
                setErrorPassword("Password phải dài 6 - 25 kí tự");
                setCanLogin('Đăng nhập không thành công');
                return 0;
            }
        }
        return 1;
    }
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    function handleChangePassword(event) {
        setPassword(event.target.value)
    }
    function handleChangeEmail(event) {
        setEmail(event.target.value)
    }
    function handleSubmit(event) {
        event.preventDefault();
        setCanLogin('');
        let flag_mail = invalidEmail(email);
        if (flag_mail === false) {
            setEmailErrorFormat('Email không hợp lệ!');
            setCanLogin('Đăng nhập không thành công');
        }
        let flag_password = invalidPassword(password);
        if (flag_password == 1) {
            setErrorPassword('')
        }
        if (email !== '' && password !== '') {

            const url = DOMAIN_API + "kols-login";
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            };
            fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => {
                    if (result.access_token === 'error_email') { setCanLogin('Đăng nhập không thành công'); }
                    else if (result.access_token === 'error_password') { setCanLogin('Đăng nhập không thành công'); }
                    else {
                        localStorage.setItem('access_token', result.access_token);
                        localStorage.setItem('check_admin', result.isAdmin);
                        localStorage.setItem('check_role', result.role);
                        setCanLogin('')
                        setPassword('');
                    }
                })
                .catch(error => console.log('Form submit error', error))
        }
    }
    if (localStorage.getItem('access_token')) {
        const access_token = localStorage.getItem('access_token');
        socket?.emit('newUser', access_token);
        setIsLogined(true);
        // return <Navigate to='/' />
        if (localStorage.beforeLink) {
            window.location.href = localStorage.beforeLink;
            localStorage.removeItem("beforeLink");
        }
        else
            window.location.href = '/';
        // navigate('/');
    }
    return (
        <div className="container">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div style={{ margin: "60px", justifyContent: "center" }}>
                        <form>
                            <h2>Đăng nhập KOL</h2>
                            <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                            }}>{canLogin}</span>
                            <div className="form-group">
                                <label>Email</label>
                                <Input
                                    type="text"
                                    name="email"
                                    id="email"
                                    className="form-control"
                                    placeholder="Nhập Email"
                                    value={email}
                                    onChange={handleChangeEmail} />
                                <span style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>{emailErrorFormat}</span>
                            </div>

                            <div className="form-group" style={{ marginTop: "10px" }}>
                                <label>Mật khẩu</label>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={handleChangePassword}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton onClick={handleClickShowPassword}
                                            >
                                                {showPassword ? <Visibility fontSize="small" /> : <VisibilityOff fontSize="small" />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                />
                                <span style={{
                                    fontWeight: 'bold',
                                    color: 'red',
                                }}>{errorPassword}</span>
                            </div>

                            <div className="form-group" style={{ marginTop: "5px" }}>
                                <p className="forgot-password text-right">
                                    <Link to="/kols-forget-password" style={{ color: "#00B14F", textDecoration: "none" }}>Quên mật khẩu?</Link>
                                </p>
                            </div>

                            <Button type="submit"
                                name="signin" id="signin" value="Đăng nhập" variant="contained"
                                style={{ backgroundColor: "#00B14F", width: "auto" }}
                                onClick={handleSubmit}>Đăng nhập
                            </Button>
                            <div className="d-flex align-items-end flex-column">
                                <div style={{ fontSize: "16px", marginBottom: "5px" }}>
                                    Hoặc đăng nhập bằng </div>
                                <LoginByGoogle reload={setPassword} navigate={navigate} />
                                <div style={{ marginTop: "20px" }}>
                                    <p className="forgot-password text-right"> <span> Bạn chưa có tài khoản?</span>
                                        <Link to="/kols-register" style={{ color: "#00B14F", fontWeight: "bold", textDecoration: "none" }}> Đăng ký ngay</Link>
                                    </p>
                                </div>
                            </div>
                        </form>

                    </div>
                </Grid>
                <Grid item xs={6} className="center-parent">
                    <div className="center-me">
                        <img src="login_user.jpg"></img>
                    </div>
                </Grid>

            </Grid>
        </div >
    )
}
