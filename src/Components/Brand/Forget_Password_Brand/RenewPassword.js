import '../../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import "./Login.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { useState } from 'react';
import { DOMAIN_API } from '../../../config/const';
import Button from '@mui/material/Button';

//file
import Header from '../Header/Header_Brand_ForLogin/Header'

export default function RenewPassword(props) {
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirm, setConfirm] = useState('');
    let navigate = useNavigate();
    const { state } = useLocation();
    
    if (state==null)
    {
        return (
            <Navigate to="/brand-login"/>
        )
    }
    const email = state.email;
    function invalidPassword(password) {
        if(password === ''){
            return 0;
        }
        else{
            if(password.length < 8 || password.length > 25){
                return 0;
            }
        }
        return 1;
    }
    function handleChangePassword(event){
        setPassword(event.target.value);
    }

    function handleChangeConfirm(event){
        setConfirm(event.target.value);
    }

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleClickShowConfirm = () => {
        setShowConfirm(!showConfirm);
    };
    
    const handleMouseDown = (event) => {
    event.preventDefault();
    };

    function handleSubmit(event) {
        event.preventDefault();
        if (password === '' || confirm === '') {
            window.alert("Các ô nhập không được trống!");
            return;
        }
        if (password !== confirm){
            window.alert("Mật khẩu và xác nhận mật khẩu phải trùng nhau!");
            return;
        }
        let valid = invalidPassword(password);
        if(valid == 0){
            window.alert("Mật khẩu phải dài từ 8 - 25 kí tự!");
            return;
        }
        else{
            const url = DOMAIN_API + `renew-password-brands`;
            const requestOptions = {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ password, email })
            };
            fetch(url, requestOptions)
                .then(res => res.json())
                .then((result) => {
                    window.alert("Đổi mật khẩu thành công");
                    navigate('/brand-login');
                })
                .catch(error => console.log('Lỗi submit', error))
        }
        
    }

    if (localStorage.getItem('access_token')){
        return (
            <Navigate to="/brand-user"/>
        )
    }

    return (
        <div className="App">
            <div style={{ display: "block", position: "fixed", height: "35px", top: 0, left: 0, right: 0, zIndex: 2 }}>
                <Header />
            </div>

            <div className="container">
                <div style={{ paddingTop: "100px" }}>
                    <form>
                        <h3>Thiết lập mật khẩu mới</h3>
                        <br />
                        <br />
                        <div className="form-group">
                            <label style={{ paddingBottom: "10px" }}>Mật khẩu mới</label>
                            <Input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                id="password"
                                className="form-control"
                                placeholder="Nhập mật khẩu mới"
                                value={password}
                                onChange={handleChangePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDown}
                                        >
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </div>
                        <div style={{ paddingTop: "30px" }}>
                            <label style={{ paddingBottom: "10px" }}>Nhập lại mật khẩu mới</label>
                            <Input
                                type={showConfirm ? "text" : "password"}
                                name="confirm"
                                id="confirm"
                                className="form-control"
                                placeholder="Xác nhận mật khẩu mới"
                                value={confirm}
                                onChange={handleChangeConfirm}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={handleClickShowConfirm}
                                            onMouseDown={handleMouseDown}
                                        >
                                            {showConfirm ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                            />
                        </div>
                        <br />
                        {/* <Button type="submit" sx={{ backgroundColor: "#00b14f", "&:hover": { bgcolor: "green" } }}
                            onClick={handleSubmit} >Thay đổi</Button> */}
                        <Button type="submit" variant="contained"
                            sx={{ backgroundColor: "#00b14f", "&:hover": { bgcolor: "green" } }}
                            onClick={handleSubmit}
                        >Thay đổi</Button>
                    </form>
                </div>
            </div>
        </div>
    )
}