import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Register.css"
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from '@mui/material/IconButton';
import { Navigate, Link } from 'react-router-dom';
import { DOMAIN_API } from '../../../config/const';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

export default function Register({ socket, setIsLogined, navigate }) {
    const [name, setFullname] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [emailErrorFormat, setEmailErrorFormat] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorFullname, setErrorFullname] = useState('');
    const [canRegister, setCanRegister] = useState('');
    const [canLogin, setCanLogin] = useState(false);

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };
    function handleChangePassword(event) {
        setPassword(event.target.value)
    }
    function handleChangeFullname(event) {
        setFullname(event.target.value);
    }
    function handleChangeEmail(event) {
        setEmail(event.target.value);
    }
    function invalidEmail(email) {
        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
        if(email.match(mailformat)){
            let flag = true;
            fetch(DOMAIN_API+`is-available-email`,{
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email })
            })
            .then(res => res.json())
            .then(
                (result)=>{
                    if(result == true) {
                        setEmailErrorFormat('');
                    }else{
                        setEmailErrorFormat('Email không hợp lệ!');
                        setCanRegister('Đăng ký không thành công');
                    }
                }
            )
        }else{
            return false;
        }
    }
    function invalidPassword(password) {
        if(password === ''){
            setErrorPassword("Bạn chưa nhập password");
            setCanRegister('Đăng ký không thành công');
            return 0;
        }
        else{
            if(password.length < 8 || password.length > 25){
                setErrorPassword("Mật khẩu phải dài 8 đến 25 kí tự");
                setCanRegister('Đăng ký không thành công');
                return 0;
            }
        }
        return 1;
    }
    function invalidFullname(fullname) {
        if(fullname === ''){
            setErrorFullname("Bạn chưa nhập họ tên");
            setCanRegister('Đăng ký không thành công');
            return 0;
        }
        else{
        }
        return 1;
    }
    async function handleSubmit(event) {
        event.preventDefault();
        setCanRegister('');
        let flag_mail  = await invalidEmail(email);
        if (flag_mail === false) {
            setEmailErrorFormat('Email không hợp lệ!');
            setCanRegister('Đăng ký không thành công');
        }
        let flag_password = invalidPassword(password);
        if (flag_password == 1){
            setErrorPassword('')
        }
        let flag_name = invalidFullname(name);
        if (flag_name == 1){
            setErrorFullname('');
        }
        let fullname = name;
        fetch(DOMAIN_API+`is-available`,{
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullname, email, password })
        })
        .then(res => res.json())
        .then(
            (result)=>{
                if(result == true){
                    
                    if (fullname !== '' && password !== '' &&  email!=='' ) {
                        const url = DOMAIN_API + "register-kols";
                        const requestOptions = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ password, fullname, email })
                        };
                        fetch(url, requestOptions)
                        .then(res => res.json())
                        .then((result) => {
                            if(result == true){
                                setCanLogin(true);
                            }
                        })
                        .catch(error => console.log('Form submit error', error))
                    }
                    
                }
                else{
                   setCanRegister('Đăng kí không thành công')
                }
            }
        )
            
        
    };
    if(canLogin){
        return (
            <Navigate to="/kols-login"/>
        )
    }
    if (localStorage.access_token){
        socket?.disconnect();
        localStorage.removeItem("access_token");
        return (
            <Navigate to="/kols-register"/>
        );
    }
    return (
        <div className="container">
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <div style={{ margin: "60px", justifyContent: "center" }}>
                        <form>
                            <h2>Đăng ký</h2>

                            <div className="form-group">
                                <label>Họ và tên</label>
                                <Input 
                                    type="text" 
                                    name="full_name" 
                                    id="full_name" 
                                    className="form-control" 
                                    placeholder="Nhập họ và tên của bạn" 
                                    value={name} 
                                    onChange={handleChangeFullname}/>
                                <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                                }}>{errorFullname}</span>
                            </div>

                            <div className="form-group" style={{marginTop:"10px"}}> 
                                <label>Email</label>
                                <Input type="text" 
                                name="email" 
                                id="email" 
                                className="form-control" 
                                placeholder="Nhập email của bạn" 
                                value={email} 
                                onChange={handleChangeEmail}/>
                                <span style={{
                                fontWeight: 'bold',
                                color: 'red',
                                }}>{emailErrorFormat}</span>
                            </div>

                            <div className="form-group" style={{marginTop:"10px"}}>
                                <label>Mật khẩu</label>
                                <Input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    id="password"
                                    className="form-control"
                                    placeholder="Mật khẩu (Từ 8 đến 25 ký tự)"
                                    value={password}
                                    onChange = {handleChangePassword}
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

                            <div className="form-group" style={{marginTop:"5px"}}>
                        
                                <p className="forgot-password text-right"> <span>  Bằng việc đăng ký tài khoản, bạn đã đồng ý với</span>
                                    <Link to="/register" style={{color:"#00B14F",textDecoration: "none"}}> Điều khoản dịch vụ</Link>
                                    <span> và</span> <Link to="/register" style={{color:"#00B14F", textDecoration: "none"}}>  Chính sách bảo mật </Link>
                                    <span>của chúng tôi</span>
                                </p>
                            </div>

                            <Button type="submit" fullWidth
                                name="signin" id="signin" value="Đăng nhập" variant="contained"
                                style={{ backgroundColor: "#00B14F", width: "auto" }}
                                onClick={handleSubmit}>Đăng ký
                            </Button>                            
                           
                        </form>
                        <div style={{marginTop:"10px"}}> 
                        <p className="forgot-password text-left"> <span> Bạn đã có tài khoản?</span>
                                    <Link to="/kols-login" style={{color:"#00B14F", fontWeight: "bold",textDecoration: "none"}}> Đăng nhập ngay</Link>
                                </p>
                                </div>

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
